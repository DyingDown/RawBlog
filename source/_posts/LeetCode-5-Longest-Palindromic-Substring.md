---
title: LeetCode 5. Longest Palindromic Substring
date: 2023-03-16 20:09:12
tags: [DP, Brute Force, Center Expand]
categories: ACM
main: DP
postImage: https://cdn.jsdelivr.net/gh/DyingDown/img-host-repo/202303171935185.png
description: Solve using three ways.
---

## Problem Description

[https://leetcode.com/problems/longest-palindromic-substring/](https://leetcode.com/problems/longest-palindromic-substring/)

## Brute Force

Loop for each possible substring, check if its a palindromic string, But it is not suitable for this problem, it will get TLE.

### Code

```c++
class Solution {
public:
    string longestPalindrome(string s) {
        int maxLen = 1;
        int left = 0;
        for(int i = 0; i < s.length() - 1; i ++) {
            for(int j = i  + 1; j < s.length(); j ++) {
                int len = (j - i + 1);
                if(len > maxLen && isPalindromic(s, i, j)) {
                    maxLen = len;
                    left = i;
                }
            }
        }
        return s.substr(left, maxLen);
    }
    bool isPalindromic(string s, int left, int right) {
        while(left < right) {
            if(s[left] != s[right]) {
                return false;
            }
            left ++, right --;
        }
        return true;
    }
};
```

## Center Expand

Palindromic string has two situations:

1. the center is a character
2. the center is the gap between two character

So we loop each index to check the two situations by expanding the index from the centers to see how long can is the palindromic string

### Code

```c++
class Solution {
public:
    string longestPalindrome(string s) {
        if(s.length() < 2) return s;
        int maxLen = 1;
        int left = 0;
        for(int i = 0; i < s.length() - 1; i ++) {
            int len1 = centerExpand(s, i, i);
            int len2 = centerExpand(s, i, i + 1);
            int maxn = max(len1, len2);
            if(maxn > maxLen) {
                maxLen = maxn;
                left = i - (maxLen - 1) / 2;
            }
        }
        return s.substr(left, maxLen);
    }
    int centerExpand(string s, int left, int right) {
        while(left >= 0 and right < s.length() and s[left] == s[right]) {
            left --;
            right ++;
        }
        return right - left - 1;
    } 
};
```

## DP

There is a regular pattern: if the string s is a palindromic string, then after removing the head and tail character, the rest string is still a palindromic string.

We use `dp[i][j]` to represents if the the substring `s[i, j]` a palindromic string.

So, `dp[i][j]` is based on `s[i] == s[j] && dp[i+1][j-1]` 

And the `i+1` , `j-1` must be form a legal string, so `j-1 - (i+1) >= 2 => j - i >= 3`

First, the diagonal means the character itself, so it should be true;

|      |  0   |  1   |  2   |  3   |  4   |
| :--: | :--: | :--: | :--: | :--: | :--: |
|  0   | true |      |      |      |      |
|  1   |      | true |      |      |      |
|  2   |      |      | true |      |      |
|  3   |      |      |      | true |      |
|  4   |      |      |      |      | true |

So we can just fill the form, fill them by column, and in each column fill in ascending order. ( babab )

|      |  0   |   1   |   2   |   3   |  4   |
| :--: | :--: | :---: | :---: | :---: | :--: |
|  0   | true | false | true  | false |      |
|  1   |      | true  | false | true  |      |
|  2   |      |       | true  | false |      |
|  3   |      |       |       | true  |      |
|  4   |      |       |       |       | true |

### Code

```c++
class Solution {
public:
    string longestPalindrome(string s) {
        if(s.length() < 2) return s;
        int maxLen = 1;
        int left = 0;
        int len = s.length();
        vector<vector<bool>> dp(len, vector<bool>(len));
        for(int i = 0; i < len; i ++) dp[i][i] = true;
        for(int j = 1; j < len; j ++) {
            for(int i = 0; i < j; i ++) {
                if(s[i] != s[j]) {
                    dp[i][j] = false;
                    continue;
                }
                if(j - i < 3) {
                    dp[i][j] = true;
                } else {
                    dp[i][j] = dp[i+1][j-1];
                }
                if(dp[i][j] && j - i + 1 > maxLen) {
                    maxLen = j - i + 1;
                    left = i;
                }
            }
        }
        return s.substr(left, maxLen);
    }
};
```