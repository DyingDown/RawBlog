---
title: 'Database Project: SQL Lexical Analyzer词法分析'
date: 2021-10-07 12:53:38
tags: Lexical Analyzer
categories: Database Project
postImage: https://cdn.jsdelivr.net/gh/dyingdown/img-host-repo/Blog/post/20211007212737.jpg
---

数据库项目目前实现了一个简单的词法分析器，其中就是读取SQL语句中的字符，把他们转换成相应的Token。

<!--more-->

项目发布在GitHub上，可以查看代码。https://github.com/DyingDown/Database/tree/main

## Token

Token就是不可以再分割的最小语素，里面保存Token的类型，和Token的内容。

```c++
class Token {
public:
    int type;
    std::string value;
    Token(int type, std::string value);
};

Token::Token(int type, std::string value) {
    this->type = type;
    this->value = std::move(value);
}
```

## Token的类型

目前针对SQL语句，我就设计了几种简单的类型：int，float，string，保留字，变量名(ID)，符号，非法，结束。

```c++
class TokenType {
public:
    enum TokenTypes{
        INT,                 // Integers
        STRING,
        FLOAT,
        ID,
		// 保留字
        ADD,
        ...
        WHERE,

        L_BRACKET,            // (
        R_BRACKET,            // )
        ASTERISK,             // '*'
        SEMICOLON,            // ;
        COMMA,                // ,
        PLUS,                 // +
        MINUS,                // -
        DIVISION,             // /
        GREATER_THAN,         // >
        LESS_THAN,            // <
        GREATER_EQUAL_TO,     // >=
        LESS_EQUAL_TO,        // <=
        EQUAL,                // =
        NOT_EQUAL,            // != <>
        ILLEGAL,
        END
    };
};
```

## 分割Token

一个一个读取字符，按照空格（`‘\n’, ' ', '\t'`）来分割字符，或者有时候`()`也可以分割。

这部分代码不难，就是比较繁琐，需要多个if 来判断，

也用一个类来保存这个功能。

由于这个词法分析，每次只读取一个Token，由外部（语法分析器）来多次驱动才能将所有的字符分割完全。所以，需要有一个全局变量来记录当前处理到哪个位置的字符串。

```c++
class LexicalAnalyzer {
private:
    Token getNumber();    /* 获得数字类型(int,float) */
    Token getWords();     /* 获得保留字或者变量名 */
    Token getString();    /* 获得字符串 "" */
    Token getPunct();     /* 获得符号 */
    int currentPosition;  /* 当前位置 */
    bool isSpace(char a); 
public:
    std::string sql_str;    /* 读取到的SQL语句 */
    int sql_len;		    /* SQL语句长度 */
    Token scanNextTokens(); /* 获取下一个Token */
    LexicalAnalyzer(std::string content);
};
```

其中，最主要的函数就是 读取下一个Token函数，其他的函数都会通过这个来驱动。

```c++
Token LexicalAnalyzer::scanNextTokens() {
    while(currentPosition < sql_len and isSpace(sql_str[currentPosition])) {
        currentPosition ++;
    }
    Token currentToken(TokenType::ILLEGAL, "");
    if(currentPosition >= sql_len) {
        currentToken = Token(TokenType::END, "");
    } else if(sql_str[currentPosition] == '\"') {
        currentToken = getString();
    } else if(isdigit(sql_str[currentPosition])) {
        currentToken = getNumber();
    } else if(isalpha(sql_str[currentPosition])) {
        currentToken = getWords();
    } else {
        currentToken = getPunct();
    }
    return currentToken;
}
```

## 测试

目前还没有学习如何测试代码，所以暂时先写在了main里面

```c++
int main() {
    InputBuffer a = InputBuffer();
    a.read_input();
    LexicalAnalyzer b = LexicalAnalyzer(a.input_buffer);
    Token t = b.scanNextTokens();
    while(t.type != TokenType::END) {
        std::cout << t.value<< " " << t.type << std::endl;
        t = b.scanNextTokens();
    }
    std::cout << t.value << std::endl;
    return 0;
}
```