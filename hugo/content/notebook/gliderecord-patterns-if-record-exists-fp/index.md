---
years: "2021"
date: 2021-08-08 17:01:00
lastMod: 2021-08-08 17:01:00
author: tltoulson
url: /notebook/gliderecord-patterns-if-record-exists-fp
title: "GlideRecord: If Record Exists (Functional)"
socialImg: images/social.png
description: "How to execute code conditionally if a matching record exists in ServiceNow using a Functional Programming style"
"notebook/tags": [GlideRecord, "Functional Programming"]
---

**Purpose:** How to execute code conditionally if a matching record exists or is found in ServiceNow using a Functional Programming style

**Use:** Use this script in a Server Script

```js
/**
 * Handles conditional execution based on the existence of a user record
 * @param {Function} foundCallback - Function that is executed if the user record is found
 * @param {Function} notFoundCallback - Function that is executed if the user record is not found
 **/
function ifUserFound(foundCallback, notFoundCallback) {
    var tableName = 'sys_user';
    var user = new GlideRecord(tableName);
    user.addQuery('user_id', 'tltoulson');
    user.addQuery('active', true);
    user.setLimit(1); // Very important for performance since we only care about one record

    user.query();
    if (user.next()) {
        foundCallback(user);
    }
    else {
        notFoundCallback();
    }
}

/**
 * @param {GlideRecord} user - The user record that has been found
 **/
function userFound(user) { 
    // Code to execute if a matching record exists
}

function userNotFound() {
    // Code to execute if a matching record does not exist
}

// This example will execute different code depending on whether a User ID is active or not
ifUserFound(userFound, userNotFound);
```