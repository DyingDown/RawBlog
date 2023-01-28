---
title: HDU-1000 A+B Problem
date: 2019-12-14 14:03:12
tags: [Other, HDU]
categories: ACM
postImage: https://s1.ax1x.com/2020/04/26/JgAkSx.jpg
description: The easiest problem
---

### Problem

Calculate *A + B*.

<!--more-->

### Input

Each line will contain two integers *A* and *B*. Process to end of file.

### Output

For each case, output *A + B* in one line.

### Sample Input

```
1 1
```

### Sample Output

```
2
```

# Analysis

This is the most easy problem. The main point is processing to end of file. 

> In [computing](https://en.wikipedia.org/wiki/Computing), **end-of-file** (commonly abbreviated **EOF**[[1\]](https://en.wikipedia.org/wiki/End-of-file#cite_note-EOF-1)) is a condition in a computer [operating system](https://en.wikipedia.org/wiki/Operating_system) where no more data can be read from a data source. The data source is usually called a [file](https://en.wikipedia.org/wiki/File_(computing)) or [stream](https://en.wikipedia.org/wiki/Stream_(computing)).
>
> In the [C Standard Library](https://en.wikipedia.org/wiki/ANSI_C_standard_library), the character reading functions such as [getchar](https://en.wikipedia.org/wiki/Getchar) return a value equal to the symbolic value (macro) `EOF` to indicate that an end-of-file condition has occurred. The actual value of `EOF` is implementation-dependent (but is commonly -1, such as in [glibc](https://en.wikipedia.org/wiki/Glibc)[[2\]](https://en.wikipedia.org/wiki/End-of-file#cite_note-2)) and is distinct from all valid character codes. Block-reading functions return the number of bytes read, and if this is fewer than asked for, then the end of file was reached or an error occurred (checking of `errno` or dedicated function, such as `ferror` is often required to determine which).
>
> ---From Wikipedia

# Code

```cpp
#include<bits/stdc++.h>

using namespace std;

int main() {
	int a, b;
	while(scanf("%d %d", &a, &b) != 0) {
		printf("%d\n", a + b);
	}
	return 0;
}
```

In C++ ways, the end of line goes like this.

```cpp
#include<bits/stdc++.h>

using namespace std;

int main() {
	int a, b;
	while(cin >> a >> b) {
		cout << a + b << endl;
	}
	return 0;
}
```