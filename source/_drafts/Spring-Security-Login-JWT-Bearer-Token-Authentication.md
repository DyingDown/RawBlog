---
title: 'Appointment Scheduler: Spring Security Login - JWT Bearer Token Authentication'
date: 2025-09-04 00:31:18
tags: [Spring Security, JWT, Bearer, Login]
categories: [Appointment Schedule Program]
postImage:
description:
warning:
isCarousel:
---

To understand the how to write login with Spring Security, we have to understand how it plays a part in the flow of a request.

1. Servlet container (usually Tomat/ Jetty) catch the request first. It will check which filter is registered already.
2. Servlet Filter Chain( Container Level Chain) Processing Filter in order.
3. One of the filter in Servlet Chain is `DelegatingFilterProxy`, injected by Spring Boot. It will looking for a Bean named `springSecurityFilterChain` in Spring.
4. `FilteredChainProxy `(总调度 of Spring Security): in side it are sequence of filter (CORS -> CSRF -> JWT -> Auth -> Exception -> Access Decision …) ;
5. DispatcherServlet (Core of Spring MVC) . If it pass security check, then it will find the corresponding controller and run business logic.

