---
title: >-
  Microsoft Azure Fundamentals (AZ-900) Cert Prep: 1 Cloud Concepts
date: 2025-04-12 19:10:10
tags: [Azure, AZ-900 Cert, Cloud Concepts]
categories: [Azure, AZ-900]
postImage: https://cdn.jsdelivr.net/gh/DyingDown/img-host-repo/202505072217018.png
description: 
warning: True
isCarousel: false
---

This note covers the Cloud Concepts section of the Microsoft Azure Fundamentals (AZ-900) exam. It includes key topics like cloud service models, types of cloud computing, and the benefits of cloud computing. This section accounts for 25-30% of the exam and helps you build a foundational understanding of cloud technologies.

<!--more-->

## Cloud Service Models

### Cloud Computing

- **Definition**: Cloud computing is the delivery of computing resources as a service by a Cloud Service Provider (CSP). In the context of this course, Microsoft Azure is the CSP.
- **Characteristics**: Cloud computing allows for the seamless combination and fragmentation of computing resources, providing an almost infinite amount of resources for practical purposes.

**Virtualization in the cloud** refers to the process of creating virtual versions of physical hardware resources, such as servers, storage devices, and network components, to efficiently manage and utilize those resources in a cloud environment. It allows cloud providers to abstract, isolate, and allocate physical resources dynamically and more flexibly to users.

### Key Characters of Cloud Computing

#### Resource Pooling

Cloud providers combine multiple physical resources (e.g., servers, storage) into a pool of virtualized resources, which can be dynamically allocated based on demand. This allows for efficient resource usage and cost savings while ensuring that each user's data and applications remain isolated.

#### Elasticity

Elasticity refers to the cloud's ability to automatically adjust the amount of resources allocated based on demand. This ensures that services can handle sudden spikes or drops in traffic without the need for manual intervention.

**Example Use Cases**:

- E-Commerce Websites:
   During peak seasons (e.g., Black Friday or Cyber Monday), online stores experience high traffic. Cloud services automatically add more servers to handle the increase in visitors, and scale back once traffic returns to normal.
- Streaming Services (e.g., Netflix):
   Netflix scales its servers to accommodate millions of simultaneous viewers during peak hours, especially during popular show releases.

#### Pay Per Use

Only paying for the resources you use and the time you use them, avoiding the high upfront costs of on-premises hardware.

#### Automation

Automation in cloud computing allows for the automatic provisioning, scaling, and management of resources, reducing manual effort and human error. This enables more efficient deployment and management of applications.

#### Multitenancy

Multitenancy in cloud computing allows multiple users or organizations to share the same infrastructure while ensuring data isolation. Each tenant has their own private space within the shared environment, ensuring security and privacy.

**Example Use Cases:**

- Software as a Service (SaaS) Platforms:
   A company offering a SaaS product (e.g., **Salesforce**) hosts multiple customers (tenants) on the same servers. Although customers share the infrastructure, their data and applications are isolated from each other, ensuring security.
- Cloud Storage Services:
   A cloud storage service like **Dropbox** allows multiple users to store files in the same data centers, but each user's files are isolated and encrypted.

#### High Availability and Reliability

Cloud computing platforms are designed for high availability, meaning they provide redundant systems to ensure that services stay online even in the event of a failure. This includes features like data replication, failover systems, and load balancing.

**Example Use Cases:**

- E-Commerce Website Reliability:
   An online retailer uses a cloud provider with a global network of data centers. If one data center goes down, traffic is automatically rerouted to another, ensuring the site remains accessible.
- Healthcare Data Availability:
   A healthcare provider uses cloud storage with replication across multiple regions. In case one region’s data center goes offline, patient records can still be accessed from another region.

### IaaS (Infrastructure as a Service)

It’s one of the main types of cloud computing services, and it provides **virtualized computing resources** over the internet.
IaaS gives you access to raw IT resources — like **virtual machines**, **storage**, **networks**, and **servers** — that you can set up and manage yourself. You don’t have to buy physical hardware; instead, you "rent" what you need from a cloud provider. The cloud provider manages the physical hardware, including redundancy, cooling, internet connections, and physical space.

 **Key things included in IaaS**:

- Virtual Machines (VMs)
- Storage (databases, file systems)
- Networks (VPNs, load balancers)
- Firewalls and security features

**What you manage**: In IaaS, you are responsible for managing:

- The operating system (Windows, Linux, etc.)
- Applications installed on the VM
- Data backups, patches and hotfixes, updates
- Framework and runtime

**When to choose IaaS**

- **Need for Full Control Over the Operating System**
   Some apps need very specific versions of libraries, drivers, or OS settings that you can't modify inside a container.
  e.g. A scientific research app requires a custom-tuned Linux kernel, special hardware drivers (GPU drivers), and low-level OS access → only possible with full VM control.

- **Running Legacy Applications**
  Old software (made 10+ years ago) might not support containers or cloud-native design. They were written for full servers, not modern cloud platforms.
  e.g. A government office has a 2008 financial system that runs only on a specific old version of Windows Server. Containers can't support it.

-  **High Compliance or Security Requirements**

  Industries like banking, healthcare, and defense have strict regulations (HIPAA, PCI-DSS, etc.). They require control over security patches, encryption methods, firewalls, etc.

- **Custom or Complex Networking/Storage Setups**
  If you need advanced networking features (custom firewalls, multi-subnet architectures, direct connections to on-premises), containers often hide these details or don't support that complexity well.
  e.g. A big e-commerce company wants a very detailed, multi-region, multi-subnet network to meet performance and disaster recovery needs. Full VM-level control is needed.

- **Running Monolithic Applications**
  Some applications are huge "monoliths" (everything packed into one server) and aren’t designed to be split into containerized microservices.
  e.g. A traditional ERP (Enterprise Resource Planning) system that needs to run on one big server.
- **Lift-and-Shift Migration**
  Some companies just want to move their existing apps to the cloud without rewriting them for containers.
  e.g. A company lifts its whole data center to Azure by creating equivalent VMs and shifting apps over without changing the code.

- **Special Hardware Needs**
  Some applications need GPU access, high-performance CPUs, or special networking gear.
  e.g. A machine learning team needs GPU-accelerated VMs (like Azure NV-series) to train AI models.

### PaaS (Platform as a Service)

It’s one of the main types of cloud computing services, and it provides **a ready-to-use platform** for developing, running, and managing applications.
 PaaS gives you an environment with **servers**, **storage**, **databases**, and **development tools**, so you don’t have to manage the underlying infrastructure like VMs or networks.

**Key things included in PaaS**:

- Application hosting environments
- Development tools (IDEs, CI/CD pipelines)
- Managed databases
- Middleware (e.g., messaging, authentication services)
- APIs for building apps

**What you manage**: In PaaS, you are responsible for managing:

- The applications you build
- Application data
- App configurations (like scaling settings)

The cloud provider manages everything else (OS, runtime, servers, networking).

**When to choose PaaS**

- **Focus on Coding, Not Infrastructure**
   You want to spend time building your app, not maintaining servers. e.g. A startup quickly builds a web app using Azure App Service without worrying about OS patches or load balancers.
- **Rapid Development and Deployment**
   You need to speed up your software release cycles with built-in development tools. e.g. A company uses Google App Engine to automatically deploy new versions of their app during a hackathon.
- **Automatic Scaling and High Availability**
   You want apps to automatically scale up when traffic grows without manual setup. e.g. An online ticket-selling app sees sudden high traffic during concert sales and automatically adds more server instances.
- **Integrated Development Tools**
   You want CI/CD (Continuous Integration/Continuous Deployment) pipelines, debugging, monitoring all built-in. e.g. A mobile app company uses AWS Elastic Beanstalk to quickly roll out new features and monitor app performance without building separate pipelines.

### SaaS (Software as a Service)

It’s one of the main types of cloud computing services, and it provides **fully managed software applications** over the internet.
 With SaaS, you don't have to worry about underlying infrastructure, operating systems, or even app management—everything is handled by the cloud provider.

**Key things included in SaaS**:

- Fully managed software (e.g., Gmail, Salesforce)
- Subscription-based access
- Multi-user collaboration
- Cloud-based data storage
- APIs for integrations

**What you manage**: In SaaS, you are responsible for managing:

- User accounts
- User settings (personalization)
- Data input and output (e.g., documents, emails, customer data)

The cloud provider manages everything else (app functionality, software updates, server uptime).

**When to choose SaaS**

- **You Need Fully Managed Software**
   You don’t want to manage the software, servers, or infrastructure. e.g. A business uses Salesforce for CRM (Customer Relationship Management) without worrying about installing, maintaining, or upgrading it.
- **Collaboration and Accessibility**
   You need an app that can be accessed from anywhere, on any device, with multiple users working on it simultaneously. e.g. A remote team uses Google Workspace (Docs, Sheets, Drive) to collaborate on documents in real-time, no matter where they are.
- **No In-House IT Team**
   You don’t have the resources or time to maintain software applications and infrastructure. e.g. A small startup uses Slack for team communication without managing servers or updating the software.
- **Frequent Software Updates**
   You want to always have the latest features and updates automatically. e.g. A company uses Zoom for virtual meetings and benefits from regular updates without manually upgrading.
- **Low Upfront Costs and Subscription Model**
   You prefer subscription-based payments instead of large upfront licensing fees. e.g. A freelancer uses Adobe Creative Cloud because they pay a monthly subscription rather than purchasing expensive software licenses upfront.

### Shared Responsibility Model

Like a bicycle needs both wheels to work together for a smooth ride, in cloud computing **both the customer and the cloud provider share responsibility** for keeping applications running and secure.

Responsibilities must be clearly divided to ensure efficiency and avoid confusion. The division of responsibility depends on the **service model**: **IaaS**, **PaaS**, or **SaaS**.

| Layer                        | On-Premises | IaaS         | PaaS         | SaaS               |
| ---------------------------- | ----------- | ------------ | ------------ | ------------------ |
| Applications                 | Customer    | Customer     | Customer     | **Provider**       |
| Data                         | Customer    | Customer     | Customer     | Sometimes Customer |
| Runtime                      | Customer    | Customer     | **Provider** | **Provider**       |
| Middleware                   | Customer    | Customer     | **Provider** | **Provider**       |
| Operating System             | Customer    | Customer     | **Provider** | **Provider**       |
| Virtualization               | Customer    | **Provider** | **Provider** | **Provider**       |
| Servers, Storage, Networking | Customer    | **Provider** | **Provider** | **Provider**       |

## Cloud Computing Types

### Public Cloud

A **public cloud** offers computing services (like storage, servers, databases) to **many different customers** over the **public internet**. **Anyone** can pay for and consume services, with little or no restriction.

**Key Points:**

- **Multi-Tenant**:
   Many different organizations (called **tenants**) share the same cloud infrastructure.
- **Economical**:
   Public clouds are low-cost because the provider sells services at a high volume.
- **Service Variety**:
   Offers **IaaS**, **PaaS**, and **SaaS** services. Customers can pick what they need.
- **Flexibility**:
   Suitable for all types of businesses — from startups to large enterprises — because it scales easily.
- **Access**:
   Typically accessed over the internet, making it very convenient and quick to set up.

**Why Organizations Use Public Cloud:**

- **Cost Savings**: No need to buy and maintain hardware.
- **Scalability**: Easily increase or decrease resources based on needs.
- **Speed**: Fast to deploy new services or applications.
- **Innovation**: Access to the latest technology and cloud services.

### Private Cloud

A **private cloud** is a cloud environment used exclusively by one organization (single-tenant), typically hosted on-premises or by a third party.

**Key Points:**

- **Single-tenant** environment
- **More secure** and compliant (e.g. data residency)
- **No shared responsibility** – organization manages everything
- **Limited elasticity** and **higher cost** than public cloud
- Usage is measured internally (no pay-as-you-go)

**Why Use Private Cloud： **

- Company policies or legal restrictions prevent public cloud use
- Need full control over **sensitive data**
- Customization of infrastructure and services

**Pros**

- Greater **control** and **security**
- Tailored to organization’s needs
- Better compliance with internal/external rules

**Cons**

- High **setup and maintenance cost**
- Requires **in-house expertise**
- Less scalable than public cloud

### Hybrid Cloud

A **hybrid cloud** combines **public** and **private cloud** environments, allowing organizations to run workloads across both.

**Key Features**

- Supports **IaaS**, **PaaS**, **SaaS** across both environments
- **Connected via public internet** (usually)
- Enables **cloud bursting**:
  - Overflow workloads shift from private to public cloud automatically
  - Seamless and transparent to users

**Why Use Hybrid Cloud?**

- **Flexibility** to meet varying needs:
  - Sensitive data → **Private Cloud**
  - Less critical workloads → **Public Cloud**
- Ideal for **medium to large enterprises** with complex requirements
- Balances **security** and **scalability**

 **Pros**

- Combines control of private cloud with scalability of public cloud
- Cost optimization: use public cloud **on demand**
- Helps meet **compliance** without sacrificing agility

**Cons**

- More **complex to set up and manage**
- Requires good integration between environments

### Sovereign Cloud

A sovereign cloud is a **government-exclusive cloud** built to **store and process sensitive national data**.

**Purpose**: Protect national interests (e.g., defense, law enforcement, citizen services) from cyber threats and foreign influence.

**Design**:

- **Isolated** like a private cloud

- **Scalable** like a public cloud

- Operated under **strict legal, security, and compliance requirements**

**Operated through agreements** between the government and a cloud vendor (e.g., data location, network access, local regulations, citizenship of staff).

**Examples**:

- **Azure US Government Cloud** – only for US agencies, isolated, US citizens only.
- **Azure China** – operated by Vianet 21, for entities with Chinese presence.
- **Azure Australia Regions** – two Azure regions reserved for the Australian government.

- **Note**: Not accessible to the public; restricted to **authorized government entities**.

## Benefits of Cloud Computing

### Elasticity

Elasticity is the cloud's ability to automatically **add or remove resources** (like CPU, memory, storage) **based on real-time demand**.

- Like a **rubber band**: Stretches when demand grows, shrinks when it drops.
- Works across **IaaS, PaaS, and SaaS**.
- Ensures apps continue running smoothly during **spikes or drops** in usage.
- Resources are **dynamically allocated and reclaimed** — no manual intervention needed.
- One of the **core benefits** of cloud computing (alongside scalability, high availability, etc.).

**How it’s implemented **

- **Monitoring:** The cloud platform continuously monitors usage metrics like CPU, memory, and traffic.

- **Auto-scaling rules:** Users define rules (e.g. if CPU > 80%) to trigger scale-out or scale-in.

- **Provisioning:** Based on the rules, the cloud automatically adds or removes virtual resources.

- **Deprovisioning:** When demand drops, unused resources are released back into the pool.

- **Automation:** This process is fully automated and fast, ensuring apps stay responsive under changing loads.

### **Scalability**

Scalability allows an application to handle changes in demand by adjusting its resources. There are two ways an application can scale:

1. **Vertical Scaling (Scaling Up/Down):**

   - **Scaling Up:** The application increases its instance size to demand more resources when the load rises.
   - **Scaling Down:** When the load decreases, it reduces its instance size and resource usage.

   This type of scaling adjusts the **size of individual resources**.

2. **Horizontal Scaling (Scaling Out/In):**

   - **Scaling Out:** The application adds more instances (copies) of itself to distribute the load.
   - **Scaling In:** When the load decreases, extra instances are turned off to save resources.

   This type of scaling adjusts the **number of instances**.

Scalability can be **vertical** (up/down) or **horizontal** (out/in). For an application to be scalable, it requires an **elastic infrastructure**. In **IaaS and PaaS**, the user implements scalability, while in **SaaS**, the provider handles it.

Azure supports both types of scalability for applications running on its platform.

#### Difference of Elasticity & Scalability

**Elasticity** focuses on the **dynamic allocation** and **deallocation** of resources to **meet immediate demand**.

**Scalability** refers to the **capacity to handle growth** over time, allowing the system or application to **grow or shrink** without breaking.

### High Availability (HA)

High Availability (HA) ensures that applications **remain accessible** even **when there's a disturbance** in the underlying infrastructure. It minimizes downtime by allowing systems to seamlessly switch to backup resources, ensuring continuous operation.

#### Types of Failover:

1. **Planned Failover**:
   - Happens during scheduled maintenance or upgrades of components (e.g., servers).
   - The application is moved to another node **before** maintenance begins.
   - Users experience **minimal or no downtime** during this process.
   - Once maintenance is completed, the application can failback to its original node without disrupting users.
2. **Unplanned Failover**:
   - Occurs when an unexpected failure happens, such as a server crashing.
   - The application is immediately moved to another node without waiting for the failure to be fixed.
   - This results in **some downtime** but ensures that the application remains **highly available**.
   - Once the issue is resolved, the application can be returned to its original node.

#### SLA (Service Level Agreement):

- The **uptime** of a service is defined in an SLA, typically expressed as a percentage (e.g., 99.999% uptime, known as "five nines").
- **Five nines** means the service can experience only about **5.5 minutes of downtime per year**.
- The **SLA** is crucial for understanding the expected availability of the service, and when using multiple services, a **composite SLA** is calculated based on the SLAs of each service used.

In **IaaS** and **PaaS**, customers must manage HA by configuring their own failover strategies, while in **SaaS**, the cloud provider handles it.

In summary, **high availability** ensures that applications remain up and running by automatically managing failovers, whether planned or unplanned, to keep downtime to a minimum.

### Fault Tolerance

Fault tolerance refers to the ability of a system to **continue operating properly** in the event of a fault or error. It ensures that the system can handle unexpected issues, such as hardware or software faults, without disrupting its functionality.

**Fault vs. Failure:**

- **Fault**: A temporary and instantaneous problem (e.g., an error or hardware glitch).
- **Failure**: A more **persistent** and long-lasting issue that requires more effort to resolve.

**Fault Tolerance in Action:**

- A system is **fault-tolerant** if it can handle faults without stopping or breaking the flow of operations.
- If a fault occurs, the system preserves its state and continues processing without disruption.
- Fault tolerance is usually built into the **operating system**, so it’s not something you need to manage in cloud environments.

Cloud service providers (like Azure) ensure fault tolerance across their services, so you don’t need to worry about managing it yourself.

In summary, **fault tolerance** ensures that an application remains functional even when faults (temporary issues) occur, maintaining system stability without requiring manual intervention.

#### Difference between HA & Fault Tolerance

| Feature       | High Availability                   | Fault Tolerance                    |
| ------------- | ----------------------------------- | ---------------------------------- |
| Handles       | Failures (longer-term)              | Faults (short-term, instantaneous) |
| Recovery time | Fast, but not instant               | Instant, seamless                  |
| Example       | Server A fails, Server B takes over | CPU error is auto-handled in OS    |
| User impact   | Possible brief downtime             | No impact                          |
| Typical layer | App/network/infrastructure          | OS/hardware                        |

### Disaster Recovery

**Disaster Recovery (DR)** is a strategy focused on protecting **data and services** from **large-scale catastrophic events**, such as:

- Natural disasters (earthquakes, floods, wildfires)
- Man-made events (war, sabotage)
- Total data center failures

**Key Concepts:**

- **Local backups aren't enough**: If both your main servers and local backup are in the same location, a disaster can destroy both.
- **Off-site backups**: To mitigate this, backups must be stored in **physically separate** locations. These backups are:
  - Called **disaster recovery sites**
  - Geographically distant from the main site
  - Designed so that a single disaster can’t affect both locations

Cloud as a Disaster Recovery Solution:

- **Affordable**: Cloud offers **off-site backup** and disaster recovery at a **much lower cost** than building a second physical site.
- **Automatic replication**: When you store data in the cloud, it’s **automatically replicated** to another data center in a different region.
- **Business continuity**: If one cloud region fails, the service can **failover** to the secondary region — often with little to no downtime or data loss.

### Cloud Security

Cloud security is critical because data, such as **trade secrets**, **personal details**, and **financial information**, must be protected from unauthorized access. A breach can seriously damage both an organization’s **reputation** and **revenues**. To mitigate such risks, several key security controls should be in place in any cloud environment:

Core Security Features:

#### Encryption

- **At rest**: Data should be encrypted while stored in the cloud.
- **In transit**: Data should be encrypted when moving between systems or locations.
- **Purpose**: To prevent unauthorized access to readable data, even if attackers intercept the data.

#### Identity and Access Management (IAM)

IAM is a framework for managing **who** can access the cloud resources and **what** they can do with those resources (read, write, delete, etc.).

It includes managing users, groups, and roles, along with authentication methods like passwords, **multi-factor authentication (MFA)**, and **Single Sign-On (SSO)**.

- **Prevent Unauthorized Access**: Only the right users should have access to sensitive data and resources.
- **Reduce Attack Surface**: Limiting access ensures that a breach in one part of the system doesn’t compromise everything.
- **Protect Critical Resources**: If the wrong person accesses a system or data, it can lead to severe consequences. IAM ensures that only authorized users have the right permissions.

**Best Practices:**

- Implement **multi-factor authentication (MFA)** to enhance security, requiring more than just a password to gain access.
- Regularly review and update access permissions, ensuring they align with the user’s current role.
- Use **least privilege**: give users the minimum access they need to perform their tasks.

#### Multi-layered Security Approach

**Multiple defenses**: Think of it like peeling an onion—each layer provides another barrier to entry. Legitimate users should have easy access, but unauthorized users should be blocked at each layer. Each layer can include firewalls, intrusion detection/prevention systems (IDS/IPS), access control, encryption, etc.

**End-to-end protection**: Security should cover every part of the cloud environment, not just isolated areas.

**Best Practices**:

- Use **firewalls** to monitor and control incoming and outgoing network traffic.
- Implement **intrusion detection systems (IDS)** to detect unauthorized access attempts.
- Employ **antivirus software** and **anti-malware tools** at multiple points in the cloud infrastructure.

#### **Proactive Monitoring**

Proactive monitoring involves continuously observing cloud systems for **anomalous activities** that might indicate a security breach, such as abnormal traffic, unauthorized access attempts, or system performance issues.

- **Early detection**: Rather than responding after a breach, the system should detect threats early and mitigate them before they cause damage.
- **Faster Response**: When a threat is identified early, it can be mitigated or prevented before it becomes catastrophic.
- **Prevention of Data Breach**: Waiting until a breach has already occurred makes it much harder to recover from the damage. Proactive monitoring aims to stop the breach before it happens.

**Best Practices**:

- Use **Security Information and Event Management (SIEM)** tools to aggregate and analyze logs for suspicious activities.
- Integrate **AI/ML-based threat detection** that can automatically identify and respond to unusual activities.

#### **Unified Security Management**

**Centralized visibility**: Administrators need a single platform to view and manage security alerts across multiple tools and services, preventing crucial threats from being missed due to scattered systems.

#### **Logging and Auditing**

- **Accountability**: Record every action performed by both internal and external users. This helps ensure any malicious or unauthorized actions can be traced back to the responsible party.
- **Prevention**: Knowing that activities are tracked discourages malicious behavior.

**Best Practices**:

- Ensure **logs are immutable**, meaning they cannot be altered after being created, for integrity.
- Store logs in a **separate, secure location** to prevent them from being deleted or tampered with in case of a breach.
- Set up **alerting systems** that notify admins of suspicious or unusual log entries (e.g., failed login attempts, unauthorized access).

Cloud security should cover encryption, IAM, multi-layered defenses, proactive threat monitoring, centralized management, and detailed logs. This ensures that sensitive data remains protected, breaches are detected early, and accountability is maintained.

## **Management & Governance**

### Management Expectations

1. **User-Friendly Interface**
   - The cloud platform should be intuitive, clean, and easy to navigate — not confusing like a maze.
2. **Wide Range of Services and Tools**
   - It should offer a variety of services, tools, and utilities for configuration and deployment, so organizations are never limited.
3. **Monitoring and Performance Optimization**
   - The cloud should provide health monitoring, performance reports, alerts for threshold breaches, and best-practice recommendations.
4. **Transparent Pricing and Cost Estimation**
   - Pricing should be clear with no hidden fees. There should be tools to estimate the cost of using services.
5. **Support Services**
   - The cloud provider should offer business and technical support through trained support engineers.

### **Governance Expectations**

1. **Industry Standards and Regulatory Compliance**
   - The cloud should support industry standards (e.g., common programming languages, platforms) and comply with legal and regulatory policies.
2. **Integration with Existing Solutions**
   - It should allow integration with third-party and existing in-house tools to ease cloud adoption and reduce transition costs.