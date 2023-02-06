---
title: Binary Tree Traversal
date: 2019-10-21 06:57:33
tags: Knowledge points
categories: Data Structure
postImage: https://cdn.jsdelivr.net/gh/DyingDown/img-host-repo/202302051713329.jpg
---

There are mainly three ways of binary tree traversal. In-order, Preorder and Post-order.

For example we have a simple three-node tree like this.

<!--more-->

![img](https://s2.ax1x.com/2019/10/21/KlJ3vT.png)

## Illustration

### Preorder

![img](https://s2.ax1x.com/2019/10/21/KlYFo9.png)

### In-order

![img](https://s2.ax1x.com/2019/10/21/KlYNy8.png)

### Post-order

![img](https://s2.ax1x.com/2019/10/21/Klt9pt.png)

## Code

### Struct

First of all, to store the nodes, we need to create struct with multiple data type.

And we to achieve this hole project, we also need some functions like generating the tree and so on.

We can define them in a .h file named *BinaryTreeNode.h* .

```c++
//
// Created by o_oyao on 2019/10/19.
//

#ifndef BINARYTREETRAVERSE_BINARYTREENODE_H
#define BINARYTREETRAVERSE_BINARYTREENODE_H


typedef struct BinaryTreeNode {
    char data;
    struct BinaryTreeNode *leftChild, *rightChild;
    typedef BinaryTreeNode *BinaryTree;
    static void CreateBinaryTree(BinaryTree *t);
    static void PreOrderTraverse(BinaryTree tree);
    static void inOrderTraverse(BinaryTree tree);
    static void PostOrderTraverse(BinaryTree tree);
} BinaryTreeNode;

#endif //BINARYTREETRAVERSE_BINARYTREENODE_H
```

### Functions

#### Orders

##### Theory

 After declaring them, we need to define the functions in file *BinaryTreeNode.cpp* .

 The essence of all three functions are recursion and they are all same. So I’ll just pick up one and explains thoroughly.

 Take post-order for example, we first need to find the bottom left of the tree. If the function writes that: “Go to it’s left child.”, we just get one layer deeper but still not the last layer, so we need to go another layer deeper again.

 Since the function has only one parameter that indicate the current node, we can call the function itself inside it and change the parameter to the child of this node. That’s the way we keep looking for the left child until the current node has nothing.

 If the current node has nothing, that means we’ve got to the bottom of the tree.

 After finding the left bottom of the tree, we return to it’s parent node and find it’s brother—the right child. And it’s the same way as finding the left child.

##### Code

```c++
void BinaryTreeNode::PostOrderTraverse(BinaryTree tree) {
    if(tree == nullptr) return ;
    PostOrderTraverse(tree->leftChild);
    PostOrderTraverse(tree->rightChild);
    std::cout << tree->data << " ";
}
```

#### Create Tree

In this program I use preorder to input the tree, it’s creation is just like preorder traversal. First Point is parent, then input it’s left child and right child.

```c++
void BinaryTreeNode::CreateBinaryTree(BinaryTree *t) {
    char node;
    std::cin >> node;
    if(node == '#')
        *t = nullptr;
    else {
        *t = new BinaryTreeNode;
        if(!*t)
            exit(-1);
        (*t)->data = node;
        CreateBinaryTree(&(*t)->leftChild);
        CreateBinaryTree(&(*t)->rightChild);
    }
}
```

#### File BinaryTreeNode.cpp

```c++
//
// Created by o_oyao on 2019/10/19.
//

#include "BinaryTreeNode.h"
#include <iostream>

void BinaryTreeNode::PreOrderTraverse(BinaryTree tree) {
    if(tree == nullptr) return ;
    std::cout << tree->data << " ";
    PreOrderTraverse(tree->leftChild);
    PreOrderTraverse(tree->rightChild);
}

void BinaryTreeNode::inOrderTraverse(BinaryTree tree) {
    if (tree == nullptr) return;
    inOrderTraverse(tree->leftChild);
    std::cout << tree->data << " ";
    inOrderTraverse(tree->rightChild);
}

void BinaryTreeNode::PostOrderTraverse(BinaryTree tree) {
    if(tree == nullptr) return ;
    PostOrderTraverse(tree->leftChild);
    PostOrderTraverse(tree->rightChild);
    std::cout << tree->data << " ";
}

void BinaryTreeNode::CreateBinaryTree(BinaryTree *t) {
    char node;
    std::cin >> node;
    if(node == '#')
        *t = nullptr;
    else {
        *t = new BinaryTreeNode;
        if(!*t)
            exit(-1);
        (*t)->data = node;
        CreateBinaryTree(&(*t)->leftChild);
        CreateBinaryTree(&(*t)->rightChild);
    }
}
```

### Main

Finally all things are done, the rest is to call the functions.

```c++
#include<bits/stdc++.h>
#include "BinaryTreeNode.h"

using namespace std;

int main() {
    cout << "Input the binary tree(# stands for null node AB#C##D##): ";
    BinaryTreeNode::BinaryTree tr;
    BinaryTreeNode::CreateBinaryTree(&tr);
    cout << "The preorder of the tree is: ";
    BinaryTreeNode::PreOrderTraverse(tr);
    cout << endl;
    cout << "The inorder of the tree is: ";
    BinaryTreeNode::inOrderTraverse(tr);
    cout << endl;
    cout << "The postorder of the tree is: ";
    BinaryTreeNode::PostOrderTraverse(tr);
    cout << endl;
    return 0;
}
```

**Note: the example input tree looks like this:**

![img](https://s2.ax1x.com/2019/10/21/KlsLo6.png)