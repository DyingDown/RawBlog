---
title: Spring6 Annotation-based Declarative Transaction Management
date: 2023-03-28 20:36:43
tags: [Annoation, Transaction]
categories: Spring6
postImage: https://cdn.jsdelivr.net/gh/DyingDown/img-host-repo/202304032204076.jpg
---

Note of learning Transaction Management.

<!--more-->

## Preparations

First create xml file and add configs. I will just use the last article's xml file and add new component-scan.

```xml
<context:component-scan base-package="org.example.tx"></context:component-scan>
```

Then create two tables:

book table:

```sql
create table `t_book`(
	`book_id` int(11) not null auto_increment,
	`book_name` varchar(20) default null,
    `price` int(11) default null,
    `stock` int(10) unsigned default null,
    primary key(`book_id`)
) engine=innodb auto_increment=3 default charset=utf8;
```

user table:

```sql
create table `t_user` (
	`user_id` int(11) not null auto_increment,
    `username` varchar(20) default null,
    `balance` int(10) unsigned default null,
    primary key(`user_id`)
) engine=innodb auto_increment=2 default charset=utf8;
```

Add some data into the tables:

```sql
insert into `t_book`(`book_id`, `book_name`, `price`, `stock`) values (1, '三体', 80, 10), (2, '消失', 100, 50);
insert into `t_user` (`user_id`, `username`, `balance`) values (1, 'lucy', 500);
```

Then create some packages:

<img src="https://cdn.jsdelivr.net/gh/DyingDown/img-host-repo/202303282124294.png" style="zoom: 67%;" />

```java
@Repository
public class BookDaoImpl implements BookDao{
}

@Controller
public class BookController {
    @Autowired
    private BookService bookService;

    public void buyBook(Integer bookId, Integer userId) {
        bookService.buyBook(bookId, userId);
    }
}

@Service
public class BookServiceImpl implements BookService {
    @Autowired
    private BookDao bookDao;

    @Override
    public void buyBook(Integer bookId, Integer userId) {
        Integer price = bookDao.getBookPriceById(bookId);
        bookDao.updateStock(bookId);
        bookDao.updateUserBalance(userId, price);
    }
}
```

## Simulate a book buying process

There are three steps:

1. get book price according to book id
2. stock of book -1
3. user balance - book price

So, let's implements the three steps in `BookDaoImpl` first.

```java
@Repository
public class BookDaoImpl implements BookDao{
    @Autowired
    private JdbcTemplate jdbcTemplate;
    @Override
    public Integer getBookPriceById(Integer bookId) {
        String sql = "select price from t_book where book_id=?";
        Integer price = jdbcTemplate.queryForObject(sql, Integer.class, bookId);
        return price;
    }

    @Override
    public void updateStock(Integer bookId) {
        String sql = "update t_book set stock=stock-1 where book_id=?";
        jdbcTemplate.update(sql, bookId);
    }

    @Override
    public void updateUserBalance(Integer userId, Integer price) {
        String sql = "update t_user set balance=balance-? where user_id=?";
        jdbcTemplate.update(sql, price, userId);
    }
}
```

Now lets test it;

```java
@SpringJUnitConfig(locations = "classpath:beans.xml")
public class TestBook {

    @Autowired
    private BookController bookController;

    @Test
    public void testBuyBook() {
        bookController.buyBook(1, 1);
    }
}
```

we can check the database and found that the money of user 1 decreased and the book stocks decreased too.

### Error Situation

If the user's balance is less than the book price, then we run this code, we will find that there is an error but the number of books still being reduced.

In this case, we need to introduce **Transaction**.

## Transaction

We use annotations to start transactions. Confiture it in xml file. And also add its namespace.

```xml
<bean id="transactionManager" class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
    <property name="dataSource" ref="druidDataSource"></property>
</bean>
<tx:annotation-driven transaction-manager="jdbcTemplate"/>
```

If your transaction manager's id is "transactionManager", then you can declare like this:

```xml
<tx:annotation-driven/>
```

Then we add the annotation `@Transactional` to the method top or to the class.

If you add it to the class, then all the methods of the class will work with transaction.

Test: we can now run the code and found there is till error but the book number won't change.

### Properties of @Transactional

- `readOnly` It only allowed to do read operations, can't do add, modify or delete operations.

  ```java
  @Transactional(readOnly = true)
  ```

- `timeout()` default is -1. If it's not finished during the set time, then it will automatically throw exceptions and  do rollback.

  ```java
  @Transactional(timeout = 3)
  ```

- `rollbackFor`, `rollbackForClassName`, `noRollbackFor`, `noRollbackForClassName`: these are to set the rollback strategy, which exception do rollback and which don't do.

  ```java
  @Transactional(noRollbackFor = ArithmeticException.class)
  ```

- `isolation()`: isolation level of the  transaction

  ```java
  @Transactional(isolation = Isolation.DEFUALT)
  @Transactional(isolation = Isolation.READ_UNCOMMITED)
  @Transactional(isolation = Isolation.COMMITED)
  @Transactional(isolation = Isolation.REAPEATABLE_READ)
  @Transactional(isolation = Isolation.SERIALIZABLE)
  ```

- `propagation()`: how the transactions are called between methods

  If we have two methods A and B, when A calls B, which transaction we should use, use A's or B's or Combine both.

  - REQUIRED: support the current transaction, if there is no transaction, then create a new one.
  - SUPPORTS: If there is  transaction, support the current, if there isn't, then run without transaction.
  - MANDATORY: Must run in a transaction, or it will throw an exception.
  - REQUIRES_NEW: Start a new transaction, if there is transaction at current, then suspend the current transaction.
  - NOT_SUPPORTED: run without transaction, if there is one, suspend it.
  - NEVER: un without transaction, if there is, throw exception.
  - NESTED: if there is transaction going on, then the method should run in a nested transaction. If not, it behave like `REQUIRED`.

  ```java
  @Transactional(readOnly = Propagatioin.REQUIRED)
  ```

- ...

## Full Annotation-based Configuration

We can create a configuration class to replace configuration in xml file.

```java
package org.example.tx.config;

import com.alibaba.druid.pool.DruidDataSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import javax.sql.DataSource;

@Configuration
@ComponentScan("org.example.tx")
@EnableTransactionManagement
public class SpringConfig {
    @Bean
    public DataSource getDataSource() {
        DruidDataSource dataSource = new DruidDataSource();
        dataSource.setDriverClassName("com.mysql.cj.jdbc.Driver");
        dataSource.setUsername("root");
        dataSource.setPassword("1130");
        dataSource.setUrl("jdbc:mysql://localhost:3306/spring?characterEncoding=utf8&useSSL=false");
        return dataSource;
    }

    @Bean(name="jdbcTemplate")
    public JdbcTemplate getJdbcTemplate(DataSource datasource) {
        JdbcTemplate jdbcTemplate = new JdbcTemplate();
        jdbcTemplate.setDataSource(datasource);
        return jdbcTemplate;
    }

    @Bean
    public DataSourceTransactionManager getDataSourceTransactionManager(DataSource dataSource) {
        DataSourceTransactionManager dataSourceTransactionManager = new DataSourceTransactionManager();
        dataSourceTransactionManager.setDataSource(dataSource);
        return dataSourceTransactionManager;
    }
}
```

Then we comment the `<context:commponent-scan>`, `<bean>`, `<tx:annoation-driven>` out.

And we can use our previous code to test if its works.

```java
public class TestFullyAnnoBook {
    @Test
    public  void testFullyAnnoBook() {
        ApplicationContext applicationContext = new AnnotationConfigApplicationContext(SpringConfig.class);
        BookController controller = applicationContext.getBean("bookController", BookController.class);
        controller.buyBook(1, 1);
    }
}
```

## Full XML configuration

### XML file

First, we create a xml config file just as before and copy the previous code structures of buy book method.

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:tx="http://www.springframework.org/schema/tx"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
       http://www.springframework.org/schema/beans/spring-beans.xsd
       http://www.springframework.org/schema/context
       http://www.springframework.org/schema/context/spring-context.xsd
       http://www.springframework.org/schema/tx
       http://www.springframework.org/schema/tx/spring-tx.xsd">


    <context:component-scan base-package="org.example.xmltx"></context:component-scan>

    <!--create data source object-->
    <context:property-placeholder location="classpath:jdbc.properties"></context:property-placeholder>

    <bean id="druidDataSource" class="com.alibaba.druid.pool.DruidDataSource">
        <property name="url" value="${jdbc.url}"></property>
        <property name="driverClassName" value="${jdbc.driver}"></property>
        <property name="username" value="${jdbc.user}"></property>
        <property name="password" value="${jdbc.password}"></property>
    </bean>

    <!--create jdbcTemplate Object and inject data-->
    <bean id="jdbcTemplate" class="org.springframework.jdbc.core.JdbcTemplate">
        <property name="dataSource" ref="druidDataSource"></property>
    </bean>

    <bean id="transactionManager" class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
        <property name="dataSource" ref="druidDataSource"></property>
    </bean>

</beans>
```

### Transaction enhancement

Then we can set transaction enhancement.

```xml
<tx:advice id="txAdvice" transaction-manager="transactionManager">
    <tx:attributes>
        <tx:method name="get*" read-only="true"/>
        <tx:method name="update*" read-only="false" propagation="REQUIRED"/>
        <tx:method name="buy*" read-only="false" propagation="REQUIRED"/>
    </tx:attributes>
</tx:advice>
```

the name means the method which name starts with get will be applied to a transaction. And we can set attributes of the transaction after the name property. such as `read-only`.

And because we need to apply the transaction on the `service` layer, so we also need to add rules to the `buyBook()` method.

### Pointcut and Advice

Then we can set the 

```xml
<aop:config>
    <aop:pointcut id="pt" expression="execution(* org.example.xmltx.service.*.*(..))"/>
    <aop:advisor advice-ref="txAdvice" pointcut-ref="pt"></aop:advisor>
</aop:config>
```

this means we want to apply the advice to the `service` layer.

Then we can test a situation that the user's balance is less than the book price. And we can see it throws errors and we didn't minus the stocking with not being able to buy the book.