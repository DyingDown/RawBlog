---
title: JDBC Batch Operation using PreparedStatement
date: 2023-02-12 19:26:01
tags: [Java, Database, Batch Operation, Operation, PreparedStatement]
categories: JDBC
postImage: https://cdn.jsdelivr.net/gh/DyingDown/img-host-repo/202302122038756.jpg
---

Note about how to do batch operation in database using JDBC.

<!--more-->

Because `UPDATE`, `DELETE`, `SELECT` it self can deal with multiple data, so they don't need to batch. Only **INSERT** need batch operation.

## Statement

```java
Connection conn = JDBCUtils.getConnection();
Statement st = conn.createStatement();
for(int i = 0; i < 20000; i ++) {
    String sql = "insert into goods(name)values('name_" + i + "')";
    st.execute(sql);
}
```

## PreparedStatement

```java
Connection conn = null;
PreparedStatement ps = null;
try {
    conn = JDBCUtils.getConnection();
    String sql = "insert into goods(name)value(?)";
    ps = conn.prepareStatement(sql);
    for(int i = 1; i <= 20000; i ++) {
        ps.setObject(1, "name_" + i);
        ps.execute();
    }
} catch (Exception e) {
    e.printStackTrace();
} finally {
    JDBCUtils.closeResource(conn, ps);
}
```

This method is still slow because it still need to IO in disk 20000 times.

## Using Batch

1. using `addBatch()`, `executeBatch()`, `clearBatch()` 
2. MySQL does not support batch by default, we need to add a parameter at the end of **URL** when getting the connection to database. `?rewriteBatchedStatements=true`
3. Using a new version of MySQL

```java
Connection conn = null;
PreparedStatement ps = null;
try {
    conn = JDBCUtils.getConnection();
    String sql = "insert into goods(name)value(?)";
    ps = conn.prepareStatement(sql);
    for(int i = 1; i <= 20000; i ++) {
        ps.setObject(1, "name_" + i);

        // collect sql
        ps.addBatch();

        if(i % 500 == 0) {
            // execute batch
            ps.executeBatch();

            // clear batch
            ps.clearBatch();
        }
    }
} catch (Exception e) {
    e.printStackTrace();
} finally {
    JDBCUtils.closeResource(conn, ps);
}
```

## Best solution

Each time you run `executeBatch()`, the database will  **commit** the data to database by default, this process also use time.

So we can let the insert do not auto commit. Using `Connection.setAutoCommit()` to prevent auto commit  and `Connection.commit()` to commit change.

```java
Connection conn = null;
PreparedStatement ps = null;
try {
    conn = JDBCUtils.getConnection();
    
    // set not to commit automatically
    conn.setAutoCommit(false);
    
    String sql = "insert into goods(name)value(?)";
    ps = conn.prepareStatement(sql);
    for(int i = 1; i <= 20000; i ++) {
        ps.setObject(1, "name_" + i);

        // collect sql
        ps.addBatch();

        if(i % 500 == 0) {
            // execute batch
            ps.executeBatch();

            // clear batch
            ps.clearBatch();
        }
    }
    
    // commit data
    conn.commit();
} catch (Exception e) {
    e.printStackTrace();
} finally {
    JDBCUtils.closeResource(conn, ps);
}
```

