---
title: HDU-1562 Guess the number
date: 2019-12-18 10:19:30
tags: [Force, HDU]
categories: ACM
main: Force
postImage: https://s1.ax1x.com/2020/04/26/JgAN7Q.jpg
description: Just loop and calculate violently.
---

# [Guess the number](http://acm.hdu.edu.cn/showproblem.php?pid=1562)

Happy new year to everybody!
Now, I want you to guess a minimum number x betwwn 1000 and 9999 to let
(1) x % a = 0;
(2) (x+1) % b = 0;
(3) (x+2) % c = 0;
and a, b, c are integers between 1 and 100.
Given a,b,c, tell me what is the number of x ?

### Input

The number of test cases c is in the first line of input, then c test cases followed.every test contains three integers a, b, c.

### Output

For each test case your program should output one line with the minimal number x, you should remember that x is between 1000 and 9999. If there is no answer for x, output "Impossible".

### Sample Input

```
2
44 38 49
25 56 3
```

### Sample Output

```
Impossible
2575
```

# Analysis

Just loop and calculate violently.

# Code

```c++
#include<bits/stdc++.h>

using namespace std;

int main() {
	int t, a, b, c, i;
	cin >> t;
	while(t --) {
		cin >> a >> b >> c;
		i = 1000;
		while(i < 10000) {
			if(i % a == 0 and (i + 1) % b == 0 and (i + 2) % c == 0) {
				cout << i << endl; 
				break;
			}
			i ++;
		}
		if(i > 9999) cout << "Impossible" << endl;
	}
	return 0;
}
```