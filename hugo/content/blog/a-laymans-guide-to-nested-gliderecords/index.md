---
years: "2017"
date: 2017-04-13 15:30:01
author: tltoulson
aliases:
  - /servicenow/a-laymans-guide-to-nested-gliderecords
url: /blog/a-laymans-guide-to-nested-gliderecords
title: A Layman's Guide to Nested GlideRecords
socialImg: images/social.png
description: My previous articles on the Nested GlideRecord issue were far more technical than I usually try to achieve. With that in mind, I would like to revisit Nested GlideRecords, how they cause performance problems, and why database indexing alone isn't the best solution... this time with a little more simplicity.
---

My [previous][1] [articles][2] on the Nested GlideRecord issue were far more technical than I usually try to achieve. After all, if I can't explain it simply enough then I probably don't understand it well myself. With that in mind, I would like to revisit Nested GlideRecords, how they cause performance problems, and why database indexing alone isn't the best solution... this time with a little more simplicity.

And a parable!

Suppose that 3 people are separately going to the grocery store: Peter, Dora, and Lois. As well prepared shoppers, unlike me, they have their shopping lists ahead of time. Each shopper has parked his or her car and is ready to shop!

## Peter: A Tale Told By An Idiot

Peter is not the sharpest tool in the shed (sorry Peter). He's what I like to refer to as an ASVAB waiver. You'll have to look that one up. He's got those good old fashioned values, he just doesn't buy into the whole 'work smarter not harder' routine.

Peter wrote his list on index cards... one item per card. What's worse is that he only brings one card to into the grocery store at a time. The rest he leaves in the car. And if that wasn't bad enough, he searches every aisle in the store from front to back. Every. Single. Time.

So Peter's shopping trip looks like this:

1. Grab the top index card from the car
2. Search the grocery store from front to back
3. Find the item on the index card
4. Buy the item at the register
5. Return to the car for the next index card
6. Repeat

Peter does this for every... single... item on his list. An elaborate montage or well timed cutaway gag couldn't save this approach.

## Dora: She Has A Map

Dora is a little better off. Like Peter, she seems to constantly repeat the same endless loop but at least [she has a map][3]. Well, technically, the grocery store has a map but she knows where it is and decides to use it. With the map, Dora doesn't have to search the entire store, she can go straight to the shelf that has the item she is looking for.

Dora's shopping trip looks mostly familiar though:

1. Grab the top index card from the car
2. Find the index card item on the map
3. Get the item on the index card
4. Buy the item at the register
5. Return to the car for the next index card
6. Repeat

Sure, Dora is probably saving a lot of time using that map. Not having to search the whole grocery store for every item would save time even on just a small basket of food for Abuela. But there is still the whole issue of running back and forth to the car.

## Lois: She's Got It Together

I think you're starting to see picture here. But just to cover our bases, lets take a look at Lois because Lois does groceries! Lois not only uses the map, she also quite sensibly brings the whole list with her. She plots her path with precision and executes perfectly.

This is what Lois' shopping trip looks like:

1. Find the next item on the map
2. Get the item on the index card
3. Repeat 1 and 2 until all items have been put in the cart
4. Buy the items at the register

First and foremost, she spends most of her grocery trip in the grocery store. That alone reduces most of the wasted effort expended by her, the register clerk, and the car door hinges. It simplifies everyone's job involved

## The Analogy

So putting it all together, here's what each of our actors in this odd parable represent:

* Parking Lot = ServiceNow Application
* Grocery List / Index Cards = Query Criteria
* Store = Database
* Store Map = Index

Peter represents the Nested GlideRecord. He passes back and forth from application code to database over and over again with one criteria at a time. Worse, without proper indexing in the database, he runs around like a chicken with his head cut off. With a large enough store, the lines of these shoppers pile up, Peter abandons his list and goes to the pub.

Dora represents a Nested GlideRecord with proper indexing. Sure, each pass through the store is made faster but she's still working her application and database much more than necessary. Indexes might make each individual search faster but she's still queueing up way more queries than she needs to.

All the query criteria is passed efficiently in a single query to the database.

<aside class="ccPullQuote right w-50">
  <p>All the query criteria is passed efficiently in a single query to the database.</p>
</aside>

Lois represents the Nested GlideRecords being eliminated. All the query criteria is passed efficiently in a single query to the database. Both application and database are worked only as much as needed and with proper indexes her visit to the database is as quick as possible. A happy path all around.

So I hope this article helped clarify the Nested GlideRecord issue. If it did, let me know! I'm always trying new ways to communicate complicated issues and it helps to know what works.

[1]: /blog/nested-gliderecords-are-killing-your-app-performance
[2]: /blog/3-strategies-to-fix-nested-gliderecords
[3]: https://youtu.be/5DUgiMjuu7w?t=51s
