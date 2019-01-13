---
years: "2017"
date: 2017-06-01 02:51:00
author: tltoulson
aliases:
  - /servicenow/interface-design-patterns-for-script-includes
url: /blog/interface-design-patterns-for-script-includes
title: Interface Design Patterns for Script Includes
socialImg: images/social.png
description: Each time we type the name of our Script Include, we are presented with a default template and for the most part, most of us accept this pattern and attempt to work within it. But this default pattern is just one of at least 5 possible interface design patterns that we can use when writing our Script Includes.
---

<blockquote>
  Almost two thirds of the customer service agents used the default browser, never questioning whether a better one was available
  <footer>
    The Originals by Adam Grant (2016)
  </footer>
</blockquote>

It should go on record that I, sometimes irrationally and against my better judgement, question all conventions, policies, and established ways of doing things. In fact, when I read the above from *The Originals* a couple months ago, I responded by underlining the quote and hastily scribbling around the passage "Arg! Why! Why! Why! For God's sake question everything." This should probably exist as a permanent disclaimer on top of all my articles.

And yet, it's with this same spirit of joyful disruption that I tackle the established conventions of the Script Include. Each time we type the name of our Script Include, we are presented with a default template and for the most part, most of us accept this pattern and attempt to work within it.

But this default Class Pattern is just one of at least 5 possible interface design patterns that we can use when writing our Script Includes. Let's take a quick look at these design patterns:

## 1. Class Pattern

### Script Include

```js
var ClassPattern = Class.create();

ClassPattern.prototype = {
   initialize : function() {
   },

   myFunction : function() {
      //Put function code here
   },

   _privateFunction: function() {
       //Put private function code here
   },

   type : 'ClassPattern'
};
```

### How to Use It

```js
var c = new ClassPattern();
c.myFunction();
```

### Description

I've already mentioned the Class Pattern as the default Script Include pattern that we all know and love. The distinctive characteristic is that it uses an approach akin to [Object Oriented][1] programming paradigm. There is support for inheriting classes, a constructor function, an expectation to use Javascript's **new** operator to instantiate, and an object type all built in.

This pattern is most effective when class inheritance is needed or you are working with GlideAjax. The Class Pattern makes inheritance easy with the extendsObject prototype constructor. All GlideAjax scripts, for example, use the extendsObject in order to inherit the behaviors of the AbstractAjaxProcessor base class. The Class Pattern is the only way to achieve inheritance.

This pattern, at best, becomes unnecessary if we aren't leveraging inheritance. Worse, we also don't have true encapsulation which means we have to trust other developers to leave private functions and properties alone. Just ask ServiceNow how well "Don't use package calls" worked. Lastly, the Class Pattern's use of the **this** and **new** keywords can lead to issues in some scripts and also can make refactoring a pain. Simply stated, there are better patterns for most of the non-GlideAjax scripts that we write.

### Examples

Ummm... basically every Script Include you've ever seen. It's the default.

[Read More about the Class Pattern][2]

## 2. Function Pattern

### Script Include

```js
// FunctionPattern
var doSomething = function() {
  // Put function code here
}
```

### How to Use It

```js
doSomething(); // Yep, that easy
```

### Description

It seems somewhat silly, but yes, a Script Include can be as simple as a single function. The Function Pattern opens up both [Procedural][3] and [Functional][4] programming paradigms within Script Includes. This function could be a simple procedural execution or a more complex [higher order function][5]. In truth, you can still use an Object Oriented style by making the function a constructor function. The power in this pattern is the simplicity and flexibility. There is very little you can't accomplish with a vanilla JS function.

The main drawback of a single function is that you could end up with a whole lot of related function Script Includes running around and it isn't very easy to organize your Script Includes in ServiceNow.

### Example

* **CodeSearch:** The CodeSearch Script Include for the Code Search application is implemented as a simple constructor function which returns an object as the public interface.
* **FileTypeWorkflowHandler:** The FileTypeWorkflowHandler Script Include for the Studio application is a constructor function that returns an object as the public interface.

[Read More about the Function Pattern][6]

## 3. Namespace Pattern

### Script Include

```js
var NamespacePattern = {
    doSomething: function() {
        // Put function code here
    },

    doSomethingElse: function() {
        // Put other function code here
    }
};
```

### How to Use It

```js
NamespacePattern.doSomething();
NamespacePattern.doSomethingElse();
```

### Description

One way we can solve the short comings of organizing the Function Pattern is to arrange common functions into namespaces using the Namespace Pattern. At first glance, it seems similar to the Class Pattern but closer inspection will reveal the absence of **Class.create**, **this**, and **new**. Rather than an object with contained data, we are simply listing modular functions under a single namespace.

This is a much more appropriate way of dealing with most Utility Classes.

### Examples

* **AppExplorerStructure:** Studio's Application Explorer uses a Script Include written under the AppExplorerStructure namespace.
* **AppFileTypeRegistry:** The AppFileTypeRegistry namespace is used within the Studio application to create Registry entries
* **CacheBuster:** The CacheBuster namespace is used within both Studio and CodeSearch applications to add cache HTTP headers.

## 4. Global Include Pattern

### Script Include

```js
// GlobalIncludePattern
var doSomething = function() {
  // Put function code here
}

var doSomethingElse = function() {
  // Put another function code here
}
```

### How to Use It

```js
gs.include('GlobalIncludePattern');
doSomething();
doSomethingElse();
```

### Description

The Global Include Pattern can also organize multiple functions (without a namespace) but it is capable of much more. The Global Include Pattern uses **gs.include** in order to read a Script include as a module into the current script. This allows monkey patching (extending or modifying existing classes or objects), easily (sometimes) including external libraries as a Script Include, or just a simple execution of a procedural script.

### Examples

* I am not aware of any current production examples of this pattern.

## 5. Module Pattern (Revealing Module Pattern)

### Script Include

```js
var ModulePattern = (function() {
    var privateVariable;

    function myFunction() {
        // Put function code here
    }

    function privateFunction() {
        // Put private function code here
    }

    return {
        'myFunction': myFunction
    }
})();
```

### How to Use It

```js
ModulePattern.myFunction();
```

### Description

Now we come to my favorite pattern, the Module Pattern and the Revealing Module Pattern variation. The Revealing Module Pattern is a special case of the Module Pattern where the return value of the Module function follows the Namespace Pattern (see above example). Both patterns are similar to the Function Pattern except that they use an Immediately-Invoked Function Expression (IIFE) instead of a function declaration. While we can technically achieve the same results with the Function Pattern used as a constructor (see most production examples of the Function Pattern as evidence of this), the Module Patterns are worth calling out as a special case due to the advantages of the special case:

First, our How to Use It code is as succinct as the Namespace Pattern. It bears similar Object Oriented capabilities as the Class Pattern but possesses true private variables and functions. It also maintains the full capabilities of the Function Pattern and all functional programming capabilities. It can be used with the Global Include Pattern to prevent global namespace pollution. Basically by leveraging the Module Pattern we can essentially combine the best of all patterns in whatever combination we need while still minimizing the consumer script's boilerplate code.

### Examples

* **DelegatedDevUserPermissions:** Used by Delegated Development to determine user permissions
* Nearly every Script Include written for the Studio application:
    * AppVersion
    * FileTypeACLHandler
    * FileTypeFileBuilder
    * FileTypeInfo
    * etc

## Final Thoughts

Hopefully, I've demonstrated that there is more than one way to skin a Script Include. In future articles, we will explore these interface design patterns, their strengths, and their weaknesses in hopes of understanding when best to apply these patterns. We will also begin looking at other design patterns and how to apply them to custom application development on the ServiceNow platform.

[1]: https://en.wikipedia.org/wiki/Object-oriented_programming
[2]: /blog/interface-design-patterns-class-pattern
[3]: https://en.wikipedia.org/wiki/Procedural_programming
[4]: https://en.wikipedia.org/wiki/Functional_programming
[5]: https://en.wikipedia.org/wiki/Higher-order_function
[6]: /blog/interface-design-patterns-function-pattern
