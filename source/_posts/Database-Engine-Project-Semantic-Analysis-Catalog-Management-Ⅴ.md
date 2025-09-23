---
title: 'Database Engine Project: Semantic Analysis & Catalog Management Ⅴ'
date: 2025-09-23 15:51:46
tags: [Semantic Analysis, Visitor Pattern, SQL, Catalog Manager, Function Management]
categories: Database Engine Project
postImage: https://cdn.jsdelivr.net/gh/DyingDown/img-host-repo/202509231911190.png
description: After we build the AST Tree, we now need to validate SQL statement to make sure it can actual runs.
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

Welcome back to our database engine series! In the previous articles, we've built a solid foundation:

- **Part 1**: [SQL Tokenizer](https://dyingdown.github.io/2025/09/18/Database-Engine-Project-SQL-Tokenizer-%E2%85%A1/) - Breaking SQL text into meaningful tokens
- **Part 2**: [AST Construction](https://dyingdown.github.io/2025/09/18/Database-Engine-Project-Abstract-Syntax-Tree-AST-%E2%85%A2/) - Building Abstract Syntax Trees  
- **Part 3**: [SQL Parser](https://dyingdown.github.io/2025/09/18/Database-Engine-Project-SQL-Parser-%E2%85%A3/) - Converting tokens into structured ASTs

Now it's time to add intelligence to our database engine. Having an AST is great, but we need to ensure it makes sense semantically. Can we actually execute this query? Do the referenced tables and columns exist? Are the types compatible?

In this article, we'll build several critical components organized into a clean architecture:

1. **Catalog Manager** - The "brain" that remembers what tables, columns, and functions exist
2. **Semantic Analysis Package** - A well-structured module containing:
   - `SemanticAnalyzer.cs` - The main validator that ensures SQL queries are meaningful
   - `ExpressionType.cs` - Type system definitions for scalars, row sets, and unknowns
   - `ExpressionTypeInferrer.cs` - The smart engine that automatically determines expression types

## Architecture

In earlier iterations, semantic analysis was handled by a single monolithic file. As our database engine grew more sophisticated, we refactored it into a clean package structure:

```
Sql/Semantic/
├── SemanticAnalyzer.cs      # Main validation logic using Visitor pattern
├── ExpressionType.cs        # Type system: Scalar, RowSet, Unknown types  
└── ExpressionTypeInferrer.cs # Automatic type inference for expressions
```

**Why the refactor?**
- **Separation of Concerns**: Each file has a single, clear responsibility
- **Better Maintainability**: Easier to modify type inference without touching validation logic
- **Extensibility**: Adding new expression types or validation rules is much cleaner
- **Testability**: Each component can be tested independently

This modular approach makes our semantic analysis system both powerful and maintainable.

By the end of this article, our database engine will be able to catch errors like:
- `SELECT name FROM nonexistent_table` ❌ 
- `SELECT age + "hello"` ❌ (can't add number and string)
- `SELECT COUNT(name, age)` ❌ (COUNT takes only one argument)

Let's explore each component!

## Schema Catalog

Think of the Catalog Manager as the database's "memory system." Just like how we remember what friends we have and their phone numbers, our database needs to remember what tables exist, what columns they have, and what functions are available.

### Why Do We Need a Catalog?

Consider this simple query:
```sql
SELECT name, age FROM users WHERE age > 18;
```

To validate this query, we need to answer:
- ✅ Does the `users` table exist?
- ✅ Does `users` have `name` and `age` columns?
- ✅ What type is the `age` column? (to validate `age > 18`)

Without a catalog, our database would be like a librarian with amnesia - unable to help anyone find anything!

### Catalog Manager Architecture

Let's start with the interface that defines what our catalog should do:

```csharp
public interface ICatalogManager {
    // Table schema management
    void CreateTable(string tableName, List<ColumnDefinition> columns);
    void DropTable(string tableName);
    bool TableExists(string tableName);
    Dictionary<string, ColumnDefinition> GetTableColumns(string tableName);
    TableSchema GetTable(string tableName);

    // Table ID management (for storage layer)
    int GetTableId(string tableName);
    string GetTableName(int tableId);
    
    // Function registry
    bool FunctionExists(string functionName);
    FunctionDefinition? GetFunction(string functionName);
    void RegisterFunction(FunctionDefinition function);
    IEnumerable<FunctionDefinition> GetAllFunctions();
}
```

Now let's implement it:

```csharp
public class CatalogManager : ICatalogManager {
    // Table name mapping (case-insensitive for SQL compliance)
    private readonly Dictionary<string, int> tableNameToId = new(StringComparer.OrdinalIgnoreCase);
    private readonly Dictionary<int, string> tableIdToName = new();
    
    // Schema storage
    private readonly Dictionary<string, TableSchema> tables = new(StringComparer.OrdinalIgnoreCase);
    
    // Function registry
    private readonly Dictionary<string, FunctionDefinition> functions = new(StringComparer.OrdinalIgnoreCase);
    
    private int nextTableId = 1;
    
    public CatalogManager() {
        RegisterBuiltinFunctions();  // We'll add SQL functions like COUNT, SUM, etc.
    }
}
```

**Key Design Decisions:**
- **Case-insensitive lookups**: SQL is traditionally case-insensitive for identifiers
- **Table ID mapping**: Useful for storage layer optimizations
- **Function registry**: Built-in and user-defined functions in one place

### Table Management Operations

```csharp
public void CreateTable(string tableName, List<ColumnDefinition> columns) {
    if (tableNameToId.ContainsKey(tableName))
        throw new Exception($"Table '{tableName}' already exists.");

    int id = nextTableId++;
    tableNameToId[tableName] = id;
    tableIdToName[id] = tableName;
    tables[tableName] = new TableSchema(id, tableName, columns);
}

public void DropTable(string tableName) {
    if (!tableNameToId.ContainsKey(tableName)) {
        throw new Exception($"Table '{tableName}' does not exist.");
    }
    int id = tableNameToId[tableName];
    tableIdToName.Remove(id);
    tableNameToId.Remove(tableName);
    tables.Remove(tableName);
}

public Dictionary<string, ColumnDefinition> GetTableColumns(string tableName) {
    if (!tableNameToId.ContainsKey(tableName)) {
        throw new Exception($"Table '{tableName}' does not exist.");
    }
    return tables[tableName].Columns;
}
```

### Schema Storage Structure

```csharp
public class TableSchema {
    public int TableId { get; }
    public string TableName { get; }
    public Dictionary<string, ColumnDefinition> Columns { get; }

    public TableSchema(int tableId, string tableName, IEnumerable<ColumnDefinition> columns) {
        TableId = tableId;
        TableName = tableName;
        Columns = new Dictionary<string, ColumnDefinition>(StringComparer.OrdinalIgnoreCase);

        foreach (var col in columns) {
            Columns[col.ColumnName] = col;
        }
    }
}
```

### Function Registry System

Our database needs to know about SQL functions like `COUNT`, `SUM`, `AVG`, etc. Let's build a flexible function registry:

```csharp
public class FunctionParameter {
    public string Name { get; set; }
    public List<ColumnType> AcceptedTypes { get; set; }
    public bool IsOptional { get; set; }
    
    // Factory methods for common parameter patterns
    public static FunctionParameter NumericType(string name, bool isOptional = false) {
        return new FunctionParameter(name, new List<ColumnType> { ColumnType.Int, ColumnType.Float }, isOptional);
    }
    
    public static FunctionParameter ComparableType(string name, bool isOptional = false) {
        return new FunctionParameter(name, new List<ColumnType> { 
            ColumnType.Int, ColumnType.Float, ColumnType.String 
        }, isOptional);
    }
    
    public static FunctionParameter AnyType(string name, bool isOptional = false) {
        return new FunctionParameter(name, new List<ColumnType> { 
            ColumnType.Int, ColumnType.Float, ColumnType.String, ColumnType.Bool 
        }, isOptional);
    }
    
    public bool AcceptsType(ColumnType type) {
        return AcceptedTypes.Contains(type);
    }
}
```

```csharp
public class FunctionDefinition {
    public string Name { get; }
    public IReadOnlyList<FunctionParameter> Parameters { get; }
    public ColumnType ReturnType { get; }
    public bool IsAggregate { get; }
    public bool AcceptsStarArgument { get; } // For COUNT(*)
    
    // Constructor for functions with parameters
    public FunctionDefinition(string name, List<FunctionParameter> parameters, ColumnType returnType, 
                            bool isAggregate = false, bool acceptsStarArgument = false) {
        Name = name;
        Parameters = parameters.AsReadOnly();
        ReturnType = returnType;
        IsAggregate = isAggregate;
        AcceptsStarArgument = acceptsStarArgument;
    }
    
    // Constructor for single-parameter functions (common case)
    public FunctionDefinition(string name, FunctionParameter parameter, ColumnType returnType, 
                            bool isAggregate = false, bool acceptsStarArgument = false) 
        : this(name, new List<FunctionParameter> { parameter }, returnType, isAggregate, acceptsStarArgument) {
    }
    
    // Special factory for COUNT function (accepts * and any type)
    public static FunctionDefinition CreateCountFunction() {
        return new FunctionDefinition(
            "COUNT", 
            new List<FunctionParameter> {
                FunctionParameter.AnyType("expression", isOptional: true)
            },
            ColumnType.Int, 
            isAggregate: true, 
            acceptsStarArgument: true
        );
    }
}
```

### Registering Built-in Functions

```csharp
private void RegisterBuiltinFunctions() {
    // COUNT - special function accepting any type and * parameter
    RegisterFunction(FunctionDefinition.CreateCountFunction());
    
    // SUM - accepts numeric types, returns numeric
    RegisterFunction(new FunctionDefinition(
        "SUM", 
        FunctionParameter.NumericType("expression"), 
        ColumnType.Int, 
        isAggregate: true
    ));
    
    // AVG - accepts numeric types, returns Float
    RegisterFunction(new FunctionDefinition(
        "AVG", 
        FunctionParameter.NumericType("expression"), 
        ColumnType.Float, 
        isAggregate: true
    ));
    
    // MIN/MAX - accept comparable types
    RegisterFunction(new FunctionDefinition(
        "MIN", 
        FunctionParameter.ComparableType("expression"), 
        ColumnType.Int, 
        isAggregate: true
    ));
    
    RegisterFunction(new FunctionDefinition(
        "MAX", 
        FunctionParameter.ComparableType("expression"), 
        ColumnType.Int, 
        isAggregate: true
    ));
}
```

## Expression Type System

Before we can validate queries, we need a way to represent and work with different types of expressions. SQL has some interesting type complexities:

- **Scalar values**: `42`, `"hello"`, `age + 5`
- **Row sets**: `SELECT name FROM users` (returns multiple rows)
- **Unknown types**: Sometimes we can't figure out the type!

### Type Hierarchy

```csharp
public enum TypeKind { Scalar, RowSet, Unknown }

public class ExpressionType {
    public TypeKind Kind { get; set; }
    public ColumnType? BaseType { get; set; }      // For scalar types (INT, FLOAT, STRING, BOOL)
    public bool IsNullable { get; set; }           // Can this be NULL?
    public IReadOnlyList<ExpressionType>? RowSchema { get; set; }  // For subquery results
    
    // Factory methods for easy creation
    public static ExpressionType Scalar(ColumnType baseType, bool isNullable) {
        return new ExpressionType { 
            Kind = TypeKind.Scalar, 
            BaseType = baseType, 
            IsNullable = isNullable 
        };
    }
    
    public static ExpressionType RowSet(IReadOnlyList<ExpressionType> schema) {
        return new ExpressionType { 
            Kind = TypeKind.RowSet, 
            RowSchema = schema 
        };
    }
    
    public static ExpressionType Unknown() {
        return new ExpressionType { 
            Kind = TypeKind.Unknown, 
            BaseType = null, 
            IsNullable = true 
        };
    }
}
```

**Examples:**
- `42` → `Scalar(Int, false)`
- `"hello"` → `Scalar(String, false)`
- `SELECT name FROM users` → `RowSet([Scalar(String, true)])`
- Invalid expression → `Unknown()`

This type system is defined in `ExpressionType.cs` and forms the foundation for our type inference engine.

## Semantic Analyzer

Now that we have our catalog to store schema information and our type system to represent expression types, let's explore the semantic analysis package. This is where the magic happens - we traverse our AST and validate that everything makes semantic sense.

### Component Overview

Our semantic analysis is now cleanly organized into three specialized files:

#### 1. `SemanticAnalyzer.cs` - The Main Validator
The core validation engine that implements the Visitor pattern to traverse AST nodes and validate:
- Table and column existence
- Type compatibility for operations
- Function call validation
- Expression semantic correctness

#### 2. `ExpressionType.cs` - The Type Foundation  
Defines our three-tier type system with factory methods for easy type creation:
- `Scalar` types for single values
- `RowSet` types for subquery results  
- `Unknown` types for inference failures

#### 3. `ExpressionTypeInferrer.cs` - The Smart Detective
The automatic type inference engine that determines result types for:
- Binary and unary expressions
- Function calls with special handling for aggregates
- Column references with nullability tracking
- Complex subquery expressions

### The Visitor Pattern Approach

Our semantic analyzer in `SemanticAnalyzer.cs` implements the visitor pattern to traverse AST nodes:

```csharp
class SemanticAnalyzer : IVisitor {
    private readonly ICatalogManager catalog;
    private Dictionary<string, Dictionary<string, ColumnDefinition>> _currentTableSchemas = new();

    public SemanticAnalyzer(ICatalogManager catalogManager) {
        catalog = catalogManager;
    }

    private ExpressionTypeInferrer CreateTypeInferrer() {
        return new ExpressionTypeInferrer(catalog, _currentTableSchemas);
    }
}
```

**Key Design Points:**
- **Current table context**: We track which tables are available in the current query scope
- **Type inferrer**: We create type inference objects on-demand for type checking
- **Catalog integration**: We leverage our catalog for all schema lookups

### Validating Table Operations

Let's start with the simpler statement types - each has its own specific validation challenges:

#### CREATE TABLE Statement Validation

CREATE TABLE statements require validating the rationality of table structure definitions:

**Table Existence Check**
First, check whether the table name to be created already exists. Databases don't allow creating tables with the same name, as this would cause schema conflicts.

**Column Definition Validation**
- **Column Name Uniqueness**: No duplicate column names within a table, such as defining two `name` columns simultaneously
- **Data Type Validity**: Each column's data type must be a system-supported type (Int, Float, String, Bool)
- **Constraint Condition Check**: Validate syntax correctness of constraints like PRIMARY KEY, NOT NULL, etc.

**Constraint Logic Consistency**
- A table can have only one primary key column
- Primary key columns automatically imply NOT NULL constraint
- Check for logical conflicts between constraints

#### DROP TABLE Statement Validation  

DROP TABLE is relatively simple but still requires key checks:

**Table Existence Verification**
For each table name listed in the DROP statement, the validator ensures that the table actually exists in the catalog. Attempting to delete non-existent tables produces errors.

**Batch Operation Handling**
Supports batch deletion like `DROP TABLE users, products, orders`, with the validator checking each table name's existence individually.

#### INSERT Statement Validation

INSERT statement validation is most complex because it involves type matching:

**Target Table Validation**
Ensure the table for data insertion exists in the database.

**Column-Value Matching Strategy**
Handle two INSERT syntaxes:
- **Explicit Column Names**: `INSERT INTO users (name, age) VALUES (...)`
- **Implicit All Columns**: `INSERT INTO users VALUES (...)` (following table definition column order)

**Quantity Consistency Check**
The number of values in each row must exactly match the specified number of columns. `INSERT INTO users (name, age) VALUES ('John', 25, 'extra')` will be rejected.

**Type Compatibility Validation** 
This is the most critical part:
- String values cannot be inserted into numeric columns
- Numeric values cannot be inserted into `boolean` columns  
- NULL values can only be inserted into columns that allow NULL
- Perform necessary type promotion (Int can be inserted into Float columns)

#### UPDATE Statement Validation

UPDATE statements require multi-layer validation:

**Target Table Existence**
Verify that the table being updated actually exists.

**SET Clause Validation**
For each `column = value` pair:
- **Column Existence**: Ensure the column being updated exists in the target table
- **Type Compatibility**: New value type must be compatible with column definition
- **Constraint Check**: Cannot assign NULL to NOT NULL columns

**WHERE Clause Handling**
If a WHERE clause exists, must:
- Recursively validate all expressions in the WHERE clause
- Ensure the WHERE clause ultimately returns `boolean` values
- Verify that column references in the WHERE clause all exist

**Update Constraint Check**
- Cannot update primary key columns (though some databases allow it, we choose to prohibit it)
- Check for potential unique constraint conflicts

#### DELETE Statement Validation

DELETE statement validation focuses on:

**Target Table Validation**
Ensure the table from which data is to be deleted exists.

**WHERE Clause Criticality**
- If there's no WHERE clause, this is a full table deletion operation (requires special attention)
- If there's a WHERE clause, validate expression correctness and `boolean` return type
- Column references in the WHERE clause must all exist in the target table

**Referential Integrity Considerations**
Although our system hasn't implemented foreign keys yet, the DELETE validator reserves extension points for future referential integrity checks.


#### SELECT Statement Validation

SELECT statements are where the Visitor pattern really shows its power. Here's how our `SemanticAnalyzer` tackles this multi-layered validation challenge:

**The Visitor's Journey Through SELECT**

When our visitor encounters a SELECT node, it follows a carefully orchestrated five-phase approach:

**Phase 1: Building Table Context**
The visitor first clears its current table context and processes the FROM clause. For each table or alias mentioned, it validates that:
- The table actually exists in our catalog
- No duplicate aliases are used (like `FROM users u, products u`)
- Each alias maps to a valid table schema

This phase builds up the `_currentTableSchemas` dictionary that becomes our reference for all subsequent column validation.

**Phase 2: SELECT List Validation** 
Here's where things get interesting. The visitor handles three scenarios:
- **Star expressions (`*`)**: Always valid if we have tables in FROM
- **Qualified stars (`table.*`)**: Must verify the table exists in our FROM clause
- **Regular expressions**: Each expression gets recursively validated, and we ensure the result type is scalar (no subqueries that return multiple rows in SELECT list)

**Phase 3: WHERE Clause Logic**
If a WHERE clause exists, the visitor recursively validates all its expressions, then applies a critical constraint: the final result must be a boolean expression. You can't have `WHERE name` (string) or `WHERE age` (int) - it must be something that evaluates to true/false.

**Phase 4 & 5: Column Reference Validation**
For GROUP BY and ORDER BY clauses, the visitor ensures every referenced column actually exists and is unambiguous within our current table context.

**The Key Insight**: Notice how the visitor maintains state (`_currentTableSchemas`) as it traverses the tree. This context allows later validation phases to reference what was learned in earlier phases.
### Expression Validation

This is where our Visitor pattern truly shines. Each expression type has its own validation rules, and the visitor applies them recursively as it traverses the expression tree.

#### Column Reference

Column references present two classic database validation scenarios:

**Qualified References (`users.name`)**
When a column reference specifies a table name, the validator ensures:
- The table/alias exists in our current FROM clause context
- The specific column exists in that table's schema

**Unqualified References (`name`)**
This is where it gets tricky. The validator must:
- Search through all available tables to find columns with that name
- Reject the reference if no table has that column
- **Critically important**: Reject if multiple tables have that column (ambiguity error)

The ambiguity check is crucial - `SELECT name FROM users, products` fails because both tables might have a `name` column. SQL requires you to be explicit: `users.name` or `products.name`.

#### Binary Operations

Binary expressions require a two-stage validation approach:

**Stage 1: Recursive Validation**
The visitor first validates both operands by calling `Accept()` on the left and right expressions. This ensures the operands themselves are valid before checking compatibility.

**Stage 2: Type Compatibility Logic**
Here's where our type system rules come into play:

**Equality Operations (`=`, `!=`)**
- Both operands must have the same base type
- String = String ✓, Int = Int ✓, String = Int ✗

**Comparison Operations (`<`, `<=`, `>`, `>=`)**
- Requires orderable types (Int, Float, String)
- Both operands must be comparable to each other
- Boolean comparisons are rejected (what does `true > false` mean?)

**Logical Operations (`AND`, `OR`)**
- Both operands must be `boolean` expressions
- This is stricter than some databases - we don't allow implicit `boolean` conversion

**Arithmetic Operations (`+`, `-`, `*`, `/`)**
- Both operands must be numeric (Int or Float)
- String concatenation requires explicit CONCAT function
- Mixed operations (Int + Float) are allowed with type promotion rules

#### Unary Expression

Unary expressions, while simple, have important validation rules:

**NOT Operator Validation**
- The operand must be a `boolean` expression
- `NOT name` (String) or `NOT age` (Int) are both illegal
- Only `boolean` expressions like `NOT (age > 18)` are valid

**Numeric Negation Operator (`-`)**
- The operand must be a numeric type (Int or Float)
- Strings or `boolean` values cannot be numerically negated
- The result maintains the original numeric type

#### BETWEEN Expression

BETWEEN expressions require coordination of three operand types:

**Ternary Type Consistency**
For `column BETWEEN value1 AND value2`:
- All three operands must be comparable types
- Numeric types can be mixed (Int BETWEEN Float AND Int)
- String types support lexicographic comparison
- Boolean types don't support range comparison

**Boundary Value Logic Check**
While semantic analysis doesn't validate `value1 <= value2`, it ensures the type system supports such comparison operations.

#### IN Expression

IN expressions handle set membership checks:

**Value List Type Consistency**
For `column IN (value1, value2, value3)`:
- The left operand must be type-compatible with each element in the value list
- Types within the value list don't need to be identical (supports type promotion)
- For example: `age IN (18, 25.5, 30)` is legal (Int and Float mixed)

**Subquery IN Operations**
For `column IN (SELECT ...)`:
- The subquery must return a single-column result
- The subquery column type must be compatible with the left operand
- The subquery is specially marked for "scalar context" usage

#### Literal Expression

Literal expressions are the simplest but most important foundation:

**Type Determinism**
Each literal has a clear type mapping:
- Integer literals → Int type
- Floating-point literals → Float type  
- String literals → String type
- Boolean literals → Bool type
- NULL literals → Unknown type (requires context inference)

**NULL Value Special Handling**
NULL literal type inference depends on usage context, providing important information for the type inferrer.

#### Subquery Expression

Subquery expressions are the most complex because they create nested scopes:

**Context Isolation**
- Subqueries have their own table scope, independent of outer queries
- Column name resolution within subqueries prioritizes the subquery's tables
- Prevents column name conflicts between inner and outer queries

**Usage Context Constraints**
Different constraints are imposed based on subquery usage location:
- **Scalar Context** (like `WHERE age > (SELECT ...)`): Must return single row, single column
- **Row Context** (like `WHERE (a,b) IN (SELECT ...)`): Can return multiple rows but column count must match
- **Table Context** (like `FROM (SELECT ...)`): Can return arbitrary row-column structure

#### Star Expression

Star expressions have special usage rules:

**Context Restrictions**
- Can only be used in SELECT lists (`SELECT *`)
- Can only be used in COUNT functions (`COUNT(*)`) 
- Cannot be used in other expressions (`WHERE *` is illegal)

**Table Qualification Check**
- `table.*` requires verifying the table name exists in the FROM clause
- Bare `*` is always legal when there's a table context

#### Function Call

Function calls present the most complex validation scenario because they involve multiple interdependent constraints that must all be satisfied.

**Layer 1: Existence and Semantic Rules**
The visitor first ensures the function exists in our catalog and applies special semantic rules. The most important rule: only `COUNT(*)` is allowed to use the star argument - expressions like `SUM(*)` or `AVG(*)` are rejected because they don't make mathematical sense.

**Layer 2: Recursive Argument Validation**
Each function argument is recursively validated by calling `Accept()` on it. This ensures that complex expressions like `UPPER(users.name || products.description)` have all their sub-expressions properly validated before we check the function-specific rules.

**Layer 3: Arity Checking (Argument Count)**
Functions have both required and optional parameters. The validator ensures:
- At least the required number of arguments are provided
- No more than the total number of parameters are provided
- Special exception for `COUNT(*)` which bypasses normal parameter counting

**Layer 4: Type Compatibility Matrix**
This is the most sophisticated part. For each argument, the validator:
- Infers the argument's type using our `ExpressionTypeInferrer`
- Handles the special case of subquery arguments (they must be scalar subqueries)
- Checks if the argument type is accepted by the corresponding parameter

**The Subquery Challenge**: When a function argument is a subquery (like `WHERE age > (SELECT AVG(age) FROM users)`), the validator must ensure:
- The subquery returns exactly one row and one column (scalar subquery)
- The column type matches what the function parameter expects
- This prevents errors like passing a multi-row result where a single value is expected

**Parameter Type Matching**: Each function parameter has an "accepted types" list. For example:
- `UPPER()` only accepts String types
- `ABS()` only accepts numeric types (Int, Float)  
- `COALESCE()` can accept any type, but all arguments must be the same type

This layered approach ensures that by the time we finish validating a function call, we know with certainty that it will execute successfully at runtime.


## Type Inference

Now that we can validate semantics, we need a way to automatically figure out what type each expression will produce. This is crucial for query planning and execution.

In our refactored architecture, I've separated the type inference logic into its own dedicated class: `ExpressionTypeInferrer`. This gives us better separation of concerns - the `SemanticAnalyzer` focuses on validation while the `ExpressionTypeInferrer` specializes in determining result types.

Our `ExpressionTypeInferrer` acts like a detective, examining expressions and deducing their types:


```csharp
public class ExpressionTypeInferrer {
    private readonly ICatalogManager catalog;
    private readonly Dictionary<string, Dictionary<string, ColumnDefinition>> tableSchemas;

    public ExpressionTypeInferrer(ICatalogManager catalogManager, 
                                Dictionary<string, Dictionary<string, ColumnDefinition>> tableSchemas) {
        catalog = catalogManager;
        this.tableSchemas = tableSchemas;
    }
    
    public ExpressionType InferType(Expression expression) {
        // Use cached type if we've already figured it out
        if (expression.InferredType != null) {
            return expression.InferredType;
        }
    
        var inferredType = expression switch {
            BetweenExpression between => InferBetweenExpression(between),
            BinaryExpression binary => InferBinaryExpression(binary),
            ColumnRefExpression colRef => InferColumnRefExpression(colRef),
            FunctionCallExpression function => InferFunctionCallExpression(function),
            InExpression inExp => InferInExpression(inExp),
            LiteralExpression literal => InferLiteralExpression(literal),
            SubqueryExpression subquery => InferSubqueryExpression(subquery),
            UnaryExpression unary => InferUnaryExpression(unary),
            _ => ExpressionType.Unknown()
        };
    
        // Cache the result for performance
        expression.InferredType = inferredType;
        return inferredType;
    }
}
```

### Type Inference Strategy

Our `ExpressionTypeInferrer` works like a smart detective, using a recursive pattern-matching approach to determine result types. Here's how it tackles each expression category:

#### Literal Values
Literals are the simplest case - the inferrer directly maps C# runtime types to our database types:
- Numeric literals (int, float, decimal) → Int or Float types  
- String literals → String type
- Boolean literals → Bool type
- NULL literals → Unknown type (special handling needed)

**Key insight**: NULL values have "unknown" type initially, but get resolved based on context later.

#### Column References
For column references, the inferrer performs a schema lookup:
- **Qualified columns** (`users.name`): Direct table + column lookup in our schema dictionary
- **Unqualified columns** (`name`): Search through all available table schemas (semantic analyzer already ensured uniqueness)

**Nullability determination**: A column is nullable unless it has an explicit NOT NULL constraint. This affects all downstream type calculations.

#### Binary Operations
This is where our type system's logic really shines. The inferrer applies different rules based on operator category:

**Comparison Operators** (`=`, `<`, `>=`, etc.)
- Always produce `boolean` results regardless of operand types
- Nullability propagates: if either operand is nullable, result is nullable

**Logical Operators** (`AND`, `OR`)
- Both operands must be boolean (validation already checked this)
- Result is boolean with nullability propagation

**Arithmetic Operators** (`+`, `-`, `*`, `/`)
- Type promotion rules: Int + Int = Int, but Int + Float = Float
- Nullability propagates from either operand

#### Function Calls
Function type inference involves several sophisticated rules:

**COUNT(*) Exception**: Always returns non-nullable Int, regardless of input nullability (empty tables return 0, not NULL).

**Aggregate Functions**: Generally return nullable results if any input columns are nullable (empty result sets produce NULL).

**MIN/MAX Special Case**: These functions return the exact same type as their input argument, preserving both base type and nullability.

**Type-Preserving Functions**: Functions like `UPPER()`, `LOWER()` return the same base type as input but may affect nullability.

**Parameter Type Resolution**: For functions with subquery arguments, the inferrer extracts the scalar type from single-column result sets.


### Subquery Type Inference

Subqueries present the most sophisticated type inference challenge because they return row sets (multiple columns) rather than scalar values. Here's how our `ExpressionTypeInferrer` handles this complexity:

**Context Isolation Strategy**
The inferrer creates an isolated context for each subquery:
- Builds a separate table schema dictionary for the subquery's FROM clause
- Creates a nested type inferrer that operates within this isolated scope  
- This prevents column name conflicts between outer and inner queries

**SELECT List Analysis**
For each item in the subquery's SELECT list, the inferrer determines:
- **Star expansion** (`*`): Expands to all columns from all tables in the subquery's scope
- **Qualified star** (`table.*`): Expands to all columns from the specified table only
- **Regular expressions**: Recursively infers the type of each expression using the nested context

**Row Schema Construction**
The final result is a `RowSet` type containing a schema (list of column types) that represents what the subquery will produce. This schema becomes critical when the subquery is used in different contexts:
- In a scalar context (like `WHERE age > (SELECT AVG(age) ...)`) it must be a single-column, single-row result
- In a row context (like `WHERE (name, age) IN (SELECT ...)`) it can be multi-column

**The Nested Scope Challenge**: The trickiest part is handling column references that might exist in both outer and inner query scopes. Our approach ensures that column resolution within the subquery only sees tables from the subquery's own FROM clause, maintaining proper SQL scoping rules.


## What's Next?

With semantic analysis complete, our database engine now has a solid understanding of what queries mean and whether they're valid. Our refactored modular architecture with three specialized components (`SemanticAnalyzer`, `ExpressionType`, and `ExpressionTypeInferrer`) provides a clean, maintainable foundation that will serve us well as the system grows.

In the next article, we'll tackle the **Query Planner** - the component that decides HOW to execute these validated queries efficiently.

The query planner will:
- Transform ASTs into executable plans
- Choose optimal algorithms for joins, sorts, and filters
- Estimate costs and optimize query execution order
- Handle index selection and access methods


