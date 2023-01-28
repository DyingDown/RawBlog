---
title: The last Internal Node of a Complete Binary Tree
date: 2021-08-30 09:51:09
tags: Complete Binary Tree
categories: Data Structrue
postImage: https://cdn.jsdelivr.net/gh/dyingdown/img-host-repo/Blog/post/20210831220156.jpg
---

This problem derives from *Heap Sort*. 

<!--more-->

>When you start to build the heap, you should start with the last internal node of the tree. And the index is usually **$\frac{N}{2} - 1$**, N is the total length of the array.

But why is that ?

## Complete Binary Tree

First, you need to know that when representing a tree using array, the tree is a *Complete Binary Tree*. See the following picture.

<img src="https://cdn.jsdelivr.net/gh/dyingdown/img-host-repo/Blog/post/20210831205110.svg" alt="complete-BT" style="zoom:75%;" />

The nodes in the array are stored like this: `[A, B, C, D, E, F, G, H, I, J]`

And the number of nodes $N$ can be represent as $2^{0}+2^{1}+\ldots +2^{k}+s$.  （$k = depth - 1$, $s$ is the number of nodes in the deepest layer）

## Proof

I’m proving this in a graphical layer.

First, let’s complete the tree to make it a *Full Binary Tree*.

<img src="https://cdn.jsdelivr.net/gh/dyingdown/img-host-repo/Blog/post/20210831200317.svg" alt="graphviz (1)" style="zoom:75%;" />

As we can see, before completion, the last internal node is $E$.

Index of $E$ =**$N$ - Red_Nodes - Deepest_Layer_Nodes**

Let’s solve one by one.

1. *Deepest_Layer_Nodes($s$)*: 

   $$
   N=2^{0}+2^{1}+\ldots +2^{k}+s \\\\
   \Rightarrow s=N-2^{0}-2^{1}- \cdots -2^{k} \\
   $$
   $k + 1$ is the depth of the tree. s

2. *Red_Nodes( R )*

   As seen from the graph, number of red nodes is relative with the gray nodes.

   Assume *$F$* is number of nodes of Full Binary Tree, *$D$* is the number of Gray Nodes.

   $$
   F=2^{0}+2^{1}+\ldots +2^{k+1}\\\\
   D=F-N
   $$

   From the previous graph we can see that **when D is odd, $R = (D - 1) / 2$**

   Now let's see another graph, when the number of gray nodes is even.

   <img src="https://cdn.jsdelivr.net/gh/dyingdown/img-host-repo/Blog/post/20210831205206.svg" alt="graphviz (2)" style="zoom:75%;" />

   **When D is even, $R = D / 2$**

   $\therefore R = floor(D / 2)$

3. Then $E=2^{0}+\ldots +2^{k}-R$

   $\because R=floor\left( \dfrac{\left( 2^{0}+\ldots +2^{k+1}-N\right) }{2}\right) $ 

   $=floor\left( \dfrac{1}{2}+2^{0}+\ldots +2^{k}-\dfrac{N}{2}\right) =floor\left( \dfrac{1}{2}\right) +floor\left( 2^{0}+\ldots +2^{k}\right) -floor\left( \dfrac{N}{2}\right)$

   $=2^{0}+\ldots +2^{k}-floor\left(\dfrac{N}{2}\right)$

   $\therefore E=floor\left(\dfrac{N}{2}\right)$

4. Because the index started from 0, so $E = floor\left(\dfrac{N}{2}\right) - 1$