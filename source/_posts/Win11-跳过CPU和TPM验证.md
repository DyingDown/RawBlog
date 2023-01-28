---
title: Win11 跳过CPU和TPM验证
date: 2021-10-29 16:19:55
tags: [System, Win11, 跳过验证, CPU, TMP]
categories: Windows
postImage: https://cdn.jsdelivr.net/gh/dyingdown/img-host-repo/Blog/post20211030010900.jpg
---

之前装过win11，笔记本没问题，去教室电脑装了一下，各种不支持，CPU和TPM都不支持。但是并不是真的是硬件不支持，可以跳过检测。

<!--more-->

## 方法一：修改ios文件（对我无效）

首先条件是使用的win11的制作启动盘程序自动刻录的U盘。

1. 进入U盘找到镜像文件下的`source/appraiserres.dll`
2. 将他替换成win10镜像里的`appraiserres.dll`并设置为只读模式，或者，直接删除该文件，创一个文件夹或者文件命名为这个设置为只读模式。
3. 然后就是通过引导程序安装

对我不奏效，还是不行。

## 方法二：修改注册表

该方法是在引导程序里修改注册表。并且使用的是自己手动刻录的ios镜像。

自己刻录的原因是因为：不知道为什么它给我自动刻录的不支持UEFI引导，然后就会显示电脑硬盘不支持什么的。

### 自己刻录

1. 去官网下载ios镜像：[下载地址](https://www.microsoft.com/zh-cn/software-download/windows11)

   

   

   下载到哪里无所谓，能打开就行。

2. 下载*Refug* [下载地址](https://rufus.ie/downloads/)

   一般选第一个就行，下载后运行然后在里面选择好ios和U盘，就可以开始了，进度条结束后就刻录好了。

3. 使用U盘作为启动盘

### 跳过验证

进入之后一系列下一步后会遇见“不支持”的页面。在那个页面进行如下操作

1. 按`Shift+F10`
2. 输入`regedit`，此时打开注册表页面，编辑注册表
3. 在左侧目录里找到`HKEY_LOCAL_MACHINE\SYSTEM\Setup`打开
4. 右键，新建项，命名为**LabConfig**
5. 进入新建的项
6. 右键，新建*DWORD*，命名**BypassTPMCheck**，设置值为1（此步目的跳过TPM验证）
7. 新建*DWORD*，命名**BypassSecureBootCheck**，设置为1
8. 关闭注册表和命令行窗口
9. 点击左上角返回上一步
10. 继续下一步，正常安装

## 方法三：用于直接升级（对我有效一半）

前两种方法都是用于全新安装的，如果直接升级的话，通过修改当前系统注册表。

1. 新建一个空白文件，命名随意，位置随意

2. 写入以下内容

   ```
   Windows Registry Editor Version 5.00
   [HKEY_LOCAL_MACHINE\SYSTEM\Setup\MoSetup]
   "AllowUpgradesWithUnsupportedTPMOrCPU"=dword:00000001
   ```

   相当于在`HKEY_LOCAL_MACHINE\SYSTEM\Setup\MoSetup`注册表目录创建一个DWORD

3. 将文件后缀改为`.reg`（表示注册表文件）

4. 双击执行该文件

然后再进行检测就发现对CPU和TPM的限制没了，这是别人成功的方法，对我来说，只是解除了CPU的限制，依然没有解除TPM的限制。