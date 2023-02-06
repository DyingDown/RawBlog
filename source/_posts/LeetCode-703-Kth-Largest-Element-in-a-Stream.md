---
title: LeetCode 703. Kth Largest Element in a Stream
date: 2023-02-04 16:08:07
tags: [Heap, STL, Priority Queue]
categories: ACM
main: Heap
postImage: https://cdn.jsdelivr.net/gh/DyingDown/img-host-repo/202302041618030.jpg
description: Maintain a Heap that contains only the K biggest the element.
---

## Problem description

[703. Kth Largest Element in a Stream](https://leetcode.com/problems/kth-largest-element-in-a-stream/)

## Analysis

Maintain a Heap that contains only the K biggest the element.  So the K-th element will be the smallest element in the heap.

## Code

```c++
class KthLargest {
public:
    priority_queue<int, vector<int>, greater<int>> pq;
    int maxK;
    KthLargest(int k, vector<int>& nums) {
        // pq = priority_queue<int, vector<int>, greater<int>>;
        for(auto i : nums) {
            pq.push(i);
        }
        while(pq.size() > k) {
            pq.pop();
        }
        maxK = k;
    }
    
    int add(int val) {
        pq.push(val);
        if(pq.size() > maxK)
            pq.pop();
        return pq.top();
    }
};

/**
 * Your KthLargest object will be instantiated and called as such:
 * KthLargest* obj = new KthLargest(k, nums);
 * int param_1 = obj->add(val);
 */
```

