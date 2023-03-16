---
title: "Spring6 Unit Testing: JUnit-Spring"
date: 2023-03-01 12:09:44
tags: [JUnit, Unit Testing, Java]
categories: Spring6
postImage: https://cdn.jsdelivr.net/gh/DyingDown/img-host-repo/202303011217704.jpg
---

Note of learning JUnit

<!--more-->

In the previous chapter, when we do test, we need to write 

```java
ApplicationContext context = new ClassPathXmlApplicationContext("xxx.xml");
Xxxx xxx = context.getBean(xxx.class);
```

Now we want JUnit help us to create.

## JUnit5

First add dependencies

```xml
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-test</artifactId>
    <version>6.0.2</version>
</dependency>
<dependency>
    <groupId>org.junit.jupiter</groupId>
    <artifactId>junit-jupiter-api</artifactId>
    <version>5.6.3</version>
</dependency>
```

Then we config the xml file and turn on component-scan.

Then we create a User class and add a method and add annotation `@Component`

In the Test class, we can write in this way:

```java
package org.example.junit.junit5;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.junit.jupiter.SpringJUnitConfig;

@SpringJUnitConfig(locations = "classpath:bean.xml")
public class TestJUnit5 {
    @Autowired
    private User user;

    @Test
    public void testUser() {
        System.out.println(user);
        user.run();
    }
}
```

or you use the following to replace `@SpringJUnitConfig`

```java
@ExtendWith(SpringExtension.class)
@ContextConfiguration("classpath:bean.xml")
```

## JUnit4

add dependency

```xml
<dependency>
    <groupId>junit</groupId>
    <artifactId>junit</artifactId>
    <version>4.13.2</version>
    <scope>test</scope>
</dependency>
```

And then write like this:

```java
package org.example.junit.junit4;


import org.example.junit.junit5.User;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("classpath:bean.xml")
public class TestJUnit4 {
    @Autowired
    private User user;

    @Test
    public void test() {
        System.out.println(user);
        user.run();
    }
}
```

