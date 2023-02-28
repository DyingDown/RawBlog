---
title: IOC Manage Bean Based on Annotation
date: 2023-02-24 16:58:09
tags: [IOC, Bean, Annotation]
categories: [Spring6]
postImage: https://cdn.jsdelivr.net/gh/DyingDown/img-host-repo/202302271208188.jpg
---

This is note of learning IOC management.

<!--more-->

## Annotations

> In the Java computer programming language, an annotation is **a form of syntactic metadata that can be added to Java source code**. Classes, methods, variables, parameters and Java packages may be annotated.

Format: `@AnotationName(property1=value1...)`

## Steps

1. add dependency

2. turn on component scan 

   Bean will not use annotations to manage bean by default, so we need to configure it in XML.  Use`context:component-scan` to open it.

   First add namespace of context

   ```xml
   <beans xmlns="http://www.springframework.org/schema/beans"
          xmlns:context="http://www.springframework.org/schema/context"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          xsi:schemaLocation="http://www.springframework.org/schema/beans
          http://www.springframework.org/schema/beans/spring-beans.xsd
          http://www.springframework.org/schema/context
          http://www.springframework.org/schema/context/spring-context.xsd">
   ```

   Then add component scan.

   ```xml
   <context:component-scan base-package="org.example"></context:component-scan>
   ```

   Use the followings to exclude package for scan. if `type=annotation`, exclude by annotation, if `type = assignable`, exclude by type.

   ```xml
   <context:exclude-filter type="annotation" expression="package.full.name">
   ```

   There is also `include-filter` just like `exclude-filter` and means the opposite.

   The base package is the package name you want to add annotations control on. Package under the `base-package` will turn on component scan.

3. Then add annotation on class

   ```java
   @Component(value = "user");
   ```

   There are also `@Service`, `@Repository`, `@Controller` that has the same effect as `@Component` but should on different layer of project.

   `value` can be omit. `@Component("user");`

4. Use `ApplicationContext` and `getBean()` to get the object,  the same as using xml to create object.

## @Autowired injection

Code sample

```
├─java
│  └─org
│      └─example
│          ├─controller
|          |   └─UserController.java
│          ├─dao
|          |   ├─UserDao.java
|          |   └─UserDaoImpl.java
│          └─service
|              ├─UserService.java
|              └─UserServiceImpl.java
└─resources
   ├─bean.xml
   └─log4j2.xml
```

Class `UserDaoImpl` is an implement of Interface `UserDao`, Class `UserServiceImpl` is an implement of Interface `UserService`, and `UserController` in an class.

First we add `@Repository`, `@Service`, `@Controller` to each class or interface to create the object.

Let service use dao, controller use service

so like this

```java
@Controller
public class UserController {
    private UserService userService;
}

public class UserServiceImpl implements UserService{
    private UserDao userDao;
}
```

### Property injection

Add `@Autowired` to property, then it will automatically find the object by its property type.

In this case, we can add `@Autowired` to class property, in order to automatically find the certain class when it's type is an interface type.

```java
@Controller
public class UserController {
    @Autowired
    private UserService userService;
}

public class UserServiceImpl implements UserService{
    @Autowired
    private UserDao userDao;
}
```

### Set injection

Add `@Autowired` to setter function, will also automatically find object by type.

```java
@Controller
public class UserController {
    private UserService userService;

    @Autowired
    public void setUserService(UserService userService) {
        this.userService = userService;
    }
}

public class UserServiceImpl implements UserService{
    private UserDao userDao;

    @Autowired
    public void setUserDao(UserDao userDao) {
        this.userDao = userDao;
    }
}
```

### Constructor function injection

Add `@Autowired` to the constructor function is the same.

### Parameter injection

We can also add `@Autowired` to parameters in constructor function.

```java
public class UserServiceImpl implements UserService{
    private UserDao userDao;

    public void setUserDao(@Autowired UserDao userDao) {
        this.userDao = userDao;
    }
}
```

### One constructor case

If there is **only one constructor** function, we can omit the `@Autowire`

```java
public class UserServiceImpl implements UserService{
    private UserDao userDao;

    public void setUserDao(UserDao userDao) {
        this.userDao = userDao;
    }
}
```

This works fine, too.

### @Qualifier

The above cases, we are talking about injection by type. This requires there is only one implement of the interface. But if there are more than one implements, it can't find object.

If we add another Class `UserRedisDao` to implements `userDao`.

Use `@Qualifier`  and `@Autowired` to auto injection by name.

```java
public class UserServiceImpl implements UserService{
    private UserDao userDao;
	
    @Autowired
    @Qualifier(value = "userRedisDao")
    public void setUserDao(UserDao userDao) {
        this.userDao = userDao;
    }
}
```

The value is the name of the class with the first letter in lower case.

## @Resource Annotation

`@Resource is a part of the jdk`, so this annotation is more universal.

It will assemble the object by name. if there is no name, use the property name.

And it can only used in property, setter function.

If the JDK is greater than 11 and lower than 8, then we need to add dependency in order to use it.

```xml
<dependency>
    <groupId>jakarta.annotation</groupId>
    <artifactId>jakarta.annotation-api</artifactId>
    <version>2.1.1</version>
</dependency>
```

The example using Resource

```java
@Controller
public class UserController {

    @Resource(name = "myUserService")
    private UserService userService;
}

@Service("myUserService")
public class UserServiceImpl implements UserService{
}
```

Or we can not specify the name, but use property name.

```java
@Controller
public class UserController {
    private UserService myUserService;
}

@Service("myUserService")
public class UserServiceImpl implements UserService{
}
```

If the name is not specified and the property name is not the same, then it will inject by type.

## All annotation develop

we use a config class to replace xml configuration.

```java
@Configuration
@ComponentScan("org.example")
public class configuration {
}
```

And we get the object by configuration class.

```java
public class configTest {
    ApplicationContext context = new AnnotationConfigApplicationContext(configuration.class);
    UserController controller = context.getBean(UserController.class);
}
```