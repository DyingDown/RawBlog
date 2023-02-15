---
title: Spring Framework 5.0 Overview
date: 2023-02-14 10:33:35
tags: [Java, Spring5, Java EE]
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

   

   