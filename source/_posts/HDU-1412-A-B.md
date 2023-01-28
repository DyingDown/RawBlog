---
title: HDU-1412 {A}+{B}
date: 2019-12-16 03:28:38
tags: ACM
categories: [Math, HDU, Mode]
postImage: https://s1.ax1x.com/2020/04/26/JgAQfI.jpg
description: C++ has a set of very handy function for set. Here we just use UNION
---

# [{A}+{B}](http://acm.hdu.edu.cn/showproblem.php?pid=1412)

Here are two sets for you, asking {A} + {B}.
Note: There will not be two identical elements in the same set.

<!--more-->

### Input

Each set of input data is divided into three lines. The first line has two numbers n, m (0 <n, m <= 10000), which respectively represent the number of elements in set A and set B. The last two lines represent set A and Set B. Each element is an integer not exceeding the range of int, and each element is separated by a space.

### Output

One row of data is output for each group of data, which represents the merged collection. It is required to output from small to large, with a space between each element.

### Sample Input

```
1 2
1
2 3
1 2
1
1 2
```

### Sample Output

```
1 2 3
1 2
```

# Analysis 

C++ has a set of  very handy function for set. Here we just use UNION

```cpp
vetor<int> a, b, amalgamate;
set_union(a.begin(), a.end(), b.begin()， b.end(), inserter(amalgamate, amalgamate.begin()));
```

# Code

```c++
#include<bits/stdc++.h>

using namespace std;

int main() {
	int n, m, t;
	while(cin >> n >> m) {
		set<int> a, b, amalgamate; 
		for(int i = 0; i < n; i ++) {
			cin >> t;
			a.insert(t);
		}
		for(int i = 0; i < m; i ++) {
			cin >> t;
			b.insert(t); 
		} 
		set_union(a.begin(), a.end(), b.begin(), b.end(), inserter(amalgamate, amalgamate.begin()));
		set<int> :: iterator it;
		for(it = amalgamate.begin(); it != amalgamate.end(); it ++) {
			if(it == amalgamate.begin()) cout << *it;
			else cout << " " << *it;
		}
		cout << endl;
	}
	return 0;
}
```