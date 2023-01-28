---
title: P1533 Number Reverse
date: 2019-09-02 07:03:16
tags: [String, 洛谷]
categories: ACM
description: we just find the position of the character '.' and '/' and '%' and reverse the string before and after the character and omit the front zeros.
---

## [Number reversion](https://www.luogu.org/problem/P1553)

Given a number, reverse the number on each digit of the number to get a new number. The difference between this time and the first question of the NOIp2011popularization group is: Given a number, reverse the number on each digit of the number to get a new number.

<!--more-->

### Input sample

a number s

### Output sample

a number, the reverse number of number s

### Input Output sample

**输入 #1**

```
5087462
```

**输出 #1**

```
2647805
```

**输入 #2**

```
600.084
```

**输出 #2**

```
6.48
```

**输入 #3**

```
700/27
```

**输出 #3**

```
7/72
```

**输入 #4**

```repl
8670%
```

**输出 #4**

```repl
768%
```

### Explanation/Hint

All data: 25% s is an integer, no more than 20 digits

25% s is a decimal, and the integer part and the decimal part are no more than 10 digits

25% s is the score, and the numerator and denominator are no more than 10 digits

25% s is a percentage and the molecule is no more than 19 digits

(20 datas)

## Solution

This is an easy problem, we just find the position of the character ‘.’ and ‘/‘ and ‘%’ and reverse the string before and after the character and omit the front zeros.

```c++
#include<bits/stdc++.h>

using namespace std;

stack <char> f, b; //reverse the order of string f is front, b is back
int main(){
	string a; // the input
	cin >> a;
	int pos; // the position of the character
	pos = a.find('/'); // find the character . / %
	if(pos == a.npos){ // if / does not exists
		pos = a.find('%'); // look for %
		if(pos == a.npos){ // if % does not exists
			pos = a.find('.'); // find .
		} 
	}
	int flag = 0; // flag is to determine whether it is the first some 0s
	for(int i = 0; i < pos; i ++){
		if(a[i] == '0' && flag == 0 && i != pos - 1){ // if still the first some 0s
			a[i] = 's'; // mark the 0 to a diffrent charater
		}else{
			flag = 1; // some first 0s are end
			f.push(a[i]); // push a[i] to stack
		}
	}
	flag = 0;
	for(int i = pos + 1; i < a.length(); i ++){
		if(a[i] == '0' && flag == 0 && i != a.length() - 1){
			a[i] = 's';
		}else{
			flag = 1;
			b.push(a[i]);
		}
	}
//	if(b.empty() && pos != a.npos) b.push('0');
	flag = 0;
	while(!f.empty()){ 
		char t;
		t = f.top();
		f.pop();
		if(t == '0' && flag == 0 && !f.empty()) continue; // if there is only one 0, we must save it
		else{
			flag = 1;
			cout << t;
		}
	}
	flag = 0;
	if(pos != a.npos)
		cout << a[pos]; // output the character if exists
	while(!b.empty()){
		char t;
		t = b.top();
		b.pop();
		if(t == '0' && flag == 0 && !b.empty()) continue;
		else{
			flag = 1;
			cout << t;
		}
	}
	cout << endl;
	return 0;
}
```