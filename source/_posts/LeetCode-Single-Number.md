---
title: LeetCode_Single-Number
date: 2020-09-18 13:22:27
tags: [Math, Bit Manipulation, LeetCode, Bit]
categories: ACM
main: Bit
description: This is bit XOR Operation.
---

## Problem Description

Given a **non-empty** array of integers, every element appears *twice* except for one. Find that single one.

**Note:**

Your algorithm should have a linear runtime complexity. Could you implement it without using extra memory?

**Example 1:**

```
Input: [2,2,1]
Output: 1
```

**Example 2:**

```
Input: [4,1,2,1,2]
Output: 4
```

## Analysis

This is just a simple bit XOR Operation but its not easy to think of.

There are three rules of XOR.

1. The integer XOR with itself will get 0. Because the computer will first change your number in ten to number in two, then XOR each digits of the two numbers. So, 35 XOR 35 is 0.
2. 0 XOR a (an integer) will get a.
3. XOR satisfies Commutative law. (3 ^ 5 ^ 3 ^ 5 = 3 ^ 3 ^ 5 ^ 5)

So, we just need to XOR all the numbers and each number appears twice except one. The one will be left.

## Code

```c++
class Solution {
public:
    int singleNumber(vector<int>& nums) {
        int ans = 0;
        for(int i = 0; i < nums.size(); i ++) {
            ans = ans ^ nums[i];
        }
        return ans;
    }
};
```