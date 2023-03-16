---
title: LeetCode 1315. Sum of Nodes with Even-Valued Grandparent
date: 2023-03-02 00:15:11
tags: [BFS, Binary Tree, Tree, Graph, Queue]
categories: ACM
main: BFS
postImage: https://cdn.jsdelivr.net/gh/DyingDown/img-host-repo/202303020029976.gif
description: So we can use the parent to represent grandparent.
---

## Problem Description

[1315. Sum of Nodes with Even-Valued Grandparent](https://leetcode.com/problems/sum-of-nodes-with-even-valued-grandparent/)

## Analysis

This is a normal tree traverse by layer problem.

But in DFS, we can not directly find its grandson or grandparent. So we can use the parent to represent grandparent.

```c++
queue<pair<TreeNode*, bool>> que;
```

The second element of pair represents the status of it's parent node status.

if the second element is true, then it means its parent is an even node, so we add its son node value into the sum if it has left or right child.

And to start, the root node has no parent so its parent status should be false.

```c++
class Solution {
public:
    int sumEvenGrandparent(TreeNode* root) {
        if(root == nullptr) return 0;
        queue<pair<TreeNode*, bool>> que;
        que.push(make_pair(root, false));
        int sum = 0;
        while(!que.empty()) {
            auto t = que.front();
            que.pop();
            int isEven = false;
            if(t.first->val % 2 == 0) isEven = true;
            if(t.first->left) {
                if(t.second == true) {
                    sum += t.first->left->val;
                }
                que.push(make_pair(t.first->left, isEven));
            }
            if(t.first->right) {
                if(t.second == true) {
                    sum += t.first->right->val;
                }
                que.push(make_pair(t.first->right, isEven));
            }
        }
        return sum;
    }
};
```