---
title: LeetCode 506. Relative Ranks
date: 2023-02-04 15:33:31
tags: [Sort, Map]
categories: ACM
main: Sort
postImage: https://cdn.jsdelivr.net/gh/DyingDown/img-host-repo/202302041603416.jpg
description: First we need to sort the scores from biggest to smallest.
---

## Problem Description

[506. Relative Ranks](https://leetcode.com/problems/relative-ranks/)

## Analysis

First we need to sort the scores from biggest to smallest.

And store the score corresponding to the index, soo that given a score we can know the score is at which rank.

Then loop the original scores , for each score we find its corresponding index and change the index into medal name or rank.

## Code

```c++
class Solution {
public:
    vector<string> findRelativeRanks(vector<int>& score) {
        unordered_map<int,int> mp;
        vector<int> sorted = score;
        vector<string> ans;
        sort(sorted.begin(), sorted.end(),greater<int>());
        for(int i = 0; i < score.size(); i ++) {
            mp[sorted[i]] = i;
        }
        for(int i = 0; i < score.size(); i ++){
            ans.push_back(getRank(mp[score[i]]));
        }
        return ans;
    }
    string getRank(int rank) {
        switch(rank) {
            case 0: 
                return "Gold Medal";
            case 1:
                return "Silver Medal";
            case 2:
                return "Bronze Medal";
            default:
                return to_string(rank+1);
        }
        return "";
    }
};
```

