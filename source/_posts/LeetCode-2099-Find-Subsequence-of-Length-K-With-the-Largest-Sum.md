---
title: LeetCode 2099. Find Subsequence of Length K With the Largest Sum
date: 2023-02-04 16:40:43
tags: [Priority Queue, STL, Sort, Heap]
categories: ACM
main: Heap
postImage: https://cdn.jsdelivr.net/gh/DyingDown/img-host-repo/202302041646786.jpg
description: Use priority queue to find the largest k numbers. also and their index.
---

## Problem Description 

[2099. Find Subsequence of Length K With the Largest Sum](https://leetcode.com/problems/find-subsequence-of-length-k-with-the-largest-sum/description/)

## Analysis

Use priority queue to find the largest k numbers. also and their index.

sort the index.

using the sorted index to find number in origin array.

## Code

```c++
class Solution {
public:
    void buildHeap(vector<pair<int,int>>& nums) {
        for(int i = nums.size() / 2 - 1; i >= 0; i --) {
            maxifyHeap(nums, i, nums.size());
        }
    }
    void maxifyHeap(vector<pair<int,int>>& nums, int i, int heapSize) {
        int left = i * 2 + 1, right = left + 1, maxn = i;
        if(left < heapSize && nums[left].first > nums[maxn].first) {
            maxn = left;
        }
        if(right < heapSize && nums[right].first > nums[maxn].first) {
            maxn = right;
        }
        if(maxn != i ) {
            swap(nums[maxn], nums[i]);
            maxifyHeap(nums, maxn, heapSize);
        }
    }
    vector<int> maxSubsequence(vector<int>& nums, int k) {
        vector<int> sub(k);
        vector<pair<int,int>> numsToIndex(nums.size());
        for(int i = 0; i < nums.size(); i ++) {
            numsToIndex[i] = make_pair(nums[i], i);
        }
        buildHeap(numsToIndex);
        for(int i = 0; i < k; i ++) {
            sub[i] = numsToIndex[0].second;
            swap(numsToIndex[0], numsToIndex[nums.size() - i - 1]);
            maxifyHeap(numsToIndex, 0, nums.size() - i - 1);
        }
        sort(sub.begin(), sub.end());
        vector<int> ans(k);
        for(int i = 0; i < k; i ++) {
            ans[i] = nums[sub[i]];
        }
        return ans;
    }
};
```

