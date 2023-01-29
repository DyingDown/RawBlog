---
title: Xiongnu's Land
date: 2019-10-20 03:28:33
tags: [Search, UVALive, Binary Search]
categories: ACM
main: Search
description: The core of the problem is Dichotomy which is Binary search the best range of the X.
---

## [Problem Description](https://icpcarchive.ecs.baylor.edu/index.php?option=com_onlinejudge&Itemid=8&page=show_problem&problem=5273)

Wei Qing (died 106 BC) was a military general of the Western Han dynasty whose campaigns against
the Xiongnu earned him great acclaim. He was a relative of Emperor Wu because he was the younger
half-brother of Empress Wei Zifu (Emperor Wu’s wife) and the husband of Princess Pingyang. He was also the uncle of Huo Qubing, another notable Han general who participated in the campaigns against the Xiongnu and exhibited outstanding military talent even as a teenager.

Defeated by Wei Qing and Huo Qubing, the Xiongnu sang: “Losing my Qilian Mountains, made
my cattle unthriving; Losing my Yanzhi Mountains, made my women lacking rouge.”
The text above is digested from Wikipedia. Since Wei and Huo’s distinguished achievements,
Emperor Wu decided to give them some awards — a piece of land taken by them from Xiongnu. This
piece of land was located in a desert, and there were many oases in it. Emperor Wu wanted to draw
a straight south-to-north dividing line to divide the land into two parts, and gave the western part to
Wei Qing while gave the eastern part to Huo Qubing. There are two rules about the land dividing:

1. The total area of the oases lay in Wei’s land must be larger or equal to the total area of the oases
   lay in Huo’s land, and the difference must be as small as possible.
2. Emperor Wu wanted Wei’s land to be as large as possible without violating the rule 1.

To simplify the problem, please consider the piece of land given to Wei and Huo as a square on a
plane. The coordinate of its left bottom corner was (0, 0) and the coordinate of its right top corner
was (R, R). Each oasis in this land could also be considered as a rectangle which was parallel to the
coordinate axes. The equation of the dividing line was like x = n, and n must be an integer. If the
dividing line split an oasis, then Wei owned the western part and Huo owned the eastern part. Please
help Emperor Wu to find out how to draw the dividing line.

### Input

The first line of the input is an integer K meaning that there are K (1 ≤ K ≤ 15) test cases.
For each test case:
The first line is an integer R, indicating that the land’s right top corner was at (R, R) (1 ≤ R ≤
1, 000, 000)
Then a line containing an integer N follows, indicating that there were N (0 < N ≤ 10000) oases.
Then N lines follow, each contains four integers L, T, W and H, meaning that there was an
oasis whose coordinate of the left top corner was (L, T), and its width was W and height was H.
(0 ≤ L, T ≤ R, 0 < W, H ≤ R). No oasis overlaps.

### Output

For each test case, print an integer n, meaning that Emperor Wu should draw a dividing line whose
equation is x = n. Please note that, in order to satisfy the rules, Emperor might let Wei get the whole
land by drawing a line of x = R if he had to.

### Sample Input

```
2
1000
2
1 1 2 1
5 1 2 1
1000
1
1 1 2 1
```

### Sample Output

```
5
2
```

## Analysis the Problem

The core of the problem is **Dichotomy** which is **Binary** search the best range of the X.

## Code

```c++
#include<bits/stdc++.h>

using namespace std;

struct point{
	long long fx, fy, bx, by;
	long long s;
}ps[11000];

long long t, n, R, w, h;

long long check(long long mid) {
	long long q = 0, w = 0; 
	for(long long i = 0; i < n; i ++){
		if(mid >=  ps[i].fx and mid <= ps[i].bx) {
			q += (mid - ps[i].fx) * (ps[i].fy - ps[i].by);
			w += (ps[i].bx - mid) * (ps[i].fy - ps[i].by);
		} else if(mid >= ps[i].bx){
			q += ps[i].s;
		} else if(mid <= ps[i].bx) {
			w += ps[i].s;
		}
	}
	return q - w;
}
int main(){
	cin >> t;
	while(t --){
		cin >> R >> n;
		for(long long i = 0; i < n; i ++){
			cin >> ps[i].fx >> ps[i].fy >> w >> h;
			if (ps[i].fx + w > R) {
				ps[i].bx = R;
			} else ps[i].bx = ps[i].fx + w;
			if(ps[i].fy - h < 0) {
				ps[i].by = 0;
			} else {
				ps[i].by = ps[i].fy - h;
			}
			ps[i].s = (ps[i].bx - ps[i].fx) * (ps[i].fy - ps[i].by);
		}
		long long l = 0, r = R + 1, mid = (l + r) / 2;
		while (l <= r) {
			if(check(mid) > 0) {
				r = mid-1;
			} else if (check(mid) == 0) {
				r=mid-1;
			} else {
				l = mid+1;
			} 
			mid = (l + r) / 2;
		} 
		while(check(l) == check(l+1) && l<R)l++;
		cout << l << endl;
	}
	return 0;
}
```