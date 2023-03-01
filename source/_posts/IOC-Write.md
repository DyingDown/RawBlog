---
title: Write IOC Container Step by Step
date: 2023-02-27 23:01:51
tags: [IOC, Java, Spring6, Reflection]
categories: Spring6
postImage: https://cdn.jsdelivr.net/gh/DyingDown/img-host-repo/202302281741792.jpg
---

Note about how to realize a IOC.

<!--more-->

## Java reflection

let's create an example class, that has all the **setters** and **getters** and **constructors**  and a **method** run();

```java
package org.example;

public class Car {
    private String name;
    private int year;
    private String color;

    public Car() {}

    public Car(String name, int year, String color) {
        ...
    }
    public void run() {
        System.out.println("running...");
    }
    
    // getters, setters...
}

```

### Get class object

1. className.class

   ```java
   Class clazz = Car.class;
   ```

2. object.getClass()

   ```java
   Class clazz = new Car().getClass();
   ```

3. Class.forname("full path")

   ```java
   Class clazz = Class.forName("org.example.Car")
   ```

Instantiate:

```java
Car car = (Car)clazz.getDeclaredConstructor().newInstance();
```

### Get constructor

```java
public void getConstructors() {
    Class clazz = Car.class;
    // Constructor[] constructors = clazz.getDeclaredConstructors();
    Constructor[] constructors = clazz.getConstructors();
    for (Constructor c : constructors) {
        System.out.println(c.getName()+c.getParameterCount());
    }
}
```

Note: `getConstructors()` will only get public method. 

`getDeclaredConstructors()` will get all the method (public and private)

Get public Constructor

```java
Constructor c1 = clazz.getConstructor(String.class, int.class, String.class);
Car car1 = (Car)c1.newInstance("Tesla", 10, "white");
```

Get private Constructor

```java
Constructor c2 = clazz.getConstructor(String.class, int.class, String.class);
c2.setAccessible(True); // make private able to access as public
Car car2 = (Car)c2.newInstance("Tesla", 10, "white");
```

### Get property

public properties:

```java
Field[] fields = clazz.getFields();
```

private properties and set values :

```java
public void getProperty() throws Exception {
    Class clazz = Car.class;
    Car car = (Car)clazz.getDeclaredConstructor().newInstance();
    Field[] fields = clazz.getDeclaredFields();
    for (Field f:fields) {
        if(f.getName().equals("name")) {
            // set allow access
            f.setAccessible(true);
            f.set(car, "Toyota");
        }
    }
    System.out.println(car);
}
```

### Get method

public methods:

```java
    public void getMethods() throws  Exception {
        Car car = new Car("Kia", 5, "red");
        Class clazz = car.getClass();
        Method[] methods = clazz.getMethods();
        for (Method m: methods) {
            if(m.getName().equals("toString")) {
                String invoke = (String)m.invoke(car);
                System.out.println("toString() " + invoke);
            }
        }
    }
```

private methods:

```java
Method[] methods = clazz.getDeclaredMethods();
for (Method m: methods) {
    if(m.getName().equals("run")) {
        m.setAccessible(true);
        String invoke = (String)m.invoke(car);
    }
}
```

## Steps of building IOC

First lets create the structure:

```
├─java
│  └─org
│      └─example
│          ├─dao
│          │  │  UserDao.java
│          │  │
│          │  └─impl
│          │          UserDaoImpl.java
│          │
│          └─service
│              │  UserService.java
│              │
│              └─impl
│                      UserServiceImpl.java
│
└─resources
        log4j2.xml
```

`UserDao` and `UserService` are interfaces and impl package contains the implement of interfaces.

### create two annotations

create to annotations `@Bean` and `@Di` under new package `org.example.annotation`

Then we need to specify when the annotations works. Using meta annotations

```java
package org.example.annotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
public @interface Bean {}
```

The *Target* annotation specifies which elements of our code can have annotations of the defined type. `TYPE` means it can use on class and interface.

The *Retention* Annotation sets the visibility of the annotation to which it is applied.  `RUNTIME` means the scope is when running.

```java
@Target({ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
public @interface Di {}
```

And the `Di` works on properties.

So now we let `UserService` use `UserDao`, we can add the two annotations

```java
package org.example.service.impl;

import org.example.annotation.Bean;
import org.example.annotation.Di;
import org.example.dao.UserDao;
import org.example.service.UserService;

@Bean
public class UserServiceImpl implements UserService {
    @Di
    private UserDao userDao;
}
```

### implement `ApplicationContext`

create the interface and add a `getBean()` method to it.

```java
package org.example.bean;

public interface ApplicationContext {

    Object getBean(Class clazz);
}
```

Then we need to implement the interface.

1. return object
2. load bean according to rule of package

scan all the class in the packages, see if there is `@Bean` annotation, if there is, then instantiate this class using reflection.

We also need a container to store all the bean objects. In spring, it uses map.

```java
public class AnnotationApplicationContext implements ApplicationContext{

    // store bean objects
    private Map<Class, Object> beanFactory = new HashMap<>();
    
    @Override
    public Object getBean(Class clazz) {
        return beanFactory.get(clazz);
    }
}
```

Then create constructor with parameter, package path, scan rules. And find the Class with `@Bean` in it or its sub package.

```java
public class AnnotationApplicationContext implements ApplicationContext{
	...
    public AnnotationApplicationContext(String basePackage) {
        
    }
}
```

1. because the `basePackage` is like `org.example.xxxx`, in order to find the file path, we need to replace `.` with `\`.
2. get the absolute path of package. (path after compilation)\
3. scan package, instantiate

```java
public AnnotationApplicationContext(String basePackage) {
    try {
        // 1. . to \
        String packagePath = basePackage.replaceAll("\\.", "\\\\");
        //2. absolute path
        Enumeration<URL> urls = Thread.currentThread().getContextClassLoader().getResources(packagePath);
        while(urls.hasMoreElements()) {
            URL url = urls.nextElement();
            String filePath = URLDecoder.decode(url.getFile(),"UTF-8");
            rootPath = filePath.substring(0, filePath.length() - basePackage.length());
            loadBean(new File(filePath));
        }
    } catch (Exception e) {
        throw new RuntimeException(e);
    }
}
```

implement `loadBean()`

1. if it is a folder
2. get all contents of folder
3. if content is null, return
4. if not empty, traverse all the content
   1. if it is folder, do recursion
   2. if it's an file, get package path+class Name
   3. is file type is class
   4. if is class type, replace `\` with `.`   ,  remove `.class
   5. if the class has annotation `@Bean, instantiate using reflection
      - get class object
      - if it's not interface
      - whether has @Bean or not
      - instantiate
   6. then put the object to map
      - if the class implements interface, use interface as key.

```java
private void loadBean(File file) throws Exception {
    // 1. if it's a folder
    if(!file.isDirectory()) {
        return;
    }
    // 2. get all contents of folder
    File[] childrenFiles = file.listFiles();
    // 3. if null, or empty, return
    if(childrenFiles == null || childrenFiles.length == 0) {
        return;
    }
    // 4. if not empty, traverse them
    for (File child: childrenFiles) {
        // 4.1 if still a directory, do recursion
        if(file.isDirectory()) {
            loadBean(child);
        } else {
            // 4.2 it's a file, get package path
            String pathWithClass = child.getAbsolutePath().substring(rootPath.length() - 1);
            // 4.3 is class type file
            if(pathWithClass.contains(".class")) {
                // 4.4 if it's class type, replace \ with .
                String fullName = pathWithClass.replaceAll("\\\\", ".").replace(".class", "");
                // 4.5 if there is @Bean annotation
                // 4.5.1 get class object
                Class clazz = Class.forName(fullName);
                // 4.5.2 if it's not interface
                if(!clazz.isInterface()) {
                    // 4.5.3 has @Bean
                    Bean annotation = (Bean) clazz.getAnnotation(Bean.class);
                    if(annotation != null) {
                        // 4.5.4 instantiate
                        Object instance = clazz.getConstructor().newInstance();
                        // 4.6 put it into map
                        // 4.6.1 if the class implements interface, use interface as key.
                        if(clazz.getInterfaces().length > 0) {
                            beanFactory.put(clazz.getInterfaces()[0], instance);
                        } else {
                            beanFactory.put(clazz, instance);
                        }
                    }
                }
            }
        }
    }
}
```

### test

add a `add()` to interfaces and implement them

```java
package org.example;

import org.example.bean.AnnotationApplicationContext;
import org.example.bean.ApplicationContext;
import org.example.service.UserService;

public class TestUser {
    public static void main(String[] args) {
        ApplicationContext context = new AnnotationApplicationContext("org.example");
        UserService userService = (UserService) context.getBean(UserService.class);
        userService.add();
    }
}
```

test this method, the out put is correct.

## Property injection

we inject the property after getting all the bean objects.

```java
public AnnotationApplicationContext(String basePackage) {
    try {
        ...
    } catch (Exception e) {
        throw new RuntimeException(e);
    }

    loadDi();
}
```

Then implement `loadDi()`;

```java
private void loadDi() {
    // 1. traverse beanFactory
    Set<Map.Entry<Class, Object>> entries = beanFactory.entrySet();
    for (Map.Entry<Class, Object> entry: entries) {
        // 2. get each object
        Object obj = entry.getValue();
        Class clazz = obj.getClass();
        Field[] declaredFields = clazz.getDeclaredFields();
        // 3. travers to get each property of object
        for (Field field : declaredFields) {
            // 4. is property has @Di annotation
            Di annotation = field.getAnnotation(Di.class);
            if(annotation != null) {
                // if it is a private property, we need to make it accessible
                field.setAccessible(true);
                // 5. if it has, inject the object
                try {
                    field.set(obj, beanFactory.get(field.getType()));
                } catch (IllegalAccessException e) {
                    throw new RuntimeException(e);
                }
            }
        }

    }
}
```

And then add UserDao's `add()` method  to UserService's add method. to test.

```java
@Bean
public class UserServiceImpl implements UserService {

    @Di
    private UserDao userDao;

    @Override
    public void add() {
        System.out.println("service...");
        userDao.add();
    }
}	
```

Then run the previous test code, we see that the UserDao's add method words well.