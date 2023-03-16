---
title: AOP Scene Simulation
date: 2023-02-28 19:55:51
tags: [Spring, AOP]
categories: Spring6
postImage: https://cdn.jsdelivr.net/gh/DyingDown/img-host-repo/202303011159862.jpg
---

Note of learning AOP.

<!--more-->

## Introduction

Let's start with an example of simple calculator.

We create an calculator interface that has four basic methods.

```java
public interface Calculator {
    int add(int i, int j);
    int subtract(int i, int j);
    int multiple(int i, int j);
    int divide(int i, int j);
}
```

And has two implement of of the interface.

```java
public class CalculatorImpl implements Calculator {
    @Override
    public int add(int i, int j) {
        int result = i + j;
        System.out.println("inside method: result = " + result);
        return result;
    }

    @Override
    public int subtract(int i, int j) {...}

    @Override
    public int multiple(int i, int j) {...}

    @Override
    public int divide(int i, int j) {...}
}
```

And another that has some logs 

````java
public class CalculatorLogImpl implements  Calculator{
    @Override
    public int add(int i, int j) {
        System.out.println("[LOG] ADD Start, Parameters are: " + i + ", " +j);
        int result = i + j;
        System.out.println("inside method, result = " + result);
        System.out.println("[LOG] ADD End, result is " + result);
        return result;
    }

    @Override
    public int subtract(int i, int j) {...}

    @Override
    public int multiple(int i, int j) {...}

    @Override
    public int divide(int i, int j) {...}
}
````

If we use the second implement, the log code and  the core code are mixed together and it's not easy to maintain.

So we want to separate the core code and log code. 

## Proxy

>A *dynamic proxy class* (simply referred to as a *proxy class* below) is a class that implements a list of interfaces specified at runtime when the class is created, with behavior as described below. 

Without a proxy class, we call the `add()` directly, but with a proxy class, we can call the proxy class and make proxy call the original `add()` method.

And there are to kinds of proxy: static and dynamic

### Static Proxy

we create a static proxy calculator class. It has an property that is the `Calculator `type.

```java
public class CalculatorStaticProxy implements Calculator {

    private Calculator calculator;

    public CalculatorStaticProxy(Calculator calculator) {
        this.calculator = calculator;
    }

    @Override
    public int add(int i, int j) {
        System.out.println("[LOG] ADD Start, Parameters are: " + i + ", " + j);
        int result = calculator.add(i, j);
        System.out.println("[LOG] ADD End, result is " + result);
        return result;
    }

    @Override
    public int subtract(int i, int j) {...}

    @Override
    public int multiple(int i, int j) {...}

    @Override
    public int divide(int i, int j) {...}
}
```

But there is a problem, the log code is static, that can't be changed. If want for another class, we need to create the Proxy again. 

So in order to separate them completely, we need to use dynamic proxy.

### Dynamic Proxy

create a `ProxyFactory` class to return the proxy class for all classes.

```java
public class ProxyFactory {
    private Object target;

    public ProxyFactory(Object target) {
        this.target = target;
    }

    public Object getProxy() {
        ClassLoader classLoader = target.getClass().getClassLoader();
        Class<?>[] interfaces = target.getClass().getInterfaces();
        InvocationHandler invocationHandler = new InvocationHandler() {

            @Override
            public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
                System.out.println("[Dynamic Proxy][LOG] " + method.getName() + ", parameters: " + Arrays.toString(args));
                Object result = method.invoke(target, args);
                System.out.println("[Dynamic Proxy][LOG] " + method.getName() + ", result: " + result.toString());
                return result;
            }
        };
        return Proxy.newProxyInstance(classLoader, interfaces, invocationHandler);
    }
}
```

There are three parameters of the `newProxyInstance()`:

1. `ClassLoader`: load the loader that dynamic generate classes
2. `Class[] interfaces`: all the interfaces type that the object implements
3. `InvocationHandler`: proxy class that implement target object methods.

And the `invoke()` method also have three parameters:

1. Object: proxy object
2. Method: method that need to rewrite
3. Object[]: parameters in method

Finally, write a test function to test it.

```java
public class TestCal {
    public static void main(String[] args) {
        ProxyFactory proxyFactory = new ProxyFactory(new CalculatorImpl());
        Calculator proxy = (Calculator) proxyFactory.getProxy();
        proxy.add(3, 4);
    }
}
```

We can see the log output normally.

## AOP

> In computing, aspect-oriented programming is a programming paradigm that aims to increase modularity by allowing the separation of cross-cutting concerns.

### Terms

- **Cross-cutting concern**: There are multiple modules that solves the same problems, like handle transaction, data cache...
- **Advice**: the thing you need to do(write a method) on Cross-cutting concern. the method is called advice method. There are five type of advices:
  - *Before Advice*: before the target method run
  - *After Advice*: After the final method execution ends
  - *After-returning Advice*: after the method end successfully
  - *After-throwing Advice*: after the method ends abnormally
  - *Around Advice*: use try-catch to surround  target method, including the above four position of advice.
- **Aspect**:  the class the encapsulate the advice method.
- **Target**: target object
- **Proxy**: proxy object
- **Joint Point**: places that allowed to use advice.
- **Pointcut**: the position that actually advice the method.

## AOP based on annotation

dynamic proxy: JDK dynamic proxy and cglib dynamic proxy

When there is interfaces, use JDK dynamic proxy. It will generate an object that is the type of the interface.

If there is no interfaces, use cglib dynamic proxy. It will generate a sub object that inherit the target object.

Aspectj: Essentially a static proxy but performs as dynamic proxy.

### preparation

1. add AOP references
2. create target source
   - interface
   - implement class
3. create an aspect class and configure it.
   - Pointcut
   - Advice type

Create a `Calculator` interface and its implement class. And a class `LogAspect`

```java
@Aspect
@Component
public class LogAspect {
}
```

Configure the xml

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:aop="http://www.springframework.org/schema/aop"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/context
                           http://www.springframework.org/schema/context/spring-context.xsd
                           http://www.springframework.org/schema/beans
                           http://www.springframework.org/schema/beans/spring-beans.xsd
                           http://www.springframework.org/schema/aop
                           http://www.springframework.org/schema/aop/spring-aop.xsd">

    <context:component-scan base-package="org.example.spring6.aop.example.annotation"></context:component-scan>

    <!-- Turn on aspectj auto proxy, generate proxy for target object-->
    <aop:aspectj-autoproxy></aop:aspectj-autoproxy>
</beans>
```

### Advice Code

Then we need to set Advice type, using `@Before(value="pointcut expression")`, `@AfterReturning`, `@AfterThrowing`, `@After()`, `@Around()`

The pointcut expression = `execution(Access-Modifier Return-Type-of-Method Full-Class-Name.Method-name(Parameters))`

and all the thing can use `*` which means any type or name or methods...

eg. 

```java
execution(public int org.example.Calculator.add(int, int))
```

So we want to add advice for its method.

#### @Before

```java
@Aspect
@Component
public class LogAspect {
    // set Pointcut and Advice type
    @Before(value = "execution(public int package org.example.spring6.aop.example.annotation.CalculatorImpl.*(..))")
    public void beforeMethod() {
        System.out.println("Before Advice...");
    }
}
```

#### @After

```java
@After(value = "execution(* org.example.spring6.aop.example.annotation.CalculatorImpl.*(..))")
public void afterMethod(JoinPoint joinPoint) {
    String methodName = joinPoint.getSignature().getName();
    Object[] args = joinPoint.getArgs();
    System.out.println("[LOG] After Advice,, method name = " + methodName + ", parameters: " + Arrays.toString(args));
}
```

#### @AfterReturning

```java
@AfterReturning(value = "execution(* org.example.spring6.aop.example.annotation.CalculatorImpl.*(..))", returning="result")
public void afterReturnningMethod(JoinPoint joinPoint, Object result) {
    String methodName = joinPoint.getSignature().getName();
    Object[] args = joinPoint.getArgs();
    System.out.println("[LOG] AfterReturning Advice,, method name = " + methodName + ", result: " + result);
}
```

There is another property in `AfterReturnning` , `returning`. That can get the return result of the method.

And the parameter name of result must be the same as the returning value.

#### @AfterThrowing

The method has some exceptions. and the `@AfterThrowing` can get the exception information.

```java
@AfterThrowing(value = "execution(* org.example.spring6.aop.example.annotation.CalculatorImpl.*(..))", throwing="exception")
public void afterThrowingMethod(JoinPoint joinPoint, Object exception) {
    String methodName = joinPoint.getSignature().getName();
    Object[] args = joinPoint.getArgs();
    System.out.println("[LOG] AfterThrowing Advice,, method name = " + methodName + ", ExceptionInfo: " + exception);
}
```

The name of last parameter must keep same with the value of `throwing`.

#### @Around

`ProceedingJoinPoint` is an extends from `JoinPoint` and has more function. It can let the target method execute.

```java
@Around(value = "execution(* org.example.spring6.aop.example.annotation.CalculatorImpl.*(..))")
public Object aroundMethod(ProceedingJoinPoint joinPoint) {
    String methodName = joinPoint.getSignature().getName();
    Object[] args = joinPoint.getArgs();
    String argString = Arrays.toString(args);
    Object result = null;
    try {
        System.out.println("[LOG] [Around] Before the target method");
        result = joinPoint.proceed();
        System.out.println("[LOG] [Around] After the target method return");
    } catch (Throwable throwable) {
        System.out.println("[LOG] [Around] Method has exceptions");
        throwable.printStackTrace();
    } finally {
        System.out.println("[LOG] [Around] Target method finished executing");
    }
    return result;
}
```

#### Reuse Pointcut expression

```java
@Pointcut("execution(* org.example.spring6.aop.example.annotation.CalculatorImpl.*(..))")
public void pointCut() {}

@After(value = "pointCut()")
public void afterMethod(JoinPoint joinPoint) {
    ...
}
```

In the value, we just write the method name. (If they are in the same aspect).

Or you need to add path before it. `package.name.ClassName.pointCut()`

#### Priority

- The outer aspect > inner aspect

- `@Order(xx)` can control the priority, smaller xx has higher priority.

## AOP based on XML

Remove the `@Aspect`, `@Around`, ... , `@Pointcut` annotations

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:aop="http://www.springframework.org/schema/aop"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/context
                           http://www.springframework.org/schema/context/spring-context.xsd
                           http://www.springframework.org/schema/beans
                           http://www.springframework.org/schema/beans/spring-beans.xsd
                           http://www.springframework.org/schema/aop
                           http://www.springframework.org/schema/aop/spring-aop.xsd">

    <context:component-scan base-package="org.example.spring6.aop.xmlaop"></context:component-scan>

    <aop:config>
        <aop:aspect ref="logAspect">
            <aop:pointcut id="pointcut" expression="execution(* org.example.spring6.aop.xmlaop.CalculatorImpl.*(..))"/>
            <aop:before method="beforeMethod" pointcut-ref="pointcut"></aop:before>
            <aop:after method="afterMethod" pointcut-ref="pointcut"></aop:after>
            <aop:after-returning method="afterReturningMethod" returning="result" pointcut-ref="pointcut"></aop:after-returning>
            <aop:after-throwing method="afterThrowingMethod" throwing="exception" pointcut-ref="pointcut"></aop:after-throwing>
            <aop:after-throwing method="afterThrowingMethod" throwing="exception" pointcut-ref="pointcut"></aop:after-throwing>
            <aop:around method="aroundMethod" pointcut-ref="pointcut"></aop:around>
        </aop:aspect>
    </aop:config>
    
</beans>
```

The value of `method` must be exactly same with the actual method name, or you will run into error

```
Error creating bean with name 'calculatorImpl' defined in file...
...
Cannot create inner bean '(inner bean)#7fcff1b9' of type [org.springframework.aop.aspectj.AspectJAfterReturningAdvice] while setting constructor argument
```

this means the `after-returning` advice has errors because we find a error with `AspectJAfterReturnningAdvice` . Check the error in the `<aop:xxx></aop:xxx>` tag.

