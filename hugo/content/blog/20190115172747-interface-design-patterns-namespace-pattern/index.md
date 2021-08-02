---
years: "2019"
date: 2019-01-15 18:51:14
author: tltoulson
url: /blog/interface-design-patterns-namespace-pattern
title: "Interface Design Patterns: Namespace Pattern"
socialImg: images/social.png
description: The namespace pattern provides a simple mechanism for organizing reusable functions and objects. Personally, this is my preferred pattern for swiss army knife type Util libraries.
---

[Back to Interface Design Patterns for Script Includes][1]

## Introduction

The namespace pattern provides a simple mechanism for organizing reusable functions and objects. One of the challenging aspects of using alternative Script Include patterns is that they become harder to identify when used. For example, if I use the [Function Pattern][2] in a Business Rule it may be challenging for other developers to quickly identify that getMyTeamMembers() refers to a Script Include instead of a function defined in the script or a Global Business Rule. Using the Namespace Pattern can help clarify since the syntax more closely resembles the traditional [Class Pattern][3].

Personally, this is my preferred pattern for those UserUtils, TaskUtils, and other swiss army knife type libraries.

## Problem Definition

The development team has identified several duplicated segments of code in the ServiceNow instance related to getting information about the current user. In order to reduce duplication and improve maintainability, the team would like to create a utility library to consolidate the repeated code.

## Example Solution

For this solution, we will create a simple utility Script Include that allows us to obtain data related to the Currently Logged In User:

### Script Include: getMyTeamMembers

```js
var CurrentUser = {
  getSubscribedProducts: function() {
    // call GlideRecord to get products the user is subscribed to
  },

  getTeamMembers: function() {
    // call GlideRecord to get a list of sys_user records in the same groups
  },

  getManagedTeamMembers: function() {
    // call GlideRecord to get a list of sys_user records the current user manages
  },

  getRecord: function() {
    // return sys_user record for currently logged in user
  }
}
```

Now we can easily call any of these functions with a clear namespace as follows:

```js
CurrentUser.getSubscribedProducts();
CurrentUser.getTeamMembers();
CurrentUser.getManagedTeamMembers();
CurrentUser.getRecord();
```

## Advantages

1. The pattern removes a potentially confusing no-op / empty initialize pattern that frequently shows up in the [Class Pattern][3]
2. More clearly communicates the loose relationship between the functions
3. Evolves quickly and easily to future requirements as long as the relationship between the functions remains loose and state data is not stored on the object  itself.
4. More clearly communicates that the called script is a Script Include than the [Function Pattern][2]

## Disadvantages

1. This pattern can be a signal that the data design is not well understood particularly if the team is using an Object Oriented paradigm.
2. Utility scripts have a tendency to bloat over time as more functions and subtle variations of functions get added.
3. Implemented improperly, this pattern can result in a tangled mess of interconnected functions and tangled state data. Keep functions simple, single purpose, and with all necessary data passed in the signature to mitigate this issue.


[1]: /blog/interface-design-patterns-for-script-includes
[2]: /blog/interface-design-patterns-function-pattern
[3]: /blog/interface-design-patterns-class-pattern
