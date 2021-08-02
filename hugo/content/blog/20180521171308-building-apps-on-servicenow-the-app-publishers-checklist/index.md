---
years: "2018"
date: 2018-05-21 17:13:08
author: tltoulson
aliases:
  - /servicenow/building-apps-on-servicenow-the-app-publishers-checklist
url: /blog/building-apps-on-servicenow-the-app-publishers-checklist
title: "Building Apps on ServiceNow: The App Publishers Checklist"
socialImg: images/social.png
description: "The following is a summary of the Building Apps on ServiceNow: The App Publishers Checklist session that I presented at Knowledge 18."
---

The following is a summary of the *Building Apps on ServiceNow: The App Publishers Checklist* session that I presented at Knowledge 18.

<iframe src="//www.slideshare.net/slideshow/embed_code/key/lir9GCb4kxWCec" width="595" height="485" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" style="border:1px solid #CCC; border-width:1px; margin-bottom:5px; max-width: 100%;" allowfullscreen> </iframe>

## Problem

**(Slide 2) The Hardest Mistakes to Overcome**

During my time on the ServiceNow platform, I have had many opportunities to build a wide variety of applications. Some of my apps ended up on the ServiceNow Store like Intelligent Queue while others have been silent contributions to client applications. I have both designed apps from the ground up and contributed to others applications and the one thing that I consistently find is that mistakes made early in app development are the most difficult to overcome. The earliest mistakes have a way of cementing themselves permanently into your design, impacting all later versions.

**(Slide 3) Challenges After V1**

There are a number of reasons mistakes in the initial release tend to stick around.

**Changes Break Things**

First of all, v1 usually sets up your application's architecture and changes to that foundation usually break things. It's almost inevitable. In a mapping application I previously worked on, I realized after v1 that a part of the processing engine that I built was completely inflexible and left no room to grow, it was completely hard coded with no clear interfaces defined. Unfortunately, in trying to break up the code and define some clear interfaces, I completely broke the engine. It took more hours than I care to admit to get the application back on track and even then there were still some unresolved issues which brings me to my next point.

**Testing is Hard**

Most of my work has been done with small development teams and even smaller testing teams. In those environments you don't usually have extensively defined test cases and automation in place, least of all shortly after v1 release. Said another way, testing is haaaaard. Regression testing after changes is especially difficult as it is tough to ensure complete coverage. Did you test that one random bug you encountered previously? How about that quirk in Firefox? When you combine all the different combinations of user roles, data inputs, environments, and expected results, truly complete testing is exceedingly difficult to accomplish the first time. Completely rebuilding entire sections of previously working code basically guarantees that you have to do it all over again.

**Deleting App Records is Risky**

Another post v1 challenge we face is that it is risky to delete application records. In fact, the last I checked, you can not certify an application for the ServiceNow store if it has deleted records even from its own scope. This is because record deletion can cause a number of undesirable effects such as cascade deletes, orphaned records, and lost customer data. The inability to prune applications of unused records leads to a lot of bloat if you are not careful. And if you think that isn't a big issue, then you haven't had the pleasure of working on an app in Studio with a large percentage of deprecated app files (you can't find anything that you're looking for).

**The Spaghetti Monster**

The last major challenge I want to call attention to is the dreaded spaghetti monster. One of the most popular and painful Script Include "patterns" in ServiceNow development is the Util Script. We all build one at some point. "All I need is this one function" we think, so we build a quick Util Script Include to house our function.

Then the function grows. We add a couple more similar but slightly different functions. We add some if statements and then some if statements inside those if statements. And before long our 25 line "one function" is a Script Include spanning hundreds (or as I've seen in some cases, thousands) of lines of tangled spaghetti code.

Sadly, I've encountered many applications built on a foundation of util scripts that weren't really designed as much as they just happened. The longer an application goes without solid design (heh, inadvertent object oriented joke), the worse this problem becomes and the harder the application is to improve and maintain.

**Solutions**

But there are a number of things we can do early in our application development to help ensure our applications don't suffer from these issues down the road (And if you are already down the road, it's never to late to start moving your app down the right path). Since there's a lot to remember here, I'm going to wrap it up into 3 easy to remember concepts.

## Build It Sexy

User Interface and User Experience are the most underrated aspects of application development. Sure, it has started getting more emphasis in some circles but for the most part it is still treated as something that can be overlooked as long as the app is functional. The problem is that we view UI/UX as a deliverable instead of viewing it as an architectural design tool.

**(Slide 5) User Interface is the one language spoken by both the business and the developer**

That's right, User Interface is the one language spoken by both the business and the developer! Domain Specific Languages, requirements, stories, use cases: so many tools just to understand what the customer wants and all of them routinely fail. But the one tool that has NEVER failed me is a simple wire frame or mockup. As engineers, we tend to work well in the abstract "as a user I need to be able to" sense. But those abstract discussions often lead to different interpretations and can easily steer an architectural design in the wrong direction. In one case, it took months for some of the most impressively skilled people I've ever worked with (and me) to figure out that our design didn't align with our customer's expectations at all. And we only found out when we put the application in the customer's hands. Imagine if we had put our thoughts into a picture and presented that at week two instead of month 3.

**(Slide 6) Too Many Interfaces Are Full of CRUD**

Along the same lines, too many application UI's are dependent on CRUD based interfaces. Thanks to ServiceNow, we can quickly create List and Form views that meet the needs of all our basic CRUD operations (Create, Read, Update, Delete for the non-technical folks that I haven't already lost). But we all too often use this as a crutch and an excuse to skip designing the best interface for the app. When we restrict our conversations to CRUD verbs, we limit the language of our entire application. This leads to disastrously oversimplified architectural designs and downright silly mental models. As a simple example, consider the conceptual difference between "Checkout a Knowledge Article" and "Create a Knowledge Article Version". The first approach is clearly a better way of discussing the concept and yet between REST and CRUD the second approach often ends up the way we implement our applications.

**(Slide 7) Alternative UI's**

But if we are to move past the simple CRUD based UI's, we have to look to some other tools. We can still leverage forms without using CRUD by defining custom UI Actions to implement a more robust language as we've seen in the Knowledge Base Advanced plugin. Or we can move to non-form based UI's by using Service Portal, UI Pages, or even custom Processors. Either way we choose to approach it, by placing a greater emphasis on our UI we can actually get a better understanding of our application's design goals and improve the architecture that supports it.

## Build it Stable

Once we have a handle on the natural language that describes our application, we can turn our focus to making the technical details as stable as possible. When I talk about stability, I am not referring to stability of the application server and it's crash resistance. ServiceNow does a great job handling that on its own. I am referring to the ability of application features to survive code changes and platform upgrades with minimal maintenance. To this end, there are a couple lower level goals that when followed can help achieve stability:

1. Adding new features requires touching as little existing code as possible
2. Changes to existing features can be easily isolated without impacting other features

**(Slide 9) Application Architectures that Scale**

Achieving stability starts with using scalable application architectures. We usually think of scalable as scaling to large volumes of data and users. But scalability, especially on ServiceNow, means so much more than that. Scalable architectures need to be able to scale to accommodate new features, code, and especially larger teams. This generally means making code components smaller, more modular, and open to extension but closed to modification.

My favorite ServiceNow architecture for achieving this is depicted on Slide 9. Almost every app I build from scratch uses this architecture. Each layer leverages a different class of ServiceNow record which makes it easy to separate out the responsibilities of each code component. This also has the nice side effect of allowing me to slice an application horizontally or vertically when assigning work to my team.

**(Slide 10) Program to Interfaces**

Specifically focusing on the Script Include Business Logic Layer, we need to make sure that we are programming to interfaces. When working with code, we usually focus on the process, the algorithm, and the order of execution. This inevitably leads to those Util script dumping grounds which makes isolating changes very challenging.

By treating our code as a black box and focusing on the various inputs and outputs, we can start to decouple our application components and create a framework that is easier to extend and maintain. In Intelligent Queue, for example, I built a recommendation engine that presents service desk users with tasks to work. Rather than focus on **how** the recommendation system worked, I focused on the inputs of the system and the desired output (a recommended work item). This changed my design from a single long processing script to a system of components. One of those components was the recommender itself which had a single function (getNextWorkItem) that returned an Approval or Task GlideRecord. By designing that interface, I can now swap one recommender with another without any major impacts to the rest of the code.

**(Slide 11) Leverage System Properties**

Taking interfaces one step further, we can also leverage System Properties in unique ways. Of course we can remove simple hard coded values by isolating them in System Properties which can make our code more stable all on its own. But we also have the ability to execute code from System Properties!

This is a technique I discovered ServiceNow using in the CMS and Service Portal login redirect scripts and was able to successfully reproduce. To execute a script stored in a system property, use the following snippet:

```js
// Execute scripts stored in system properties (Ultimate Interface!)
var gr = new GlideRecord('sys_properties');
gr.get('386cf93edb278700775dab92ca961956');
var answer = new GlideScopedEvaluator().evaluateScript(gr, 'value');
```

This technique is essentially the ultimate interface because you can vary the inputs (by changing the script stored in the System Property) but still maintain the output of the interface. From the Intelligent Queue example, this means that I can create new recommenders that take in entirely new and previously unforseen inputs as criteria for the recommendation. And yet I never have to touch the code of my core engine to do it. This greatly reduces the risk of introducing new bugs or breaking existing code.

## Build It Secure

I will be the first one to admit that I am no security expert. But there are a few things that I have picked up on (particularly through app certification processes) that we need to be aware of as we develop our applications.

**(Slide 13) Don't Forget the ACLs**

First of all, don't forget the ACLs. I am probably the #1 violator of this one on my apps and I'm sure the App Certification Team is tired of kicking back my apps for missing ACLs. But in my defense, there are many different things that ACLs protect that we tend to overlook. Among those are Scripted REST Services (my favorite to forget), UI Pages, Portals / Widgets (technically roles, not ACLs), and Tables. With table ACLs, the one we need to pay special attention to is the Delete ACLs. By default, Table creation adds the same ACL to the Delete action as Read, Write, and Update. Usually we want Delete restricted to admin only. Otherwise, you might end up in a situation like I did recently where a bunch of scoped app data was mysteriously deleted one morning (thank God for the Deleted Records table).

**(Slide 14) Client Side Security = Bad**

And to add on to the ACL thought, do NOT under any circumstances implement your security in UI Policies or Client Scripts. I know this has been established as best practice but I still see it happen in so many client instances. It is terrifyingly easy to bypass client side security. In one example, an online retailer took the shopping cart total from the client side and processed it as the official total. It didn't take long for people to start using Inspect Element to order themselves a loaded shopping cart for $0. Make sure your security is enforced server side via Business Rules or Data Policies.

**(Slide 15) Beware of XSS**

Another thing we need to be aware of is Cross Site Scripting or XSS. This is a type of attack where user input is rendered directly back into the HTML, allowing malicious users to inject scripts into the page. XSS can create a multitude of issues such as allowing your user's session to be hijacked, redirecting a user to a malicious site (where they may mistakenly hand over their credentials), or modify the presentation of content. There are two types of XSS attacks we need to defend against: Stored and Reflected.

**(Slide 16) Stored XSS**

Stored XSS is where data is taken in from the user, via a form for example, and then later is rendered into the body of the HTML. A simple example of this is user comments. In ServiceNow, when you start building your own interfaces, this can become an issue. I was once made aware of a vulnerability in a mapping application that I developed where a user could input the name of a map layer which would be stored in the database. Then we had a 3rd party library which would add the Layer name to a tooltip on the map. Unfortunately, that library did not sanitize the input and so malicious users could add scripts to the layer name and have them execute in the browser. We ended up adding input sanitizing server side (remember how I said not to handle security client side... yeah I might have been burned by that before).

**(Slide 17) Reflected XSS**

ServiceNow is a little stronger on the Reflected XSS attacks. Reflected attacks are where user input is taken via URL parameters which are then reflected back into the UI. Consider a search URL for example where the UI takes the search query from the URL and adds it to a "You searched for" text on the page.

When accessing URL parameters using RP.getParameterValue and other ServiceNow APIs, the URL parameters are automatically sanitized for you which is wonderful. But you still want to be aware if you try to parse those URLs yourself.

**(Slide 18) Protect Your IP**

Lastly, for my fellow App Store developers, don't forget to protect your intellectual property. ServiceNow has Protection Policies on all Server Side code records such as Script Includes, Scripted REST APIs, Business Rules, and Processors. To leverage these, you have to switch the record's Protection Policy to Protected. This will make it so that anyone who installs via the Store can not read your protected scripts to reverse engineer the application. To take full advantage of this, make sure you keep your IP in sever side scripts since client scripts can not be protected.

## Conclusion

So to quickly recap, there are many ways an application can go wrong early in development and those tend to be the hardest mistakes to correct. But there are many strategies and techniques we can use to prevent our apps from falling into those issues. At a high level, we want to make sure that we build our apps sexy, stable, and secure. When we keep these 3 thoughts at the forefront of our mind, the right path for our app will never be far from mind.

[1]: https://www.slideshare.net/TravisToulson/building-apps-on-servicenow-the-app-publishers-checklist-97901714 "Building Apps on ServiceNow: The App Publishers Checklist"
[2]: https://www.slideshare.net/TravisToulson
