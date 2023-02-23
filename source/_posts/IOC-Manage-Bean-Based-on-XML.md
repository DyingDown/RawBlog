---
title: IOC Manage Bean Based on XML
date: 2023-02-21 16:29:10
tags:
categories:
postImage: https://cdn.jsdelivr.net/gh/DyingDown/img-host-repo/202302211627686.jpg
---

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

### set method

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