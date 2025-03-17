---
title: Java Collections
date: 2025-03-06 23:25:21
tags: [Java, Key Points, Collection]
categories: [Java]
postImage: https://cdn.jsdelivr.net/gh/DyingDown/img-host-repo/202503171724717.png
description: This article explores Java Collections and Map frameworks, detailing data structures like Lists, Sets, Queues, and Maps — essential for effective data management and manipulation in Java.
warning: fals
isCarousel: false
---

![](https://cdn.jsdelivr.net/gh/DyingDown/img-host-repo/202503170105997.png)

## Collection

### **Common Methods in Collection Interfaces**

- **add()**: Adds an element to the collection.
- **remove()**: Removes an element from the collection.
- **size()**: Returns the number of elements in the collection.
- **contains()**: Checks if the collection contains a specific element.
- **clear()**: Removes all elements from the collection.
- **isEmpty()**: Checks if the collection is empty.
- **iterator()**: Returns an iterator to iterate over the elements.
- **forEach()**: Iterates over each element in the collection (Java 8+).

### **Iterating Through Collections**

You can iterate over collections using **Iterator** or enhanced `for` loop.

1. **Using Iterator**:

   ```java
   Iterator<String> iterator = fruits.iterator();
   while (iterator.hasNext()) {
       System.out.println(iterator.next());
   }
   ```

2. **Using Enhanced for-loop**:

   ```java
   for (String fruit : fruits) {
       System.out.println(fruit);
   }
   ```

### **Collections Class Utility Methods**

The **Collections** class provides several utility methods to work with collections, such as:

- **sort(List<T> list)**: Sorts the list.
- **reverse(List<?> list)**: Reverses the list.
- **shuffle(List<?> list)**: Randomizes the order of elements in the list.
- **max(Collection<? extends T> coll)**: Returns the maximum element from the collection.
- **min(Collection<? extends T> coll)**: Returns the minimum element from the collection.

## List

A **List** is an ordered collection (or sequence) that allows duplicate elements. Elements in a List are indexed, meaning each element is positioned at a specific index and can be accessed via its index.

### **Unique Methods** in `List`:

- **add(int index, E element)** – Insert at a specific index.
- **remove(int index)** – Remove by index.
- **set(int index, E element)** – Modify element at specific index.
- **get(int index)** – Access element by index.
- **indexOf(Object o)** – Find the index of the first occurrence.
- **lastIndexOf(Object o)** – Find the index of the last occurrence.
- **subList(int fromIndex, int toIndex)** – Get a portion of the list.
- **listIterator()** – Get an iterator that can traverse both forward and backward.
- **addAll(Collection<? extends E> c)** - Adds all the elements from the specified collection to the list.

Implementations of the List Interface:

### ArrayList

- A dynamically resizing array implementation of the List interface.
- Provides **fast random access** (constant time for `get()` and `set()` operations).
- Slower for **insertions and deletions** in the middle of the list because it may need to shift elements.

```java
List<String> fruits = new ArrayList<>();
fruits.add("Apple");
fruits.add("Banana");
fruits.add("Cherry");
System.out.println(fruits);  // Output: [Apple, Banana, Cherry]
```

### LinkedList

- A doubly-linked list implementation of the List interface.
- Provides fast insertions and deletions, but slower random access because it needs to traverse the list.
- It implements both **List** and **Queue** interfaces, so it can be used as a queue or stack.

```java
List<String> fruits = new LinkedList<>();
fruits.add("Apple");
fruits.add("Banana");
fruits.add("Cherry");
System.out.println(fruits);  // Output: [Apple, Banana, Cherry]
```

#### ArrayList vs LinkedList

| Feature                | **ArrayList**                                                | **LinkedList**                                               |
| ---------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| **Memory structure**   | Stored in a **contiguous block of memory** (like an array).  | Stored as **nodes** in **heap memory**, each holding data + pointers. |
| **Resizing**           | Automatically **resizes** when full by copying elements to a new, **1.5x larger** array. | **No resizing** — just adds/removes nodes, updating pointers. |
| **Memory overhead**    | **Less overhead** (stores only data).                        | **More overhead** (stores data + pointers for next/prev nodes). |
| **Cache performance**  | **Cache-friendly** — elements are stored **sequentially**, helping CPU fetch data faster. | **Cache-unfriendly** — nodes are scattered in memory, causing **pointer chasing**. |
| **Insertion/Deletion** | **Slower** — needs **shifting** elements when adding/removing (except at the end). | **Faster** — adding/removing nodes is quick (only pointer updates). |
| **Access time**        | **Faster** (O(1)) — can directly access any index.           | **Slower** (O(n)) — must **traverse nodes** from the head/tail to find an element. |
| **Best use case**      | **Frequent access** to elements by index.                    | **Frequent additions/removals** (especially at the start/middle). |

### Vector

- A legacy class that is similar to **ArrayList** but **synchronized**, making it thread-safe.
- Generally, it's not recommended to use **Vector** in modern Java code due to performance issues with synchronization.

### Stack

- A subclass of **Vector** that implements the **Stack** data structure (LIFO - Last In First Out).
- Provides methods like `push()`, `pop()`, and `peek()` for stack operations.

```java
Stack<String> stack = new Stack<>();
stack.push("Apple");
stack.push("Banana");
stack.push("Cherry");
System.out.println(stack);  // Output: [Apple, Banana, Cherry]
System.out.println(stack.pop());  // Output: Cherry
```

## Queue

In Java, a **Queue** is a collection used to store elements in a particular order, typically following the **FIFO (First-In-First-Out)** principle. This means the first element added to the queue will be the first one to be removed.

### Methods of `Queue`:

1. **`add(E e)`**: Adds the specified element to the queue. If the element cannot be added (due to capacity restrictions), it throws an `IllegalStateException`.
2. **`offer(E e)`**: Adds the specified element to the queue. Unlike `add()`, it does not throw an exception if the queue is full; it simply returns `false` if the element cannot be added.
3. **`remove()`**: Removes and returns the head of the queue. Throws `NoSuchElementException` if the queue is empty.
4. **`poll()`**: Removes and returns the head of the queue. Returns `null` if the queue is empty.
5. **`element()`**:  Returns the head of the queue without removing it. Throws `NoSuchElementException` if the queue is empty.
6. **`peek()`**: Returns the head of the queue without removing it. Returns `null` if the queue is empty.

### Queue Implementations:

1. **`LinkedList`**:

   - `LinkedList` implements the `Queue` interface and can be used as a basic queue. It is efficient for adding/removing elements from both ends.

   ```java
   Queue<String> queue = new LinkedList<>();
   queue.add("Apple");
   ```

2. **`PriorityQueue`**:

   - Unlike other queues, `PriorityQueue` orders its elements based on their natural ordering or a specified comparator. It does not follow FIFO strictly; instead, it processes elements based on their priority.

   ```java
   Queue<Integer> queue = new PriorityQueue<>();
   queue.add(10);
   queue.add(20);
   queue.add(5);  // The head will be 5 because it's the lowest priority
   System.out.println(queue.peek());  // Output: 5
   ```

## Set

In Java, a **Set** is a collection that does not allow duplicate elements and does not guarantee any specific order of elements. It models the mathematical set abstraction, where each element in the collection must be unique. 

### Common Methods in Set:

1. **`add(E e)`**: Adds the specified element to the set. If the element already exists, the set remains unchanged, and it returns `false`.

2. **`remove(Object o)`**: Removes the specified element from the set. If the element exists, it is removed, and the method returns `true`. Otherwise, it returns `false`.

3. **`contains(Object o)`**: Returns `true` if the set contains the specified element, otherwise `false`.

4. **`size()`**: Returns the number of elements in the set.

5. **`isEmpty()`**: Returns `true` if the set contains no elements, otherwise `false`.

6. **`clear()`**: Removes all elements from the set.

7. **`iterator()`**: Returns an iterator over the elements in the set. The iteration order is typically not predictable (unless using `LinkedHashSet` or `TreeSet`).

   ```java
   Iterator<String> iterator = set.iterator();
   while (iterator.hasNext()) {
       System.out.println(iterator.next());
   }
   ```

### Common Implementations of Set:

1. **HashSet**:

   - Implements the `Set` interface and does not maintain any order of its elements.
   - It uses a hash table to store the elements and provides constant-time performance for basic operations (add, remove, contains).

   ```java
   Set<String> set = new HashSet<>();
   set.add("Apple");
   set.add("Banana");
   set.add("Cherry");
   set.add("Apple");  // This will not be added again.
   System.out.println(set);  // Output: [Apple, Banana, Cherry] (Order may vary)
   ```

2. **LinkedHashSet**:

   - Implements the `Set` interface and maintains the order in which elements were inserted.
   - It provides predictable iteration order (insertion order).

   ```java
   Set<String> set = new LinkedHashSet<>();
   set.add("Apple");
   set.add("Banana");
   set.add("Cherry");
   set.add("Apple");  // This will not be added again.
   System.out.println(set);  // Output: [Apple, Banana, Cherry] (Order preserved)
   ```

3. **TreeSet**:

   - Implements the `Set` interface and stores elements in a sorted order according to their natural ordering or a specified comparator.
   - It provides logarithmic time complexity for basic operations (add, remove, contains).

   ```java
   Set<Integer> set = new TreeSet<>();
   set.add(10);
   set.add(5);
   set.add(20);
   set.add(15);
   System.out.println(set);  // Output: [5, 10, 15, 20] (Sorted in natural order)
   ```

## Map

A `Map` in Java is a collection that stores **key-value pairs** — kind of like a dictionary! It’s part of the `java.util` package but does **not** extend `Collection`. Let’s break it down into key points:

### Key Characteristics

- **Stores key-value pairs:** Each key is unique, and each key maps to **one value**.

- **No duplicate keys:** If you insert a new entry with an existing key, it **overwrites** the old value.

- Allows null values

   (depending on the implementation).

  - `HashMap` allows **1 null key** and **multiple null values**.
  - `TreeMap` and `Hashtable` **don’t** allow null keys.

### Common Implementations

Here are the most used `Map` implementations and their differences:

| Implementation        | Ordering                      | Null Keys/Values                   | Thread-Safe                   | Performance                        |
| --------------------- | ----------------------------- | ---------------------------------- | ----------------------------- | ---------------------------------- |
| **HashMap**           | ❌ Unordered                   | ✅ 1 null key, multiple null values | ❌ No                          | ⚡ Fast (O(1) get/put)              |
| **LinkedHashMap**     | ✅ Insertion order             | ✅ Same as `HashMap`                | ❌ No                          | ⚡ Slightly slower than `HashMap`   |
| **TreeMap**           | ✅ Sorted (natural/comparator) | ❌ No null keys, ✅ null values      | ❌ No                          | 🐢 Slower (O(log n)) due to sorting |
| **Hashtable**         | ❌ Unordered                   | ❌ No null keys/values              | ✅ Yes                         | 🐌 Slower (legacy)                  |
| **ConcurrentHashMap** | ❌ Unordered                   | ❌ No null keys/values              | ✅ Yes (better than Hashtable) | ⚡ Good for concurrency             |

### Essential Methods

| **Method**                | **Description**                                  |
| ------------------------- | ------------------------------------------------ |
| `put(key, value)`         | Inserts or updates a key-value pair              |
| `get(key)`                | Returns the value for the given key              |
| `remove(key)`             | Removes the key-value pair                       |
| `containsKey(key)`        | Checks if the map has the given key              |
| `containsValue(value)`    | Checks if the map has the given value            |
| `keySet()`                | Returns a `Set` of all keys                      |
| `values()`                | Returns a `Collection` of all values             |
| `entrySet()`              | Returns a `Set` of `Map.Entry` (key-value pairs) |
| `putIfAbsent(key, value)` | Inserts only if the key doesn’t exist            |
| `replace(key, value)`     | Replaces the value for an existing key           |

###  Traversing a Map

Here are 3 popular ways to loop through a map:

**Using `for-each` and `entrySet()`**

```java
for (Map.Entry<String, Integer> entry : map.entrySet()) {
    System.out.println(entry.getKey() + " = " + entry.getValue());
}
```

**Using `keySet()` (keys only)**

```java
for (String key : map.keySet()) {
    System.out.println(key + " -> " + map.get(key));
}
```

**Using `forEach()` (Java 8 Lambda)**

```java
map.forEach((key, value) -> System.out.println(key + " : " + value));
```

### Special Map Features

- **Immutable Maps** (Java 9+)

  ```java
  Map<String, String> map = Map.of("key1", "value1", "key2", "value2");
  ```

- **Sorted Maps:**
   `TreeMap` keeps keys **sorted** by natural order or a custom `Comparator`.

- **Thread-safe Maps:**

  - `Hashtable` (legacy, slow).
  - `ConcurrentHashMap` (modern, faster alternative).

### `HashCode()`

- **`hashCode()`** is a method in Java that returns an **integer** value that is used to **identify objects** in **hash-based collections** (like `HashMap`, `HashSet`, `Hashtable`).
- It is used primarily in **hashing algorithms** to locate **objects** in **buckets** within collections.
- The **goal** of `hashCode()` is to efficiently map objects to **hash buckets** for fast lookups.

Why Override `hashCode()`

- If you override the `equals()` method, you **must override `hashCode()`** as well. This ensures that objects that are considered equal by `equals()` will return the same hash code.

The General Contract of `hashCode()`

- **Equal objects must have the same hash code**. This means:
  - If `a.equals(b)` is `true`, then `a.hashCode()` must be equal to `b.hashCode()`.
- **Unequal objects can have different hash codes**, but it's not required. It's just desirable for better performance (i.e., fewer collisions in hash-based collections).
- **Consistency**: The `hashCode()` value should remain **consistent** throughout the lifetime of the object, unless a property used in `equals()` and `hashCode()` is modified.

### Implements of HashMap

**Array of Buckets**: A `HashMap` is implemented using an array of **buckets** (typically an array of `Node` or `Entry` objects). Each bucket is a linked list (or a tree if collisions become too high) that stores key-value pairs.

When a key is added, the `HashMap` computes a **hash code** for the key using the key's `hashCode()` method.

The hash code is then transformed into an index for the bucket array using a hash function (e.g., `index = hashCode % array.length`).

**Collision Handling:**

- **Chaining (Linked List)**: If two keys have the same hash code (hash collision), the `HashMap` uses **chaining**, where each bucket stores a linked list of key-value pairs. Each node in the list contains the key, value, and a reference to the next node in the same bucket.
- **Tree Nodes**: In case of a large number of collisions, Java 8 introduced **tree-based** collision resolution (using `TreeNode`) for better performance (O(log n) instead of O(n) in case of long chains).

When the number of elements exceeds a certain threshold (based on the **load factor**, typically 0.75), the `HashMap` **doubles the array size** and rehashes the existing entries to new bucket locations.

## Functional Interface: Comparable vs Comparator

In Java, both **`Comparable`** and **`Comparator`** are functional interfaces used for comparing objects, but they serve different purposes and are used in different contexts.

### `Comparable` Interface

- **Purpose**: Used to define the **natural ordering** of objects. It allows a class to specify how its instances should be compared.

- **Location**: It is implemented by the class whose instances need to be compared.

- **Method**: It has a single method:

  ```java
  int compareTo(T o);
  ```

  - **Parameter**: It compares the current object (`this`) with another object (`o`).
  - Return value:
    - A negative value if `this` is less than `o`.
    - Zero if `this` is equal to `o`.
    - A positive value if `this` is greater than `o`.

- **Example**:

  ```java
  class Student implements Comparable<Student> {
      int rollNo;
      String name;
  
      public Student(int rollNo, String name) {
          this.rollNo = rollNo;
          this.name = name;
      }
  
      @Override
      public int compareTo(Student other) {
          return this.rollNo - other.rollNo; // Compare by roll number
      }
  }
  
  public class Main {
      public static void main(String[] args) {
          List<Student> students = new ArrayList<>();
          students.add(new Student(3, "Alice"));
          students.add(new Student(1, "Bob"));
          students.add(new Student(2, "Charlie"));
  
          Collections.sort(students);  // Sorts based on compareTo
      }
  }
  ```

- **When to Use**: Use `Comparable` when the class has a **natural order** (e.g., sorting by age, name, or any primary field).

### `Comparator` Interface

- **Purpose**: Used to define **custom ordering** of objects, separate from the natural order defined by `Comparable`. A `Comparator` is useful when you want to compare objects based on multiple fields or in different ways.

- **Location**: A separate class implements the `Comparator` interface, not the object being compared.

- **Method**: It has two methods:

  - `int compare(T o1, T o2);`
  - `boolean equals(Object obj);` (optional for `Comparator` interface, not always used)

  The `compare` method compares two objects and returns:

  - A negative value if `o1` is less than `o2`.
  - Zero if `o1` is equal to `o2`.
  - A positive value if `o1` is greater than `o2`.

- **Example**:

  ```java
  class Student {
      int rollNo;
      String name;
  
      public Student(int rollNo, String name) {
          this.rollNo = rollNo;
          this.name = name;
      }
  }
  
  class StudentNameComparator implements Comparator<Student> {
      @Override
      public int compare(Student s1, Student s2) {
          return s1.name.compareTo(s2.name); // Compare by name
      }
  }
  
  public class Main {
      public static void main(String[] args) {
          List<Student> students = new ArrayList<>();
          students.add(new Student(3, "Alice"));
          students.add(new Student(1, "Bob"));
          students.add(new Student(2, "Charlie"));
  
          // Sort students by name using Comparator
          Collections.sort(students, new StudentNameComparator());
      }
  }
  ```

- **When to Use**: Use `Comparator` when you need to define multiple ways to compare objects or if you want to compare objects based on fields that don't represent the natural ordering.

### Key Differences

| Feature            | `Comparable`                                                | `Comparator`                                                 |
| ------------------ | ----------------------------------------------------------- | ------------------------------------------------------------ |
| **Implemented by** | The class whose instances are being compared.               | A separate class or anonymous class.                         |
| **Purpose**        | Defines the **natural ordering** of objects.                | Defines **custom orderings** of objects.                     |
| **Method**         | `compareTo(T o)`                                            | `compare(T o1, T o2)`                                        |
| **When to Use**    | When you want to define a default ordering (natural order). | When you need multiple or different ways to compare objects. |

## Functional Interface

A **functional interface** in Java is an interface that has exactly one abstract method, but it can have multiple default or static methods. Functional interfaces are used primarily in lambda expressions and method references.

The `@FunctionalInterface` annotation is optional, but it helps to clarify that the interface is intended to be functional. The compiler will also check that the interface conforms to the rules of a functional interface.

### Common Built-in Functional Interfaces:

#### **`Predicate<T>`**

- **Purpose**: Represents a boolean-valued function of one argument. It is commonly used for filtering or matching.
- Method:
  - `boolean test(T t)`: Evaluates the predicate on the given argument.
- **Common Use**: Used when you want to test whether an object satisfies a condition.

#### Example:

```java
javaCopy codeimport java.util.function.Predicate;

public class Main {
    public static void main(String[] args) {
        Predicate<String> isLongString = (s) -> s.length() > 5;
        
        System.out.println(isLongString.test("Hello")); // false
        System.out.println(isLongString.test("Hello World")); // true
    }
}
```

### `Function<T, R>`

- **Purpose**: Represents a function that takes one argument of type `T` and returns a result of type `R`. It is useful for transformations and mappings.
- Methods:
  - `R apply(T t)`: Applies the function to the given argument.
  - `default <V> Function<T, V> andThen(Function<? super R, ? extends V> after)`: Composes the function to apply after the current function.
  - `default <V> Function<V, R> compose(Function<? super V, ? extends T> before)`: Composes the function to apply before the current function.
- **Common Use**: It is commonly used in mapping, transforming values, or converting data types.

#### Example:

```java
javaCopy codeimport java.util.function.Function;

public class Main {
    public static void main(String[] args) {
        Function<String, Integer> stringLength = (s) -> s.length();
        
        System.out.println(stringLength.apply("Hello")); // 5
    }
}
```

### `Consumer<T>`

- **Purpose**: Represents an operation that accepts a single input argument and returns no result. It is used for operations that consume input, but don’t return any output (e.g., printing or modifying a value).
- Method:
  - `void accept(T t)`: Performs the operation on the given argument.
  - `default Consumer<T> andThen(Consumer<? super T> after)`: Combines two `Consumer` operations where the second is executed after the first one.
- **Common Use**: Useful for performing side effects, such as modifying a value, printing to the console, or updating collections.

#### Example:

```java
javaCopy codeimport java.util.function.Consumer;

public class Main {
    public static void main(String[] args) {
        Consumer<String> printMessage = (message) -> System.out.println(message);
        
        printMessage.accept("Hello, World!"); // Prints "Hello, World!"
    }
}
```

### `Supplier<T>`

- **Purpose**: Represents a supplier of results, which takes no arguments but returns a result of type `T`. It is often used to generate or supply values.
- Method:
  - `T get()`: Returns a result.
- **Common Use**: Used when you need a lazy evaluation, such as generating random values, or obtaining data from a source (like a database or a file).

#### Example:

```java
javaCopy codeimport java.util.function.Supplier;

public class Main {
    public static void main(String[] args) {
        Supplier<Double> randomValue = () -> Math.random();
        
        System.out.println(randomValue.get()); // Prints a random number between 0 and 1
    }
}
```