---
title: Leetcode 713. Subarray Product Less Than K
date: 2025-09-09 15:45:19
tags: [SW, Sliding Window, Prefix, Binary Search]
main: SW
categories: ACM
postImage:
description: We solve the subarray product problem either with a sliding window in O(n), or by transforming products into prefix sums via logarithms and applying binary search in O(n log n).
warning: false
isCarousel: false
---

## Problem Description

[713. Subarray Product Less Than K](https://leetcode.com/problems/subarray-product-less-than-k/)

## Sliding Window

### Analysis

Use a window to keep the maximum length of subarrays where product of the subarray is less than K.

Every time we add a item to the right  of the window, there will be windowLen of new subarrays ending with the last item.

So the number of subarrays will add windowLen ( which is `right - left + 1`) every time we slide right. 

Time complexity: O(n)

### Code

```c++
class Solution {
public:
    int numSubarrayProductLessThanK(vector<int>& nums, int k) {
        if(k == 0) return 0;
        int product = 1;
        int sum = 0;
        int left = 0, right = 0;
        while(right < nums.size()) {
            product *= nums[right];
            while(left <= right && product >= k) {
                product /= nums[left];
                left ++;
            }
            sum += right - left + 1;
            right ++;
        }
        return sum;
        
    }
};
```

## Binary Search

### Analysis

The idea is to store the prefix product of the array, and then for each starting position i, we use binary search to find a end position where the `prefix[right] / prefix[left] < K`

However, this only works because the prefix product of the array is in ascending  order according to the contains `1 <= nums[i] <= 1000`.

But we can also see that is is not possible to calculate the prefix product directly because it will cause overflow. The number might be potentially too large.

That’s where the **Logarithm** comes to use. 
$$
log(a*b) = log(a) + log(b)
$$

$$
if \space a = b, then \space  log(a) = log(b)
$$



So the prefix product can be transform to sum format:
$$
prefix[i] = nums[0] \times nums[1] \times \dots \times nums[i] \\\\
\Rightarrow log(prefix[i]) = log(nums[0] \times nums[1] \times \dots \times nums[i]) \\\\
\Rightarrow log(prefix[i]) = log(nums[0]) + log(nums[1]) + \dots + log(nums[i])
$$
Time complexity: O(n log(n))

### Code

```c++
class Solution {
public:
    int numSubarrayProductLessThanK(vector<int>& nums, int k) {
        int n = nums.size();
        vector<double> logPrefixSum(n + 1, 1);
        int cnt = 0;
        for(int i = 0; i < n; i ++) {
            logPrefixSum[i + 1] = logPrefixSum[i] + log(nums[i]);
        }
        for(int i = 1; i <= n; i ++) {
            int left = i, right = n + 1;
            while(left < right) {
                int mid = (left + right) / 2;
                if(logPrefixSum[mid] - logPrefixSum[i - 1] >= log(k) - 1e-9) { //allow a small tolerance (1e-9) for floating-point precision errors
                    right = mid;
                } else {
                    left = mid + 1;
                }
            }
            cnt += (left - i);
        }
        return cnt;
    }
};
```

