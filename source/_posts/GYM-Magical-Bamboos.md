---
title: GYM Magical Bamboos
date: 2020-07-10 10:51:37
tags: [Math, GYM ]
categories: ACM
description: So our goal is to find whether there is a difference between two words that is not even.
---

<center>
        <font size="5">
            <a target="_blank" rel="noopener" href="https://codeforces.com/problemset/gymProblem/101350/D" one-link-mark="yes">D. Magical Bamboos</a><br>
        </font>
        <font size="2">
            time limit per test: 1 second <br>
            memory limit per test: 256 megabytes<br>
            input: standard input<br>
            output:standard output<br>
        </font>
    </center>

In a magical forest, there exists *N* bamboos that don’t quite get cut down the way you would expect.

Originally, the height of the $i^{th}$ bamboo is equal to $h_i$. In one move, you can push down a bamboo and decrease its height by one, but this move magically causes all the other bamboos to increase in height by one.

If you can do as many moves as you like, is it possible to make all the bamboos have the same height?

### Input

The first line of input is *T* – the number of test cases.

The first line of each test case contains an integer $N(1 ≤ N ≤ 10^5)$ the number of bamboos.

The second line contains *N* space-separated integers $h_i(1 ≤ h_i ≤ 10^5)$ the original heights of the bamboos.

### Output

For each test case, output on a single line “yes” (without quotes), if you can make all the bamboos have the same height, and “no” otherwise.

### Example

#### input

```
2
3
2 4 2
2
1 2
```

#### output

```
yes
no
```

## Analysis

As we all know, if you subtract a certain number n from a and add n to b, then only if `(a - b) % 2 = 0` can make the a = b;

So our goal is to find whether there is a difference between two words that is not even.

```c++
#include<bits/stdc++.h>

using namespace std;
int arr[1000000];
int main(){
	std::ios::sync_with_stdio(false);
	int t;
	cin >> t;
	while(t --){
		int n;
		cin >> n;
		for(int i = 0; i < n; i ++){
			cin >> arr[i];
		}
		sort(arr, arr + n);
		int flag = 0;
		for(int i = 0; i < n - 1; i ++){
			if((arr[i+1] - arr[i]) % 2 != 0){
				flag = 1;
				break;
			}
		}
		if(flag == 1) cout << "no" << endl;
		else cout << "yes" << endl;
	}
	return 0;
}
```