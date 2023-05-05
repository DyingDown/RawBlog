---
title: Maven + IDEA + Windows
date: 2023-02-14 12:11:00
tags: [Win11, IDEA, WSL]
categories: [Maven]
postImage: https://cdn.jsdelivr.net/gh/DyingDown/img-host-repo/202302141427791.jpg
---

## Install Maven

1. download [https://maven.apache.org/download.cgi](https://maven.apache.org/download.cgi)

   <img src="https://cdn.jsdelivr.net/gh/DyingDown/img-host-repo/202302141347048.png" style="zoom:67%;" />

2. Abstract zip file into an folder that the names of ancestor directory does not contains any space.

3. add the folder path to **Environment Variables**

   <img src="https://cdn.jsdelivr.net/gh/DyingDown/img-host-repo/202302141347872.png" style="zoom: 67%;" />

   <img src="https://cdn.jsdelivr.net/gh/DyingDown/img-host-repo/202302141348691.png" style="zoom:67%;" />

4. check if it's installed. 

   open an `cmd` window and type `mvn -v`

   ```bash
   PS C:\Users\xxx> mvn -v
   Apache Maven 3.9.0 (9b58d2bad23a66be161c4664ef21ce219c2c8584)
   Maven home: C:\apache-maven-3.9.0
   Java version: 19.0.1, vendor: Oracle Corporation, runtime: C:\Program Files\Java\jdk-19
   Default locale: en_US, platform encoding: UTF-8
   OS name: "windows 11", version: "10.0", arch: "amd64", family: "windows"
   ```

## IDEA Setting

If you want to use maven that you installed, set here:

![](https://cdn.jsdelivr.net/gh/DyingDown/img-host-repo/202302141422208.png)