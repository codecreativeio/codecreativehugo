---
years: "2019"
date: 2019-10-17 19:43:31
author: tltoulson
url: /blog/is-service-portal-going-away
title: "Is Service Portal Going Away?"
socialImg: images/social.png
featuredImg: images/featured.jpg
featuredCredit: Anukrati Omar
featuredSrc: https://unsplash.com/@anuomar
description: "In short: No, I do not think Service Portal is going away any time soon. However, I hope Service Portal does go away."
---

I really enjoyed [Jace Benson's][1] latest post *Service Portal is going the way of the mammoth* and it's ensuing [Twitter conversation][2]. But seeing as how I couldn't answer a yes or no question in 280 characters or whatever it is these days, I certainly can't tackle something of this magnitude with so few characters... so here we are.

<aside class="ccPullQuote right w-50">
  <p>I hope Service Portal does go away</p>
</aside>

Truth is, I've been thinking about this since earlier this summer when people first started asking me about it. Somewhere between Jace's article and some of the Twitter responses my own thoughts on the matter solidified.

In short: No, I do not think Service Portal is going away any time soon.

However, I hope Service Portal does go away.

**Gasp** He didn't just say what I think he did, did he? I know, I know, let's just go ahead and dig in.

## Why It's Not Going Away

First let's tackle why I think Service Portal is here to stay, at least for now.

### The Technical Reasons

Remember when Service Portal released without a shopping cart, without support for many Service Catalog features, without... well a lot of things. Now we live in a utopian Service Portal future where UI Policies that use dynamic filter options still don't work, numerous field types (like conditions) are still not supported, and dropdown type fields (select-2 component) still have issues on mobile.

My point? It took years of really smart people to develop and stabilize the ServiceNow UI to support Catalog, UI Policies, Client Scripts, UI Macros, etc. This stuff isn't simply going to be reinvented with complete compatibility overnight. It didn't happen on Service Portal, it won't happen on "New Shiny Feature Here".

This means the best strategy is to niche initially, conquer later. The problem with this approach is:

### The Political Reasons

ServiceNow doesn't generally behave like a cohesive organization. In reality, they behave much more like a loose collection of start ups competing as much with each other as they do other companies. This turns out some really cool innovations but it also means that adoption of those features is often haphazard.

I mean, let's run the numbers. Within ServiceNow there are at least 3 different chat systems, 5 different ways variables are stored and used, 2 different workflow solutions, a couple different security models, a couple different decision tree style implementations, and the list goes on.

In many of these cases, the new solution didn't offer anything that couldn't be supported by the old system through enhancement. The new solution was just built by a different team for a different product.

If things are as they appear to me, this means the design system team has as much work to do convincing internal customers as they do external customers. And that brings us to:

### The Customer Reasons

Customers as far as I can tell are fairly pleased with Service Portal overall. When CMS was abandoned, that was not the case. Customers wanted a mobile friendly, modern experience that CMS simply struggled to provide.

Service Portal has thus far provided that experience rather well and as an added benefit allows their wildest dreams to come true. There is almost nothing that can't be accomplished in Service Portal.

Will the new design system components and effects allow the same flexibility? How much will we have to rely on the native components and effects?

In the [Now Design System session at Knowledge][3], the presenters emphasize how easy it is to theme the Workspaces. But what if JP Morgan for example wants to use their design system, not the ServiceNow design system? What if most customers want API's that allow them to create visuals as they design?

In my experience, that is exactly what customers end up requesting, particularly the larger ones. Service Portal accommodates custom views fairly well outside of a few stubborn components. Will the same be said for a tool that is intended to be a UI design system first? Time will tell.

And of course all this is without delving into the investment customers have made in their current portals and tooling. And as Nathan Firth has pointed out, even internal customers have significant investments in Service Portal: HI, NowLearning, and Community. And if we want to know more about what ServiceNow has to say on the matter:

### In Their Own Words

In the [session I mention above][3], around the 17:50 mark you hear the SerivceNow presenter say "We're imagining future canvases, like a portal canvas, that allows you to build n employee experience for requestors". I find that first "we're imagining" to be telling. Implementing a portal canvas isn't the hard part. Is there really a difference between a requestor navigation bar and a fulfiller navigation bar? No, and I'd argue that a fulfiller view is the harder of the two to accomplish.

It's possible that the imagining they are doing is just a turn of phrase. But it's also possible that they are keenly aware of the other hurdles they face to unseat Service Portal.

### This All Is Normal

Lastly, I want to address one of Jace's specific questions: when has ServiceNow ever done active development in two like things? In almost everything imaginable, he's dead on. Except UI.

A single responsive UI could have easily provided a unified experience in a single codebase. How do I know? I've built one for ServiceNow before. Did we really need $m.do, $tablet.do, the admin interface, and CMS or Service Portal? No. At no point was active development on all those needed.

And yet, each interface was always treated as something separate and developed in parallel. And in a maddening turn, each was developed with it's own quirky support for different core features.

Furthermore, this isn't the first hype train to roll through the station. ServiceNow's marketing is a powerful engine. They get excited, you get excited, I get excited, we all get excited. Then, their work social media platform (anyone else remember "F IN Now"?) fades into the background. Delegated development? I've yet to encounter a customer using it in practice (though I'm positive they exist). Team development? Oh how much I loved you. Service Creator? I'm sure it's used somewhere.

The point is, each of these were hyped as gold standard breakthroughs that would revolutionize the industry. And in hindsight, meh, maybe not so much. And understand, I am still a huge fan of each of these tools and concepts. But there is a chasm between great idea and revolutionizing the industry called *adoption*. And that chasm is a tough jump for even the most daring Evil Knievel.

Can the new ServiceNow Design Framework make the leap? History tells me it is unlikely.

## Why I hope it goes away

All that said, I wouldn't be surprised in the least if Jace turned out to be spot on in his assessment. First of all, he's Jace freaking Benson for crying out loud. Have you read his work? The man is a genius and thanks to Robert Fedoruk [has glowing eyes][4]. I agree with almost everything Jace says in his article. The only thing I think I contradict in any way is the parallel development effort. But to that point:

### I Want One UI Framework

ServiceNow should adopt a single UI system. Duplicate effort at this point is just a waste of talent: both at ServiceNow and amongst Partners and Customers. I love ServiceNow's experimentation but at some point stability would be refreshing. A modern UI that supports ALL of the core behaviors we know and love across devices would be refreshing.

I want one UI to rule them all, at least when it comes to the browser.

### I Want A Design System

Service Portal's main drawback is that every team leverages or doesn't leverage the bootstrap framework differently. There is no cohesion and it makes consistent theming via Bootstrap scss variables impossible. This leads to much more customization than should be necessary for simple tasks and in cases such as the Form widgets... well it's very challenging to do a low maintenance theme of those components.

A design system provides a common design language, a way to perform code quality checks, a way to enforce the commonality.

If any of this standardization is part of ServiceNow's new shiny, count me the heck in. That is exciting stuff... if there is follow through. But that's a whole other article.

### I Want ServiceNow UI Tech

I would love to see ServiceNow mature to the point where it can implement a common UI Framework. Yes, I love AngularJS but the truth is I'm not married to any front end framework. I'll use whatever they throw at me. If I have a hammer and a screw, guess what's getting beat into place. I'm not particularly picky as long as it gets the job done.

But others can be quite religious about their frameworks. At ServiceNow, this has meant different tools used by different teams based on personal preference. I'd much rather see a GlideRecord of UI that ServiceNow developers are expected to learn.

Again, that level of maturity and stability in the platform would be a welcome change.

## Conclusion

So there you have it. If the new design system is all bluster and the rumors of Service Portal's demise are greatly exaggerated, it wouldn't be the first time. If ServiceNow abandons Service Portal practically overnight, it too wouldn't be the first time (sorry CMS). Personally, I don't think Service Portal is going away any time soon. History shows us that ServiceNow's new products rarely sweep the whole platform and there is almost always a distinction between fulfiller and end user frameworks.

But if it does go away, I'll welcome the change with open arms. I just hope it's more than just change for the sake of change... more substance than "JSX is cool".

[1]: https://jace.pro/post/2019-10-14-end-of-sp-coming/
[2]: https://twitter.com/jacebenson/status/1184544688449212420
[3]: https://community.servicenow.com/community?id=community_article&sys_id=6246e75cdb9d3b0422e0fb2439961965
[4]: https://www.youtube.com/watch?v=wyVLCxOtZl8
