---
years: "2019"
date: 2019-01-18 11:30:11
author: tltoulson
url: /blog/whats-in-store-for-2019
title: "What's In Store For 2019"
socialImg: images/social.png
description: This year has already kicked off strong and there is a lot that is in the works!  Here's a few things you can expect and a few things I am considering on CodeCreative in 2019.
---

This year has already kicked off strong and there is a lot that is in the works!  Here's a few things you can expect and a few things I am considering on CodeCreative in 2019.

## Hugo, We Go!

The first big change of 2019 for CodeCreative was a migration from SquareSpace to a Hugo static site. SquareSpace is great if you use their themes but unfortunately I used a custom theme for CodeCreative. This caused issues during a minor update where I commented out an unused Prism.js plugin in my theme. The local dev environment worked fine but upon publishing to SquareSpace the site started outputting a bunch of junk data at the bottom of pages. Customer support was helpful but the experience made me realize that SquareSpace is better for designers than developers.

This led me to the wild world of static site generators and eventually [Hugo][1]. Hugo comes with support for sitemaps, RSS, and a number of other features baked in. I managed to setup a basic [Jekyll][2] theme much faster than Hugo but once I had a Hugo theme running I found I didn't really need anything else.

Hopefully, you've already noticed some of the minor visual updates and my favorite part: the site is **so much faster**.  And yes, the title of this section is a veiled reference to *Backdraft*... sorry about that.

## More Content and More Topics!

The best part about the change to Hugo is that it has oddly made writing content easier. Since I spend much of my day in the Atom editor anyway (it's also my notebook and code editor), it doesn't take much effort for me to simply add a new tab and stub out an article. I've already written and published 3 new articles this week to complete the Interface Design Patterns for Script Includes series:

* [Namespace Pattern][3]
* [Global Include Pattern][4]
* [Revealing Module Pattern][5]

Along with publishing more content, you may have noticed that the URL changed from **servicenow** to just **blog**. Whether reviewing tools, discussing processes, or discussing architectures and designs, not everything I write or want to write fits neatly into the ServiceNow package. That said, I will be breaking out some ways for you to subscribe to just the types of content you are interested in (for example, checkout the [Archive][6] and [Archive RSS (2019)][7]).

## Shutting Down Service Portal Crash Course

In 2018, I launched the Service Portal Crash Course using the Thinkific platform. During that time, over 1300 people have enrolled in the course! But Thinkific is ultimately a paid platform and I had to decide if paying for the platform made sense. Course completion rates paint a really wild picture (and yet for a MOOC, statistically normal). Some did in fact complete every single bit of the course (~2%). Some have completed a significant part of the course (~40%). The rest have enrolled but never quite got around to it. What is really interesting is that of those who have completed in part, most of them have jumped around the course taking the modules that are presumably most interesting to them.

Ultimately, the content was quite successful but the course delivery method does not justify the cost of the platform.

Don't worry, the course content will live on.  I will incorporate it into CodeCreative.io before shutting down the course this year, though it may take on a different form.  More details to come.

## Growing and Improving Mentorship

It's no secret that last year I began mentoring new ServiceNow developers on a one on one basis. Service Portal Crash Course was originally a set of scenarios that I emailed to one young developer interested in learning Service Portal, for example. I've also written countless other scenarios, set up learning roadmaps, and arranged for one on one sessions for would be ServiceNow Developers.

The challenges are managing time and maximizing impact.

I often ramp up and spin down mentorship effort as my work load changes. Not a great experience for mentees and even worse for those I turn away! Part of the solution is creating more reusable learning content to guide new comers. I don't think that is the only piece of the puzzle, though. Here are a few things I am considering:

* **Scenarios Page:** Create CodeCreative pages with scenarios / challenges at various skill levels based on actual work performed on ServiceNow.
* **Learning Paths Page:** Create a CodeCreative page that describes the different roles and specializations in ServiceNow development and administration with links and resources to help you get started.
* **Code Examples:** One of the things I miss about the ServiceNow Wiki is the rich repository of code examples. I'm considering creating a Docs for Developers on CodeCreative similar to what the Wiki used to be. APIs, where to use them, how to use them, and code examples.
* **More Self-Paced Courses:** Unlike the SP Crash Course, these will be smaller, more focused, and more modular. In a way, this may work in conjunction with the Wiki / Code Example idea.
* **Office Hours:** Instead of looking to do more video content, live webinars, etc, maybe the answer is as simple as setting aside an hour every other week and using Hangouts or something similar to just answer people's questions similar to how the Technical Partner Program does.
* **Live / Virtual Courses:** ServiceNow training is shall we say... cost prohibitive for most individuals. I wouldn't be able to offer certifications of course, but perhaps some good ol traditional training (not self-paced) would help some folks get their start.

## Wrapping It Up

Needless to say, there's a lot going on around here at the moment. Some of this may be done in conjunction with my team at [GlideFast Consulting][8]. Some may be my own after hours effort. Some may not happen at all. A good bit depends on you.

What do you think of shutting down the Crash Course and setting it up as a set of pages on CodeCreative?

Do you like the idea of expanding the content topics?

Like any of the mentorship ideas I presented? Got any ideas of your own?

Let me know!

[1]: https://gohugo.io/
[2]: https://jekyllrb.com/
[3]: /blog/interface-design-patterns-namespace-pattern
[4]: /blog/interface-design-patterns-global-include-pattern
[5]: /blog/interface-design-patterns-revealing-module-pattern
[6]: /years/
[7]: /years/2019/index.xml
[8]: http://glidefast.com
