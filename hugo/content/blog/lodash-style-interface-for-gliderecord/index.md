---
years: "2017"
date: 2017-08-16 19:56:57
author: tltoulson
aliases:
  - /servicenow/lodash-style-interface-for-gliderecord
url: /blog/lodash-style-interface-for-gliderecord
title: Lodash style interface for GlideRecord
socialImg: images/social.png
description: Introducing Glider.js, a lodash style interface for GlideRecord (and yes it works with Arrays as well). Currently in early development. Checkout the Git Repo.
---

Wow, I really left things hanging after the Interface Design Patterns post. The good news is that [MapAnything's next release][1] will be amazing! And of course, I will circle back to interface design patterns. But for today, I want to take a look at the start of a library that has been a long time coming.

I love the [lodash][2] library. It's great for working with arrays in a simplified manner. This unfortunately does nothing for me server side with GlideRecord. For a couple years now I have been secretly obsessed with improving GlideRecord if for no other reason than to clear out the boilerplate. I've tried a few different approaches to varying degrees of success but I finally have an approach inspired by [lazy.js][3] (which itself is inspired by lodash and underscore) that is both flexible and powerful. Today I am releasing the early prototype on [GitHub][4] so please, provide feedback!

## Introducing Glider.js

[Glider.js][5] provides an interface similar to lodash and underscore but it is specifically designed to work with GlideRecords first. It's still in the early phase of development, so expect issues and missing features for now. At this point I have some core functionality already in place, so lets take a look:

### Iterate Values

The simplest use case is iterating values as in a vanilla GlideRecord while loop.

```js
Glider('incident', 'active=true')
    .forEach(function(gr) {
        gs.print(gr.short_description);
    });
```

### Map Over Values

Map allows you to transform the GlideRecord into a sequence of objects or other data types.

```js
Glider('incident', 'active=true')
  .map(function(gr) {
    return {
      'short_description': gr.short_description + ''
    };
  })
  .value();
```

### Filter Values

Filter allows you to easily filter out records, such as with canRead. This is a real life saver when performing advanced processing on GlideRecords. Usually I would solve this problem with a **continue** statement, **if** block, or using a **try / catch / throw**. From experience I can tell you, this is a way better approach.

```js
Glider('incident', 'active=true')
  .filter(function(gr) { return gr.canRead(); })
  .map(function(gr) {
    return {
      'short_description': gr.short_description + ''
    };
  })
  .value();
```

### Chunk a GlideRecord for Batch Operations

This allows you to operate on large data sets, one chunk at a time while still only using one database query. Very useful if performing batch operations on a web service where message size is sensitive.

```js
Glider('incident', 'active=true')
    .chunk(5)
    .forEach(function(chunkItems) {
        // before process chunk
        chunkItems.forEach(function(item) {
            // Process chunk items
        });
        // after process chunk
    });
```

### Reduce GlideRecords to a Single Value

```js
// Totals the cost of all CI's
Glider('cmdb_ci', 'active=true')
    .reduce(function(accum, gr) {
        return accum + (gr.cost * 1);
    }, 0).toFixed(2);
```

### And yes... it works with arrays too

Within scoped applications, many of the newer ECMAScript goodies like Array.prototype.forEach choke because the function is in a different scope than the callback. Glider uses its own internal iterator pattern, so everything exists within your scoped application.

```js
Glider([1,2,3,4,5])
    .forEach(function(el) {
        gs.print(el);
    });
```

## Conclusion

So that is the quick and dirty on this library. The best part is that it is built on ServiceNow, for ServiceNow. No crazy porting hacks to get it to work. So let me know what you think!

[1]: http://mapanything.com/resources/blog/tap-new-productivity-levels-inside-view-introducing-indoor-mapping-servicenow-users
[2]: https://lodash.com
[3]: http://danieltao.com/lazy.js/
[4]: https://github.com/tltoulson/Glider.js
[5]: https://github.com/tltoulson/Glider.js
