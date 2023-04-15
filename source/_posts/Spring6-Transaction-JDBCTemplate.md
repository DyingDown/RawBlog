---
title: Spring6 Transaction JDBC Template
date: 2023-03-01 16:04:36
tags: [Java, Transaction, JDBC Template]
categories: Spring6
postImage: https://cdn.jsdelivr.net/gh/DyingDown/img-host-repo/202303020030809.jpg
---

Note of learning JDBC Template(To be finished...)

<!--more-->

## Intro

> **This is the central class in the JDBC core package.** It simplifies the use of JDBC and helps to avoid common errors. It executes core JDBC workflow, leaving application code to provide SQL and extract results. 

Add dependencies

```xml
<dependencies>
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-jdbc</artifactId>
        <version>6.0.5</version>
    </dependency>

    <dependency>
        <groupId>mysql</groupId>
        <artifactId>mysql-connector-java</artifactId>
        <version>8.0.32</version>
    </dependency>

    <dependency>
        <groupId>com.alibaba</groupId>
        <artifactId>druid</artifactId>
        <version>1.2.16</version>
    </dependency>
</dependencies>
```

Then create a properties file to set basic information to connect to a database.

```properties
jdbc.user=root
jdbc.password=root
jdbc.url=jdbc:mysql://localhost:3306/spring?characterEncoding=utf8&useSSL=false
jdbc.driver=com.mysql.cj.jdbc.Driver
```

Then create beans.xml file

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
       http://www.springframework.org/schema/beans/spring-beans.xsd
       http://www.springframework.org/schema/util
       http://www.springframework.org/schema/util/spring-context.xsd">
</beans>
```

Add outer property file in xml:

```xml
<!--create data source object-->
<context:property-placeholder location="classpath:jdbc.properties"></context:property-placeholder>

<bean id="druidDataSource" class="com.alibaba.druid.pool.DruidDataSource">
    <property name="url" value="${jdbc.url}"></property>
    <property name="driverClassName" value="${jdbc.driver}"></property>
    <property name="username" value="${jdbc.user}"></property>
    <property name="password" value="${jdbc.password}"></property>
</bean>
```

Then crate an JDBC object.

```xml
<bean id="jdbcTemplate" class="org.springframework.jdbc.core.JdbcTemplate">
    <property name="dataSource" ref="druidDataSource"></property>
</bean>
```

## CRUD

Then lets create a database to test the crud operations.

```mysql
 create table `t_emp` (
     `id` INT(11) NOT NULL AUTO_INCREMENT,
     `name` VARCHAR(20),
     `age` INT(11),
     `sex` varchar(2),
     PRIMARY KEY (`id`)
) engine=innodb default charset=utf8mb4;
```

and then create the JDBC class

```java
@SpringJUnitConfig(locations = "classpath:beans.xml")
public class JDBCTemplateTest {
    @Autowired
    private JdbcTemplate jdbcTemplate;
}
```

### Update

Before the code, I have to mention the error I met when running the test method.

We need to import the `import org.junit.jupiter.api.Test;` for **@Test**, or it will occur errors without creating the `JdbcTemplate` as null. And It took a long time to figure it out because I just said null of Jdbc Template but not know why is null. 

insert data

```java
public void testUpdate() {
    String sql = "INSERT INTO t_emp VALUES(NULL,?,?,?)";
    int rows = jdbcTemplate.update(sql,"王心凌", 50, "女");
    System.out.println(rows);
}
```

update data

```java
public void testUpdate() {
    String sql = "Update t_emp set age=? where id=?";
    int rows = jdbcTemplate.update(sql,32, 3);
    System.out.println(rows);
}
```

delete data

```java
public void testUpdate() {
    String sql = "delete from t_emp where name=?";
    int rows = jdbcTemplate.update(sql,"王心凌");
    System.out.println(rows);
}
```

### Select

#### Method 1

```java
queryForObject(String sql, RowMapper<T> rowMapper, Object...args)
```

Among the parameters, the `rowMapper` is combined with two parameters: `rs(result set)` and `rowNum`.

And in order to receive the result, wo need to make an class as the type of the result.  

So first we need to create an class that contains the columns property of this table with its getters and setters methods :

```java
public class Emp {
    private Integer id;
    private String name;
    private Integer age;
    private String sex;
    // getters, setters, toString
}
```

Then we can new an object when getting the results, and the result is stored in `RowMapper`.

```java
public void testSelect() {
    String sql = "select * from t_emp where id=?";
    Emp result = jdbcTemplate.queryForObject(sql, (rs, rowNum) -> {
        Emp emp = new Emp();
        emp.setId(rs.getInt("id"));
        emp.setAge(rs.getInt("age"));
        emp.setName(rs.getString("name"));
        emp.setSex(rs.getString("sex"));
        return emp;
    }, 2);
    System.out.println(result);
}
```

#### Method 2

we can use a quicker way to avoid assign values.

```java
public void testSelect() {
    String sql = "select * from t_emp where id=?";
    Emp emp = jdbcTemplate.queryForObject(sql, new BeanPropertyRowMapper<>(Emp.class), 2);
    System.out.println(emp);
}
```

#### List

```java
public void testSelectList() {
    String sql = "select * from t_emp";
    List<Emp> resultLists = jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(Emp.class));
    System.out.println(resultLists);
}
```

#### Single Value

```java
public void testSelectList() {
    String sql = "select * from t_emp";
    List<Emp> resultLists = jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(Emp.class));
    System.out.println(resultLists);
}
```

