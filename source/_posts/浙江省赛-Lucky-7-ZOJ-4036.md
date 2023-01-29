---
title: 浙江省赛 Lucky 7 ZOJ 4036
date: 2020-10-03 16:19:59
tags: [Force, Other, ZOJ]
categories: ACM
main: Force
description: Check one by one.
---

## Problem Description

BaoBao has just found a positive integer sequence $a1,a2,…,an$ of length $n$ from his left pocket and another positive integer $b$ from his right pocket. As number 7 is BaoBao’s favorite number, he considers a positive integer $x$ lucky if $x$ is divisible by 7. He now wants to select an integer $a_k$ from the sequence such that $(a_k+b)$ is lucky. Please tell him if it is possible.

### Input

There are multiple test cases. The first line of the input is an integer $T$ (about 100), indicating the number of test cases. For each test case:

The first line contains two integers $n$ and $b$ ($1≤n,b≤100$), indicating the length of the sequence and the positive integer in BaoBao’s right pocket.

The second line contains $n$ positive integers $a1,a2,…,an$ ($1≤ai≤100$), indicating the sequence.

### Output

For each test case output one line. If there exists an integer $a_k$ such that $a_k∈a1,a2,…,an$ and $(a_k+b)$ is lucky, output “Yes” (without quotes), otherwise output “No” (without quotes).

### Sample Input

```
4
3 7
4 5 6
3 7
4 7 6
5 2
2 5 2 5 2
4 26
100 1 2 4
```

### Sample Output

```
No
Yes
Yes
Yes
```

### Hint

For the first sample test case, as 4 + 7 = 11, 5 + 7 = 12 and 6 + 7 = 13 are all not divisible by 7, the answer is “No”.

For the second sample test case, BaoBao can select a 7 from the sequence to get 7 + 7 = 14. As 14 is divisible by 7, the answer is “Yes”.

For the third sample test case, BaoBao can select a 5 from the sequence to get 5 + 2 = 7. As 7 is divisible by 7, the answer is “Yes”.

For the fourth sample test case, BaoBao can select a 100 from the sequence to get 100 + 26 = 126. As 126 is divisible by 7, the answer is “Yes”.

## Analysis

Start from the first number to check one by one.

## Code

```c++
#include<bits/stdc++.h>

using namespace std;

int main() {
    int t;
    cin >> t;
    while(t --) {
        int n, b, temp, flag = 0;
        cin >> n >> b;
        for(int i = 0; i < n; i ++) {
            cin >> temp;
            if((temp + b) % 7 == 0) {
                flag = 1;
            }
        }
        if(flag) cout << "Yes" << endl;
        else cout << "No" << endl;
    }
    return 0;
}
```