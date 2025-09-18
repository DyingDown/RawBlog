---
title: 'Database Engine Project: Learn basic structure'
date: 2021-09-09 15:59:12
tags: SQLite
categories: Database Engine Project
postImage: https://cdn.jsdelivr.net/gh/dyingdown/img-host-repo/Blog/post/20210918210131.jpg
---

Recently, I planned to write a database project to improve my ability. It’s hard to start because I knows little about the structure of SQL, so first, I learnt SQLite. I write this article to steady what I‘ve learnt.

<!--more-->

本来想用英语写，但是写到一半又改变主意，觉得还是中文吧，毕竟是笔记，中文我自己看起来更方便。唉、

## 工作流程

SQLite是一个可以嵌入的数据库，但是它最基本的是可以在Terminal运行，使用命令行的方式，可交互的运行，就像python一样，SQLite也是一样，输入一行SQL语句，就执行一行SQL语句。

那么当我输入了一个SQL语句后，会发生如下的过程：

1. 首先会有*词法分析器*将SQL语句分解成一堆词，然后*语法分析器*模块会将那些词变成语法树。此过程中需要产生更为简单的字节码。字节码就是相当于汇编代码（并不等用，只是用来理解）。

2. 以上这些都是**前端**，用来处理SQL语句。下面说的都属于**后端**。

3. 然后，生成的语法树再传给*虚拟机*模块（这里的虚拟机不是那个虚拟硬件的虚拟机），虚拟机的作用就是执行这些字节码。比如，

   ```sql
   string command = "mul"
   if(command == "add") add(a, b);
   else mul(a, b);
   ```

   这就叫做虚拟机。

   之前我被这个虚拟机的概念迷惑住好久，我一直以为字节码就是等同于汇编，然后字节码可以自己定义，那就不就得在硬件上再实现一套认识自己的字节码的东西吗？

   后来才明白，你只要用高级编程语言里判断，遇到什么命令就去进行进行什么操作，而这些操作也是用编程语言写的，比如C++，到了最后，C++的编译器会帮你把它编译成汇编语言，不用自己翻译。

4. 后端具体存储一般就是管理磁盘存储，而磁盘存储一般都是B树结构来方便查询。

5. 还有就是页缓存功能，来负责页面的读写和缓存。

## 模块

综上所述，一个数据库大概主要的模块包括：词法分析器、语法分析器、字节码生成器、虚拟机（执行字节码）、B树、页缓存。

下一篇文章，根据本次所学内容，列一个详细的模块结构图。