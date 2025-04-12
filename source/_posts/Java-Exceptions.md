---
title: Java Exceptions
date: 2025-03-07 23:35:33
tags: [Java, Key Points, Exception]
categories: Java
postImage:  https://cdn.jsdelivr.net/gh/DyingDown/img-host-repo/202503171931622.png
description: This section covers the differences between Exception and Error, their hierarchy, various exception types, exception handling methods, throwing exceptions, and creating custom exceptions.
warning: false
isCarousel: false
---

## Exception vs Error

### Exception

An **Exception** in Java is a subclass of `Throwable` that represents an **abnormal condition** during program execution — but one that the program **can recover from**.

For example:

- **File not found** when trying to read a file
- **Null pointer access** when dereferencing a `null` object
- **Divide by zero** in arithmetic

 Exceptions are typically caused by **programmer mistakes** or **external issues** (e.g., bad input or unavailable resources).

### Error

An **Error** is also a subclass of `Throwable`, but it represents **serious problems** that a program **cannot recover from** — typically related to the **JVM** or **system-level issues**.

For example:

- **OutOfMemoryError** — When the JVM runs out of memory
- **StackOverflowError** — When the call stack exceeds its limit (e.g., deep recursion)
- **VirtualMachineError** — When the JVM is corrupted or broken

 Errors are typically **not meant to be caught or handled** in most cases.

### Exception vs Error

| Feature        | Exception                                                    | Error                                                        |
| -------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| **Definition** | Represents a recoverable abnormal condition.                 | Represents serious, unrecoverable problems.                  |
| **Type**       | Checked (`IOException`) or Unchecked (`NullPointerException`). | Unchecked only (`StackOverflowError`, `OutOfMemoryError`).   |
| **Caused by**  | Programmer mistakes or external factors.                     | System-level or JVM issues.                                  |
| **Handling**   | Meant to be caught and handled.                              | Rarely handled (let the JVM deal with it).                   |
| **Recovery**   | Recovery is possible (e.g., retry, fallback).                | Recovery is typically impossible.                            |
| **Examples**   | `IOException`, `NullPointerException`, `ArithmeticException`. | `OutOfMemoryError`, `StackOverflowError`, `VirtualMachineError`. |

### **Exception & Error in the Hierarchy**

```plaintext
Throwable
│
├── Exception (can recover from)
│   ├── Checked Exception (e.g., IOException, SQLException)
│   └── Unchecked Exception (e.g., NullPointerException, ArithmeticException)
│
└── Error (usually unrecoverable)
    ├── OutOfMemoryError
    ├── StackOverflowError
    └── VirtualMachineError
```

## Exception types

###  **Checked Exceptions (Compile-Time Exceptions)**

Checked exceptions are designed for **situations you should anticipate and recover from**. The compiler forces you to handle them, ensuring your program deals with expected issues gracefully (e.g., file not found, network issues).

**Key Characteristics:**

- Inherit from `Exception` (but **not** from `RuntimeException`).
- Compiler **requires** you to handle or declare them using `try-catch` or `throws`.
- Often caused by **external factors** (e.g., file system, databases, network).

**Common Checked Exceptions:**

| Exception Name           | When it happens                                      |
| ------------------------ | ---------------------------------------------------- |
| `IOException`            | Input-output operations fail (e.g., file not found). |
| `SQLException`           | Database access errors.                              |
| `FileNotFoundException`  | File cannot be found.                                |
| `ClassNotFoundException` | Class loading fails (e.g., reflection).              |
| `ParseException`         | Failure in parsing data (e.g., date strings).        |
| `InterruptedException`   | Thread is interrupted while sleeping or waiting.     |

 **Best Practices for Checked Exceptions:**

- ✅ Use when recovery is **possible** (e.g., retry file loading, prompt user for correct file).

- ✅ Catch the most **specific** exceptions first (e.g., `FileNotFoundException` before `IOException`).
- ❌ Avoid catching `Exception` directly unless you truly **need** a catch-all.
- ❌ Don’t overuse them — too many checked exceptions make code hard to read.

### Unchecked Exceptions (Runtime Exceptions)

Unchecked exceptions indicate **programming logic errors** that **shouldn’t happen** if the code is correct. The compiler **doesn’t force you** to handle these — but you **can** catch them if needed.

**Key Characteristics:**

- Inherit from `RuntimeException`.
- The compiler **doesn’t check** whether you handle them.
- Usually caused by **programming mistakes** (e.g., null pointers, bad casting, index errors).
- Typically indicate **bugs** in your logic, not external issues.

 **Common Unchecked Exceptions:**

| Exception Name                   | When it happens                                              |
| -------------------------------- | ------------------------------------------------------------ |
| `NullPointerException`           | Trying to access a method/field on a `null` object.          |
| `ArrayIndexOutOfBoundsException` | Array index is invalid (e.g., `arr[5]` when size is 4).      |
| `ArithmeticException`            | Divide by zero (`int result = 10 / 0`).                      |
| `IllegalArgumentException`       | Method receives an invalid argument (e.g., negative age).    |
| `ClassCastException`             | Wrong type casting (e.g., `(String) obj` when `obj` is Integer). |
| `NumberFormatException`          | Parsing a non-numeric string to a number (`Integer.parseInt("abc")`). |

**Best Practices for Unchecked Exceptions:**

- ✅ Use for **programming errors** that **shouldn’t occur** (e.g., bad method arguments).
- ✅ Ensure **defensive programming** (e.g., `if (str != null)` checks).
- ❌ Don’t catch unchecked exceptions just to hide bugs — fix the root cause instead.
- ✅ Consider `IllegalArgumentException` and `IllegalStateException` for **custom validations**.

## Exception Handling

These keywords **handle exceptions directly** — catching and managing errors when they happen.

- **`try`** — Wraps code that may throw an exception.
  - The code inside the `try` block is executed, but if any exception occurs, it will jump to the corresponding `catch` block.
  - If no exception occurs, the program continues normally.
  - It’s used to identify potentially error-prone areas, such as file I/O, division by zero, etc.
  - Nested try-catch block is allowed.
- **`catch`** — Catches and handles a specific exception.
  - Each `catch` block handles **one specific type** of exception.
  - You can have multiple `catch` blocks for different exceptions, but **order matters** (catch more specific exceptions first).
  - The exception object is passed to the `catch` block as an argument (e.g., `Exception e`), which you can use to retrieve information about the exception (e.g., `e.getMessage()`).
  - You can catch **multiple exceptions** in one block (Java 7+ allows this).
  - Order of catch is important, catch having super class types should be defined later. eg. `catch (Exception1 | Exception2 | Exception3)`
- **`finally`** — Runs code **after** `try` and `catch` — always executes (good for cleanup).
  - Often used for **cleanup operations** (e.g., closing file streams or database connections).
  - It runs after the `try` and `catch` blocks, making sure critical resources are freed, even if the program crashes.
  - If a `return` statement is inside `try` or `catch`, the `finally` block still executes before the method returns.
  - If an exception is thrown in `finally`, it **overrides** any exception from the `try` block.

```java
try {
    int result = 10 / 0;
} catch (ArithmeticException e) {
    System.out.println("Oops: " + e.getMessage());
} finally {
    System.out.println("This runs no matter what.");
}
```

## Throwing Exceptions

These keywords are used to **trigger exceptions manually** or **declare** that a method might throw exceptions.

#### **`throw`**

**Purpose:** **Manually throws** an exception at a specific point in your code.

- You can throw **any type of exception** (checked or unchecked).
- Commonly used for **validating inputs** or when certain conditions aren't met, indicating that something went wrong.
- Syntax: `throw new SomeException("Message");`
- **RuntimeException** or its subclasses do not require to be declared or caught, but **checked exceptions** do.

```java
if (age < 18) {
    throw new IllegalArgumentException("Age must be 18 or older.");
}
```

#### **`throws`**

**Purpose:** **Declares** that a method may throw one or more exceptions.

- Used in the method signature to indicate that the method could throw a specific type of exception.
- **Checked exceptions** must be either caught or declared with `throws` in the method signature.
- It **propagates** exceptions up to the calling method, allowing the caller to decide how to handle it.
- Can be used for **multiple exceptions**, separated by commas.

```java
public void readFile() throws IOException, FileNotFoundException {
    // Code that might throw these exceptions
}
```

## Custom Exception Creation

You can define your own exceptions to represent specific errors in your application.

### `Exception`

**Purpose:** The base class for **checked exceptions**.

- Checked exceptions **must be handled** or declared using `throws`.
- Commonly used for exceptions that can be **recovered** from, such as file errors, invalid inputs, etc.
- You can extend `Exception` to create custom checked exceptions.

```java
public class InvalidInputException extends Exception {
    public InvalidInputException(String message) {
        super(message);
    }
}
```

### `RuntimeException`

**Purpose:** The base class for **unchecked exceptions**.

- Unchecked exceptions do not require explicit handling or declaration.
- They generally represent **programming bugs** (e.g., null pointer, index out of bounds).
- Used when it is difficult to recover from the exception or it should not be expected to occur under normal circumstances.

```java
public class InvalidAgeException extends RuntimeException {
    public InvalidAgeException(String message) {
        super(message);
    }
}
```

### `Throwable`

**Purpose:** The superclass for both `Exception` and `Error`.

- The top-level class for all exceptions and errors.
- **Not usually used directly**, since most exceptions inherit from `Exception` or `RuntimeException`.
- Includes both **exceptions** (which can be handled) and **errors** (usually fatal, e.g., `OutOfMemoryError`).

```java
try {
    throw new Throwable("Some generic error");
} catch (Throwable t) {
    System.out.println("Caught throwable: " + t.getMessage());
}
```
