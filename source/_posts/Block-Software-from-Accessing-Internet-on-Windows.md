---
title: Block Software from Accessing Internet on Windows
date: 2025-03-17 17:49:10
tags: [Windows, Firewall, Network Control]
categories: [Windows]
postImage: https://cdn.jsdelivr.net/gh/DyingDown/img-host-repo/202503171820903.png
warning: true
isCarousel: false
---

I came up with this issue because I want to block my photoshop to connect to network, it will always check my license and says this product is limited, which is very annoying… So I decided to block it from internet.

<!--more-->

1. Find **Windows Defender Firewall**. Click **Advanced settings**.

   <img src="https://cdn.jsdelivr.net/gh/DyingDown/img-host-repo/202503171757280.png" style="zoom:67%;" />

   2. Choose Outbound rules and then click New Rule..

      <img src="https://cdn.jsdelivr.net/gh/DyingDown/img-host-repo/202503171758094.png" style="zoom:67%;" />

      3. Choose program

         <img src="https://cdn.jsdelivr.net/gh/DyingDown/img-host-repo/202503171759035.png" style="zoom:67%;" />

4. Input program path. Find the exe file of your program that you want to block

   <img src="https://cdn.jsdelivr.net/gh/DyingDown/img-host-repo/202503171803099.png" style="zoom:67%;" />

5. Choose Block the connection

   <img src="https://cdn.jsdelivr.net/gh/DyingDown/img-host-repo/202503171802284.png" style="zoom:67%;" />

   6. Leave it like this:

   <img src="https://cdn.jsdelivr.net/gh/DyingDown/img-host-repo/202503171801109.png" style="zoom:67%;" />

7. Input a name and description for this rule

   <img src="https://cdn.jsdelivr.net/gh/DyingDown/img-host-repo/202503171804686.png" style="zoom:67%;" />

8. Then we check the rules, we can found the one we just created.

   <img src="https://cdn.jsdelivr.net/gh/DyingDown/img-host-repo/202503171805691.png" style="zoom:67%;" />