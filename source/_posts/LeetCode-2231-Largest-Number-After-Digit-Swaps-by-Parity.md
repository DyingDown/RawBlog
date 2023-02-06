---
title: LeetCode 2231. Largest Number After Digit Swaps by Parity
date: 2023-02-04 18:03:40
tags: [Priority Queue, Heap]
categories: ACM
main: Heap
postImage: https://cdn.jsdelivr.net/gh/DyingDown/img-host-repo/202302041812536.jpg
description: This problem can be translated into...
---

## Problem Description

[2231. Largest Number After Digit Swaps by Parity](https://leetcode.com/problems/largest-number-after-digit-swaps-by-parity/description/)

## Analysis

This problem can be translated into: 

1. sort the even digits from big to small
2. sort the odd digits from big to small
3. combine them in the even odd order according to origin number 

Because the digits can be sorted **any time**, not just once.

## Code

```c++
class Solution {
public:
    int largestInteger(int num) {
        priority_queue<int> odds, even;
        vector<int> digits;
        while(num) {
            int digit = num % 10;
            if(digit & 1) {
                odds.push(digit);
            }else {
                even.push(digit);
            }
            digits.push_back(digit);
            num /= 10;
        }
        int sum = 0;
        for(int i = digits.size() - 1; i >= 0; i --) {
            sum *= 10;
            if(digits[i] & 1) {
                sum += odds.top();
                odds.pop();
            } else {
                sum += even.top();
                even.pop();
            }
        }
        return sum;
    }
};
```

