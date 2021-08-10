---
years: "2021"
date: 2021-08-10 17:01:00
lastMod: 2021-08-10 17:01:00
author: tltoulson
url: /notebook/gliderecord-patterns-to-json-fp
title: "GlideRecord: Convert to JSON (Functional)"
socialImg: images/social.png
description: "How to convert a GlideRecord set to a Javascript Object or JSON Object using a Functional Programming style"
"notebook/tags": [GlideRecord, "Functional Programming"]
---

**Purpose:** How to write a GlideRecord loop to convert the GlideRecord to a Javascript Object or JSON Object using a Functional Programming style

**Use:** Use this script in a Server Script.  Typically this will be used in Scripted REST Endpoint, Service Portal Widget's Server Script, or GlideAjax Script Include.  Depending on the specific place used, conversion from a Javascript Object to a JSON string may be automatic. 

This technique can output either an array or an object / map depending on the intended goal. An array is useful when maintaining sort order from GlideRecord is important without additional processing. An object is useful when quick lookups by sys_id or other key is important.

## Array of Records

```js
/**
 * Applies the callback function to each incident record 
 * in the query
 * @param {Function} callback - Callback function applied to each incident record
 **/
function forEachIncident(callback) {
    var tableName = 'incident';
    var incident = new GlideRecord(tableName);
    incident.setLimit(10);
    
    incident.query();
    while (incident.next()) {
        callback(incident); // Apply callback to the record
    }
}

/**
 * ArrayOutputBuilder exposes an interface
 * to compensate for Javascripts lack of
 * method overloading. Uses a closure to 
 * hold the array under construction
 * @returns {Object} - Public interface
 **/
function ArrayOutputBuilder(fieldNames) {
    var array = [];

    /**
     *  Returns the completely built output
     * @returns {Array} - Final built array of record objects
     **/ 
    function getOutput() {
        return array;
    }

    /**
     * Adds a record to the output
     * @param {GlideRecord} record - GlideRecord to convert to JSON compatible object
     **/
    function addToOutput(record) {
        var jsRecord = {};

        // For each field name,
        // add field to the object
        fieldNames.forEach(function(fieldName) {
            jsRecord[fieldName] = {
                'value': record.getValue(fieldName),
                'displayValue': record.getDisplayValue(fieldName)
            };
        });

        array.push(jsRecord);
    }

    return {
        'getOutput': getOutput,
        'addToOutput': addToOutput
    };
}

// This example will build an array of incidents
// An array is useful for maintaining Sort order
// But struggles with by key lookups
var output = ArrayOutputBuilder(['sys_id','number','short_description']);
forEachIncident(output.addToOutput);

// Service Portal example use case
data.incidents = output.getOutput();
```

## Map of Records

```js
/**
 * Applies the callback function to each incident record 
 * in the query
 * @param {Function} callback - Callback function applied to each incident record
 **/
function forEachIncident(callback) {
    var tableName = 'incident';
    var incident = new GlideRecord(tableName);
    incident.setLimit(10);
    
    incident.query();
    while (incident.next()) {
        callback(incident); // Apply callback to the record
    }
}

/**
 * ObjectOutputBuilder exposes an interface
 * to compensate for Javascripts lack of
 * method overloading.
 * @returns {Object} - Object exposes the interface
 **/
function ObjectOutputBuilder(fieldNames) {
    var object = {};

    /**
     *  Returns the completely built output
     * @returns {Object} - Final built object / map of record objects
     **/ 
    function getOutput() {
        return object;
    }

    /**
     * Adds a record to the output
     * @param {GlideRecord} record - GlideRecord to convert to JSON compatible object
     **/
    function addToOutput(record) {
        var jsRecord = {};

        // For each field name,
        // add field to the object
        fieldNames.forEach(function(fieldName) {
            jsRecord[fieldName] = {
                'value': record.getValue(fieldName),
                'displayValue': record.getDisplayValue(fieldName)
            };
        });

        object[record.sys_id.toString()] = jsRecord;
    }

    return {
        'getOutput': getOutput,
        'addToOutput': addToOutput
    };
}

// This example will build an array of incidents
// An array is useful for maintaining Sort order
// But struggles with by key lookups
var output = ObjectOutputBuilder(['sys_id','number','short_description']);
forEachIncident(output.addToOutput);

// Service Portal example use case
data.incidents = output.getOutput();
```