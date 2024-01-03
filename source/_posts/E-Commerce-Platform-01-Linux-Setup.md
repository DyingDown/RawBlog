---
title: 'E-Commerce Platform: 01 Linux Setup'
date: 2023-12-23 13:42:13
tags: [Linux, VirtualBox, WSL, Vagrant]
categories: [E-Commerce Platform]
postImage: https://cdn.jsdelivr.net/gh/DyingDown/img-host-repo/202312231514584.png
warning: true
---

My project is based on the Linux environment, so the first step is to set up the Linux environment.

<!--more-->

## Installing the Linux Environment

### CentOS

#### Step 1: Tool Installation


- [x] [VirtualBox](https://www.virtualbox.org/wiki/Downloads) 

- [x]  [Vagrant](https://developer.hashicorp.com/vagrant/install?ajs_aid=f7938d26-0214-4be6-92e4-5e9b60b03e89&product_intent=vagrant).

####  Step2: Install centos7

```bash
$ vagrant init centos/7
```

**Start the Virtual Machine:** Execute the following command to start the virtual machine:

```bash
$ vagrant up
```

**Connect to the Virtual Machine:** Once the virtual machine is running, use SSH to connect to it:

```bash
$ vagrant ssh
```

### WSL-ubuntu

Installation process is missed.

## Configuring the Network Gateway

### Vagrant

#### Step1: Modify

To set a fixed gateway for a Vagrant virtual machine, you can modify the network configuration in the `Vagrantfile`.

The default file  location is under `C:\Users\your_username`, or under the directory where you install vagrant.

find the line ` config.vm.network "private_network", ip: "192.168.56.10"` and uncomment it.

Use `ipconfig/all` to check your virtualbox ip.  The description of which is *VirtualBox Host-Only Ethernet Adapter*

#### Step2: Test

Restart the vagrant

```bash
$ vagrant reload
```

Connected to vagrant

``` bash
$ vagrant ssh
```

Check its IP

``` bash
$ ip addr
```

### WSL

Jut check its IP.

### Final test

Finally, use `ping xxx.xxx.xxx` to test the connection.

