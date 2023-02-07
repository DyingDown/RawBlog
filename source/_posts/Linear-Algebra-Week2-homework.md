---
title: Linear Algebra Week2 homework
date: 2020-02-28 09:26:35
tags: homework
categories: Linear Algebra
postImage: https://s1.ax1x.com/2020/04/26/Jc11JS.jpg
---

For This chapter, I mainly learnt the nature of determinant and how to expand the determinant due to its row or line.

<!--more-->

## Knowledge point

1. algebraic cofactor and cofactor

   $M_{ij}$ : cofactor of a determinant. It’s the original determinant subtract the row and the line where $a_{ij}$is in.

   $A_{ij}$ : Algebraic cofactor. $=(−1)^{i+j}M_{ij}=(−1$)

2. switching two rows or line in the determinant, the values of it should times -1.

3. The same factor of all elements in the same line or row can be extracted to the outside of the determinant.

4. The multiple of a line or row add to another line or row, the value of the determinant remains the same.

5. If all the elements in the certain row or line can be break down into two parts, then the determinant can be written as the sum form of two determinants.

## Special type of determinants

Knowing the following types can helps you solve your problem easily

### Upper triangle

$\left|\begin{array}{ccccc}a_{11} & 0 & \cdots  & \cdots & 0 \\ a_{21} & a_{22} & 0 & \cdots & 0 \\ a_{31} & a_{32} & a_{33} & \cdots & 0 \\ \vdots & \vdots & \vdots & \vdots & 0 \\ a_{n1} & a_{n2} & a_{n3} & \cdots & a_{nn}\end{array}\right| = a_{11} \times a_{22} \times \cdots \times a_{nn}$

### lower triangle

$M_{n \times n}=a_{1 n} \times a_{2(n-1)} \times \cdots \times a_{n 1} \times(-1)^{n(n-1) / 2}$

### The very special form

$\left[\begin{array}{cccc} a & b & c  & d \\ a & a+b & a+b+c & a+b+c+d \\ a & 2a+b & 3a+2b+c & 4a+3b+2c+d \\ a & 3a+b & 6a+3b+c & 10a+6b+3c+d\end{array}\right]$

1. The last row minus the third row, the third row minus the second row, the second row minus the first row we get$\left|\begin{array}{cccc} a & b & c & d \\ 0 & a & a+b & a+b+c \\ 0 & a & 2a+b & 3a+2b+c \\ 0 & a & 3a+b & 6a+3b+c\end{array}\right| = a \left|\begin{array}{ccc} a & a+b & a+b+c \\  a & 2a+b & 3a+2b+c \\ a & 3a+b & 6a+3b+c\end{array}\right| = a^2 \left|\begin{array}{ccc} 1 & a+b & a+b+c \\  1 & 2a+b & 3a+2b+c \\ 1 & 3a+b & 6a+3b+c\end{array}\right| $
2. The third row minus the second row, the second row minus the first row, we get $a^2 \left|\begin{array}{ccc} 1 & a+b & a+b+c \\  0 & a & 2a+b \\ 0 & a & 3a+b\end{array}\right| = a^2 \times 1 \left|\begin{array}{cc} a & 2a+b \\ a & 3a+b \end{array}\right| = a^3 \times 1 \left|\begin{array}{cc} 1 & 2a+b \\ 1 & 3a+b \end{array}\right| = a^3(3a+b-2a-b) = a^4$
3. So the final answer is $a^4$

### Claw shaped

$\left|\begin{array}{cccc}a_{11} & a_{12} & a_{13}  & a_{14} \\a_{21} & a_{22} & 0 & 0 \\ a_{31} & 0 & a_{33} & 0 \\ a_{41} & 0 & 0 & a_{44}\end{array}\right|$

For this kind of determinants, we transform it to the upper triangle by letting the first row add the positive or negative multiples of second … nth row, so ,the firs line becomes $\left|\begin{array}{cccc}a_{11} & 0 & \cdots & 0\end{array}\right|$

### Solid triangle

$\left|\begin{array}{cccc}a & b & b  & b \\ b & a & b & b \\ b & b & a & b \\ b & b & b & a\end{array}\right|$

Add the second the row to the first row and the third and … and the last., so the first row has the same element, and can extract the factor out. So the firs row would all became 1.

So the answer is $[ a+(n−1)b] (a−b)^{n−1}$

### Many 0 form

$\left|\begin{array}{cccc}a_{1} & 0 & b_{1}  & 0 \\ 0 & c_{1} & 0 & d_{1} \\ b_{2} & 0 & a_{2} & 0 \\ 0 & d_{2} & 0 & c_{2}\end{array}\right|$

1. If the elements are irregular, we need to make a certain row element to 0 as many as possible. And down grade the $n×n$ determinant turns in to $(n−1)×(n−1)$ determinant.

## homework

1. if $\left|\begin{array}{ccc}a_{11} & a_{12} & a_{13}\\ a_{21} & a_{22} & a_{23} \\ a_{31} & a_{32} & a_{33} \end{array}\right|=M≠0$, calculate the answer of determinant $\left|\begin{array}{ccc} -2a_{11} & -2a_{12} & -2a_{13} \\ -2a_{21} & -2a_{22} & -2a_{23} \\ -2a_{31} & -2a_{32} & -2a_{33} \end{array}\right|$

   **Solution**: extract -2 from each row, we get $ (-2)^3 \left|\begin{array}{ccc}a_{11} & a_{12} & a_{13} \\ a_{21} & a_{22} & a_{23} \\ a_{31} & a_{32} & a_{33} \end{array}\right| - -8M$