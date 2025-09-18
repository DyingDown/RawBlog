---
title: 'Database Engine Project: Project Architecture and Design Ⅰ'
date: 2025-09-15 10:38:41
tags: [Database, C#, Architecture, Database Internals]
categories: Database Engine Project
postImage: https://cdn.jsdelivr.net/gh/DyingDown/img-host-repo/202509151130262.png
description: In this post, I’ll walk through the framework and architecture of my project, explain the module separation, and share why I structured the system in this way.
warning: false
isCarousel: true
---

<div style="all: unset; display: flex; flex-direction: column; align-items: flex-start; margin: 1rem 0;">
  <a href="https://github.com/DyingDown/LiteDatabase" style="all: unset; cursor: pointer;">
    <img 
      src="https://github-readme-stats.vercel.app/api/pin/?username=DyingDown&repo=LiteDatabase"
      alt="LiteDatabase Repo Card"
      style="
        all: unset;
        display: block;
        max-width: 100%;
      ">
  </a>
</div>

In this post, I’ll walk through the **framework and architecture** of my project, explain the **module separation**, and share why I structured the system in this way.

I have been already made a mini database project in Go, but it has been a long time and I want to re do it again and then in a new language i just picked up.

## Architecture Diagram

Here’s the overall system design (as of now):

<img src="https://cdn.jsdelivr.net/gh/DyingDown/img-host-repo/202509151049091.png" style="zoom: 33%;" />

This diagram shows how the different modules depend on each other. At the top, SQL commands enter through the **Parser → Planner → Executor** pipeline, eventually touching the lower-level layers that deal with tables, transactions, storage, and recovery.

At a high level, the system is divided into layers:

- **SQL Layer**
- **Catalog Layer**
- **Table Layer**
- **Transaction Layer**
- **Storage Layer**
- **Recovery Layer**

## Project Structure

So with the overall design, we can set the structure of the project:

```bash
├── Catalog
    ├── CatalogManager.cs
    ├── ICatalogManager.cs
├── Recovery
    ├── Checkpoint.cs
    ├── RedoLog.cs
├── Sql
    ├── Executor.cs
    ├── Parser.cs
    ├── Planner.cs
├── Storage
    ├── BufferPool.cs
    ├── FileIO.cs
    ├── IStorageEngine.cs
    ├── Pager.cs
    ├── StorageEngine.cs
├── Table
    ├── ITableManager.cs
    ├── TableManager.cs
├── Transaction
    ├── ITxnEngine.cs
    ├── LockManager.cs
    ├── LogManager.cs
    ├── TxnEngine.cs
    ├── VersionManager.cs
├── Program.cs
```

## Layer by Layer Breakdown

### SQL Layer

- **Parser**: Converts raw SQL strings into an abstract syntax tree (AST).
- **Planner**: Translates the AST(AST – Abstract Syntax Tree)  into an execution plan.
- **Executor**: Executes the plan by interacting with the `TableManager`.

Users think in SQL, not in storage pages. By isolating the SQL pipeline (Parser → Planner → Executor), I can extend SQL support without touching storage or transactions.

#### Parser

```c#
namespace LiteDatabase.Sql;

class Parser {
    private Planner planner;
}
```

#### Planner

```c#
namespace LiteDatabase.Sql;

class Planner {
    private Executor executor;
}
```

#### Executor

```c#
namespace LiteDatabase.Sql;

class Executor {
    
}
```

### Catalog Layer

- `CatalogManager`: Manages metadata (schemas, table definitions, column types).

This is crucial because a database needs to know **what tables exist and what their structure looks like**. Without a catalog, every query would need hardcoded assumptions.

```c#
// ICatalogManager.cs
namespace LiteDatabase.Catalog;

public interface ICatalogManager {
    
}

// CatalogManager.cs
namespace LiteDatabase.Catalog;

public class CatalogManager : ICatalogManager {
    
}
```

I use interface in case I need to switch to different test implementations.

### Table Layer

- `TableManager`: The main entry point for managing tables.  Exposes the logical API for table operations: create, insert, scan. It coordinates with both the `StorageEngine` and `TxnEngine`, as well as the `CatalogManager`.

This is the **bridge between SQL and the internals**. SQL queries should never directly touch the storage engine. Instead, they go through the `TableManager`, which orchestrates the correct calls to lower layers.

```c#
// ITableManager.cs
namespace LiteDatabase.Table;

public interface ITableManager {
    
}

// TableManager.cs
using LiteDatabase.Catalog;
using LiteDatabase.Storage;
using LiteDatabase.Transaction;

namespace LiteDatabase.Table;

public class TableManager : ITableManager {
    private IStorageEngine storageEngine;

    private ITxnEngine txnEngine;

    private ICatalogManager catalogManager;

    public TableManager(IStorageEngine storageEngine, ITxnEngine txnEngine, ICatalogManager catalogManager)
    {
        this.storageEngine = storageEngine;
        this.txnEngine = txnEngine;
        this.catalogManager = catalogManager;
    }
}
```

### Transaction Layer

- `TxnEngine`: Handles transaction lifecycle (start, commit, abort).
- `LockManager`: Provides concurrency control by locking rows or tables.
- `VersionManager`: Enables multi-version concurrency control (MVCC).
- `LogManager`: Records logs for durability and recovery.

Transactions are **orthogonal to storage**. You can design a storage engine without transactions, but without a transaction system you can’t guarantee **ACID properties**. That’s why this layer is isolated.

#### TxnEngine

```c#
// ITxnEngine.cs
namespace LiteDatabase.Transaction;

public interface ITxnEngine {
    
}

// TxnEngine.cs
namespace LiteDatabase.Transaction;

public class TxnEngine : ITxnEngine {
    private readonly LockManager lockManager;

    private readonly VersionManager versionManager;

    private readonly LogManager logManager;

    public TxnEngine(LockManager lockManager, VersionManager versionManager, LogManager logManager) {
        this.logManager = logManager;
        this.lockManager = lockManager;
        this.versionManager = versionManager;
    }
}
```

#### LockManager

```c#
namespace LiteDatabase.Transaction;

public class LockManager {
    
}
```

#### VersionManager

```c#
namespace LiteDatabase.Storage;

public class VersionManager {
    
}
```

#### LogManager

```c#
using LiteDatabase.Recovery;

namespace LiteDatabase.Transaction;

public class LogManager {
    private RedoLog redoLog;

    private Checkpoint checkpoint;

    public LogManager() {
        redoLog = new RedoLog();
        checkpoint = new Checkpoint();
    }
}
```

### Storage Layer

- `StorageEngine`: High-level interface to physical storage.
- `Pager`: Manages pages of data on disk.
- `BufferPool`: Caches frequently used pages in memory.
- `FileIO`: Handles raw file operations.

Databases deal with **pages, not raw bytes**. That’s why `Pager`/`BufferPool `are key abstractions: they allow efficient disk access and caching.

#### StorageEngine

```c#
// IStorageEngine.cs
namespace LiteDatabase.Storage;

public interface IStorageEngine {
    
}

// StorageEngine.cs
namespace LiteDatabase.Storage;

public class StorageEngine : IStorageEngine {
    private Pager pager;

    private BufferPool bufferPool;

    private FileIO fileIO;

    public StorageEngine(Pager pager, BufferPool bufferPool, FileIO fileIO) {
        this.pager = pager;
        this.bufferPool = bufferPool;
        this.fileIO = fileIO;
    }
}
```

#### BufferPool

```c#
namespace LiteDatabase.Storage;

public class BufferPool {
    
}
```

#### FileIO

```c#
namespace LiteDatabase.Storage;

public class FileIO {
    
}
```

#### Pager

```c#
namespace LiteDatabase.Storage;

public class Pager {
    
}
```

### Recovery Layer

- `RedoLog`: Ensures durability; after a crash, operations can be replayed.
- `Checkpoint`: Periodically flushes data to reduce recovery time.

Recovery is not needed in normal operation, but is essential after a crash. If recovery logic were embedded directly in the transaction layer, it would complicate everyday code. By isolating it, the normal execution path remains simple, and failure-handling is contained.

#### Checkpoint

```c#
namespace LiteDatabase.Recovery;

class Checkpoint {
    
}
```

#### RedoLog

```c#
namespace LiteDatabase.Recovery;

class RedoLog { 
    
}
```

## Program.cs

We’ve set up the structure, now is to initialize then in`Main`.

```c#
using LiteDatabase.Catalog;
using LiteDatabase.Sql;
using LiteDatabase.Storage;
using LiteDatabase.Table;
using LiteDatabase.Transaction;

namespace LiteDatabase;

class Program
{
    static void Main(string[] args)
    {
        // Console.WriteLine("Hello, World!");

        var pager = new Pager();
        var bufferPool = new BufferPool();
        var fileIO = new FileIO();

        IStorageEngine storageEngine = new StorageEngine(pager, bufferPool, fileIO);


        var logManager = new LogManager();
        var lockManager = new LockManager();
        var versionManager = new VersionManager();
        ITxnEngine txnEngine = new TxnEngine(lockManager, versionManager, logManager);

        ICatalogManager catalogManager = new CatalogManager();

        ITableManager tableManager = new TableManager(storageEngine, txnEngine, catalogManager);

        var parser = new Parser();
        var planner = new Planner();
        var executor = new Executor();
    }
}

```

## Next Steps

Currently, the project has the skeleton in place, with dependencies and initialization wired up. The next milestone is to **implement the SQL Layer (Parser, Planner, Executor)**, starting with a small subset of SQL:

- `CREATE TABLE`
- `INSERT INTO`
- `SELECT *`

From there, I’ll gradually flesh out the Storage and Transaction layers to support ACID semantics.

##  Closing Thoughts

This project is my attempt to **demystify database internals** by building one myself. The current design focuses on clarity and modularity, with each layer serving a specific role. While the system is far from production-ready, it already reflects the architecture patterns used in real-world relational databases.

Stay tuned for the next post, where I’ll dive into building the **SQL Parser** and running the first queries end-to-end!