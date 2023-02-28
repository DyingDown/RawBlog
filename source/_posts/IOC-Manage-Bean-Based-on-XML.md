---
title: IOC Manage Bean Based on XML
date: 2023-02-21 16:29:10
tags: [IOC, Bean, XML]
categories: [Spring6]
postImage: https://cdn.jsdelivr.net/gh/DyingDown/img-host-repo/202302211627686.jpg
---

This is note of learning IOC management.

<!--more-->

## Get Bean

Create an user object in xml

```xml
<bean id="user" class="com.yao.spring6.User"></bean>
```

where id is the identify name and class is full package name + Class name

Use `ApplicationoContext ` to get the xml file. 

```java
ApplicationContext context = new ClassPathXmlApplicationContext("beam.xml");
```

There are three ways to get the object.

1. by id

   ```java
   User user = (User) context.getBean("user");
   ```

2. by type

   ```java
   User user = context.getBean(User.class);
   ```

   There must be **only one** object defined in XML in which the class type is User.

3. by id and type

   ```java
   User user = context.getBean("user", User.class);
   ```

If defines an interface and want to get the bean object by interface type, there should only be one bean tag in xml that implements the interface.

## dependency injection

How to fill the values after we get the object?

1. Using set method

   Write `setXX()` method in each class for each property. And then call them after get a new object.

2. using constructor

   Write constructor with parameter that fill each property.

So how do we do it in Spring?

### Set method

First we need to generate setters for our class

```java
package org.example;

public class Book {
    String bookName;
    String author;
    
    public void setBookName(String bookName) {
        this.bookName = bookName;
    }

    public void setAuthor(String author) {
        this.author = author;
    }
}

```

Then the xml is wrote like this:

```xml
<bean id="book" class="org.example.Book">
    <property name="bookName" value="三体"></property>
    <property name="author" value="刘慈欣"></property>
</bean>
```

Name is the name of each property.

Then we can get the object by `ApplicationContext`.

### Constructor

First we need to have a constructor function

```java
public class Book {
    String bookName;
    String author;

    public Book(String bookName, String author) {
        this.bookName = bookName;
        this.author = author;
    }
}
```

Then in xml, we write:

```xml
<bean id="bookCon" class="org.example.Book">
    <constructor-arg name="bookName" value="三体"></constructor-arg>
    <constructor-arg name="author" value="刘慈欣"></constructor-arg>
</bean> 
```

name is the name of each property.

There are four different types of value.

1. variable, just use `value` to set the value

2. NULL, use `<null></null> ` or `<null/>` inside to present a null value

   ```xml
   <bean id="bookCon" class="org.example.Book">
       <property name="bookName" value="三体"></property>
       <property name="author">
           <null></null>
       </property>
   </bean>
   ```

3. if the value contains xml code, use escape character

   ```xml
   <bean id="bookCon" class="org.example.Book">
       <property name="bookName" value="&lt; &lg;"></property>
   </bean>
   ```

4. CDATA 

   ```xml
   <bean id="bookCon" class="org.example.Book">
       <property name="bookName">
           <value><![CDATA[a < b]]></value>
       </property>
   </bean>
   ```

## Special type property

### Object

Assume we have two class, and one class use other class as a property

```java
public class Department {
    private String name;
    // some set methods...
}
public class Employee {
    private int age;
    private String name;
    private Department dep;
    // some set methods...
}
```

#### outer bean

 ```xml
<bean id="department" class="org.example.di.Department">
    <property name="name" value="development"></property>
</bean>

<bean id="employee" class="org.example.di.Employee">
    <property name="name" value="Jonn"></property>
    <property name="age" value="25"></property>
    <!-- Department class value type -->
    <property name="dep" ref="department"></property>
</bean>
 ```

Use `ref` as a reference to other bean tag. And value of `ref` is the `id` of another bean.

#### inner bean

```xml
<bean id="employee2" class="org.example.di.Employee">
    <property name="name" value="Marry"></property>
    <property name="age" value="18"></property>
    <!-- Department class value type -->
    <property name="dep">
        <bean id="department2" class="org.example.di.Department">
            <property name="name" value="finance"></property>
        </bean>
    </property>
</bean>
```

#### Cascade assignment

you can change the value of the object type property.

```xml
<bean id="department3" class="org.example.di.Department">
    <property name="name" value="development"></property>
</bean>

<bean id="employee3" class="org.example.di.Employee">
    <property name="name" value="Jonn"></property>
    <property name="age" value="25"></property>
    <property name="dep" ref="department3"></property>
    <!-- change value of object type -->
    <property name="dep.name" value="sale"></property>
</bean>
```

### Array

Let's add an array to the `Employee ` and its setter function.t 

 ```java
public class Employee {
    private int age;
    private String name;
    private Department dep;
    private String[] hobbies;
}
 ```

So we use `<array></array>` tag to set array value.

```xml
<bean id="employee" class="org.example.di.Employee">
    ...
    <property name="hobbies">
        <array>
            <value>eat</value>
            <value>sleep</value>
            <value>play</value>
        </array>
    </property>
</bean>
```

### List Array

Add an List to `Department` and its setter function.

```java
public class Department {
    private String name;
    private List<Employee> employeeList;
}
```

Since the type of List is an object, we need to create multiple `bean` tags

```xml
<bean id="empone" class="org.example.di.Employee">
    <property name="name" value="Jonn"></property>
    <property name="age" value="25"></property>
</bean>

<bean id="emptwo" class="org.example.di.Employee">
    <property name="name" value="Sandy"></property>
    <property name="age" value="26"></property>
</bean>

<bean id="department" class="org.example.di.Department">
    <property name="name" value="development"></property>
    <property name="employeeList">
        <list>
            <ref bean="empone"></ref>
            <ref bean="emptwo"></ref>
        </list>
    </property>
</bean>
```

### Map

Change to two simple class

```java
public class Student {
    private String id;
    private String name;
    private Map<String, Teacher> teacherMap;
    private List<String> course;
}
public class Teacher {
    private String id;
    private String name;
}
```

```xml
<bean id="teacher" class="org.example.dimap.Teacher">
    <property name="id" value="101"></property>
    <property name="name" value="Lucy"></property>
</bean>

<bean id="student" class="org.example.dimap.Student">
    <property name="id" value="2051"></property>
    <property name="name" value="Sam"></property>
    <property name="teacherMap">
        <map>
            <entry>
                <key>
                    <value>Math</value>
                </key>
                <ref bean="teacher"></ref>
            </entry>
        </map>
    </property>
</bean>
```

### List Type Bean

add another `Lesson` Class

```java
public class Lesson {
    private String name;
}
public class Student {
    private String id;
    private String name;
    private Map<String, Teacher> teacherMap;
    private List<Lesson> course;
}
```

First, we need to add namespace `util` to the xml file

```xml
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:util="http://www.springframework.org/schema/util"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
       http://www.springframework.org/schema/beans/spring-beans.xsd
       http://www.springframework.org/schema/util
       http://www.springframework.org/schema/util/spring-util.xsd">
</beans>
```

Then we add some `Lesson`s and some `Teacher`s 

```xml
<bean id="lesson1" class="org.example.dimap.Lesson">
    <property name="name" value="Math"></property>
</bean>
<bean id="lesson2" class="org.example.dimap.Lesson">
    <property name="name" value="Python Lesson"></property>
</bean>

<bean id="teacher1" class="org.example.dimap.Teacher">
    <property name="id" value="101"></property>
    <property name="name" value="Lucy"></property>
</bean>

<bean id="teacher2" class="org.example.dimap.Teacher">
    <property name="id" value="546"></property>
    <property name="name" value="Tom"></property>
</bean>
```

Then add the `<util:xxx></util:xxx>` tag and reference it in student bean tag.

```xml
<util:list id="lessonList">
    <ref bean="lesson1"></ref>
    <ref bean="lesson2"></ref>
</util:list>

<util:map id="tchrMap">
    <entry>
        <key>
            <value>Math</value>
        </key>
        <ref bean="teacher1"></ref>
    </entry>
    <entry>
        <key>
            <value>Python Lesson</value>
        </key>
        <ref bean="teacher2"></ref>
    </entry>
</util:map>

<bean id="student" class="org.example.dimap.Student">
    <property name="id" value="2051"></property>
    <property name="name" value="Sam"></property>
    <property name="course" ref="lessonList"></property>
    <property name="teacherMap" ref="tchrMap"></property>
</bean>
```

### P namespace

P namespace is to avoid conflicts among property names.

it write in the header of xml file like this

```xml
<beans ...
       xmlns:p="http://www.springframework.org/schema/p"
       xsi:schemaLocation=" ... ">
</beans>
```

Then use p tag property like this:

```xml
<bean id="student" class="org.example.dimap.Student"
      p:id="2051" p:name="Sam" p:course-ref="lessonList" p:teacherMap-ref="tchrMap">
</bean>
```

## Using outer property file

### Add dependencies

add MySQL  and connection pool dependencies.

```xml
<dependencies>
    <dependency>
        <groupId>mysql</groupId>
        <artifactId>mysql-connector-java</artifactId>
        <version>8.0.29</version>
    </dependency>

    <dependency>
        <groupId>com.alibaba</groupId>
        <artifactId>druid</artifactId>
        <version>1.2.16</version>
    </dependency>
</dependencies>
```

### Properties file

create the file  under source folder.

```properties
user=root
password=123
url=jdbc:mysql://localhost:3306/test
driverClass=com.mysql.jdbc.Driver
```

### Xml bean file

Create a new xml file under source folder and add `context` namespace

```xml
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
       http://www.springframework.org/schema/beans/spring-beans.xsd
       http://www.springframework.org/schema/context
       http://www.springframework.org/schema/context/spring-context.xsd">

</beans>
```

And then we need to introduce the `properties`  file

```xml
<context:property-placeholder location="classpath:jdbc.properties"></context:property-placeholder>
```

Then add connection pool in xml

```xml
<bean id="connectionPool" class="com.alibaba.druid.pool.DruidDataSource">
    <property name="url" value="${url}"></property>
    <property name="password" value="${password}"></property>
    <property name="username" value="${user}"></property>
    <property name="driverClassName" value="${driverClass}"></property>
</bean>
```

## Scope of bean

Use scope in bean tag can control whether the instance is singleton or prototype.

|   value   |                    meaning                    |    when to create     |
| :-------: | :-------------------------------------------: | :-------------------: |
| singleton | object related to the bean is only one in IOC | when initializing IOC |
| prototype |  multiple object related to this bean in IOC  |   when getting bean   |

```xml
<bean id="" class="" scope="singleton"></bean>
```

is scope is not specified, default value is singleton.

## Life cycle of bean

1. create bean object (call parameterless constructor)
2. set properties for bean object
3. bean post processor(before initialization)
4. initialize bean object (`init-method="xxxx"`)
5.  bean post processor(after initialization)
6. bean object create finished
7. destroy bean object(`destroy-method="xxxx"`) and use `context.close()` to call the destroy method.
8. close IOC

## FactoryBean

If the class is an implement of `FactoryBean`, then creating the object in xml will get the the object that `getObject()` returns.

> A `FactoryBean` is a pattern to encapsulate interesting object construction logic in a class.

## Auto load based on xml

If Class has a property that is the type of Class B, then when write it in bean, setting `autowire` will automatically find its referenced instance by Type or by Name.

```xml
<bean id="" class="xxx.xxx.B"></bean>
<bean id="" class="xxx.xxx.A" autowire="byType"></bean>
```

### ByType

If can't find the suitable bean, then will set this property to null.

If find many beans that suits, then will throw exception: `NoUniqueBeanDefininationException`.

### ByName

the property name should keep same with the bean `id`.