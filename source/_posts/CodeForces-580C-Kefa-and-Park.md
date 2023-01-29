---
title: CodeForces-580C Kefa and Park
date: 2019-11-24 09:53:22
tags: [CodeForces, Graph, DFS, BFS]
categories: ACM
main: Graph
description: The algorithm of the problem is BFS or DFS. I use BFS. Traverse all the points by layer and count it's alongside cats.
postImage: https://s1.ax1x.com/2020/04/26/Jc1UZq.jpg
---

<center style="line-height: 20px;">
        <font size="5">
            <a target="_blank" rel="noopener" href="https://codeforces.com/contest/580/problem/C" one-link-mark="yes">C. Kafa and Park</a><br>
        </font>
        <font size="2">
            time limit per test: 2 seconds <br>
            memory limit per test: 256 megabytes<br>
            input: standard input<br>
            output:standard output<br>
        </font>
    </center>

### Problem

Kefa decided to celebrate his first big salary by going to the restaurant.

He lives by an unusual park. The park is a rooted tree consisting of *n* vertices with the root at vertex 1. Vertex 1 also contains Kefa's house. Unfortunately for our hero, the park also contains cats. Kefa has already found out what are the vertices with cats in them.

The leaf vertices of the park contain restaurants. Kefa wants to choose a restaurant where he will go, but unfortunately he is very afraid of cats, so there is no way he will go to the restaurant if the path from the restaurant to his house contains more than *m* consecutive vertices with cats.

Your task is to help Kefa count the number of restaurants where he can go.

### Input

The first line contains two integers, *n* and *m* ($2 ≤ n ≤ 105, 1 ≤ m ≤ n$) — the number of vertices of the tree and the maximum number of consecutive vertices with cats that is still OK for Kefa.

The second line contains *n* integers $a_1, a_2, \cdots, a_n$, where each $a_i$ either equals to 0 (then vertex ha $i$ s no cat), or equals to 1 (then vertex $i$ has a cat).

Next *n* - 1 lines contains the edges of the tree in the format "$x_i \space y_i$" (without the quotes) (1 ≤ $x_i, y_i  ≤  n, x_i  ≠ y_i)$, where $x_i$ and $y_i$ are the vertices of the tree, connected by an edge.

It is guaranteed that the given set of edges specifies a tree.

### Output

A single integer — the number of distinct leaves of a tree the path to which from Kefa's home contains at most *m* consecutive vertices with cats.

### Examples

#### Input

```
4 11 1 0 01 21 31 4
```

#### Output

```
2
```

#### Input

```
7 11 0 1 1 0 0 01 21 32 42 53 63 7
```

#### Output

```
2
```

### Note

Let us remind you that a tree is a connected graph on *n* vertices and *n* - 1 edge. A rooted tree is a tree with a special vertex called root. In a rooted tree among any two vertices connected by an edge, one vertex is a parent (the one closer to the root), and the other one is a child. A vertex is called a leaf, if it has no children.

Note to the first sample test:

 ![img](https://imgconvert.csdnimg.cn/aHR0cHM6Ly92ai56MTgwLmNuL2M4NTY1ZDAwNjNhMTExNzZhZTk5OWJmNjcxN2VjOTAz?x-oss-process=image/format,png) The vertices containing cats are marked red. The restaurants are at vertices 2, 3, 4. Kefa can't go only to the restaurant located at vertex 2.

Note to the second sample test: 

![img](https://imgconvert.csdnimg.cn/aHR0cHM6Ly92ai56MTgwLmNuL2IyMGMyOGFhODQxNDQzZGY2ZmI0NjQ0MmQyZGMxNWZj?x-oss-process=image/format,png) The restaurants are located at vertices 4, 5, 6, 7. Kefa can't go to restaurants 6, 7.

# Analysis

The algorithm of the problem is BFS or DFS. I use BFS.

Traverse all the points by layer and count it's alongside cats. Define an array to store how many consecutive cats that has appeared counted this one if it has. If this point has a cat,  the array's value at this point is the previous point's array value + 1. If this point has no cat, leave this point alone. However, if this point has no cat but in the previous points, the number of consecutive cat has reached m + 1 or more, then, the cats number is previous cats  number.

Once there is a last-layer point, check if this road's cat reached the not going condition. And add all the roads that not satisfying the condition.

# Code

```c++
#include<bits/stdc++.h>

using namespace std;
int cat[110000];
int vis[110000];
int cnt[110000];
vector<int> vec[110000];
int n, m;
int bfs(int x) {
	memset(vis, 0, sizeof(vis));
	memset(cnt, 0, sizeof(cnt));
	int ans = 0;
	vis[x] = 1;
	if(cat[x] == 1) cnt[x] = 1;
	queue <int> que;
	que.push(x);
	while(!que.empty()) {
		int t = que.front();
		que.pop();
		int a;
		if(vec[t].size() == 1 and vis[vec[t][0]] == 1 and cnt[t] <= m) {
			ans ++;
		} else {
			for(int i = 0; i < vec[t].size(); i ++){
				a = vec[t][i];
				if(vis[a] == 0) {
					if(cat[a] == 1) {
						cnt[a] = cnt[t] + 1;
					} else if(cnt[t] > m) {
						cnt[a] = cnt[t];
					}
					que.push(a);
					vis[a] = 1;
				}  
			}
		}
	}
	return ans;
}
int main() {
	int t, x, y;
	cin >> n >> m;
	for(int i = 1; i <= n; i ++) {
		cin >> cat[i];
	}
	for(int i = 1; i < n; i ++) {
		cin >> x >> y;
		vec[x].push_back(y);
		vec[y].push_back(x);
	}
	int answer = bfs(1);
	cout << answer << endl;
	return 0;
}
```