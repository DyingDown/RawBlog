---
title: KMP
date: 2019-08-16 01:01:56
tags: [Knowledge points, KMP, String]
categories: Algorithm
postImage: https://cdn.jsdelivr.net/gh/DyingDown/img-host-repo/202302051648625.jpg
---

KMP is an algorithm that find the given pattern string in the pending string. Usually we would think of violent traversing the two strings using for loop. However the time complexity of this method is O(n)~O(mn). So the KMP can cut the times of loop.

<!--more-->

## Knuth-Morris-Pratt Algorithm

Here is the code of violent traversing.

```
vector<int> match(string a, string b, int n, int m) {
    vector<int> ans;
    for (i = 0; i < n - m + 1; i++) {
        for (j = 0; j < m; j ++) {
            if (a[i + j] != b[j]) break;
        }
        if (j == m) ans.push_back(i);
    }
    return ans;
}
```

The followings are the main ideas of KMP.

Given a string s which length is n, it’s longest common prefix-suffix function is fix[i]. That means from the first element to the ith element ( include i ), the length of the common prefix-suffix is fix[i].

Assume that we have looped to the ith element.

![img](https://s2.ax1x.com/2019/08/17/mmHQXD.png)

If the next point of both point is the same, then we found the answer.

If not, then we move the point fix[i] to fix[fix[i]] and do the step above until we find the answer.