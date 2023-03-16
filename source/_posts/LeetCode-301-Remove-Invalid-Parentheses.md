---
title: LeetCode 301. Remove Invalid Parentheses
date: 2023-03-15 19:42:04
tags: BFS
categories: ACM
main: BFS
postImage: https://cdn.jsdelivr.net/gh/DyingDown/img-host-repo/202303152200363.gif
description: Using DFS method to check each possible remove.
---

## Problem Description

[301. Remove Invalid Parentheses](https://leetcode.com/problems/remove-invalid-parentheses/)

## Analysis

First we remove one parentheses,  check one by one that is there are valid parentheses.

If it don't have valid parentheses, remove two parentheses at a time.

Then three, four...

So this can approach using BFS method.

In order to avoid duplicate strings being check valid again, we record the last removed position, the next remove position starts from the previous removed position. And if the character is the same as the previous one, we do not remove because it gets the same result.

## Code

```c++
class Solution {
public:
    vector<string> removeInvalidParentheses(string s) {
        queue<pair<string, int>> que;
        que.push(make_pair(s, 0));
        vector<string> ans;
        while(!que.empty()) {
            auto t = que.front();
            que.pop();
            if(isValid(t.first)) {
                ans.push_back(t.first);
            } else if(ans.empty()){
                for(int i = t.second; i < t.first.size(); i ++) {
                    if((t.first[i] == '(' or t.first[i] == ')') and (i == t.second or t.first[i] != t.first[i - 1])) {
                        string removed = t.first.substr(0, i) + t.first.substr(i + 1);
                        que.push(make_pair(removed, i));
                    }
                }
            }
        }
        return ans;
    }
    bool isValid(string s) {
        int left = 0;
        for(auto c : s) {
            if(c == '(') {
                left ++;
            } else if(c == ')') {
                if(left > 0) left --;
                else {
                    return false;
                }
            }
        }
        return left == 0;
    }
};
```

