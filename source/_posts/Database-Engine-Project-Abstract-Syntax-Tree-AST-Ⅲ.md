---
title: 'Database Engine Project: Abstract Syntax Tree (AST) Ⅲ'
date: 2025-09-18 11:10:57
tags: [Database, SQL, AST, Syntax Tree, BNF Grammar, Compiler Design]
categories: Database Engine Project
postImage: https://cdn.jsdelivr.net/gh/DyingDown/img-host-repo/202509181429239.png
description: Before we can build a parser, we need to understand what we're parsing toward - the Abstract Syntax Tree (AST).
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

In our previous article, we built a tokenizer that converts SQL text into tokens. Before we can build a parser, we need to understand what we're parsing **toward** - the Abstract Syntax Tree (AST).

An AST is a tree representation of the syntactic structure of source code. Each node represents a construct in the programming language - in our case, SQL constructs like SELECT statements, WHERE clauses, and expressions.

## SQL Grammar Definition

Before designing our AST, let's define the SQL grammar our database engine supports using **Backus-Naur Form (BNF)**:

### Top-Level Statements

```BNF
<SQLStatement> ::= <CreateTable>
                 | <DropTable>
                 | <InsertStatement>
                 | <SelectStatement>
                 | <UpdateStatement>
                 | <DeleteStatement>
```

### CREATE TABLE Grammar

```BNF
<CreateTable> ::= CREATE TABLE <TableName> L_BRACKET <ColumnDefList> R_BRACKET [SEMICOLON]

<ColumnDefList> ::= <ColumnDef> [COMMA <ColumnDefList>]

<ColumnDef> ::= <ColumnName> <DataType> [<ColumnConstraintList>]

<ColumnConstraintList> ::= <ColumnConstraint> [<ColumnConstraintList>]

<ColumnConstraint> ::= PRIMARY KEY
                     | NOT NULL
                     | UNIQUE
                     | DEFAULT <Value>

<DataType> ::= INT
             | FLOAT
             | VARCHAR [L_BRACKET NUMBER R_BRACKET]
```

### DROP TABLE Grammar

```BNF
<DropTable> ::= DROP TABLE <TableNameList> [SEMICOLON]

<TableNameList> ::= <TableName> [COMMA <TableNameList>]
```

### INSERT Statement Grammar

```BNF
<InsertStatement> ::= INSERT INTO <TableName>
                      [L_BRACKET <ColumnList> R_BRACKET]
                      VALUES L_BRACKET <ValueList> R_BRACKET
                      [SEMICOLON]

<ColumnList> ::= <ColumnName> [COMMA <ColumnList>]

<ValueList> ::= <Value> [COMMA <ValueList>]

<Value> ::= NUMBER
          | STRING
          | NULL
          | TRUE
          | FALSE
```

### SELECT Statement Grammar

```BNF
<SelectStatement> ::= SELECT <SelectList>
                      FROM <TableList>
                      [WHERE <Expression>]
                      [GROUP BY <ColumnList>]
                      [ORDER BY <OrderList>]
                      [SEMICOLON]

<SelectList> ::= ASTERISK
               | <SelectItem> [COMMA <SelectList>]

<SelectItem> ::= <ColumnName> [AS <Alias>]
               | <TableName> DOT <ColumnName> [AS <Alias>]
               | <FunctionCall> [AS <Alias>]

<OrderList> ::= <OrderItem> [COMMA <OrderList>]

<OrderItem> ::= <ColumnName> [ASC | DESC]
    
<FunctionCall> ::= <FunctionName> L_BRACKET [<ExpressionList>] R_BRACKET

<ExpressionList> ::= <Expression> [COMMA <ExpressionList>]
```

### UPDATE Statement

```BNF
<UpdateStatement> ::= UPDATE <TableName>
                      SET <AssignList>
                      [WHERE <Expression>]
                      [SEMICOLON]

<AssignList> ::= <Assign> [COMMA <AssignList>]

<Assign> ::= <ColumnName> EQUAL <Expression>
```

### DELETE Statement

```BNF
<DeleteStatement> ::= DELETE FROM <TableName>
                      [WHERE <Expression>]
                      [SEMICOLON]
```

### Expression Grammar (Most Complex)

```BNF
<Expression> ::= <OrExpr>

<OrExpr> ::= <AndExpr> [OR <OrExpr>]

<AndExpr> ::= <ComparisonExpr> [AND <AndExpr>]

<ComparisonExpr> ::= <PrimaryExpr> [<ComparisonOp> <PrimaryExpr>]
                   | <PrimaryExpr> [NOT] BETWEEN <Expression> AND <Expression>
                   | <PrimaryExpr> [NOT] IN L_BRACKET <ValueList> R_BRACKET

<PrimaryExpr> ::= <Value>
                | <ColumnRef>
                | <FunctionCall>
                | L_BRACKET <Expression> R_BRACKET

<ComparisonOp> ::= EQUAL | NOT_EQUAL | GREATER_THAN | LESS_THAN 
                 | GREATER_EQUAL_TO | LESS_EQUAL_TO
```

Note: I didn’t support all the SQL grammar but the most common ones. And I didn’t support `JOIN`, `EXIST` etc.

Base on the structure above, we can now create classes for each `<>`

## AST Node Hierarchy

Based on our grammar, we design a hierarchy of AST nodes:

```Plaintext
├── Ast
    ├── Expressions
        ├── BetweenExpression.cs
        ├── BinaryExpression.cs
        ├── ColumnRefExpression.cs
        ├── Expression.cs
        ├── FunctionCallExpression.cs
        ├── InExpression.cs
        ├── LiteralExpression.cs
        ├── OperatorType.cs
        ├── StarExpression.cs
        ├── SubqueryExpression.cs
        ├── UnaryExpression.cs
    ├── AST Expression.txt
    ├── ColumnDefinitionNode.cs
    ├── CreateTableNode.cs
    ├── DeleteNode.cs
    ├── DropTableNode.cs
    ├── InsertNode.cs
    ├── SelectNode.cs
    ├── SqlNode.cs
    ├── UpdateNode.cs
```

### Base AST Node

Every AST node inherits from `SqlNode` and can represent itself as a string for debugging and pretty-printing.

```c#
namespace LiteDatabase.Sql.Ast;

public abstract class SqlNode {
    public abstract override string ToString();
}
```

### Statement Nodes

Statement nodes represent complete SQL statements:

### CREATE TABLE Node

```c#
namespace LiteDatabase.Sql.Ast;

public class CreateTableNode : SqlNode {
    public string TableName { get; set; } = "";

    public List<ColumnDefinition> Columns { get; set; } = new();

    public override string ToString() => $"CREATE TABLE {TableName} (\n  {string.Join(",\n  ", Columns)}\n)";

}
```

##### Column Definition Structure

Column definitions handle data types and constraints:

```c#
namespace LiteDatabase.Sql.Ast;

public class ColumnDefinition {
    public string ColumnName { get; }
    public ColumnType ColumnType { get; }

    public List<ColumnConstraint>? ColumnConstraints { get; } = new();

    public int? Length { get; }

    public ColumnDefinition(string name, ColumnType type, int? length = null, List<ColumnConstraint>? constraints = null) {
        ColumnName = name;
        ColumnType = type;
        Length = length;
        ColumnConstraints = constraints;
    }

    public override string ToString()
    {
        var constraints = (ColumnConstraints ?? new List<ColumnConstraint>())
            .Select(c =>
            {
                var constraintStr = ColumnConstraintToString(c.Type);
                return c.Value != null ? $"{constraintStr}({c.Value})" : constraintStr;
            });
        
        var typeStr = ColumnTypeToString(ColumnType);
        if (Length.HasValue && ColumnType == ColumnType.String) {
            typeStr += $"({Length})";
        }
        
        return $"{ColumnName} {typeStr} {string.Join(" ", constraints)}".Trim();
    }

    public string ColumnTypeToString(ColumnType type) => type switch {
        ColumnType.Int => "INT",
        ColumnType.Float => "FLOAT",
        ColumnType.String => "VARCHAR",
        ColumnType.Bool => "BOOL",
        _ => "INVALID",
    };

    public string ColumnConstraintToString(ColumnConstraintType type) => type switch {
        ColumnConstraintType.PrimaryKey => "Primary Key",
        ColumnConstraintType.Unique => "Unique",
        ColumnConstraintType.NotNull => "Not Null",
        ColumnConstraintType.Default => "Default",
        _ => "Invalid",
    };
}

public enum ColumnType {
    Int,
    Float,
    String,
    Bool,
}

public class ColumnConstraint {
    public ColumnConstraintType Type { get; set; }
    public object? Value { get; set; } // 用于保存 DEFAULT 的值

    public ColumnConstraint(ColumnConstraintType type, object? value = null) {
        Type = type;
        Value = value;
    }

    public ColumnConstraint() {

    }
}

public enum ColumnConstraintType {
    PrimaryKey,
    NotNull,
    Unique,
    Default,
}
```

**Maps to grammar:** `CREATE TABLE users (id INT PRIMARY KEY, name VARCHAR(50))`

**AST Structure:**

```
CreateTableNode
├── TableName: "users"
└── Columns: [
    ├── ColumnDefinition("id", INT, [PRIMARY KEY])
    └── ColumnDefinition("name", VARCHAR(50), [])
]
```

### SELECT Node

```c#
using LiteDatabase.Sql.Ast.Expressions;
namespace LiteDatabase.Sql.Ast;

public class SelectNode : SqlNode {
    public List<SelectItem> SelectList { get; set; } = [];
    public List<(string, string)> TableNamesWithAlias { get; set; } = [];
    public Expression? WhereClause { get; set; } = null;

    public List<ColumnRefExpression> GroupByColumns { get; set; } = [];
    public List<OrderItem> OrderItems { get; set; } = [];

    public override string ToString()
    {
        return $"""
SELECT
  {string.Join(", ", SelectList.Select(item =>
    item.IsStar ? "*" : $"{item.Expr}" + (string.IsNullOrEmpty(item.AliasName) ? "" : $" AS {item.AliasName}")
  ))}
FROM {string.Join(", ", TableNamesWithAlias.Select(t =>
    string.IsNullOrEmpty(t.Item2) ? t.Item1 : $"{t.Item1} AS {t.Item2}"
))}
{(WhereClause != null ? $"WHERE {WhereClause}" : "")}
{(GroupByColumns.Count > 0 ? $"GROUP BY {string.Join(", ", GroupByColumns)}" : "")}
{(OrderItems.Count > 0 ? $"ORDER BY {string.Join(", ", OrderItems.Select(o => $"{o.ColumnRef.ColumnName} {o.OrderType}"))}" : "")}
""".Trim();
    }
}

public class SelectItem {
    public Expression? Expr { get; }
    public string? AliasName { get; }
    public bool IsStar { get; }

    public SelectItem(bool isStar, Expression? expr, string? aliasName = "") {
        Expr = expr;
        AliasName = aliasName;
        IsStar = isStar;
    }

}

public class OrderItem {
    public ColumnRefExpression ColumnRef { get; }
    public OrderType OrderType { get; }
    public OrderItem(ColumnRefExpression columnRef, OrderType type) {
        ColumnRef = columnRef;
        OrderType = type;
    }
}

public enum OrderType {
    ASC,
    DESC,
}
```

**Maps to grammar:** `SELECT name, age FROM users WHERE age > 18 ORDER BY name ASC`

**AST Structure:**

```
SelectNode
├── SelectList: [
│   ├── SelectItem(ColumnRefExpression("name"))
│   └── SelectItem(ColumnRefExpression("age"))
├── TableNames: [("users", "")]
├── WhereClause: BinaryExpression
│   ├── Left: ColumnRefExpression("age")
│   ├── Operator: GREATER_THAN
│   └── Right: LiteralExpression(18)
└── OrderItems: [OrderItem(ColumnRef("name"), ASC)]
```

### INSERT Statement Node

```C#
namespace LiteDatabase.Sql.Ast;

public class InsertNode : SqlNode {
    public string TableName { get; set; } = "";
    public List<string>? ColumnNames { get; set; } = [];
    public List<SqlValue> Values { get; set; } = [];

    public override string ToString() {
        var columnsStr = ColumnNames?.Count > 0 
            ? $"({string.Join(", ", ColumnNames)}) " 
            : "";
        var valuesStr = string.Join(", ", Values.Select(v => v.ToString()));
        return $"INSERT INTO {TableName} {columnsStr}VALUES ({valuesStr})";
    }
}

public enum ValueType {
    String,
    Null,
    True,
    False,
    Int,
    Float,
}

public class SqlValue {
    public ValueType Type { get; }
    public object? Value { get; }
    
    public SqlValue(ValueType type, object? value) {
        Type = type;
        Value = value;
    }
    
    public override string ToString() => Type switch {
        ValueType.String => $"'{Value}'",
        ValueType.Null => "NULL",
        ValueType.True => "TRUE",
        ValueType.False => "FALSE",
        ValueType.Int => Value?.ToString() ?? "0",
        ValueType.Float => Value?.ToString() ?? "0.0",
        _ => Value?.ToString() ?? ""
    };
}
```

**Maps to grammar:** `INSERT INTO users (name, age, email) VALUES ('John', 25, 'john@email.com')`

**AST Structure:**

```
InsertNode
├── TableName: "users"
├── ColumnNames: ["name", "age", "email"]
└── Values: [
    ├── SqlValue(String, "John")
    ├── SqlValue(Int, 25)
    └── SqlValue(String, "john@email.com")
]
```

### UPDATE Statement Node

```C#
using LiteDatabase.Sql.Ast.Expressions;
namespace LiteDatabase.Sql.Ast;

public class UpdateNode : SqlNode {
    public string TableName { get; set; } = "";
    public List<Assign> Assigns { get; set; } = [];
    public Expression? WhereClause { get; set; } = null;

    public override string ToString()
    {
        var assignsStr = string.Join(", ", Assigns.Select(a => $"{a.ColumnName} = {a.Expression}"));
        var whereStr = WhereClause != null ? $" WHERE {WhereClause}" : "";
        return $"UPDATE {TableName} SET {assignsStr}{whereStr}";
    }
}

public class Assign {
    public string ColumnName { get; }
    public Expression Expression { get; }

    public Assign(string name, Expression expression) {
        ColumnName = name;
        Expression = expression;
    }
}
```

**Maps to grammar:** `UPDATE users SET age = 26, email = 'newemail@test.com' WHERE id = 1`

**AST Structure:**

```
UpdateNode
├── TableName: "users"
├── Assigns: [
│   ├── Assign("age", LiteralExpression(26, Int))
│   └── Assign("email", LiteralExpression("newemail@test.com", String))
└── WhereClause: BinaryExpression
    ├── Left: ColumnRefExpression("id")
    ├── Operator: EQUAL
    └── Right: LiteralExpression(1, Int)
```

### DELETE Statement Node

```c#
using LiteDatabase.Sql.Ast.Expressions;
namespace LiteDatabase.Sql.Ast;

public class DeleteNode : SqlNode {
    public string TableName { get; set; } = "";
    public Expression? WhereClause { get; set; } = null;

    public override string ToString() {
        var whereStr = WhereClause != null ? $" WHERE {WhereClause}" : "";
        return $"DELETE FROM {TableName}{whereStr}";
    }
}
```

**Maps to grammar:** `DELETE FROM users WHERE age < 18`

**AST Structure:**

```
DeleteNode
├── TableName: "users"
└── WhereClause: BinaryExpression
    ├── Left: ColumnRefExpression("age")
    ├── Operator: LESS_THAN
    └── Right: LiteralExpression(18, Number)
```

### DROP TABLE Statement Node

```c#
namespace LiteDatabase.Sql.Ast;

public class DropTableNode : SqlNode {
    public List<string> TableNameList { get; set; } = new();

    public override string ToString() => $"DROP TABLE {string.Join(", ", TableNameList)}";
    
}
```

**Maps to grammar:** `DROP TABLE users, orders, products`

**AST Structure:**

```
DropTableNode
└── TableNameList: ["users", "orders", "products"]
```

### Expression Nodes

Expressions are the most complex part of our AST, forming their own hierarchy:

#### Base Expression

```c#
namespace LiteDatabase.Sql.Ast.Expressions;

public abstract class Expression {
    public abstract override string ToString();
}
```

#### Unary Expression

```c#
namespace LiteDatabase.Sql.Ast.Expressions;

public class UnaryExpression : Expression {
    
    public UnaryOperatorType Operator { get; }
    public Expression Operand { get; }

    public UnaryExpression(UnaryOperatorType op, Expression operand) {
        Operator = op;
        Operand = operand;
    }

    public override string ToString() => $"{OperatorToSql(Operator)} {Operand}";

    private string OperatorToSql(UnaryOperatorType op) => op switch {
        UnaryOperatorType.Not => "NOT",
        UnaryOperatorType.Plus => "+",
        UnaryOperatorType.Minus => "-",
        _ => throw new NotImplementedException()
    };
}
```

#### Binary Expressions

Binary expressions handle operators like `AND`, `OR`, `=`, `>`, etc.:

```c#
namespace LiteDatabase.Sql.Ast.Expressions;

public class BinaryExpression : Expression {
    public Expression Left { get; }
    public BinaryOperatorType Operator { get; }
    public Expression Right { get; }
    public BinaryExpression(Expression left, BinaryOperatorType Operator, Expression right) {
        Left = left;
        this.Operator = Operator;
        Right = right;
    }

    public override string ToString() => $"({Left} {Operator.ToSqlString()} {Right})";
}
```

##### **Operator Types for Binary & Unary Expressions**

```c#
namespace LiteDatabase.Sql.Ast.Expressions;


public enum BinaryOperatorType {
    Equal,
    And,
    Or,
    LessThan,
    LessOrEqual,
    Between,
    GreaterOrEqual,
    GreaterThan,
    NotEqual,
    Like,
    In,
    Is,
    IsNot,
    Add,     
    Subtract, 
    Multiply, 
    Divide
}

public enum UnaryOperatorType {
    Not,
    Plus,
    Minus
}

public static class OperatorTypeExtensions {
    public static string ToSqlString(this BinaryOperatorType op) => op switch {
        BinaryOperatorType.Equal => "=",
        BinaryOperatorType.NotEqual => "!=",
        BinaryOperatorType.And => "AND",
        BinaryOperatorType.Or => "OR",
        BinaryOperatorType.LessThan => "<",
        BinaryOperatorType.LessOrEqual => "<=",
        BinaryOperatorType.GreaterThan => ">",
        BinaryOperatorType.GreaterOrEqual => ">=",
        BinaryOperatorType.Between => "BETWEEN",
        BinaryOperatorType.Like => "LIKE",
        BinaryOperatorType.In => "IN",
        BinaryOperatorType.Is => "IS",
        BinaryOperatorType.IsNot => "IS NOT",
        BinaryOperatorType.Add => "+",
        BinaryOperatorType.Subtract => "-",
        BinaryOperatorType.Multiply => "*",
        BinaryOperatorType.Divide => "/",
        _ => op.ToString()
    };
}
```

#### Column Reference Expressions

```c#
namespace LiteDatabase.Sql.Ast.Expressions;

public class ColumnRefExpression : Expression {
    public string? TableName { get; }
    public string ColumnName { get; }
    public ColumnRefExpression(string columnName, string? tableName = null) {
        ColumnName = columnName;
        TableName = tableName;
    }

    public override string ToString() => TableName == null ? ColumnName : $"{TableName}.{ColumnName}";
}
```

#### Literal Expressions

```c#
namespace LiteDatabase.Sql.Ast.Expressions;

public class LiteralExpression : Expression {
    public object Value { get; }
    public LiteralExpression(object value) {
        Value = value;
    }
    public override string ToString() {
        if (Value == null) return "NULL";
        if (Value is string) return $"'{Value}'";
        if (Value is bool b) return b ? "TRUE" : "FALSE";
        return Value.ToString() ?? "NULL";
    }
}
```

#### Special Expressions

**BETWEEN Expression:**

```c#
namespace LiteDatabase.Sql.Ast.Expressions;

/// <summary>
/// eg: age BETWEEN 18 AND 65
/// </summary>
public class BetweenExpression : Expression {
    public Expression Expression { get; }
    public Expression LowerBound { get; }
    public Expression UpperBound { get; }
    
    public BetweenExpression(Expression expression, Expression lowerBound, Expression upperBound) {
        Expression = expression;
        LowerBound = lowerBound;
        UpperBound = upperBound;
    }
    
    public override string ToString() {
        return $"{Expression} BETWEEN {LowerBound} AND {UpperBound}";
    }
}
```

##### **IN Expression:**

```c#
namespace LiteDatabase.Sql.Ast.Expressions;

/// <summary>
/// eg: id IN (1, 2, 3) 或 id IN (SELECT id FROM table)
/// </summary>
public class InExpression : Expression {
    public Expression Expression { get; }
    public List<Expression> Values { get; }
    
    public InExpression(Expression expression, List<Expression> values) {
        Expression = expression;
        Values = values;
    }
    
    public override string ToString() {
        var valuesList = string.Join(", ", Values.Select(v => v.ToString()));
        return $"{Expression} IN ({valuesList})";
    }
}
```

##### **Function Call Expression:**

```c#
namespace LiteDatabase.Sql.Ast.Expressions;

public class FunctionCallExpression : Expression {
    public FunctionName FunctionName { get; }

    public List<Expression> Arguments { get; }

    public FunctionCallExpression(FunctionName functionName, List<Expression> arguments) {
        FunctionName = functionName;
        Arguments = arguments;
    }

    public override string ToString() => $"{FunctionNameToString(FunctionName)}({string.Join(", ", Arguments)})";

    private string FunctionNameToString(FunctionName func) => func switch {
        FunctionName.Sum => "SUM",
        FunctionName.Count => "COUNT",
        FunctionName.Avg => "AVG",
        FunctionName.Min => "MIN",
        FunctionName.Max => "MAX",
        _ => func.ToString().ToUpper(),
    };
}

public enum FunctionName {
    Sum,
    Count,
    Avg,
    Min,
    Max
}
```

##### **Star Expressions**

```c#
namespace LiteDatabase.Sql.Ast.Expressions;

public class StarExpression : Expression {

    public string? TableName { get; }

    public StarExpression(string? tableName) {
        TableName = tableName;
    }
    public override string ToString() => TableName == null ? "*": $"{TableName}.*";
}
```

#### Subquery Expression

```c#
namespace LiteDatabase.Sql.Ast.Expressions;

public class SubqueryExpression : Expression {
    public SelectNode Subquery { get; }
    public SubqueryExpression(SelectNode subquery) {
        Subquery = subquery;
    }
    public override string ToString() => $"({Subquery})";
}
```

## AST Design Principles

### 1. **Composability**

Each node can contain other nodes, allowing complex nested structures:

```
// WHERE (age > 18 AND name LIKE 'John%') OR status = 'active'
BinaryExpression(
    left: BinaryExpression(
        left: BinaryExpression(age > 18),
        operator: AND,
        right: BinaryExpression(name LIKE 'John%')
    ),
    operator: OR,
    right: BinaryExpression(status = 'active')
)
```

### 2. **Type Safety**

Each node type represents a specific SQL construct, preventing invalid combinations at compile time.

### 3. **Immutability**

Most properties are read-only after construction, making the AST safe for concurrent access.

### 4. **Self-Describing**

Every node can represent itself as SQL text via `ToString()`.

## Example: Complete AST for Complex Query

**SQL:** `SELECT u.name, COUNT(*) FROM users u WHERE u.age BETWEEN 18 AND 65 GROUP BY u.name ORDER BY COUNT(*) DESC`

**AST Structure:**

```
SelectNode
├── SelectList: [
│   ├── SelectItem(ColumnRefExpression("u", "name"))
│   └── SelectItem(FunctionCallExpression("COUNT", [StarExpression]))
├── TableNames: [("users", "u")]
├── WhereClause: BetweenExpression
│   ├── Expression: ColumnRefExpression("u", "age")
│   ├── LowerBound: LiteralExpression(18, Number)
│   └── UpperBound: LiteralExpression(65, Number)
├── GroupByColumns: [ColumnRefExpression("u", "name")]
└── OrderItems: [OrderItem(FunctionCallExpression("COUNT", [Star]), DESC)]
```

## AST Benefits

1. **Language Independence**: AST abstracts away SQL syntax details
2. **Optimization Ready**: Tree structure enables easy transformation and optimization
3. **Validation Support**: Type system catches many errors at compile time
4. **Extensibility**: New SQL features map to new node types
5. **Tool Support**: AST enables IDE features, formatters, and analyzers

## What's Next?

In my next article, we'll explore how to build these AST structures from tokens using a **recursive descent parser**. We'll see how each grammar rule maps to parsing methods that construct the appropriate AST nodes.

The AST serves as the foundation for all subsequent phases: semantic analysis, optimization, and execution planning.

