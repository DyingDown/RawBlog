---
title: 'E-Commerce Platform: 03 Install Java && Maven'
date: 2023-12-23 19:34:56
tags: [Java, Maven]
categories: [E-Commerce Platform]
postImage: https://cdn.jsdelivr.net/gh/DyingDown/img-host-repo/202312162119551.jpg
warning: false
---

Install Java and maven and set them up.

<!--more-->

## Install Java, Maven

Java: [https://www.liaoxuefeng.com/wiki/1252599548343744/1280507291631649](https://www.liaoxuefeng.com/wiki/1252599548343744/1280507291631649)

Maven: [https://dyingdown.github.io/2023/02/14/Maven-IDEA/](https://dyingdown.github.io/2023/02/14/Maven-IDEA/)

## Set up Maven

Go to files: `C:\apache-maven-3.9.6\conf\settings.xml` (where your maven installed)

Add the following inside `<profiles></profiles>`

``` xml
    <profile>
      <id>jdk-20</id>
      <activation>
        <activeByDefault>true </activeByDefault>
        <jdk>20</jdk>
      </activation>
      <properties>
        <maven.compiler.source>20</maven.compiler.source>
        <maven.compiler.target>20</maven.compiler.target>
        <maven.compiler.compilerVersion>20</maven.compiler.compilerVersion>
      </properties>
    </profile>
```

