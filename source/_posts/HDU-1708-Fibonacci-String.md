---
title: HDU-1708 Fibonacci String
date: 2019-12-20 02:17:22
tags: [Math, String, HDU, Fibonacci]
categories: ACM
main: Math
postImage: https://s1.ax1x.com/2020/04/26/JgAakj.jpg
description: This problem has a regular pattern. Let me show you.
---

# [Fibonacci String](http://acm.hdu.edu.cn/showproblem.php?pid=1708)

After little Jim learned Fibonacci Number in the class , he was very interest in it.
Now he is thinking about a new thing -- Fibonacci String .

He defines : str[n] = str[n-1] + str[n-2] ( n > 1 )

He is so crazying that if someone gives him two strings str[0] and str[1], he will calculate the str[2],str[3],str[4] , str[5]....

<!--more-->

For example :
If str[0] = "ab"; str[1] = "bc";
he will get the result , str[2]="abbc", str[3]="bcabbc" , str[4]="abbcbcabbc" …………;

As the string is too long ,Jim can't write down all the strings in paper. So he just want to know how many times each letter appears in Kth Fibonacci String . Can you help him ?

### Input

The first line contains a integer N which indicates the number of test cases.
Then N cases follow.
In each case,there are two strings str[0], str[1] and a integer K (0 <= K < 50) which are separated by a blank.
The string in the input will only contains less than 30 low-case letters.

### Output

For each case,you should count how many times each letter appears in the Kth Fibonacci String and print out them in the format "X:N".
If you still have some questions, look the sample output carefully.
Please output a blank line after each test case.

To make the problem easier, you can assume the result will in the range of int.

### Sample Input

```
1
ab bc 3
```

### Sample Output

```
a:1
b:3
c:2
d:0
e:0
f:0
g:0
h:0
i:0
j:0
k:0
l:0
m:0
n:0
o:0
p:0
q:0
r:0
s:0
t:0
u:0
v:0
w:0
x:0
y:0
z:0
```

# Analysis

This problem has a regular pattern. Let me show you.

Assume that $str[0] = 0 \space str[1] = 1$ .

| occurrence times |  0   |  1   |  2   |  3   |   4   |    5     |
| :--------------: | :--: | :--: | :--: | :--: | :---: | :------: |
|                  |  0   |  1   |  01  | 101  | 01101 | 10101101 |
|        0         |  1   |  0   |  1   |  1   |   2   |    3     |
|        1         |  0   |  1   |  1   |  2   |   3   |    5     |

From the table above, we can see that for $K-th$ Fibonacci String, the occurrence times of the first basic string is $Fibonacci[K - 1]$ . And the occurrence times of the second basic string is $Fibonacci[K]$. (Fibonacci started from 0);

So for the $K-th$ Fibonacci String, all the letters occurrence times is the number of occurrences in the first basic string times $Fibonacci[K - 1]$ + the number of occurrences in the second basic string times $Fibonacci[K]$ .

And remember there is a blank line after each test case.

And if you are using map, don't forget to clear it before using it.

# Code

```c++
#include<bits/stdc++.h>

using namespace std;

map<char,int> as;
map<char,int> bs;

int f[100];
void fib() {
	f[0] = 0;
	f[1] = 1;
	for(int i = 2; i < 52; i ++) {
		f[i] = f[i - 1] + f[i - 2];
	}
}
int main() {
	fib();
	int t;
	cin >> t;
	while(t --) {
		as.clear(); bs.clear();
		string a, b;
		int n;
		cin >> a >> b >> n;
		for(int i = 0; i < a.length(); i ++) {
			as[a[i]] ++;
		}
		for(int i = 0; i < b.length(); i ++) {
			bs[b[i]] ++;
		}
		for(char i = 'a'; i <= 'z'; i ++) {
			if(n == 0) cout << i << ":" << as[i] << endl;
			else cout << i << ":" << as[i] * f[n - 1] + bs[i] * f[n] << endl; 
		}
		cout << endl;
	}
	return 0;
}
```