---
years: "2021"
date: 2021-08-08 17:01:00
lastMod: 2021-08-08 17:01:00
author: tltoulson
url: /notebook/gliderecord-patterns-batch-update
title: "GlideRecord: Batch Update (Imperative)"
socialImg: images/social.png
description: "How to write a GlideRecord loop to batch update Records in ServiceNow"
"notebook/tags": [GlideRecord, "Imperative Programming"]
---

**Purpose:** How to write a GlideRecord loop to batch update Records in ServiceNow

**Use:** Use this script in a Server Script

```js
// This example will loop through all incident records and add a comment
var tableName = 'incident';
var incident = new GlideRecord(tableName);

incident.query();
while (incident.next()) {
    incident.comments = 'This comment will be added';
    incident.update();
}
```