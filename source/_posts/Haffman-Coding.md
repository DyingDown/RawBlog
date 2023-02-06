---
title: Haffman Coding
date: 2019-10-20 04:44:31
tags: Knowledge points
categories: Data Structure
postImage: https://cdn.jsdelivr.net/gh/DyingDown/img-host-repo/202302051711665.jpg
---

Assume that we have a bunch of points, each point has a number means the occurrence times of the point.

<!--more-->

![img](https://s2.ax1x.com/2019/10/20/KKaXWt.png)

If we want to label these points with a unique code for each, what do we do?

Well, there are many ways, but I’m just going to show the Haffman coding method.

### What is Haffman Coding

>  
>
> In [computer science](https://en.wikipedia.org/wiki/Computer_science) and [information theory](https://en.wikipedia.org/wiki/Information_theory), a **Huffman code** is a particular type of optimal [prefix code](https://en.wikipedia.org/wiki/Prefix_code) that is commonly used for [lossless data compression](https://en.wikipedia.org/wiki/Lossless_data_compression). The process of finding or using such a code proceeds by means of **Huffman coding**, an algorithm developed by [David A. Huffman](https://en.wikipedia.org/wiki/David_A._Huffman) while he was a [Sc.D.](https://en.wikipedia.org/wiki/Doctor_of_Science) student at [MIT](https://en.wikipedia.org/wiki/Massachusetts_Institute_of_Technology), and published in the 1952 paper “A Method for the Construction of Minimum-Redundancy Codes”.[[1\]](https://en.wikipedia.org/wiki/Huffman_coding#cite_note-1) ——From Wikipedia

### Illustration

1. First we pick up two smallest points and make it one point.

   <img src="https://s2.ax1x.com/2019/10/20/KKD0Df.png" alt="img" style="zoom: 67%;" />

2. Do the same as 1

   <img src="https://s2.ax1x.com/2019/10/20/KKyS9H.png" alt="img" style="zoom:67%;" />

3. Same to 1

<img src="https://s2.ax1x.com/2019/10/20/KKy0Dx.png" alt="img" style="zoom:67%;" />

1. Same to 1

<img src="https://s2.ax1x.com/2019/10/20/KKchAf.png" alt="img" style="zoom:67%;" />

1. Same to 1

   <img src="https://s2.ax1x.com/2019/10/20/KK2SdP.png" alt="img" style="zoom:67%;" />

2. Same to 1

   <img src="https://s2.ax1x.com/2019/10/20/KM3VjH.png" alt="img" style="zoom:67%;" />

3. Finally we start label the nodes. From the root to the bottom, the code add one digit when the layer is also one deeper. The left is 0 and right is 1.

   <img src="https://s2.ax1x.com/2019/10/20/KMJdUI.png" alt="img" style="zoom:67%;" />

4. So we got the haffman code of all the nodes.

   ![img](https://s2.ax1x.com/2019/10/20/KMdbqO.png)