---
years: "2021"
date: 2021-08-08 17:01:00
lastMod: 2021-08-10 17:01:00
author: tltoulson
url: /notebook/gliderecord-patterns-if-record-exists
title: "GlideRecord: If Record Exists (Imperative)"
socialImg: images/social.png
description: "How to execute code conditionally if a matching record exists in ServiceNow"
"notebook/tags": [GlideRecord, "Imperative Programming"]
---

**Purpose:** How to execute code conditionally if a matching record exists in ServiceNow

**Use:** Use this script in a Server Script to test if a record exists before deciding how the code should continue. This allows handling error cases when a record doesn't exist, creation of expected records, or an alternate handling path depending on whether the record exists or not. The call to `setLimit` is extremely important to maintaining the best performance by telling the database to stop searching after finding one matching record.

```js
// This example will execute different code depending on whether a User ID is active or not
var tableName = 'sys_user';
var user = new GlideRecord(tableName);
user.addQuery('user_id', 'tltoulson');
user.addQuery('active', true);
user.setLimit(1); // Very important for performance since we only care about one record

user.query();
if (user.next()) {
    // Code to execute if a matching record exists
}
else {
    // Code to execute if a matching record does not exist
}
```