---
title: JDBC DAO
date: 2023-02-13 09:33:18
tags: [Java, Database, DAO]
categories: JDBC
postImage: https://cdn.jsdelivr.net/gh/DyingDown/img-host-repo/202302131017086.png
---

This is a note.

DAO: Data Access Object, Including just CRUD(Create, Read, Update, Delete).

<!--more-->

## Base DAO Code

This code is considered using transaction.

### Common Update, Insert, Delete

```java
public static void update(Connection conn, String sql, Object... args) {
    PreparedStatement ps = null;
    try {
        // 1. get connection to database
        conn = JDBCUtils.getConnection();
        // 2. pre-complile sql
        ps = conn.prepareStatement(sql);
        // 3. fill the placehoder
        for (int i = 0; i < args.length; i++) {
            ps.setObject(i + 1, args[i]);
        }
        // 4. execute
        ps.execute();
        // 5.close resource
    } catch (Exception e) {
        e.printStackTrace();
    } finally {
        JDBCUtils.closeResource(null, ps);
    }
}
```

### Common Select One element

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
        // get metadata
        ResultSetMetaData metaData = rs.getMetaData();
        // get number of colums from ResultSetMetaData
        int columnCount = metaData.getColumnCount();
        if (rs.next()) {
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

### Common get multiple instances

```java
public <T> List<T> queryForList(Connection conn, Class<T> clazz, String sql, Object... args) {
    PreparedStatement ps = null;
    ResultSet rs = null;
    try {
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
        JDBCUtils.closeResource(null, ps, rs);
    }
    return null;
}
```

### Common search for special value

```java
public <E> E getValue(Connection conn, String sql, Object ...args) {
    PreparedStatement ps = null;
    ResultSet rs = null;
    try {
        ps = conn.prepareStatement(sql);
        for(int i = 0; i < args.length; i ++) {
            ps.setObject(i + 1, args[i]);
        }
        rs = ps.executeQuery();
        if(rs.next()) {
            return (E) rs.getObject(1);
        }
    } catch (Exception e) {
        e.printStackTrace();
    } finally {
        JDBCUtils.closeResource(null, ps, rs);
    }
    return null;
}
```

These are the base function, we won't be creating object base on this, so the wrapper class should be abstract;

```java
public abstract class baseDAO<T> {
    private Class<T> clazz = null;
    
    {
        Type genericSuperclass = this.getClass().getGenericSuperclass();
        ParameterizedType paramType = (ParameterizedType) genericSuperclass;
        paramType.getActualTypeArguments(); // get parent class generic 
        Type[] typeArguments = paramType.getActualTypeArguments();
        clazz = (Class<T>) typeArguments[0];
    }
    
    public static void update(Connection conn, String sql, Object... args) {
        // ...
    }

    public T getInstance(Connection conn, Class<T> clazz, String sql, Object... args) {
        // ...
    }
    
    public List<T> queryForList(Connection conn, Class<T> clazz, String sql, Object... args) {
        // ...
    }
    
    public <E> E getValue(Connection conn, String sql, Object ...args) {
        // ...
    }
}
```

Will provide specific DAO according to each specific table.