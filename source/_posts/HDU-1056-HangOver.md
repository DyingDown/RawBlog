---
title: HDU-1056 HangOver
date: 2019-12-15 11:51:22
tags: [Simulation, HDU]
categories: ACM
main: Simulation
postImage: https://s1.ax1x.com/2020/04/26/JgAMtA.jpg
description: Since the data is every small, you just need to loop and calculate until you find a answer that is bigger than the given number.
---

# [HangOver](http://acm.hdu.edu.cn/showproblem.php?pid=1056)

How far can you make a stack of cards overhang a table? If you have one card, you can create a maximum overhang of half a card length. (We're assuming that the cards must be perpendicular to the table.) With two cards you can make the top card overhang the bottom one by half a card length, and the bottom one overhang the table by a third of a card length, for a total maximum overhang of 1/2 + 1/3 = 5/6 card lengths. In general you can make n cards overhang by 1/2 + 1/3 + 1/4 + ... + 1/(n + 1) card lengths, where the top card overhangs the second by 1/2, the second overhangs tha third by 1/3, the third overhangs the fourth by 1/4, etc., and the bottom card overhangs the table by 1/(n + 1). This is illustrated in the figure below.

<!--more-->

![img](https://imgconvert.csdnimg.cn/aHR0cHM6Ly92ai56MTgwLmNuL2VlYzMyNWNmODZhMmQ5YmMwNWI4ODA0YTkwNTdlMjhl?x-oss-process=image/format,png)

The input consists of one or more test cases, followed by a line containing the number 0.00 that signals the end of the input. Each test case is a single line containing a positive floating-point number c whose value is at least 0.01 and at most 5.20; c will contain exactly three digits.

For each test case, output the minimum number of cards necessary to achieve an overhang of at least c card lengths. Use the exact output format shown in the examples.

### Input

```
1.00
3.71
0.04
5.19
0.00
```

### Output

```
3 card(s)
61 card(s)
1 card(s)
273 card(s)
```

### Sample Input

```
1.00
3.71
0.04
5.19
0.00
```

### Sample Output

```
3 card(s)
61 card(s)
1 card(s)
273 card(s)
```

# Analysis 

Since the data is every small, you just need to loop and calculate until you find a answer that is bigger than the given number. So the final answer would be the value of the answer that is bigger than the given number minus 1.

# Code

```c++
#include<bits/stdc++.h>

using namespace std;

int main() {
	double a, len;
	while(cin >> a, a) {
		len = 0;
		int i = 0;
		while(len < a) {
			len += 1.0 / (i + 2);
			i ++;
		}
		cout << i << " card(s)" << endl;
	}
	return 0;
} 
```