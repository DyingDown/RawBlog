---
title: 'Database Engine Project: SQL Parser Ⅳ'
date: 2025-09-18 12:47:17
tags: [Parser, Recursive Descent, Syntax Analysis, AST Construction, SQL]
categories: Database Engine Project
postImage: https://cdn.jsdelivr.net/gh/DyingDown/img-host-repo/202509181408825.jpg
description: The parser is the bridge between the flat token sequence from our tokenizer and the hierarchical AST representation that enables semantic analysis and execution.
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
## Introduction

In our previous article, we explored the Abstract Syntax Tree (AST) structure and the BNF grammar that defines our SQL language. Now we'll build the parser that transforms token streams into these AST structures using **recursive descent parsing**.

The parser is the bridge between the flat token sequence from our tokenizer and the hierarchical AST representation that enables semantic analysis and execution.

## Parser Architecture

Our parser follows the **recursive descent** pattern, where each grammar rule maps to a parsing method:

````csharp
class Parser {
    private readonly Tokenizer tokenizer;
    private Token.Token? currentToken;

    public Parser(string sql) {
        tokenizer = new Tokenizer(sql);
        currentToken = tokenizer.GetNextToken();
    }

    private void NextToken() {
        currentToken = tokenizer.GetNextToken();
    }
}
````

The parser maintains a tokenizer as the source of tokens, tracks the current token being examined, and provides a method to advance to the next token.

## Statement-Level Parsing

The top-level parser dispatches to specific statement parsers based on the first token:

````csharp
public SqlNode ParseStatement() {
    var node = currentToken?.Type switch {
        TokenType.CREATE => (SqlNode)ParseCreateTableStatement(),
        TokenType.DROP => (SqlNode)ParseDropTableStatement(),
        TokenType.SELECT => (SqlNode)ParseSelectStatement(),
        TokenType.INSERT => (SqlNode)ParseInsertStatement(),
        TokenType.UPDATE => (SqlNode)ParseUpdateStatement(),
        TokenType.DELETE => (SqlNode)ParseDeleteStatement(),
        _ => throw new Exception($"Unsupported SQL statement: {currentToken?.Lexeme}")
    };
    if (currentToken?.Type != TokenType.SEMICOLON) {
        throw new Exception("SQL statement must end with a semicolon");
    }
    return node;
}
````

**Grammar mapping:**
````bnf
<SQLStatement> ::= <CreateTable> | <DropTable> | <InsertStatement> 
                 | <SelectStatement> | <UpdateStatement> | <DeleteStatement>
````

**Parsing flow:**
1. Examine current token type
2. Dispatch to appropriate statement parser based on token
3. Parse the complete statement
4. Expect and consume semicolon
5. Return the constructed AST node

## CREATE TABLE Parsing

````csharp
private CreateTableNode ParseCreateTableStatement() {
    var node = new CreateTableNode();

    if (currentToken?.Type != TokenType.CREATE) {
        throw new Exception("CREATE TABLE statement must start with CREATE");
    }
    NextToken();

    if (currentToken?.Type != TokenType.TABLE) {
        throw new Exception("CREATE TABLE statement must start with CREATE TABLE");
    }
    NextToken();

    if (currentToken?.Type != TokenType.ID) {
        throw new Exception("CREATE TABLE statement missing table name identifier");
    }
    node.TableName = currentToken.Lexeme;
    NextToken();

    if (currentToken?.Type != TokenType.L_BRACKET) {
        throw new Exception("Missing '(' in CREATE TABLE statement");
    }
    NextToken();

    node.Columns = ParseColumnDefinition();

    if (currentToken?.Type != TokenType.R_BRACKET) {
        throw new Exception("Missing ')' in CREATE TABLE statement");
    }
    NextToken();

    return node;
}
````

**Grammar mapping:**
````bnf
<CreateTable> ::= CREATE TABLE <TableName> L_BRACKET <ColumnDefList> R_BRACKET [SEMICOLON]
<ColumnDefList> ::= <ColumnDef> [COMMA <ColumnDefList>]
<ColumnDef> ::= <ColumnName> <DataType> [<ColumnConstraintList>]
<DataType> ::= INT | FLOAT | VARCHAR [L_BRACKET INT R_BRACKET] | BOOL
````

**Parsing flow:**
1. Expect and consume `CREATE` token
2. Expect and consume `TABLE` token
3. Expect ID token, extract table name, consume token
4. Expect and consume `(` token
5. Call `ParseColumnDefinition()` to parse column list
6. Expect and consume `)` token
7. Return `CreateTableNode `with table name and columns

**Example:** `CREATE TABLE users (id INT PRIMARY KEY, name VARCHAR(50) NOT NULL);`

**Resulting AST:**

```
CreateTableNode
├── TableName: "users"
└── Columns: [
    ├── ColumnDefinition("id", INT, null, [PRIMARY KEY])
    └── ColumnDefinition("name", VARCHAR, 50, [NOT NULL])
]
```

### Column Definition Parsing

````csharp
private List<ColumnDefinition> ParseColumnDefinition() {
    var list = new List<ColumnDefinition>();
    while (true) {
        // column name
        if (currentToken?.Type != TokenType.ID) {
            throw new Exception("Column definition must start with column name");
        }
        string columnName = currentToken.Lexeme;
        NextToken();

        // column data type
        if (currentToken?.Type is not (TokenType.INT or TokenType.FLOAT or TokenType.VARCHAR or TokenType.BOOL)) {
            throw new Exception("Invalid data type for column");
        }
        ColumnType type = currentToken?.Type switch {
            TokenType.INT => ColumnType.Int,
            TokenType.FLOAT => ColumnType.Float,
            TokenType.VARCHAR => ColumnType.String,
            TokenType.BOOL => ColumnType.Bool,
            _ => throw new Exception($"Unsupported column type: {currentToken?.Type}")
        };
        NextToken();
        
        // Handle VARCHAR length
        int? len = null;
        if (type == ColumnType.String && currentToken?.Type == TokenType.L_BRACKET) {
            NextToken();
            if (currentToken?.Type != TokenType.INT)
                throw new Exception("VARCHAR type with length must be an integer");
            len = int.TryParse(currentToken.Lexeme, out int v) ? v : 0;
            NextToken();
            if (currentToken?.Type != TokenType.R_BRACKET)
                throw new Exception("Missing ')' after VARCHAR length");
            NextToken();
        }

        // Parse constraints
        var listCC = new List<ColumnConstraint>();
        while (currentToken?.Type is TokenType.PRIMARY or TokenType.NOT or TokenType.UNIQUE or TokenType.DEFAULT) {
            var constraint = new ColumnConstraint();
            switch (currentToken.Type) {
                case TokenType.PRIMARY:
                    NextToken();
                    if (currentToken?.Type != TokenType.KEY)
                        throw new Exception("PRIMARY must be followed by KEY");
                    constraint.Type = ColumnConstraintType.PrimaryKey;
                    NextToken();
                    break;
                case TokenType.NOT:
                    NextToken();
                    if (currentToken?.Type != TokenType.NULL)
                        throw new Exception("NOT must be followed by NULL");
                    constraint.Type = ColumnConstraintType.NotNull;
                    NextToken();
                    break;
                case TokenType.UNIQUE:
                    constraint.Type = ColumnConstraintType.Unique;
                    NextToken();
                    break;
                case TokenType.DEFAULT:
                    constraint.Type = ColumnConstraintType.Default;
                    NextToken();
                    constraint.Value = currentToken?.Lexeme;
                    NextToken();
                    break;
            }
            listCC.Add(constraint);
        }
        
        list.Add(new ColumnDefinition(columnName, type, len, listCC));
        
        if (currentToken?.Type == TokenType.COMMA) {
            NextToken();
            continue;
        }
        break;
    }
    return list;
}
````

**Grammar mapping:**
````bnf
<ColumnConstraintList> ::= <ColumnConstraint> [<ColumnConstraintList>]
<ColumnConstraint> ::= PRIMARY KEY | NOT NULL | UNIQUE | DEFAULT <Value>
````

**Parsing flow:**
1. Loop through columns until no more commas:
   - Expect ID token, extract column name, consume token
   - Expect data type token (INT/FLOAT/VARCHAR/BOOL), consume token
   - If VARCHAR and next token is `(`, parse length specification
   - Call `ParseColumnConstraints()` to parse constraint list
   - Create `ColumnDefinition `object
   - If next token is comma, consume and continue loop
2. Return list of `ColumnDefinition `objects

### Column Constraints Parsing

**Parsing flow:**
1. Loop while current token is constraint keyword:
   - If `PRIMARY`, expect `KEY`, create `PrimaryKey `constraint
   - If `NOT`, expect `NULL`, create `NotNull `constraint
   - If `UNIQUE`, create Unique constraint
   - If `DEFAULT`, parse value, create Default constraint
2. Return list of `ColumnConstraint `objects

## DROP TABLE Parsing

````csharp
private DropTableNode ParseDropTableStatement() {
    DropTableNode node = new DropTableNode();

    if (currentToken?.Type != TokenType.DROP) {
        throw new Exception("DROP TABLE statement must start with DROP");
    } 
    NextToken();

    if (currentToken?.Type != TokenType.TABLE) {
        throw new Exception("DROP TABLE statement must start with DROP TABLE");
    }
    NextToken();

    while (true) {
        if (currentToken?.Type != TokenType.ID) {
            throw new Exception("DROP TABLE statement must specify table name");
        }
        node.TableNameList.Add(currentToken.Lexeme);
        NextToken();
        if (currentToken?.Type == TokenType.COMMA) {
            NextToken();
            continue;
        }
        break;
    }

    // Remove duplicates
    node.TableNameList = node.TableNameList.Distinct().ToList();
    
    return node;
}
````

**Grammar mapping:**
````bnf
<DropTable> ::= DROP TABLE <TableNameList> [SEMICOLON]
<TableNameList> ::= <TableName> [COMMA <TableNameList>]
````

**Parsing flow:**
1. Expect and consume `DROP` token
2. Expect and consume `TABLE` token
3. Loop through table names:
   - Expect ID token, extract table name, consume token
   - Add table name to list
   - If next token is comma, consume and continue loop
4. Return DropTableNode with table name list

**Example:** `DROP TABLE users, orders;`

**Resulting AST:**
```
DropTableNode
└── TableNameList: ["users", "orders"]
```

## INSERT Statement Parsing

````csharp
private InsertNode ParseInsertStatement() {
    InsertNode node = new InsertNode {
        ColumnNames = []
    };

    if (currentToken?.Type != TokenType.INSERT) {
        throw new Exception("INSERT statement must start with INSERT");
    } 
    NextToken();

    if (currentToken?.Type != TokenType.INTO) {
        throw new Exception("INSERT statement must start with INSERT INTO");
    }
    NextToken();

    if (currentToken?.Type != TokenType.ID) {
        throw new Exception("INSERT statement must specify table name identifier");
    }

    node.TableName = currentToken.Lexeme;
    NextToken();

    // Optional column list
    if (currentToken?.Type == TokenType.L_BRACKET) {
        NextToken();
        while (true) {
            if (currentToken?.Type != TokenType.ID) {
                throw new Exception("Missing column name in INSERT statement");
            }
            node.ColumnNames.Add(currentToken.Lexeme);
            NextToken();
            if (currentToken?.Type == TokenType.COMMA) {
                NextToken();
                continue;
            }
            break;
        }
        if (currentToken?.Type != TokenType.R_BRACKET) {
            throw new Exception("Missing ')' in INSERT statement columns");
        }
        NextToken();
    }

    if (currentToken?.Type != TokenType.VALUES) {
        throw new Exception("Missing 'VALUES' in INSERT statement");
    }
    NextToken();
    
    // Parse values
    while (true) {
        if (currentToken?.Type != TokenType.L_BRACKET) {
            throw new Exception("Missing '(' in INSERT statement values");
        }
        NextToken();
        
        var valuesList = new List<SqlValue>();
        
        while (true) {
            if (currentToken?.Type is not (TokenType.INT or TokenType.FLOAT or 
                TokenType.NULL or TokenType.TRUE or TokenType.FALSE or TokenType.STRING_LITERAL)) {
                throw new Exception("Invalid value type");
            }
            valueList.Add(currentToken?.Type switch {
                TokenType.INT => new SqlValue(ValueType.Int, int.TryParse(currentToken.Lexeme, out int v) ? v : 0),
                TokenType.FLOAT => new SqlValue(ValueType.Float, double.TryParse(currentToken.Lexeme, out double d) ? d : 0.0),
                TokenType.TRUE => new SqlValue(ValueType.True, true),
                TokenType.FALSE => new SqlValue(ValueType.False, false),
                TokenType.STRING_LITERAL => new SqlValue(ValueType.String, currentToken.Lexeme),
                TokenType.NULL => new SqlValue(ValueType.Null, null),
                _ => throw new Exception("Unknown value type")
            });
            NextToken();

            if (currentToken?.Type == TokenType.COMMA) {
                NextToken();
                continue;
            }
            break;
        }
        
        node.Values.Add(valuesList);
        
        if (currentToken?.Type != TokenType.R_BRACKET) {
            throw new Exception("Missing ')' in INSERT statement values");
        }
        NextToken();
        if (currentToken?.Type == TokenType.COMMA) {
            NextToken();
            continue;
        }
        break;
    }

    return node;        
}
````

**Grammar mapping:**
````bnf
<InsertStatement> ::= INSERT INTO <TableName> [L_BRACKET <ColumnList> R_BRACKET] 
                      VALUES L_BRACKET <ValueList> R_BRACKET [SEMICOLON]
<ColumnList> ::= <ColumnName> [COMMA <ColumnList>]
<ValueList> ::= <Value> [COMMA <ValueList>]
<Value> ::= INT | FLOAT | STRING_LITERAL | NULL | TRUE | FALSE
````

**Parsing flow:**
1. Expect and consume `INSERT` token
2. Expect and consume `INTO` token
3. Expect ID token, extract table name, consume token
4. If next token is `(`, parse optional column list:
   - Consume `(` token
   - Loop through column names (expect ID, consume, check for comma)
   - Consume `)` token
5. Expect and consume `VALUES` token
6. Expect and consume `(` token
7. Loop through values:
   - Expect value token (INT/FLOAT/STRING/NULL/TRUE/FALSE)
   - Create SqlValue object based on token type
   - If next token is comma, consume and continue
8. Expect and consume `)` token
9. Return InsertNode with table name, columns, and values

**Example:** `INSERT INTO users (name, age) VALUES ('John', 25);`

**Resulting AST:**
```
InsertNode
├── TableName: "users"
├── ColumnNames: ["name", "age"]
└── Values: [
    ├── SqlValue(String, "John")
    └── SqlValue(Int, 25)
]
```

## UPDATE Statement Parsing

````csharp
private UpdateNode ParseUpdateStatement() {
    UpdateNode node = new UpdateNode();
    if (currentToken?.Type != TokenType.UPDATE) {
        throw new Exception("UPDATE statement must start with UPDATE");
    } 
    NextToken();

    if (currentToken?.Type != TokenType.ID) {
        throw new Exception("UPDATE statement must have a table name");
    }
    node.TableName = currentToken.Lexeme;
    NextToken();

    if (currentToken?.Type != TokenType.SET) {
        throw new Exception("UPDATE statement must be followed by 'SET'");
    } 
    NextToken();

    while (true) {
        if (currentToken?.Type != TokenType.ID) {
            throw new Exception("UPDATE statement assignment must start with column name");
        }
        string columnName = currentToken.Lexeme;
        NextToken();

        if (currentToken?.Type != TokenType.EQUAL) {
            throw new Exception("UPDATE statement assignment must use '=' operator");
        }
        NextToken();

        Expression expr = ParseExpression();
        node.Assigns.Add(new Assign(columnName, expr));

        if (currentToken?.Type == TokenType.COMMA) {
            NextToken();
            continue;
        }
        break;
    }

    if (currentToken?.Type == TokenType.WHERE) {
        NextToken();
        node.WhereClause = ParseExpression();
    }
    return node;
}
````

**Grammar mapping:**
````bnf
<UpdateStatement> ::= UPDATE <TableName> SET <AssignList> [WHERE <Expression>] [SEMICOLON]
<AssignList> ::= <Assign> [COMMA <AssignList>]
<Assign> ::= <ColumnName> EQUAL <Expression>
````

**Parsing flow:**
1. Expect and consume `UPDATE` token
2. Expect ID token, extract table name, consume token
3. Expect and consume `SET` token
4. Loop through assignments:
   - Expect ID token, extract column name, consume token
   - Expect and consume `=` token
   - Call `ParseExpression()` to parse value expression
   - Create Assign object
   - If next token is comma, consume and continue
5. If next token is `WHERE`:
   - Consume `WHERE` token
   - Call `ParseExpression()` to parse WHERE clause
6. Return UpdateNode with table name, assignments, and optional WHERE clause

**Example:** `UPDATE users SET age = 26, name = 'Jane' WHERE id = 1;`

**Resulting AST:**
```
UpdateNode
├── TableName: "users"
├── Assigns: [
│   ├── Assign("age", LiteralExpression(26, Number))
│   └── Assign("name", LiteralExpression("Jane", String))
└── WhereClause: BinaryExpression
    ├── Left: ColumnRefExpression("id")
    ├── Operator: Equal
    └── Right: LiteralExpression(1, Number)
```

## DELETE Statement Parsing

````csharp
private DeleteNode ParseDeleteStatement() {
    DeleteNode node = new DeleteNode();

    if (currentToken?.Type != TokenType.DELETE) {
        throw new Exception("DELETE statement must start with DELETE");
    }
    NextToken();

    if (currentToken?.Type != TokenType.FROM) {
        throw new Exception("DELETE statement must start with DELETE FROM");
    }
    NextToken();

    if (currentToken?.Type != TokenType.ID) {
        throw new Exception("DELETE statement must specify table name");
    }
    node.TableName = currentToken.Lexeme;
    NextToken();

    if (currentToken?.Type == TokenType.WHERE) {
        NextToken();
        node.WhereClause = ParseExpression();
    }
    return node;
}
````

**Grammar mapping:**
````bnf
<DeleteStatement> ::= DELETE FROM <TableName> [WHERE <Expression>] [SEMICOLON]
````

**Parsing flow:**
1. Expect and consume `DELETE` token
2. Expect and consume `FROM` token
3. Expect ID token, extract table name, consume token
4. If next token is `WHERE`:
   - Consume `WHERE` token
   - Call `ParseExpression()` to parse WHERE clause
5. Return DeleteNode with table name and optional WHERE clause

**Example:** `DELETE FROM users WHERE age < 18;`

**Resulting AST:**
```
DeleteNode
├── TableName: "users"
└── WhereClause: BinaryExpression
    ├── Left: ColumnRefExpression("age")
    ├── Operator: LessThan
    └── Right: LiteralExpression(18, Number)
```

## SELECT Statement Parsing

````csharp
private SelectNode ParseSelectStatement() {
    var node = new SelectNode();

    if (currentToken?.Type != TokenType.SELECT) {
        throw new Exception("SELECT statement must start with SELECT");
    }
    NextToken();

    node.SelectList = ParseSelectList();

    if (currentToken?.Type != TokenType.FROM) {
        throw new Exception("Missing FROM clause in SELECT statement");
    }
    NextToken();
    node.TableNamesWithAlias = ParseTableList();

    if (currentToken?.Type == TokenType.WHERE) {
        NextToken();
        node.WhereClause = ParseExpression();
    }

    if (currentToken?.Type == TokenType.GROUP) {
        NextToken();
        if (currentToken?.Type != TokenType.BY) {
            throw new Exception("GROUP must be followed by BY");
        }
        NextToken();
        node.GroupByColumns = ParseGroupByColumns();
    }

    if (currentToken?.Type == TokenType.ORDER) {
        NextToken();
        if (currentToken?.Type != TokenType.BY) {
            throw new Exception("ORDER must be followed by BY");
        }
        NextToken();
        node.OrderItems = ParseOrderBy();
    }
    return node;
}
````

**Grammar mapping:**
````bnf
<SelectStatement> ::= SELECT <SelectList>
                      FROM <TableList>
                      [WHERE <Expression>]
                      [GROUP BY <ColumnList>]
                      [ORDER BY <OrderList>] [SEMICOLON]

<SelectList> ::= ASTERISK | <SelectItem> [COMMA <SelectList>]
<SelectItem> ::= <Expression> [AS <Alias>]
<TableList> ::= <TableName> [AS <Alias>] [COMMA <TableList>]
<OrderList> ::= <OrderItem> [COMMA <OrderList>]
<OrderItem> ::= <ColumnName> [ASC | DESC]
````

**Parsing flow:**
1. Expect and consume `SELECT` token
2. Call `ParseSelectList()` to parse select list
3. Expect and consume `FROM` token
4. Call `ParseTableList()` to parse table list with aliases
5. If next token is `WHERE`:
   - Consume `WHERE` token
   - Call `ParseExpression()` to parse WHERE clause
6. If next token is `GROUP`:
   - Consume `GROUP` token
   - Expect and consume `BY` token
   - Call `ParseGroupByColumns()` to parse GROUP BY columns
7. If next token is `ORDER`:
   - Consume `ORDER` token
   - Expect and consume `BY` token
   - Call `ParseOrderBy()` to parse ORDER BY items
8. Return `SelectNode `with all parsed components

**Example:** `SELECT u.name, COUNT(*) FROM users u WHERE u.age > 18 GROUP BY u.name ORDER BY COUNT(*) DESC;`

**Resulting AST:**
```
SelectNode
├── SelectList: [
│   ├── SelectItem(false, ColumnRefExpression("u", "name"), null)
│   └── SelectItem(false, FunctionCallExpression("COUNT", [StarExpression]), null)
├── TableNamesWithAlias: [("users", "u")]
├── WhereClause: BinaryExpression
│   ├── Left: ColumnRefExpression("u", "age")
│   ├── Operator: GreaterThan
│   └── Right: LiteralExpression(18, Number)
├── GroupByColumns: [ColumnRefExpression("u", "name")]
└── OrderItems: [OrderItem(ColumnRefExpression("COUNT"), DESC)]
```

### Select List Parsing

````csharp
private List<SelectItem> ParseSelectList() {
    var list = new List<SelectItem>();
    while (true) {
        if (currentToken?.Type == TokenType.ASTERISK) {
            list.Add(new SelectItem(true, new StarExpression(null), null));
            NextToken();
        }
        else {
            // Parse complete expression
            var expr = ParseExpression();
            string? aliasName = null;
            
            // Check for AS alias
            if (currentToken?.Type == TokenType.AS) {
                NextToken();
                if (currentToken?.Type != TokenType.ID) {
                    throw new Exception("AS must be followed by an identifier");
                }
                aliasName = currentToken.Lexeme;
                NextToken();
            }
            
            // Check if expression is wildcard *
            bool isWildcard = expr is StarExpression;
            list.Add(new SelectItem(isWildcard, expr, aliasName));
        }
        
        if (currentToken?.Type == TokenType.COMMA) {
            NextToken();
            continue;
        }
        break;
    }
    return list;
}
````

**Parsing flow:**
1. Loop through select items:
   - If current token is `*`, create `SelectItem `with ` isStar=true`
   - Otherwise, call `ParseExpression()` to parse expression
   - If next token is `AS`, parse alias name
   - Create `SelectItem `object
   - If next token is comma, consume and continue
2. Return list of `SelectItem `objects

### Table List Parsing

````csharp
private List<(string, string)> ParseTableList() {
    var list = new List<(string, string)>();
    while (true) {
        if (currentToken?.Type != TokenType.ID) {
            throw new Exception("FROM must be followed by a table name identifier");
        }
        string tableName = currentToken.Lexeme, aliasName = "";
        NextToken();
        if (currentToken?.Type == TokenType.ID) {
            aliasName = currentToken.Lexeme;
            NextToken();
        }
        list.Add((tableName, aliasName));
        if (currentToken?.Type == TokenType.COMMA) {
            NextToken();
            continue;
        }
        break;
    }
    return list;
}
````

**Parsing flow:**
1. Loop through tables:
   - Expect ID token, extract table name, consume token
   - Check for alias (ID token without AS keyword)
   - Add `(tableName, alias)` tuple to list
   - If next token is comma, consume and continue
2. Return list of `(tableName, alias)` tuples

### Group By Columns Parsing

````csharp
private List<ColumnRefExpression> ParseGroupByColumns() {
    var list = new List<ColumnRefExpression>();
    while (true) {
        (string tableName, string columnName) = ParseColumnRef();
        list.Add(new ColumnRefExpression(columnName, tableName));
        if (currentToken?.Type == TokenType.COMMA) {
            NextToken();
            continue;
        }
        break;
    }
    return list;
}

private (string tableName, string columnName) ParseColumnRef() {
    if (currentToken?.Type != TokenType.ID) {
        throw new Exception("Column reference must start with identifier");
    }
    string first = currentToken.Lexeme;
    NextToken();
    if (currentToken?.Type == TokenType.DOT) {
        NextToken();
        if (currentToken?.Type != TokenType.ID)
            throw new Exception("Dot must be followed by column name");
        string second = currentToken.Lexeme;
        NextToken();
        return (first, second); // table.column
    }
    return ("", first); // just column
}
````

**Parsing flow:**
1. Loop through columns:
   - Call `ParseColumnRef()` to parse column (with optional table qualifier)
   - Create `ColumnRefExpression `object
   - If next token is comma, consume and continue
2. Return list of `ColumnRefExpression `objects

### Order By Parsing

````csharp
private List<OrderItem> ParseOrderBy() {
    var list = new List<OrderItem>();
    while (true) {
        (string tableName, string columnName) = ParseColumnRef();
        OrderType orderType = OrderType.ASC;
        if (currentToken?.Type == TokenType.ASC || currentToken?.Type == TokenType.DESC) {
            orderType = currentToken?.Type == TokenType.ASC ? OrderType.ASC : OrderType.DESC;
            NextToken();
        }
        list.Add(new OrderItem(new ColumnRefExpression(columnName, tableName), orderType));
        if (currentToken?.Type == TokenType.COMMA) {
            NextToken();
            continue;
        }
        break;
    }
    return list;
}
````

**Parsing flow:**
1. Loop through order items:
   - Call `ParseColumnRef()` to parse column (with optional table qualifier)
   - Check for optional ASC/DESC keyword (default to ASC)
   - Create `OrderItem `object
   - If next token is comma, consume and continue
2. Return list of `OrderItem `objects

## Expression Parsing

````csharp
private Expression ParseExpression() {
    return ParseOr();
}

private Expression ParseOr() {
    var left = ParseAnd();
    while (currentToken?.Type == TokenType.OR) {
        NextToken();
        var right = ParseAnd();
        left = new BinaryExpression(left, BinaryOperatorType.Or, right);
    }
    return left;
}

private Expression ParseAnd() {
    var left = ParseComparison();
    while (currentToken?.Type == TokenType.AND) {
        NextToken();
        var right = ParseComparison();
        left = new BinaryExpression(left, BinaryOperatorType.And, right);
    }
    return left;
}

private Expression ParseComparison() {
    var left = ParseAddSub();
    
    // Handle BETWEEN operator
    if (currentToken?.Type == TokenType.BETWEEN) {
        NextToken();
        var lowerBound = ParseAddSub();
        if (currentToken?.Type != TokenType.AND) {
            throw new Exception("BETWEEN must be followed by AND");
        }
        NextToken();
        var upperBound = ParseAddSub();
        return new BetweenExpression(left, lowerBound, upperBound);
    }
    
    // Handle IN operator
    if (currentToken?.Type == TokenType.IN) {
        NextToken();
        if (currentToken?.Type != TokenType.L_BRACKET) {
            throw new Exception("IN must be followed by '('");
        }
        NextToken();
        
        var values = new List<Expression>();
        
        // Check if it's a subquery
        if (currentToken?.Type == TokenType.SELECT) {
            var subquery = ParseSelectStatement();
            values.Add(new SubqueryExpression(subquery));
        } else {
            // Parse value list
            while (true) {
                values.Add(ParseExpression());
                if (currentToken?.Type == TokenType.COMMA) {
                    NextToken();
                    continue;
                }
                break;
            }
        }
        
        if (currentToken?.Type != TokenType.R_BRACKET) {
            throw new Exception("Missing ')' in IN expression");
        }
        NextToken();
        return new InExpression(left, values);
    }
    
    // Handle regular comparison operators
    while (currentToken?.Type == TokenType.EQUAL || currentToken?.Type == TokenType.GREATER_THAN ||
          currentToken?.Type == TokenType.LESS_THAN || currentToken?.Type == TokenType.GREATER_EQUAL_TO || 
          currentToken?.Type == TokenType.LESS_EQUAL_TO) {
        var op = currentToken?.Type switch {
            TokenType.EQUAL => BinaryOperatorType.Equal,
            TokenType.LESS_EQUAL_TO => BinaryOperatorType.LessOrEqual,
            TokenType.LESS_THAN => BinaryOperatorType.LessThan,
            TokenType.GREATER_EQUAL_TO => BinaryOperatorType.GreaterOrEqual,
            TokenType.GREATER_THAN => BinaryOperatorType.GreaterThan,
            _ => throw new Exception("Unknown comparison operator")
        };
        NextToken();
        var right = ParseAddSub();
        left = new BinaryExpression(left, op, right);
    }
    return left;
}

private Expression ParseAddSub() {
    var left = ParseMulDiv();
    while (currentToken?.Type == TokenType.PLUS || currentToken?.Type == TokenType.MINUS) {
        var op = currentToken?.Type == TokenType.PLUS ? BinaryOperatorType.Add : BinaryOperatorType.Subtract;
        NextToken();
        var right = ParseMulDiv();
        left = new BinaryExpression(left, op, right);
    }
    return left;
}

private Expression ParseMulDiv() {
    var left = ParsePrimary();
    while (currentToken?.Type == TokenType.ASTERISK || currentToken?.Type == TokenType.DIVISION) {
        var op = currentToken?.Type == TokenType.ASTERISK ? BinaryOperatorType.Multiply : BinaryOperatorType.Divide;
        NextToken();
        var right = ParsePrimary();
        left = new BinaryExpression(left, op, right);
    }
    return left;
}

private Expression ParsePrimary() {
    // Parenthesized expression or subquery
    if (currentToken?.Type == TokenType.L_BRACKET) {
        NextToken();
        if (currentToken?.Type == TokenType.SELECT) {
            var subquery = ParseSelectStatement();
            if (currentToken?.Type != TokenType.R_BRACKET) {
                throw new Exception("Missing ')' for subquery");
            }
            NextToken();
            return new SubqueryExpression(subquery);
        }
        var expr = ParseExpression();
        if (currentToken?.Type != TokenType.R_BRACKET) {
            throw new Exception("Missing ')'");
        }
        NextToken();
        return expr;
    }

    // Unary expressions
    if (currentToken?.Type == TokenType.NOT) {
        NextToken();
        var expr = ParsePrimary();
        return new UnaryExpression(UnaryOperatorType.Not, expr);
    }
    if (currentToken?.Type == TokenType.MINUS) {
        NextToken();
        var expr = ParsePrimary();
        return new UnaryExpression(UnaryOperatorType.Minus, expr);
    }
    if (currentToken?.Type == TokenType.PLUS) {
        NextToken();
        var expr = ParsePrimary();
        return new UnaryExpression(UnaryOperatorType.Plus, expr);
    }

    // Function calls and column references
    if (currentToken?.Type == TokenType.ID || 
        currentToken?.Type == TokenType.COUNT || currentToken?.Type == TokenType.SUM || 
        currentToken?.Type == TokenType.AVG || currentToken?.Type == TokenType.MIN || 
        currentToken?.Type == TokenType.MAX) {
        
        string name = currentToken.Lexeme;
        TokenType currentTokenType = currentToken.Type;

        NextToken();
        var arguments = new List<Expression>();
        
        // Function call
        if (currentToken?.Type == TokenType.L_BRACKET) {
            NextToken(); // consume L_BRACKET
            while (true) {
                // Handle * as special case for functions like COUNT(*)
                if (currentToken?.Type == TokenType.ASTERISK) {
                    arguments.Add(new StarExpression(null));
                    NextToken();
                } else {
                    arguments.Add(ParseExpression());
                }
                
                if (currentToken?.Type == TokenType.COMMA) {
                    NextToken();
                    continue;
                }
                break;
            }
            if (currentToken?.Type != TokenType.R_BRACKET) {
                throw new Exception("Missing ')' for function call");
            }
            NextToken();
            FunctionName funcName = name switch {
                "sum" => FunctionName.Sum,
                "avg" => FunctionName.Avg,
                "count" => FunctionName.Count,
                "min" => FunctionName.Min,
                "max" => FunctionName.Max,
                _ => throw new Exception("Unsupported function")
            };
            return new FunctionCallExpression(funcName, arguments);
        }

        // Only ID tokens can have dot notation for table.column
        if (currentTokenType != TokenType.ID) {
            // Function tokens without parentheses are not valid
            throw new Exception($"Function '{name}' must be followed by parentheses");
        }
        
        // Column reference with table qualifier
        if (currentToken?.Type == TokenType.DOT) {
            NextToken();
            if (currentToken?.Type != TokenType.ID) {
                throw new Exception("Dot must be followed by column name");
            }
            string columnName = currentToken.Lexeme;
            NextToken();
            return new ColumnRefExpression(columnName, name);
        }
        return new ColumnRefExpression(name);
    }
    
    // Literals
    if (currentToken?.Type == TokenType.INT) {
        object value = int.TryParse(currentToken.Lexeme, out var v) ? v : currentToken.Lexeme;
        NextToken();
        return new LiteralExpression(value);
    }
    if (currentToken?.Type == TokenType.FLOAT) {
        object value = double.TryParse(currentToken.Lexeme, out var v) ? v : currentToken.Lexeme;
        NextToken();
        return new LiteralExpression(value);
    }
    if (currentToken?.Type == TokenType.STRING_LITERAL) {
        object value = currentToken.Lexeme;
        NextToken();
        return new LiteralExpression(value);
    }
    
    throw new Exception($"Unable to parse expression, unknown token: {currentToken?.Lexeme}");
}

private void NextToken() {
    currentToken = tokenizer.GetNextToken();
}
````

**Grammar mapping:**
````bnf
<Expression> ::= <OrExpr>
<OrExpr> ::= <AndExpr> [OR <OrExpr>]
<AndExpr> ::= <ComparisonExpr> [AND <AndExpr>]
<ComparisonExpr> ::= <ArithmeticExpr> [<ComparisonOp> <ArithmeticExpr>]
                   | <ArithmeticExpr> [NOT] BETWEEN <ArithmeticExpr> AND <ArithmeticExpr>
                   | <ArithmeticExpr> [NOT] IN L_BRACKET <ValueList> R_BRACKET
<ArithmeticExpr> ::= <Term> [<AddOp> <ArithmeticExpr>]
<Term> ::= <Factor> [<MulOp> <Term>]
<Factor> ::= <PrimaryExpr>
<PrimaryExpr> ::= <Value> | <ColumnRef> | <FunctionCall> | <StarExpr>
                | L_BRACKET <Expression> R_BRACKET | L_BRACKET <SelectStatement> R_BRACKET
````

The expression parser follows a precedence hierarchy:

1. **OR expressions** (lowest precedence)
2. **AND expressions**
3. **Comparison expressions** (=, >, <, BETWEEN, IN, etc.)
4. **Arithmetic expressions** (+, -)
5. **Term expressions** (*, /)
6. **Primary expressions** (highest precedence)

### OR Expression Parsing

**Parsing flow:**
1. Call `ParseAnd()` to parse left operand
2. While current token is `OR`:
   - Consume `OR` token
   - Call `ParseAnd()` to parse right operand
   - Create BinaryExpression with OR operator
   - Set left = new BinaryExpression for next iteration
3. Return final expression

### AND Expression Parsing

**Parsing flow:**
1. Call `ParseComparison()` to parse left operand
2. While current token is `AND`:
   - Consume `AND` token
   - Call `ParseComparison()` to parse right operand
   - Create BinaryExpression with AND operator
   - Set left = new BinaryExpression for next iteration
3. Return final expression

### Comparison Expression Parsing

**Parsing flow:**
1. Call `ParseAddSub()` to parse left operand
2. Check current token:
   - If comparison operator (=, !=, >, <, >=, <=):
     - Consume operator token
     - Call `ParseAddSub()` to parse right operand
     - Return BinaryExpression with comparison operator
   - If `BETWEEN`:
     - Consume `BETWEEN` token
     - Call `ParseAddSub()` to parse lower bound
     - Expect and consume `AND` token
     - Call `ParseAddSub()` to parse upper bound
     - Return BetweenExpression
   - If `IN`:
     - Consume `IN` token
     - Expect and consume `(` token
     - Check if subquery (SELECT) or value list
     - Parse values or subquery
     - Expect and consume `)` token
     - Return InExpression
3. Return left operand if no comparison operator found

### Arithmetic Expression Parsing (Addition/Subtraction)

**Parsing flow:**
1. Call `ParseMulDiv()` to parse left operand
2. While current token is `+` or `-`:
   - Extract operator type
   - Consume operator token
   - Call `ParseMulDiv()` to parse right operand
   - Create BinaryExpression with arithmetic operator
   - Set left = new BinaryExpression for next iteration
3. Return final expression

### Term Expression Parsing (Multiplication/Division)

**Parsing flow:**
1. Call `ParsePrimary()` to parse left operand
2. While current token is `*` or `/`:
   - Extract operator type
   - Consume operator token
   - Call `ParsePrimary()` to parse right operand
   - Create BinaryExpression with term operator
   - Set left = new BinaryExpression for next iteration
3. Return final expression

### Primary Expression Parsing

**Parsing flow:**
1. Check current token type:
   - If `(`: Parse parenthesized expression or subquery
   - If unary operator (NOT/+/-): Parse unary expression
   - If literal (INT/FLOAT/STRING): Create LiteralExpression
   - If ID or function keyword: Determine if function call or column reference
2. For function calls:
   - Consume function name
   - Expect and consume `(` token
   - Parse argument list (handle special case of `*` in COUNT(*))
   - Expect and consume `)` token
   - Return FunctionCallExpression
3. For column references:
   - Extract column name
   - Check for table qualifier (table.column)
   - Return ColumnRefExpression

## Error Handling Strategy

The parser uses **panic mode recovery**:
- **Immediate failure**: Throws exceptions on unexpected tokens
- **Clear messages**: Specific error descriptions with context
- **Graceful degradation**: Could be enhanced with error recovery and continuation

## Example: Complete Parsing Flow

**SQL:** `UPDATE users SET age = age + 1, status = 'active' WHERE id IN (1, 2, 3);`

**Complete parsing flow:**
1. `ParseStatement()` examines first token `UPDATE`
2. Calls `ParseUpdateStatement()`
3. `ParseUpdateStatement()` flow:
   - Consumes `UPDATE` token
   - Extracts table name `users`, consumes token
   - Consumes `SET` token
   - Parses first assignment `age = age + 1`:
     - Extracts column name `age`, consumes token
     - Consumes `=` token
     - Calls `ParseExpression()` which parses `age + 1` as BinaryExpression
   - Sees comma, consumes it
   - Parses second assignment `status = 'active'`:
     - Extracts column name `status`, consumes token
     - Consumes `=` token
     - Calls `ParseExpression()` which parses `'active'` as LiteralExpression
   - Sees `WHERE` token, consumes it
   - Calls `ParseExpression()` to parse `id IN (1, 2, 3)`:
     - Parses `id` as ColumnRefExpression
     - Sees `IN` token, consumes it
     - Parses value list `(1, 2, 3)` as list of LiteralExpressions
     - Creates InExpression
4. Returns UpdateNode with all components

**Resulting AST:**
```
UpdateNode
├── TableName: "users"
├── Assigns: [
│   ├── Assign("age", BinaryExpression(ColumnRef("age"), Add, Literal(1)))
│   └── Assign("status", LiteralExpression("active", String))
└── WhereClause: InExpression
    ├── Expression: ColumnRefExpression("id")
    └── Values: [Literal(1), Literal(2), Literal(3)]
```

## Parser Design Principles

### 1. **Grammar-Driven Structure**
Each parsing method directly corresponds to a grammar rule, making the parser easy to understand and maintain.

### 2. **Predictive Parsing**
The parser uses one-token lookahead to make parsing decisions, enabling efficient linear-time parsing.

### 3. **Left-to-Right Processing**
Tokens are consumed in order, matching the natural reading direction of SQL statements.

### 4. **Hierarchical Expression Handling**
Expression parsing follows operator precedence rules through method call hierarchy.

### 5. **Error Locality**
Errors are detected and reported as soon as invalid syntax is encountered.

## Parser Benefits

1. **Grammar Mapping**: Each parsing method corresponds to a grammar rule
2. **Left-to-Right**: Processes tokens in natural order
3. **Predictive**: Uses lookahead to make parsing decisions
4. **Extensible**: New SQL features require adding new parsing methods
5. **Debuggable**: Call stack mirrors grammar derivation
6. **Performance**: Linear time complexity for most SQL statements

## Performance Considerations

- **Single Pass**: Parser processes each token exactly once
- **Linear Time**: O(n) complexity for most SQL statements
- **Memory Efficient**: Builds AST incrementally without large intermediate structures
- **Minimal Backtracking**: Predictive parsing eliminates most backtracking needs

## What's Next?

In our next article, we'll explore **semantic analysis**:
- Type checking and validation
- Schema verification
- Scope resolution for column references
- Query optimization preparation

The parser transforms syntax into structure; semantic analysis transforms structure into meaning.

## Test

Test file can be found here [Tests/ParserTest.cs](https://github.com/DyingDown/LiteDatabase/blob/main/Tests/ParserTest.cs)