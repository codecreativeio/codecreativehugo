---
date: 2019-02-23 20:20:49
author: tltoulson
url: /guides/getting-started-on-servicenow/creating-and-editing-records
title: "Exercise: Creating and Editing Records"
socialImg: social.png
description: ServiceNow wouldn't be very useful if you couldn't change the records. Thankfully, there are many different ways to change the data as long as the user has permission.
weight: 600
---

**Objective:** Practice creating and editing records in the list and form view:

ServiceNow wouldn't be very useful if you couldn't change the records. Thankfully, there are many different ways to change the data as long as the user has permission. If you are operating in your personal developer instance, you should have admin privileges which will let you edit just about anything.

## Exercise

1. In your Personal Developer Instance, navigate to **Incident > Open**

2. Filter the list to show Incidents where Active is true AND State is In Progress

3. <span id="step-3"></span> Change an Incident record's State to **On Hold** using the list edit [(Learn more about list edit)][1]

  1. Choose a record to update

  2. Double click the value in the State field to open the field edit pop up

  3. Select **On Hold** from the dropdown box

  4. Click the green check mark icon

  5. Observe that the State field updates to **On Hold**

4. <span id="step-4"></span> Change the state on multiple records to **On Hold** using the list edit [(Learn more about editing multiple records in the list view)][3]

  1. Click the **In Progress** value on a different record

  2. Hold the **Shift** key on your keyboard and press the **down arrow** key 5 times to select 6 records in total

  3. Double click the value in the State field in any of the selected fields to open the field edit pop up

  4. Select **On Hold** from the dropdown box

  5. Click the green check mark icon

  6. Observe that the State field on all 6 selected fields update to **On Hold**

5. Create a new Incident record

  1. Click the **New** button in the list header

  2. In the **Caller** field, type **Fred**

  3. Select **Fred Luddy** from the auto complete

  4. Type **My computer won't turn on** into the **Short description** field

  5. Click the **Submit** button in the form header

6. Update an existing Incident record using the form view

  1. Choose a record to update

  2. Click the value in the **Number** field (Ex: INC0000001) to open the record in the form view

  3. Change the **Contact Type** to **Phone**

  4. Right click in the form header to show the form context menu

  5. Click **Save** in the form context menu

  6. Observe that the record is saved and the form view is reloaded

  7. Type **We'll take a look at this right away!** into the **Work Notes** field

  8. Click the **Update** button in the form header

  9. Observe that the record is saved and you are returned to the list view

## Review

### List Edit

<figure>
  <img src="images/List Edit.png" />
  <figcaption>
    List Edit
  </figcaption>
</figure>

List editing allows quick record changes to be made without having to open up the form view. There are many potential caveats to this style of editing.

1. The user must have the correct permissions to edit the field.

2. Business rules that require certain fields may prevent list editing. For example, in a baseline instance if you try to update the **Priority** field, it will revert to the previous value. This is because of a rule that calculates the Priority based on the Impact and Urgency fields.

3. Other rules implemented by an administrator, such as UI Policies and Client Scripts, often don't apply to the list view. For this reason, some administrators will disable list editing all together.

4. Even if list editing is enabled, some field types and tables do not support list editing

[(Return to Step 3)][2]

### Multiple Record Editing

<figure>
  <img src="images/Multiple Record Editing List View.png" />
  <figcaption>
    Multiple Record Editing List View
  </figcaption>
</figure>

Editing multiple records at one time is one of those features that many users wish existed long before they realize it has been there the whole time. Of course, the way we demonstrated in this exercise is subject to all the same caveats as regular list editing.

But it is also possible to edit multiple records using the form view instead by selecting multiple records in the list view and using the **Update Selected** option in the list context menu. This will allow you to edit multiple fields on multiple records with one update.

<figure>
  <img src="images/Multiple Record Editing Form View.png" />
  <figcaption>
    Multiple Record Editing Form View
  </figcaption>
</figure>

Both of these options make batch operations much more efficient.

[(Return to Step 4)][4]


[1]: #list-edit
[2]: #step-3
[3]: #multiple-record-editing
[4]: #step-4
