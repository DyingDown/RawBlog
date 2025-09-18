---
title: 'Database Engine Project: SQL Tokenizer Ⅱ'
date: 2025-09-18 10:14:59
tags: [Token, Lexical Analysis, Parsing, SQL]
categories: Database Engine Project
postImage: https://cdn.jsdelivr.net/gh/DyingDown/img-host-repo/202509181417762.jpg
description: In the previous article, I’ve covered the overall structure of my database engine project. This article will focus on the SQL layer. Specially about how to prepare for lexical analysis.
warning: false
isCarousel: false
---

<div style="all: unset; display: flex; flex-direction: column; align-items: flex-start; margin: 1rem 0;">
  <a href="https://github.com/DyingDown/LiteDatabase" style="all: unset; cursor: pointer;">
    <img 
      src="https://github-readme-stats.vercel.app/api/pin/?username=DyingDown&repo=LiteDatabase"
      alt="LiteDatabase Repo Card"
      style="
        all: unset;
        display: block;
        max-width: 100%;
      ">
  </a>
</div>

In the previous article, I’ve covered the [overall structure of my database engine project](https://dyingdown.github.io/2025/09/15/Database-Project-Project-Architecture-and-Design/) . This article will focus on the SQL layer. Specially about how to prepare for lexical analysis.

<!--more-->

## Introduction to SQL Processing Pipeline

Before diving into tokenization, let's understand the complete SQL processing pipeline:

1. **Lexical Analysis (Tokenizer)**: Converts raw SQL text into a stream of tokens
2. **Syntax Analysis (Parser)**: Builds an Abstract Syntax Tree (AST) from tokens
3. **Semantic Analysis**: Validates the AST for type correctness and schema compliance
4. **Query Planning**: Optimizes the query and creates an execution plan
5. **Execution**: Actually runs the query against the data

## Token Intro

Previously, we defined the SQL layer for three main function, `Parser`, `Planner`, `Executor`. Before we can parse the SQL, first we need to breaking down the SQL sentence into meaningful words/units.  These words all called **Token**, And the process is call **Tokenization**.

For example,  break SQL sentence `"SELECT * FROM users WHERE id = 1;"` into discrete tokens is like `SELECT`, `*`, `FROM`, `users`, `WHERE`, `id`, `=`, `1`, `;`.

Since Token is part of the SQL layer, we will place the package in SQL folder.

```bash
├── Sql
    ├── Ast
    ├── Token
        ├── Token.cs
        ├── Tokenizer.cs
        ├── TokenType.cs
```

## Token Structure

Let's start by examining our token representation:

```c#
namespace LiteDatabase.Sql.Token;

public class Token {
    public TokenType Type { get; }
    public string Lexeme { get; }

    public Token(TokenType type, string lexeme) {
        Type = type;
        Lexeme = lexeme;
    }
}
```

Each token consists of:

- **Type**: The category of the token (keyword, identifier, operator, etc.)
- **Lexeme**: The actual text representation

## Token Types

Our tokenizer recognizes various token types defined in the `TokenType ` enumeration:

```c#
namespace LiteDatabase.Sql.Token;


public enum TokenType {
    // Data types
    INT, VARCHAR, FLOAT, STRING_LITERAL, ID,
    
    // SQL Keywords
    ABORT, ADD, ALTER, ALL, AND, ANY, AS, ASC, AVG, BOOL, BY, BEGIN, BETWEEN,
    CHECK, COLUMN, COMMIT, COUNT, CREATE, DEFAULT, DELETE, DESC, DROP, DISTINCT,
    EXCEPT, FOREIGN, FROM, GROUP, HAVING, IN, INDEX, INSERT, INTO, IS, JOIN,
    KEY, LIKE, MIN, MAX, NOT, NULL, OR, ORDER, PRIMARY, TABLE, SELECT, SET,
    SUM, UPDATE, UNION, UNIQUE, VALUES, WHERE,

    // Operators and Punctuation
    L_BRACKET, R_BRACKET, SEMICOLON, COMMA, DOT, ASTERISK, PLUS, MINUS,
    DIVISION, GREATER_THAN, LESS_THAN, GREATER_EQUAL_TO, LESS_EQUAL_TO,
    EQUAL, NOT_EQUAL, TRUE, FALSE,
    
    // Special tokens
    ILLEGAL, END
}
```

Currently, I’ve only support only some of the SQL tokens, not all. And these token might not be fully used later but I just implemented in case I implemented their usage later.

## Tokenizer Architecture

 `Tokenizer` class is responsible for converting SQL text into tokens:

```c#
using LiteDatabase.Utils;

namespace LiteDatabase.Sql.Token;

public class Tokenizer {
    private int currentPosition;
    private List<Token> tokens = new List<Token>();
    private string sql;
    private int currentTokenPosition;
    private readonly ILogger<Tokenizer> _logger;

    public Tokenizer(string statement) {
        _logger = Program.LoggerFactory.CreateLogger<Tokenizer>();
        sql = statement;
        currentPosition = 0;
        currentTokenPosition = 0;
        getAllTokens();
    }
}
```

The tokenizer maintains:

- `currentPosition`: Current position in the SQL string
- `tokens`: List of all parsed tokens
- `currentTokenPosition`: Current position when retrieving tokens
- `sql`: The input SQL string

## Main Tokenization Process

The core tokenization happens in `getAllTokens()`:

```c#
private void getAllTokens() {
    while (true) {
        Token t = scanNextToken();
        if (t.Type == TokenType.ILLEGAL) {
            _logger.LogError("Illegal token: {Lexeme} at position {Position}", t.Lexeme, currentPosition);
            throw new InvalidOperationException($"Invalid SQL syntax: illegal token '{t.Lexeme}' at position {currentPosition}");
        }
        tokens.Add(t);
        if (t.Type == TokenType.END) {
            break;
        }
    }
}
```

This method:

1. Continuously scans for the next token
2. Validates each token (throws exception for illegal tokens)
3. Adds valid tokens to the list
4. Stops when reaching the end of input

## Token Scanning Strategy

The `scanNextToken()` method implements a character-based dispatch system:

```c#
private Token scanNextToken() {
    // Skip whitespace
    while (currentPosition < sql.Length && char.IsWhiteSpace(sql[currentPosition])) {
        currentPosition++;
    }
    
    if (currentPosition >= sql.Length) {
        return new Token(TokenType.END, "");
    }
    else if (sql[currentPosition] == '"' || sql[currentPosition] == '\'') {
        return getString();
    }
    else if (char.IsDigit(sql[currentPosition])) {
        return getNumber();
    }
    else if (char.IsLetter(sql[currentPosition]) || sql[currentPosition] == '_') {
        return getWord();
    }
    else {
        return getPunct();
    }
}
```

The scanner:

1. **Skips whitespace** first
2. Dispatches based on first character:
   - Quotes → String literals
   - Digits → Numbers
   - Letters/underscore → Keywords or identifiers
   - Punctuation → Operators and symbols

## String Literal Parsing

String literals are handled by `getString()`:

```c#
private Token getString() {
    char quote = sql[currentPosition];
    int startPos = currentPosition;
    currentPosition++;
    
    while (currentPosition < sql.Length && sql[currentPosition] != quote) {
        currentPosition++;
    }
    
    if (currentPosition < sql.Length && sql[currentPosition] == quote) {
        currentPosition++;
        return new Token(TokenType.STRING_LITERAL, sql.Substring(startPos + 1, currentPosition - startPos - 2));
    }
    return new Token(TokenType.ILLEGAL, sql.Substring(startPos, currentPosition - startPos));
}
```

This method:

- Remembers the opening quote character
- Scans until finding the matching closing quote
- Returns the content between quotes (excluding the quotes themselves)
- Returns ILLEGAL token if no closing quote is found

## Number Parsing

For my project, just for simplicity, I didn’t design different precision for int and float number, I use double for float and int for int. 

The `getNumber()` method handles integer and floating-point numbers, including scientific notation:

```c#
private Token getNumber() {
    bool hasDot = false;
    bool hasExp = false;
    int startPos = currentPosition;
    
    while (currentPosition < sql.Length) {
        char currentChar = sql[currentPosition];
        if (char.IsDigit(currentChar)) {
            currentPosition++;
        }
        else if (currentChar == '.' && !hasDot) {
            currentPosition++;
            hasDot = true;
        }
        else if ((currentChar == 'e' || currentChar == 'E') && !hasExp) {
            hasExp = true;
            currentChar = sql[++ currentPosition];
            if (currentPosition < sql.Length && (currentChar == '+' || currentChar == '-')) {
                currentPosition++;
            }
        }
        else {
            break;
        }
    }

    string number = sql.Substring(startPos, currentPosition - startPos);

    if (int.TryParse(number, out _)) {
        return new Token(TokenType.INT, number);
    }
    else if (decimal.TryParse(number, NumberStyles.Float, CultureInfo.InvariantCulture, out _)) {
        return new Token(TokenType.FLOAT, number);
    }
    else if (double.TryParse(number, NumberStyles.Float, CultureInfo.InvariantCulture, out _)) {
        return new Token(TokenType.FLOAT, number);
    }

    return new Token(TokenType.ILLEGAL, number);
}
```

This sophisticated number parser:

- Handles integers: `123`
- Handles decimals: `123.45`
- Handles scientific notation: `1.23e-4`, `1E+5`
- Uses proper type detection (int vs float)
- Uses invariant culture for consistent parsing

## Keyword and Identifier Recognition

The `getWord()` method processes alphabetic tokens:

```c#
private Token getWord() {
    int startPos = currentPosition;
    while (currentPosition < sql.Length) {
        if (char.IsLetter(sql[currentPosition]) || char.IsDigit(sql[currentPosition]) || sql[currentPosition] == '_') {
            currentPosition++;
        }
        else {
            break;
        }
    }
    string str = sql.Substring(startPos, currentPosition - startPos).ToLower();
    return str switch {
        "select" => new Token(TokenType.SELECT, str),
        "from" => new Token(TokenType.FROM, str),
        "where" => new Token(TokenType.WHERE, str),
        "insert" => new Token(TokenType.INSERT, str),
        "update" => new Token(TokenType.UPDATE, str),
        "delete" => new Token(TokenType.DELETE, str),
        "create" => new Token(TokenType.CREATE, str),
        "table" => new Token(TokenType.TABLE, str),
        // ... many more keywords
        _ => new Token(TokenType.ID, str),
    };
}
```

This method:

- Scans alphanumeric characters and underscores
- Converts to lowercase for case-insensitive keyword matching
- Uses pattern matching to identify SQL keywords
- Defaults to ID (identifier) for non-keywords

## Punctuation and Operator Handling

The `getPunct()` method processes operators and punctuation:

```c#
private Token getPunct() {
    int startPos = currentPosition;
    while (currentPosition < sql.Length && CharUtils.IsPunct(sql[currentPosition])) {
        currentPosition++;
        if (currentPosition - startPos == 1 && (sql[startPos] == '+' || sql[startPos] == '-' ||
                                                sql[startPos] == '*' || sql[startPos] == '/' ||
                                                sql[startPos] == ',' || sql[startPos] == ';' ||
                                                sql[startPos] == '(' || sql[startPos] == ')')) {
            break;
        }
    }
    string str = sql.Substring(startPos, currentPosition - startPos);
    return str switch {
        "+" => new Token(TokenType.PLUS, str),
        "-" => new Token(TokenType.MINUS, str),
        "*" => new Token(TokenType.ASTERISK, str),
        "=" => new Token(TokenType.EQUAL, str),
        ">=" => new Token(TokenType.GREATER_EQUAL_TO, str),
        "<=" => new Token(TokenType.LESS_EQUAL_TO, str),
        "!=" => new Token(TokenType.NOT_EQUAL, str),
        "<>" => new Token(TokenType.NOT_EQUAL, str),
        // ... more operators
        _ => new Token(TokenType.ILLEGAL, str),
    };
}
```

This method handles:

- Single-character operators: `+`, `-`, `*`, `=`
- Multi-character operators: `>=`, `<=`, `!=`, `<>`
- Punctuation: `(`, `)`, `,`, `;`

## Token Retrieval

The `GetNextToken()` method provides sequential access to tokens:

```c#
public Token? GetNextToken() {
    if (currentTokenPosition >= tokens.Count) {
        return new Token(TokenType.END, "");
    }
    return tokens[currentTokenPosition ++];
}
```

## Example Usage

Here's how the tokenizer processes a simple SQL statement:

**Input**: `"SELECT name FROM users WHERE id = 1"`

**Output tokens**:

1. `SELECT` → `TokenType.SELECT`
2. `name` → `TokenType.ID`
3. `FROM` → `TokenType.FROM`
4. `users` → `TokenType.ID`
5. `WHERE` → `TokenType.WHERE`
6. `id` → `TokenType.ID`
7. `=` → `TokenType.EQUAL`
8. `1` → `TokenType.INT`
9. `;` → `TokenType.SEMICOLON`
10.   → `TokenType.END`

## What's Next?

In the next part of this series, we'll explore how these tokens are consumed by the parser to build an Abstract Syntax Tree (AST), transforming the flat token stream into a hierarchical representation of the SQL query's structure.

The tokenizer serves as the foundation for all subsequent processing stages, making its correctness and efficiency crucial for the entire database engine's performance.

## Test

Test file can be found here [Tests/TokenizerTest.cs](https://github.com/DyingDown/LiteDatabase/blob/main/Tests/TokenizerTest.cs)