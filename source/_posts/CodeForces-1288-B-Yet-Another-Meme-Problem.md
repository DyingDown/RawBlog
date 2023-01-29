---
title: CodeForces-1288 B Yet Another Meme Problem
date: 2020-01-15 08:41:45
tags: [Math, CodeForces]
categories: ACM
main: Math
postImage: https://s1.ax1x.com/2020/04/26/Jcuh0f.png
description: So the value of b should only be 9,99,999...(each digit is consists of 9)
---

<center style="line-height:20px">
        <font size="5">
            <a target="_blank" rel="noopener" href="https://codeforces.com/contest/1288/problem/B" one-link-mark="yes">B. Yet Another Meme Problem</a><br>
        </font>
        <font size="2">
            time limit per test: 1 second <br>
            memory limit per test: 256 megabytes<br>
            input: standard input<br>
            output:standard output<br>
        </font>
    </center>

Try guessing the statement from this picture http://tiny.cc/ogyoiz.

You are given two integers AA and BB, calculate the number of pairs $(a,b)$such that $1≤a≤A, 1≤b≤B$, and the equation $a⋅b+a+b=conc(a,b)$ is true; $conc(a,b)$ is the concatenation of $a$ and $b$ (for example, $conc(12,23)=1223$, $conc(100,11)=10011$). **$a$ and $b$ should not contain leading zeroes**.

### Input

The first line contains $t (1≤t≤100)$ — the number of test cases.

Each test case contains two integers $A$ and $B (1≤A,B≤109)$.

Output

Print one integer — the number of pairs $(a,b)$ such that $1≤a≤A, 1≤b≤B$, and the equation $a⋅b+a+b=conc(a,b)$ is true.

### Example

#### input

```
3
1 11
4 2
191 31415926
```

#### output

```
1
0
1337
```

#### Note

There is only one suitable pair in the first test case: $a=1, b=9 (1+9+1⋅9=19)$.

# Analysis

$$
a+b+a\times b=conc(a,b) \\
conc(a,b)=a\times 10^x+b \\
\Rightarrow a+b+a\times b=a\times10^x+b \\
\Rightarrow a+a\times b=a\times 10^x \\
\Rightarrow a\times (b+1)=a\times 10^x \\
\Rightarrow b+1=10^x
$$

So the value of b should only be $9,99,999\cdots$(each digit is consists of 9)

# Code

```c++
#include<bits/stdc++.h>
 
using namespace std;
 
int fun(long long b, string bs) {
	string a = to_string(b + 1);
	if(bs.length() < a.length()){
		return bs.length();
	} else {
		return bs.length() - 1;
	}
}
int main() {
	long long t;
	cin >> t;
	while(t --) {
		long long a;
		string b;
		cin >> a >> b;
		long long ib = stoi(b);
		cout << a * fun(ib, b) << endl;
	}
	return 0;
}
```