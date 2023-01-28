---
title: Law of Large Numbers
date: 2020-01-15 01:32:38
tags: Knowledge points
categories: Probability and Statistics
postImage: https://s1.ax1x.com/2020/04/26/JcNKXD.jpg
---

第五章 大数定律和中心极限定理

## 一、*大数定律

   （1）切比雪夫不等式

​		$X$有数学期望$E(X)=\mu,D(X=\sigma^2)$, 则对任意正整数$\varepsilon$

​		$P\{\left| x - \mu \right| \geq \varepsilon \} \leq \frac{\sigma ^2}{\varepsilon ^ 2}$

 		$P\{\left| x - \mu \right| < \varepsilon \} \geq 1-\frac{\sigma ^2}{\varepsilon ^ 2}$

<!--more-->

​		此不等式说明$D(X)$越小，$P\{\left| x - \mu \right| \geq \varepsilon \}$越小；反之，$P\{\left| x - \mu \right| < \varepsilon \}$越大。也就是$D(X)$很小时，随机变量取值基本集中在$E(X)$附近。

   （2）定义

​		设$\{X_n\}$为一随机变量序列，$a$是一个常数，若对任意正整数$\varepsilon$有


$$
\lim _{n \rightarrow \infty} P\left\{\left|x_{n}-a\right|<\varepsilon\right\}=1
$$

  			

​		则称$\{X_n\}$依概率收敛于$a$，即为$X_{n} \stackrel{p}{\rightarrow} a(n \rightarrow \infty)$
​		有如下性质：

​			$X_{n} \stackrel{p}{\rightarrow} a, Y_{n} \stackrel{p}{\rightarrow} b$， 设$g(x,y)$ 在$(a,b)$点连续，则
$$
g\left(X_{n}, Y_{n}\right) \stackrel{P}{\rightarrow} g(a, b)
$$
（3）切比雪夫大数定律

​		设$\left(X_{1}, X_{2}, \cdots, X_{n},\cdots \right)$是一列相互独立的随机变量序列，并且$E(X_i),D(X_i)$均存在，同时存在$C$，$D(X_i) \leq C(i=1,2,\cdots)$，则对任意的$\varepsilon>0$，有
$$
\lim _{n \rightarrow \infty} P\left\{\left|\frac{1}{n} \sum_{i=1}^{n} X_{i}-\frac{1}{n} \sum_{i=1}^{n} E\left(X_{i}\right)\right|<\varepsilon\right\}=1
$$
​		也即
$$
\frac{1}{n} \sum_{i=1}^{n} X_{i}-\frac{1}{n} \sum_{i=1}^{n} E\left(X_{i}\right) \stackrel{p}{\rightarrow} 0(n \rightarrow \infty)
$$
   （4）辛钦大数定律

​		设$\left(X_{1}, X_{2}, \cdots, X_{n},\cdots \right)$是一列相互独立且服从同一分布的随机变量序列，$E(X)=\mu(1,2,\cdots)$，则$\frac{1}{n} \sum_{i=1}^{n} X_{i}$依概率收敛与$\mu$，即
$$
\frac{1}{n} \sum_{i=1}^{n} X_{i} \stackrel{p}{\rightarrow} \mu(n \rightarrow \infty)
$$
   （5）伯努利大数定律

​		$n_A$是$n$次独立重复复实验中$A$发生的次数，$p$是事件$A$在每次实验中发生的概率，则对任意正整数，有$\varepsilon$
$$
\lim _{n \rightarrow \infty} P\left\{\left|\frac{n_{A}}{n}-p\right|<\varepsilon\right\}=1
$$
​		即 $\frac{n_{A} p}{n} \rightarrow p(n \rightarrow \infty)$

## 二、中心极限定理

   （1）独立同分布中心极限定理

​			设$\{X_{1}, X_{2}, \cdots, X_{n},\cdots \}$是一列相互独立且服从同一分布的随机变量序列，有数学期望$E(X_i)=\mu,D(X_i)=\sigma^2>0(i=1,2,\cdots)$，则随机变量和$\sum_{i=1}^{n} X_{i}$的标准变化量
$$
Z_n=\frac{\sum_{1=1}^{n} x_{i}-E\left(\sum_{i=1}^{n} x_{i}\right)}{\sqrt{D\left(\sum_{i=1}^{n} x_{i}\right)}}=\frac{\sum_{i=1}^{n} x_{i}-n \mu}{\sqrt{n} \sigma}
$$
​			的分布函数$F_n(x)$对于任意$x$满足
$$
\lim _{n \rightarrow \infty} F_{n}(x)=\lim _{n \rightarrow \infty} P\left\{\frac{\sum_{i=1}^{n} x_{i}-n \mu}{\sqrt{n} \sigma} \leq x\right\}=\int_{-\infty}^{x} \frac{1}{\sqrt{2 \pi}} e^{-\frac{t}{2}} d t=\phi(x)
$$
​			该定理说明当$n \rightarrow \infty$时，随机变量$Z_n$的分布函数收敛于标准正态分布函数。不论$\{X_{1}, X_{2}, \cdots, X_{n},\cdots \}$服从什么分布，只要满足定理条件，$n$充分大时$\sum_{i=1}^{n} X_{i}$，可以近似服从正态分布。

   （2）蒂莫夫-拉普拉斯中心极限定理

​			设随机变量$\eta_{n}(n=1,2, \cdots)$服从参数为$n,p(0<p<1)$的二项分布，则对任意实数$x$有
$$
\lim _{n \rightarrow \infty} P\left\{\frac{\eta_{n}-n p}{\sqrt{n p}(1-p)} \leq x\right\}=\int_{-\infty}^{x} \frac{1}{\sqrt{2 \pi}} e^{-\frac{t}{2}} d t=\phi(x)
$$
​			此定理表明，二项分布的极限时正态分布，当$n$充分大时，可以近似计算二项分布的概率。当$n$充分大时，二项分布的随机变量近似服从正态分布。