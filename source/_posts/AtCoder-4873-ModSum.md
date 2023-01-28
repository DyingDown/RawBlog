---
title: AtCoder-4873 ModSum
date: 2019-11-17 09:04:47
tags: [Math, AtCoder]
categories: ACM
description: The biggest answer is that after the operation the number can remain it self.
---

# [ModSum](https://abc139.contest.atcoder.jp/tasks/abc139_d?lang=en)

### Problem Statement

For an integer *N*, we will choose a permutation $\{P_1,P_2,\cdots,P_N\}$ of $\{1,2,\cdots,N\}$.

Then, for each $i =1,2,\cdots,N$, let $M_i$ be the remainder when $i$ is divided by $P_i$.

Find the maximum possible value of $M_1+M_2+\cdots+M_N$.

<!--more-->

### Constraints

- *N* is an integer satisfying 1≤*N*≤109.

### Input

Input is given from Standard Input in the following format:

```
N
```

### Output

Print the maximum possible value of $M_1+M_2+\cdots+M_{N}$.

### Sample Input 1

```
2
```

### Sample Output 1

```
1
```

When the permutation $\{P_1,P_2\}=\{2,1\}$ is chosen, $M_1+M_2=1+0=1$.

### Sample Input 2

```
13
```

### Sample Output 2

```
78
```

### Sample Input 3

```
1
```

### Sample Output 3

```
0
```

# Analysis

The biggest answer is that after the operation the number can remain it self. To make this satisfy the most, you just need to mode this number by this number plus 1.  $ 1 \space mod \space 2, 2,\space mod \space 3, \cdots, n-1 \space mod \space n$ . So The left number $n$ is mode by $1$ which is always equal to $1$ .

And you can easily find that the answer is 
$$
1+2+3+\cdots+(n-1)+1 \\= \frac{(1+(n-1))*(n-1)}{2} + 1 \\= \frac{n*(n-1)}{2} + 1
$$

# Code

```c++
#include<bits/stdc++.h>

using namespace std;

int main(){
	long long n;
	cin >> n;
	cout << n * (n - 1) / 2 << endl;
	return 0;
}
```