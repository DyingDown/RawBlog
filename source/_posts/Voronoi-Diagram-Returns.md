---
title: Voronoi Diagram Returns
date: 2019-10-20 01:46:26
tags: [GYM, Geometry, CodeForces]
categories: ACM
description: From the description above we can draw that the Voronoi Diagram is drawn not casually but with some rules and the role can only correspond to one kind of the diagram.
---

## [Problem Description](https://codeforces.com/gym/102058/problem/K)

In the 2-dimensional Cartesian coordinate system, we define the Voronoi Diagram of a non-empty set of points SS, as a diagram that divides the plane by the criteria “which point in the set SS is closest in this location?”. More precisely, the Voronoi diagram of a given non-empty point set {P1,P2,⋯,Pn} {P1,P2,⋯,Pn} is a collection of regions: A point KK is included in region ii if and only if d(Pi,K)≤d(Pj,K)d(Pi,K)≤d(Pj,K) holds for all 1≤j≤n1≤j≤n, where d(X,Y)d(X,Y) denotes the Euclidean distance between point XX and YY.

![img](https://vj.z180.cn/bc3d9eeded6d2d40ab23c4303926dd8a?v=1570359121)

For example, in the picture above, every location over the plane is colored by the closest point with such location. The points which belongs to a single region is colored by a light color indicating a region, and the points which belongs to more than one region forms lines and points colored black.

There is an algorithm which computes the Voronoi Diagram in O(nlog(n)), but it is infamous to be very complicated and hard. In fact, we are lenient problem setters, so we set n≤2000n≤2000, which means you can solve this task with slower Voronoi Diagram algorithms!

In this task, you should solve the point query problem in Voronoi diagram: in the Voronoi diagram constructed with the set of points {P1,P2,⋯,Pn}, you should determine which region(s) the point belongs in. More precisely, you will be given q queries of points. For each query point, you should determine the following:

- If it’s not included in any region, output NONE.
- If it’s included in exactly one region, output REGION X, where X is the index of such region.
- If it’s included in exactly two regions, output LINE X Y, where X and Y (X << Y) are the indices of such two regions.
- If it’s included in three or more regions, output POINT.

#### Input

 In the first line, the number of points consisting Voronoi diagram nn, and the number of queries qq are given. (3≤n≤2 000,1≤q≤250 0003≤n≤2 000,1≤q≤250 000)

In the iith line of next nn lines, two integers indicating xx and yy co-ordinate of PiPi are given. These are the points consisting the Voronoi diagram. All nn points are distinct. (|x|,|y|≤104|x|,|y|≤104)

In the jjth line of next qq lines, two integers indicating xx and yy co-ordinate of QjQj are given. For each point QjQj, you should determine in which region(s) the given point belongs to. (|x|,|y|≤104|x|,|y|≤104)

#### Output

Output consists of qq lines. In the jjth line, you should print one of following:

- If QjQj is not included in any region, output NONE.
- If QjQj is included in exactly one region, output REGION X, where X is the index of such region.
- If QjQj is included in exactly two regions, output LINE X Y, where X and Y (X << Y) are the indices of such two regions.
- If QjQj is included in three or more regions, output POINT.

#### Input

```
4 3
-5 0
0 5
3 4
1 -6
-2 2
0 0
2 2
```

#### Output

```
LINE 1 2
POINT
REGION 3
```

## Analysis the Meaning of the Problem

From the description above we can draw that the Voronoi Diagram is drawn not casually but with some rules and the role can only correspond to one kind of the diagram. The rules are:

1. The region is being identified by the given points.
2. The one point control one region
3. The farthest range one point can control is judged by the distance,the place where the point is not in any other points circle

So for this problem, you just need to calculate the distance of the point to any previous given points. To determine whether it belongs to one or more region.

## Code

```c++
#include<bits/stdc++.h>

using namespace std;

struct region{
	int x;
	int y;
	int id;
}re[3000];

int main(){
	int n, q;
	cin >> n >> q;
	for(int i= 0; i < n; i ++){
		cin >> re[i].x >> re[i].y;
		re[i].id = i + 1;
	}
	int x, y;
	for(int i  = 0; i < q; i ++){
		cin >> x >> y;
		int p1, p2, count = 1;
		double distance = 1e9 * 1.0;
		double td;
		for(int j = 0; j < n; j ++){
			td = sqrt((x - re[j].x) * (x - re[j].x) + (y - re[j].y) * (y - re[j].y));
			if(td < distance){
				distance = td;
				count = 1;
				p1 = re[j].id;
			}else if(td == distance){
				count ++;
				if(count == 2) p2 = re[j].id;
			}
		}
		if(count == 1){
			cout << "REGION " << p1 << endl;
		} else if(count == 2) {
			cout << "LINE " << p1 << " " << p2 << endl;
		} else {
			cout << "POINT" << endl;
		}
	}
	return 0;
}
```