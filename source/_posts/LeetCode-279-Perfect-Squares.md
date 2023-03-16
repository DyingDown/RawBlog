---
title: LeetCode 279. Perfect Squares
date: 2023-03-15 12:31:21
tags: [Math, DP, Lagrange Theorem]
categories: ACM
main: Math
postImage: https://cdn.jsdelivr.net/gh/DyingDown/img-host-repo/202303151235334.jpg
description: Every natural number can be represented as a sum of four non-negative integer squares. That is, the squares form an additive basis of order four
---

## Problem Description

[279. Perfect Squares](https://leetcode.com/problems/perfect-squares/description/)

## Analysis

### Dynamic Programing

For the number of `i`, the minimum sum(`dp[i]`) is the min of (`dp[i - 1]`, `dp[i - 4]`, `dp[i - 9]` ...) + 1

`dp[i]` represents the minimum perfect square numbers that sum to `i`.

### Lagrange's four-square theorem

> Every natural number can be represented as a sum of four non-negative integer squares. That is, the squares form an additive basis of order four

and what's more, only when $n \neq 4^k \times (8m + 7)$, n can be represented up to three number squares sum. so in the opposite, when $n = 4^k \times (8m + 7)$, the number can be represents 

So we the the answer is 1, this number it self is a perfect square number,

when the answer is 4,  this number can be represented as $4^k \times (8m + 7)$,

when the answer is 2, we need to loop for each a, b to find that $n = a^2 + b^2$,

If all three conditions above are not satisfied, then the answer would be 3.

## Code

Dynamic Programing: 

```c++
class Solution {
public:
    int numSquares(int n) {
        vector<int> dp(n + 1);
        for(int i = 1; i <= n; i ++) {
            int minn = INT_MAX;
            for(int j = 1; j * j <= i; j ++) {
                minn = min(minn, dp[i - j * j]);
            }
            dp[i] = minn + 1;
        }
        return dp[n];
    }
};
```

Math: 

```c++
class Solution {
public:
    bool ifSquares(int n) {
        int x = sqrt(n);
        return x * x == n;
    }
    bool fourAnswer(int n) {
        while(n % 4 == 0) {
            n /= 4;
        }
        return n % 8 == 7;
    }
    int numSquares(int n) {
        if(ifSquares(n)) {
            return 1;
        }
        if(fourAnswer(n)) {
            return 4;
        }
        for(int i = 1; i <= sqrt(n); i ++) {
            int p = sqrt(n - i * i);
            if(p * p + i * i == n) {
                return 2;
            }
        }
        return 3;
    }
};
```

