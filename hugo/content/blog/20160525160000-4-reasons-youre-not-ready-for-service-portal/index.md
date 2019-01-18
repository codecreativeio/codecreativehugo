---
years: "2016"
date: 2016-05-25 16:00:00
author: tltoulson
aliases:
  - /servicenow/4-reasons-youre-not-ready-for-service-portal
url: /blog/4-reasons-youre-not-ready-for-service-portal
title: 4 Reasons You’re Not Ready For Service Portal
description: <p>The most common question I received at Knowledge 16 was “Should we stick with CMS or move forward with Service Portal.” As a developer I want to tell everyone to move to Service Portal if for no other reason than so I never have to touch an iframe ever again.</p>
---

<figure>
  <img src="images/browser-out-of-date.png" width="760" />
  <figcaption>
    To IE or not to IE, that is the question
  </figcaption>
</figure>

The most common question I received at Knowledge 16 was “Should we stick with CMS or move forward with Service Portal.” As a developer I want to tell everyone to move to Service Portal if for no other reason than so I never have to touch an iframe ever again. Aside from that, Service Portal is truly a much more refined delivery tool for portals and I can’t recommend it highly enough. But as a bit of an Oddball, [I like to feel like I can get out of trouble quicker than I got into it][1] so here are a few reasons you may not be ready for Service Portal and what you can do about it.

---

## 1. You’re not on Helsinki

For some this may be self explanatory but at Knowledge 16 I ran into a number of people who were not yet aware that Service Portal is not available prior to the Helsinki release. Depending on your level of customization, this upgrade could be easy to accomplish or you may be in for a considerable amount of testing and debugging. Either way, today is not your day. Additionally, this is a pretty good sign that you will encounter another one of the issues below.

**Solution:** Upgrade to Helsinki as soon as you reasonably can, it’s worth it.

---

## 2. You or your customers still use IE9 or below

<figure>
  <img src="images/service-portal-ie9.png" width="800" />
  <figcaption>
    What every Service Portal looks like on IE9
  </figcaption>
</figure>

In a most heartbreaking turn of events, Service Portal does not support IE9 or below. This is not new for ServiceNow as most of their AngularJS based pages, such as Knowledge v3, are ditching older browsers. There are different reactions to this. While market share of IE9< continues to fall, many business still require it’s support whether due to policy or customer requirements. In fact, as a CMS developer for the last few years, I can recall at most one customer that said that ‘modern browsers only’ was fine.

Progressive enhancement and graceful degredation have been core to most modern web development practices but sadly ServiceNow chose neither approach for Service Portal. Not even a link to [browser-update.org][2].

On the upside, this means that more browser features are available as a developer and I don’t have to worry about nearly as many IE quirks. But for the customer this may pose a problem.

**Solution:** Use Chrome. Use Firefox. Use Opera. Have your customers call me and I will personally install the browser of their choice on their machine.

---

## 3. You aren’t using mobile friendly Client Scripts

[Previously][3], I mentioned that I was unable to get Client Scripts to work for Service Catalog or Native forms. Well, this is because Service Portal is using a similar (if not the same) GlideForm implementation as the AngularJS based Mobile interface. In other words, you have to mark Client Scripts and UI Policy scripts to run on Mobile or Both for them to show up in Service Portal. Desktop only scripts will not run in Service Portal.

Some of you may be thinking “great, I will just flip the dropdown from Desktop to Both and be on my way.” Not so fast, there trigger happy. Mobile Client Scripts are more restrictive in a number of ways. Here is a brief list of the things you need to fix:

* Remove DOM Manipulation such as $, $$, or $j calls
* Remove calls to window or document objects
* Remove deprecated calls such as getControl, getFormElement, getElement
* Replace synchronous GlideAjax and getReference calls with asynchronous versions
* Replace any function calls not available on [Mobile GlideForm][4]

For those following along, yes, you have to check every Client Script and UI Policy script that will be used in the portal.

**Solution:** ServiceNow used to perform a scan with the ACE tool that could find these issues automatically. I believe it is a paid solution now but could be worth the time savings and accuracy. Otherwise, pair up with someone who has done this rodeo a time or two. Finding these issues is one thing, fixing them can be quite another. And I’m not even giving that one a shameless disclaimer.

---

## 4. You’re Service Catalog isn’t ready yet

Service Catalog in Service Portal doesn’t cover all the same edge cases as the native Service Catalog. The catalog cart for example does not seem to be present in the Service Portal yet and Order Guides do not behave the same. Notably, the Order Guide tabs are never displayed so you can’t enter variables onto items in the Order Guide. Overall the experience is geared toward smaller items with fewer options and one click ordering.

This may change over time but for now, you may need to do some catalog work to make it fit.

**Solution:** Change the catalog to fit the Service Portal or create widgets in the Service Portal to fit your catalog.

---

All things considered, most should find these drawbacks easy to work around and the benefits of Service Portal far outweigh any downside. The important thing is to make sure you are ready to make the move and to make sure your team and your partner are equipped to support your transition.

[1]: https://www.youtube.com/watch?v=dFGFCt-oHC0
[2]: https://browser-update.org/update.html
[3]: /blog/service-portal-first-impressions
[4]: http://wiki.servicenow.com/index.php?title=Mobile_Client_GlideForm_%28g_form%29_Scripting#Do_Not_Reference_Unsupported_Browser_Objects
