---
date: 2019-02-23 20:20:49
author: tltoulson
url: /guides/getting-started-on-servicenow/navigating-the-ui
title: "Exercise: Navigating the UI"
socialImg: social.png
description: Now that we have a Personal Developer Instance, let's learn how to get around and handle the basics of using ServiceNow. These techniques will set the foundation for everything else you can do with ServiceNow.
weight: 400
---

**Objective:** Practice basic ServiceNow usage including:

- Navigating ServiceNow

- Viewing records in lists and forms

Now that we have a Personal Developer Instance, let's learn how to get around and handle the basics of using ServiceNow. These techniques will set the foundation for everything else you can do with ServiceNow.

## Exercise

Follow the below instructions to complete the exercise:

1. Log in to your Personal Developer Instance

2. <span id="step-2"></span> Using the **Filter navigator**, filter the Application menus and Modules to those containing the word **Incident** [(Learn more about the Application Navigator)][1]

  1. Identify the search box in the top left titled **Filter Navigator**

  2. Type **Incident** into the Filter Navigator field

  3. Observe that the list of Application Menus and Modules has filtered

3. <span id="step-3"></span> Navigate to  **Incident > Open** to display a list of all open Incident records [(Learn more about the List View)][3]

  1. Find the **Incident** Application menu

  2. Under the **Incident** Application menu, find the **Open** Module

  3. Click the **Open** module

4. <span id="step-4"></span> Open the first Incident record in the list to the Form View [(Learn more about the Form View)][5]

  1. Click the underlined text in the first column of the record, which in this case should be the Incident's Number

5. <span id="step-5"></span> Using the Filter navigator, navigate to **Incident > Overview** [(Learn more about other Page Types)][7]

## Review

### Application Navigator

<figure>
  <img src="images/Application Navigator.png" />
  <figcaption>
    Components of the Application Navigator
  </figcaption>
</figure>

The primary method of navigation in ServiceNow is the Application Navigator. It is composed of the Filter navigator, Application menus, and Modules.

### Application Menus

Application menus, sometimes referred to as Applications, are the major categories that make up the navigation.  All modules will appear under an Application menu. Generally each Global Application and Scoped Application will have at least one Application Menu, though some have multiple.

### Modules

Modules are the actual navigational links in the Application Navigator. Most Modules will link you to a predefined list view of records but there are many other types of pages to explore in ServiceNow.

### Filter navigator

Application menus and Modules can pile up quickly in ServiceNow, especially for Administrators. The Filter navigator helps you to quickly find the modules you are hunting for. It will find any module that contains the search text somewhere within the module name.

This is really powerful since it means we can type **Portal** to find the **Service Portal** modules as one example. Or you could type **bug** to find a list of **debug** modules.

[(Return to Step 2)][2]

### List View

<figure>
  <img src="images/List View.png" />
  <figcaption>
    List View
  </figcaption>
</figure>

The list view is a page that displays zero or more records from the same data table. In this exercise, we viewed a list of records on the Incident table. Each row in the list represents a single record and each column represents a field on the record.

There are many actions that can be performed from the list view which we will cover in another exercise.

Nearly all data in ServiceNow is stored on a data table in the database. Also, every table in ServiceNow has a list view although not all list views are exposed with a Module. Keep this in mind as you continue your ServiceNow journey as this is one of the most important concepts in ServiceNow.

[(Return to Step 3)][4]

### Form View

<figure>
  <img src="images/Form View.png" />
  <figcaption>
    Form View
  </figcaption>
</figure>

The form view is a page that displays the fields and values for a single record on a data table. Forms are divided up into sections and can also use both one and two column layouts.

There are many actions that can be performed from the form view which we will cover in another exercise.

All records on a list view have a form view.

[(Return to Step 4)][6]

### Other Page Types

<figure>
  <img src="images/Homepage View.png" />
  <figcaption>
    Homepage View
  </figcaption>
</figure>

ServiceNow also has many other unique page types. Some are more universal such as the homepage view displayed above. Some are specialized like Knowledge Base, Service Catalog, and Service Portal pages. Still others are entirely custom, purpose built UI's such as Project Management Gantt Charts.

It can be helpful to navigate around ServiceNow and explore the different UI types to get a feel for what is available.

[(Return to Step 5)][8]

[1]: #application-navigator
[2]: #step-2
[3]: #list-view
[4]: #step-3
[5]: #form-view
[6]: #step-4
[7]: #other-page-types
[8]: #step-5
