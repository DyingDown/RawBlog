---
title: LeetCode 621. Task Scheduler
date: 2023-02-22 22:07:27
tags: [Greedy]
categories: ACM
main: Greedy
postImage: https://cdn.jsdelivr.net/gh/DyingDown/img-host-repo/202302222253620.gif
description: Because the tasks have cooldown period, so we want the task with maximum occurrences do first.
---

## Problem Description

[621. Task Scheduler](https://leetcode.com/problems/task-scheduler/description/)

## Analysis

Because the tasks have cooldown period, so we want the task with maximum occurrences do first.

The other task can just fill the gap between the max occurrence task.

Like task A appears most, the task order should be look like this:

A _ _ _ _ A _ _ _ _ A _ _ _ _ A ...

Or A and B both have the most occurrences, task order look like this:

A B _ _ _ A B _ _ _  A B _ _ _ A B ...

So the rest just fill the gap between the maxs.  The **minimum period between the As or ABs(gapPeriod)** is the **cooldown period(n) - the number of tasks that appears most(maxCount)**. 

If the rest tasks are smaller than the **total gapPeriod**,  which is the number of gap times the **gapPeriod \* max occurrence**

 Then we check if there is idle period, if the **idle period =  total gap period - number of rest tasks** 

if the idle period is negative, which means there is no idle period and we should put more tasks between As or ABs and set idle period to zero.

Finally, the number of period is the **number of total task + number of idle period**.

## Code

```c++
class Solution {
public:
    int leastInterval(vector<char>& tasks, int n) {
        int chars[26];
        memset(chars, 0, sizeof(chars));
        int maxCnt = 0; // how many task name has most occurrence
        int maxn = 0; // the max occurrence
        for(auto i : tasks) {
            int n = i - 'A';
            chars[n] ++;
            if(chars[n] > maxn) {
                maxn = chars[n];
                maxCnt = 1;
            } else if(chars[n] == maxn) {
                maxCnt ++;
            }
        }
        int leftPeriod = (n - maxCnt + 1) * (maxn - 1); // total gapPeriod
        int leftTasks = tasks.size() - maxCnt * maxn; // rest of the tasks
        int idles =  max(0, leftPeriod - leftTasks);
        return idles + tasks.size();
    }
};
```





