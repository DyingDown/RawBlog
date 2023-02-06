---
title: AtCoder-4871 Lower
date: 2019-11-17 11:16:44
tags: [AtCoder, Force]
categories: ACM
main: Force
description: The max number = max(max number, answer).
postImage: https://cdn.jsdelivr.net/gh/DyingDown/img-host-repo/202302051745002.jpg
---

See the original article [https://dyingdown.github.io/2019/11/17/AtCoder-4871-Lower/](https://dyingdown.github.io/2019/11/17/AtCoder-4871-Lower/)
# [Lower](https://abc139.contest.atcoder.jp/tasks/abc139_c?lang=en)

### Problem Statement				

There are $N$ squares arranged in a row from left to right.

The height of the $i-th$ square from the left is $H_i$.

You will land on a square of your choice, then repeat moving to the adjacent square **on the right** as long as the height of the next square is not greater than that of the current square.

Find the maximum number of times you can move.

<!--more-->

- All values in input are integers.
- 1≤$N$≤105
- 1≤$H_i$≤109

### Input

Input is given from Standard Input in the following format:

```
N
H1 H2 … HN
```

### Output

Print the maximum number of times you can move.

### Sample Input 1

```
5
10 4 8 7 3
```

### Sample Output 1

```
2
```

By landing on the third square from the left, you can move to the right twice.

### Sample Input 2

```
7
4 4 5 6 6 5 5
```

### Sample Output 2

```
3
```

By landing on the fourth square from the left, you can move to the right three times.

### Sample Input 3

```
4
1 2 3 4
```

### Sample Output 3

```
0
```

# Analysis

Since the data is small and the time is long, you can  use violent methods. 

If the this number is no smaller than the previous number, answer = answer + 1;

Else answer = 0

The max number = max(max number, answer).

# Code

```c++
#include<bits/stdc++.h>

using namespace std;

int main(){
	int n;
	cin >> n;
	int pre = 0, now = 0, count = 0, maxn = 0;
	cin >> pre;
	for(int i = 1; i < n; i ++) {
		cin >> now;
		if(now <= pre) {
			count ++;
		} else {
			maxn = max(maxn, count);
			count = 0;
		}
		pre = now;
	}
	maxn = max(maxn, count);
	cout << maxn << endl;
}
```