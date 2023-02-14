---
title: JDBC Transaction
date: 2023-02-12 20:56:51
tags: [Java, Database, Transaction]
categories: JDBC
postImage: https://cdn.jsdelivr.net/gh/DyingDown/img-host-repo/202302131009619.jpg
---

Note about how to use transaction in database using JDBC.

<!--more-->

## What is transaction

1.  A database transaction is a sequence of multiple operations performed on a database, and all served as a single logical unit of work — taking place wholly or not at all. In other words, there’s never a case that *only half of the operations* are performed and the results saved.
2. If there is an error, **rollback** the previous steps. If all the operations are done, **commit** the transaction.
3. Once the data is committed, it is not able to rollback.

### Auto commit operations

1. DDL operation (can't set autocommit = false)
2. DML operation by default, but can set autocommit = false to cancel auto commit
3. close connection.

### Modify DML operations

Assume we are doing money transaction to one person to another.

We need to SQL statements:

```sql
UPDATE user_table set balance = balance + 100 WHERE username = "AA";
UPDATE user_table set balance = balance - 100 WHERE username = "BB";
```

- First, we change code into not close connections when finishing an operation.

  ```java
  public int update(Connection conn, String sql, Object... args) {
      PreparedStatement ps = null;
      try {
          ps = conn.prepareStatement(sql);
          for (int i = 0; i < args.length; i++) {
              ps.setObject(i + 1, args[i]);
          }
          return ps.executeUpdate();
      } catch (Exception e) {
          e.printStackTrace();
      } finally {
          JDBCUtils.closeResource(null, ps);
      }
      return 0;
  }
  ```

  We don't want to commit when close the connection.

  So we wrap the two SQL with `try-catch,` and close the connection at `finally`.

- Second, we need to cancel the auto commit of DML operations

  ```java
  conn.setAutoCommit(false);
  ```

- rollback the data

  ```java
  conn.rollback();
  ```

- finally, when finished, we need to **set auto commit to true**. Because when using connection pool, when we close the connection, it is not actually deleted, it is returned to the connection pool to be used again. So we need to reset its properties for the next user.

So the final code is :

```java
public void moneyTransaction() {
    // 1.prevent data auto commit when close connection
    Connection conn = null;
    try {
        conn = JDBCUtils.getConnection();
        // 2. prevent auto commit of default DML operations
        conn.setAutoCommit(false);
        String sql1 = "UPDATE user_table set balance = balance + 100 WHERE username = ?";
        PreparedStatementTest.update(conn, sql1, "AA");

        String sql2 = "UPDATE user_table set balance = balance - 100 WHERE username = ?";
        PreparedStatementTest.update(conn, sql2, "BB");

    } catch (Exception e) {
        e.printStackTrace();
        try {
            // 3. when there is an error, rollback
            conn.rollback();
        } catch (SQLException es) {
            es.printStackTrace();
        }
    } finally {
        try {
            conn.setAutoCommit(true);
        } catch (Exception e) {
            e.printStackTrace();
        }
        JDBCUtils.closeResource(conn, null);
    }
}
```

## Transaction ACID

1. **Atomicity**: [Transactions](https://en.wikipedia.org/wiki/Database_transaction) are often composed of multiple [statements](https://en.wikipedia.org/wiki/SQL_syntax). [Atomicity](https://en.wikipedia.org/wiki/Atomicity_(database_systems)) guarantees that each transaction is treated as a single "unit", which either succeeds completely or fails completely: if any of the statements constituting a transaction fails to complete, the entire transaction fails and the database is left unchanged. 
2. **Consistency**: [Consistency](https://en.wikipedia.org/wiki/Consistency_(database_systems)) ensures that a transaction can only bring the database from one consistent state to another, preserving database [invariants](https://en.wikipedia.org/wiki/Invariant_(computer_science)): any data written to the database must be valid according to all defined rules, including [constraints](https://en.wikipedia.org/wiki/Integrity_constraints), [cascades](https://en.wikipedia.org/wiki/Cascading_rollback), [triggers](https://en.wikipedia.org/wiki/Database_trigger), and any combination thereof. This prevents database corruption by an illegal transaction. [Referential integrity](https://en.wikipedia.org/wiki/Referential_integrity) guarantees the [primary key](https://en.wikipedia.org/wiki/Unique_key)–[foreign key](https://en.wikipedia.org/wiki/Foreign_key) relationship.
3. **Isolation**: Transactions are often executed [concurrently](https://en.wikipedia.org/wiki/Concurrent_computing) (e.g., multiple transactions reading and writing to a table at the same time). [Isolation](https://en.wikipedia.org/wiki/Isolation_(database_systems)) ensures that concurrent execution of transactions leaves the database in the same state that would have been obtained if the transactions were executed sequentially. Isolation is the main goal of [concurrency control](https://en.wikipedia.org/wiki/Concurrency_control); depending on the isolation level used, the effects of an incomplete transaction might not be visible to other transactions.
4. **Durability**: [Durability](https://en.wikipedia.org/wiki/Durability_(computer_science)) guarantees that once a transaction has been committed, it will remain committed even in the case of a system failure (e.g., power outage or [crash](https://en.wikipedia.org/wiki/Crash_(computing))). This usually means that completed transactions (or their effects) are recorded in [non-volatile memory](https://en.wikipedia.org/wiki/Non-volatile_memory).

### Database concurrency problem

- Dirty Read Problem
- Unrepeatable Read Problem
- Lost Update Problem
- Phantom read Problem

### Database Isolation level

1. Read Committed
2. Read Uncommitted
3. Repeatable Reads
4. Serializable

## SELECT with Transaction

common select function: Make `Connection` a parameter, not close it to avoid commit.

```java
public <T> T getInstance(Connection conn, Class<T> clazz, String sql, Object... args) {
    PreparedStatement ps = null;
    ResultSet rs = null;
    try {
        ps = conn.prepareStatement(sql);
        for (int i = 0; i < args.length; i++) {
            ps.setObject(i + 1, args[i]);
        }

        rs = ps.executeQuery();
        ResultSetMetaData metaData = rs.getMetaData();
        int columnCount = metaData.getColumnCount();
        if (rs.next()) {
            T t = clazz.newInstance(); 
            for (int i = 0; i < columnCount; i++) {
                Object columnValue = rs.getObject(i + 1);
                String columnName = metaData.getColumnLabel (i + 1);
                Field field = clazz.getDeclaredField(columnName);
                field.setAccessible(true);
                field.set(t, columnValue);
            }
            return t;
        }
    } catch (Exception e) {
        e.printStackTrace();
    } finally {
        JDBCUtils.closeResource(null, ps, rs);
    }
    return null;
}
```

## Set isolation level in code

```java
conn.setTransactionIsolation(Connection.TRANSACTION_READ_COMMITED);
```

