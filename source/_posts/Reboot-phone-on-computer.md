---
title: Reboot phone on computer
date: 2020-02-17 02:54:41
tags: reboot
categories: Android
postImage: https://s1.ax1x.com/2020/04/26/Jc15WD.jpg
---

I accidentally put my phone in the sea once, and then keep the power on and it broke down. After fixing it, the power off/on button is broken, so I can't turn off or reboot my phone by pushing the button. So, I use this way:

<!--more-->

# Install tools

```
➜  ~ yay android-tools                                     
3 aur/android-tools-git r44324.ea57928f00-1 (+2 0.00%) 
    Android platform tools
2 archlinuxcn/android-sdk-platform-tools 29.0.5-1 (4.3 MiB 23.3 MiB) (Installed)
    Platform-Tools for Google Android SDK (adb and fastboot)
1 community/android-tools 29.0.5-2 (1.8 MiB 8.6 MiB) 
    Android platform tools
==> Packages to install (eg: 1 2 3, 1-3 or ^4)
==> 2
```

# Set environment path

```
➜  ~ sudo find / -name "adb"                                          
[sudo] password for o_oyao: 
/opt/android-sdk/platform-tools/adb
```

this find where is your adb

Then set the path(temporary).

```
➜  ~ export PATH=$PATH:/opt/android-sdk/platform-tools 
```

**No space after the ":"**

# Reboot

Plug USB in your phone and turn on **developer mode** and open **USB debugging**.

```
➜  ~ adb shell
HWHWI:/ $ reboot
```