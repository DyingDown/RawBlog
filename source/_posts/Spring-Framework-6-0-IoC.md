---
title: Spring Framework 6.0 IoC
date: 2023-02-21 14:32:07
tags: [Java, Spring6, IoC]
categories: [Spring6]
postImage: https://cdn.jsdelivr.net/gh/DyingDown/img-host-repo/202302211617592.jpg
---

Note of learning Ioc Introduction.

## what is IoC

> Inversion of Control is a principle in software engineering which transfers the control of objects or portions of a program to a container or framework. 

In the Spring framework, the interface `ApplicationContext` represents the IoC container. The Spring container is responsible for instantiating, configuring and assembling objects known as `beans`, as well as managing their life cycles.

## IoC 

First let's look at this question, how to do when we want to call the method of a object inside another object?

```java
class UserService {
	execute() {
		// here we want to call UserDao method add();
	}
}

class UserDao {
    add() {
        // ...
    }
}
```

We can easily think of creating an object and call it.

```java
UserDao dao = new UserDao();
dao.add();
```

But this way, the coupling is high. When the `UserDao` changes position, the code to calling it need to change too.

#### Factory

An advanced method is using Factory.

We create a Factory class and implement the  function of`new UserDao()`. and then call the new method inside `UserService`

```java  
class UserFactory {
    public static  UserDao getDao() {
        return new UserDao();
    }
}

class UserService {
	execute() {
		UserDao dao = UserFactory.getDao();
        dao.add();
	}
}
```

But the coupling is not low.  we can lower it.

#### IOC

Using xml parsing and factory and reflection, we can achieve a low coupling way of calling the method.

First we need to create the object using xml

```xml
<bean id="dao" class="xxx.xxx.UserDao"></bean>
```

Then we create a factory class

```java
class UserFactory {
    public static  UserDao getDao() {
        String classValue = "value of the class" // parse xml
        Class clazz = Class.forName(classValue);
        return (UserDao)clazz.getDeclaredConstructor().newInstance();
    }
}
```

Instead of return the `new UserDao()` directly, we use the class declared in bean.

First we parse the xml and get the class value. Then use reflection to create the object.

So, when you change the location of your `UserDao` class, you only need to change the config file, no need to modify the code.

## Interface

There are two main interfaces of IOC

**BeanFactory**: Base realization of IOC, an inner interfaced used in Spring, not for developer. And it won't create object when loading the config file, only when using will the object created.

**ApplicationContext**: sub interface of BeanFactory, will create object when loading config file. This is recommend because in web environment, we want the time wasting process of creating the object done before.

#### some of the classes:

| class Name                        | Intro                                                        |
| --------------------------------- | ------------------------------------------------------------ |
| `ClassPathXmlApplicationContext`  | Creating an IOC container object by parsing the xml config file under the class path |
| `FileSystemXmlApplicationContext` | Creating an IOC container object by parsing the xml config file under System file path |
| `ConfigurableApplicationContext`  | sub interface of `ApplicationContext`, making `ApplicationContext` have open, close and refresh ability. using `refresh()`, `close()`, etc. |
| `WebApplicationContext`           | For web Application, create IOC container object base on Web environment, and store the object in ServletContext. |

