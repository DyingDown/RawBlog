---
title: LeetCode 22. Generate Parentheses
date: 2023-03-18 17:14:16
tags: DP
categories: ACM
main: DP
postImage: https://cdn.jsdelivr.net/gh/DyingDown/img-host-repo/202303181728944.jpg
description: We can get the n pairs of parentheses by combining  the x pairs  with n-1-x pairs then combine with one pair "()".
---

## Problem Description

[https://leetcode.com/problems/generate-parentheses/](https://leetcode.com/problems/generate-parentheses/)

## Analysis

Imagine we already have the all the well formed parentheses in 0 pairs to n-1 pairs.  We can get the n pairs of parentheses by combining  the x pairs  with n-1-x pairs then combine with one pair "()".

Why we have to separately consider the single brackets is because we can not just combine the x pairs and n-x pairs to make new well-formed parentheses. We may miss some situations.

We may not think of the well-formed n-1 pairs combine with one pair, but one pair combine with the n-1 pairs.

We can easily see that there is only three place to insert the n-1 pairs.

`_1_(_2_)_3_`  the first and third place are duplicate, we can just select the third place.

now what we do is to put our x pairs an n-x-1 pairs in to the blanks.

At first, 0 pair and 1 pair parentheses has only one combination: `{""}, {"()"}`, with this, we can get the 2 pairs parentheses and then all the way to n pairs.

## Code

```c++
class Solution {
public:
    vector<string> generateParenthesis(int n) {
        vector<vector<string>> brackets = {{""}, {"()"}};
        for(int i = 2; i <= n; i ++) {
            vector<string> t;
            for(int j = 0; j < i; j ++) {
                for(auto k : brackets[j]) {
                    for(auto l : brackets[i - j - 1]) {
                        t.push_back("(" + k + ")" + l);
                    }
                }
            }
            brackets.push_back(t);
        }
        return brackets[n];
    }
};
```

