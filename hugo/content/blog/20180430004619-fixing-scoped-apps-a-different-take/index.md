---
years: "2018"
date: 2018-04-30 00:46:19
author: tltoulson
aliases:
  - /servicenow/fixing-scoped-apps-a-different-take
url: /blog/fixing-scoped-apps-a-different-take
title: "Fixing Scoped Apps: A Different Take"
socialImg: images/social.png
description: Juggling Application Scopes in ServiceNow can be a tedious and frustrating process. Scoped Application Development is far from perfect, so let’s join the conversation started by Tim Woodruff. These are my crazy thoughts.
---

## Introduction

"This record is in the Customer Service Application, but Global is the current application. To edit this record click here." It's the "your princess is in another castle" of ServiceNow application development and the target of much ire among developers and admins alike (myself included). The fact is, Cross-Scope development is not as great as it could be and one of [Tim Woodruff's][1] [latest articles][2] inspired by this little pain point really got my wheels spinning on this issue.

<aside class="ccPullQuote right w-50">
  <p>[Scoped Apps] should be open for extension but closed for modification</p>
</aside>

As an internal application developer (ie. apps that I develop for my own company) much of what Tim had to say made a lot of sense. As a store app developer, though, I was very uncomfortable with the solution. After all, wasn't the purpose of Scoped Applications to create a rigid boundary to protect our applications and to allow the developer to define how the outside world (other scopes) can interact with it? We didn't build Wakanda just to tear down the shields and barriers that protect it, did we? On the other hand, do we really want our applications to be isolated, unable to help and be helped by the outside world?

It seems to me that the real problem here isn't that we can't make changes across multiple scopes but that we are trying to do it in the first place. I actually favor an Open / Close Principle approach to Scoped Apps: they should be open for extension but closed for modification with respect to the outside world.

With that, here are my suggestions for improving ServiceNow Scoped Apps.

(Spoiler Alert: I'm about to suggest some crazy stuff... like I do)

---

## Suggestion 1: Eliminate External Scope Update Sets

Every time I have to open an update set in "someone else's" app scope or see the "Switch Scopes to Edit" message, I consider it a shortcoming of the platform and of the application. Scoped Applications should be sacred. I don't get to just arbitrarily change the Facebook app on my phone so why should I be opening an Update Set in the Customer Service Management or HR app?

The first step I would take would be to remove the ability to create Update Sets in scopes you don't own. Full stop.

CSM, off limits. HR, nope. Security, over my dead body. GRC, when hell freezes over.

Ok, yes, this is a bit extreme (remember the spoiler alert) but this is all part of a larger plan. I'm not saying we can't change the app, I'm saying we can't change the app from the inside. That is the app developer's job. And this is actually a huge benefit to the stability of our systems architecture. By not changing these apps from the inside, these apps will always receive their updates. The original application records are always preserved. We can eliminate an entire subset of upgrade problems.

---

## Suggestion 2: Enhance Access Permissions

Right now Design Time and Run Time Access permissions for ServiceNow Scoped Apps are pretty limited. We can specify whether or not a scoped table can have CRUD operations performed on it, business rules / client scripts / ui policies can be created against the table, and web services and script access permissions. But that's about it and this leaves us with a HUGE gap in potential.

For example, how can I create a rule that says "Property X in my scope can be edited / overridden from Global". Or "Service Portal Pages in my scope can be configured from Global". Yeah, try modifying a scoped Service Portal page from outside the scope right now, it's a doozy.

Savvy readers right now are probably thinking this sounds an awful lot like an ACL and this is exactly what I am thinking. I would create Design Time Access ACLs which define a set of behaviors at the Table, Record, and Field levels and which Scopes have access (including wildcard capability). This would allow developers of an application to specify tables, records, and fields that they consider safe for editing outside of the application's scope.

Want to let admins modify the Scoped Service Portal, have at it. Want to let admins change internal configuration tables, go for it. Give access to only the active flag? Sure thing. Think admins are dread pirates trying to take over your app? Feel free to lock it up, toss 'em down a hill, and as you wish Buttercup.

The beauty of these DTA-ACL's is that they become the interface definition that describes how others can integrate with an app.

---

## Suggestion 3: Overrides over Modification

One of the things I love about Domain Separation is the concept of overrides and the TOP Domain. For those who are unaware, the TOP Domain allows you to make customizations while leaving the base installation intact. In other words, you can (in theory) get back to out of box without destroying your entire instance. The concept of overrides is similar. When you save over an existing Global record in a different domain (like TOP), instead of saving the record it creates a new record and flags it as an override for the original. The system then uses the override instead of the original in that domain.

My 3rd suggestion is a combination of these concepts. First, all system changes would be isolated to a Scoped Application (never in Global). A default scoped application would be provided for all new instances which would act something like the TOP domain. Second, instead of direct edit permissions, ServiceNow could implement record overrides on configuration tables (and allow custom tables to implement the same). In our TOP app for example, we could create overrides for Business Rules and other records in the HR app (assuming the HR App permissions allowed it).

---

## Putting It All Together (TLDR;)

When you put all these suggestions together, you get a very powerful and customizable system with many advantages over the current:

1.  Never working in scopes you don't own protects application integrity and reduces the number of potential apps for you to be switching between
2.  Working across multiple apps usually indicates an integration, which should probably be its own app
3.  Using App Record Overrides, instead of editing records directly, allows us to work within a single app while "modifying" records across multiple different app scopes. Scoped App Integration simplified!
4.  Placing App Record Overrides in their own scoped apps makes removing the behavior and getting back to out of box as easy as uninstalling the scoped app. No core data lost.
5.  Allowing developers to specify ACL like permissions for Design Time Access improves security over applications scopes while exposing clearly defined extension points

The result is a balance between customization power (open for extension) while protecting the intent and integrity of the original applications (closed for modification).

---

**After Note:** Special thanks to Tim Woodruff for the Tim-spiration! I have a great deal of respect for his work and he really got my wheels spinning with his article. I didn't cover all the different angles of Scoped Apps that he looked at. But I wanted to contribute to the conversation and realized I couldn't fit my thoughts in the LinkedIn comments. Anyway, what are you're thoughts on how to improve Scoped Application Development?

[1]: https://www.linkedin.com/in/sn-timw/
[2]: https://snprotips.com/blog/2018/4/12/if-a-genie-gave-me-three-wishes-id-use-them-all-to-fix-scope
