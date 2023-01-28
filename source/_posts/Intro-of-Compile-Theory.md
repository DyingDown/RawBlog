---
title: Intro of Compile Theory
date: 2020-07-12 09:49:31
tags: Knowledge points
categories: Compile Theory
postImage: https://s1.ax1x.com/2020/07/12/U8byWD.jpg
---

## 什么是编译

### 计算机程序设计语言及编译

首先针对同一种操作，我们看看在三种类别的语言下，它是如何表示的。操作为：讲十进制数2移入到0000地址上。

1. 机器语言：C706 0000 0002
2. 汇编语言：MOV X, 2 （假设X表示地址0000，MOV就是助记符）
3. 高级语言：x = 2

高级语言可以通过编译来生成汇编语言或者机器语言，汇编语言生成机器语言叫做汇编。

### 编译器在语言处理系统中的位置

先看看流程：
$$
源程序 \\
\downarrow \\
预处理器（Preprocessor）\\
\downarrow \\
经过预处理的源程序 \\
\downarrow \\
编译器 \\
\downarrow \\
汇编语言程序 \\
\downarrow \\
汇编器（Assembler） \\
\downarrow \\
可重定位的机器代码 \\
\downarrow \\
链接器（Linker）/加载器（Loader） \\
\downarrow \\
目标机器代码
$$
预处理器：

- 把寄存在不同文件中的源程序整合在一起
- 把被称为**宏**的的缩写语句转换为原始语句

可重定位（Relocatable）：

 在内存中存放的起始位置L不是可固定的

加载器：

 修改可重定位地址：将修改后的指令和数据放到内存中适当的位置

连接器：

- 将多个可重定位的机器代码文件（包括库文件）连接到一起
- 解决外部内存地址问题

### 编译系统的结构

编译器的结构