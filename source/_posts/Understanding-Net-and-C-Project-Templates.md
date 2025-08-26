---
title: Understanding .Net and C# Project Templates
date: 2025-07-15 14:26:26
tags: [.NET, C#, Templates, Console App]
categories: [C#]
postImage: https://cdn.jsdelivr.net/gh/DyingDown/img-host-repo/202507151608585.png
warning: false
isCarousel: false
---

This blog is a note of learning C# and .NET.

<!--more-->

## Visual Studio C# Project Templates

Visual Studio offers a variety of project templates tailored to different types of applications. 

- **Console App**: A lightweight application that runs in the command line. Perfect for learning, utilities, and background services.
- **Class Library**: Used to create reusable logic and components that can be referenced by other apps.
- **ASP.NET Core Web App/API**: Used for building web applications and RESTful APIs using the ASP.NET Core framework.
- **Windows Forms App**: For building classic Windows desktop GUI applications with drag-and-drop interface tools.
- **.NET MAUI App**: A cross-platform UI framework that lets you build apps for Android, iOS, macOS, and Windows using a single codebase.

## .NET Framework vs .NET Core / .NET 5+

.NET is a development platform used to build and run a wide range of apps. 

Features of .NET Framework / .NET

- **Consistent Programming Environment**: Whether you're building a mobile app, web app, or desktop app, the programming experience is unified.
- **Secure Execution**: The runtime provides memory and thread management and enforces type safety.
- **Common Language Runtime (CLR)**:
  - Manages memory allocation and garbage collection.
  - Handles threading and code execution.
  - Enforces strong typing rules.
- **Base Class Library (BCL)**:
  - A rich set of built-in classes and methods that help developers avoid "reinventing the wheel."
  - Includes support for file handling, collections, data types, networking, etc.
- **High-level Application Layers**: Web, mobile, and desktop frameworks are built on top of the BCL and CLR.

## .NET Compilation Workflow

When compiling and running a .NET program, it follows these steps.

1. **Source Code (C#)** is written and saved.
2. The **C# compiler** compiles the code into **MSIL (Microsoft Intermediate Language)** — a CPU-independent set of instructions.
3. The **Common Language Runtime (CLR)** loads the MSIL code.
4. The **JIT (Just-In-Time) Compiler** translates the MSIL into **native code** for your machine’s architecture.
5. The native code is then executed.

```
C# Source Code → MSIL → CLR + JIT → Native Code → App Runs
```

> .NET also supports **Native AOT (Ahead-of-Time compilation)**, which skips the JIT step and compiles directly to native code ahead of time — improving startup performance and reducing runtime dependencies.

## .NET Support Policy

Microsoft releases a new version of .NET **every November**, alternating between Long-Term Support (LTS) and Short-Term Support (STS).

- **LTS (Long-Term Support)**: Supported for 3 years.
- **STS (Short-Term Support)**: Supported for 18 months.

| Version | Type | Support Ends    |
| ------- | ---- | --------------- |
| .NET 8  | LTS  | Nov 10, 2026    |
| .NET 9  | STS  | May 12, 2026    |
| .NET 10 | LTS  | Nov 2028 (est.) |

![](https://cdn.jsdelivr.net/gh/DyingDown/img-host-repo/202507151448731.png)

## Create a C# Console App

### Using VS Code

1. In VS Code, go to **File → New File**.
2. Open the command palette (`Ctrl+Shift+P` or `Cmd+Shift+P`) and select **`.NET: New Project`**.
3. Choose **Console App** as the project template.
4. Enter the project name and check **Add Directory** to create a new folder for your project.
5. Select to create a **solution file (`.sln`)** for your project.
    **Why choose `.sln`?**
    A `.sln` file is a Visual Studio solution file that can manage multiple projects together. Even if you start with a single project, using a solution file helps you organize and scale your codebase more easily.
6. Click **Show all template options**, select **.NET 8.0** as the target framework.
7. Find **“Do not use top-level statements”** and set it to **True** if you want the classic `Program` class with a `Main` method instead of top-level statements.
8. Click **Create Project**.

### Using Command Line

```bash
dotnet new console --use-program-main -n CmdConsoleApp -f net8.0
```

- `console`
   Creates a Console Application project.
- `--use-program-main`
   This option tells the template to generate the traditional `Program` class with a `Main` method as the program entry point, instead of using **top-level statements**.
   Top-level statements are a newer C# feature (introduced in C# 9) that let you write minimal code without explicitly declaring `Main`.
- `-n CmdConsoleApp`
   Sets the project name to `CmdConsoleApp`. A folder with this name is created to hold the project files.
- `-f net8.0`
   Targets the .NET 8.0 framework.

#### Other Parameters for `dotnet new console`

- `--output` or `-o`
   Specify the output directory for the project.
- `--framework` or `-f`
   Target a specific .NET framework version, e.g. `net6.0`, `net7.0`, `net8.0`.
- `--language` or `-lang`
   Choose the language: `C#` (default), `F#`, or `VB`.
- `--no-restore`
   Create the project without automatically restoring dependencies.
- `--force`
   Overwrite existing files if the target directory is not empty.
- `--help`
   Show detailed help about the command and options.
- `--use-top-level-statements`
   Explicitly control whether to use top-level statements (`true` by default in recent .NET SDKs). Setting this to `false` generates the traditional `Program` class and `Main` method.

### Top-level Statements

Top-level statements simplify C# programs by allowing you to write code directly at the file level without boilerplate like:

```c#
class Program
{
    static void Main(string[] args)
    {
        Console.WriteLine("Hello World!");
    }
}
```

Instead, you can just write:

```c#
Console.WriteLine("Hello World!");
```

The compiler implicitly creates the `Main` method behind the scenes. This feature improves readability and speeds up small app creation, but sometimes you want to disable it for clarity or compatibility — which is when you use `--use-program-main` or set **“Do not use top-level statements”** to true in VS Code.

### .sln & .slnx

When creating a .NET project (especially in **Visual Studio** or **VS Code**), you'll often encounter two solution-related options:

- `.sln` file
- `.slnx` file (a newer concept)

#### `.sln`  file

**`.sln`** stands for **Solution File** in Visual Studio.

- It’s a **traditional, text-based file** used by Visual Studio to manage one or more `.csproj` or `.vbproj` projects as a group.
- It stores project references, build configurations (Debug/Release), dependencies between projects, and IDE-specific settings (like opened tabs, breakpoints, build order).
- It’s especially useful in **multi-project applications**, such as:
  - Web API + Class Library
  - Frontend + Backend + Shared code
  - Unit tests + main app

**Example structure:**

```plaintext
MySolution/
├── MySolution.sln         <- the .sln file
├── ProjectA/
│   └── ProjectA.csproj
├── ProjectB/
│   └── ProjectB.csproj
```

**Where it’s used:**

- Fully supported in **Visual Studio** and **VS Code (with C# Dev Kit)**.
- Can be created/modified manually or via `dotnet` CLI (`dotnet new sln`).
- Used for building, debugging, and managing multiple projects together.

#### `.slnx` file

**`.slnx`** is **not** a Microsoft standard file format like `.sln`. It is used by **the C# Dev Kit extension in Visual Studio Code** to improve cross-platform and lightweight solution management.

- Introduced to enable **project grouping and navigation** in **VS Code**, especially when you don’t want or need a full Visual Studio-style `.sln`.
- It’s essentially a **lightweight solution** file format used **only** by the **C# Dev Kit extension**.
- It **doesn’t support advanced features** like build configuration, launch profiles, etc.

**How it works:**

- VS Code will generate a `.slnx` when you open a folder containing multiple `.csproj` files and you choose to create a solution-like experience.
- It stores the list of projects in a simple format and integrates into the “Solution Explorer” in the sidebar.

## Structure of a Console App

After creating a new console app, your project folder will look like this:

```plaintext
ConsoleApp/
├── Program.cs
├── MyConsoleApp.csproj
```

### Explanation of Files

- **Program.cs**
   The main entry point of your app. Contains the `Main` method:

  ```c#
  using System;
  
  namespace MyConsoleApp
  {
      class Program
      {
          static void Main(string[] args)
          {
              Console.WriteLine("Hello, World!");
          }
      }
  }
  ```

  - `using System;` imports basic functionalities (like `Console`).
  - `Main(string[] args)` is the first method that runs.
  - `Console.WriteLine()` prints text to the terminal.

- **.csproj File**
   A project configuration file in XML format that defines:

  - Target framework
  - Dependencies
  - Build settings

  Example:

  ```xml
  <Project Sdk="Microsoft.NET.Sdk">
  
    <PropertyGroup>
      <OutputType>Exe</OutputType>
      <TargetFramework>net8.0</TargetFramework>
    </PropertyGroup>
  
  </Project>
  ```