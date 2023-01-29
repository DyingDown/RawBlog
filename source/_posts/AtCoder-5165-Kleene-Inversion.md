---
title: AtCoder-5165 Kleene Inversion
date: 2019-11-22 12:20:34
tags: ACM
categories: [Math, AtCoder]
main: Math
description: The answer of the problem has a regular pattern. For example, there is a sequence A and for number An in A, the number that is bigger than An has two parts
---

# [Kleene Inversion](https://jsc2019-qual.contest.atcoder.jp/tasks/jsc2019_qual_b?lang=en)

### Problem Statement

We have a sequence of *N* integers $A~=~ A_0,~A_1,~ \cdots,~A_{N−1}$.

Let *B* be a sequence of $K \times N$ integers obtained by concatenating $K$ copies of $A$. For example, if $A ~=~1,~3,~2$ and $K ~=~2, B~=~1,~3,~2,~1,~3,~2$.

Find the inversion number of *B*, modulo $10^9+7$.

Here the inversion number of *B* is defined as the number of ordered pairs of integers $(i,~j)~(0≤i<j≤K \times N−1)$ such that $B_i>B_j$.

<!--more-->

### Constraints

- All values in input are integers.
- 1≤ $N$ ≤2000
- 1≤ $K$ ≤109
- 1≤ $A_i$ ≤2000

### Input

Input is given from Standard Input in the following format:

```
N K
A0 A1 … AN−1
```

### Output

Print the inversion number of *B*, modulo 109+7.

### Sample Input 1

```
2 2
2 1
```

### Sample Output 1

```
3
```

In this case, B=2,1,2,1. We have:

- $B_0>B_1$
- $B_0>B_3$
- $B_2>B_3$

Thus, the inversion number of $B$ is 3.

### Sample Input 2

```
3 5
1 1 1
```

### Sample Output 2

```
0
```

*A* may contain multiple occurrences of the same number.

### Sample Input 3

```
10 998244353
10 9 8 7 5 6 3 4 2 1
```

### Sample Output 3

```
185297239
```

Be sure to print the output modulo $10^9+7$.

# Analysis

The answer of the problem has a regular pattern. 

For example, there is a sequence A and for number $A_n$ in A, the number that is bigger than $A_n$ has two parts: the part before $A_n$ and the part after $A_n$.  We copy A for K times.

Firstly, we deal with the back part. If the first A has B numbers bigger than $A_n$ and after $A_n$, it's the same to the rest K-1 sequences. So for the first $A_n$, it has $B \times K$ pairs. And the second A, it has $B \times (K - 1)$ numbers. $\cdots$. Until the last $A_n$, it has B pairs. So the total answer for the pairs after $A_n$ is $B \times (K + (K - 1) + \cdots + 1) = B \times \frac{K \times (K + 1)}{2}$

Secondly, we deal with the front part. It's the same to the back part. So I'll just give an formula here. The answer for the pairs before $A_n$ is $F \times ((K - 1) + (K - 2) +\dots+1)  = F \times \frac{K \times (K - 1)}{2}$ . F is the number of numbers that bigger than $A_n$ and before $A_n$. 

This is only for one $A_n$. You need to traverse A to find all answers. Add the front part and the back part together and don't forget to modulo $10^9+7$.

# Code

```c++
#include <iostream>

const long long mod = 1e9 + 7;
using namespace std;
long long a[10000];

int main() {
    long long n, k;
    cin >> n >> k;
    for (long long i = 0; i < n; i++) {
        cin >> a[i];
    }
    long long sum = 0;
    for (long long i = 0; i < n; ++i) {
        long long before_i = 0, after_i = 0;
        for (long long j = 0; j < n; ++j) {
            if (i == j) continue;
            else {
                if (a[i] > a[j]) {
                    if (j < i) before_i++;
                    else after_i++;
                }
            }
        }
        sum += (after_i % mod) * (k * (k + 1)  / 2 % mod) % mod;
        sum += (before_i % mod) * (k * (k - 1) / 2 % mod) % mod;
    }
    cout << sum % mod << endl;
    return 0;
}
```