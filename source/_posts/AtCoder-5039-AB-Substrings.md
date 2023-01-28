---
title: AtCoder-5039 AB Substrings
date: 2019-11-17 11:32:55
tags: ACM
categories: [AtCoder, String]
description: This is to find how many strings that starts with A and ends with B and the number of AB inside the string.
---

# [AB Substring](https://diverta2019.contest.atcoder.jp/tasks/diverta2019_c?lang=en)

### Problem Statement

Snuke has $N$ strings. The $i-th$ string is $s_i$.

Let us concatenate these strings into one string after arranging them in some order. Find the maximum possible number of occurrences of `AB` in the resulting string.

<!--more-->

### Constraints

- 1≤$N$≤104
- 2≤|$s_i$|≤10
- $s_i$ consists of uppercase English letters.

### Input

Input is given from Standard Input in the following format:

```
N
s1
\dots
s_N
```

### Output

Print the answer.

### Sample Input 1

```
3
ABCA
XBAZ
BAD
```

### Sample Output 1

```
2
```

For example, if we concatenate `ABCA`, `BAD` and `XBAZ` in this order, the resulting string `ABCABADXBAZ` has two occurrences of `AB`.

### Sample Input 2

```
9
BEWPVCRWH
ZZNQYIJX
BAVREA
PA
HJMYITEOX
BCJHMRMNK
BP
QVFABZ
PRGKSPUNA
```

### Sample Output 2

```
4
```

### Sample Input 3

```
7
RABYBBE
JOZ
BMHQUVA
BPA
ISU
MCMABAOBHZ
SZMEHMA
```

### Sample Output 3

```
4
```

# Analysis

This is to find how many strings that starts with A and ends with B and the number of AB inside the string. Since strings start with A and end with B has coincidence, so the number of AB that comes from concatenation is min(number of strings start with A, number of string end with B). 

**Note: If all the strings that satisfy the above statement and satisfy both (start with A *and* start with B) , the answer should be -1** because if strings are BA and BA, it can only be concatenated to BABA, which has only one AB.

# Code

```c++
#include<bits/stdc++.h>

using namespace std;

int main(){
	long long n;
	cin >> n;
	long long a = 0, b = 0, all = 0, count = 0;
	string temp;
	while(n --) {
		cin >> temp;
		long long l = temp.length();
		for(long long i = 1; i < l; i ++ ) {
			if(temp[i - 1] == 'A' and temp[i] == 'B') {
				count ++; 
			}
		}
		if(temp[0] == 'B' and temp[l - 1] == 'A') all ++;
		if(temp[l - 1] == 'A') a ++;
		if(temp[0] == 'B') b ++;
	}
	if(b == all and a == all and all != 0) count --;
	cout << min(a, b) + count << endl;
}
```