---
title: 浙江省赛 King of Karaoke ZOJ 4025
date: 2020-10-03 16:25:51
tags: [Logic, ZOJ]
categories: ACM
main: Logic
description: The point of this problem is to find the most appearance of s[i] - d[i].
---

## Problem Description

It’s Karaoke time! DreamGrid is performing the song *Powder Snow* in the game *King of Karaoke*. The song performed by DreamGrid can be considered as an integer sequence $D_1,D_2,…,D_n$, and the standard version of the song can be considered as another integer sequence $S_1,S_2,…,S_n$. The score is the number of integers $i$ satisfying $1≤i≤n$ and $S_i=D_i$.

As a good tuner, DreamGrid can choose an integer $K$ (can be positive, 0, or negative) as his tune and add $K$ to **every** element in $D$. Can you help him maximize his score by choosing a proper tune?

### Input

There are multiple test cases. The first line of the input contains an integer $T$ (about 100), indicating the number of test cases. For each test case:

The first line contains one integer $n$ ($1≤n≤10^5$), indicating the length of the sequences $D$ and $S$.

The second line contains $n$ integers $D_1,D_2,…,D_n$ ($−10^5≤D_i≤10^5$), indicating the song performed by DreamGrid.

The third line contains $n$ integers $S_1,S_2,…,S_n$ ($−10^5≤S_i≤10^5$), indicating the standard version of the song.

It’s guaranteed that at most 5 test cases have $n>100$.

### Output

For each test case output one line containing one integer, indicating the maximum possible score.

### Sample Input

```
2
4
1 2 3 4
2 3 4 6
5
-5 -4 -3 -2 -1
5 4 3 2 1
```

### Sample Output

```
3
1
```

### Hint

For the first sample test case, DreamGrid can choose $K=1$ and changes $D$ to 2,3,4,52,3,4,5.

For the second sample test case, no matter which $K$ DreamGrid chooses, he can only get at most 1 match.

## Analysis

The point of this problem is to find the most appearance of$ s[i]−d[i]$. Because if $s[i]−d[i]$ is 1 1 2 3 4, there are two numbers are the same. After adding K(if k = 1), the array is 2 2 3 4 5, also two numbers are the same.

So k is equal to $s[i]−d[i]$, where $s[i]−d[i]$ appears most.

I use map to store the occurrences of each difference. <difference, occurrence> Then using iterator to find the biggest occurrences.

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