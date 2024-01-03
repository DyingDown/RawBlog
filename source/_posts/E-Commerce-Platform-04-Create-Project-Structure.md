---
title: 'E-Commerce Platform: 04 Create Project Structure'
date: 2023-12-25 13:19:27
tags: [Java, IDEA]
categories: [E-Commerce Platform]
postImage: https://cdn.jsdelivr.net/gh/DyingDown/img-host-repo/202401022157110.jpg
isCarousel: false
---

Create the structure of the backend part of the project.

## GitHub Repository

Create a git repository and clone to local.

[https://github.com/DyingDown/E-Commerce-Platform](https://github.com/DyingDown/E-Commerce-Platform)

## Modules

Create some modules like this:

![](https://cdn.jsdelivr.net/gh/DyingDown/img-host-repo/202312251324236.png)

And then add some dependencies

![](https://cdn.jsdelivr.net/gh/DyingDown/img-host-repo/202312251323327.png)

![](https://cdn.jsdelivr.net/gh/DyingDown/img-host-repo/202312251322188.png)

Need to create five modules follow the same rule

<img src="https://cdn.jsdelivr.net/gh/DyingDown/img-host-repo/202312251330571.png" style="zoom:50%;" />

they are `ecommerce-coupons`, `ecommerce-members`, `ecommerce-orders`, `ecommerce-products`, `ecommerce-wares`

## pom.xml

Then we create a pom.xml file. And add the modules to it. It’s like create a root module.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <groupId>yao.ecommerce</groupId>
    <artifactId>ecommerce</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <name>ecommerce</name>
    <description>union services of ecommerce</description>
    <packaging>pom</packaging>

    <modules>
        <module>ecommerce-coupons</module>
        <module>ecommerce-members</module>
        <module>ecommerce-orders</module>
        <module>ecommerce-products</module>
        <module>ecommerce-wares</module>
    </modules>
</project>
```

## .gitignore

ignore some useless file in each module. Add content to `.gitignore`

```
**/mvnw
**/mvnw.cmd

**/.mvn
**/target/

.idea

**/.gitignore
```