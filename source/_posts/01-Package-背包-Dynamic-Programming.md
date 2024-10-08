---
title: 01 Package 背包 Dynamic Programming
date: 2020-09-22 12:27:34
tags: [Dynamic Programming, Knowledge points]
categories: Algorithm
postImage: https://s1.ax1x.com/2020/09/23/wX2BfU.jpg
description: I've been studied 01 Package for so many times. But I keep forgetting it. It costs me so many energy every time I learn, especially for the optimization of space complexity. So I take notes this time.
isCarousel: false
---

## Question

There are n things, each thing has a volume $v[i]$, and a value $c[i]$. There is package with volume Vpackage. Choose some or all of the things to put into package, we want the total value of package is as big as possible. So you should calculate the biggest value.

## Recurrence Equation

We use $dp[i][j]$ to represents the total value of a j volume package with previous i things.

For each thing, there is two status: put it in to the package, or not put it in the package.

The recurrence equation is : $dp[i][j]=max(dp[i−1][j],dp[i−1][j−v[i]]+c[i])$.

This is easy to understand.

If we put $i-th$ thing in the package, the total value would be the value of previous (i-1)th things with package volume $j−v[i]$ add the value of $i-th$ thing. $(dp[i−1][j−v[i]]+c[i])$

If we don’t put, the total value of previous $i-th$ things would be the total value of previous $(i-1)th $things.$(dp[i−1][j])$

Then choose the best situation.

## Two-dimensional array

The code would looks like this:

```c++
for (int i = 0; i < n; i ++) {
    for (int j = 0; j <= Vpackage; j ++) {
        if (j < v[i]) { // if the volume of the ith thing is bigger than the package volume
            dp[i][j] = dp[i - 1][j]; // then don't put it in
        } else {
            dp[i][j] = max(dp[i-1][j], dp[i - 1][j - v[i]] + c[i]);
        }
    }
}
```

## One-dimensional array

We can’t optimize the time complexity because we need to traverse n things and Vpackage volume. However, we can optimize its space complexity.

```c++
for (int i = 0; i < n; i ++) {
    for (int j = Vpackage; j >= v[i]; j --) { // volume of packge bigger than volume of thing
        dp[j] = max(dp[j], dp[j - v[i]] + c[i]);
    }
}
```

**Why we reverse the second for loop?** This is the hardest part for me.

As we know, the current $dp[i][j1]$ is got based on the $dp[i−1][j1]$ and $dp[i−1][j1−v[i]]$.

If we use forward loop, at $i−1$, we calculated a $dp[j1−v[i]]$, and this $dp[j1−v[i]]$ is equal to $dp[i−1][j1−v[i]]$. We will use this to calculate $dp[i][j1]$.

However, when we are at $i$, we may encounter $dp[i][j1−v[i]]$, then we update the $dp[j1−v[i]]$ value to the $dp[i][j1−v[i]]$. So when we use it later, we get wrong. We need to use $dp[j1−v[i]]$ as $dp[i−1][j1−v[i]]$ but $dp[j1−v[i]]$ has been updated to $dp[i][j1−v[i]]$.

So we need to reverse the loop.