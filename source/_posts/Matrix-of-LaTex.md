---
title: Matrix of LaTex
date: 2019-09-03 06:05:50
tags: math notation
categories: LaTex
---

In order to post my note of linear algebra, I need to know how to put matrix using LaTex. The followings are the usage.

<!--more-->

## Simple matrix

```latex
$$
\begin{matrix}
    7 & 8 & 9 \\
    4 & 5 & 6 \\
    1 & 2 & 3
\end{matrix}
$$
```

Display:
$$
\begin{matrix}
7 & 8 & 9\\
4 & 5 & 6\\
1 & 2 & 3\end{matrix}
$$


## Matrix with brackets

### Curly braces {…}

```latex
$$
\left\{
\begin{matrix}
    7 & 8 & 9 \\
    4 & 5 & 6 \\
    1 & 2 & 3
\end{matrix}
\right\}
$$
```

Display:
$$
\left\{\begin{matrix}7&8&9\\4&5&6\\1&2&3\end{matrix}\right\}
$$

### Square brackets […]

```latex
$$
\left[
\begin{matrix}
    7 & 8 & 9 \\
    4 & 5 & 6 \\
    1 & 2 & 3
\end{matrix}
\right]
$$
```

Display:
$$
\left[
	\begin{matrix}
        7 & 8 & 9 \\
        4 & 5 & 6 \\
        1 & 2 & 3
    \end{matrix}
    \right]
$$

## Matrix with dots

```latex
$$
    \left[
    \begin{matrix}
         a_{11}    & a_{12}    & \cdots   & a_{1n}     \\
         a_{21}    & a_{22}    & \cdots   & a_{2n}     \\
         \vdots    & \vdots    & \ddots   & \vdots     \\
         a_{n1}    & a_{n2}    & \cdots   & a_{nn}     \\
    \end{matrix}
    \right]
$$
```

Display:
$$
\left[
    \begin{matrix}
         a_{11}    & a_{12}    & \cdots   & a_{1n}     \\
         a_{21}    & a_{22}    & \cdots   & a_{2n}     \\
         \vdots    & \vdots    & \ddots   & \vdots     \\
         a_{n1}    & a_{n2}    & \cdots   & a_{nn}     \\
    \end{matrix}
    \right]
$$

## Matrix with parameter

```latex
$$ 
    \left[
        \begin{array}{cc|c}
          2 & 5 & 6 \\
          9 & 3 & 7
        \end{array}
    \right]
$$
```

Display:
$$
\left[
        \begin{array}{cc|c}
          2 & 5 & 6 \\
          9 & 3 & 7
        \end{array}
    \right]
$$

## Inline matrix

```
This is an example of inline matrix $\bigl( \begin{smallmatrix} a & b \\ c & d \end{smallmatrix} \bigr)$ and the display is below.
```

This is an example of inline matrix $\bigl( \begin{smallmatrix} a & b \\ c & d \end{smallmatrix} \bigr)$ and the display is below.