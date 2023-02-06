---
title: Oh no! of Gnome
date: 2020-03-25 12:20:01
tags: Error
categories: Linux
postImage: https://s1.ax1x.com/2020/04/26/Jc1MIf.jpg
---

Solve for the problem about the gray screen problem occurred by gnome.

<!--more-->

# Problem

![](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9zMS5heDF4LmNvbS8yMDIwLzAzLzI1Lzh2b3FIUy5qcGc?x-oss-process=image/format,png)

Also, I found that my style of desktop has changed and can't be changed by Tweaks.

The extensions are gray too.

![](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9zMS5heDF4LmNvbS8yMDIwLzAzLzI1Lzh2SEc2SS5qcGc?x-oss-process=image/format,png)
# Solution

To solve this, follow three steps:

1. move the directory `/usr/share/gnome-shell/extensions`to another directory.

   ```
   sudo mv /usr/share/gnome-shell/extensions /XX
   ```

   you can just type XX because if the directory does not exist, it will create one for you and move all your extensions XX, (rename extensions to XX).

2. reboot your computer

3. open the extensions of gnome-tweaks

   ![](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9zMS5heDF4LmNvbS8yMDIwLzAzLzI1Lzh2SEc2SS5qcGc?x-oss-process=image/format,png)

4. reboot your computer

5. move the files back

   ```
   sudo mv /XX /usr/share/gnome-shell/extensions
   ```

6. Reboot your computer again and everything goes normal

# End

I find this can solve problem for a short time, the day after I run these steps, the problems occurred again......

So I'm trying to find the solution.(All these steps were told by Boss Tan, he taught me to follow these step.)