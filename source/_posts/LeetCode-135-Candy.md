---
title: LeetCode 135. Candy
date: 2023-06-20 21:13:06
tags: [Array, Greedy]
categories: ACM
description: This problem can be see as finding peak and valley. And we need to start checking the peak in order to remove the redundant count.
main: Greedy
postImage: https://cdn.jsdelivr.net/gh/DyingDown/img-host-repo/202306212039909.gif
---

## Problem Description

[135. Candy](https://leetcode.com/problems/candy/description/?envType=study-plan-v2&envId=top-interview-150)

## Analysis

This problem can be see as finding peak and valley.

From the requirements, we can see that,

- each child have one candy at least
- if this child has higher rating than his neighbor, in order to make the minimum candy, we need to only gave this child one candy more than his neighbor.
- If the child has same rating as his neighbor, he doesn't need to have the same candy as his neighbor, so he only has one candy in order to make the minimum candy.

If the rating is in ascending order, then the candy number should be 1, 2, ..., n, the total candy is 1 + 2 + ... + n; 

If rating is in descending order, then the candy number should be n, n-1, ... 1, the total candy is n + (n-1) + ... + 1; So in the descending case, it is just the reverse of the ascending case.

### Code steps

Let's taking the [4, 5, 6, 7, 4, 2] as an example;

the ascending length is 4 and the descending length is 3;

So for each part, if we count the peak 7 twice, then the total candy should be 6 + (1 + 2 + 3) + (1 + 2);

We can see from that the peak 7 have 4 candy and also three candy. In order to make both part valid, we need to remove the smaller one(3). So the total candy should be 6 + (1 + 2 + 3) + (1 + 2) - min(peak, valley);

For the valley case, [6, 4, 3, 5, 7, 8, 9], when we count to the bottom of the valley 3, we didn't add candy to total, so there is no double count for the case.

So we need to start checking the peak in order to remove the redundant count.

1. according to first requirements, we first gave each child 1 candy. So we set the `totalCandy = nums.size()`
2. Then we loop each child, starting from the second child.
   1. If the child rating is same as the previous child, then this child will have only 1 candy. Since we already gave the base candy to each child, then we can just continue in this case;
   2. loop to find the length of the ascending subarray.  add the length to the total.
   3. loop to find the length of the descending subarray, add the length to the total.
   4. minus the redundant count.

### Code

```c++
class Solution {
public:
    int candy(vector<int>& ratings) {
        int totalCandies = ratings.size();
        for(int i = 1; i < ratings.size(); ) {
            if(ratings[i] == ratings[i - 1]) {
                i ++;
                continue;
            }

            int peak = 0;
            while(i < ratings.size() && ratings[i] > ratings[i - 1]) {
                peak ++;
                totalCandies += peak;
                i ++;
            }
            
            int valley = 0;
            while(i < ratings.size() && ratings[i] < ratings[i - 1]) {
                valley ++;
                totalCandies += valley;
                i ++;
            }
            totalCandies -= min(peak, valley);
        }
        return totalCandies;
    }
};
```



