---
title: >-
  Microsoft Azure Fundamentals (AZ-900) Cert Prep: 2 Azure Architecture and
  Security
date: 2025-04-12 19:10:14
tags: [Azure, AZ-900 Cert, Cloud Security]
categories: [Azure, AZ-900]
postImage: https://cdn.jsdelivr.net/gh/DyingDown/img-host-repo/202505072227012.png
description:
warning: True
isCarousel: False
---

This note covers key topics from the AZ-900 exam, including Azure architecture, Microsoft Entra ID, and Azure security. It introduces core concepts like global infrastructure, identity management, and security tools such as Conditional Access and Defender for Cloud. Together, these topics make up about **35–40%** of the exam and form the foundation of Azure fundamentals.

<!--more-->

## Azure Architecture

### Overview

Microsoft Azure's global infrastructure is built to deliver high availability, regulatory compliance, and scalable performance across the world. Its architecture is organized into a **hierarchical model** that supports governance, data sovereignty, and efficient cloud operations.

#### **Azure Geography**

- The **largest unit** in Azure’s infrastructure model, typically aligned with **national borders** (e.g., U.S., China).
- Enables **compliance with local regulations** and **data residency requirements**, which is critical for industries handling sensitive data like finance and healthcare.
- Microsoft expands to new geographies based on **customer demand and IT maturity** in each country.

#### **Azure Region**

- A **subset of a geography**, comprising one or more physically isolated **data center locations** within a specific area.
- Each region is designed for **fault tolerance** and **scalability**, enabling customers to deploy applications and services close to their users.

#### **Real-Time Infrastructure Visibility**

- Microsoft offers a **public Azure infrastructure map**: [infrastructuremap.microsoft.com](https://infrastructuremap.microsoft.com)
- The map shows geographies, regions, network PoPs, edge zones, and high-speed connections across the globe.
- Users can explore Azure's presence interactively, observe **infrastructure density**, and track upcoming expansions.

#### **Strategic Deployment**

- **Heavily IT-oriented countries** (e.g., the U.S.) have a higher number of Azure regions and more extensive infrastructure.
- Less IT-developed geographies may have fewer regions, but the **core architectural principles remain consistent**.

### Azure Regions

In Azure’s infrastructure hierarchy, a **region** is the next level beneath a **geography**. It represents a **specific area within a country** (e.g., East US) and plays a critical role in how services are deployed and accessed.

#### What Is an Azure Region

- A **region** is a **localized cluster of data centers** within a specific area of a geography.
- Large countries may have multiple regions (e.g., East, West, Central) to **ensure low latency** and better coverage.
- **Microsoft decides** the number and placement of regions based on **market demand** and geography size.

#### **Region Selection by Customers**

- When deploying services in Azure, **you must choose a region**.
- Choose a region **closest to your end users** to reduce latency and improve performance.
  - Example: If your app serves Los Angeles, deploy in **West US**.

#### **Availability Zones (AZs)**

- A region contains one or more **Availability Zones**, which are **physically separate data centers** within that region.
- A region with **3 or more AZs** is called an **Availability Zone-enabled region**.
  - Provides better **fault tolerance** and **high availability**.

#### **Real-World Region Examples**

- **East US** (Virginia): Opened in 2014, data stays in the U.S.
- **West US** (California): Opened in 2012, U.S. data residency.

Regions impact **performance**, **compliance**, and **resilience**.

Always align your region selection with **user location**, **regulatory needs**, and **service availability**.

### Regional Pairs

An Azure **regional pair** consists of two Azure regions within the same geography. These regions are **connected by low-latency, dedicated links** (less than 20 ms round trip) and are separated by at least **300 miles** to ensure **redundancy** and **disaster recovery**.

#### Why Are Regional Pairs Important?

1. **Data Replication**: Regional pairs enable **cross-region replication** to ensure redundancy. If one region fails, the other region can take over to maintain service availability.
2. **Disaster Recovery**: The physical separation helps to reduce the risk of both regions being affected by the same disaster (e.g., natural disasters, power outages).
3. **Planned Maintenance**: Microsoft ensures that maintenance is performed on one region at a time in a pair. This minimizes downtime during upgrades.

#### **Types of Regional Pairing**

- **Bidirectional Pairing**: Both regions can replicate data to each other.
  - Example: **East US ↔ West US**
- **Unidirectional Pairing**: Data replicates from the smaller region to the larger one, but not the other way around.
  - Example: **West India → South India

#### **Best Practices for Using Regional Pairs**

- **Deploy across regional pairs** for **geo-redundancy** and high availability, especially for critical services.
- Services like **Azure Site Recovery** and **Azure Storage** can automatically use regional pairs for **disaster recovery**.
- Ensure your **backup and recovery** plans are designed to use the secondary region in the pair.
- **Test failover** in a paired region to make sure recovery works when a disaster happens.

### Availability Zone(AZ)

- **Availability Zones = physically separate data centers** within a **single Azure region**. 
- Each AZ is connected with others via **ultra-low-latency (<2ms) networks**.
- Physical separation is typically **~75 miles (~120 km)** to reduce the risk of shared failures.  The data centers are close enough

####  **Purpose of AZs**

- AZs are designed to provide **high availability** and **resilience** against local failures (e.g., power outages, floods).
- By spreading your resources across multiple AZs, you protect them from the failure of a single data center or even an entire zone.

#### **Two Types of Data Replication**

| Replication Type                     | Description                                          | Use Case                                |
| ------------------------------------ | ---------------------------------------------------- | --------------------------------------- |
| **Zonal Replication**                | Data is stored *within a single* AZ                  | Lower priority services                 |
| **Zone-Redundant Replication (ZRS)** | Data is replicated *across multiple* AZs in a region | High availability / disaster protection |

> ⚠️ You **choose the replication type** when provisioning certain resources (e.g., storage, databases). Azure doesn’t pick for you.  Zone-Reduntant Replication is only available when there are **3 or more**  AZs in a Region.

### Data Center

- A **data center** is a **physical building** located inside an **Availability Zone**.
- It contains the **servers**, **storage**, **networking**, and **security** hardware that run all Azure services.

#### **Key Characteristics**

- **Location Selection:** Chosen after evaluating for **natural disaster risks**.
- **Security:** Physically secure — biometric access, cameras, zigzag roads, thick walls.
- **Infrastructure:**
  - Redundant **power**, **cooling**, and **networking**
  - Enterprise-grade **storage and networking**
- **Environmental Efficiency:**
  - Power Usage Effectiveness (PUE) ≈ **1.12**
  - Microsoft is working toward making this even lower

#### **Data Redundancy**

- Every piece of data stored in Azure has:
  - **3 local copies** stored by default (within the same data center or availability zone)
  - **Additional copies** (3–7 total) if you enable **zone-redundant** or **geo-redundant** storage
- **You pay for one copy** — extra backups are covered by Azure

**No Data Center Info Online:**

- **Microsoft doesn’t publish** data center locations for **security reasons**
- Users are **not supposed to worry about physical infrastructure** — just choose the right **region** and **replication setup**

### Subscription

- A **billing container** that groups together all your Azure services and resources.
- Like a **shopping cart**: you add services (VMs, storage, databases, etc.) into it, and Azure sends you a **single monthly bill** for all those services.
- The **starting point** for using Azure. You need a subscription to deploy anything.

### Management Group

- A **management group** is a container for **subscriptions**.
- It allows you to **organize** and **apply governance** (like policies, access controls, and compliance rules) across multiple subscriptions.
- Think of it as the **“person pushing the shopping cart”** — if a subscription is the cart, the management group gives it direction.

#### Hierarchy Overview:

```
EditTenant Root Group (always exists, topmost)
│
├── Subscription A
│
├── Management Group X
│   └── Subscription B
│
└── Management Group Y
    └── Management Group Z
        └── Subscription C
```

#### **Key Concepts**

| Concept                        | Description                                                  |
| ------------------------------ | ------------------------------------------------------------ |
| **Tenant Root Group**          | The topmost group, created when you first sign up for Azure  |
| **Subscriptions belong to it** | Every subscription is **under** a management group, even if it's the root |
| **Policy Inheritance**         | Policies or access controls applied at higher levels **trickle down** |
| **Move Flexibility**           | Subscriptions and child management groups can be **moved** between groups |
| **Tenant Root Group Fixed**    | You **cannot delete or move** the Tenant Root Group          |
| **Portal Navigation**          | View/manage from Azure Portal (`portal.azure.com`) under "Management Groups" |

####  **Use Case Example**

You might create:

- One management group for **Production**, another for **Development**
- Under each, you put the relevant subscriptions
- Apply stricter policies to **Production** and more flexible ones to **Development**

### Resource Group

- A **resource group** is a **logical container** for related Azure resources (like VMs, databases, storage accounts, etc.).
- It exists **within a subscription**, which itself sits under a **management group**.
- It’s used to **organize**, **manage**, and **apply settings** to resources that share a common purpose (like supporting a single app).

#### **Azure Hierarchy Recap:**

```
EditTenant Root Group
└── Management Group (optional)
    └── Subscription
        └── Resource Group
            ├── Virtual Machine
            ├── App Service
            ├── Storage Account
```

#### **Why use Resource Groups**

- To **organize** related resources (e.g., all backend services of an app).
- To manage **permissions**, **policies**, and **lifecycle** collectively.
- To apply **tagging** or **resource locks** at a group level instead of per resource.

#### **Rules and Facts:**

| Feature                    | Description                                                  |
| -------------------------- | ------------------------------------------------------------ |
| **Region**                 | Only the **metadata** is stored in a selected region, not the actual resources |
| **Cross-region resources** | Resources in the group **can be in different regions**       |
| **No nesting**             | Resource groups **cannot be nested**                         |
| **Not tied to a region**   | Resource groups can manage globally distributed resources    |

#### **Creating a Resource Group (Steps):**

1. Go to Azure Portal → Search for **"Resource groups"**
2. Click **Create**
3. Choose:
   - Subscription
   - Name (e.g., `az900-rg1`)
   - Region (for metadata only)
4. Review → Validate → **Create**

**Analogy (Shopping Example):**

- If your subscription is the **entire shopping bag**, then a **resource group** is how you **sort items** when you get home:
  - Frozen food → freezer
  - Fruits → fridge
  - Snacks → cupboard

### Resource

- A **resource** is a specific instance of a cloud service — the actual "thing" you deploy and use in Azure.
- Examples:
  - A **virtual machine (VM)** for computing
  - A **storage account** for storing files
  - A **database**, **network interface**, or **load balancer**

#### **Hierarchy Overview**

```
EditManagement Group
└── Subscription
    └── Resource Group
        └── Resource (VM, DB, Storage, etc.)
```

#### **Resources = Cloud Service Instances**

- When you **choose and deploy a service**, it becomes a **resource** in your subscription.
- These can be from different cloud models:
  - **IaaS** (e.g., VM, Virtual Network)
  - **PaaS** (e.g., Azure App Service, Azure SQL)
  - **SaaS** (e.g., Microsoft 365)

#### **Core Functions of Azure Resources**

| Function       | Resource Example               |
| -------------- | ------------------------------ |
| **Compute**    | Virtual Machine, App Service   |
| **Networking** | VNet, Load Balancer, Public IP |
| **Storage**    | Blob Storage, File Storage     |

#### **Payments**

- **Only resources are billable** — you pay for what you deploy and use.
- **Management groups**, **subscriptions**, and **resource groups** are **free** (used for organization/admin only).
- Billing is based on:
  - **Type** (e.g., VM vs. SQL DB)
  - **Configuration** (e.g., size, region, redundancy)
  - **Usage** (e.g., runtime, storage amount)

## Microsoft Entra ID (Azure Active Directory)

### Identity and Access

**Identity** = Who you are (e.g., username/password, biometrics)
 **Access** = What you can do (e.g., read/write, admin rights)

- **Authentication** proves your identity (like showing a passport)
- **Authorization** decides your level of access (like showing a visa)

**Azure AD** performs both:

- Authenticates you when logging in
- Grants or denies access to Azure resources, SaaS apps (like Microsoft 365), or even on-prem apps via hybrid setups

#### **Identity and Access Management (IAM)**

IAM is the framework for managing digital identities and what they can access.

In Azure, IAM is **centrally handled by Azure AD**, and integrated with:

- **Role-Based Access Control (RBAC)** for Azure resources
- **Conditional Access Policies** for dynamic access decisions (e.g., block login if user is not in a trusted location or device)
- **Identity Protection** for risky sign-ins and user behavior analysis

*Azure AD is more than just usernames — it manages apps, groups, roles, devices, and more.*

#### **The New Reality of IAM**

In the modern cloud world:

- People use multiple devices (mobile, laptop, etc.)
- Work remotely (home, cafés, airports)
- Use **SaaS apps** and APIs across multiple clouds
- Want **Single Sign-On (SSO)** for convenience

*This massively increases the attack surface.*
 IAM must now cover:

- Device compliance
- App access policies
- Identity governance (who should have access? for how long?)
- Real-time threat detection (e.g., Impossible Travel alerts)

This ensures users can use the **same identity** in both cloud and on-prem environments.

*Example:* A company syncs HR accounts from local AD to Azure AD, so employees log in once to access both Teams and internal apps.

#### **Azure Active Directory – Core Capabilities**

Azure AD offers much more than basic directory services:

| Feature                                  | Description                                                  |
| ---------------------------------------- | ------------------------------------------------------------ |
| **SSO (Single Sign-On)**                 | One login for multiple apps (Microsoft 365, Salesforce, etc.) |
| **RBAC**                                 | Assign roles to users/groups at subscription/resource group/resource level |
| **MFA**                                  | Require second factor for sensitive logins                   |
| **Conditional Access**                   | If-then logic (e.g., block access from unknown devices)      |
| **Privileged Identity Management (PIM)** | Grant **temporary** admin access to reduce risk              |
| **Identity Protection**                  | Detects risky sign-ins and users using machine learning      |
| **Access Reviews**                       | Automates periodic reviews of user access to maintain least privilege |

### Microsoft Entra ID

**Microsoft Entra ID (MEID)** is the **new name for Azure Active Directory (Azure AD)** as of **July 2023**. It’s a **cloud-based identity and access management (IAM)** service — part of a broader **Microsoft Entra** product family.

In simpler terms:

Think of Entra ID as the **digital gatekeeper** of your cloud — managing:

- Who can **log in**
- What they can **access**
- What level of **permissions** they have

#### **Key Concepts**

#####  **Identity as a Service (IDaaS)**

- Entra ID is a **subset of SaaS** — Microsoft hosts and maintains it; you use it as a service.
- Handles things like:
  - **User sign-ins**
  - **App access**
  - **Device trust**
  - **Conditional access policies**

> AZ-900 Tip: You may be asked to categorize Entra ID as a SaaS or PaaS — the correct answer is **SaaS**.

##### **Part of Microsoft Entra Suite**

- Entra is a **family** of identity-related services:
  - **Entra ID** (formerly Azure AD) – for IAM
  - **Entra Permissions Management** – for CIEM (Cloud Infrastructure Entitlement Management)
  - **Entra Verified ID** – for decentralized identity (blockchain-style ID verification)

So, Entra ID is just **one product** in the bigger Entra umbrella.

##### **Universal Security Boundary: The Tenant**

- An **Entra tenant** is a **logically isolated identity boundary** within Microsoft’s global cloud.
- Created **automatically** when you sign up for Azure.
- It contains:
  - Users
  - Groups
  - Devices
  - Apps
  - Domains
- Your **Azure subscription is tied to this tenant**.

##### **Modern IAM for Modern Needs**

Built for a **cloud-first**, **mobile-first** world:

- Supports **SSO** to thousands of cloud apps
- Built-in **MFA**
- Powered by **AI & machine learning** (e.g., to detect suspicious logins)
- Has **deep auditing & logging**

> Example: If someone logs in from an unusual location (e.g., China 1 minute after logging in from the U.S.), Entra ID can **flag it or block it**.

##### **Hybrid Compatibility with On-Prem AD**

If a company still uses **on-prem Active Directory**, they can:

- Use **Microsoft Entra Connect** to sync users/devices/groups to the cloud
- Use **Federation (ADFS)** for delegated authentication
- Support **hybrid identity** where users log in once and get access to **both on-prem and cloud apps**
- Enable **Password Hash Sync** or **Pass-through Authentication**

##### **Admin Interface – Still Called “Azure Active Directory” in Portals**

- Microsoft is **transitioning** branding across all tools and portals.
- You might still see “Azure Active Directory” in:
  - Azure Portal
  - PowerShell modules (`AzureAD`, `MSOnline`)
  - CLI tools

### Users, Devices and Applications

#### **Users**

- **Cloud-native users**: Created directly in Azure (e.g., via Azure Portal or scripts).
  - Managed entirely in the cloud.
- **Synchronized users**: From on-prem Active Directory using **Microsoft Entra Connect** (formerly Azure AD Connect).
- **Default role**: Standard user (limited permissions).
- **Role-based access**: You can assign **Roles** (like Global Administrator) to elevate privileges.

#### **Groups**

- **Security Groups**: Used for assigning access/permissions.
- **Microsoft 365 Groups**: Enable collaboration (used with apps like Teams, SharePoint, etc.).

#### **Devices**

Devices can be:

- **Azure AD Joined**: For cloud-only Windows devices.
- **Hybrid Azure AD Joined**: For on-prem domain-joined devices that also need cloud access.
- **Azure AD Registered**: For **BYOD** (Bring Your Own Device) scenarios (iOS, Android, macOS, Windows).

#### **Applications**

Azure supports:

- **Modern apps** using protocols like **OAuth2.0, SAML, OpenID Connect, WS-Federation**.
- **Legacy apps** using traditional protocols.

### Domain Services

- For **legacy, directory-aware applications** that:
  - Can’t be refactored to use modern protocols (like OAuth2 or SAML).
  - Require **NTLM**, **Kerberos**, or **LDAP** for authentication/authorization.

#### **What It Provides**

- A **standalone, managed domain** in Azure.
- Emulates an on-prem Active Directory **without needing domain controllers**.
- Provides **traditional protocols** support:
  - **Kerberos**
  - **NTLM**
  - **LDAP**

#### **How It Integrates**

- One-way **sync from Azure AD → Entra ID Domain Services** (Azure ADDS).
- This means **users from Azure AD can authenticate** to legacy apps via Azure ADDS, but **changes made in Azure ADDS do not sync back**.

**Use Case Examples**

Old HR or ERP systems that:

- Require **LDAP binds**.
- Authenticate users via **Kerberos/NTLM**.
- Can’t be modified due to:
  - Vendor lock-in
  - Missing source code
  - Legacy support limitations

####  Summary

| Feature            | Azure AD (Entra ID)          | Entra ID Domain Services (Azure AD DS)   |
| ------------------ | ---------------------------- | ---------------------------------------- |
| Protocols          | OAuth2, SAML, OpenID, WS-Fed | Kerberos, NTLM, LDAP                     |
| Use case           | Modern cloud apps            | Legacy directory-aware apps              |
| Sync direction     | —                            | One-way from Azure AD                    |
| Domain controllers | Not required                 | Microsoft-managed domain controllers     |
| Admin access       | Full control via roles       | No domain admin rights (managed service) |

### B2B & B2C

#### **Azure AD B2B (Business-to-Business)**

- **Target Audience:** External organizations collaborating with your company.
- **Use Case:** Allows external users (from partner organizations, suppliers, etc.) to access resources within your Azure environment.
- **User Management:**
  - External organization controls their users’ lifecycle (creating, modifying, deleting accounts).
  - You trust their directory, but **you** control the **authorization** for access to resources in your Azure tenant.
  - **Example:** Collaborators working on a joint project.

**How It Works**

1. **You invite external users** (e.g., someone@partner.com) to your Azure AD tenant.
2. The external user **accepts the invitation** via email or is auto-redeemed via a link.
3. The user is **represented in your tenant** as a "Guest user" (type = `Guest`, source = `External Azure AD`).
4. Azure **federates trust** with the user’s home organization’s Azure AD:
   - When the user signs in, Azure **redirects the login to their home directory**.
   - The external directory **authenticates** the user.
   - Your tenant **authorizes** access (via RBAC, group membership, etc.).
5. You assign access to **apps, resources (e.g., SharePoint, Teams), or Azure roles**.

**Key Features**

- Uses standard protocols: **SAML, OpenID Connect, OAuth2.0**.
- No need for on-prem federation (e.g., ADFS).
- You can enforce **Conditional Access**, **MFA**, and **Access Reviews** for guests.

#### **Azure AD B2C (Business-to-Consumer)**

- **Target Audience:** Individual consumers (not organizational users).
- **Use Case:** Handles identity management for large-scale, public-facing applications.
- **User Management:**
  - **Self-service** for end users to manage their accounts (sign up, modify profile, delete account) without needing admin intervention.	
  - Ideal for applications that cater to **public users**, like web or mobile apps.
  - **Example:** An airline app allowing users to book flights, join a loyalty program, and manage accounts.

 **How It Works**

1. You **create an Azure AD B2C tenant** (separate from your regular tenant).
2. Define **User Flows** (pre-built processes) or **Custom Policies** (for full control) for:
   - Sign-up / sign-in
   - Password reset
   - Profile editing
3. You configure **identity providers**:
   - Local accounts (email/password, phone)
   - Social accounts (Google, Facebook, Apple, etc.)
   - Enterprise accounts (via OpenID/SAML federation)
4. You **integrate your application** (web, mobile, SPA) with B2C using OpenID Connect / OAuth2.
   - Users authenticate via B2C’s branded login page.
   - After successful login, B2C returns a token (JWT) to the app.
5. Users **self-manage their accounts** through B2C's UI and API.

**Key Features**

- Fully **customizable branding** and UX.
- Scalable to **millions of users**.
- Integrates with **multiple identity providers**.
- Secure token issuance with **standard protocols**.

#### **Difference Between B2B and B2C**

| **Feature**            | **Azure AD B2B**                             | **Azure AD B2C**                                  |
| ---------------------- | -------------------------------------------- | ------------------------------------------------- |
| **Target Users**       | External organizations (partners, suppliers) | Individual customers (public users)               |
| **Account Management** | Managed by the external organization         | Managed by the individual end user (self-service) |
| **Use Case**           | Collaboration with external organizations    | Large-scale, public-facing applications           |
| **Examples**           | Partner access to project resources          | Consumer                                          |

### MFA

MFA adds a second (or more) layer of authentication **beyond just your password** to reduce the risk of unauthorized access.

**The Three Authentication Factors:**

1. **Something you know** – e.g., a **password**
2. **Something you have** – e.g., **authenticator app**, **security key**, **OATH token**
3. **Something you are** – e.g., **biometrics** like **facial recognition

**Common “Second Factors”:**

- **Authenticator app** (like Microsoft Authenticator or Google Authenticator)
- **FIDO2 security key** (USB hardware token)
- **OATH token** (physical code generator)
- **SMS/voice** (less secure; can be spoofed)
- **Windows Hello for Business** (biometric sign-in)

Azure can trigger MFA only when a **login attempt seems risky** (based on location, device, IP reputation, etc.), reducing user annoyance while maintaining security.

**Why MFA matters:**

Microsoft states **MFA can block over 99.9% of account attacks**, making it one of the most effective security measures.

> For AZ-900:  You only need to understand **what MFA is and why it’s important**, **not how to set it up** technically.

### Passwordless Authentication

Passwordless authentication **removes the need for traditional passwords**. Instead, it uses secure, more user-friendly methods like biometric data or physical devices.

**Why Avoid Passwords?**

- **Simple passwords** are easy to hack.
- **Complex passwords** are hard to remember.
- Users tend to:
  - Reuse passwords
  - Write them down
  - Let browsers or apps manage them
- All these practices increase the risk of password leaks.

**What Replaces Passwords?**

Passwordless solutions use combinations of:

- **Something you have** – e.g.:
  - Authenticator app
  - Smartphone
  - FIDO2 security key
  - Trusted computer
- **Something you are** – e.g.:
  - Facial recognition via Windows Hello
- **Something you know** – e.g.:
  - Short PIN (only valid on that device)

You still get **multi-factor security**, but no password is involved.

**How It Works in Azure:**

- Azure supports passwordless sign-ins via:
  - **Microsoft Authenticator app**
  - **FIDO2-compatible security keys**
  - **Windows Hello for Business**

The user just enters their email (public info), then completes sign-in by verifying a code or using biometrics.

**Real-World Example:**

1. User visits Azure sign-in page.
2. Clicks **"Use an app instead"**.
3. Enters a number shown on the screen into the authenticator app.
4. Taps **Approve**.
5. Access granted — no password ever used.

### Single Sign-On (SSO)

**SSO** allows users to **log in once** and gain access to multiple apps and resources **without needing to authenticate again** each time.

Without SSO:

- Users must log in separately to each application.
- With MFA, this means **multiple prompts**, reducing productivity and increasing frustration.

Works Across Environments:

- SSO supports **cloud** and **on-premises** resources.
- This **blends experiences** for users and helps with hybrid environments.

Best Performance:

- Optimized for **domain users** with:
  - **Domain-joined** Windows devices
  - Devices that are part of **Active Directory (AD)**

#### How SSO Works

1. **Initial Authentication**:
   - The user signs in to **Azure Active Directory (AAD)** by entering credentials and possibly completing **Multi-Factor Authentication (MFA)**.
   - If successful, **AAD issues a token**, typically:
     - A **Primary Refresh Token (PRT)** on Windows devices.
     - An **ID token** and **Access token** (usually JWTs - JSON Web Tokens) for web or native applications.
2. **What the Token Contains**:
   - User’s **identity claims** (username, user ID, roles, group membership).
   - **Audience**: The target application or resource that can use the token.
   - **Expiration** info.
   - **Scopes/permissions**: What the user is allowed to do (like read email, access SharePoint, etc.).
3. **Token Storage (on device)**:
   - On a **Windows domain-joined or Azure AD-joined device**, the **PRT** is securely stored and tied to the device and user session.
   - It's refreshed silently in the background via Windows logon or when needed.
4. **Accessing Another App**:
   - When the user accesses a second app (e.g., Outlook, Teams, SharePoint), that app **redirects** to Azure AD (or uses MSAL SDK).
   - Instead of prompting the user again, the device or browser sends the existing **token (PRT or refresh token)** to Azure AD.
   - Azure AD issues a **new access token** for that app based on the existing session — **no password or MFA prompt** is needed.
5. **Validation and Access**:
   - The app **validates the access token’s signature** (usually using public keys via OpenID Connect/OAuth2 standards).
   - If valid, the app grants access **automatically**.
   - All of this happens behind the scenes in milliseconds.
6. **Silent SSO Across Apps**:
   - The **PRT or refresh token** is re-used to get access tokens for different apps.
   - On browsers, **cookies and tokens** are also cached to reduce reauthentication.
   - In hybrid scenarios, SSO also works across **on-premises and cloud** via tools like **Azure AD Connect**, **AD FS**, or **Seamless SSO**.

## Azure Security

### Vulnerability vs. Threat

- **Vulnerability**: A weakness or flaw in your system, application, or configuration.
   *Example:* An open port, unpatched software, or weak password.
- **Threat**: An external or internal agent (person, software, or event) capable of exploiting a vulnerability.
   *Example:* A hacker, malware, or malicious insider.

> A **security breach occurs only when a threat successfully exploits a vulnerability.**
>  Without both, there’s no immediate danger — but either one is still a warning sign.

**Real-World Analogy**

| Element     | Analogy             | In IT Terms                               |
| ----------- | ------------------- | ----------------------------------------- |
| Open window | Vulnerability       | Software bug, unpatched OS, exposed API   |
| Ghost       | Threat              | Hacker, malware, phishing                 |
| Fence       | Preventive control  | Firewall, access controls, network rules  |
| Guard dog   | Proactive detection | Antivirus, SIEM, threat detection systems |

#### Azure Security Strategy – 3-Step Defense Model

1. **Fix known vulnerabilities (Close the window)**
   - Use services like **Microsoft Defender for Cloud**, **Azure Security Center**, and **Azure Policy** to detect misconfigurations or weak spots.
   - Regularly apply **patches**, enforce **strong authentication**, and remove **unused services**.
2. **Add preventive controls (Build the fence)**
   - Use **Network Security Groups (NSGs)**, **Azure Firewall**, **DDoS Protection**, and **Access Control (RBAC)** to reduce attack surfaces.
   - Leverage **Zero Trust** principles — never trust, always verify.
3. **Proactive detection and response (Guard the house)**
   - Implement **Azure Sentinel (SIEM/SOAR)** to collect, correlate, and respond to threats.
   - Enable **Microsoft Defender XDR** for unified threat detection across workloads.
   - Use **threat intelligence feeds** and **custom detection rules** to stay ahead of new exploits.

**Security Is a Continuous Process**

- **Not one-time**: Security configurations degrade, new code introduces bugs, and threats evolve daily.
- **Shared responsibility**: In cloud environments like Azure:
  - **Microsoft** secures the infrastructure.
  - **You** secure your data, apps, access, and configurations.

### Defense-in-Depth Model

Defense-in-Depth (DiD) is a **multi-layered security strategy** designed to **slow down, detect, and contain threats** at multiple points of the IT environment. The idea is that if one layer fails, others still provide protection — like the layers of an onion.

#### **Why Do We Need It?**

Because a **breach** is more than just stolen data. It can mean:

| Breach Type                | Impact Example                                        | CIA Pillar Violated |
| -------------------------- | ----------------------------------------------------- | ------------------- |
| **Confidentiality** breach | Hacker steals customer PII                            | C                   |
| **Integrity** breach       | Attacker alters financial data (e.g. deletes a digit) | I                   |
| **Availability** breach    | DDoS attack overwhelms a website, making it unusable  | A                   |

These three principles form the **CIA Triad**, the cornerstone of all security models:

- **C**onfidentiality – Only authorized users can access data.
- **I**ntegrity – Only authorized changes can be made to data.
- **A**vailability – Systems and data are accessible when needed.

#### **Layer by Layer Explanation**

Each layer of your IT environment has **specific protections** tailored to defend one or more parts of the CIA triad:

| Layer                           | CIA Focus                                | Explanation                                                  |
| ------------------------------- | ---------------------------------------- | ------------------------------------------------------------ |
| **Data**                        | Confidentiality, Integrity               | Data doesn’t “run,” so availability isn’t applicable. Protect confidentiality and prevent unauthorized changes. |
| **Application**                 | Confidentiality, Integrity, Availability | Applications process data and must be secure, available, and reliable. |
| **Frameworks and Runtime**      | Integrity, Availability                  | Ensure that updates and runtime environments are not tampered with and stay operational. |
| **Patches and hotfixes**        | Integrity, Availability                  |                                                              |
| **Operating System & Hardware** | Confidentiality, Integrity, Availability | All three are important to ensure secure and stable operations. |
| **Power, Cooling, Internet**    | Availability                             | Not IT components, but essential to keeping systems running. |
| **Physical Space**              | Confidentiality                          | Ensure unauthorized people cannot physically access systems. |

> **Important**: Even non-IT layers like power, cooling, and internet mostly protect **availability**.

#### **How It All Works Together**

Think of DiD as a series of **security gates**. Even if an attacker breaches one gate, each subsequent layer slows them down and increases the chance of **detection and mitigation** before any real damage occurs.

For example:

- A DDoS attack is stopped at the **perimeter**.
- If it bypasses that, **load balancing** and **auto-scaling** at the app level help maintain availability.
- If malware gets in, **host-based protection** may detect and isolate it.
- If someone attempts data exfiltration, **Azure Information Protection** or **encryption** ensures the data is useless without the proper keys.

**Security Is Ongoing**

Defense-in-Depth is **not static**. You must:

- **Regularly assess** each layer for gaps.
- **Update patches** and security rules as threats evolve.
- Use tools like **Microsoft Defender for Cloud** to get continuous posture assessment.

### Azure Entra ID Conditional Access

Enforces intelligent, risk-based access control *after* a user enters their **first-factor authentication** (e.g., password).

**How It Works**

1. **Triggers** at first sign-in attempt.

2. **Collects and evaluates "signals":**

   - 👤 **User identity** (who is signing in)
   - 👥 **User group** (what group they belong to)
   - 💻 **Device type & OS**
   - 📲 **Application** being accessed
   - 🌍 **Location & behavior** patterns
   - 🛡 **Real-time risk level** (e.g., known attacks, geolocation anomalies)

3. **AI/ML Analysis:**

   - Uses machine learning to compare against user's typical behavior (device, location, access history).
   - Evaluates **risk level** of the sign-in.

4. **Decision Engine:**
    Based on risk, Entra ID performs **access enforcement**:

   | Risk Level      | Action                                                 |
   | --------------- | ------------------------------------------------------ |
   | **Low Risk**    | ✅ Allow access                                         |
   | **Medium Risk** | ⚠ Require additional steps (e.g., MFA, password reset) |
   | **High Risk**   | ❌ Block access outright                                |

**Templates & Custom Policies:**

- Comes with Microsoft-recommended **default templates**.
- You can **enable, modify, or build your own policies** using them as a starting point.

### Azure Role-Based Access Control (RBAC)

Provides **fine-grained authorization** to Azure resources *after* successful authentication. It's about **what a user can do** with a resource, not just who they are.

**Core Components of RBAC:**

| Component              | Description                                                  |
| ---------------------- | ------------------------------------------------------------ |
| **Security Principal** | The identity to which permissions are granted (User, Group, Service Principal, etc.) |
| **Role Definition**    | Describes the set of permissions (e.g., Owner, Contributor, Reader) Defines allowed actions: Create, Read, Update, Delete (CRUD) |
| **Scope**              | The **boundary** where permissions apply: 🔹 Management Group 🔹 Subscription 🔹 Resource Group 🔹 Specific Resource |

**Role Assignment Process:**

- **Role Assignment = Role Definition + Security Principal + Scope**
- Example: Assigning the "Reader" role to user "Alex" at the scope of "Resource Group A"

**Built-in vs. Custom Roles:**

| Type         | Description                                                  |
| ------------ | ------------------------------------------------------------ |
| **Built-in** | Predefined roles provided by Azure (e.g., Owner, Contributor) |
| **Custom**   | User-defined roles with precise control over permissions     |

**Deny Assignments:**

- The **opposite** of role assignments.
- Explicitly **deny access** even if a user might have been granted permission elsewhere.
- Useful in highly secure scenarios or for overriding inherited permissions.

### Microsoft Defender for Cloud

Provides a **unified security interface** across Azure, on-premises, and multi-cloud environments (including **AWS** and **GCP**).

**Features & Components**

| Feature                 | Description                                                  |
| ----------------------- | ------------------------------------------------------------ |
| **Unified Dashboard**   | Centralized visibility for all security-related events across environments. |
| **Multi-Cloud Support** | Works with Azure, AWS, GCP, and on-premises infrastructure.  |
| **Agents/Extensions**   | Installed on resources to collect data and scan for vulnerabilities. |
| **Secure Score**        | Percentage value indicating your security posture—the higher, the better. |
| **Recommendations**     | Step-by-step guidance to fix misconfigurations and improve your secure score. |
| **Quick Fixes**         | One-click remediation for certain issues.                    |
| **Real-Time Alerts**    | Notifies you immediately of anomalies or suspicious activity. |
| **CSPM + CWPP**         | Provides both **Cloud Security Posture Management** and **Cloud Workload Protection Platform**. |

 **Security Capabilities Met:**

- Actively assess environment.
- Help fix vulnerabilities.
- Offer preventive threat protection.

#### **How it works**

#####  1. **Data Collection (via Agents or Extensions)**

- Defender deploys **lightweight agents** or **extensions** into your resources (VMs, databases, containers, etc.).
- These agents **continuously scan** your environment—on Azure, on-premises, or other clouds like AWS and GCP.
- They gather **telemetry data**, like:
  - OS and software configurations
  - Network traffic patterns
  - Resource metadata
  - Identity usage and sign-in behavior

##### 2. **Analysis and Scoring**

- Defender aggregates this raw data in Microsoft’s backend.

- It uses **machine learning** and **heuristic rules** to:

  - Detect misconfigurations (e.g., open ports, missing patches)
  - Spot suspicious activity or potential threats

- Then it generates a **Secure Score** (percentage):

  > Higher = more secure

##### **3. Threat Detection & Alerts**

- If an anomaly is detected (e.g. a login from an unusual location or a known malware behavior), Defender:
  - **Raises an alert** in real-time
  - Tags the alert by **severity** and **type** (e.g. brute-force attack, privilege escalation)
  - Maps it to MITRE ATT&CK framework where possible

##### **4. Recommendations & Auto-Remediation**

- Defender suggests **step-by-step fixes** for each issue.
- For common problems, it offers **“Quick Fix” buttons** that:
  - Auto-remediate with minimal effort (e.g., close open ports, enforce encryption)
- Helps you meet compliance benchmarks like **CIS**, **NIST**, etc.

##### **5. Integration**

- It integrates with:
  - Microsoft Sentinel (SIEM) for threat correlation
  - Azure Policy for governance
  - Logic Apps for automated workflows
  - GitHub and DevOps pipelines for shift-left security

#### **What Does It Protect**

- Virtual Machines (Linux/Windows)
- SQL and Storage Accounts
- Kubernetes and Containers
- App Services
- Key Vaults
- Any connected on-prem or other-cloud resources (AWS, GCP)