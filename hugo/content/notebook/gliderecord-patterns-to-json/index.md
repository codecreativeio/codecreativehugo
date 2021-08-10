---
years: "2021"
date: 2021-08-10 17:01:00
lastMod: 2021-08-10 17:01:00
author: tltoulson
url: /notebook/gliderecord-patterns-to-json
title: "GlideRecord: Convert to JSON (Imperative)"
socialImg: images/social.png
description: "How to convert a GlideRecord set to a Javascript Object or JSON Object"
"notebook/tags": [GlideRecord, "Imperative Programming"]
---

**Purpose:** How to convert a GlideRecord set to a Javascript Object or JSON Object

**Use:** Use this script in a Server Script.  Typically this will be used in Scripted REST Endpoint, Service Portal Widget's Server Script, or GlideAjax Script Include.  Depending on the specific place used, conversion from a Javascript Object to a JSON string may be automatic. 

This technique can output either an array or an object / map depending on the intended goal. An array is useful when maintaining sort order from GlideRecord is important without additional processing. An object is useful when quick lookups by sys_id or other key is important.

## Array of Records

```js
// This example will build an array of incidents
// An array is useful for maintaining Sort order
// But struggles with by key lookups
function getIncidents() {
    var output = [];
    var tableName = 'incident';
    var incident = new GlideRecord(tableName);
    incident.setLimit(10);

    incident.query();
    while (incident.next()) {
        output.push({
            'sys_id': { 
                'value': incident.getValue('sys_id'), 
                'displayValue': incident.getDisplayValue('sys_id') 
            },
            'number': {
                'value': incident.getValue('number'), 
                'displayValue': incident.getDisplayValue('number') 
            },
            'short_description': {
                'value': incident.getValue('short_description'), 
                'displayValue': incident.getDisplayValue('short_description') 
            }
        });
    }
}

// Service Portal example use case
data.incidents = getIncidents();
```

## Map of Records

```js
// This example will build an array of incidents
// An array is useful for fast key lookups
// But needs additional processing to maintain sort order
function getIncidents() {
    var output = {};
    var tableName = 'incident';
    var incident = new GlideRecord(tableName);
    incident.setLimit(10);

    incident.query();
    while (incident.next()) {
        output[incident.getValue('sys_id')] = {
            'sys_id': { 
                'value': incident.getValue('sys_id'), 
                'displayValue': incident.getDisplayValue('sys_id') 
            },
            'number': {
                'value': incident.getValue('number'), 
                'displayValue': incident.getDisplayValue('number') 
            },
            'short_description': {
                'value': incident.getValue('short_description'), 
                'displayValue': incident.getDisplayValue('short_description') 
            }
        };
    }
}

// Service Portal example use case
data.incidents = getIncidents();
```