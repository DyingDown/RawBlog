---
title: Spring Framework 6.0 Log framework
date: 2023-02-21 10:21:52
tags: [Java, Spring6, Log, Log4j2]
categories: [Spring6]
postImage: https://cdn.jsdelivr.net/gh/DyingDown/img-host-repo/202302211428965.jpg
---

Notes of Log4j2 base on the previous article.

<!--more-->

## log framework (Log4j2)

the framework is mad of some important components:

- log priority: TRACE < DEBUG < INFO < WARN < ERROR < FATAL	

  The level lower than your set level  will not show.

- where the log output, to console or to file.
- format of the log.

## Add Dependency

add this in the `pom.xml` file under your project.

```xml
<dependency>
    <groupId>org.apache.logging.log4j</groupId>
    <artifactId>log4j-core</artifactId>
    <version>2.20.0</version>
</dependency>
<dependency>
    <groupId>org.apache.logging.log4j</groupId>
    <artifactId>log4j-slf4j2-impl</artifactId>
    <version>2.20.0</version>
</dependency>
```

## Add config file

create a new `log4j2.xml` file in `source` folder

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Configuration>
    <!-- Logging Properties -->
    <Properties>
        <Property name="LOG_PATTERN">%d{yyyy-MM-dd'T'HH:mm:ss.SSSZ} %p %m%n</Property>
        <Property name="APP_LOG_ROOT">c:/temp/logs</Property>
    </Properties>
    <appenders>
        <!-- Console Appender -->
        <console name="spring6log" target="SYSTEM_OUT">
            <PatternLayout pattern="%d{yyyy-MM-dd HH:mm:ss SSS} [%t] %-3level %logger{1024} - %msg%n"/>
        </console>

        <!-- File Appenders on need basis -->
        <File name="log" fileName="${APP_LOG_ROOT}/app-framework.log">
            <PatternLayout pattern="%d{HH:mm:ss.SSS} %-5level %class{36} %L %M - %msg%xEx%n"/>
        </File>

        <RollingFile name="RollingFile" fileName="${APP_LOG_ROOT}/app-info.log"
                     filePattern="${APP_LOG_ROOT}/app-info-%d{yyyy-MM-dd}-%i.log" >
            <LevelRangeFilter minLevel="INFO" maxLevel="INFO" onMatch="ACCEPT" onMismatch="DENY"/>
            <PatternLayout pattern="$d{yyyy-MM-dd 'at' HH:mm:ss z} %-5level %class{36} %L %M - %msg%xEx%n"/>
            <Policies>
                <SizeBasedTriggeringPolicy size="10MB" />
            </Policies>
            <DefaultRolloverStrategy max="10"/>
        </RollingFile>
    </appenders>
    <loggers>
        <root level="DEBUG">
            <appender-ref ref="spring6log"/>
            <appender-ref ref="RollingFile"/>
            <appender-ref ref="log"/>
        </root>
    </loggers>
</Configuration>
```

And then run the previous code, we got

```
2023-02-21 10:50:37 907 [main] DEBUG org.springframework.context.support.ClassPathXmlApplicationContext - Refreshing org.springframework.context.support.ClassPathXmlApplicationContext@1c481ff2
2023-02-21 10:50:38 366 [main] DEBUG org.springframework.beans.factory.xml.XmlBeanDefinitionReader - Loaded 1 bean definitions from class path resource [beam.xml]
2023-02-21 10:50:38 466 [main] DEBUG org.springframework.beans.factory.support.DefaultListableBeanFactory - Creating shared instance of singleton bean 'user'
Constructor function ran.
com.yao.spring6.User@3f28bd56
add ...
```

And then, we found log files in `C:\temp\logs`

## Out put log manually

import packages of log4j2

```java
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
```

create object and use it

```java
private Logger logger = LoggerFactory.getLogger(TestUser.class);
logger.info("# SUCCESS");
```