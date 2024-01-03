---
title: 'E-Commerce Platform: 02 Docker Setup'
date: 2023-12-23 14:20:09
tags: [Linux, WSL, Docker]
categories: [E-Commerce Platform]
postImage: https://cdn.jsdelivr.net/gh/DyingDown/img-host-repo/202401022131154.jpg
warning: true
---

Installing Docker and using docker to install other tools.

<!--more-->

## Docker

1. install for WSL [https://docs.docker.com/desktop/wsl/](https://docs.docker.com/desktop/wsl/)

2. install for centos7 [https://docs.docker.com/engine/install/centos/#install-docker-engine-on-centos](https://docs.docker.com/engine/install/centos/#install-docker-engine-on-centos)
3. install for ubuntu [https://docs.docker.com/engine/install/ubuntu/](https://docs.docker.com/engine/install/ubuntu/)

Follow the instructions to install it.

To set Docker to start automatically:

WSL: 

```bash
service docker start
```

CentOS: 

```bash
sudo systemctl enable docker
```

## MySQL

### Get MySQL Image

```bash
docker pull mysql
```

### Create and Start MySQL Instance

```bash
docker run -p 3306:3306 --name mysql \
-v /mydata/mysql/log:/var/log/mysql \
-v /mydata/mysql/data:/var/lib/mysql \
-v /mydata/mysql/conf:/etc/mysql/conf.d \
-e MYSQL_ROOT_PASSWORD=root \
-d mysql
```

Parameter Explanation:
- `-p 3306:3306`: Maps the container's 3306 port to the host's 3306 port.
- `-v /mydata/mysql/conf:/etc/mysql`: Mounts the configuration folder to the host.
- `-v /mydata/mysql/log:/var/log/mysql`: Mounts the log folder to the host.
- `-v /mydata/mysql/data:/var/lib/mysql/config.d`: Mounts the data folder to the host.
- `-e MYSQL_ROOT_PASSWORD=root`: Initializes the password for the root user.

Then check the status of the container:

```bash
docker ps -a
```

#### My error note

I run into an error of:

``` bash
[root@localhost vagrant]# docker ps -a
CONTAINER ID   IMAGE         COMMAND                  CREATED         STATUS                     PORTS     NAMES
8adbd5efd699   mysql         "docker-entrypoint.s…"   6 minutes ago   Exited (1) 6 minutes ago             mysql
```

The container didn’t start successfully and couldn’t started manually. So I checked the logs of the error info:

``` bash
docker logs 8adbd5efd699
2023-12-23 21:11:04+00:00 [Note] [Entrypoint]: Entrypoint script for MySQL Server 8.2.0-1.el8 started.
2023-12-23 21:11:04+00:00 [ERROR] [Entrypoint]: mysqld failed while attempting to check config
        command was: mysqld --verbose --help --log-bin-index=/tmp/tmp.XmFIY0PZWm
        mysqld: Can't read dir of '/etc/mysql/conf.d/' (OS errno 2 - No such file or directory)
mysqld: [ERROR] Stopped processing the 'includedir' directive in file /etc/my.cnf at line 36.
mysqld: [ERROR] Fatal error in defaults handling. Program aborted!
```

This is because I didn’t add the `conf.g` at the command line `-v /mydata/mysql/conf:/etc/mysql/config.d \`

Delete the stopped container

```bash
docker container prune
```

Logging into the container:

```bash
docker exec -it mysql /bin/bash
```

### MySQL Config

Add the following config to `/mydata/mysql/conf/my.cnf`, create that file

```
[client]
default-character-set=utf8

[mysql]
default-character-set=utf8

[mysqld]
init_connect='SET collation_connection = utf8_unicode_ci'
init_connect='SET NAMES utf8'
character-set-server=utf8
collation-server=utf8_unicode_ci
skip-character-set-client-handshake
skip-name-resolve
```

Then restart docker

``` bash
docker restart mysql
```

Set always restart by default

```bash
docker update mysql --restart=always
```

## Redis

### Get Redis Image

``` bash
docker pull redis
```

### Create and Start Redis Instance

Create directory structure and the config file

``` bash
mkdir -p /mydata/redis/conf
touch /mydata/redis/conf/redis.conf
```

This steps is to prevent the following command read `redis.conf` as a directory not a file

Create and Run

```bash
docker run -p 6379:6379 --name redis \
-v /mydata/redis/data:/data \
-v /mydata/redis/conf/redis.conf:/etc/redis/redis.conf \
-d redis redis-server /etc/redis/redis.conf
```

Test its usage

```bash
docker exec -it redis redis-cli
127.0.0.1:6379> set a b
OK
127.0.0.1:6379> get a
"b"
127.0.0.1:6379> exit
```

To make the data persistent, add config to the file `/mydata/redis/conf/redis.conf`

```
appendonly yes
```

For my WSL, I encountered an error saying I need to enable certain permissions. To solve this, run the command:

```bash
sysctl vm.overcommit_memory=1
```

### Install Redis desktop manager

I use this:  [https://github.com/qishibo/AnotherRedisDesktopManager/releases](https://github.com/qishibo/AnotherRedisDesktopManager/releases)

Set always restart by default.

```bash
docker update redis --restart=always
```

