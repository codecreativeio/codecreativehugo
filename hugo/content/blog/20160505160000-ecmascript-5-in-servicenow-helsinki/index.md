---
years: "2016"
date: 2016-05-05 16:00:00
author: tltoulson
aliases:
  - /servicenow/ecmascript-5-in-servicenow-helsinki
url: /blog/ecmascript-5-in-servicenow-helsinki
title: ECMAScript 5 in ServiceNow Helsinki!
description: Ok, so it may not be official yet and I know this is a weird thing to get worked up about. Besides, ECMAScript 5 is so 2011, you say. Weren’t we still talking about DVD’s in 2011? Shouldn’t we be talking about ES 6 / ECMAScript 2015?
---

<figure>
  <img src="images/ecma-script-5-servicenow.png" />
  <figcaption>
    Knowledge 16 ECMAScript Session
  </figcaption>
</figure>

Ok, so it may not be [official][1] yet and I know this is a weird thing to get worked up about. Besides, ECMAScript 5 is so 2011, you say. Weren’t we still talking about [DVD’s][2] in 2011? Shouldn’t we be talking about ES 6 / ECMAScript 2015? Aren’t we already using [polyfills][3] for that?

I hear you. I’m with you. But let’s not forget that a lot of code runs on top of ServiceNow’s modified [Rhino][4] engine, including yours and mine. So it is nice to know they are not so cavalier as to go all [History of the World Part 1 critic][5] with all our hard work.

So while we may lament the lack of true [block scopes][6], [string interpolation][7], and [rest parameters][8] (I know you’re all just heartbroken), let’s take a look at what javascript upgrades we ***might*** have to look forward to with the release of Helsinki:

## New Array Manipulation Functions

If you are like me, you use the tools that are right in front of you. And if thats the case, your code probably looks like this anytime you are working with an array:

```js
for (var i = 0; arr.length; i++) {
  // Do something with the array value arr[i]
}
```

But this doesn’t tell you a whole lot about the intent of the manipulation. Are you looking for a value, doing something to each value, reducing the array to a value? Who cares, just iterate it! Well here are some functions you may be familiar with in the browser that could show up server side:

* [Array.isArray()][9]
* [Array.prototype.every()][10]
* [Array.prototype.filter()][11]
* [Array.prototype.forEach()][12]
* [Array.prototype.indexOf()][13]
* [Array.prototype.lastIndexOf()][14]
* [Array.prototype.map()][15]
* [Array.prototype.reduce()][16]
* [Array.prototype.some()][17]

But let’s face it, the best part is indexOf for all those GlideLists:

```js
var list = current.watch_list.toString().split(',');
if (list.indexOf('Mr. Important') != 0) {
  current.comments = 'Something intelligent so it looks like we\'re working on this right away.';
}
```

## Native JSON

So, I am just going to say it. This was an annoying way to convert javascript objects to JSON strings and back:

```js
var json = new JSON().encode(someObject);
var obj = new JSON().decode(json);
```

You are probably familiar with this if you do a lot of processor or GlideAjax work. In a recent release, JSON.parse and JSON.stringify were added as class functions. But if you have started using [scoped apps][18], then you know that this hateful incantation is still just as frustrating:

```js
var json = global.JSON.parse(someObject);
var obj = global.JSON.stringify(json);
```

Now is this a particularly big deal. Perhaps not. But if you spend any significant amount of time in the browser, old habits die hard. But won’t it be nice if and when we can just use the native variation:

```js
var json = JSON.stringify(someObject);
var obj = JSON.parse(json);
```

## Javascript Properties

This might be the most exciting part of all of this. With any luck, we will see javascript property getters and setters brought to ServiceNow. If you aren’t familiar, getters and setters allow you to add logic when working with object properties directly. So instead of this:

```js
var obj = {
  _a: 1,
  setA: function(val) { this._a = val + 1 },
  getA: function() { return 'Value is: ' + this._a }
};
obj.getA(); // get, a = 'Value is: 1'
obj.setA(1); // set obj._a = 2
```

You can end up with this:

```js
var obj = {
  _a: 1,
  set a(val) { this._a = val + 1 },
  get a() { return 'Value is: ' + this._a }
};
obj.a; // get, a = 'Value is: 1'
obj.a = 1; // set obj._a = 2
```

This will likely be most useful in Scoped Apps and Script Includes for adding and changing logic with get and set without changing the contract of the Script Include. If you are already using functions like in the first example, you might not be so impressed. But hey, its another tool in the kit.

Hopefully we will see most of these additions in Helsinki. If nothing else, it will be nice to have some compatibility between my client side scripts and server side scripts. At least until ES6 is mainstream, anyway.

[1]: https://community.servicenow.com/message/894008#894008
[2]: http://www.wired.com/2011/07/netflix-fees-increase-dvd/
[3]: https://community.servicenow.com/groups/servicenow-user-group-us-tx-north-texas/blog/2015/10/13/mini-lab-extending-servicenow-javascript-using-ecmascript-6-polyfills
[4]: https://en.wikipedia.org/wiki/Rhino_%28JavaScript_engine%29
[5]: http://www.youtube.com/watch?v=F4lUcjUv37A&t=0m51s
[6]: http://es6-features.org/#BlockScopedVariables
[7]: http://es6-features.org/#StringInterpolation
[8]: http://es6-features.org/#RestParameter
[9]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray
[10]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every
[11]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
[12]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
[13]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf
[14]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/lastIndexOf
[15]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
[16]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
[17]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some
[18]: http://wiki.servicenow.com/index.php?title=Scoped_System_API#gsc.tab=0
