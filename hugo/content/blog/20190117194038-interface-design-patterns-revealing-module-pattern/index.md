---
years: "2019"
date: 2019-01-17 19:40:38
author: tltoulson
url: /blog/interface-design-patterns-revealing-module-pattern
title: "Interface Design Patterns: Revealing Module Pattern"
socialImg: images/social.png
description: The Revealing Module pattern can easily imitate either the Class Pattern or the Namespace Pattern with the added advantage of private state and private functions.
---

[Back to Interface Design Patterns for Script Includes][1]

## Introduction

The Revealing Module pattern can easily imitate either the [Class Pattern][2] or the [Namespace Pattern][3] with the added advantage of private state and private functions. This is most helpful in Scoped Applications where the app developer may prefer to keep implementation details hidden while exposing clear public interfaces. But it can also be used to help maintain clear API boundaries over time where traditional Javascript classes and objects would tend towards bloat.

To be clear, I am taking a loose definition of the Javascript module patterns in that I do not consider an Immediately-Invoked Function Expression (IIFE) to be necessary to call it a module. With that, let's take a look at a scenario:

## Problem Definition

The app development team has created an integration Scoped App that allows ServiceNow to integrate multiple file storage repositories (Attachments, DropBox, Sharepoint, etc) into a single repository. The underlying implementation is somewhat complex involving a local file cache, web services, and rules to determine which file store is used for different processes.

The team is concerned about granting direct table access to users since at best some data will make no sense to the user and at worst, random table edits could corrupt the application data. To remedy this, the team has locked all tables within the scope to only allow access via a Script Include API.

## Example Solution

For this solution, we will create a Script Include which can be accessed by all Scopes but is ultimately Protected to mask the source code when purchased from the store.

### Script Include: Revealing Module Pattern

  ```js
  var FileStore = (function() {
  	function _getFromCache(filename) {
      // internal function to attempt a retrieval from cache table
    }

    function _saveToCache(filename, base64) {
      // internal function to store a file in the local cache
    }

    function _getFromWebService(filename) {
      // internal function to get a file from web service
    }

    function _saveToWebService(filename, base64) {
      // internal function to save file to web service
    }

    function _saveLocalFileMetaData(filename, filemeta) {
      // internal function to store web service retrieval location, correlation id's etc
    }

    function getFile(filename) {
      var file = _getFromCache(filename);

      if (!file) {
        file = _getFromWebService(filename);
        _saveToCache(filename, file);
      }

      return file;
    }

    function saveFile(filename, base64) {
      var meta = _saveToWebService(filename, base64);
      _saveLocalFileMetaData(filename, meta);
    }

    return {
      'getFile': getFile,
      'saveFile': saveFile
    };
  })();
  ```

The core aspect of the Revealing Module Pattern is the use of a closure which returns the public interface for the API. In our example, the public interface includes both the getFile and saveFile functions. But under the hood, you can see many internal functions which are not accessible to the outside world. In fact, the outside world doesn't even know they exist. The Class Pattern and Namespace Pattern have no similar capability, all functions and properties are considered public.

In the above implementation, we used the IIFE to yield a Namespace Pattern like interface which can be called as follows:

```js
FileStore.getFile('filename');
FileStore.saveFile('filename', 'Base64 encoded string representing the file data');
```

We can also imitate the Function Pattern and Class Pattern by using a Constructor Function instead of the IIFE:

### Script Include: Constructor Function Approach

```js
var FileStore = function(filename) {
  function _getFromCache() {
    // internal function to attempt a retrieval from cache table
  }

  function _saveToCache(base64) {
    // internal function to store a file in the local cache
  }

  function _getFromWebService() {
    // internal function to get a file from web service
  }

  function _saveToWebService(base64) {
    // internal function to save file to web service
  }

  function _saveLocalFileMetaData(filemeta) {
    // internal function to store web service retrieval location, correlation id's etc
  }

  function getFile() {
    var file = _getFromCache();

    if (!file) {
      file = _getFromWebService();
      _saveToCache(file);
    }

    return file;
  }

  function saveFile(base64) {
    var meta = _saveToWebService(base64);
    _saveLocalFileMetaData(meta);
  }

  return {
    'getFile': getFile,
    'saveFile': saveFile
  };
}
```

The Constructor Function allows us to pass parameters that are accessible to all functions within the closure. Similarly, functions can also share internal variables defined within the closure. Once again, the Class Pattern has no similar ability to maintain internal, private state: all state is completely public.

Here is how this this variation is used:

```js
var fs = FileStore('filename');
fs.getFile();
fs.saveFile('Base64 encoded string representing the file data');

// OR, use the new keyword which opens up the ability to use public state variables by using the 'this' keyword in the closure
var fs = new FileStore('filename');
fs.getFile();
fs.saveFile('Base64 encoded string representing the file data');
```  

## Advantages

1. Most similar to the traditional Class Pattern
2. Allows for private functions and private state variables
3. Can allow hiding complex behavior or intellectual property in Scoped Apps
4. Clarifies the intent of the API by explicitly defining the public interface
5. Can be repurposed to return any of the previously mentioned Patterns yielding the advantages of other patterns while mitigating the disadvantages.

## Disadvantages

1. Technically, it executes slower than the traditional Class Pattern (the difference is negligible unless you are operating at a scale where every ms counts)
2. Closures are often considered a complex subject in Javascript and may be difficult to understand for beginner developers.


[1]: /blog/interface-design-patterns-for-script-includes
[2]: /blog/interface-design-patterns-class-pattern
[3]: /blog/interface-design-patterns-namespace-pattern
