---
title: Java New Features
date: 2025-03-07 23:37:19
tags: [Java, Key Points, Java 8 new feature]
categories: Java
postImage: https://cdn.jsdelivr.net/gh/DyingDown/img-host-repo/202503181845267.png
description: This section covers the new features of Java 8. Like Optional Class and Functional interfaces and also Stream API, and other features.
warning: false
isCarousel: false
---

## Optional Class

The `Optional` class is a container object which may or may not contain a value. It is introduced to prevent **NullPointerExceptions** and to represent the potential absence of a value in a more explicit manner.

**Key Methods**:

- `Optional.of(value)`: Creates an `Optional` with a non-null value.
- `Optional.ofNullable(value)`: Creates an `Optional` that can hold a null value.
- `isPresent()`: Checks if the value is present (not null).
- `ifPresent(consumer)`: Executes a consumer if the value is present.
- `orElse(value)`: Returns the value if present, otherwise returns the provided fallback.
- `orElseThrow(exceptionSupplier)`: Throws a specified exception if the value is not present.
- `map()`: Transforms the value if present, returns an `Optional` of the result.

**Example**:

```java
Optional<String> name = Optional.ofNullable(getName());
name.ifPresent(n -> System.out.println("Name: " + n)); // Only prints if value is present
```

## Functional Interface and Lambda Expressions

A **Functional Interface** is an interface with just **one abstract method** (SAM), and it can have multiple default or static methods.

**Lambda expressions** allow you to provide clear and concise syntax for writing anonymous methods (implementations of functional interfaces).

This enables functional programming in Java, promoting cleaner and more concise code. Lambda expressions allow passing behavior as arguments to methods.

**Syntax of Lambda Expression**:

```java
(parameters) -> expression
```

**Example**:

```java
@FunctionalInterface
interface Calculator {
    int add(int a, int b);
}

// Lambda Expression
Calculator sum = (a, b) -> a + b;
System.out.println(sum.add(2, 3)); // Outputs 5
```

**Common Functional Interfaces**:

`Runnable`, `Callable`, `Comparator`, `Consumer`, `Supplier`, `Function`, `Predicate`, `UnaryOperator`, `BinaryOperator`.

## Default and Static Methods for Interfaces

In Java 8, interfaces can have **default methods** and **static methods**:

**Default methods**: These methods can have a body and allow adding methods to interfaces without breaking existing implementations.

**Static methods**: These are methods that belong to the interface itself, not to the objects implementing the interface.

Default methods allow you to add new functionality to interfaces without requiring all implementing classes to provide their own implementation.

**Example**:

```java
interface MyInterface {
    // Default method
    default void defaultMethod() {
        System.out.println("Default method in interface");
    }

    // Static method
    static void staticMethod() {
        System.out.println("Static method in interface");
    }
}

class MyClass implements MyInterface {
    // MyClass doesn't need to implement defaultMethod() unless it's overridden.
}

MyInterface.staticMethod(); // Calling static method from the interface
```

## Stream API

The **Stream API** provides a high-level abstraction for processing sequences of elements, such as collections, in a functional style. It allows you to process large data sets in a declarative way, using operations like map, filter, and reduce.

It allows you to express complex operations like filtering, sorting, and transforming data in a concise and readable manner, while also enabling **parallel processing** for performance optimization.

- **Key Operations**:

  - **Intermediate operations**: Operations that return a new stream (e.g., `filter()`, `map()`, `sorted()`).
  - **Terminal operations**: Operations that produce a result or a side effect (e.g., `forEach()`, `collect()`, `reduce()`).

### **Intermediate Operations**

Intermediate operations are lazy, meaning they don't modify the source data until a terminal operation is invoked. They transform the data into another stream.

#### **`filter(Predicate<? super T> predicate)`**

**Purpose**: Filters elements based on a condition (predicate).

**Usage**: It returns a stream that contains only the elements that match the given condition.

```java
EditList<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6);
numbers.stream()
       .filter(n -> n % 2 == 0)  // Keeps even numbers
       .forEach(System.out::println); // Prints: 2, 4, 6
```

#### **`map(Function<? super T, ? extends R> mapper)`**

**Purpose**: Transforms each element of the stream by applying a function.

**Usage**: It returns a new stream with the results of applying the given function to the elements.

```java
EditList<String> words = Arrays.asList("apple", "banana", "cherry");
words.stream()
     .map(String::toUpperCase)  // Converts each word to uppercase
     .forEach(System.out::println);  // Prints: APPLE, BANANA, CHERRY
```

#### **`flatMap(Function<? super T, ? extends Stream<? extends R>> mapper)`**

**Purpose**: Similar to `map()`, but it flattens nested streams into a single stream.

**Usage**: It is used when each element of the stream is a collection itself, and you want to flatten them into a single stream.

```java
EditList<List<String>> listOfLists = Arrays.asList(
    Arrays.asList("apple", "banana"),
    Arrays.asList("cherry", "date"));
listOfLists.stream()
           .flatMap(List::stream)  // Flattens the list of lists into a single stream
           .forEach(System.out::println); // Prints: apple, banana, cherry, date
```

#### **`distinct()`**

**Purpose**: Removes duplicate elements from the stream.

**Usage**: It returns a new stream with distinct elements (no duplicates).

```java
EditList<Integer> numbers = Arrays.asList(1, 2, 2, 3, 4, 4, 5);
numbers.stream()
       .distinct()
       .forEach(System.out::println); // Prints: 1, 2, 3, 4, 5
```

#### **`sorted()`**

**Purpose**: Sorts the elements of the stream.

**Usage**: It returns a new stream with the elements sorted in ascending order by default.

```java
EditList<Integer> numbers = Arrays.asList(5, 3, 1, 4, 2);
numbers.stream()
       .sorted()
       .forEach(System.out::println);  // Prints: 1, 2, 3, 4, 5
```

#### **`peek(Consumer<? super T> action)`**

**Purpose**: Allows you to inspect the elements as they pass through the stream, without modifying them.

**Usage**: It's often used for debugging purposes.

```java
EditList<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);
numbers.stream()
       .peek(n -> System.out.println("Before: " + n))
       .map(n -> n * n)
       .peek(n -> System.out.println("After: " + n))
       .forEach(System.out::println);  // Prints before and after squaring each number
```

### Terminal Operations

Terminal operations produce a result or side effect and terminate the stream pipeline.

#### **`forEach(Consumer<? super T> action)`**

**Purpose**: Performs an action on each element of the stream.

**Usage**: It processes each element of the stream and performs the specified action.

```java
EditList<String> words = Arrays.asList("apple", "banana", "cherry");
words.stream()
     .forEach(System.out::println); // Prints: apple, banana, cherry
```

#### **`collect(Collector<? super T, A, R> collector)`**

**Purpose**: Collects the elements of the stream into a collection (like `List`, `Set`, etc.) or any other type of result.

**Usage**: It is a very powerful and flexible operation to gather results from the stream.

```java
EditList<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);
List<Integer> squaredNumbers = numbers.stream()
                                      .map(n -> n * n)
                                      .collect(Collectors.toList());
System.out.println(squaredNumbers);  // Prints: [1, 4, 9, 16, 25]
```

#### **`reduce(T identity, BinaryOperator<T> accumulator)`**

**Purpose**: Performs a reduction on the elements of the stream using an associative accumulation function.

**Usage**: It combines elements of the stream into a single result.

```java
EditList<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);
int sum = numbers.stream()
                 .reduce(0, Integer::sum);  // Sum of the numbers
System.out.println(sum);  // Prints: 15
```

#### **`count()`**

**Purpose**: Returns the number of elements in the stream.

**Usage**: It is a straightforward way to count elements.

```java
EditList<String> words = Arrays.asList("apple", "banana", "cherry");
long count = words.stream().count();
System.out.println(count);  // Prints: 3
```

#### **`anyMatch(Predicate<? super T> predicate)`**

**Purpose**: Checks if any element in the stream matches the given condition.

**Usage**: It returns `true` if any element matches the predicate, otherwise `false`.

```java
EditList<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);
boolean hasEven = numbers.stream().anyMatch(n -> n % 2 == 0);
System.out.println(hasEven);  // Prints: true
```

#### **`allMatch(Predicate<? super T> predicate)`**

**Purpose**: Checks if all elements in the stream match the given condition.

**Usage**: It returns `true` if all elements match the predicate, otherwise `false`.

```java
EditList<Integer> numbers = Arrays.asList(2, 4, 6, 8);
boolean allEven = numbers.stream().allMatch(n -> n % 2 == 0);
System.out.println(allEven);  // Prints: true
```

#### **`noneMatch(Predicate<? super T> predicate)`**

**Purpose**: Checks if no elements in the stream match the given condition.

**Usage**: It returns `true` if no element matches the predicate, otherwise `false`.

```java
EditList<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);
boolean noNegative = numbers.stream().noneMatch(n -> n < 0);
System.out.println(noNegative);  // Prints: true
```

### Common Collectors

The `Collectors` class in Java provides a variety of predefined implementations for collecting results from a stream.

#### **`toList()`**

**Purpose**: Collects the stream elements into a `List`.

```java
EditList<String> words = Arrays.asList("apple", "banana", "cherry");
List<String> list = words.stream().collect(Collectors.toList());
```

#### **`toSet()`**

**Purpose**: Collects the stream elements into a `Set` (removes duplicates).

```java
EditList<Integer> numbers = Arrays.asList(1, 2, 2, 3, 4, 4, 5);
Set<Integer> set = numbers.stream().collect(Collectors.toSet());
```

#### **`joining()`**

**Purpose**: Joins the stream elements into a single `String` with an optional delimiter.

```
EditList<String> words = Arrays.asList("apple", "banana", "cherry");
String result = words.stream().collect(Collectors.joining(", "));
System.out.println(result);  // Prints: apple, banana, cherry
```

#### **`groupingBy()`**

**Purpose**: Groups the elements of the stream by a classifier function.

```java
EditList<String> words = Arrays.asList("apple", "banana", "cherry", "apricot");
Map<Character, List<String>> grouped = words.stream()
                                           .collect(Collectors.groupingBy(word -> word.charAt(0)));
System.out.println(grouped);  // Prints: {a=[apple, apricot], b=[banana], c=[cherry]}
```

#### **`partitioningBy()`**

**Purpose**: Partitions the elements of the stream into two groups based on a predicate.

```java
EditList<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);
Map<Boolean, List<Integer>> partitioned = numbers.stream()
                                                .collect(Collectors.partitioningBy(n -> n % 2 == 0));
System.out.println(partitioned);  // Prints: {false=[1, 3, 5], true=[2, 4]}
```

## forEach() Method in Iterable Interface

 The `forEach()` method is a **default method** introduced in the `Iterable` interface. It provides a simple way to iterate over a collection.

It allows for a more readable and functional-style iteration over collections, and you can use it with lambda expressions to define actions.

```java
 codeList<String> names = Arrays.asList("Alice", "Bob", "Charlie");

// Iterating with forEach using a lambda expression
names.forEach(name -> System.out.println(name));
```

**Note**: `forEach()` can be used with **streams** as well to apply an action to each element of a stream:

```java
numbers.stream().forEach(n -> System.out.println(n));
```

## Other Notable Features in Java 8

1. **Method References**: A shorthand notation for passing a method as an argument to a function. It improves the readability of the code.

   ```java
// Method Reference: Equivalent to (x) -> System.out.println(x)
   names.forEach(System.out::println);
```
   
2. **Date and Time API**: Java 8 introduced a new **Date-Time API** (`java.time.*`) that is **immutable** and **thread-safe**, addressing the flaws in the old `Date` and `Calendar` classes.

   - **LocalDate, LocalTime, LocalDateTime**: These are used for representing date and time without timezone.

   - **Instant, ZonedDateTime**: These are used for representing date and time with timezone and precise moments in time.

     ```java
     LocalDate date = LocalDate.now();
     LocalDate specificDate = LocalDate.of(2025, Month.MARCH, 17);
     ```

3. **Nashorn JavaScript Engine**: Java 8 introduced a **new JavaScript engine** called **Nashorn**, which is faster and more efficient than the previous **Rhino** engine.

4. **CompletableFuture**: For asynchronous programming, **`CompletableFuture`** allows you to write non-blocking asynchronous code that can be easily combined and composed.

5. **Collectors**: The `Collectors` utility class offers various factory methods to create common collectors, such as `toList()`, `joining()`, `groupingBy()`, and `partitioningBy()`.