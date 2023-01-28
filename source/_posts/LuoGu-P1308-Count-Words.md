---
title: LuoGu-P1308 Count Words
date: 2020-07-10 10:14:20
tags: [String, stringstream]
categories: ACM
description: Using stringstream can help make the problem easy. Using stringstream to traverse the sentence word by word.
---

## [统计单词数](https://www.luogu.com.cn/problem/P1308)

一般的文本编辑器都有查找单词的功能，该功能可以快速定位特定单词在文章中的位置，有的还能统计出特定单词在文章中出现的次数。

现在，请你编程实现这一功能，具体要求是：给定一个单词，请你输出它在给定的文章中出现的次数和第一次出现的位置。注意：匹配单词时，不区分大小写，但要求完全匹配，即给定单词必须与文章中的某一独立单词在不区分大小写的情况下完全相同（参见样例1 ），如果给定单词仅是文章中某一单词的一部分则不算匹配（参见样例2 ）。

### 输入格式

共2行。

第1行为一个字符串，其中只含字母，表示给定单词；

第2行为一个字符串，其中只可能包含字母和空格，表示给定的文章。

### 输出格式

一行，如果在文章中找到给定单词则输出两个整数，两个整数之间用一个空格隔开，分别是单词在文章中出现的次数和第一次出现的位置（即在文章中第一次出现时，单词首字母在文章中的位置，位置从0 开始）；如果单词在文章中没有出现，则直接输出一个整数-1。

### 输入输出样例

**输入 #1**

```
To
to be or not to be is a question
```

**输出 #1**

```
2 0
```

**输入 #2**

```
to
Did the Ottoman Empire lose its power at that time
```

**输出 #2**

```
-1
```

### 说明/提示

数据范围

1≤单词长度≤10。

1≤文章长度≤1,000,000。

## Analysis

Using stringstream can help make the problem easy. Using stringstream to traverse the sentence word by word.

And then compare the word with the given word.

At last, use `.find` function to find the position of the word.

Details about `.find` function, you check https://dyingdown.github.io/2019/09/02/string-find-usage/ to see.

**Before using find() function, you need to add space on both sides of the two given strings.** In case of the following status.

```c++
string a = "handsome as I am. Give me your hand";
string b = "hand";
a.find(b) = 0; //clearly it's not right.
```

## Code

```C++
#include <bits/stdc++.h>

using namespace std;

int main(){
    string a;
	getline(cin ,a);
	transform(a.begin(), a.end(), a.begin(), ::toupper);
    string b = "", s;
	getline(cin, b);
    transform(b.begin(), b.end(), b.begin(), ::toupper);
    int loc = 0, count = 0;
	stringstream ss(b);
	while(ss >> s){
        if(s == a){
            count ++;
        }
    }
    b = ' ' + b + ' ';
    a = ' ' + a + ' ';
    loc = b.find(a);
    //cout << loc << endl;
	if(count != 0)  cout << count << " " << loc<< endl;
	else cout << -1 << endl;
	return 0;
}
```