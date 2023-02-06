---
title: LeetCode 1046. Last Stone Weight
date: 2023-02-04 17:12:00
tags: [Heap, Stimulation]
categories: ACM
main: Heap
postImage: https://cdn.jsdelivr.net/gh/DyingDown/img-host-repo/202302041715161.jpg
description: Do as the game. Choose two heaviest stone and do the subtraction.
---

## Problem Description

[1046. Last Stone Weight](https://leetcode.com/problems/last-stone-weight/description/)

## Description

Do as the game. Choose two heaviest stone and do the subtraction.

Use Priority Queue to easily find the two heaviest stone.

## Code 

```c++ 
class Solution {
public:
    int lastStoneWeight(vector<int>& stones) {
        priority_queue<int> pq(stones.begin(), stones.end());
        while(pq.size() > 1) {
            int x = pq.top();
            pq.pop();
            int y = pq.top();
            pq.pop();
            if(x != y) {
                pq.push(x - y);
            }
        }
        if(pq.empty()) return 0;
        return pq.top();
    }
};
```

