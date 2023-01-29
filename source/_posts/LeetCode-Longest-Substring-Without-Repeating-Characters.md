---
title: LeetCode-Longest Substring Without Repeating Characters
date: 2020-09-03 08:49:26
tags: [STL, LeetCode, HashMap]
main: STL
categories: ACM
description: Given a string s, find the length of the longest substring without repeating characters.
---

## Problem Description

Given a string `s`, find the length of the **longest substring** without repeating characters.

**Example 1:**

```
Input: s = "abcabcbb"
Output: 3
Explanation: The answer is "abc", with the length of 3.
```

**Example 2:**

```
Input: s = "bbbbb"
Output: 1
Explanation: The answer is "b", with the length of 1.
```

**Example 3:**

```
Input: s = "pwwkew"
Output: 3
Explanation: The answer is "wke", with the length of 3.
Notice that the answer must be a substring, "pwke" is a subsequence and not a substring.
```

**Example 4:**

```
Input: s = ""
Output: 0
```

**Constraints:**

- `0 <= s.length <= 5 * 104`
- `s` consists of English letters, digits, symbols and spaces.

## Analysis

For this problem’s string s, we need to scan each letter one by one. Only then can we find the longest substring without missing.

So the time complexity is linear.

Let’s take `abcabcbb` for example.

First, you get an `a` and `a` is alone, so you jump to next element `b`. It’s also alone so you jump to next element `c`. And then jump to next element `a`. You found that the `a` has already exists. So the first `a` must be abandoned. And the second `a` is added and you jump to next element `b`. ……

After all these steps, you will find the length of longest substring is 3.

So how do we know the first a has already existed and how we abandoned the first a?

We can build a hashMap that helps store the location of the appeared element. And we also need a pointer to remember the start of the substring. I called the pointer `left`. We use map to find whether the current `s[i]` already exists in the current substring. If existed, we need to set `left` to the previous position of `s[i]`, so that the element `s[i]` wont appear twice in the substring.

We also use another variable to record the current length or the maxim length of substring every time we move i to next. The current length use `i - left` to represent.

## Code

```c++
class Solution {
public:
    int lengthOfLongestSubstring(string s) {
        map<char,int> index;
        int ans = 0, left = -1;
        for (int i = 0; i < s.length(); i ++) {
            if (index.count(s[i]) and index[s[i]] > left){
                left = index[s[i]];   
            }
            index[s[i]] = i;
            ans = max(ans, i - left);
        }
        return ans;
    }
};
```