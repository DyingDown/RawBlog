---
title: HDU-1465 Not Easy Series One
date: 2019-12-16 09:43:54
tags: [Force, HDU]
categories: ACM
main: Force
postImage: https://s1.ax1x.com/2020/04/26/JgAGX8.jpg
description: Note that the answer can be very huge, so you need to use long long.
---

# [Not Easy Series One](http://acm.hdu.edu.cn/showproblem.php?pid=1465)

People often lament that it is really not easy to do one thing well. Indeed, failure is much easier than success!

<!--more-->

It is not easy to do “one thing” well. If you want to succeed forever and never fail, it is even more difficult, just like spending money is always easier than earning money.
That being said, I still want to tell everyone that it is not easy to fail to a certain extent. For example, when I was in high school, there was a magical girl. When I took the English test, I even made all 40 single choice questions wrong! Everyone has studied probability theory, and you should know the probability of this situation, so I think this is a magical thing so far. If we apply a classic comment, we can sum it up like this: It is not difficult for one person to make a wrong multiple choice question. The hard part is to make all the wrong, one wrong.

Unfortunately, this small-probability event happens again, and it's all around us:
The thing is this-HDU has a male classmate with a net name of 8006, and has made countless netizens. Recently, the classmate has played romance and wrote a letter to each of the n netizens. This is nothing. He even put all the letters in the wrong envelope! Attention, everything is wrong!

Now the question is: Please help the poor 8006 students calculate how many possible mistakes there are?

### Input

The input data contains multiple test instances, each test instance occupies a line, each line contains a positive integer n (1 <n <= 20), n represents the number of netizens of 8006.

### Output

For each line of input, please output the number of possible error modes, and the output of each instance occupies one line.

### Sample Input

```
2
3
```

### Sample Output

```
1
2
```

# Analysis

There is a recursive formula about this problem:
$$
f(n) = (n- 1) \times (f(n - 1) + f(n - 2))
$$
So how do we get this formula?

Assume that we have n people, the total situations of giving the wrong letters to the wrong person is $f(n)$. 

First, we put the first element to position k, there will be $n-1$ ways.

 And then for the $k-th$ element, there are two situations. 

 	1. Put the $k-th$ element to the first place. So there will be $n-2$ people rest who receives the wrong letter, which is $f(n-2)$ wrong ways.
 	2. Put the $k-th$ element into the any position except for the first position. Then there will be the rest $n-1$ people contribute to the wrong ways. 

Since there are previously $n-1$ ways of choosing the element, so we need to times $n-1$.

Note that the answer can be very huge, so you need to use long long.

# Code

```c++
#include<bits/stdc++.h>

using namespace std;

int main() {
	long long n, a[21];
	a[0] = 0;
	a[1] = 1;
	for(int i = 2; i < 21; i ++) {
		a[i] = i * (a[i - 1] + a[i - 2]);
	}
	while(cin >> n) cout << a[n - 1] << endl;
	return 0;
}
```