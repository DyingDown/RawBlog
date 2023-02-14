---
title: JDBC Database Connection Pool
date: 2023-02-13 21:10:31
tags: [Java, Database, Connection Pool]
categories: JDBC
postImage: https://cdn.jsdelivr.net/gh/DyingDown/img-host-repo/202302140051076.jpg
---

This article is note about learning Connection Pool.

<!--more-->

## Connection Pool

> Connection pooling means that **connections are reused rather than created each time a connection is requested**. To facilitate connection reuse, a memory cache of database connections, called a connection pool, is maintained by a connection pooling module as a layer on top of any standard JDBC driver product.

## Some open source Connection Pool

- DBCP: offered by Apache, faster than c3p0, but has some bugs
- C3P0: offered by open source organization.  relatively slow, but with good stability. Advised by hibernate.
- Proxool:  an open project under sourceforge, can monitor the status of connection pool, but not so stable compared to c3p0
- BoneCP: fast speed
- Druid: offered by Alibaba, combine the best of BDCP, C3P0, Proxool, but speed is not sure to faster than BoneCP

## Implements of Connection Pools

### C3P0

1. [download the source on sourceforge](https://sourceforge.net/projects/c3p0/) add `\lib\c3p0-x.x.x.x.jar` to `/lib` folder
2. then build path for it.

#### Method 1

1. get c3p0 database connection pool

   ```java
   ComboPooledDataSource cpds = new ComboPooledDataSource();
   cpds.setDriverClass("com.mysql.jdbc.Driver"); // loads the jdbc driver
   cpds.setJdbcUrl("jdbc:mysql://localhost:3306/testdb");
   cpds.setUser("dbuser");
   cpds.setPassword("dbpassword");
   ```

4.  by setting related parameters, helps to manage the connection pool

   ```java
   cpds.setInitialPoolSize(10);
   ```

5. return connection

   ```java
   Connection conn = cpds.getConnection();
   return conn;
   ```

#### Method 2 - xml config

1. create a new `c3p0-config.xml` file in `/src` folder

2. write the xml flie

   ```java
   <?xml version="1.0" encoding="UTF-8"?>
   <c3p0-config>
   
     <named-config name="intergalactoApp"> 
       <!-- four base information for getting a connection  -->
       <property name="driverClass">com.mysql.jdbc.Driver</property>
       <property name="jdbcUrl ">jdbc:mysql://localhost:3306/test</property>
       <property name="user">root</property>
       <property name="password">123abc</property>
   
       <!-- basic properties to manage connection pool -->
       <property name="acquireIncrement">5</property> 
       <property name="initialPoolSize">10</property>
       <property name="minPoolSize">10</property>
       <property name="maxPoolSize">100</property>
       <property name="maxStatements">50</property>
       <property name="maxStatementsPerConnection">2</property>
   
     </named-config>
   </c3p0-config>
   ```

   - **acquireIncrement**: when the connection is not enough, the number of connection that c3p0 will apply for to database server.
   - **initialPoolSize**: number of connection when initialize
   - **minPoolSize**: minimum number of connection the pool will maintain
   - **maxPoolSize**:  maximum number of connection the pool will maintain
   - **maxStatements**: maximum number of Statement the pool will maintain
   - **maxStatementsPerConnection**: maximum number of Statement each connection can use

3. call the xml file

   ```java
   ComboPooledDataSource cpds = new ComboPooledDataSource("intergalactoApp");
   Connection conn = cpds.getConnection();
   ```

   but actually, it's the `new ComboPooledDataSource("intergalactoApp")` should be write out side function wrapper. To avoid creating a pool each  time getting a connection.

   ```java
   private static ComboPooledDataSource cpds = new ComboPooledDataSource("intergalactoApp");
   public Connection testGetConnection2() throws Exception {
       Connection conn = cpds.getConnection();
       return conn;
   }
   ```

### DBCP

Download the bin file here [https://commons.apache.org/proper/commons-dbcp/download_dbcp.cgi](https://commons.apache.org/proper/commons-dbcp/download_dbcp.cgi)

Add `commons-dbcp2-x.x.x.jar` to file path

Also need to download the `commons-pool2`  and do the same thing. [https://commons.apache.org/proper/commons-pool/download_pool.cgi](https://commons.apache.org/proper/commons-pool/download_pool.cgi)

#### Method 1

```java
public Connection testGetConnection() throws Exception {
    // create DBCP connection pool
    BasicDataSource source = new BasicDataSource();

    // set basic information
    source.setDriverClassName("com.mysql.jdbc.Driver");
    source.setUrl("jdbc://mysql///test");
    source.setUsername("root");
    source.setPassword("1122");

    // settting about manage pool
    source.setInitialSize(10);
    source.setMaxTotal(10);

    Connection conn = source.getConnection();
    return conn;
}
```

#### Method 2 - config file

1. creating a properties file

   ```properties
   username=root
   password=123
   url=jdbc:mysql://localhost:3306/test
   driverClassName=com.mysql.jdbc.Driver
   
   initialSize=10
   ```

2. load file

   ```java
   // method 1
   InputStream is = ClassLoader.getSystemClassLoader().getResourceAsStream("dbcp.properties");
   // method 2
   FileInputStream is = new FileInputStream(new File("src/dbcp.properties"));
   
   pros.load(is);
   ```

whole code:

```java
private static DataSource source;
static {
    try {
        Properties pros = new Properties();
        // InputStream is = ClassLoader.getSystemClassLoader().getResourceAsStream("dbcp.properties");
        FileInputStream is = new FileInputStream(new File("src/dbcp.properties"));
        pros.load(is);
        source = BasicDataSourceFactory.createDataSource(pros);
    } catch (Exception e) {
        e.printStackTrace();
    }
}
public Connection testGetConnection2() throws Exception {
    // create DBCP connection pool 
    Connection conn = source.getConnection();
    return conn;
}
```



