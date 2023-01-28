---
title: 'Database Project: SQL Grammar Analysis Ⅰ'
date: 2021-10-11 03:01:04
tags: Grammar
categories: Database Project
postImage: https://cdn.jsdelivr.net/gh/dyingdown/img-host-repo/Blog/post20211020114205.jpg
---

This is a **very simple** version of SQL grammar. For the sake of time, I just write some very basic usage.

<!--more-->

```
<SQLStatement> ::= <CreateTable>
				 | <DropTable>
				 | <DeleteStatement>
				 | <UpdateStatement>
				 | <SelectStatement>
				 | <InsertStatement>
				 
<CreateTable> ::= CREATE TABLE Table_Name L_BRACKET 
					<ColumnDefine>
					R_BRACKET
					
<ColumnDefine> ::= Column_Name Data_Types [, <ColumnDefine> ]

<DropTable> ::= DROP TABLE <Table_Names>

<Table_Names> ::= Table_Name [, <Table_Names> ]

<DeleteStatement> ::= DELETE FROM Table_Name WHERE <Expression>

<UpdateStamtement> ::= UPDATE Table_Name 
					   SET <Assign_Statement>
					   [WHERE <Expression> ]

<Assign_Statement> ::= Column_Name EQUAL <Value> 
					   [, <Assign_Statement> ]

<Value> ::= NUMBER | STRING | NULL | TRUE | FALSE

<SelectStatement> ::= SELECT (STERISK | <SelectList>)
					  FROM <TableList>
					  [WHERE <Expression> ]

<SelectList> ::= (Table_Name DOT (ASTERISK | Column_Name) | Column_Name) 
				 [AS New_Column_Name] [, <SelectList> ] 
				
<TableList> ::= Table_Name
			  | L_BRACKET <SelectStatement> R_BRACKET

<Expression> ::= <ExpressionFirstPart> <ExpressionTail>

<ExpressionFirstPart> ::= <Function>
			 		    | <Value>
			 		    | [Table_Name DOT] Column_Name
			 		    | L_BRACKET <Expression> R_BRACKET
			 		    | Unary_Operator <Expression>
			 			| [[NOT] EXISTS] L_BRACKET <SelectStatement> R_BRACKET

<ExpressionTail> ::= <BinaryOperator> <Expression>
				   | IS [NOT] NULL
				   | [NOT] IN L_BRACKET <SelectStatement> R_BRACKET
				   | [NOT] BETWEEN <Expression> AND <Expression>
				   | <empty>

<BinaryOperator> ::= (ASTERISK | DIV | MOD)
				   | (PLUS | MINUS)
				   | (LESS_THEN | LESS_EQUAL_TO | GREATER_THAN | GREATER_EQUAL_TO)
				   | (EQUAL | NOT_EQUAL | IS | IS NOT | IN)
				   | AND
				   | OR
				   | IS [NOT]
				   
<InsertStatement> ::= INSERT INTO Table_Name
					  [L_BRACKET <ColumnList> R_BRACKET]
					  VALUES L_BRACKET <ValueList> R_BRACKET

<ColumnList> ::= Column_Name [, Column_Name]

<ValueList> ::= <Value> [, <Value> ]
```