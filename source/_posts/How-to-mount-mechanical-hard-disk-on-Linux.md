---
title: How to mount mechanical hard disk on Linux
date: 2020-01-29 06:14:53
tags: Linux
categories: [Blog, Linux]
postImage: https://s1.ax1x.com/2020/04/26/J6jjPg.png
---

I've met a new problem recently: I switched into Linux but my Blog folder is under my mechanical hard disk.  I want my *Blog* folder available to be achieved by command not manually.  So to make this come true, I learned a word **mount**.  By using mount, you can use my blog folder by command. There are three steps:

1. create a new folder
2. mount the disk
3. make it mount automatically as long as booting Linux

<!--more-->

# What is mount
First, you need to know that all the things in Linux is represented as file directory. Your mechanical hard disk is not a folder. So you need to make it a folder in Linux. It's like you wrap the disk using a folder, make it looks like a folder so that Linux can access it. That is how I understand **Mount**.
> **Mounting** is a process by which the [operating system](https://en.wikipedia.org/wiki/Operating_system) makes [files](https://en.wikipedia.org/wiki/Computer_file) and [directories](https://en.wikipedia.org/wiki/Directory_(computing)) on a [storage device](https://en.wikipedia.org/wiki/Computer_data_storage) (such as [hard drive](https://en.wikipedia.org/wiki/Hard_disk_drive), [CD-ROM](https://en.wikipedia.org/wiki/CD-ROM), or [network share](https://en.wikipedia.org/wiki/Network_share)) available for users to access via the computer's [file system](https://en.wikipedia.org/wiki/File_system).[[1\]](https://en.wikipedia.org/wiki/Mount_(computing)#cite_note-1)
>
> In general, the process of mounting comprises operating system acquiring access to the storage medium; recognizing, reading, processing file system structure and metadata on it; before registering them to the [virtual file system](https://en.wikipedia.org/wiki/Virtual_file_system) (VFS) component.  ——Wikipedia

And the folder you use to wrap you disk is called **Mount point**.
# Create a new directory
You can make it anywhere.
Take mine for example. I set the directory under /home/o_oyao directory.
## See recent directory 
type to see what directory you are in now.
```
pwd
```
I got:
```
/home/o_oyao
```
## Create an new directory
using **mkdir** to create and **rmdir** to delete.
I want my directory under home/o_oyao and it's name is Yao, so I typed: 
```
mkdir Yao
```
There is no notification to show that you have successfully created the directory, to make sure it works, you can type command  "ls" (no double quotes), to see all the directories. 
If you want your dierectory to be somewhere else, check [Absolute path and Relative path](https://dyingdown.github.io/2020/01/29/Absolute-path-Relative-path/) to see how to do.
# Temporary mount
First type the following command to see what is the name of your disk.
```
df -h
```
![](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9zMi5heDF4LmNvbS8yMDIwLzAxLzI5LzFRVkVHVi5wbmc?x-oss-process=image/format,png)
So my disk name is sda2.  Because the size of my disk is very large compared to other section.

So the command is:
```
sudo mount /dev/sda2 Yao
```
Now you open the directory you created, you can see all the things in your disk are now in the directory.

# Permanent mount
## Check the type of your file system
```
gparted
```
And it opens a new window.
![](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9zMi5heDF4LmNvbS8yMDIwLzAxLzI5LzFRZVVVQS5wbmc?x-oss-process=image/format,png)
So my type is "ntfs". Yours might be "ext4"

## Add a statement
type the following command:

```
sudo gedit /etc/fstab
```

open this file, and add a piece of data in it. If you know how to use vim, you can also type.

```
sudo vim /etc/fstab
```
I got this: 
![](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9zMi5heDF4LmNvbS8yMDIwLzAxLzI5LzFRWmQ2VS5wbmc?x-oss-process=image/format,png)
(UUID is the unique id of the file system, it can also be represented as directory) 

add a new statement

```
/dev/sda2 /home/o_oyao/Yao ntfs defaults 0 2
```

It looks Like this:
![](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9zMi5heDF4LmNvbS8yMDIwLzAxLzI5LzFRbWRaNC5wbmc?x-oss-process=image/format,png)
Save it.
## Restart 
All done!  Restart computer and check whether it works.