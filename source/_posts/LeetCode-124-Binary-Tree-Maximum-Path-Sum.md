---
title: LeetCode 124. Binary Tree Maximum Path Sum
date: 2023-07-01 20:00:44
tags: [Binary Tree, Tree, DFS]
categories: [ACM]
postImage:
description: To find the maximum path sum in a binary tree, we can use a recursive approach. The idea is to traverse the tree in a bottom-up manner and calculate the maximum path sum for each node.
main: DFS
---

# Problem Description

[124. Binary Tree Maximum Path Sum](https://leetcode.com/problems/binary-tree-maximum-path-sum/description/?envType=study-plan-v2&envId=top-interview-150)

# Analysis

To find the maximum path sum in a binary tree, we can use a recursive approach. The idea is to traverse the tree in a bottom-up manner and calculate the maximum path sum for each node.

We define a helper function `maxPathSumHelper(node)` that takes a node as input and returns one value:

1. The maximum path sum starting from the given node, considering only the left or right child paths (if they are positive), or just the node's value if both children have negative path sums.

Then we calculate the path sum for each node as they are being considered as root node, and compare with the maximum answer.

Finally, we call the helper function `maxPathSumHelper(root)` on the root of the binary tree to obtain the maximum path sum.

# Code

```c++
/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
 * };
 */
class Solution {
public:
    int maxn = INT_MIN;
    int maxPathSum(TreeNode* root) {
        maxPathSumHelper(root);
        return maxn;
    }
    int maxPathSumHelper(TreeNode* root) {
        if(root == nullptr) return 0;
        int left = max(maxPathSumHelper(root->left), 0);
        int right = max(maxPathSumHelper(root->right), 0);
        maxn = max(maxn, root->val + left + right);
        return root->val + max(left, right);
    }
};
```

