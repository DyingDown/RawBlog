---
title: MySQL Introduction
date: 2025-03-12 15:49:19
tags: [MySQL, SQL, Key points]
categories: SQL
postImage: https://cdn.jsdelivr.net/gh/DyingDown/img-host-repo/202503130121808.jpg
description: This article covers the fundamentals of data modeling, including keys, relationships, attributes, normalization, dependencies, and data integrity, as well as the differences between relational and non-relational databases and constraints in database design.
warning: false
isCarousel: false
---

## Data Modeling

Data modeling is the process of creating a visual representation or blueprint of the system’s data, including how data entities are related to each other. It helps define the structure, organization and relationships within the data.

It clarifies the structure, providing a clear structure for data storage, ensuring that data is organized efficiently and can be easily accessed; It also improves data integrity. By defining relationships and constrains, data models help ensure the integrity and consistency of the data. It helps optimize queries and data access patterns, leading to improved system performance. It ensures the data across all systems are unified.

When do we need this:

- System Design: When designing a new system or database. The model helps define the schema, tables, and relationships.
- Database Migration: When we are migrating from one database to another or integrating multiple data source. It helps to align different structures.
- Scaling: When we want our system to be able to handle more data, a good data model can help optimize the performance.
- Handle complex data: When we are handling complex data or large datasets, it can help manage relationships and dependencies effectively.

## Basic concepts

- **Entity**: Entity is a real-world object or concept that have data and can be stored in a database. For example, people, products, events can be entities.
- **Attribute**: An attribute is a characteristic or property of an entity. They can be used to describe the entity. For example, People entity can have Name, Id number, email as its attributes.
- **Tuple**:  It represents to a row or a record of data. The data corresponds to the attributes of the entity. Eg. “John Doe”, “12345”, “xxx@gmail.com”  corresponding to Name, Id number, email.
- **Domain**: It defines a set of allowable values that an attribute can take. It specifies the data type and the constrains for an attribute.  Eg. Age attribute must be an INT and must be tween 0-120.
- **Relationship**: How entities are related
- **Degree**: How many entities are in a relationship.
- **Cardinality**: refers to the number of instances of one entity that can or must be associated with each instance of another entity. It defines the quantity aspect of the relationship between entities.

## Keys

- **Super Key**: Super key is one or more attributes that can uniquely identify a record(tuple) in a relation.
- **Candidate Key**: Candidate key is also super key, but it has the minimum attributes needed to identify the tuple. This means that if we remove any attribute from  the candidate key, we will not be able to identify the tuple.

- **Primary Key**: Primary key is one type of candidate key, that an identifies a tuple in a table. I can be one or more attributes. And this can’t be null. Each table can have only one primary key.
- **Unique Key**:  Its similar to primary key, however, it allows null multiple values. SQL treats each null value as distinct from every other null.

- **Composite key**:  A composite key is a super key that has two or more attributes.

## Relationships

### one-to-one

A single record is associate with a single record in another table.

Example: A **Person** table and a **Passport** table where each person can have only one passport, and each passport is assigned to exactly one person.

### one-to-many/many-to-one

A single record in one table can be associate with multiple records in another table.

Example: A **Person** table and **Credit Card** table.  On person can have multiple credit card, but one card is only assigned to exactly one person.

And many-to-one is just reverse of one-to-many.

They are the most common type of relationships. the “many” table contains a foreign key that reference the “one” table.

### many-to-many

Multiple records in one table can be associate with multiple records in another table.

Example: **Student** table and **Course** table. One student can attend multiple course, and one course can have multiple students.

Many-to-many relationship are typically implement using a junction table or linking table that holds foreign keys from both related table. And we can also add addition attributes to the junction table.

Example of how to representing a many-to-many relationship.

Student table

| StudentID (PK) | Name    | Major       |
| -------------- | ------- | ----------- |
| 1              | Allice  | CS          |
| 2              | Bob     | Mathematics |
| 3              | Charlie | Engineering |

And we have a course table:

| CourseID (PK) | CourseName       | Instructor   |
| ------------- | ---------------- | ------------ |
| 101           | Database Design  | Dr. Smith    |
| 102           | Algorithms       | Dr. Johnson  |
| 103           | Operating System | Dr. Williams |

Now, we create the junction table like this, Enrollment table, and add a enrollment data attribute to the table.

| StudentID (FK) | CourseID (FK) | EnrollmentDate |
| -------------- | ------------- | -------------- |
| 1              | 101           | 2025-01-15     |
| 1              | 102           | 2025-01-15     |
| 3              | 102           | 2025-01-17     |

### self-referencing

This occurs when a table has relationship with it self.

Example: An **Employ** table with EmployeeID, EmployeeName, ManagerID. Since the manager is also an employee,  the ManagerID  is the manager’s EmployeeID, it refers back to the same table.

## Attributes

### Composite attributes

It is an attribute that can be divided into smaller parts. Each part is a more detailed property of the composite attribute.

Example: Consider **Address** is an attribute for People entity. It can be further break down into smaller components, like Street, City, State and Postal Code.

### Multi-valued attributes

Its a attribute that can contains multiple values for a single entity. Tis type of attribute represents properties that can have more than one value associate with an entity.

Example: Consider **PhoneNumbers** is an attribute of People entity. One person can have multiple phone numbers. So more than one phone number can be stored in the PhoneNumber attribute.

### Derived attribute

It is a attribute that can be derived or calculated from other attributes. This attribute is usually not stored, but calculated when needed.

Example: **Age** can be an attribute of People, but we don’t need to store it, instead, we calculate it using the DOB attributes of People.

**In practice, the database will be designed to avoid these kinds of attributes.**

## Normalization

Normalization is a set of rule or norms to the database design that makes the data more organized and structured. These rules guide how to structure the table to reduce redundancy and void anomalies, and ensure the data integrity.

### Unnormalized Form (0NF)

This is the raw, unorganized table with **repeated groups** or **multi-valued attributes**.

**Example:**

| StudentID | Name    | Courses       |
| --------- | ------- | ------------- |
| 101       | Alice   | Math, English |
| 102       | Bob     | Physics       |
| 103       | Charlie | Math, Science |

### First Normal Form (1NF)

- Each table cell must contain a single value (atomic values).
- Each record must be unique (no duplicate rows).

**Example:**

| StudentID | Name    | Course  |
| --------- | ------- | ------- |
| 101       | Alice   | Math    |
| 101       | Alice   | English |
| 102       | Bob     | Physics |
| 103       | Charlie | Math    |
| 103       | Charlie | Science |

### Second Normal Form (2NF)

- Must meet 1NF requirements.
- All non-key attributes must be fully functionally dependent on the primary key (no partial dependency).

**Example:**

Use the example from 1NF, where the primary key is `{StudentID, Course}`. However, the Name is not fully functionally depend on the primary key, the name of student doesn’t depend on the course. So we need to split the table into two:

**Students table:**

| StudentID | Name    |
| --------- | ------- |
| 101       | Alice   |
| 102       | Bob     |
| 103       | Charlie |

**Enrollments table:**

| StudentID | Course  |
| --------- | ------- |
| 101       | Math    |
| 101       | English |
| 102       | Physics |
| 103       | Math    |
| 103       | Science |

### Third Normal Form (3NF)

- Must meet 2NF requirements.
- No transitive dependency, meaning non-key attributes should not depend on other non-key attributes.

**Example Problem:**

| StudentID | Name    | Department | DepartmentHead |
| --------- | ------- | ---------- | -------------- |
| 101       | Alice   | Math       | Dr. Green      |
| 102       | Bob     | Physics    | Dr. Brown      |
| 103       | Charlie | Math       | Dr. Green      |

**DepartmentHead** depends on **Department**, not directly on **StudentID**.

 **Fixed Example:**
 **Students table:**

| StudentID | Name    | Department |
| --------- | ------- | ---------- |
| 101       | Alice   | Math       |
| 102       | Bob     | Physics    |
| 103       | Charlie | Math       |

**Departments table:**

| Department | DepartmentHead |
| ---------- | -------------- |
| Math       | Dr. Green      |
| Physics    | Dr. Brown      |

### Boyce-Codd Normal Form (BCNF)

- A stronger version of 3NF, where every determinant is a candidate key.

### Pros and Cons

Pros: By dividing data into smaller tables, normalization reduces duplicate data. For example, we remove the customer information from the order table and move it to a new customer table, so we don’t need to store the same information again and again.  It can also improves data integrity. The normalized data is more consistent, so when we only need to modify data in once place rather than multiple places. This reduces the chance of anomalies. It is easier to maintain, and use the storage efficiently. And improving the data flexibility.

Cons: A highly normalized database often requires join between multiple tables to retrieve data. And this is can result in slower query performance. Also, it will have more tables. so the query we write can be very complex. especially when tables need to be joined. The insertion, updates and deletions will also takes more time.

## Dependencies

### Functional Dependency (FD)

A functional dependency exists when one attributes uniquely determines another. The way to express this is $A \rightarrow B$, for each value of A, there is only one corresponding value of B.

**Example**: $StudentID->StudentName$. Each student ID uniquely determines a student’s name.

### Partial Dependency

A partial dependency exists when a non-key value depends on part of a composite primary key, not the whole key.

 **Example:** For a table `CourseEnrollments(StudentID, CourseID, ProfessorName)`:

- The primary key is `(StudentID, CourseID)`.
- `ProfessorName` depends only on `CourseID` — this is a **partial dependency**.

### Transitive Dependency

A transitive dependency happens when an attribute depends on another non-key attribute. Not directly relying on the primary key.

**Example:**  In a `Departments` table:  `DepartmentID → ManagerID → ManagerPhone`

`ManagerPhone` depends on `ManagerID`, not directly on `DepartmentID`. This is a transitive dependency (violating **3NF**) and should be broken into two tables.

### Multivalued Dependency (MVD)

A multivalued dependency occurs when one attribute determines a set of multiple values of another.

**Example:**  For a table `EmployeeSkills(EmployeeID, Skill, Project)`:  `EmployeeID →→ Skill` and `EmployeeID →→ Project`

 An employee can have multiple skills and be assigned to multiple projects — these attributes are independent of each other but both depend on `EmployeeID`.

### Join Dependency

A join dependency exists when a table can be reconstructed by joining multiple tables without losing information.

**Example:**  If a table `CourseInfo` can be losslessly split into:

- `Course(CourseID, CourseName)`
- `Instructor(CourseID, InstructorName)`
- `Schedule(CourseID, TimeSlot)`

If joining these tables recreates the original `CourseInfo` table without errors, it satisfies a join dependency.

### Trivial Dependency

A trivial dependency occurs when an attribute depends on a superset that already includes it.

**Example:** `{A, B} → A` is trivial because `A` is part of the left-hand side.

Trivial dependencies are always true but not useful for database design.

## Data Integrity

It ensures the data is accurate, consistent and reliable over time. Prevents the data loss, duplication, and corruption. These are the reasons that we need it. 

### **Types of Integrity Constraints**

1. **Entity Integrity** — Each table must have a unique primary key, and it cannot be NULL.
    *Example: Every `StudentID` must be unique and not null.*
2. **Referential Integrity** — Ensures foreign key values must match a primary key in the related table.
    *Example: An order's `CustomerID` must reference a valid customer in the customers table.*
3. **Domain Integrity** — Limits what values a field can hold.
    *Example: `Age` can only accept integers between 1 and 120.*
4. **User-Defined Integrity** — Custom business rules that don't fall under the above types.
    *Example: In a **flight booking system**, a rule might enforce "departure date must be before return date."*

## Relational Database vs Non-Relational Database

Relational Database stores data in tables, the tables are also called relations which contains rows and columns. Records are store in the table format. Each table has a primary key to identifies each record. They use SQL to manage and query data.

Non-Relational Database stores data in a format other than tables. The format can be flexible. So the data can be unstructured or semi-structured. Such as documents, key-value pairs, graphs, JSON

Difference:

- They have different data structure.
- The schema of relational database is fixed while for non are not.
- Relational database is vertically scalable. The other is horizontally scalable.
- Relational uses SQL and no standard language for non-relational.

## Constrains

Constrains are the rules and conditions applied to table columns to ensure the data accuracy. They are used to limit the type of data. It ensures the data remains all valid and consistent. That’s why we need it. And with constrains, we can enforce data integrity and prevent errors. And we can also optimize the query performance.

Constrains are not mandatory to have, we won’t get error immediately after we run the sql to create a table without constrains. However, in practice, it’s rare to have database without 

