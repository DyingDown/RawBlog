---
title: 'Database Engine Project: SQL Grammar Analysis Ⅱ'
date: 2021-10-13 01:23:50
tags: [Lexical, Analyzer Grammar]
categories: Database Engine Project
postImage: https://cdn.jsdelivr.net/gh/dyingdown/img-host-repo/Blog/post20211020114851.jpg
---

Recommend article: “精读《手写SQL编译器》”. I learned to write from this article.

<!--more-->

Last article, I’ve wrote some simple grammar structure of SQL language. Because of time, and the Fronted Part is not the important part in the whole project, I choose to write it in most stupid way.

## Manually structured Syntax Tree

Build a C++ class for each Node in Syntax Tree.

This is has nothing to say because if it is the most straighted and simple way.

```
|- SQLAssignStatement.h
 - SQLColumnDefine.h
 - SQLCreateTableStatement.h
 - ...
 - SQLUpdateStatement.h
 - SQLValue.h
```

And for each non-leaf node, since you already know the function of the tree, you can ignore other fixed member such as reserved word.

Let’s take `Create Table` for example:

```C++
#include <iostream>
#include "SQLColumnDefine.h"
#include <vector>

class SQLCreateTableStatement {
public:
    std::string TableName;
    std::vector<SQLColumnDefine> columns;
};
```

## Parser

I just analyze one by one violently.

And in class `Parser`, create a new `LexicalAnalyzer` Class and make it to get tokens.

If the first Token is ‘CREATE’ and the second Token is ‘TABLE’ and the third token is ‘{‘ and so on.

This is not a good way but it is very direct.

Maybe I’ll find a better way after finish all basic functions of SQL Database.