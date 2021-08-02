---
date: 2019-02-23 20:20:49
author: tltoulson
url: /guides/getting-started-on-servicenow/filtering-records-in-the-list-view
title: "Exercise: Filtering Records in the List View"
socialImg: social.png
description: Mastering the list view is one of the more critical skills for new ServiceNow users. In this first List View exercise, we'll focus on different ways of filtering records.  
weight: 500
---

**Objective:** Practice filtering records in the list view:

Mastering the list view is one of the more critical skills for new ServiceNow users. In this first List View exercise, we'll focus on different ways of filtering records.  

## Exercise

1. In your Personal Developer Instance, navigate to **Incident > All**

2. <span id="step-2"></span> Using the list header search, find all Incidents containing the **Short Description** SAP [(Learn more about the list header search)][1]

  1. Locate the list header search next to the **New** button in the list header

  2. Change the dropdown selection to **Short description**

  3. Type **\*SAP** in the Search field

  4. Press the **enter** key on the keyboard

  5. Observe that the list has been filtered to show only items where the Short Description contains the text **SAP**

3. <span id="step-3"></span> Use the context menu to show only the current items where the **State** field is **In Progress** [(Learn more about the list context menu)][3]

  1. Find a record where the **State** is **In Progress**

  2. Right click the **In Progress** text in the record's **State** column

  3. In the context menu that is displayed, click **Show Matching**

  4. Observe that the list has been filtered to show items where the Short Description contains the text **SAP** and are also in the **In Progress** State

4. <span id="step-4"></span> Use the **Remove next condition** icon (>) to remove the **Short description contains SAP** condition in the filter breadcrumbs [(Learn more about the filter breadcrumbs)][5]

  1. Locate the filter breadcrumbs next to the filter icon

  2. Hover over the right angle bracket (>) before **Short description contains SAP**

  3. Observe the hover text says **Remove next condition**

  4. Click the right angle bracket (>)

  5. Observe the **Short description contains SAP** condition is removed from the filter.

5. <span id="step-5"></span> Use the filter condition builder to add a condition that shows only Critical Priority Incidents [(Learn more about the filter condition builder)][7]

  1. Click the filter icon to open the condition builder

  2. Observe that the State condition is still applied

  3. Click the **And** button next to the State condition

  4. Select **Priority** from the **--choose field--** dropdown

  5. Select **1 - Critical** from the third dropdown in the new condition

  6. Click the **Run** button

  7. Observe that the filter breadcrumb and list of Incidents have updated to reflect the changes to the filter conditions

## Review

### List Header Search

<figure>
  <img src="images/List Header Search.png" />
  <figcaption>
    List Header Search
  </figcaption>
</figure>

The list header search is a quick way to perform simple text searches on the currently displayed list. It allows selecting a specific field to search or selecting **for text** to perform a search across all searchable fields.

The search also supports a few wildcards to assist with particular types of searches such as **starts with** or **contains**. Here is a list of the wildcards available using the **SAP** search text as an example:

- **\*SAP**: Contains the text SAP
- **%SAP**: Ends with the text SAP
- **SAP%**: Starts with the text SAP
- **SAP**: Is exactly the text SAP
- **!*SAP**: Does not contain the text SAP
- **!=SAP**: Is not the text SAP

[(Return to Step 2)][2]

### List Context Menu

<figure>
  <img src="images/List Context Menu.png" />
  <figcaption>
    List Context Menu
  </figcaption>
</figure>

The list context menu provides a number of actions that can be performed against a specific row or field in the list view. When a user right clicks a value in the list view, the context menu takes note of the field and the value clicked. In this exercise we explored the **Show Matching** capability but it is worthwhile to explore some of the other more frequently used options on your own:

Filtering Options add a condition to the end (right) of the filter:

- **Show Matching**: Filters to show records where [field] IS [value]

- **Filter Out**: Filters to show records where [field] IS NOT [value]

- **Show After**: Filters to show records where [date field] >= [value]

- **Show Before**: Filters to show records where [date field] <= [value]

Clipboard options are a quick way to copy information about a record:

- **Copy URL to clipboard**: Copies to your clipboard the web address that will navigate directly to the form view of the record

- **Copy sys_id**: Copies to your clipboard the unique id for the record

[(Return to Step 3)][4]

### Filter Breadcrumbs

<figure>
  <img src="images/Filter Breadcrumbs.png" />
  <figcaption>
    Filter Breadcrumbs
  </figcaption>
</figure>

<figure>
  <img src="images/Filter Breadcrumb Context Menu.png" />
  <figcaption>
    Filter Breadcrumb Context Menu
  </figcaption>
</figure>

The filter breadcrumbs show the current filter that is applied to the list view. The breadcrumbs appear simple but hide a significant amount of powerful behavior. The actions you can explore on the filter breadcrumbs include:

- **Remove a filter condition** - Click the right angle bracket (>) before any condition to remove it

- **Remove all filter conditions after a selected one** - Click any filter condition to remove all the conditions after it (to the right)

- **Copy filter to clipboard** - Right click any filter condition and click **Copy Query** to copy the encoded query, the text representation of the query, for the conditions up until the selected one. This is used extensively by Admins and Developers on ServiceNow.

- **Copy the URL to clipboard** - Right click any filter condition and click **Copy URL** to copy the web address to the current list with the filter applied. This is helpful for sharing links with coworkers.

- **Open list in new window** - Right click any filter condition and click **Open in new window** to open the list in a new window

[(Return to Step 4)][6]

### Filter Condition Builder

<figure>
  <img src="images/Condition Builder.png" />
  <figcaption>
    Condition Builder
  </figcaption>
</figure>

Mastering the filter condition builder is an absolute MUST! Whether a user, an admin, or a developer, nearly everyone will spend most of their time filtering lists in ServiceNow using the condition builder. Additionally, the condition builder is seen throughout ServiceNow in many different ways from reports to setting conditions and rules for different scripts.

Most of ServiceNow is driven by filtering and matching lists of records based on conditions and then taking action on the filtered list, so spend as much time as you can getting accustomed to using this tool.

There are many buttons and actions we did not cover in this particular exercise that are worth exploring. Here is a list to summarize what the filter condition builder can do:

Buttons:
- **Run**: Executes the currently set filter and returns the filtered list of records

- **Save...**: Saves the current filter, allowing a user to save a personalized list of filters that can be accessed through the list view's hamburger menu at the top left corner

- **AND**: Allows the user to specify multiple conditions which must all be matched for a result to be included in the filtered list

- **OR**: Allows the user to specify multiple conditions, one of which must match for a result to be included in the filtered list

- **Add Sort**: Allows the user to sort list view results by a specified field

- **Delete (X)**: Allows the user to remove specific filter conditions from the condition builder

[(Return to Step 4)][8]

[1]: #list-header-search
[2]: #step-2
[3]: #list-context-menu
[4]: #step-3
[5]: #filter-breadcrumbs
[6]: #step-4
[7]: #filter-condition-builder
[8]: #step-5
