---
title: Absolute path and Relative path
date: 2020-01-29 09:41:46
tags: Knowledge points
categories: [Linux]
postImage: https://s1.ax1x.com/2020/04/26/Jcucpd.png
---

There are two ways to represents a directory, Absolute path and Relative path.

|   path   |       start       | start sign |
| :------: | :---------------: | :--------: |
| Absolute |  root directory   |     /      |
| Relative | current directory |     ~      |

<!--more-->

For example, when I open the terminal at first time, the default directory is /home/user

I want to see the folder "name1" under /user/names

```
cd /home/user/names/name1  // Absolute
```

or type 

```
cd names/name1
```

Now we are at name1, and we want to go to name2 at /user/names/name2

```
cd ../names2
```

**..** represents the previous one directory of the current directory.

If I'm at names2, then ".." is names.

```
pwd  // to check your current directory
```

```
cd ~  // goes back to /home/user
```

to return the last directory(the one that your last command affect on)

```
cd -
```

It will also show it's physical path. Like  ~/Yao/Study/Blog

Or you can use

```
cd $OLDPWD
```

It's the same to cd -.