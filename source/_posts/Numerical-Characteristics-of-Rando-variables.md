---
title: Numerical Characteristics of Rando variables
date: 2020-01-02 10:23:46
tags: Knowledge points
categories: Probability and Statistics
---

第四章 随机变量的数字特征

## 一、数学期望

1. 离散型
   $$
   E(X)=\sum_{k=1}^{\infty} x_{k} p_{k}
   $$

   当上式发散时，$X$的数学期望不存在。

   <!--MORE-->
   
2. 连续型

$$
E(X)=\int_{-\infty}^{+\infty} x f(x) d x
$$

   发散时，$X$的数学期望不存在

3. 随机变量函数

   （1） 一维

	$Y=g(X)$ ($g$是连续函数）$X$是随机变量。$\sum_{k=1}^{\infty} g\left(x_{k}\right) \rho_{k}$绝对收敛，则

   连续型：

$$
E(Y)=E[g(X)]=\sum_{k=1}^{\infty} g\left(x_{k}\right) P_{k}
$$
​	  离散型：
$$
E(Y)=E[g(X)]=\int_{-\infty}^{+\infty} g(x) f(x) dx
$$
（2） 二维

  	离散型: 
$$
E(Z)=E[g(X, Y)]=\sum_{i=1}^{\infty} \sum_{j=1}^{\infty} g\left(x_{i}, y_{j}\right) p_{i j}
$$
​	  连续型：
$$
E(Z)=E[g(X, Y)]=\int_{-\infty}^{+\infty} \int_{-\infty}^{+\infty} g(x, y) f(x, y) d x d y
$$

4. 数学期望的性质

      （1）$C$是常数 $E(C)=C$

      （2）$E(CX)=CE(X)$

      （3）任意两个随机变量$X，Y$ $E(X+Y)=E(X)+E(Y)$

      有限个 $E\left(X_{1}+E_{2}+\cdots+X_{n}\right)=E\left(X_{1}\right)+E\left(X_{2}\right)+\cdots+E\left(X_{n}\right)$

      （4）相互独立的$X，Y$ $E(X Y)=E(X) E(Y)$

      有限个 $E\left(X_{1} X_{2} \cdots X_{n}\right)=E\left(X_{1}\right) E\left(X_{2}\right) \cdots E\left(X_{n}\right)$

## 二、方差

1. 定义

   $D(X)=\operatorname{Var}(X)=E\left\{[X-E(X)]^{2}\right\}$

   $\sqrt{D(X)}$ 标准差 or 均方差

2. 计算

   离散型   $D(X)=\sum_{k=1}^{\infty}\left[x_{k}-E(x)\right]^{2} p_{k}$

    连续型 $D(X)=\int_{-\infty}^{+\infty}[x-E(x)]^{2} f(x) d x$

    重要公式 $D(X)=E\left(X^{2}\right)-[E(X)]^{2}$

3. 标准化

   X有数学期望$E(X)=\mu$，方差 $D(X)=\sigma ^ 2 \neq$0 , $X*=\frac{X- \mu}{\sigma}$ 则，
   $$
   E(X*)=\frac{1}{\sigma}E(X-u)=\frac{1}{\sigma}[E(X)-\mu]=0 \\
   D(X =1*)=E\left[(X *)^{2}\right]-[E(X *)]^{2}=E\left[\left(\frac{X-\mu}{0}\right)^{2}\right]=\frac{1}{\sigma^{2}} E\left[(X-\mu)^{2}\right]=1
   $$

      $X*$称为$X$的标准量变

4. 性质

      （1）$D(C)=0$

      （2）$D(CY)=C^2D(X),D(X+C)=D(X)$

      （3）任意两个随机变 $D(X\pm Y)=D(X)+D(Y) \pm 2E{[X-E(X)][Y-E(Y)]}$

      $X Y$ 相互独立$D(X \pm Y)=D(X)+D(Y)$

      $N$个随机变量相互独立
$$
D\left(X_{1}+X_{2}+\cdots+X_{n}\right)=D(X-1)+D\left(X_{2}\right)+\cdots+D\left(X_{n}\right) \\
D\left(\sum_{i=1}^{n} C_{i} X_{i}\right)=\sum_{i=1}^{n} C_{i}^{2} D\left(X_{i}\right)
$$
​	 （4）$D(X)=0$的充要条件是$P{X=C}=1,C=E(X)$

5. 常用数学期望和方差

      （1）0-1分布
        $E(X)=p$
	  	$D(X)=p(1-p)$

      （2）二项分布
		$E(X)=np$
		$D(X)=np(1-p)$

      （3）泊松分布
			$E(X)=\lambda$
			$D(X)=\lambda$
      （4）指数分布
			$E(X)=\frac{1}{\lambda}$
			$D(X)=\frac{1}{\lambda^2}$
      （5）正态分布
		标准：$D(X)=1$
		非标准：$E(X)=\mu \space D(X)=\sigma^2$

6. 由数学期望和方差性质知
   $\begin{aligned}
   &E(\bar{x})=\frac{1}{n} E\left(\sum_{i=1}^{n} X_{i}\right)=\frac{1}{n} \sum_{i=1}^{n} E\left(X_{i}\right)=\mu\\
   &D(\bar{X})=D\left(\frac{1}{n} \sum_{i=1}^{n} X i\right)=\frac{1}{n^{2}} \sum_{i=1}^{n} D\left(X_{i}\right)=\frac{\sigma^{2}}{n}
   \end{aligned}$


## 三、协方差与相关系数

1. 协方差

      （1）定义：随机变量X与Y的协方差 $Cov(X,Y)$，即                                

$$
Cov(X,Y)=E[X-E(X)][Y-E(Y)]=E(XY)+E(X)E(Y)
$$

（2）性质：

​		a.$Cov(X,Y)=Cov(Y,X)$

​		b. $Cov(X,Y)=D(X)$

​		d. $Coc(aX,bY)=abCov(X,Y)$

​		e. $Cov(C,Y)=0$

​		f. $Cov(X_1+X_2,Y)=Cov(X_1,Y)+Cov(X_2,Y)$

​		g. 随机变量相互独立 $Cov(X,Y)=0$

（3）定理：

$$
[E(XY)]^2\leq E(X^2)E(Y^2)
$$

（4）算式

$$
D(X \pm Y)=D(X)+D(Y) \pm 2Cov(X,Y) \\
D(X+Y+Z)=D(X)+D(Y)+D(Z)+2Cov(X,Y)+2Cov(X,Z)+2Cov(Y,Z)
$$

2. 相关系数

      （1）定义：随机变量的相关系数 $\rho_{xy}$
$$
\rho_{x y}=\frac{\operatorname{cov}(X-Y)}{\sqrt{D(X)} \sqrt{D(Y)}}
$$
​		当 $\rho_{xy}=0$ 时，$X，Y$不相关；当 $\rho_{xy}=1$ 时，$X，Y$正线性相关；当 $\rho_{xy}=-1$ 时，$X，Y$负线性相关。

  （2）定理
	a. $\left|\rho_{x y}\right| \leq 1$
	b. $\left|\rho_{x y}\right|= 1$ 的充要条件是存在$a，b$使 $P\{Y=a+bX\}=1$ 

  	由上可知，$\rho_{xy}$的实际意义是：$X，Y$之间的线性近似程度。$\left|\rho_{x y}\right|$越接近于$1$越近似的有线性关系。$X，Y$之间有密切的曲线关系时，$\left|\rho_{x y}\right|$的值可能很小。如$X$服从$N(0,1),Y=X^2$，此时$X，Y$有密切的曲线关系但是$\left|\rho_{x y}\right|=0$

​	 c. 若$X$与$Y$相互独立，则$\left|\rho_{x y}\right|=0$，即$X$与$Y$不相关。反之不真。

  （3）随机变量$(X,Y)$服从二维正态分布，公式为$f(x, y)=\frac{1}{2 \pi \sigma_{1} o_{2} \sqrt{1-\rho^{2}}} \exp \left\{\frac{-1}{2\left(1-\rho^{2}\right)}\left[\frac{\left(x-u_{1}\right)^{2}}{\sigma_{1}^{2}}-2 \rho \frac{\left(x-\mu_{1}\right)\left(y-\mu_{2}\right)}{\sigma_{1} \sigma_{2}}+\frac{\left(y-\mu_{2}\right)^{2}}{\sigma_{2}^{2}}\right]\right\}$，相关系数$\rho_{xy}=\rho$

## 四、矩、协方差矩阵

1. 定义

      （1）设$X$和$Y$是随机变量，若
$$
E(X^k), k=1,2,\cdots
$$

​		存在，成它为$X$的$k$阶原点矩，简称$k$阶矩
​		a.  若$E[X-E(X)]^k,k=2,3,\cdots$存在，称它为$X$的$k$阶中心矩
​		b.  若$E(X^kY^l),k,l=1,2,\cdots$ 存在，称它为$X$和$Y$的$k+l$阶混合矩
​		c.  若$E\{[X-E(X)]^k[Y-E(Y)]^l\},k,l=1,2,\cdots$存在，称它为$X$和$Y$的$k+l$阶混合中心矩
​		d.  $E(X)$是$X$的一阶原点矩，$D(X)$是$X$的二阶中心矩，$Cov(X，Y)$是$X，Y$的二阶混合中心矩。
​		e.   $X$的$k$阶原点矩存在，低于$k$的各阶原点矩都存在，$k$阶和低于$k$阶的中心矩也存在。同样，$X$的中心矩存在，$k$阶和低于$k$阶的中心距也存在.


（2）设$n$维随机变量$\left(X_{1}, X_{2}, \cdots, X_{n}\right)$的二阶混合中心矩
$$
C_{ij}=C_{ij}(i,j=1,2,\cdots,n)
$$
​		都存在，则称矩阵
$$
C=\left[\begin{array}{cccc}
{C_{11}} & {c_{11}} & {\dots} & {C_{1 n}} \\
{C_{21}} & {C_{22}} & {\dots} & {C_{2 n}} \\
{\vdots} & {\vdots} & {\ddots} & {\vdots} \\
{C_{n 1}} & {C_{n 2}} & {\dots} & {C_{n n}}
\end{array}\right]
$$
   		为$n$维随机变量$\left(X_{1}, X_{2}, \cdots, X_{n}\right)$的协方差矩阵，上述矩阵为对称矩阵。

2. $n$维正态分布的性质

​		（1）$n$维正态随机变量$\left(X_{1}, X_{2}, \cdots, X_{n}\right)$的每一个分量$X_i(i=1,2,\cdots,n)$都是正态随机变量；反之都是$\left(X_{1}, X_{2}, \cdots, X_{n}\right)$正态随机变量，且相互独立，则$\left(X_{1}, X_{2}, \cdots, X_{n}\right)$是$n$维正态随机变量

​		（2）$n$随机变量$\left(X_{1}, X_{2}, \cdots, X_{n}\right)$服从$n$维正态分布的充要条件是$\left(X_{1}, X_{2}, \cdots, X_{n}\right)$的任意线性组合：

$$
l_1X_1+l_2X_2+\cdots+l_nX_n
$$

​			服从一维正态分布，（其中$l_1,l_2,\cdots,l_n$不全为$0$）

​		（3）若$\left(X_{1}, X_{2}, \cdots, X_{n}\right)$服从$n$维正态分布，设$\left(Y_{1}, Y_{2}, \cdots, Y_{n}\right)$是$X_j(j=1,2,\cdots,n)$

的线性函数，则$\left(Y_{1}, Y_{2}, \cdots, Y_{n}\right)$服从$k$维正态分布

​		（4）设$\left(X_{1}, X_{2}, \cdots, X_{n}\right)$服从$n$维正态分布，则“$\left(X_{1}, X_{2}, \cdots, X_{n}\right)$相互独立“与”$\left(X_{1}, X_{2}, \cdots, X_{n}\right)$“两两不相关”等价
