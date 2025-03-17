---
title: Java OOP
date: 2025-03-05 23:21:45
tags: [Java, OOP, Key Points]
categories: Java
postImage: https://cdn.jsdelivr.net/gh/DyingDown/img-host-repo/202503171624063.png
description: Key points of Java OOP pillars, Abstract, Polymorphism, Inheritance, Encapsulation. And also about Interface and abstract class.
warning: false
isCarousel: false
---

## OOP

**OOP** stands for **Object-Oriented Programming**, which is a programming paradigm based on the concept of **objects**. It allows developers to structure code in a way that mimics real-world objects and their interactions.

In OOP, **objects** represent entities that have both **state** (attributes or properties) and **behavior** (methods or functions). The key principles of OOP help make software more modular, reusable, and maintainable.

These four pillars — **Encapsulation, Inheritance, Polymorphism, and Abstraction** — are the core principles that guide Object-Oriented Programming, making software design more efficient, flexible, and scalable.

## Inheritance

**Inheritance** is a fundamental concept in Object-Oriented Programming (OOP) that allows a new class (subclass or child class) to inherit the properties and behaviors (fields and methods) from an existing class (superclass or parent class). It promotes code reusability and establishes a hierarchy between the classes.

In Java, **single inheritance** is supported, meaning a class can inherit from only **one** superclass. However, through interfaces, Java can simulate multiple inheritance.

### Types of Inheritance in Java

1. **Single Inheritance**: A subclass inherits from one superclass.

   ```java
   class Animal {
       void eat() { System.out.println("Eating"); }
   }
   
   class Dog extends Animal {
       void bark() { System.out.println("Barking"); }
   }
   ```

2. **Multilevel Inheritance**: A subclass can inherit from a superclass, and then another subclass can inherit from that subclass, forming a chain.

   ```java
   class Animal {
       void eat() { System.out.println("Eating"); }
   }
   
   class Dog extends Animal {
       void bark() { System.out.println("Barking"); }
   }
   
   class Puppy extends Dog {
       void play() { System.out.println("Playing"); }
   }
   ```

3. **Hierarchical Inheritance**: Multiple classes can inherit from the same superclass.

   ```java
   class Animal {
       void eat() { System.out.println("Eating"); }
   }
   
   class Dog extends Animal {
       void bark() { System.out.println("Barking"); }
   }
   
   class Cat extends Animal {
       void meow() { System.out.println("Meowing"); }
   }
   ```

4. **Multiple Inheritance (through interfaces)**: Java does not allow a class to inherit from multiple classes (no direct multiple inheritance), but a class can implement multiple interfaces.

   ```java
   interface Animal {
       void eat();
   }
   
   interface Pet {
       void play();
   }
   
   class Dog implements Animal, Pet {
       public void eat() { System.out.println("Eating"); }
       public void play() { System.out.println("Playing"); }
   }
   ```

Java does **not** support **multiple inheritance** directly through classes due to ambiguity, but it can be achieved through interfaces.

### How to refer

In Java, `this` and `super` are both **keywords** that refer to the current instance of a class and its parent class, respectively. They are commonly used in **object-oriented programming** (OOP) to reference the current object and the parent class, enabling effective inheritance and object construction.

#### **`this` Keyword:**

- **Refers to the current object**: The `this` keyword refers to the **current instance** of the class where it is used. It is commonly used to differentiate between class fields and parameters or to call other constructors in the same class.
- **Used in Three Ways**:
  1. **Referring to instance variables**: `this` is used to refer to instance variables when there is a name conflict with method parameters.
  2. **Invoking the current class’s constructor**: Using `this()` to call another constructor within the same class.
  3. **Passing the current instance**: You can pass the current instance of the class (i.e., `this`) to other methods or constructors.

#### **`super` Keyword:**

- **Refers to the parent class**: The `super` keyword is used to refer to the **parent class**. It is mainly used to call the **parent class constructor** and access **parent class members** (fields and methods) that are hidden by the current class.
- **Used in Three Ways**:
  1. **Calling the parent class constructor**: `super()` is used to invoke the constructor of the parent class, typically the **no-argument constructor** or a **parameterized constructor**.
  2. **Accessing parent class fields**: When a field in the parent class is hidden by a field in the subclass, `super` is used to access the parent class field.
  3. **Calling a method from the parent class**: If a method is overridden in the subclass, `super` can be used to call the method from the parent class.

#### **Key Differences Between `this` and `super`:**

| **Feature**              | **`this`**                                                   | **`super`**                                                  |
| ------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| **Refers to**            | The current instance of the class.                           | The parent class (superclass).                               |
| **Used for**             | - Referring to instance variables.                           | - Calling parent class constructor.                          |
|                          | - Calling another constructor in the same class.             | - Accessing parent class members (fields/methods).           |
|                          | - Passing the current instance to other methods.             |                                                              |
| **Constructor Usage**    | `this()` can call another constructor in the same class.     | `super()` calls a parent class constructor.                  |
| **Field Access**         | `this.field` accesses the current class’s field.             | `super.field` accesses the parent class’s field.             |
| **Method Access**        | `this.method()` calls the method in the current class.       | `super.method()` calls the method from the parent class.     |
| **Initialization Order** | `this()` can be used to chain constructors in the same class. | `super()` must be the first statement in a subclass constructor. |

**Important :** `this()` and `super()` must be the **first statement** in a constructor.

### Diamond Problem

The **diamond problem** is a complication in languages that support **multiple inheritance**, where a class inherits from two classes that have a common ancestor. This leads to ambiguity about which method of the common ancestor should be invoked.

For example:

```java
class A {
    void show() { System.out.println("A's show()"); }
}

class B extends A {
    void show() { System.out.println("B's show()"); }
}

class C extends A {
    void show() { System.out.println("C's show()"); }
}

class D extends B, C {  // This will cause ambiguity in the show() method
    void show() { System.out.println("D's show()");
}
```

In the above example, class **D** inherits from both **B** and **C**, both of which have their own `show()` method. If an instance of **D** calls `show()`, it’s unclear whether it should call the method from **B** or **C**.

#### Resolution in Java:

Java **does not allow multiple inheritance** through classes, so this issue does not occur directly. However, **multiple inheritance** through interfaces is allowed, and Java resolves the diamond problem with the **`default` methods** in interfaces.

If multiple interfaces define a default method with the same signature, the class implementing both interfaces must override the method to resolve the ambiguity.

## Interface

An **interface** is a contract that defines a set of abstract methods (methods without a body) that must be implemented by any class that implements the interface. Unlike classes, interfaces cannot have method implementations (except for default and static methods introduced in Java 8).

**Syntax of an Interface**:

```java
interface Animal {
    void sound();  // abstract method
}

class Dog implements Animal {
    @Override
    public void sound() {
        System.out.println("Woof!");
    }
}

class Cat implements Animal {
    @Override
    public void sound() {
        System.out.println("Meow!");
    }
}

public class Main {
    public static void main(String[] args) {
        Animal dog = new Dog();
        Animal cat = new Cat();
        
        dog.sound(); // Output: Woof!
        cat.sound(); // Output: Meow!
    }
}
```

In Java 8 and later, interfaces can have **default methods** with a body. This allows interfaces to provide method implementations, which is particularly useful for extending interfaces without breaking existing code.

```java
interface MyInterface {
    default void defaultMethod() {
        System.out.println("This is a default method.");
    }
}
```

A class that implements this interface can choose to override the `defaultMethod()`, but it's not mandatory.

Interfaces can also have **static methods** in addition to abstract methods. Static methods in interfaces must be called using the interface name.

```java
interface MyInterface {
    static void staticMethod() {
        System.out.println("This is a static method in an interface.");
    }
}

public class Main {
    public static void main(String[] args) {
        MyInterface.staticMethod();  // Calling static method in interface
    }
}
```

### **Functional Interface (Java 8)**

A **functional interface** is an interface that contains **exactly one abstract method**. These are used primarily with **lambda expressions**.

- A functional interface can have multiple default or static methods, but only **one abstract method**.
- It is often used in the context of functional programming (e.g., passing behavior to methods).

Example:

```java
@FunctionalInterface
interface Calculator {
    int add(int a, int b);  // Single abstract method

    // You can have default or static methods
    default void displayMessage() {
        System.out.println("This is a functional interface.");
    }
}
```

- The `@FunctionalInterface` annotation is optional but can be used to indicate the intent and enforce the constraint of one abstract method.

## Aggregation/Composition

### Aggregation

**Aggregation** is a "has-a" relationship, where one object **owns** or **contains** another object, but the contained object **can exist independently** of the container object.

- **Example**: A `Library` class can have many `Book` objects, but if the `Library` is destroyed, the `Books` still exist and can belong to another library or not.
- The relationship is **loose**: the lifetime of the contained object (like a `Book`) is not controlled by the container (like a `Library`).

Characteristics of Aggregation:

- Represents a **weak relationship** between classes.
- The **contained object** can exist independently of the container.
- The **lifetime** of the contained object is not managed by the container.

```java
class Book {
    private String title;

    public Book(String title) {
        this.title = title;
    }

    public String getTitle() {
        return title;
    }
}

class Library {
    private String name;
    private List<Book> books;

    public Library(String name) {
        this.name = name;
        this.books = new ArrayList<>();
    }

    public void addBook(Book book) {
        books.add(book);
    }
}
```

In this example, a `Library` aggregates `Book` objects. If the `Library` is destroyed, the `Book` objects can still exist independently.

###  Composition

**Composition** is a stronger form of **Aggregation**. It also represents a "has-a" relationship, but in this case, the contained object **cannot exist independently** of the container object. When the container object is destroyed, all its contained objects are destroyed as well.

- **Example**: A `House` has many `Room` objects. If the `House` is destroyed, the `Rooms` are destroyed too, because a `Room` cannot exist without a `House`.
- The relationship is **strong**: the contained object's **lifetime** is managed by the container.

Characteristics of Composition:

- Represents a **strong relationship** between classes.
- The **contained object** cannot exist without the container.
- The **lifetime** of the contained object is tied to the container.

```java
class Room {
    private String roomName;

    public Room(String roomName) {
        this.roomName = roomName;
    }

    public String getRoomName() {
        return roomName;
    }
}

class House {
    private String address;
    private List<Room> rooms;

    public House(String address) {
        this.address = address;
        this.rooms = new ArrayList<>();
    }

    public void addRoom(String roomName) {
        rooms.add(new Room(roomName));  // Create a new Room instance within the House
    }

    // House will manage the Room's lifecycle
}
```

In this example, a `House` **composes** `Room` objects. If the `House` is destroyed, all `Room` objects associated with it will also be destroyed. The `Room` objects cannot exist without the `House`.

------

### **Differences Between Aggregation and Composition**

| Feature                      | Aggregation                                                  | Composition                                                  |
| ---------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| **Strength of Relationship** | Weak relationship: the contained object can exist independently. | Strong relationship: the contained object cannot exist without the container. |
| **Lifetime Management**      | The container doesn't manage the lifetime of the contained objects. | The container controls the lifetime of the contained objects. |
| **Example**                  | `Library` and `Book` (a book can exist without a library)    | `House` and `Room` (a room cannot exist without a house)     |
| **Dependence**               | Contained object can be shared with other objects.           | Contained object is tightly bound to the container object.   |

## Polymorphism

**Polymorphism** is a key concept in Object-Oriented Programming (OOP), and it literally means "**many forms**." In simple terms, **polymorphism allows objects of different classes to be treated as objects of a common superclass**. The main idea is that the **same action** can behave differently based on the object it is acting upon. **Polymorphism** means that the **same action** can be **performed differently** based on the object doing it.

### Compile-time Polymorphism (Method Overloading)

- **What it is**: Polymorphism that happens when you have multiple methods with the same name but **different parameters** (different number or types of arguments).
- **How it works**: The method to call is determined by the number and type of parameters at **compile time**.

```java
class Calculator {
    public int add(int a, int b) {
        return a + b;
    }

    public double add(double a, double b) {
        return a + b;
    }
    
    public String add(String a, String b) {
        return a + b;
    }
}

public class Main {
    public static void main(String[] args) {
        Calculator calc = new Calculator();

        // Calls the int version of the add method
        System.out.println(calc.add(5, 10));  // Output: 15

        // Calls the double version of the add method
        System.out.println(calc.add(5.5, 10.5));  // Output: 16.0

        // Calls the String version of the add method
        System.out.println(calc.add("Hello ", "World"));  // Output: Hello World
    }
}
```

Here, the method `add` is **overloaded**. The correct version of the method is determined based on the type and number of arguments passed when calling it. This is **compile-time polymorphism**.

### Runtime Polymorphism (Method Overriding)

- **What it is**: Polymorphism that happens when a **subclass provides a specific implementation** of a method that is already defined in its superclass.
- **How it works**: The method to call is determined at **runtime** based on the object type, not the reference type.

```java
class Animal {
    public void sound() {
        System.out.println("Animal makes a sound");
    }
}

class Dog extends Animal {
    @Override
    public void sound() {
        System.out.println("Dog barks");
    }
}

class Cat extends Animal {
    @Override
    public void sound() {
        System.out.println("Cat meows");
    }
}

public class Main {
    public static void main(String[] args) {
        Animal myAnimal = new Animal();  // Animal reference and object
        Animal myDog = new Dog();        // Animal reference but Dog object
        Animal myCat = new Cat();        // Animal reference but Cat object

        myAnimal.sound();  // Output: Animal makes a sound
        myDog.sound();     // Output: Dog barks
        myCat.sound();     // Output: Cat meows
    }
}
```

In this case:

- Even though `myDog` and `myCat` are both of type `Animal`, they are referring to objects of **different classes** (Dog and Cat).
- The `sound()` method is **overridden** in `Dog` and `Cat`.
- The correct method to call is determined at **runtime** based on the object type (`Dog` or `Cat`), not the reference type (`Animal`).

## Abstraction

 It refers to the concept of hiding the complex implementation details of an object and exposing only the necessary and relevant features or operations to the outside world.

In simple terms, **abstraction** is about **showing the essential features** of an object while **hiding the unnecessary details**. This allows programmers to focus on **what an object does** rather than **how it does it**.

In Java, we can achieve abstraction using:

1. **Abstract classes**
2. **Interfaces**

### Abstract Class

An **abstract class** in Java is a class that cannot be instantiated (you cannot create an object directly from it). It may contain abstract methods (methods without a body) and concrete methods (methods with a body). The abstract methods in an abstract class must be implemented by its subclasses unless the subclass is also abstract.

Key Points about Abstract Class:

1. **Cannot be instantiated**: You cannot create an object of an abstract class directly.
2. **Can have both abstract and concrete methods**: It can contain methods with a body (concrete methods) and methods without a body (abstract methods).
3. **Constructors**: An abstract class can have constructors. These constructors are called when a subclass is instantiated.
4. **Fields**: It can have instance variables (fields) and can also have static fields.
5. **Access Modifiers**: Methods and fields in an abstract class can have any access modifier (private, protected, public).
6. **Used when there is common behavior across subclasses**: If you have methods that are common to all subclasses but also need some specific implementation in the subclasses, an abstract class is a good choice.

```java
abstract class Animal {
    // Abstract method (no body)
    public abstract void sound();
    
    // Concrete method
    public void eat() {
        System.out.println("This animal eats food.");
    }
    
    // Constructor of abstract class
    public Animal() {
        System.out.println("Animal is created");
    }
}

class Dog extends Animal {
    // Providing implementation for the abstract method
    public void sound() {
        System.out.println("Dog barks");
    }
}

public class Main {
    public static void main(String[] args) {
        Dog myDog = new Dog();  // Output: Animal is created
        myDog.sound();  // Output: Dog barks
        myDog.eat();    // Output: This animal eats food.
    }
}
```

### Abstract Class vs Interface

| Feature                           | Abstract Class                                               | Interface                                                    |
| --------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| **Purpose**                       | To provide common functionality to subclasses.               | To define a contract for implementing classes.               |
| **Methods**                       | Can have both abstract and concrete methods.                 | Can have only abstract methods (before Java 8), but can have default methods (Java 8+). |
| **Multiple Inheritance**          | A class can inherit from only **one abstract class**.        | A class can implement **multiple interfaces**.               |
| **Constructor**                   | Can have constructors.                                       | Cannot have constructors.                                    |
| **Access Modifiers**              | Can have access modifiers like `public`, `private`, `protected`. | All methods are **public** by default.                       |
| **Fields**                        | Can have instance variables and static fields.               | All fields are implicitly `public static final`.             |
| **Default Method Implementation** | Not allowed to have default methods.                         | Can have **default methods** (Java 8+).                      |
| **When to use**                   | When you want to share code among closely related classes.   | When you want to define a contract for classes, without enforcing how the methods are implemented. |
| **Instantiation**                 | Cannot instantiate directly, but can have constructors.      | Cannot instantiate directly.                                 |
| **Implementation Requirement**    | Subclasses must implement all abstract methods.              | Implementing classes must implement all methods unless they are default methods. |

When to Use an Abstract Class vs an Interface:

1. **Use an abstract class** when:
   - You want to share code among closely related classes.
   - You want to provide a common implementation for some methods and leave others abstract for subclasses.
   - You need instance variables or constructors.
2. **Use an interface** when:
   - You want to define a contract for implementing classes, i.e., a set of methods that must be implemented.
   - You want multiple inheritance (since Java doesn’t allow multiple inheritance of classes, interfaces help you achieve this).
   - You don’t need to provide method implementation but want to define some default behavior (Java 8+).

## Encapsulation

It refers to the bundling of data (variables) and methods (functions) that operate on the data into a single unit, i.e., a **class**. More importantly, it is a concept that helps control access to the data by restricting how it can be modified or accessed.

### Key Points of Encapsulation:

1. **Hiding Internal State**:
   - Encapsulation allows you to hide the internal details (or state) of an object and expose only what is necessary to the outside world. This is achieved by **making fields private** and providing **public getter and setter methods** to access and modify these fields.
2. **Access Control**:
   - By controlling access to the internal state of an object, you can enforce certain rules on how data is accessed or modified, which improves security and reduces the chances of the object’s state being changed in unintended ways.
3. **Modularity**:
   - Encapsulation allows you to separate the internal workings of a class from its external interface. This makes it easier to maintain and update code because the changes to the internal workings don’t affect the outside users of the class.

### **Benefits of Encapsulation**:

1. **Data Hiding**:
   - The internal state of an object is hidden from the outside world, ensuring that the object is in a valid state and cannot be modified incorrectly.
2. **Control Over Data**:
   - With setters, you can validate and control how data is modified. For example, you might want to prevent setting an invalid age or name.
3. **Increased Flexibility**:
   - Since the internal data is hidden, you can change the internal implementation without affecting external code. If you need to modify the internal workings of a class, you can do so without changing how other classes interact with it.
4. **Improved Security**:
   - By controlling how the data is accessed and modified, you can enforce constraints (like validation) to prevent improper data manipulation, improving security.

### **Encapsulation vs. Abstraction**:

- **Encapsulation** is about **hiding the internal details** of how an object works and only exposing necessary information. It’s implemented by making fields private and providing methods (getters and setters).
- **Abstraction** is about **hiding complexity** by providing a simplified interface to the outside world. It allows you to focus on what an object does rather than how it does it. It is typically achieved using abstract classes or interfaces.