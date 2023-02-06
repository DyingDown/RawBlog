---
title: LeetCode 2335. Minimum Amount of Time to Fill Cups
date: 2023-02-05 15:44:20
tags: [Math, Heap]
categories: ACM
main: Math
postImage: https://cdn.jsdelivr.net/gh/DyingDown/img-host-repo/202302051630330.jpg
description: max(ceil(sum(A) / 2), max(A))
---

## Problem Description

[2335. Minimum Amount of Time to Fill Cups](https://leetcode.com/problems/minimum-amount-of-time-to-fill-cups/)

## Analysis

Denote the column value as `a >= b >= c`

From the above formula, we can get two situations:

1. `a >= b + c`

   In this situation, we can easily get that, first, use $b$ steps, then use $c$, steps,  then use $a - b - c$ steps.

   So the total steps are $a$ steps.

2. `a < b + c`

   define $b := c + x$, $a := b + y = c + x + y$

   So the stones are `[c+x+y, c+x, c]`

   In order to achieve min steps, we should distribute the a properly to b and c.

   1. first, we use **x** steps to remove from the first two stones.

      Now the stones are `[c+y, c, c]`

      since a >= b >= c, so `c+x+y < c+x + c => y < c` 

   2. if `c+y` is even

      define `c+y = 2k` because c+y is even.

      because `y < c`, so `k < c`

      so the stones are `[2k, c, c]`. So the steps are:

      - **k** steps for the first to stone, `[k, c-k, c]`
      - **k** steps for the first and third stone, `[0, c-k, c-k]`
      - **c-k** steps for the last two stones: `[0, 0, 0]`

      So in this case, the total steps are:
      $$
      x + k + k + c - k \\
      = (b - c) + c + k \\
      = b + k 
      = b + \frac{c + y}{2} = b + \frac{c+a-b}{2} \\
      = \frac{a + b + c}{2}
      $$

   3. if `c+y` is even

      define `c+y = 2k + 1, k < c`

      so the stones are `[2k + 1, c, c]` and the steps are:

      - **k** steps for first two: `[k + 1, c - k, c - k]`
      - **k** steps for first and third stone : `[1, c-k, c-k]`
      - **c - k** steps for last two: `[1, 0, 0]`
      - **1** step for first stone

      So the total steps are:
      $$
      x + k + k + c - k + 1 = \frac{a+b+c}{2} + 1 = ceil(\frac{a+b+c}{2})
      $$

## Code

```c++
class Solution {
public:
    int fillCups(vector<int>& amount) {
        int sum = 0;
        int maxN = 0;
        for(int i : amount) {
            sum += i;
            maxN = max(maxN, i);
        }
        return max((sum + 1) / 2, maxN);
    }
};
```

