---
title: Leetcode 523. Continuous Subarray Sum
date: 2025-09-09 11:28:13
tags: [Prefix, Math, HashMap]
categories: ACM
main: Math
postImage:
description: If two prefix sums have the same remainder modulo k, their difference is divisible by k.
warning: false
isCarousel: false
---

## Description

[523. Continuous Subarray Sum](https://leetcode.com/problems/continuous-subarray-sum/)

## Analysis

Define the subarray sum as:
$$
sum(i, j) = prefix[j] - prefix[i];
$$


First let’s see the condition that should return true.
$$
prefix[j] - prefix[i] = n * k \\\\
\Rightarrow (prefix[j] - prefix[i]) \\% k = 0 \\
$$
According to the math equation:
$$
(a + b) \\% k = (a \\%k + b \\% k) \\% k
$$
Since $ a = prefix[j], b = -prefix[i]$ . And $prefix[j] - prefix[i] > 0$ is always true. So the the condition becomes:
$$
(prefix[j] \\%k - prefix[i] \\%k) \\% k = 0 \\\\
\Rightarrow prefix[j] \\%k = prefix[i] \\% k
$$
So the final condition would be $prefix[i] \\% k = prefix[j] \\% k$; All we need to do is to find a previous `prefix[i] % k` that equals the `prefix[j] % k`. 

 

Since the problem requires the subarray length ≥ 2,  we store the **first occurrence index** of each remainder in a HashMap,  and whenever we find the same remainder again,  we check if the distance between indices is at least 2.

## Code

```c++
class Solution {
public:
    bool checkSubarraySum(vector<int>& nums, int k) {
        int sum = 0;
        map<int,int> mp; 
        mp[0] = -1;
        for(int i = 0; i < nums.size(); i ++) {
            sum = (sum + nums[i]) % k;
            // cout << i << ": " << sum << endl;
            if(mp.find(sum) != mp.end()) {
                if(i - mp[sum] > 1)
                    return true;
            } else {
                mp[sum] = i;
            }
        }
        return false;
    }
};
```





```c#
public class Solution {
    public bool CheckSubarraySum(int[] nums, int k) {
        Dictionary<int,int> mp = new Dictionary<int ,int >();
        int sum = 0;
        mp[0] = -1;
        for(int i = 0; i < nums.Length; i ++) {
            sum = (sum + nums[i]) % k;
            if(mp.ContainsKey(sum)) {
                if(i - mp[sum] > 1) {
                    return true;
                }
            } else {
                mp[sum] = i;
            }
        }
        return false;
    }
}
```



```java
class Solution {
    public boolean checkSubarraySum(int[] nums, int k) {
        Map<Integer, Integer> mp = new HashMap<>();
        int sum = 0;
        mp.put(0, -1);
        for(int i = 0; i < nums.length; i ++) {
            sum = (sum + nums[i]) % k;
            if(mp.containsKey(sum)) {
                if(i - mp.get(sum) > 1) {
                    return true;
                }
            } else {
                mp.put(sum, i);
            }
        }
        return false;
    }
}
```

