---
title: JDBC Database Connection
date: 2023-02-11 11:47:27
tags: [Java, Database, Connection]
categories: [JDBC]
postImage: https://cdn.jsdelivr.net/gh/DyingDown/img-host-repo/202302111549511.jpg
---

I'm currently learning JDBC to operate database. This article is an note of what I learnt.

<!--more-->

## What Is JDBC

> Java™ database connectivity (JDBC) is the JavaSoft specification of a standard application programming interface (API) that allows Java programs to access database management systems. The JDBC API consists of a set of interfaces and classes written in the Java programming language.

This helps Java developer to write code more easily when coming to different database. You don't need  to write a new code to adapt the different database, it can be done in almost the same code using JDBC.

## How to connect to DB

### read config information

We use a config file to set user and password and database URL information, so that when we change database, we *don't need to compile the code again*, and we *separate the code and data*. 

Because we use Properties to get the file, we can store file in` jdbc.properties` in `src` folder.

We set four properties for the database:

```properties
user=root
password=123
url=jdbc:mysql://localhost:3306/test
driverClass=com.mysql.jdbc.Driver 
```

The URL is different for different database, you can search the format in each database driver's README file.

```java
InputStream is = db_conn.class.getClassLoader().getResourceAsStream("jdbc.properties");

Properties pros = new Properties();
pros.load(is);

String user = pros.getProperty("user");
String password = pros.getProperty("password");
String url = pros.getProperty("url");
String driver = pros.getProperty("driverClass");
```

### load drive

We can just write `Class.forName(driver);`

We don't need to write 

```java
Driver driver = (Driver) clazz.NewInstance();
// Register driver:
DriverManager.registerDriver(driver)
```

Because  In MySQL driver class, there is the code, so we don't need to write them, the code in MySQL driver is :

```java
static {
	try{
        java.sql.DriverManager.registerDriver(new Driver());
    } catch (SQLException E) {
        throw new RuntimeException("Can't register driver!")；
    }
}
```

### Get connection

```java
Connection conn = DriverManager.getConnection(url, user, password);
```

### Close connection

```java
public void closeResource(Connection conn) {
	try {
        if(conn != null) {
            conn.close();
        }
    } catch (Exception e) {
        e.printStackTrace();
    }
}
```

### Complete Code

```java
import java.io.InputStream;
import java.sql.Connection;
import java.sql.DriverManager;
import java.util.Properties;

public class JDBCUtils {
    public Connection getConnection() throws Exception{
        // 1. read config information
        InputStream is = db_conn.class.getClassLoader().getResourceAsStream("jdbc.properties");
        
        Properties pros = new Properties();
        pros.load(is);

        String user = pros.getProperty("user");
        String password = pros.getProperty("password");
        String url = pros.getProperty("url");
        String driver = pros.getProperty("driverClass");

        // 2. load drive
        Class.forName(driver);

        // 3. get connection
        Connection conn = DriverManager.getConnection(url, user, password);
        return conn;
    }
    public void closeResource(Connection conn) {
    	try {
            if(conn != null) {
                conn.close();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

```

