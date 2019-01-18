---
years: "2017"
date: 2017-01-25 17:00:00
author: tltoulson
aliases:
  - /servicenow/4-things-to-do-before-building-a-service-portal
url: /blog/4-things-to-do-before-building-a-service-portal
title: 4 Things to Do Before Building a Service Portal
description: I have spent quite a bit of my time evangelizing Service Portal as well. But Matt's recent post made me realize that folks may be missing an important thing about Service Portal. It's no substitute for good application design.
---

<blockquote>
  But at the end of the day, if you have a form with 100 fields that are all mandatory to be filled out before a Catalog Item can be submitted, that’s not a [Service Portal] issue.
  <footer>
    Matt Metten
  </footer>
</blockquote>


[This][1]. Read that. All of that. YES! ("I love quick time harch.") I read that, I clicked endorse, then I wrote this. So go read that.

I have spent quite a bit of my time evangelizing Service Portal as well. But it wasn't until I read through Matt's list of things that he loves about Service Portal that I realized... everything I love about Service Portal is for developers.

I could and did accomplish fully responsive sites with attractive, modern UI's and even some with no iframes using CMS. No Iframes? CMS? YES! CMS is a very powerful tool especially in the right hands and with the right budget. Service Portal just makes developing those things so much easier and so much cheaper.

But neither CMS nor Service Portal are a solution for poor application design. So lets take a look at a few things you can do before you invest in that new Service Portal to help ensure its success.

---

## 1. Simplify your Catalog Items

While working with a client on their first CMS, we encountered an issue where page load times were hitting in the 8-10 second range (if I remember correctly). Imagine, you click on a link and 10 seconds later you get to the page. Can you say 'browser back'? The results were shocking because the CMS was composed of a simple header and an iFrame. Upon further investigation, we discovered that the Catalog Item being accessed through the iframe accounted for something to tune of 90%+ of the load time. It was loaded with variables, client scripts, and UI Policies.

Even if we could keep the Catalog Item intact and cut the page load to a more acceptable timeframe, there is still the little problem of conversion rate. I find this term to be underused in enterprise portal development as compared to public portal development.

In public websites, we've known for a long time that long forms drive down conversion rates. People will just ignore the form and go about their day. In enterprise world, that means a phone call, email, or walk up to the help desk. The very thing your portal is supposed to reduce. There are many strategies to use including breaking up larger items into many smaller items, creating predefined packages, eliminating desired but unnecessary fields, etc.

However you go about it, simplify those forms.

## 2. Simplify your security

The most common defect I see in portal development is this: "User x can not see record y in the portal". Unfortunately, when you are building the portal is not the best time to discover this. ACL's and UI Action conditions exist in the application but additional conditions can occasionally exist in your portal code. Therein lies the problem. Once you have portal code, there are more potential sources for the defect. Make sure your application security is working as desired before bolting on a portal.

Along the same lines, if your security rules resemble the requirements to perform an apocalyptic dark ritual, you might want to revisit these before you build a portal. You know the ones I'm talking about. The chosen user can see the record on the third Tuesday under a blood moon after the year of the goat so long as he/she has passed the three trials. With complex requirements such as these, it can be very difficult to answer the question "Why can't user x see record y". I can not tell you how many of these defects I've seen that had a resolution that described what requirement User X failed to meet... in other words there was no defect... after hours of troubleshooting.

You can save a pretty penny on testing and remediation by simplifying your end user security and by testing it early and often. Don't wait until the portal is built.

## 3. Invest in your Knowledge Base

The primary reason most organizations want a Service Portal is for self service. There is this ideal where incidents and service requests that require little interaction from the help desk are deflected away from the help desk. But heres the thing, a Service Portal can't do that. Think of a portal as a window into your Service Now applications. If the window is well built and clean, your content is displayed front and center in all its glory. If the window is dirty and cracked, your content won't be able to shine.

But if your content is dirty and busted, the window can be as clean and perfect as it wants... you'll still only see busted content. So invest some time in building your Knowledge strategy. How do you determine which articles are best? How do you identify which articles are primed for retirement? How do you find gaps in your knowledge base and who do you leverage to fix those gaps?

Think about the ServiceNow Community, ServiceNow Guru, \*ahem\* Code Creative. What are the things you enjoy about those sources of knowledge? What are the things you don't like (Feel free to use the contact form, Twitter, or LinkedIn to let me know)? Leverage this information to build out your content effectively.

## 4. Understand how your portal is / will be used

I have only ever had one enterprise client ask about analytics for the portal. It's honestly the most surprising thing about my job. When developing non-ServiceNow portals, everybody wants google analytics or some sort of bean counter in there to measure the success of the portal. Some folks have no idea what they want to measure but they know they want to measure it. How long were users on a page? Did they read to the bottom? Did they click on any links? What were the search terms they used?

My enterprise customers on the other hand have only once asked those questions even while I was building Incident, Problem, and Change Management CIO Dashboards. It just throws me off.

But just like with Incident, Problem, and Change processes, portal is a process unto itself and can be measured. Service Portal has even introduced a nice way to collect various stats in your widgets. So its important to start asking yourself, what defines a successful portal to you. If you have to, go back to Matt's post that I linked to above, he's got some good questions on there.

---

## Conclusion

Service Portal is beautiful and has so much potential to make great user experiences and to push the envelope of what ServiceNow can do. But it will also put neon lights around every deficiency in your applications. Don't expect Service Portal to be a silver bullet. A user interface can only be as good as the application it serves.

More importantly, [Matt's right][2]. [Listen to Matt][3].

[1]: https://community.servicenow.com/community/develop/blog/2017/01/17/service-portal-is-not-a-solution
[2]: https://community.servicenow.com/community/blogs/blog/2014/09/23/don-t-take-user-experience-personally
[3]: https://community.servicenow.com/community/blogs/blog/2014/08/06/one-front-door
