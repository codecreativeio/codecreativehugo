---
years: "2021"
date: 2021-07-14 09:38:00
lastMod: 2021-07-14 10:03:00
author: tltoulson
url: /notebook/ui-builder-theming-basics
title: "UI Builder: Theming Basics"
socialImg: images/social.png
description: "Description of how themes work in ServiceNow's UI Builder Experiences"
"notebook/tags": ["UI Builder"]
---

**Purpose:** Description of how themes work in ServiceNow's UI Builder Experiences

## Setting Theme CSS Custom Properties

UI Builder Experiences use [CSS Custom Properties][1], a feature that is native to modern browsers. In UI Builder, these CSS Custom Property values are controlled by the UX Theme record's JSON value where each property in the JSON is used to set the CSS Custom Property in the page.

Using a web inspector, CSS Custom Properties can be identified beinging with two dashes "--*". Any of these properties appear to be configurable via the UX Theme record. For example, a variable named **--now-color--primary-o** as seen in the web inspector can be modified in the UX Theme json as follows:

```json
    {
        "--now-color--primary-o": "6,110,182"
    }
```

## Adding Custom Properties

Additional CSS Custom Properties can be added similar to custom variables in SCSS / SASS. For example, in the UX Theme JSON below, a custom property is created called **--codecreative-color** and it's value is used for both **--now-color--primary-o** and **--now-color--secondary-o**. This is an easy way to reuse styles across multiple components that don't currently share properties.

```json
    {
        "--codecreative-color": "0,0,0",
        "--now-color--primary-o": "--codecreative-color",
        "--now-color--secondary-o": "--codecreative-color"
    }
```

## Limitations

The following are currently known limitations or restrictions in the themes:

- Colors must be provided in RGB

[1]: https://developer.mozilla.org/en-US/docs/Web/CSS/--*