---
title: AtCoder-5633 Counting of Trees
date: 2019-11-21 14:02:57
tags: [Math, AtCoder, Quick pow, Permuation]
categories: ACM
main: Math
description: At first I didn't understand the meaning of the problem. It means 1 is the root and the distance between the points on the first layer with the root is 1.
---

# [Counting of Trees](https://nikkei2019-2-qual.contest.atcoder.jp/tasks/nikkei2019_2_qual_b?lang=en)

### Problem Statement

Given is an integer sequence $D_1, D_2, \cdots, D_N$ of *N* elements. Find the number, modulo 998244353, of trees with  $N$ vertices numbered 1 to *N* that satisfy the following condition:

- For every integer $i$ from 1 to $N$, the distance between Vertex 1 and Vertex  $i$ is .$D_i$

###### Notes

- A tree of *N* vertices is a connected undirected graph with *N* vertices and *N*−1 edges, and the distance between two vertices are the number of edges in the shortest path between them.
- Two trees are considered different if and only if there are two vertices *x* and *y* such that there is an edge between *x* and *y* in one of those trees and not in the other.

### Constraints

- 1 ≤ $N$ ≤ 105
- 0 ≤ $D_i$ ≤ $N-1$

### Input

Input is given from Standard Input in the following format:

```
N
D1 D2 … DN
```

### Output

Print the answer.

### Sample Input 1

```
4
0 1 1 2
```

### Sample Output 1

```
2
```

For example, a tree with edges (1,2), (1,3), and (2,4) satisfies the condition.

### Sample Input 2

```
4
1 1 1 1
```

### Sample Output 2

```
0
```

### Sample Input 3

```
7
0 3 2 1 2 2 1
```

### Sample Output 3

```
24
```

# Analysis

At first I didn't understand the meaning of the problem. It means 1 is the root and the distance between the points on the first layer with the root is 1. The distance with the points on the first layer and the points on the second layer is 1. .... and so on.

So the you just need to calculate the number of points on each layer.  And for example, the second layer has n points and the third layer has m points, the answer is $m^n$. The rule fits from the first layer(not the root) to the last layer. 

**Note: There must exists a root and only one root.**  So the first number must be 0 and there shouldn't have 0 after the first point. Otherwise, the number of trees are 0. Also, the numbers after removing duplicated numbers should be consecutive, because only the last layer can be empty and each layer which is not the last layer can't be empty. However, this situation doesn't need special judge because $m^0$ or $0^m$ is 0. After many times of multiplication, the answer is still 0.

# Code

```c++
#include <iostream>
#include <map>
#include <cmath>

using namespace std;

#define mod 998244353
map<long long, long long> a;

long long quickpow(long long a, long long b){
    long long ans = 1;
    a = a % mod;
    while(b){
        if(b % 2) ans = (ans * a) % mod;
        a = (a * a) % mod;
        b >>= 1;
    }
    return ans;
}

int main() {
    long long n, t, flag = 1, maxn = 0;
    long long ans = 1;
    cin >> n;
    for (long long i = 0; i < n; i++) {
        cin >> t;
        a[t]++;
        maxn = max(maxn, t);
        if((i == 0 and t != 0) or (i != 0 and t == 0)) flag = 0;
    }
    if (flag) {
        for (long long i = 1; i <= maxn; i++) {
            ans = (ans % mod * quickpow(a[i - 1], a[i]) % mod) % mod;
        }
        cout << ans % mod << endl;
    } else cout << 0 << endl;
    return 0;
}
```


