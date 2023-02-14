---
title: JDBC Database Operations
date: 2023-02-11 15:53:47
tags: [Java, Database, Statement, Operation]
categories: JDBC
postImage: https://cdn.jsdelivr.net/gh/DyingDown/img-host-repo/202302120106420.jpg
---

Note about how to operate database using JDBC.

<!--more-->

## Statement

```java
import java.util.Scanner;

public class StatementTest {
    public void testLogin() {
        Scanner scanner = new Scanner(System.in);
        System.out.print("Input user name:");
        String user = scanner.nextLine();
        System.out.print("Input password:");
        String password = scanner.nextLine();

        String sql = "select USER, PASSWORD from user_table WHERE USER = '" + user + "' AND PASSWORD = '" + password + "'";
        User returnUser = get(sql, User.class);
        if (returnUser != null) {
            System.out.print("login success!");
        } else {
            System.out.print("username or password is wrong!");
        }
    }

    public <T> T get(String sql, Class<T> clazz) {
        // ...
        return null;
    }
}

```

## disadvantages:

1. We need to splice the SQL string.

2. there is an SQL injection risk

   if we input `1' or` for username and `=1 or '1' = '1` for the password, we can also login.

   The SQL statement will become:

   ```sql
   SELECT USER, PASSWORD
   FROM user_table
   WHERE USER = '1' OR ' AND PASSWORD = '=1 OR '1' = '1''
   ```

So we don't use *Statement* to operate database, we use **prepared statement**

## Prepared Statement

By using the prepared Statement, the SQL is compiled first, and then put the variables(the value) in it, so it won't be compiled in another way. The main structure of the SQL is not changed.

### Insert, Update, Delete

Because `INSERT`,  `UPDATE`, `DELETE` statements don't have a return value, so we can make them into a common method.

According to the previous article,  we already have a common method that can get connection and close connection.

We modify the `closeResource()` function to make it able to close `PreparedStatement`.

```java
public class JDBCUtils {
    public static Connection getConnection() throws Exception{
        // ...
    }
    public void closeResource(Connection conn, PreparedStatement ps) {
        // ...
        try {
            if(ps != null) {
                ps.close();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
} 

```

Now we can use them to do insert, update, delete SQL statement.

#### Steps

1. connect to Database. use the `JDBCUtils.getConnection()` method we wrote before.

2. pre compile the SQL

   We wrote the SQL in this way: `SELECT * FROM A WHERE id = ?` . the `?` represents the actually value we want to put for.

3. Then fill the placeholder using `PreparedStatement.setObject(index, value)`, the `index` starts with 1.

4. execute SQL using `PreparedStatement.execute()`

   if is an select statement, it returns true, if it is an insert, delete or update statement, it returns false.

5. close resource.

```java
public void update(String sql, Object ...args) {
    Connection conn = null;
    PreparedStatement ps = null;
    try {
        // 1. get connection to database
        conn = JDBCUtils.getConnection();
        // 2. pre-complile sql
        ps = conn.prepareStatement(sql);
        // 3. fill the placehoder
        for(int i = 0; i < args.length; i ++) {
            ps.setObject(i + 1, args[i]);
        }
        // 4. execute
        ps.execute();
    } catch (Exception e) {
        e.printStackTrace();
    } finally {
        // 5.close resource
        JDBCUtils.closeResource(conn, ps);
    }
}
```

### Select

The difference between the previous method and this is that `SELECT` query need to receive a return value to represents the selected rows of data.

#### steps

1. get connection

2. pre compile SQL. In order to write a common select query, the Class used to receive row data must have property name exactly same as the column name or the alias name.

3. fill placeholder

4. execute SQL using `preparedStatement.executeQuery()` and store in result as type `ResultSet`. 

5. correspond row data to specific class type.

   use `ResultSet.next()` to find the next row of data.

   And then we need to find the data properties like how many columns the data has. Use `ResultSetMetaData` and this is got from `ResultSet.getMetaData()`

   To get column numbers, use `ResultMetaData.getColumnCount()`

   For each column use `ResultSetMetaData.getColumnLabel()` instead of `ResultSetMetaData.getColumnName()`

6. close resource.

```java
public <T> List<T> queryForList(Class<T> clazz, String sql, Object... args) {
    Connection conn = null;
    PreparedStatement ps = null;
    ResultSet rs = null;
    try {
        conn = JDBCUtils.getConnection();
        ps = conn.prepareStatement(sql);
        for (int i = 0; i < args.length; i++) {
            ps.setObject(i + 1, args[i]);
        }

        rs = ps.executeQuery();
        // get metadata
        ResultSetMetaData metaData = rs.getMetaData();
        // get number of colums from ResultSetMetaData
        int columnCount = metaData.getColumnCount();
        // create Set object
        ArrayList<T> list = new ArrayList<T>();
        while (rs.next()) {
            T t = clazz.newInstance(); // The clazz must have a constructor without parameters
            for (int i = 0; i < columnCount; i++) {
                // get column value
                Object columnValue = rs.getObject(i + 1);
                // get column name for each column
                // column name: getColumnName();
                // alias name: getColumnLabel();
                String columnName = metaData.getColumnLabel (i + 1);

                // using reflect to set values for the Class
                Field field = clazz.getDeclaredField(columnName);
                field.setAccessible(true);
                field.set(t, columnValue);
            }
            list.add(t);
        }
        return list;
    } catch (Exception e) {
        e.printStackTrace();
    } finally {
        JDBCUtils.closeResource(conn, ps, rs);
    }
    return null;
}
```

See the `clouseResource` function has another parameter, so we add another function with the same name but different parameters to close the `ResultSet`.

### Benefits

1. Can operate `Blob` type data.
2. Efficient at batch operation.