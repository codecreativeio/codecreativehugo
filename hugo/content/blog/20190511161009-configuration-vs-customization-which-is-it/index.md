---
years: "2019"
date: 2019-05-11 16:10:09
author: tltoulson
url: /blog/configuration-vs-customization-which-is-it
title: "Configuration vs Customization: Which Is It?"
socialImg: images/social.png
description: The following is a summary of the Configuration vs Customization session that I presented at Knowledge 19.
---

The following is a summary of the *Configuration vs Customization: Which Is It?* session that I presented at Knowledge 19.

<iframe src="//www.slideshare.net/slideshow/embed_code/key/HVjEw3BFxc2UCL" width="595" height="485" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" style="border:1px solid #CCC; border-width:1px; margin-bottom:5px; max-width: 100%;" allowfullscreen> </iframe>

## The Official Guidance

**(Slide 1) Intro**

"We don't want any customization." It's one of the first things I hear on almost any project. We all know and have been taught that we should avoid ServiceNow customization. The ideal is a purely configured instance. But by day 3 or 4, "maybe just this one customization". By day 7 or 8, "ok maybe just one more". Before we know it we're swimming in customizations and wondering how we got there.

This has been one of my most consistent experiences on the platform over the last 8 years. It has made me start to wonder, why do we keep doing this? If configuration is the ideal, why is it so hard to achieve and what in fact can we do to truly protect ourselves in the way that the "configuration vs customization" debate has so far struggled to accomplish. To start, let's understand what we mean by a customization.

**(Slide 4) Official Definition of Customization**

At the time of this presentation, ServiceNow defines a customization in [KB0553407][1] as "any change to code that is part of the baseline install of a ServiceNow instance." This article was fairly recently updated, and it's latest version (2019-03-18) does much to clarify some of the ambiguity of previous versions of the document. At the same time, it also identifies many things as a customization which we may previously have identified as a configuration. Business rules that use advanced scripts for example would be classified as a customization under the current definition.

**(Slide 5) Examples of Customization**

In the same document, ServiceNow provides us some very clear examples of a configuration and a customization. Configurations include things like UI Policies, plugins, system properties, and modifying form and list views. Customizations include things like changing UI Macros which require writing Jelly or building a new custom feature into the platform such as via custom application or third party widget.

This means that any Scoped Application leveraging code technically falls under the definition of a customization. Think about that. We simultaneously say that configuration is the ideal and then completely accept that we were provided with a robust toolkit specifically designed for violating the ideal. It's no wonder there is so much confusion around this topic.

With the way the conversation around configuration and customization goes, though, any sane person would say "avoid customization at all cost". But for anyone who has followed my work for any length of time, you will know that I don't always hold the sane approach in high regard. I prefer to tackle things a little differently and attempt to expand our perspective.

**(Slide 6) Do you want to Play a Game**

So with this in mind, I want to play a game. Over the next few slides, I will present a scenario that is either a configuration or a customization. During the session, I asked the audience to vote for their choice by a show of hands but for those playing from home... I guess you are on the honors system.

**(Slide 7 and 8) Scenario 1**

Scenario 1: ServiceNow Admin adds the Description field to the Incident form

The first scenario is an easy one and everyone got it without an issue. Of course this is a configuration. It's a simple form view change, no code required. Nail. Coffin.

**(Slide 9 and 10) Scenario 2**

Scenario 2: A new customer on a Geneva instance builds new widgets using Jelly UI Macros for their CMS

Once again, people were fairly unanimous. This one is definitely a customization. UI Macros require Jelly which is unequivocally code and code that sends many of us running. However, in Geneva there was a Known Error surrounding the CMS iFrame resize script. Quite simply, the iFrame would not expand to fit the site's content, leaving the content cut in half. The only way to fix this issue was by introducing a customization. This could be done using either a UI Macro or a Global UI Script.

Either way, it was code, a customization, and without it your CMS was broken. This Known Error would not have a non-customization fix until Istanbul with many teams preferring the custom version of the script until well into Jakarta.

**(Slide 11 and 12) Scenario 3**

Scenario 3: A Service Portal Developer tailors a Theme and modifies cloned widgets to support corporate branding, accessibility, and style guide standards

This particular scenario was a split decision and not unsurprising at all. Prior to the latest version of the KB article, there was a lot of ambiguity around Service Portal themes and widgets status. With the latest version, though, the article clearly states that any code is customization and this is definitely code. The article even goes further by specifically calling out 3rd Party Widgets as a customization example. It's hard to argue with that.

We desperately want Service Portal themes and widgets to be considered configuration though. Configuration is good and customization is bad. Service Portal was designed for cloning widgets. It was designed to allow these changes to be made without impacting your instance. Switching back to the original widget is as easy as updating a single reference field. Using these features can't possibly be bad and yet it is still a customization.

In fact, I had to completely rewrite portions of my Service Portal Crash Course when I switched it to the new Guide. Within a few weeks of publishing the Crash Course, I discovered that the demo code was broken on London due to changes to ServiceNow's widgets. Broken. Within one version.

But can we seriously imagine a world in which everyone is using the same Service Portal with only changes to the logo and the color of the navbar. I certainly can't.

**(Slide 13 and 14) Scenario 4**

Scenario 4: A ServiceNow customer implements Test Management in Jakarta as part of PPM; as part of the implementation, the customer adds some form fields, builds out reporting, dashboards, and notifications investing in the tool

This one was the big stumper. The votes were all over the place. I think some even voted for a third option: "this scenario is too long to read". Breaking it down, all we've done is add fields, reports, dashboards, and notifications. There is not a single line of code in this (you could argue that notifications can use code but it's my scenario and I'll cry if I want to).  This one is definitely configuration.

However, the important piece of this is Test Management in Jakarta. You see, Test Management 2.0 was released in London. It did not share the same tables as 1.0. It did not share the same processes. The app was rewritten from the ground up. The customer had the option of sticking with a potentially unsupported application (all development has since gone to Test Management 2.0) or upgrading to Test Management 2.0. Upgrading meant migrating data and reimplementing reports, notifications, and all other configurations made on the previous application.

The whole point of avoiding customization is that it is supposed to prevent reimplementation. Yet, here we have an example where configuration failed to prevent reimplementation. And it is hardly the only example. CSM, HR, and ITGRC applications at a minimum underwent significant changes or complete rewrites that left customers with difficult decisions around reimplementation. If I were a gambling man, I'd bet that Cloud Management will be due for some overhaul soon as well. This sort of thing happens all the time.

And these aren't hypothetical scenarios. These are actual customers, actual challenges that were actually faced. Each and every one of these is a real, tangible example of necessary customization or failed configuration.

**(Slide 15) Lightening things up**

Ok, this is starting to get a little dark. It may seem like I'm coming down on ServiceNow but that isn't my intent at all. This sort of things happens on all platforms, all applications.

We are in one of the fastest growing and changing industries in the world. It's truly exciting. We have the opportunity to serve and help people in ways previously never imagined. Through the applications we configure and develop we have an unprecedented ability to make an impact. This is an amazing opportunity!

But it doesn't come without a cost because...

**(Slide 16) Everything in life that matters requires risk**

Everything in life that matters requires risk. I love this quote so much that I've got it in my living room on the wall right across from where I work. If we want to take advantage of the great opportunity that has been presented to us then we have to get our hands dirty dealing with the risk of that opportunity.

And this isn't a customization only thing. From the moment you spun up your ServiceNow instance, whether you realized it or not, you accepted certain risks. This is true for any technology that we implement. The larger question has never been is it a configuration or a customization. The question is what risks affect our implementation choice and what can we do about them.

Configuration or customization, everything in life that matters requires risk.

## Managing Implementation Risk

**(Slide 17 and 18) What is Risk**

So with that in mind, let's take a look at how we can go about managing that risk more effectively. To start, let's define what risk is.

The Project Management Body of Knowledge has my favorite definition of risk. It sates "A risk is an uncertain event or condition that, if it occurs, has a positive or negative effect on a project's objectives".

A **positive** or negative effect on a project's objectives. This presents a very different view of risk than we are traditionally accustomed to and frankly than the configuration vs customization debate. We usually associate risk as a bad thing to be avoided. But this isn't the case. Risk is just an uncertain event that we are trying to manage.

So let's look at how we can go about managing it.

*Side Note: This commentary was not in the original presentation but I do want to call attention to the fact that positive risk is a bit of a philosophical issue in Risk Management. While some view positive risk as an opportunity as I do in this deck, there is an alternate view that positive risk should reflect that there can be too much of a good thing. So, to make sure we are on the same page, my perspective is that positive risk is a desirable objective. Our goals are an uncertain outcome as much as are our failures. The purpose of Risk Management is to increase the probability of positive risk and decrease the probability of negative risk. Semantics and philosophical differences aside, these are the definitions that will best help you understand the rest of the presentation.*

**(Slide 19) Step 1: Identify the Risk**

The first step is to identify the risk. Since we must deal with both positive and negative risks, I'm going to simplify our terminology. Here I refer to negative risks as threats and positive risks as opportunities.

When looking for risk events, it can be easier to look for the undesirable outcomes and ask ourselves what could result in those outcomes.

For threats, we have a few potential outcomes:

1. **YOU** are responsible for maintaining the code
2. Delayed upgrades: Future ServiceNow upgrades can be skipped or broken
3. Unable to use new ServiceNow applications or features
4. Worst case: Z-Boot, Reimplementation, or Multiple Instances

And for opportunities we have:

1. Reduced costs
2. Creation of additional revenue
3. Mitigation or avoidance of other organizational risks
4. Increased process transparency

**(Slide 20) Identifying Threat Sources**

We can also use some lessons learned from the configuration vs customization debates to identify some potential threat sources. After all, I'm not saying we should throw out the configuration and customization debate entirely. I am simply proposing we refine the discussion.

The slide shows a number of potential threat sources. The important part to keep in mind is that a threat is created whenever a record exists that can be influence directly or indirectly by both you and ServiceNow. Joint ownership is the single greatest threat source on ServiceNow. For example, when we create a business rule, it exists within a chain of Business Rules owned and maintained by ServiceNow. If ServiceNow changes even one rule in that chain, there is no guarantee that it will still yield expected results given our business rule. ServiceNow isn't testing our business rules. In truth, even low-code or no-code Flows or Business Rules can be a threat source.

**(Slide 21) Step 2: Assess the Risk**

The next step is to assess the risk. For those familiar with Change Management risk assessment, the matrix on this slide will be very familiar. To assess risk, we want to quantify it according to the probability that it will happen and the severity of the outcome if it does happen. The definitions provided on this slide are one way you can potentially drive subjective risk to and objective value.

You'll also note that the matrix accommodates definitions for both threat severity and opportunity severity.

**(Slide 22) Step 3: Plan a Risk Response**

The third step is to plan a risk response. This is likely the area where our configuration vs customization debate is the weakest. There are a number of different strategies we can employ to manage threats and opportunities.

For threats, we can of course simply avoid the risk. This is the preprogrammed response in the traditional configuration vs customization argument. But we can also transfer the risk. I like to call this the "not my problem" strategy. In this approach we find a partner or internal business unit with whom we can share the risk. This way if we do encounter the risk, we have help handling it.

We can also seek to mitigate the risk. This involves finding alternative solutions or subtle changes to approach that can help us reduce the probability or severity of the risk.

Lastly, we can accept the risk or as I like to call it the "future Travis' problem" strategy. Now, this probably isn't the best strategy in most cases. But there is a lot of potential uncertain events out there and there reaches a point where we simply have to accept some risks to make progress.

Opportunities share very similar strategies. Each strategy for threats has a counterpart for opportunities. So for opportunities we can exploit, share, enhance, or accept the risk.

**(Slide 23) Avoidance is not the only strategy**

The important part to note here is that avoidance is not the only strategy. The configuration vs customization approach leaves us severely underequipped to properly manage the risks of implementation. One possible option is to mitigate the risks, which on ServiceNow leaves us quite a few options.

We can use Scoped Applications to isolate our changes. But we've never had to rely entirely on application scoping. We can also simply compose behaviors with custom tables. Instead of adding behaviors directly to the Incident table, for example, we can create a new table and use a reference field. This reduces the overlap between ServiceNow managed records and our own.

Extending tables can also be a useful tool but I personally prefer composition to inheritance. Inheriting tables in ServiceNow can yield unexpected results since not all scripts are marked to be inherited by child tables and new features can be introduced on the base table which conflict with behaviors on the inherited table. It is still generally a better option than dramatically altering ServiceNow's baseline applications.

Also, keep in mind that ServiceNow's latest guidance ends the old procedure of marking a record inactive and replacing it with a new one. The new guidance is to simply edit an existing record in place. The previous approach would leave you with two customized records instead of one and complicated restoring baseline functionality.

One of the most important steps you can take is to record your customizations somewhere. Some will prefer the in-place documentation method of naming all customized records with a prefix such as [CUSTOM] or something more unique. Another approach is to track all changes on a global application which more clearly identifies all created and modified records than traditional update sets. Or you could simply opt for a risk register whether done on a custom ServiceNow table or in a simple spreadsheet. On a risk register, you would want to include the risk source, probability, severity, and some details around what actions to take if the risk manifests. When accepting risk, having a backout plan of sorts can be a great mitigation tool.

What you want to keep in mind is that the keys to mitigating threats on ServiceNow are isolating your changes from ServiceNow's baseline and limiting dependencies. Every interaction between your processes and ServiceNow's is a potential for something to go wrong. Even seemingly simple custom business rules can introduce infinite update loops in your process during upgrades that add new rules. Minimizing those interactions and limiting code dependencies can allow you to create customizations that last for years with little to no maintenance.

**(Slide 24) Step 4: Make a Decision**

The last step in our process is to make a decision. Once again, if you are familiar with change management's risk matrix then the matrix on this slide will be very familiar. The key difference if that we are comparing a calculated risk value for threats to a calculated risk value for opportunities for a given implementation decision. In other words, where a traditional matrix is evaluating two criteria (probability and severity), this matrix is resolving four criteria (threat probability, threat severity, opportunity probability, opportunity severity). This means we have to reduce the four criteria to two which can be done in a number of ways. A simple approach is (probability * severity) / 3 assuming you are using the probability / severity scoring on the previous matrix (rating from 1-3). But this is hardly the only option. The important part is to come up with some way of computing a risk score for both threat and opportunity. And of course one option, and honestly the one I use most frequently, is to SWAG it. In other words, guesstimate. As developers and architects, we are often presented with dozens of these decisions every day if not more. Evaluating every single risk can be tedious. Some risks require higher rigor and others less so. A little triage can go a long way to making decision making efficient.

**(Slide 25) Risk Gradient**

Something we can not overlook is that no two organizations are exactly alike. Every organization has it's own unique risk gradient. That is, it has a different threshold for accepting risk. Some organizations will have a low threat tolerance, represented by the leftmost chart on the slide. Others, like the one on the right are opportunity pursuers who will seize opportunity despite the threats. You will want to identify which gradient accurately defines your organization's preference for risk to reward ratio.

*Side note: I failed to include information about what the colors in the chart represent in the original presentation. In a simple gradient, you could use red and green to indicate accepting the risk plan or rejecting it. In a more robust gradient, you could seek to balance your risk portfolio. In other words, if I have 10 green implementation decisions, I can afford to take on 2 yellow. By setting percentages or thresholds you can seek to offset risks in certain implementation decisions with risks in others.*

**(Slide 26) Summary**

So to quickly recap the risk management process:

1. Identify the risk
2. Assess the risk
3. Plan risk response
4. Make a decision

My goal in presenting this process is not to prescribe a specific way of implementing it. Different organizations will have different needs regarding rigor. But hopefully this gives us a starting point from which we can begin to evolve the configuration vs customization conversation to a more effective risk management approach. Of course, this doesn't mean we need to throw out everything from the traditional approach that works. In fact, much of the presented process still includes more traditional recommendations. But we do want to begin to equip ourselves with a more comprehensive approach particularly in differentiating one customization from another.

**(Slide 27) Key Takeaways**

We've covered quite a bit in this presentation and honestly there was much more that I wanted to include. There is so much information around this topic we could discuss. If nothing else, I hope you takeaway the following points:

1. Every ServiceNow choice involves risk. That includes configurations.
2. Debating Configuration vs. Customization is of limited use. Most significantly it determines ServiceNow support's response to you.
3. Use a Risk Management process to make better decisions.

## Conclusion

I'd like to thank everyone who showed up to the session at Knowledge 19. We had great participation and it was a truly great experience. I hope everyone got the information they were hoping for but 30 minutes isn't much time when you're trying to completely flip a culturally embedded perception. I really look forward to continuing the conversation and diving into deeper, more technical discussions about implementation risks and how we can manage them more effectively. Feel free to jump in and share your thoughts, as I said during the live presentation: audience participation is highly encouraged!

[1]: https://hi.service-now.com/kb_view.do?sysparm_article=KB0553407
