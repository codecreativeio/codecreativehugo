---
years: "2021"
date: 2021-08-08 17:01:00
lastMod: 2021-08-10 17:01:00
author: tltoulson
url: /notebook/gliderecord-patterns-batch-update-fp
title: "GlideRecord: Batch Update (Functional)"
socialImg: images/social.png
description: "How to write a GlideRecord loop to batch update Records in ServiceNow using a Functional Programming style"
"notebook/tags": [GlideRecord, "Functional Programming"]
---

**Purpose:** How to write a GlideRecord loop to batch update Records in ServiceNow using a Functional Programming style

**Use:** Use this script in a Server Script. Typically this will be used in a Background Script, Scheduled Job, or Fix Script in order to execute a batch operation to fix records, particularly after a data import, system upgrade, or app upgrade. In the following example, a fix could be applied to every incident record and a comment added to annotate the fix.

```js
/**
 * Applies the callback function to each incident record 
 * in the query
 * @param {Function} callback - Callback function applied to each incident record
 **/
function forEachIncident(callback) {
    var tableName = 'incident';
    var incident = new GlideRecord(tableName);
    
    incident.query();
    while (incident.next()) {
        callback(incident); // Apply callback to the record
    }
}

/**
 * Adds comment to a single incident record
 * @param {GlideRecord} incident - An Incident GlideRecord instance
 **/
function addComment(incident) {
    incident.comments = 'This comment will be added';
    incident.update();
}

// This example will loop through all incident records and add a comment
forEachIncident(addComment);
```