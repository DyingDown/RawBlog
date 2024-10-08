---
title: How to use AWS E3 Bucket on Java 1.x Spring Boot
date: 2024-10-07 10:54:34
tags: [Java, AWS, E3, Spring Boot, Files, Java 1.x, Bucket, Cloud, Upload, Download]
categories: [AWS, Spring Boot]
postImage: https://cdn.jsdelivr.net/gh/DyingDown/img-host-repo/202410071427054.jpeg
description: This article is the detail of how to setup AWS s3 on my Java 1.x with Spring Boot based on my own project needs.
warning: true
isCarousel: true
---

This article is based on my personal project needs and the knowledge I’ve gathered through self-study. If you find any errors or inaccuracies, please feel free to point them out.

## AWS Setups

In order to embed code in Spring Boot to access the bucket, there are 4 things you need to write in properties files.

```yaml
aws:
  s3:
    access-key-id: xxxxxxxxxxxx
    access-key-secret: xxxxxxxxxxxx
    region-name: us-east-1
    bucket-name: xxxxxx
```

So we need to create a bucket for sure. And the accessed key is combined with the IAM user (it’s better to use IAM user instead of the account ). So we also need to create IAM user. 

### Create IAM user

Follow the steps to create the user.

![](https://cdn.jsdelivr.net/gh/DyingDown/img-host-repo/202410071203946.png)

I created a user group for later convenience.

![image-20241007120456753](C:\Users\o_oya\AppData\Roaming\Typora\typora-user-images\image-20241007120456753.png)

After that, we need to create an access key for the user.

![](https://cdn.jsdelivr.net/gh/DyingDown/img-host-repo/202410071215440.png)

Choose the local code

![](https://cdn.jsdelivr.net/gh/DyingDown/img-host-repo/202410071216497.png)

This is where we find the **Secret access key**.  

<font color=red>NOTE: Save it to somewhere. This is the only way to see the secret key </font>

![](https://cdn.jsdelivr.net/gh/DyingDown/img-host-repo/202410071219928.png)

### Create E3 Bucket

![](https://cdn.jsdelivr.net/gh/DyingDown/img-host-repo/202410071117831.png)

For my bucket, I need to store pictures, and it is allowed to read by anyone, so I need to set it’s reading permission to public:

![](https://cdn.jsdelivr.net/gh/DyingDown/img-host-repo/202410071119778.png)

At the Bucket Policy, we write the permissions.

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::bucket-name/*"
        }
    ]
}
```

- **RESOURCE** is the bucket or the access point. (TODO: Later change the Resource to `arn:aws:s3::: bucket_name/dir/*`). So  I can use the bucket store more file than just pictures).
- **ACTION** is the action you want to give permission to. For my case, I just need to add permission to view the files, so that’s `s3:GetObject`, there is also `ListBucket` and `PutObject` and so on.  [Action List](https://docs.aws.amazon.com/AmazonS3/latest/API/API_Operations.html)
- **PRINCIPAL** is the user you want to give permission, since it’s anyone, its `*`, but if you want to specify user, you will need to set `"Principal":{"AWS":["arn:aws:iam::AccountID1WithoutHyphens:root","arn:aws:iam::AccountID2WithoutHyphens:root"]}`.  [More Principal Examples](https://docs.aws.amazon.com/AmazonS3/latest/userguide/security_iam_service-with-iam.html#s3-bucket-user-policy-specifying-principal-intro)
- **EFFECT** can be either *Allow* or *Deny*.
- **SID** is jut the id name you made up.

For more information, see this website: [Policies and Permissions on AWS S3](https://docs.aws.amazon.com/AmazonS3/latest/userguide/access-policy-language-overview.html?icmpid=docs_amazons3_console)



For public access, I also need to edit the settings of `Block public access`:

![](https://cdn.jsdelivr.net/gh/DyingDown/img-host-repo/202410071150651.png)

Then uncheck all the checkbox.

![](https://cdn.jsdelivr.net/gh/DyingDown/img-host-repo/202410071152305.png)

## Spring Boot Code

### dependencies

```xml
<dependency>
    <groupId>com.amazonaws</groupId>
    <artifactId>aws-java-sdk-s3</artifactId>
    <version>1.11.336</version>
</dependency>
<dependency>
    <groupId>com.amazonaws</groupId>
    <artifactId>aws-java-sdk-core</artifactId>
    <version>1.11.336</version>
</dependency>
<dependency>
    <groupId>com.amazonaws</groupId>
    <artifactId>aws-java-sdk-kms</artifactId>
    <version>1.11.336</version>
</dependency>
```

### Add Configurations 

write the following in `application.yml` files

```yaml
aws:
  s3:
    access-key-id: xxxxxxxxxxxx
    access-key-secret: xxxxxxxxxxxx
    region-name: us-east-1
    bucket-name: xxxxxx
```

And we nee to write a class to load the properties from the `yml`

```java
package io.yao.appt.common.config;

import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class S3Config implements InitializingBean {

    @Value("${aws.s3.access-key-id}")
    private String accessKeyId;

    @Value("${aws.s3.access-key-secret}")
    private String accessKeySecret;

    @Value("${aws.s3.bucket-name}")
    private String bucketName;

    @Value("${aws.s3.region-name}")
    private String regionName;


    public static  String ACCESS_KEY_ID;
    public static String  ACCESS_KEY_SECRET;
    public static String BUCKET_NAME;
    public static String REGION_NAME;




    @Override
    public void afterPropertiesSet() throws Exception {
        ACCESS_KEY_ID = accessKeyId;
        ACCESS_KEY_SECRET = accessKeySecret;
        BUCKET_NAME = bucketName;
        REGION_NAME = regionName;
    }
}

```

### Create a s3 utils class

```java
package io.yao.appt.common.aws.s3;

import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.PutObjectResult;

import java.io.IOException;
import java.io.InputStream;

public class S3Utils {
    private final AmazonS3 s3Client;

    public S3Utils(String accessKeyId, String accessKeySecret, String regionName) {
        AWSCredentials awsCredentials = new BasicAWSCredentials(accessKeyId, accessKeySecret);
        AmazonS3ClientBuilder builder = AmazonS3ClientBuilder.standard().withCredentials(new AWSStaticCredentialsProvider(awsCredentials));
        //设置S3的地区
        builder.setRegion(regionName);
        this.s3Client = builder.build();
    }
    public PutObjectResult upload(String fileName, String bucketName, InputStream inputStream) throws IOException {
        ObjectMetadata objectMetadata = new ObjectMetadata();
        objectMetadata.setContentType("plain/text");
        objectMetadata.setContentLength(Long.valueOf(inputStream.available()));
        PutObjectResult putObjectRequest = this.s3Client.putObject(new PutObjectRequest(bucketName, fileName, inputStream, objectMetadata));

        return putObjectRequest ;
    }

    public String generatePresignedUrl(String bucketName, String fileName) {
        // 生成URL
        return "https://" + bucketName + ".s3." + s3Client.getRegionName() + ".amazonaws.com/" + fileName;
    }

}
```

` "https://" + bucketName + ".s3." + s3Client.getRegionName() + ".amazonaws.com/" + fileName` is the format  of URL to download or visit the files.

### Actually use

```java
@Service
public class S3ServiceImpl implements S3Service {

    @Override
    public String upload(MultipartFile file) throws IOException {
        String accessKeyId = S3Config.ACCESS_KEY_ID;
        String accessKeySecret = S3Config.ACCESS_KEY_SECRET;
        String bucketName = S3Config.BUCKET_NAME;
        String regionName = S3Config.REGION_NAME;

        S3Utils s3Connection = new S3Utils(accessKeyId, accessKeySecret, regionName);
        System.out.println("connection successfully");
        String newFilename = FileUtils.generateFileName(file.getOriginalFilename());
        s3Connection.upload(newFilename, bucketName, file.getInputStream());

        return s3Connection.generatePresignedUrl(bucketName, newFilename);
    }
}
```

## Resource Link

- [S3 Guide](https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html)

- [AWS SDK for Java](https://aws.amazon.com/sdk-for-java/?nc1=h_ls)
- [Amazon S3 examples  using SDK  for Java 1.x](https://docs.aws.amazon.com/sdk-for-java/v1/developer-guide/welcome.html)
- [Action List](https://docs.aws.amazon.com/AmazonS3/latest/API/API_Operations.html)
- [Policies and Permissions on AWS S3](https://docs.aws.amazon.com/AmazonS3/latest/userguide/access-policy-language-overview.html?icmpid=docs_amazons3_console)
- [More Principal Examples](https://docs.aws.amazon.com/AmazonS3/latest/userguide/security_iam_service-with-iam.html#s3-bucket-user-policy-specifying-principal-intro)