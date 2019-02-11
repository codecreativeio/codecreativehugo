---
date: 2019-02-05 20:20:49
author: tltoulson
url: /guides/getting-started-on-servicenow/what-is-a-servicenow-instance
title: What is a ServiceNow Instance?
socialImg: images/social.png
description:
weight: 200
published: false
---

<figure>
  <img src="images/A ServiceNow Instance.png" />
  <figcaption>
    This is a ServiceNow Instance
  </figcaption>
</figure>

As mentioned in the previous section, ServiceNow operates using a single tenant architecture meaning that each customer gets their own copy or multiple copies of ServiceNow in the cloud. These copies are known as ServiceNow instances. Users can access an instance via web browser using each instance's unique URL such as `https://companyname.service-now.com`.

Each instance can run multiple applications side by side, so a single instance could potentially host an ITSM, HR, CSM, and Custom Apps all at the same base URL. This allows ServiceNow to act as a single system of record for multiple business applications, enriching each application through the sharing of data. For example, the HR application could kick off an Employee Onboarding Workflow which in turn creates a series of Requests in the ITSM application for setting up the new employee's computer.

The single tenant architecture also means that each instance is isolated from every other ServiceNow instance. Isolating instances allows organizations to keep their data and processes separate.  Some organizations will use multiple instances to ensure processes with sensitive data are kept separate from more democratized processes.

## Using Multiple Instances

A more common way that organizations use multiple instances is to separate different environments for development purposes, most commonly:

- Development Instance (companynamedev.service-now.com)
- Test Instance (companynametest.service-now.com)
- Production Instance (companyname.service-now.com)

Or as they are more commonly called: dev, test, and prod. Notice in the sample URLs above, the dev and test instances are post-fixed with dev and test (companyname**dev** and companyname**test**). This is most often how you will see the instance URLs represented with the production containing only the company name or instance name.  

Occasionally, you may come across organizations with only two or more than three instances and even encounter other identifiers such as QA, Staging, or Sandbox. Using multiple instances in this way allows developers to work in non-prod instances and promote development work using a standardized process. This ensures changes to the instance (like customizing forms or adding new code) can be thoroughly tested before promoting them into the prod environment.

## An Example

<figure>
  <img src="images/Visualizing ServiceNow Instances.png" />
  <figcaption>
    An example ServiceNow environment for two companies
  </figcaption>
</figure>

The example ServiceNow environment shows two hypothetical ServiceNow customers: Dallas Dogfood Company and Dixie Rose Delivery Services. (I may have taken a couple family dog names and used them to invent fake company names). As you can see, each company has opted for three instances: dev, test, and prod.

In total, there are 6 ServiceNow instances. Each instance has a unique set of users who are authorized to use the instance, unique groups the users can be assigned to, and unique data stored in the other tables. A change in one instance has no impact on any of the other instances. If Dallas Dogfood makes a change in the dallasdogfooddev instance, it only affects dallasdogfooddev. It has no impact on test or prod and no impact on the Dixie Rose Delivery Services Instances.

In fact, even if the same usernames exist in each instance, they are not guaranteed to have the same password. The user could (and for security reasons most likely should) set a different password in every instance.

Each instance could also have different apps installed in them. Dixie Rose Delivery may be leveraging the CSM Field Services to conduct their deliveries while Dallas Dogfood may instead be using the ITSM and ITOM suite of applications to manage their automated plant. Additionally, Dixie Rose Delivery could be exploring the use of the ITBM Project Management application in the dixierosedev environment without actually deploying it to production.

## Promoting and Cloning

As a final note on instances, it is helpful to note that once Dixie Rose Deliveries has evaluated they have multiple options for bringing their dev and production instances back into sync with one another.

First, they could chose to install the ITBM Project Management application in Production and promote up any changes they made in ServiceNow. You may hear this referred to as promoting Update Sets.

Alternatively, they could decide that ITBM is a poor fit for their organization and instead choose to clone the production instance over the dev instance. This in effect will make dev a carbon copy of prod, making it ready for further development and enhancement. If you choose to pursue a career in ServiceNow Administration, Implementation, or Development, you will become more familiar with these topics.

Now that we have learned what a ServiceNow instance is, the next step is to get our own ServiceNow instance to explore!
