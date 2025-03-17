---
title: Thread in Java
date: 2025-03-11 15:21:36
tags: [Java, Thread, Key Points]
categories: Java
postImage: https://cdn.jsdelivr.net/gh/DyingDown/img-host-repo/202503120010395.png
description: This article dives into Java threading concepts, covering thread creation, lifecycle, synchronization, and thread safety — essential for writing efficient, concurrent, and deadlock-free programs.
warning: false
isCarousel: true
---

## Create a Thread

### Thread Class

`Thread` is a class that represents a thread of execution in a program. It can be extended to create a custom thread.

```java
class MyThread extends Thread {
    @Override
    public void run() {
        System.out.println("Thread running");
    }
}

public class Main {
    public static void main(String[] args) {
        MyThread t = new MyThread();
        t.start();
    }
}
```

When we use it, we just simply create a subclass of `Thread` and override the `run()` method. Then we need to call the `start()` method so that Java will internally call our `run()` method in a new thread.

Once we extended from Thread, we won’t be able to extend other class. Threads are tightly coupled with tasks, so they are not reusable. We can not call `start()` again even if the Thread has finished the execution.

It belongs to the`java.lang.Thread` package.

### Runnable Interface

The `Runnable` interface represents a task that can be executed by a `Thread`. Instead of creating a new thread instance, we can just pass the task to a Thread object. 

```java
Runnable task = new Runnable() {
    @Override
    public void run() {
        System.out.println("Runnable is running...");
    }
};
Thread thread = new Thread(task);
thread.start();
```

There is also a simpler way by using Lambda Expressions in Java 8 and later.

```java
Thread thread = new Thread(() -> System.out.println("Runnable is running..."));
thread.start();
```

This approach is generally better than extending from Thread. Because in this way, the task(Runnable) and the thread(Thread) are decoupled.  We don’t have to keep creating different instances for same logic process. Also, the lambda expression makes the code simple and easy to understand.

Moreover, `Runnable` also supports **Thread Pooling**. If we directly use Thread, every time we need to execute a task, a new OS-level thread is create, which is expensive in terms of performance. With `Runnable`, we can submit a thread to a thread pool. Thread pool reduces the overhead of creating and destroying threads, and the threads are reused, making the execution faster and more efficient.

```java
ExecutorService executor = Executors.newFixedThreadPool(3);
Runnable task = () -> System.out.println("Task running...");
executor.submit(task);
executor.submit(task);  // Efficient reuse of threads
executor.shutdown();
```

It belongs to `java.lang.Runnable` package.

### Callable Interface

`Callable` is an interface that is similar to `Runnable`. But it can have return value and throw an exception. 

```java
import java.util.concurrent.*;

class MyTask implements Callable<Integer> {
    @Override
    public Integer call() throws Exception {
        return 42;
    }
}

public class Main {
    public static void main(String[] args) throws Exception {
        ExecutorService executor = Executors.newSingleThreadExecutor();
        Future<Integer> future = executor.submit(new MyTask());
        Integer result = future.get(); // Blocks and waits for result
        System.out.println("Result: " + result);
        executor.shutdown();
    }
}

```

Shorter way:

```java
import java.util.concurrent.*;

public class CallableLambdaExample {
    public static void main(String[] args) throws Exception {
        ExecutorService executor = Executors.newSingleThreadExecutor();
        Future<Integer> future = executor.submit(() -> {
            return 42;
        });
        System.out.println("Result: " + future.get()); // Blocks until the result is ready
        executor.shutdown();
    }
}
```

The `Callable` must be used with `ExecuterService`, the call method doesn’t start a thread directly, all thread is managed by ExecutorService. The result of stored in `Future<T>` object.

## Lifecycle

- NEW: The lifecycle is created but has not started yet. This is when you call the Thread constructor, but haven’t called the `start()` yet.
- RUNNABLE: the thread is ready to run or waiting the CPU to be allocated to it. A thread is in this state when you called `start()`. However, it might not be in this state immediately due to the availability of CPU. (It is either in the runnable queue for actively executing).
  - WAITING: The thread is waiting indefinitely for another thread to perform a particular action. Methods like `Object.wait()`, `Thread.join()`, `Lock.lock()` can cause a Thread into the waiting state.
- BLOCKED: The thread is trying to acquire a lock but it is locked. This happens when a thread tries to access a synchronized block or method that is locked by another thread.
- TERMINATED: the thread has finished execution because it has completed its task or terminated by exception or error.

## Methods of Thread

### `start()` vs `run()`

Thread and Runnable: when you call `start()` on a Thread object, it will create a new Thread and invokes the `run()` methods. The run method you’ve overridden to create your task. So start just start the thread and run defines the task of the thread.

### `Join()`

This method is used for waiting the  completion of another thread. When a join is called on another thread t, it will pause the current thread execution and wait t to finish executing.

Here is the definition of method `join()`:

```java
public final void join() throws InterruptedException
// or
public final void join(long millis) throws InterruptedException
```

So this means the join function can throw an exception. and It doesn’t take any parameter or it can take a long parameter, meaning the timeout. It’s called this way:

```java
Thread tread1 = new Thread();
Thread tread2 = new Thread();
thread1.start();
thread2.start();

stread1.join();
```

now the code is waiting for thread1 to finish processing after we call the join. It can cause the calling thread to block.

join can be called multiple times on different threads.

When we call it with a parameter, it means the calling thread will wait for the target thread to finish or wait a certain amount of time to expire, whichever comes first.

### Wait/Notify Mechanism

The **monitor** is crucial for the `wait()`, `notify()`, and `notifyAll()` methods. These methods require that the thread holds the monitor lock before calling `wait()`, and they must also be used to notify waiting threads to resume execution.

- `wait()`: Causes the current thread to release the lock and enter the waiting state until it is notified.
- `notify()`: Wakes up one thread that is waiting on the object's monitor.
- `notifyAll()`: Wakes up all threads that are waiting on the object's monitor.

### `sleep()` vs `wait()`

**Wait method dose not Belong to Thread  class.**

Fist of all , they are both used to pause the current thread. 

`sleep()` is used the pause the thread for a specific period of time. After the certain amount of time, the thread will automatically resume the execution.  it’s a static method in Thread Class. 

`wait()` is an instance of method in Object class. It’s used for interthread communication. It let cause the current thread to release a lock it holds and enter wait state until notified by another thread. It coordinate with the `notify()` or `notifyAll()` methods

And because the wait method is release the monitor lock, it is used in a synchronized block or method.

## Daemon Thread

A **daemon thread** in Java is a thread that runs in the background and does not prevent the JVM from exiting when the main program finishes execution. Daemon threads are typically used for background tasks such as garbage collection, housekeeping, or background monitoring, where their main purpose is to support the application without blocking its termination.

## Thread Interference

Thread interference occurs when two or more threads try to access a shared resource concurrently in a way that cause incorrect behavior. Typically, when multiple thread try to modify a shared data without proper synchronization.

For example: 

```java
int num = 0;

Thread thread1 = new Thread(() -> {
    for(int i = 0; i < 100; i ++) {
        num ++;
    }
});

Thread thread2 = new Thread(() -> {
    for(int i = 0; i < 100; i --) {
        num --;
    }
})
    
thread1.start();
thread2.start();
```

Basically, the `num++` or `num--` will first read the value of num, and then increment or decrement the value of num and then put the new value back to num.

In this way, when thread1 and thread2 try to read value, it’s possible for them to read the same value. This would cause errors to the expected output. This is also called **Memory Consistency**.

In order to fix this, we want one thread to completely finish the whole process of increment or decrement, then another one can start to the same. That means we want the thread to hold(lock) the access of the variable num in the entire add and subtract process.

```java
int num = 0;

Thread thread1 = new Thread(() -> {
    for(int i = 0; i < 100; i++) {
        synchronized (this) {
            num++;
        }
    }
});

Thread thread2 = new Thread(() -> {
    for(int i = 0; i < 100; i++) {
        synchronized (this) {
            num--;
        }
    }
});

thread1.start();
thread2.start();
```

The is simply use synchronized to add a lock around the code block.

However, for this example, there is a better way to solve this. 

### AtomicIntger

 It provides a way to work with integers in a thread-safe manner without using synchronization or explicit locks. It allows atomic operations on a single integer value, meaning that the updates to the value are performed as a single, indivisible operation, which prevents interference from other threads.

```java
import java.util.concurrent.atomic.AtomicInteger;

AtomicInteger num = new AtomicInteger(0);

Thread thread1 = new Thread(() -> {
    for(int i = 0; i < 100; i++) {
        num.incrementAndGet();  // Atomically increment
    }
});

Thread thread2 = new Thread(() -> {
    for(int i = 0; i < 100; i++) {
        num.decrementAndGet();  // Atomically decrement
    }
});

thread1.start();
thread2.start();
```

## Perform synchronization

### synchronized

This keyword is used create a controlled access(Lock) on a code block or method. 

There are several ways of using it and the scope of this :

1. Object level synchronization

   ```java
   public class Counter {
       private int count = 0;
       public synchronized void increment() {
           count ++;
       }
   }
   ```

   This only locks the instance(object) of the class. It will only be synchronized when two threads are trying to call the increment method on the same instance of Counter Class.

2. Class level

   ```java
   public class Counter {
       private static int count = 0;
       public synchronized static void increment() {
           count++;
       }
   }
   ```

   If two threads try to call increment() even it’s called on a different instance, it will be synchronized.

3. On code Block

   ```java
   public class Counter {
       private int count = 0;
       public void increment() {
           synchronized(this) {
               count++;
           }
       }
   }
   
   ```

   This is also an object level synchronization

4. Class level for static member

   ```java
   public class Counter {
       private static int count = 0;
       public static void increment() {
           synchronized(Counter.class) {
               count++;
           }
       }
   }
   ```

   We pass the `Counter.Class` to let it lock the class, it applies to all the instances of Counter Class.

### ReentrantLock

It provides more control and flexibility for lock compared to synchronized. We can manually acquire and release lock.

```java
import java.util.concurrent.locks.ReentrantLock;

public class Counter {
    private final ReentrantLock lock = new ReentrantLock();
    private int count = 0;
    public void increment() {
        lock.lock();
        try {
            count ++;
        } finally {
            lock.unlock();
        }
    }
}
```

### ReadWriteLock

A `ReadWriteLock` allows for a more flexible locking strategy where read operations can happen concurrently, but write operations are exclusive. `ReentrantReadWriteLock` is the most commonly used implementation of `ReadWriteLock` and allows you to have separate locks for reading and writing.

Read Lock: multiple threads can hold the read lock at the same time, as long as there is no thread holds the write lock.

Write Lock: Only one thread can hold the Write Lock, and no other class hold the read or write lock at the same time.

```java
import java.util.concurrent.locks.ReentrantReadWriteLock;

public class Counter {
    private final ReentrantReadWriteLock rwLock = new ReentrantReadWriteLock();
    private int count = 0;
    public void increment() {
        wrLock.writeLock().lock();
        try {
            count ++;
        } finally {
            rwLock.writeLock().unlock();
        }
    }
    public int getCount() {
        rwLock.readLock().lock();
        try{
            return count;
        } finally {
            rwLock.readLock().unlock();
        }
    }
}
```

In order not to violate the mechanism of Read Write Lock, we can check the lock while we are trying to lock.

```java
ReadWriteLock lock = new ReentrantReadWriteLock();
Lock writeLock = lock.writeLock();
boolean locked = writeLock.tryLock();
if (locked) {
    try {
        // Perform write operation here
    } finally {
        writeLock.unlock();
    }
} else {
    // Lock was not available, handle accordingly
}
```

### Volatile

Use this keyword to ensures the variable’s value is always read from and written to the main memory. So once the variable is changed, it is visible to all thread. But it does not guarantee the atomicity. So it cannot be used for indivisible step like ++ or —.

```java
private volatile boolean flag = false;
```

### Semaphore

Semaphore is an class in Java that provides a set of mechanism to manage permits to a resource. We initialize it by telling it how many permits are allowed at the same time. It does not know what resource it’s protecting. Instead, we call the acquire method inside our own logic.

```java
private static final Semaphore semaphore = new Semaphore(3);
semaphore.acquire();
semaphore.release();
```

`semaphore.acquire()`, it checks if a permit is available. If it is, the thread can proceed; otherwise, it waits. After finishing the work, the thread releases the permit by calling `semaphore.release()`.

## Thread safe Maps

### Hashtable

Its internally synchronized. Every method of hashtable synchronized, so only one thread an operate on the hashtable at one time. Each method will lock the entire map.

It doesn’t allow null key and null values. It is not recommended to use anymore.

### Collection.synchronizedMap

It’s is not internally synchronized. It is a wrapper that add external synchronization to existing Map completion. This one also lock the entire map.

It allows only one null key and multiple null values.

### ConcurrentHashMap

This one uses a mechanism called fine-grained locking. It only locks the map segments (buckets). Before Java 8, map are divided  into 16 segments, Each segment has its own lock. Java 8 + uses bucket instead of segment. We can modify different segments at the same time.  So this one has the fast performance. 

ConcurrentHashMap also support Compare-and-Swap for Atomic operations. Like `putIfAbsent()`, `computeIfPresenet()` , and `replace()`. They are atomic without locks.

It doesn’t allow null key and null values.

## Thread safe singleton class

A thread safe singleton class only allows one instance of this class. It can only be created once and it does not allow destruction.

### Create a singleton class

#### Eager Initialization

```java
public class Singleton {
    private static final Singleton instance = new Singleton();
    private Singleton() {}
    public static Singleton getInstance() {
        return instance;
    }
}
```

We can initialize the field at the time of class loading. There is no threads involved yet, so we don’t need to synchronized it. And we make the constructor private to prevent it from creating an instance again.

#### Lazy Initialization with Double-Checked Locking

We only initialize the instance when needed. So we need to make it thread-safe.

```java
public class Singleton {
    private static volatile Singleton instance;
    private Singleton() {}
    public static Singleton getInstance() {
        if (instance == null) { 
            synchronized (Singleton.class) {
                if (instance == null) {
                    instance = new Singleton();
                }
            }
        }
        return instance;
    }
}
```

It’s important to double-check because after checking the instance and before locking the class, the instance might be created by other threads. We don’t know, so we need to check again. 

We need to use volatile keyword to ensure this instance is visible to any thread.

This one is slightly slower and more complex than eager initialization.

#### Bill Pugh Singleton Design 

This method uses a static inner class to implement the singleton. 

```java
public class Singleton {
    private Singleton() {}
    private static class SingletonHelper {
        private static final Singleton INSTANCE = new Singleton();
    }
    public static Singleton getInstance() {
        return SingletonHelper.INSTANCE;
    }
}
```

It is also lazy initialization. The instance will only be initialized when the `getInstance()` method is called.

#### Enum Singleton

This is considered the most efficient way. Because Java ensures that Enums are thread-safe and cannot be serialized.

```java
public enum Singleton {
    INSTANCE;
    public void someMethod() {
        // Some functionality
    }
}
```

## Deadlock

The four necessary conditions for a **deadlock** to occur in a system are known as the **Coffman conditions**, named after the researchers who described them. These conditions must all be met simultaneously for a deadlock to arise in a multi-threaded environment. The four conditions are:

1. **Mutual Exclusion**:
   - At least one resource must be held in a non-shareable mode. In other words, only one thread can use a resource at any given time. If another thread requests the resource, it must wait until the resource becomes available.
2. **Hold and Wait**:
   - A thread that is holding at least one resource is waiting to acquire additional resources that are currently being held by other threads. Essentially, the thread is holding some resources while waiting for others, causing potential blocking.
3. **No Preemption**:
   - Resources cannot be forcibly taken away from threads holding them. A resource can only be released voluntarily by the thread holding it. This means that once a thread acquires a resource, it must release it voluntarily when it's done, and it cannot be forcibly reclaimed by the system or other threads.
4. **Circular Wait**:
   - A set of threads must exist such that each thread is waiting for a resource that is held by another thread in the set, forming a circular chain of dependencies. For example, thread A is waiting for a resource held by thread B, thread B is waiting for a resource held by thread C, and thread C is waiting for a resource held by thread A.