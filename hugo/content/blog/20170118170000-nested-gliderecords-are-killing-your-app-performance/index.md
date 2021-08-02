---
years: "2017"
date: 2017-01-18 17:00:00
author: tltoulson
aliases:
  - /servicenow/nested-gliderecords-are-killing-your-app-performance
url: /blog/nested-gliderecords-are-killing-your-app-performance
title: Nested GlideRecords Are Killing Your App Performance
description: Nested GlideRecord is a silent performance killer among scripting patterns. Learn how these scripts can easily slow your page load times and find out how to identify them.
---

In a troubleshooting conversation with a couple of my teammates, I realized that I take GlideRecord (and its partner GlideAggregate) for granted. When you make that simple gr.query() call, what happens? What SQL does it run? What does the real underlying table structure look like? Are there indexes? Are additional queries run when you dot walk? Does any of this hit a cache? How does the cache work? Where are the optimizations under the hood?

But when performance issues start to pile up... well, what you don't know could be killing your instance.

<aside class="ccPullQuote right w-50">
  <p>But when performance issues start to pile up... well, what you don't know could be killing your instance.</p>
</aside>

The truth is, most of us have no idea what happens and most of the time that is really awesome! If the queries run fast and returns accurate data we usually don't care how ServiceNow made it happen.

But when performance issues start to pile up on that scripted REST endpoint and all you're doing is generating JSON from GlideRecords... well, what you don't know could be killing your instance. The **Nested GlideRecord** silently drags down your app's response times, killing usability and the first step to fix it is to learn how to identify it.

---

## The Basic Pattern

A Nested GlideRecord is when you run a GlideRecord query within the while loop of another GlideRecord query, like this:

```js
var gr1 = new GlideRecord('any_table');
gr1.query();
while (gr1.next()) {
  var gr2 = new GlideRecord('any_table');
  gr2.query();
  while (gr2.next()) {
      // Do something here
  }
}
```

Now, take a look at that script. How many times does that script query the database? The correct answer: I have no idea and neither do you. We don't know how GlideRecord works exactly. What we do know is that in the worst case it will run one query for gr1.query() and an additional query for each record in gr1 (gr2.query() inside the while loop).

<aside class="ccPullQuote right w-50">
  <p>The defining feature... is using many smaller queries when one larger query could retrieve the same data.</p>
</aside>

The defining feature of this performance killer is using many smaller queries when one larger query could retrieve the same data.

## A Crude Scenario

So lets take a look at a somewhat real world script to get an idea of why this is such a problem. Lets try to find and output a list of duplicate user records. We'll keep it simple and assume the first record found is the original. To do this, we need to:

1. Get a list of usernames with a count greater than 0
2. Find all user records with those usernames
3. Update all but the first with a duplicate flag

For this test, I will compare 2 approaches: Nested GlideRecord and an Array Flattened GlideRecord.

Here is a crude Nested GlideRecord approach:

```js
var count = new GlideAggregate('sys_user');
count.addQuery('email', '!=', '');
count.groupBy('email');
count.addAggregate('COUNT');
count.query();
while (count.next()) {
  if ((count.getAggregate('COUNT') * 1) > 0) {
    var user = new GlideRecord('sys_user');
    user.addQuery('email', count.email + '');
    user.query();
    user.next(); // skip the first
    while (user.next()) {
      gs.print(user.sys_id);
    }
  }
}
```

And the Array Flattened GlideRecord:

```js
var users = [];

var count = new GlideAggregate('sys_user');
count.addQuery('email', '!=', '');
count.groupBy('email');
count.addAggregate('COUNT');
count.query();
while (count.next()) {
  if ((count.getAggregate('COUNT') * 1) > 0) {
      users.push(count.email + '');
  }
}

var user = new GlideRecord('sys_user');
var prevUser = '';
user.addQuery('email', 'IN', users.join(','));
user.orderBy('email');
user.query();
while (user.next()) {
  if (prevUser == user.email + '') {
    gs.print(user.email);
  }
  // Else, skip the original user
  prevUser = user.email + '';
}
```

Running these two scripts in the background, I was able to achieve some poor man's stats after a few manual runs with 1144 user records and 572 duplicates:

- Nested GlideRecord: ~0.795 seconds to execute
- Array Flattened GlideRecord: ~0.145 seconds to execute

Now this is a pretty extreme example that will more likely be executed as background script or scheduled job rather than a user facing transaction. But that performance difference between the nested and flattened scripts starts to add up when multiplied by the number of users hitting your site and the depth and frequency of nested GlideRecords in your scripts. Pretty soon, you might find your database running a query every 60 seconds (yep, that actually happened on a different client).

## Dot Walking Has The Same Results

The scary part about this pattern is that it easily hides itself. Dot walking, for example, works like magic to retrieve related data. Under the hood, it runs a query at least once to retrieve the reference (I assume the reference is cached for subsequent calls in a given script if not the entire transaction but I'm not sure).

So the following script could inadvertently cause the same issue as the previous example (and in the originally mentioned REST script, I believe this was a contributing factor):

```js
var gr = new GlideRecord('sys_user');
gr.query();
while (gr.next()) {
  var department = gr.department.name; // Reference Field!
}
```

That Department is a reference field, so ServiceNow has to run a separate GlideRecord query behind the scenes to retrieve the data for that department. All magic comes at a price, deary!

## Or How About ACL's

Running a GlideRecord query in an ACL yields the same effect. In this case, its subtle but still there. If you run a query on the incident table for example, an ACL will be applied to (and the script run for) each record in the resulting set. For each and every record in your resulting set, a narrowly defined GlideRecord query will execute to find out if the user can see the record! (This by the way was one of the primary causes behind the 60 second queries).

---

## Bottom Line

Here's the too long didn't read: Avoid using 20 narrowly defined GlideRecords when with a little work you can combine it into a single broader GlideRecord. Watch out for the same pattern in ACLs, dot walking, and other ServiceNow scripts. This pattern likes to hide itself. Another time, we'll take a look at some strategies to fix this.
