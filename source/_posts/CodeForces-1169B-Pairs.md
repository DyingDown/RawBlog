---
title: CodeForces-1169B Pairs
date: 2019-11-24 10:01:32
tags: [Brute Force, CodeForces]
categories: ACM
postImage: https://s1.ax1x.com/2020/04/26/Jc1Yss.jpg
description: First, you get the fist pair of numbers. And then find a pair of numbers that is totally different with the first pair.
---

<center style="line-height:20px;">
        <font size="5">
            <a target="_blank" rel="noopener" href="https://codeforces.com/contest/1169/problem/B" one-link-mark="yes">B. Pairs</a><br>
        </font>
        <font size="2">
            time limit per test: 2 seconds <br>
            memory limit per test: 256 megabytes<br>
            input: standard input<br>
            output:standard output<br>
        </font>
    </center>

#### Problem

Toad Ivan has mm pairs of integers, each integer is between 11 and n, inclusive. The pairs are $(a_1,b_1),(a_2,b_2),…,(a_m,b_m)$.

He asks you to check if there exist two integers xx and $y (1≤x<y≤n)$ such that in each given pair at least one integer is equal to x or y.

### Input

The first line contains two space-separated integers nn and $m (2≤n≤300000, 1≤m≤300000)$ — the upper bound on the values of integers in the pairs, and the number of given pairs.

The next mm lines contain two integers each, the ii-th of them contains two space-separated integers $a_i$ and $b_i$ $(1≤ai,bi≤n,ai≠bi)$ — the integers in the$ i-th$ pair.

### Output

Output "YES" if there exist two integers x and y ($1≤x<y≤n$) such that in each given pair at least one integer is equal to x or y. Otherwise, print "NO". You can print each letter in any case (upper or lower).

### Examples

#### Input

```
4 6
1 2
1 3
1 4
2 3
2 4
3 4
```

#### Output

```
NO
```

#### Input

```
5 4
1 2
2 3
3 4
4 5
```

#### Output

```
YES
```

#### Input

```
300000 5
1 2
1 2
1 2
1 2
1 2
```

Output

```
YES
```

### Note

In the first example, you can't choose any x, y because for each such pair you can find a given pair where both numbers are different from chosen integers.

In the second example, you can choose x=2 and y=4.

In the third example, you can choose x=1 and y=2.

# Analysis

First, you get the fist pair of numbers. And then find a pair of numbers that is totally different with the first pair. With these four numbers, you can make four pairs. For each new pair, try to find if the new pair can cover all the rest pairs. If one of the new pair can, then answer is YES. And if no pair can cover the rest pairs, then the answer is NO.

# Code

```c++
#include<bits/stdc++.h>

using namespace std;
typedef pair<int,int> P ;

P pairs[1000000];
int main() {
	int n, m, a, b;
	scanf("%d %d", &n, &m);
	int x, y;
	scanf("%d %d", &x, &y);
	pairs[0] = P(x, y);
	int flag = 0, flagx = 0, flagy = 0;
	for(int i = 1; i < m; i ++) {
		scanf("%d %d", &a, &b);
		pairs[i] = P(a, b);
		if(a != x and a != y and b != x and b != y and flag == 0) {
			flag = i;
			flagx = a; flagy = b;
		}
	}
	int t[4][2] = {x, flagx, x, flagy, y, flagx, y, flagy};
	if(flag == 0) {
		printf("YES\n");
	} else {
		int fflag = 0;
		for(int s = 0; s < 4; s ++) {
                    fflag = 0;
			for(int i = 1; i < m; i ++) {
				if(i == flag) continue;
				else {
					if(pairs[i].first != t[s][0] and pairs[i].first != t[s][1]
						and pairs[i].second != t[s][0] and pairs[i].second != t[s][1]) {
						fflag = 1;
						break;
					} 
				}
			}
			if(!fflag) break;
		}	
		if(fflag == 0) printf("YES\n");
		else printf("NO\n");
	}
	return 0;
}
```