---
title: 浙江省赛 Doki Doki Literature Club ZOJ 4035
date: 2020-10-03 16:54:38
tags: [Sort, ZOJ, Struct Sort]
categories: ACM
postImage:
description:
warning:
isCarousel:
---

## Problem Description

*Doki Doki Literature Club!* is a visual novel developed by Team Salvato. The protagonist is invited by his childhood friend, Sayori, to join their high school’s literature club. The protagonist then meets the other members of the club: Natsuki, Yuri, and the club president Monika. The protagonist starts to participate in the club’s activities such as writing and sharing poetry, and grows close to the four girls. What a lovely story!

A very important feature of the game is its poetry writing mechanism. The player is given a list of various words to select from that will make up his poem. Each girl in the Literature Club has different word preferences, and will be very happy if the player’s poem is full of her favorite words.

![img](https://vj.z180.cn/9f0525dd1797668757db79ec0402201d?v=1601326167)

*The poem writing mini-game (from wikipedia)*

BaoBao is a big fan of the game and likes Sayori the most, so he decides to write a poem to please Sayori. A poem of m*m* words $s_1,s_2,…,s_m$ is nothing more than a sequence of m*m* strings, and the happiness of Sayori after reading the poem is calculated by the formula $H=\sum_{i=1}^m(m-i+1) \cdot f\left(s_i\right)$ where *H* is the happiness and $f(s_i)$ is Sayori’s preference to the word $s_i$.

Given a list of *n* words and Sayori’s preference to each word, please help BaoBao select *m* words from the list and finish the poem with these m*m* words to maximize the happiness of Sayori.

Please note that each word can be used at most **once**!

### Input

There are multiple test cases. The first line of input contains an integer T*T* (about 100), indicating the number of test cases. For each test case:

The first line contains two integers n* and m*m* (1 \le m \le n \le 1001≤*m*≤*n*≤100), indicating the number of words and the length of the poem.

For the following *n* lines, the *i*-th line contains a string consisting of lowercased English letters $w_i$ ($1≤|w_i|≤15$) and an integer $f(w_i)$($−10^9≤f(w_i)≤10^9$), indicating the *i*-th word and Sayori’s preference to this word. It’s guaranteed that $wi≠wj$ for all $i≠j$.

### Output

For each test case output one line containing an integer *H* and *m* strings $s_1,s_2,…,s_m$ separated by one space, indicating the maximum possible happiness and the corresponding poem. If there are multiple poems which can achieve the maximum happiness, print the lexicographically smallest one.

Please, DO NOT output extra spaces at the end of each line, or your answer may be considered incorrect!

A **sequence** of *m* strings $a_1,a_2,…,a_m$ is lexicographically smaller than another **sequence** of m*m* strings $b_1,b_2,…,b_m$, if there exists a *k* ($1≤k≤m$) such that $a_i=b_i$ for all $1≤i<k$ and $a_k$ is lexicographically smaller than $b_k$.

A **string** $s_1=a_1 a_2…ax$ is lexicographically smaller than another **string** $s_2=b_1 b_2…b_y$, if there exists a k* ($1≤k≤min(x,y$)) such that $a_i=b_i$ for all $1≤i<k$ and $a_k<b_k$, or $a_i=b_i$ for all $1≤i≤min(x,y)$and $x<y$.

### Sample Input

```
4
10 8
hello 0
world 0
behind 0
far 1
be 2
spring 10
can 15
comes 20
winter 25
if 200
5 5
collegiate 0
programming -5
zhejiang 10
provincial 5
contest -45
3 2
bcda 1
bcd 1
bbbbb 1
3 2
a 1
aa 1
aaa 1
```

### Sample Output

```
2018 if winter comes can spring be far behind
15 zhejiang provincial collegiate programming contest
3 bbbbb bcd
3 a aa
```

## Analysis

This is just struct sort. First sort by value, then sort by lexicography.

Then we pick the biggest m words m * the most biggest + (m - 1) * the second biggest … + 1 * m-th biggest.

Print the sum and print the sentence formed by the m words.

## Code

```c++
#include<bits/stdc++.h>

using namespace std;

const long long LENGTH = 1e5 + 20;

struct words {
    long long nums = 0;
    string sentence;

    bool operator<(const words &x) const {
        if (nums == x.nums) {
            return sentence < x.sentence;
        } else
            return nums > x.nums;
    }
};

words arr[LENGTH];

int main() {
    long long t;
    cin >> t;
    while (t--) {
        long long n, m;
        cin >> n >> m;
        for (long long i = 0; i < n; i++) {
            cin >> arr[i].sentence >> arr[i].nums;
        }
        sort(arr, arr + n);
        string ans;
        long long count = 0;
        for (long long i = 0; i < m; i ++) {
            count += arr[i].nums * (m - i);
            ans += " ";
            ans += arr[i].sentence;
        }
        cout << count << ans << endl;
    }
    return 0;
}
```