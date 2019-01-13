---
years: "2017"
date: 2017-04-26 23:51:00
author: tltoulson
aliases:
  - /servicenow/eliminate-unnecessary-queries-with-this-simple-check
url: /blog/eliminate-unnecessary-queries-with-this-simple-check
title: Eliminate Unnecessary Queries With This Simple Check
socialImg: images/social.png
description: When I first write a script include to manipulate a GlideRecord, I usually script it to accept a sys_id or other query criteria as a parameter. The more I use the script, though, the more likely I am to run into a scenario where I already have the GlideRecord queried from another script. This technique bridges the gap.
---

When I first write a script include to manipulate a GlideRecord, I usually script it to accept a sys_id or other query criteria as a parameter. Its the obvious first step, the GlideRecord has to be retrieved to manipulate it after all. Take this guy for example:

```js
var Test = Class.create();
Test.prototype = {
    initialize: function() {
    },

    doSomethingAwesome: function(id) {
        var gr = new GlideRecord('incident');
        if (gr.get()) {
            // Something awesome gets done here
        }
    },

    type: 'Test'
};
```

The more I use the script, though, the more likely I am to run into a scenario where I already have the GlideRecord queried from another script. I hate to admit it but for a long while I used to just re-query the GlideRecord. Using the above script, this would look something like this:

```js
// From some outside script
var gr = new GlideRecord('incident');
gr.get('some id here');

var test = new Test();
test.doSomethingAwesome(gr.sys_id + '');
```

Of course the problem there is that I am unnecessarily running an extra query. As a portal developer who is often required to pack a homepage with queries on every live table in the instance, these additional queries can start to stack up on you.

One option to fix this is to go hardcore functional programming and separate the retrieval from the manipulation. In some cases this might make sense but honestly, I find that to be overkill when developing on ServiceNow as compared to say node.js or Python. I rarely run into the same issues on ServiceNow that I do when writing applications off platform. ServiceNow already has tons of API abstractions built in and I don't really need to further abstract the abstractions in most cases.

That said, I've settled on a simple, flexible pattern for developing API functions that will allow a function to accept either a query criteria or a GlideRecord:

```js
var Test = Class.create();
Test.prototype = {
    initialize: function() {
    },

    doSomethingAwesome: function(input) {
        var rec = input;

        // If the input value is not a GlideRecord, we need to run a query.  
        // Otherwise, we assume the correct GlideRecord was passed
        if (!rec.isValidRecord) {
            var gr = new GlideRecord('incident');
            if (gr.get(input)) {
                rec = gr; // Swap the criteria for the record
            }
        }

        // Something awesome gets done here and
        // the rec variable holds the GlideRecord whether from input or the query above
    },

    type: 'Test'
};
```

Now that doSomethingAwesome function can accept a sys_id or GlideRecord directly and work the same either way. No additional queries get run, no errors if I accidentally pass the GlideRecord, no more accidentally passing a sys_id as a GlideElement instead of a string, and I don't have to have a bunch of extra functions on my Script Include. That simple isValidRecord check separates the criteria from the query result and I can move about my day.
