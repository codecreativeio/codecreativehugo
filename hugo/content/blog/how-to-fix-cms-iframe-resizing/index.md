---
years: "2016"
date: 2016-05-03 16:00:00
author: tltoulson
aliases:
  - /servicenow/how-to-fix-cms-iframe-resizing
url: /blog/how-to-fix-cms-iframe-resizing
title: How to Fix CMS iFrame Resizing (Video)
description: Everyone has that one thing that makes them hate their job. And I don’t mean I’m just gonna stop going I hate my job. I mean I could set the building on fire I hate my job. For me, that thing is iFrames.

---

**Update (03/21/2017):** This script currently only works if the Frame Name on your iFrame is *gsft_main*. Thanks to Anil Varanasi for catching this!

<div class="videoWrapper">
  <iframe src="//www.youtube.com/embed/LIamM4gjsmY?wmode=opaque&amp;enablejsapi=1" height="480" width="854" scrolling="no" frameborder="0" allowfullscreen="">
  </iframe>
</div>

Everyone has that one thing that makes them hate their job. And I don’t mean I’m just gonna stop going I hate my job. I mean *[I could set the building on fire][1]* I hate my job. For me, that thing is iFrames. ServiceNow has given them a lot of love over the years but as the dubbed Portal Guy of my team I would like to see them in an episode of *[Will It Blend][2]*.

The iFrame resize issue resurfaces in nearly every version of ServiceNow in an [on again][3], [off again][4] fashion. For those paying attention, those two KB links alone account for Dublin, Eureka, Fuji, and Geneva. Hopefully the unveiling of Service Portal in Helsinki will render all this unnecessary. But for those still fighting the fight, here we go.

In order to understand the solution, it may first help to understand the real problem… the evil iFrame.

## HTML Document Flow

In a normal HTML page, blocks like paragraphs have a [natural flow][5]. That is, each block pushes subsequent blocks down the page. Think of each paragraph like a cardboard box containing its content, they naturally stack. You can also have container boxes, which normally have to be big enough to contain any boxes stacked inside. And in HTML, these are magic containers that expand their height to fit their contents, aren’t computers grand.

In HTML terms, this is how static positioning works for most blocks, except for iframes. The iframe retrieves its content from a separate URL and requires its height to be manually specified. If it isn’t big enough to contain your precious Catalog Order form, sorry, that content gets pushed into an area reachable only by an odd secondary scrollbar.

## ServiceNow’s (Fragile) Solution

ServiceNow gets around this limitation by providing a script that automatically calculates the size of an iframe’s contents and changes the size of the iframe. It is a very common trick used to outsmart the iframe by measuring the height of blocks inside the iframe. But as ServiceNow changes its UI, inevitably the script fails to accommodate those changes.

In Geneva, the latest of these changes was making some top level elements absolute positioned, not counting all height contributing nodes in the calculation, and by adding dynamic content (new AJAX based activity stream) that doesn’t trigger a calculation update. These are outside the scope of the current discussion, we can revisit those another time.

## The Fix

While I initially tried to hack in a direct fix for these issues, I found myself consistently thwarted and eventually settled on a single UI Script using a polling technique to recalculate the appropriate size of the iframe.

### Create a Global UI Script

<script src="https://gist.github.com/tltoulson/01236ca05273809e7ac3.js"></script>

That’s it. One step. For a more refined approach, you could make the UI Script non-global and manually embed it in your CMS Layout macros or as a dynamic block. But I find this approach works just as well and its only meant to be a workaround anyway, easy to plug in and easy to remove.

[1]: https://en.wikipedia.org/wiki/Office_Space
[2]: http://www.willitblend.com
[3]: https://hi.service-now.com/kb_view.do?sysparm_article=KB0546515
[4]: https://hi.service-now.com/kb_view.do?sysparm_article=KB0551949
[5]: https://css-tricks.com/the-css-box-model/
