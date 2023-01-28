---
title: AtCoder-4297 Monsters Battle Royale
date: 2019-11-17 09:27:54
tags: [Math, AtCoder, GCD]
categories: ACM
description: Seeing the operation, we can easily think of Euclidean algorithm which is the way to calculate GCD.
---

# [Monsters Battle Royale](https://abc118.contest.atcoder.jp/tasks/abc118_c?lang=en) 

### Problem Statement

There are *N* monsters, numbered 1,2,…,*N*.

Initially, the health of Monster $i$ is $A_i$.

Below, a monster with at least 1 health is called alive.

Until there is only one alive monster, the following is repeated:

- A random alive monster attacks another random alive monster.
- As a result, the health of the monster attacked is reduced by the amount equal to the current health of the monster attacking.

Find the minimum possible final health of the last monster alive.

### Constraints

- All values in input are integers.
- 2≤*N*≤105
- 1≤$A_i$≤109

### Input

Input is given from Standard Input in the following format:

```
N
A1 A2 … AN
```

### Output

Print the minimum possible final health of the last monster alive.

### Sample Input 1

```
4
2 10 8 40
```

### Sample Output 1

```
2
```

When only the first monster keeps on attacking, the final health of the last monster will be 2, which is minimum.

### Sample Input 2

```
4
5 13 8 1000000000
```

### Sample Output 2

```
1
```

### Sample Input 3

```
3
1000000000 1000000000 1000000000
```

### Sample Output 3

```
1000000000
```

# Analysis

Assume we have only two numbers $A_1 = 5, A_2 = 8$, we let them attack each other which means we let $A_1-A_2 $ or $A_2-A_1$. First we let $A_2= A_2-A_1=3$, then let $A_1 = A_1-A_2=2$, and then $A_2= A_2-A_1 = 1$. Once the $1$ occurs, we let it to attack other monsters until they all die and the rest is $1$.

Seeing the operation, we can easily think of Euclidean algorithm which is the way to calculate GCD.

So the answer is the GCD of these numbers.

# Code

```c++
#include<bits/stdc++.h>

using namespace std;
int a[110000];
int main() {
	int n;
	cin >> n;
	for(int i = 0;i < n; i ++){
		cin >> a[i];
	}
	int gcd = a[0];
	for(int i = 1;i < n; i++){
		gcd = __gcd(gcd, a[i]);
		if(gcd == 1) break; // once 1 occurs, the answer must be 1
	}
	cout << gcd << endl;
	return 0;
}
```

