---
title: Java SE Basic
date: 2025-03-04 22:09:12
tags: [Java, Basic, Key Points]
categories: [Java]
postImage:
description: Basic Java key points to know for interview.
warning: No
isCarousel: No
---

## Java Memory

![](https://media.geeksforgeeks.org/wp-content/uploads/20190614230114/JVM-Architecture-diagram.jpg)

(picture from this source: https://www.geeksforgeeks.org/how-many-types-of-memory-areas-are-allocated-by-jvm/)

Java memory is divided into several areas, each serving a specific purpose. The most important ones are:

###  Heap Memory

- **Purpose**: This is where Java stores **objects** (instances of classes).
- **Managed by**: The **Garbage Collector** (GC) automatically manages the heap, freeing memory by removing objects that are no longer referenced.

### Stack Memory

- **Purpose**: Used for storing **local variables** and method call information (method calls, return addresses, etc.).
- **Managed by**: The **JVM**. Each thread has its own stack, which is created when the thread starts.
- **Storage**: It stores **primitive types** (like `int`, `float`) and **references to objects** (not the actual objects themselves).
- **LIFO structure**: The stack operates in a Last In First Out (LIFO) manner, meaning the last method called is the first one to be executed.
- **Automatic Cleanup**: Memory is automatically cleaned when a method call completes, and local variables go out of scope.

### Method Area (also known as **MetaSpace** in JDK 8+)

- **Purpose**: Holds **class-level data** (class definitions, method data, static variables, etc.).
- **Managed by**: The JVM. The method area is used to store the class bytecodes, which are loaded by the ClassLoader.
- **Metaspace** (JDK 8 and above): The method area was renamed Metaspace in JDK 8 and onwards, and it no longer resides in the heap. It is stored in native memory.

### Program Counter (PC) Register

- **Purpose**: Each thread has a **program counter** that stores the address of the currently executing instruction.
- **Used for**: It helps in keeping track of method execution in a multithreaded environment.
- **Thread-Specific**: Each thread has its own PC register, making it independent of other threads.

### Native Method Stack

- **Purpose**: This stack is used for **native methods** (methods written in other languages like C or C++).
- **Usage**: If a Java program calls a native method, this stack handles the data related to those calls.

## Object

An **object** in programming, particularly in **object-oriented programming (OOP)**, is a **self-contained unit** that consists of:

1. **Attributes** (also called **properties** or **fields**): These represent the data or state of the object. In other words, attributes hold the information about the object.
2. **Methods** (also called **functions** or **behavior**): These define the behavior or actions that the object can perform. Methods can operate on the object's attributes or interact with other objects.

## Variables

In Java, a **variable** is a container that holds data values during the execution of a program. A variable is associated with a data type, which defines the type of data it can store (such as integers, characters, or boolean values).

## Data Types

In Java, data types are used to specify the type of data a variable can hold. Java has two main categories of data types:

1. **Primitive Data Types** (also called **basic types**)
2. **Non-Primitive Data Types** (also called **reference types**)

### Primitive Data Types:

Primitive data types are the most basic types of data that are built into the Java language. They represent raw values and are not objects. There are **8 primitive data types** in Java:

| Data Type | Size    | Default Value | Description                                     |
| --------- | ------- | ------------- | ----------------------------------------------- |
| `byte`    | 1 byte  | 0             | A small integer value, from -128 to 127.        |
| `short`   | 2 bytes | 0             | A short integer value, from -32,768 to 32,767.  |
| `int`     | 4 bytes | 0             | A standard integer value, from -2^31 to 2^31-1. |
| `long`    | 8 bytes | 0L            | A large integer value, from -2^63 to 2^63-1.    |
| `float`   | 4 bytes | 0.0f          | A single-precision floating-point number.       |
| `double`  | 8 bytes | 0.0d          | A double-precision floating-point number.       |
| `char`    | 2 bytes | '\u0000'      | A single character represented by Unicode.      |
| `boolean` | 1 bit   | false         | A value representing `true` or `false`.         |

CONVERSION & CASTING：

Conversion (widening conversion), are performed automatically： A smaller box can be placed in a bigger box and so on.
Casting also known as narrowing conversion.
• A bigger box has to be placed in a smaller box.
• Casting is not implicit in nature.
• int i = (int)(8.0/3.0);
• Casting will lose precision

### Non-Primitive Data Types:

Non-primitive data types are more complex types that are derived from primitive types. They are also called **reference types** because they store references to the actual data, not the data itself. These include:

- Wrapper class: Byte, Short, Integer, Long, Float, Double, Boolean, Character
- Classes: String, ArrayList, Object
- Interfaces: Runable, Serializable
- Enums
- Arrays

Key Characteristics of Non-Primitive Types:

- Non-primitive types are **objects** and can hold more complex data than primitive types.
- They **do not have a fixed size**; their size depends on the number of elements they store.
- They are **stored in the heap memory**, while primitive types are stored in the stack.

## Wrapper Class

In Java, a **wrapper class** is a class that encapsulates (or "wraps") a **primitive data type** into an object. Each of the eight primitive data types in Java has a corresponding wrapper class. These wrapper classes are part of the **java.lang** package and provide a way to use primitive values as objects.

Here are the wrapper classes for each primitive type:

| Primitive Type | Wrapper Class |
| -------------- | ------------- |
| `byte`         | `Byte`        |
| `short`        | `Short`       |
| `int`          | `Integer`     |
| `long`         | `Long`        |
| `float`        | `Float`       |
| `double`       | `Double`      |
| `char`         | `Character`   |
| `boolean`      | `Boolean`     |

**Wrapper classes** allow primitive types to behave as objects, enabling features like **nullability**, **autoboxing**, **unboxing**, and **utility methods**.

They are essential for using primitives in **generic collections** and other object-oriented features in Java.

## String

- `String` is a **non-primitive type** (a class in `java.lang`), and it is **immutable**, meaning its value cannot be changed once created.
- Strings are stored in **heap memory**, but **string literals** are stored in a **string pool** for memory optimization.

Here is two ways to create a string.

- **Literal**: `String str = "Hello";` (Uses string pool).
- **New keyword**: `String str = new String("Hello");` (Creates a new object even if the same literal exists).

#### **String Pool (Interning)**:

**String Interning**:

When a string literal is created, Java checks if the string already exists in the String Pool:

- **If it exists**: The reference to the already existing string is returned.
- **If it doesn't exist**: The string is added to the pool.

This mechanism is known as **string interning**, which helps avoid storing duplicate strings.

**How String Pool Works**:

- **String Literals**: All string literals in Java (e.g., `"Hello"`, `"World"`) are automatically added to the pool.
- **String Object Creation**: When you create a `String` object using the `new` keyword (e.g., `new String("Hello")`), the object is not added to the pool. Instead, a new object is created in the heap memory, even if an identical string already exists in the pool.

Example of String Pool

```
javaCopy codeString str1 = "Hello";
String str2 = "Hello";
String str3 = new String("Hello");

System.out.println(str1 == str2);  // true, both refer to the same object in the pool
System.out.println(str1 == str3);  // false, str3 is a new object, not from the pool
```

String can enter the string pool at compile time if its a string literal, or we can use  `intern()` method to make it 

####  **String vs. StringBuilder/StringBuffer**:

- **`String`**: Immutable, inefficient for frequent modifications.
- **`StringBuilder`**: Mutable, faster for string concatenation but not thread-safe.
- **`StringBuffer`**: Mutable and thread-safe, but slower than `StringBuilder`.

## Immutable Class

An **immutable class** in Java is a class whose objects cannot be modified once they are created. Once an object of an immutable class is instantiated, its state (the values of its fields) cannot be changed.

Key Characteristics of Immutable Classes:

- **Final Class**: The class is usually declared as `final` so that it cannot be subclassed.
- **Final Fields**: The fields of the class are typically declared as `final`, ensuring that their values cannot be changed after they are initialized.
- **No Setter Methods**: The class does not provide any methods that modify the internal state (no setter methods).
- **Initialization via Constructor**: Fields are initialized only once, usually in the constructor.
- **Defensive Copies**: If the class contains fields that are references to mutable objects (like arrays, collections, or other objects), it creates copies of those objects to ensure that the original object cannot be changed externally.

How to create a custom immutable class in Java:

1. Declare the class as `final` so that it cannot be subclassed.
2. Declare all fields as `private` and `final` to prevent modification.
3. Initialize all fields through the constructor.
4. Provide getter methods to retrieve the values of fields.
5. If any field is a reference to a mutable object, return a defensive copy instead of the original object in the getter method.

Example of a Custom Immutable Class in Java:

```java
public final class Person {
    private final String name;
    private final int age;
    
    // Constructor to initialize fields
    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }
    
    // Getter methods
    public String getName() {
        return name;
    }
    
    public int getAge() {
        return age;
    }
    
    // No setter methods (to ensure immutability)
}
```

**Java inner Immutable Class:**

String, Wrapper classes, `LocalDate` (Java 8's `java.time`), `BigInteger`,`BigDecimal`,`Thread, Enum Class, ect.

## Static Keyword

### Static Field

A **static field** (also known as a **static variable**) is a class-level variable, meaning it is shared among all instances of a class. A static field is associated with the class itself, rather than with individual objects (instances) of the class.

Characteristics of Static Fields:

- **Shared Among All Instances**: All instances of the class share the same static field. Changes made to the static field by one instance will affect all other instances.
- **Class-Level Variable**: A static field is not tied to any specific instance of the class. It is tied to the class itself.
- **Memory Allocation**: Static fields are stored in a special memory area called the **method area** (part of the JVM heap), which is shared across all instances of the class.
- **Accessed via Class Name or Instance**: A static field can be accessed directly through the class name or through an instance of the class, though using the class name is preferred for clarity.

### Static Method

A **static method** is a method that belongs to the class itself, not to any specific instance of the class. Static methods can be called directly on the class without creating an instance.

Characteristics of Static Methods:

- **Class-Level Method**: Static methods are associated with the class itself and can be called without creating an object of the class.
- **Cannot Access Instance Variables**: Static methods cannot access instance variables (non-static fields) or instance methods directly. They can only access other static fields or static methods.
- **Called via Class Name**: Static methods are usually called using the class name, though they can also be called through an instance (not recommended for clarity).
- **Memory Allocation**: Static methods are stored in the method area and are not tied to any object instance.

## Final Keyword

The final keyword can be used to make a class, method or variable immutable.

- Final variable: Once a final variable is assigned a value, it becomes a constant and can no longer be changed.
-  Final method: Once a method is made final, it cannot be overridden.
- Final Class: Once a class is made final, it cannot be extended.

## Pass by value & reference

In Java, the concepts of **pass by value** and **pass by reference** are often misunderstood, but in Java, **everything is passed by value**. However, the behavior differs based on the type of data being passed—**primitive types** or **reference types**.

### Pass by Value in Java

When you pass an argument to a method in Java, you always pass **a copy of the value**—this is called **pass by value**. However, the behavior of passing primitive types vs. reference types differs in terms of what gets copied.

**Pass by Value for Primitive Types**:

- When you pass a **primitive type** (like `int`, `char`, `double`, etc.) to a method, the method receives a **copy** of the value of the original variable.
- Any changes made to the parameter inside the method do not affect the original variable outside the method.

**Pass by Value for Reference Types**:

- When you pass a **reference type** (like an object) to a method, you are passing the **copy of the reference** (the memory address of the object).
- This means the method has access to the same object in memory, so any changes to the object's internal state (like modifying its fields) will affect the original object.
- However, if you reassign the reference (point it to a new object), the original reference outside the method will not be changed.

## Access Modifiers

**default (package-private)**: Accessible within the same package only.

**private**: Accessible only within the same class. Great for encapsulation.

**public**: Accessible from anywhere. Used for exposing methods and fields to all classes.

**protected**: Accessible within the same package and by subclasses in different packages. Ideal for inheritance.