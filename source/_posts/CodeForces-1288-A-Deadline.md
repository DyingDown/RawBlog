---
title: CodeForces-1288 A Deadline
date: 2020-01-15 06:07:55
tags: [Math, CodeForces]
categories: ACM
main: Math
description: First of all I tried the violent way. Time limit exceeded. So I tried mathematic way.
postImage: https://s1.ax1x.com/2020/04/26/JcuHpj.png
---

<center style="line-height:20px">
        <font size="5">
            <a target="_blank" rel="noopener" href="https://codeforces.com/contest/1288/problem/A" one-link-mark="yes">A. Deadline</a><br>
        </font>
        <font size="2">
            time limit per test: 2 seconds<br>
            memory limit per test: 256 megabytes<br>
            input: standard input<br>
            output:standard output<br>
        </font>
    </center>

<!--more-->

Adilbek was assigned to a special project. For Adilbek it means that he has $n$ days to run a special program and provide its results. But there is a problem: the program needs to run for $d$ days to calculate the results.

Fortunately, Adilbek can optimize the program. If he spends $x$ ($x$ is a non-negative integer) days optimizing the program, he will make the program run in $⌈\frac{d}{x+1}⌉$days ($⌈a⌉$ is the ceiling function: $⌈2.4⌉=3$,$⌈2⌉=2$). The program cannot be run and optimized simultaneously, so the total number of days he will spend is equal to $x+⌈\frac{d}{x+1}⌉$.

Will Adilbek be able to provide the generated results in no more than $n$ days?

### Input

The first line contains a single integer $T$ $(1≤T≤50) $— the number of test cases.

The next $T$ lines contain test cases – one per line. Each line contains two integers $n$ and $d$ $(1≤n≤109, 1≤d≤109)$ — the number of days before the deadline and the number of days the program runs.

### Output

Print $T$ answers — one per test case. For each test case print $YES$ (case insensitive) if Adilbek can fit in $n$ days or $NO$ (case insensitive) otherwise.

### Example

#### input

```
3
1 1
4 5
5 11
```

#### output

```
YES
YES
NO
```

### Note

In the first test case, Adilbek decides not to optimize the program at all, since $d≤n$.

In the second test case, Adilbek can spend 11 day optimizing the program and it will run $⌈\frac{5}{2}⌉=3$ days. In total, he will spend 4 days and will fit in the limit.

In the third test case, it's impossible to fit in the limit. For example, if Adilbek will optimize the program 2 days, it'll still work $⌈\frac{11}{2+1}⌉=4$ days.

### Analysis

First of all I tried the violent way. Time limit exceeded. So I tried mathematic way. 
$$
y=x+\frac{d}{x+1} \\
\Rightarrow y^{'}=1-\frac{d}{(x+1)^2}
$$
When $y^{'}=0$ , y reaches it's extremum. So:
$$
x=\sqrt{d}-1(x>0) \\
y_{max}=2\sqrt{d}-1
$$
y is a integer, so $y=[2\sqrt{d}-1]$

# Code

```c++
#include<bits/stdc++.h>
 
using namespace std;
 
int main(){
	int t;
	cin >> t;
	while(t--) {
		int n, d, flag = 1;
		cin >> n >> d;
		if(2*sqrt(d)-1 <= n) {
			cout << "YES" << endl;
		} else {
			cout << "NO" << endl;
		}
	}
	return 0;
}
```