---
title: Leetcode 560. Subarray Sum Equals K
date: 2025-09-09 09:21:50
tags: [Prefix, Hash Table]
categories: ACM
main: Prefix
postImage:
description: The O(n^2) Solution is easy to understand, so I will just explain why the Hash Table works.
warning: false
isCarousel: false
---

## Problem Description

[560. Subarray Sum Equals K](https://leetcode.com/problems/subarray-sum-equals-k/)

## Analysis

The $O(n^2)$ Solution is easy to understand, so I will just explain why the Hash Table works.

We define the prefix sum as:
$$
prefix[i] = nums[0] + nums[1] + \dots + nums[i];
$$
For subarray `nums[i, j] `, it can be written as:
$$
sum(i, j) = prefix[j] - prefix[i] = k
$$
So the condition could be transformed into:
$$
prefix[j] - k = prefix[i]
$$
This means if we have a `prefix[j]` already, and we what we need to do is to find is there an `prefix[j] - k` in the previous prefixes that makes the equation valid. 

The number of occurrence of `prefix[j] - k` is the number of subarrays that qualify the condition.

In order to find how many `prefix[j] - k` there is, we can just store `prefix[i] = sum[0, i]` in the map.

The time complexity of this solution is `O(n)`.

## Code

```c++
class Solution {
public:
    int subarraySum(vector<int>& nums, int k) {
        map<int, int> mp;
        int sum = 0;
        int cnt = 0;
        for(int i = 0; i < nums.size(); i ++) {
            mp[sum] ++;
            sum += nums[i];
            if(mp.contains(sum - k)) {
                cnt += mp[sum - k];
            }
        }
        return cnt;
    }
};
```



```c#
public class Solution {
    public int SubarraySum(int[] nums, int k) {
        int sum = 0;
        int cnt = 0;
        Dictionary<int,int> mp = new Dictionary<int,int>();
        for(int i = 0; i < nums.Length; i ++) {
            if(mp.ContainsKey(sum)) {
                mp[sum] ++;
            } else {
                mp[sum] = 1;
            }
            sum += nums[i];
            if(mp.ContainsKey(sum - k)) {
                cnt += mp[sum - k];
            }
        }
        return cnt;
    }
}
```



```Java
class Solution {
    public int subarraySum(int[] nums, int k) {
        Map<Integer, Integer> mp = new HashMap<>();
        int sum = 0;
        int cnt = 0;
        for(int i = 0; i < nums.length; i ++) {
            mp.put(sum, mp.getOrDefault(sum, 0) + 1);
            sum += nums[i];
            cnt += mp.getOrDefault(sum - k, 0);
        }
        return cnt;
    }
}
```

