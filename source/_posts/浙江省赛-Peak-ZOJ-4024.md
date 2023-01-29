---
title: 浙江省赛 Peak ZOJ 4024
date: 2020-10-03 10:44:22
tags: [Force, ZOJ]
categories: ACM
main: Force
description: The most important is to consider all the situations that doesn't make a peak.
---

## Problem Description

A sequence of *n* integers $a1,a2,…,an$ is called a peak, if and only if there exists exactly one integer *k* such that $1<k<n$, and $ai<ai+1$ for all $1≤i<k$, and $ai−1>ai$ for all $k<i≤n$.

Given an integer sequence, please tell us if it’s a peak or not.

### Input

There are multiple test cases. The first line of the input contains an integer T, indicating the number of test cases. For each test case:

The first line contains an integer $n (3≤n≤10^5)$, indicating the length of the sequence.

The second line contains n integers $a1,a2,…,an$ $(1≤ai≤2×10^9)$, indicating the integer sequence.

It’s guaranteed that the sum of n in all test cases won’t exceed 106106.

### Output

For each test case output one line. If the given integer sequence is a peak, output “Yes” (without quotes), otherwise output “No” (without quotes).

### Sample Input

```
7
5
1 5 7 3 2
5
1 2 1 2 1
4
1 2 3 4
4
4 3 2 1
3
1 2 1
3
2 1 2
5
1 2 3 1 2
```

### Sample Output

```
Yes
No
No
No
Yes
No
No
```

## Analysis

Start from the second number, if the second number is bigger than the first number, then check the third number, until the number is smaller than the previous one number.

If the second number is smaller than the first number, than the sequence must have no peak.

For example: 4 3 2 1. There is no uphill but only downhill. So output “No”.

And if all the numbers satisfy uphill condition, like 1 2 3 4, there is also no peak.

Then from the last number, we start to check if its previous number is bigger than the current number. Check until the rules are not satisfied.

If we the start number of downhill is not the end number of uphill, also there is no peak like 1 2 3 4 4 3 2 1.

After the check is done, all numbers must be checked because 1 2 3 2 1 5 5 5 has a peak but not all numbers are used to form the hill. output “No”.

## Code

```c++
#include<bits/stdc++.h>

using namespace std;

const int LENGTH = 1e5 + 20;
int arr[LENGTH];
int main() {
    int t;
    cin >> t;
    while(t --) {
        int n;
        cin >> n;
        for(int i = 1; i <= n;i ++) {
            cin >> arr[i];
        }
        int preFlag = 0, backFlag = 0, peak = 0, i = 1;
        while(arr[i] > arr[i - 1] and i <= n) {
            i ++;
        }
        peak = i - 1;
        while(arr[i] < arr[i - 1] and i <= n) {
            i ++;
        }
        if(peak > 1 and peak < n and i == n + 1) cout << "Yes" << endl;
        else cout << "No" << endl;
    }
    return 0;
}
```