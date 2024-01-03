---
title: >-
  E-Commerce Platform: 06 Using Renren Open source build Management System
date: 2023-12-25 18:39:17
tags: [renren, renren-fast, renren-]
categories: [E-Commerce Platform]
postImage:
description:
warning:
isCarousel:
---

Quickly create a  system structure using an open source project [renren-fast](https://gitee.com/renrenio/renren-fast) and [renren-fast-vue](https://gitee.com/renrenio/renren-fast-vue). 

<!--more-->

## Backend

1. Clone `renren-fast` into the root directory of your project directory. , delete .git folder

2. Add it to the root projects modules in the root `pom.xml` file.

   ```xml
   <module>renren-fast</module>
   ```

3. Create a database for the backend developer system, using the sql statement in `renren-fast/db/mysql.sql`.  The name of the database is `ecommerce_admin`. 

4. Set up the database for this modules:  Modify the file `renren-fast/src/main/resources/application-dev.yml`.  Change the `localhost` to your Linus IP, `renren-fast` to the database name `ecommerce_admin`, and finally change the username and password.

   {% codeblock lang:yml mark:6-8 %}
   spring:
       datasource:
           type: com.alibaba.druid.pool.DruidDataSource
           druid:
               driver-class-name: com.mysql.cj.jdbc.Driver
               url: jdbc:mysql://172.17.146.211/:3306/ecommerce_admin?useUnicode=true&characterEncoding=UTF-8&serverTimezone=Asia/Shanghai
               username: root
               password: root

   {% endcodeblock %}

5. Test the module. Run `renren-fast/src/main/java/io/renren/RenrenApplication.java` main function. And then got the following out put:

   ```
   ...
   2023-12-26 01:02:28.177  INFO 46768 --- [           main] o.s.b.w.embedded.tomcat.TomcatWebServer  : Tomcat started on port(s): 8080 (http) with context path '/renren-fast'
   ...
   ```

6. Then, we can open URL `http://localhost:8080/renren-fast/` in the website.

### Error recording

To record an error I came up with during the previous steps.

The error message was :  `java: java.lang.NoSuchFieldError: Class com.sun.tools.javac.tree.JCTree$JCImport does not have member field 'com.sun.tools.javac.tree.JCTree qualid'`

Because I use java-21  but the  **lombok** version of renren-fast module is `<lombok.version>1.18.4</lombok.version>`, I need to change the version to `1.18.30` so can the code work properly.

## Front-end Vue

1. Clone the front-end repository. [https://gitee.com/renrenio/renren-fast-vue.git](https://gitee.com/renrenio/renren-fast-vue.git)

2. Install Node.js

3. Open the project folder in vscode. 

4. Run `npm install` to get the dependencies.

   I run into some errors:

   ```
   	old lockfile 
   npm WAR 8902 error gyp verb find Python Python is not set from command line or npm configuration
   
   ...
   
   8902 error gyp verb find Python Python is not set from environment variable PYTHON
   8902 error gyp verb find Python checking if "python3" can be used
   8902 error gyp verb find Python - executing "python3" to get executable path
   8902 error gyp verb find Python - "python3" is not in PATH or produced an error
   8902 error gyp verb find Python checking if "python" can be used
   8902 error gyp verb find Python - executing "python" to get executable path
   8902 error gyp verb find Python - executable path is "C:\Users\o_oya\AppData\Local\Programs\Python\Python312\python.exe"
   8902 error gyp verb find Python - executing "C:\Users\o_oya\AppData\Local\Programs\Python\Python312\python.exe" to get version
   8902 error gyp verb find Python - version is "3.12.0"
   8902 error gyp info find Python using Python version 3.12.0 found at "C:\Users\o_oya\AppData\Local\Programs\Python\Python312\python.exe"
   8902 error gyp verb get node dir no --target version specified, falling back to host node version: 20.10.0
   8902 error gyp verb command install [ '20.10.0' ]
   
   ...
   
   8906 error gyp ERR! find VS unknown version "undefined" found at "C:\Program Files (x86)\Microsoft Visual Studio\2022\BuildTools"
   8906 error gyp ERR! find VS could not find a version of Visual Studio 2017 or newer to use
   8906 error gyp ERR! find VS looking for Visual Studio 2015
   8906 error gyp ERR! find VS - not found
   8906 error gyp ERR! find VS not looking for VS2013 as it is only supported up to Node.js 8
   8906 error gyp ERR! find VS 
   8906 error gyp ERR! find VS **************************************************************
   8906 error gyp ERR! find VS You need to install the latest version of Visual Studio
   8906 error gyp ERR! find VS including the "Desktop development with C++" workload.
   8906 error gyp ERR! find VS For more information consult the documentation at:
   8906 error gyp ERR! find VS https://github.com/nodejs/node-gyp#on-windows
   8906 error gyp ERR! find VS **************************************************************
   8906 error gyp ERR! find VS 
   8906 error gyp ERR! configure error 
   8906 error gyp ERR! stack Error: Could not find any Visual Studio installation to use
   8906 error gyp ERR! stack     at VisualStudioFinder.fail (D:\Documents\Code\renren-fast-vue\node_modules\node-gyp\lib\find-visualstudio.js:121:47)
   8906 error gyp ERR! stack     at D:\Documents\Code\renren-fast-vue\node_modules\node-gyp\lib\find-visualstudio.js:74:16
   8906 error gyp ERR! stack     at VisualStudioFinder.findVisualStudio2013 (D:\Documents\Code\renren-fast-vue\node_modules\node-gyp\lib\find-visualstudio.js:351:14)
   ```

   I tried to install the latest VS and also checked the install option “Desktop development with C++”, but it doesn’t work for me. And I also checked my python, I already add the python to PATH. **Finally, the problem was solved by  downgrading the node.js version to 14.  **I use `nvm install 14` and install the latest version of node.js 14 and switch the current use of node.js to it. Also you need to downgrading the `npm` version. I use ` npm v6.14.18` and it worked.

5. Run `npm run dev` to run the project.

6. Use admin account to test. username: admin; pw: admin

## Generate the code for our microservices

1. Clone `renren-generator` to the root of the project. https://gitee.com/renrenio/renren-generator.git,  delete .git folder.

