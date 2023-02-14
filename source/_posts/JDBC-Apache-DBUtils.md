---
title: JDBC Apache-DBUtils
date: 2023-02-13 23:38:24
tags: [Java, Database, Apache-DBUtils]
categories: JDBC
postImage: https://cdn.jsdelivr.net/gh/DyingDown/img-host-repo/202302140117758.jpg
---

This article is note about learning Apache-DBUtils.

<!--more-->

## commons-dbutils

> The Commons DbUtils library is a small set of classes designed to make working with [JDBC](http://java.sun.com/products/jdbc/) easier. JDBC resource cleanup code is mundane, error prone work so these classes abstract out all of the cleanup tasks from your code leaving you with what you really wanted to do with JDBC in the first place: query and update data.

**This can replace the `baseDao` Code we write in the previous articles.**

1. Download the jar file [https://commons.apache.org/proper/commons-dbutils/download_dbutils.cgi](https://commons.apache.org/proper/commons-dbutils/download_dbutils.cgi)
2. `QueryRunner runner = new QueryRunner();`

### how to use

1. insert, delete, update: `runner.update(conn, sql, "", "");`

2. select: 

   - for one row of data, use `BeanHandler`

      ```java
     BeanHandler<Customer> handler = new BeanHandler<>(Customer.class);
     Customer costomer = runner.query(conn, sql, handler, 23);
     ```

   - for multiple row of data, use `BeanListHandler`

      ```java
      BeanListHandler<Customer> handler = new BeanListHandler<>(Customer.class);
      list<Customer> list = runner.query(conn, sql, handler, 23);
      ```
      
   - to get result in map, use `MapListHandler` or `MapListHandler`. Map keys are the column name in table, values are values in table.

      ```java
      MapHandler handler = new MapHandler();
      Map<String, Object> map = runner.query(conn, sql, handler, "");
      ```

   - there is also `ArrayHandler`, `ArrayListHandler`

3. select for specific value , use `ScalarHandler`

    ```java
   String sql = "select count(*) from customers";
   ScalarHandler handler = new ScalarHandler();
   Long cout = runner.query(conn, sql, handler);
    ```

4. self define

   ```java
   ResultSetHandler<Customer> handler = new ResultSetHandler<Customer>() {
       @Override
       public Customer handle(ResultSet rs) throws SQLException {
           // ...
       }
   }
   ```

5. close

   ```java
   try {
       DbUtils.close(conn);
   } catch (Exception e) {
       e.printStackTrace();
   }
   ```

   or

   ```java
   DbUtils.closeQuietly(conn);
   ```

   