---
years: "2019"
date: 2019-08-06 16:22:11
author: tltoulson
url: /blog/time-zones-why-you-punish-me
title: "Time Zones: Why You Punish Me"
socialImg: images/social.png
description:
---

Hootie captured my current frustrations about time best, *I think I'm out of my mind / thinking about time*. That reference is apparently about 24 years old... enough time for Hootie to become Darius, cycle through R&B and Country before circling back to the Blowfish he left in the Cracked Rear View so long ago. But that's not the time I'm talking about today.

No my friends, today it's all about Time Zones in ServiceNow. Time is one of my least favorite data constructs to work with. Sure, on the surface it seems simple, harmless even. But as some members of my team discovered, there can be a whole lot of *pain and sorrow running free* when it comes to working with time zones (particularly in Service Portal and Custom UIs).

## Who's Time is it Anyway

The big error many developers make is thinking about time and time zones as relative to our own physical location. This turns out to be a huge oversimplification. In fact, in the simplest case, there are at least 5 potential time zones to consider:

### UTC

[Coordinated Universal Time][1] is the big time standard. ServiceNow stores date and time objects internally in the database in this time zone as the number of ms since 1970-01-01 00:00:00.

### System Time Zone

The system time zone is the one ServiceNow stores in the glide.sys.default.tz System Property (System Properties > Basic Configuration). When the API documentation refers to system time zone, this is the one that it means (such as with GlideDateTime's getValue function). It is also used as a User's default local time zone.

### User's Profile Time Zone

The user's profile time zone is referred to as the user's time zone or local time zone in the API documentation. For disambiguation, I will refer to it as the user's profile time zone. This is because it is specified on the User's sys_user record as part of their profile. The value defaults to the system time zone.

This time zone is the one used in all GlideDate and GlideDateTime fields. So when a user updates a date time selection on a form, this is the time zone that ServiceNow assumes.

### Browser Time Zone

When using AngularJS or MomentJS style date and time formatting libraries, they know nothing about ServiceNow's time zone properties. As such, they by default assume the time zone of the computer and browser being used. It's important to note that this is NOT the same as the user's profile time or the user's physical location.

This is the timezone the computer believes itself to be in as displayed on it's clock.

### Users Physical Location

This is the time zone we all assume most of the time, the physical location of the user.

## ServiceNow Time Zone Conversions

So why do I highlight each of these distinct time zones? First and foremost, to show that there is a lot of both explicit and implicit time zone converting going on.

<figure>
  <img src="images/ServiceNow Time Zone Conversions.png" />
  <figcaption>
    ServiceNow Time Zone Conversions
  </figcaption>
</figure>

For example, take a scenario where you have two users as in the image above. Each user has their own profile, browser, and physical time zones creating assumptions regarding how the system should operate. If User B was traveling to a location in a time zone outside of their profile's time zone. Depending on their laptop and network connectivity, their browser time zone could be in sync with either the profile time zone, their physical time zone, or potentially neither.

Which time zone is the right one to use? It's hard to say but I'm going to go with whichever one the users tell you when they kick your story back during acceptance testing!

What's truly interesting is that it doesn't even take two users to create confusion. In the scenario my team was troubleshooting, we had the following:

Time Zone Configuration:
- System - UTC
- User profile - UTC
- Browser / Physical - CST

What happened:
- User set a record start to 08:00
- User navigated to portal and saw 03:00
- User reported a time zone defect

If you look closely, you'll notice that CST is UTC -5 and that's the exact gap between the written time and the read time. You see, our widget used getNumericValue to obtain the UTC value but then processed it through AngularJS's formatters to render the time in the browser's time. In this case, the code was correct but the user still had unexpected results. In this case, I'd call the unexpected results a good thing because they highlighted an issue in the underlying system configuration. Oddly, this is something we likely would not have caught it if we had used the user profile time instead of browser time.

## Helpful Tips

Look, time zones can be hard. I remember when posting blog articles on the ServiceNow Community and it would show some wild post times because my profile was wonky. ServiceNow does a lot to simplify working with time zones in their API and following a few simple tips can reduce the number of bugs:

Writing Date Times:
- Use the GlideDateTime API
- Don't mix and match value and display value in the same operations. If you getDisplayValue, use setDisplayValue.

Formatting Date Times:
- When in doubt use getDisplayValue
- When custom formatting, try to leverage a library like MomentJS and use GlideDateTime's getNumericValue function to provide the library a value it can use

Most of all, keep in mind which time zones are doing the writing, which are doing the reading, and which your user expects to see.

Keep it simple, let ServiceNow do the work, and maybe you can avoid *wasting, wasting, wasting time* troubleshooting.

[1]: https://en.wikipedia.org/wiki/Coordinated_Universal_Time
