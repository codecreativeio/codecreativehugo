---
years: "2019"
date: 2019-01-15 19:23:43
author: tltoulson
url: /blog/interface-design-patterns-global-include-pattern
title: "Interface Design Patterns: Global Include Pattern"
socialImg: images/social.png
description: The Global Include pattern is simply a way of running a script file held in a Script Include. It is an odd, powerful, and potentially dangerous tool that allows for many different purposes such as monkey patching.
---

[Back to Interface Design Patterns for Script Includes][1]

## Introduction

The Global Include pattern is simply a way of running a script file held in a Script Include. It is an odd, powerful, and potentially **dangerous** tool that allows for many different purposes from leveraging external javascript libraries to importing a collection of functions into the global scope, to monkey patching.

One of the most useful purposes is monkey patching which allows us to modify behaviors of existing Script Includes and even ServiceNow provided classes. One example is provided by the esteemed Steve Bell in [Mini-Lab Extending the GlideRecord Object][2].

But there is one other **big** use case: cross-cutting concerns such as logging (and other Aspect-Oriented Programming topics).

## Problem Definition

The development team needs to add logging to various Script Includes, in particular their KBArticles script. The team is concerned that adding this logging will negatively impact readability of the core logic and would prefer to separate the logging from the core script as much as possible. Ideally, this logging can be turned on and off.

**Warning!!!!  Do not try this with out of box objects such as GlideRecord. Your instance will likely break, requiring a restart**

## Example Solution

For this solution, we will need a few things:

1. A Global Include Patterned Script Include that injects logging
2. A KBArticles Script Include into which logging is injected
3. A Background Script to demonstrate logging turned on
4. A Background Script to demonstrate logging turned off

### Script Include: Global Include Pattern

  ```js
  function wrapWithLogging(fn, name) {
  	return function() {
  		gs.log('Call ' + name);
  		fn.apply(this, arguments);
  		gs.log('End ' + name);
  	};
  }

  KBArticles.prototype.publish = wrapWithLogging(KBArticles.prototype.publish, 'publish');
  KBArticles.prototype.retire = wrapWithLogging(KBArticles.prototype.retire, 'retire');
  ```

Wait, where's the class?  Where are the functions?  The Global Include Pattern doesn't have to contain anything we are accustomed to seeing. It can be a plain ol script executed from start to finish. In this case, we are using a Javascript closure (wrapWithLogging and its inner function) to wrap the behavior of the KBArticles.publish and KBArticles.retire functions.

But how does this behavior get injected?  Let's take a look at KBArticles:

### Script Include: KBArticles

```js
var KBArticles = Class.create();
KBArticles.prototype = {
    initialize: function(logOutput) {
		if (logOutput) {
			gs.include('KBArticlesLog');
		}
    },

	publish: function(kb) {
		gs.print('Publish the Article!');
	},

	retire: function(kb) {
		gs.print('Retire the Article :(');
	},

    type: 'KBArticles'
};
```

The KBArticles Script Include is a fairly straight forward [Class Pattern][3] with a publish and retire function. If you pay close attention to the initialize function, it will execute our Global Include via gs.include if logOutput is passed as true to the constructor.

This means we can easily add quite a bit of logging, including logging function arguments, to KBArticles with only a couple lines of code in the initialize function. Perfectly readable and completely instrumented!

Let's run a couple background scripts to see how it works:

### Background Script 1: Logging Off

```js
var kb = new KBArticles();
kb.publish();
kb.retire();

/*
Result:
*** Script: Publish the Article!
*** Script: Retire the Article :(
*/
```

With logging turned off (no paramters or false parameter passed to the constructor), we only get the output of the publish and retire functions. None of the instrumented logging shows up.

### Background Script 2: Logging On

```js
var kb = new KBArticles(true);
kb.publish();
kb.retire();

/*
Result:
*** Script: Call publish
*** Script: Publish the Article!
*** Script: End publish
*** Script: Call retire
*** Script: Retire the Article :(
*** Script: End retire
*/
```

With logging turned on, we get the fully enhanced behavior as injected by the KBArticlesLog Global Include. Now imagine the on/off switch being powered by a System Property.

This is just the tip of the iceberg for what this pattern can accomplish. Consider any number of the following cross-cutting behaviors:
  1. Logging
  2. Capturing Metrics and Statistics
  3. Adding additional functions to an object (Plugin / Mixin)
  4. Polyfill (Get those ES6 functions before ServiceNow adds ES6 support)
  5. Stopwatch / Performance Management
  6. As a general purpose Decorator Pattern

## Advantages

1. Requires an explicit import which none of the other patterns require
2. Allows injection of behavior into other scripts without interfering with the readability of the core logic
3. Very flexible pattern that can have many potential uses
4. Can help keep other scripts shorter and more readable  

## Disadvantages

1. Isn't clear about what is being imported (everything is imported into the global object)
2. When used on Objects that live across multiple transactions (such as GlideRecord and other ServiceNow Java Classes), the short lived nature of Script Includes can cause errors that can only be fixed by restarting the server
3. Overuse can cause code to be scattered and developer intent to be unclear
4. Most uses can be replaced by Object Oriented patterns and Functional Patterns such as the Decorator Pattern, Chain of Responsibility, and basic Composition.


[1]: /blog/interface-design-patterns-for-script-includes
[2]: https://community.servicenow.com/community?id=community_blog&sys_id=b96c2ea1dbd0dbc01dcaf3231f9619b9
[3]: /blog/interface-design-patterns-class-pattern
