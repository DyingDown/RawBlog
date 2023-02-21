---
title: Spring Framework 6.0 Overview
date: 2023-02-14 10:33:35
tags: [Java, Spring6, Java EE]
categories: [Spring]
postImage: https://cdn.jsdelivr.net/gh/DyingDown/img-host-repo/202302141431145.jpg
---

This is a note of studying Spring.

<!--more-->

## Overview

1. The Spring Framework (Spring) is *an open-source and lightweight application framework that provides infrastructure support for developing Java applications*.
2.  simplifies enterprise applications

3. Spring has two parts, IOC and AOP
   - IoC (**Inversion of Control**) Container is the core of Spring Framework. It creates the objects, configures and assembles their dependencies, manages their entire life cycle. 
   - **Aspect-Oriented Programming** (AOP) is one of the key elements of the Spring Framework. AOP praises Object-Oriented Programming in such a way that it also provides modularity. But the key point of modularity is the aspect than the class. AOP breaks the program logic into separate parts called concerns.

4. Features:
   - helps decouple, simplify development
   - Support AOP development
   - easy to test
   - easy to integrate with other frameworks
   - easy to do with transaction
   - easy to develop API

## Download

download here: [https://spring.io/projects/spring-framework#learn](https://spring.io/projects/spring-framework#learn)

## How to start

1. create a project using maven and then creating a module inside it.

2. Find the `pom.xml` file in module and modify it. Add some configs.

   Add `spring context`  and `junit` dependency

   ```xml
       <dependencies>
           <dependency>
               <groupId>org.springframework</groupId>
               <artifactId>spring-context</artifactId>
               <version>6.0.2</version>
           </dependency>
   
           <dependency>
               <groupId>org.junit.jupiter</groupId>
               <artifactId>junit-jupiter-api</artifactId>
               <version>5.6.3</version>
           </dependency>
       </dependencies>
   
   ```

   Then click this to refresh, maven will install the dependencies, if not, try this command `mvn clean install -U`

   <img src="https://cdn.jsdelivr.net/gh/DyingDown/img-host-repo/202302141605336.png" style="zoom:67%;" />

3. create a package and class and write some simple code.  For example: 

   ```java
   package com.yao.spring6;
   
   public class User {
   
       public void add() {
           System.out.println("add ...");
       }
       
       public User() {
           System.out.println("Constructor function ran.");
       }
   }
   ```

4. create config file for spring

   create a `xxx.xml` file in `source` under the  package directory you just created. New->XML Configuration File->Spring Config

   ```xml
   <?xml version="1.0" encoding="UTF-8" ?>
   <beans xmlns="http://www.springframework.org/schema/beans"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">
   </beans>
   ```

## Create Class Object using xml

### Create

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">

    <!--    create a User object-->
    <bean id="user" class="com.yao.spring6.User"></bean>
</beans>
```

The `id` a unique identify, `class` is package path + class Name

### Test

Then we can write test to test if it works.

1. load spring configuration file

   ```java
   ApplicationContext context = new ClassPathXmlApplicationContext("bean.xml");
   ```

2. get object

   ```java
   User user = (User) context.getBean("user");
   System.out.println(user);
   ```

3. call the method

   ```java
   user.add();
   ```

So here is the total ways of test, the following is the complete code.

```java
package com.yao.spring6;

import org.junit.jupiter.api.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class TestUser {

    @Test
    public void testUserObject() {
        ApplicationContext context = new ClassPathXmlApplicationContext("bean.xml");

        User user = (User) context.getBean("user");
        System.out.println(user);

        user.add();
    }
}
```

## Summary

Let's look at the out put of the test

```
Constructor function ran.
com.yao.spring6.User@1786f9d5
add ...
```

First we can see the constructor executed.

Then, how does the object created? Think of the way the object can be created. Apparently, the object is created using reflection.

reflection: 

1. load the `bean.xml` file

2. parse the file

3. get the `id` and `class` of `bean` tag 

4. using reflection to create the object

   ```java
   Class clazz = Class.forName("com.yao.spring6.User");
   User user = (User) clazz.getDeclaredConstructor().newInstance();
   ```