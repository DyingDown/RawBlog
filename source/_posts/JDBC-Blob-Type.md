---
title: JDBC Operate Blob Type
date: 2023-02-12 17:49:20
tags: [Java, Database, Blob, Operation]
categories: JDBC
postImage: https://cdn.jsdelivr.net/gh/DyingDown/img-host-repo/202302122033675.jpg
---

Note about how to operate Blob type in database using JDBC.

<!--more-->

## What is blog type

> BLOB (Binary Large Object) is a data type in standard SQL used to store large amounts of data. It is basically a binary string of variable length, stored as a sequence of bytes or octets. BLOB data type is generally used to store large files such as images, media files such as video and audio clips in the database. We can write a BLOB value to the database as binary or character string depending on the file or requirement.

### MySQL Blob Type

|    Type    | Size(Byte) |
| :--------: | :--------: |
|  TinyBlog  |  max: 255  |
|    Blog    |  max: 65K  |
| MediumBlob |  max:16M   |
|  LongBlob  |  max: 4G   |

## Insert Blob type data into table

```java
public class blobTest {
    public void testInsert() throws Exception {
        Connection conn = JDBCUtils.getConnection();
        String sql = "insert into customers(name, email, birth, photo)value(?,?,?,?)";

        PreparedStatement ps = conn.prepareStatement(sql);

        ps.setObject(1, "Allen");
        ps.setObject(2, "xxx@gmail.com");
        ps.setObject(3, "2001-05-21");
        FileInputStream is = new FileInputStream(new File("ab.jpg"));
        ps.setBlob(4, is);

        ps.execute();

        JDBCUtils.closeResource(conn, ps);
    }
}
```

## Select Blob type from table

Assume the SQL statement looks like this

```sql
select id, name, email, birth, photo from custormers where name = "xxx"
```

the type of photo is blob. So there are two ways wo get the result:

1. by passing numbers

   ```java
   int id = rs.getInt(1);
   String name = res.getString(2);
   String email = rs.getString(3);
   Date birth = rs.getDate(4);
   ```

2. by alias name(*Recommended ways*)

   ```java
   int id = rs.getInt("id");
   String name = res.getString("name");
   String email = rs.getString("email");
   Date birth = rs.getDate("birth");
   ```

Get blob data

```java
Blob photo = rs.getBlog("photo");
InputStream = photo.getBinaryStream();
FileOutputStream fos = new FileOutputStream("aaa.jpg");
byte[] buffer = new byte[1024];
int len;
while((len = is.read(buffer)) != -1) {
    fos.write(buffer, 0, len);
}
```

And at end close the resource including `InputStream`.

## Special error

If there is an error when using MySQL: `xxx too large`, but you the Type of Blob you use is big enough for the content,  then you can add the config information in `my.ini` file, add `max_allowed_packet=16M` and restart MySQL.