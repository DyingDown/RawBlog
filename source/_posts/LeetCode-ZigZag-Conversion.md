---
title: LeetCode-ZigZag Conversion
date: 2020-09-03 16:10:09
tags: [String, STL, LeetCode, Matrix]
categories: ACM
description: We can simulate the order of the place order. Store them in a matrix and then combine the answer string.
---

## Problem Description

The string `"PAYPALISHIRING"` is written in a zigzag pattern on a given number of rows like this: (you may want to display this pattern in a fixed font for better legibility)

```
P   A   H   N
A P L S I I G
Y   I   R
```

And then read line by line: `"PAHNAPLSIIGYIR"`

Write the code that will take a string and make this conversion given a number of rows:

```
string convert(string s, int numRows);
```

**Example 1:**

```
Input: s = "PAYPALISHIRING", numRows = 3
Output: "PAHNAPLSIIGYIR"
```

**Example 2:**

```
Input: s = "PAYPALISHIRING", numRows = 4
Output: "PINALSIGYAHRPI"
Explanation:

P    I    N
A  L S  I G
Y A  H R
P    I
```

## Analysis

![wZjTsO.png](https://s1.ax1x.com/2020/09/06/wZjTsO.png)

The means of the problem is to place the original string to make it looks like connected “NNNN…”

As you can see from the graph, a vertical line and a diagonal line form a cycle.

So we can simulate the order of the place order. Store them in a matrix and then combine the answer string.

First we start from the vertical line. There is `numRows` elements in the vertical line. We put the adjacent characters in original order in the line.

Then we fill the diagonal line. From the left bottom corner to the right top corner, and there is `numRows - 2` elements in the diagonal line.

## Code

```c++
class Solution {
public:
    string convert(string s, int numRows) {
        vector<string> ansMatrix(numRows);
        string ans = "";
        for(int i = 0; i < s.length();) {
            for(int j = 0; j < numRows and i < s.length(); j ++) {
                ansMatrix[j] += s[i ++];
            }
            for(int j = numRows - 2; j > 0 and i < s.length(); j --) {
                ansMatrix[j] += s[i ++];
            }
        }
        for(int i = 0; i < numRows; i ++) {
            ans += ansMatrix[i];
        }
        return ans;
    }   
};
```