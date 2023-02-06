---
title: AtCoder-5037 Consecutive Integers
date: 2019-11-17 08:48:42
tags: [Math, AtCoder]
categories: ACM
main: Math
description: If you have three numbers 1, 2, 3 and want the length of the consecutive subsequence be two, the answer is 3-2+1, because you can choose 1, 2 or 1, 3.
postImage: https://cdn.jsdelivr.net/gh/DyingDown/img-host-repo/202302051742523.jpg
---

# [Consecutive Integers](https://diverta2019.contest.atcoder.jp/tasks/diverta2019_a?lang=en)

### Problem Statement

Snuke has *N* integers: $1,2,\cdots N $. He will choose *K* of them and give those to Takahashi.

How many ways are there to choose *K* consecutive integers?

### Constraints

- All values in input are integers.
- 1≤*K*≤*N*≤50

### Input

Input is given from Standard Input in the following format:

```
N K
```

### Output

Print the answer.

### Sample Input 1

```
3 2
```

### Sample Output 1

```
2
```

There are two ways to choose two consecutive integers: (1,2) and (2,3).

### Sample Input 2

```
13 3
```

### Sample Output 2

```
11
```

# Analysis

This is an very easy problem. If you have three numbers $1, 2, 3$and want the length of the consecutive subsequence be two, the answer is $3-2 +1$, because you can choose $1, 2$ or $1, 3$.

# Code

```c++
#include<bits/stdc++.h>

using namespace std;

int main(){
	int n, k;
	cin >> n >> k;
	cout << n - k + 1 << endl;
	return 0;
}
```