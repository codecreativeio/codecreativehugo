---
years: "2017"
date: 2017-03-22 17:30:00
author: tltoulson
aliases:
  - /servicenow/6-best-practices-for-service-portal-css
url: /blog/6-best-practices-for-service-portal-css
title: 6 Best Practices for Service Portal CSS
socialImg: images/social.png
description: When developing Service Portal styles for either the Theme or the Widgets, there is more to think about than there used to be in CMS. Service Portal offers greater modularity to protect our Widgets from our Themes and vice versa.  Read on for 6 best practices to follow when coding the CSS for your Service Portal to keep your CSS maintainable and flexible.
---

When developing Service Portal styles for either the Theme or the Widgets, there is more to think about than there used to be in CMS. Service Portal offers greater modularity to protect our Widgets from our Themes and vice versa. Below are 6 best practices (they're more what you'd call guidelines than actual rules) to follow when coding the CSS for your Service Portal to keep your CSS maintainable and flexible.

## 1. Avoid common widget classes in global CSS styles

Service Portal is based on Bootstrap, so there are a number of readily available classes with certain stylings. Service Portal is also very modular, so all the real power is in the widgets and many of those Bootstrap classes are likely to appear in your widgets.

You can easily end up breaking widgets, especially if you are manipulating layout styles

<aside class="ccPullQuote right w-50">
  <p>You can easily end up breaking widgets, especially if you are manipulating layout styles</p>
</aside>

With those things in mind, you should avoid manipulating classes such as those relating to panels, wells, forms, alerts, and other [bootstrap components][1]. Changes to any of these components are likely to leak into all of your widgets unless they have explicitly defined styles.

You can easily end up breaking widgets, especially if you are manipulating layout styles such as margin, padding, position, etc.

## 2. Avoid long, high specificity selectors in global CSS

The key to global CSS (such as CSS Includes on your Theme or Portal records) is to minimize specificity. You **want** your global CSS to be able to be overridden easily. The global CSS should provide reasonable defaults for the rest of the portal.

This means that selectors that provide a "Complete Idiots Guide to Finding This Element" are probably a bad idea. My ideal happy place is 2 - 3 selectors deep. Since widget styles are guaranteed to be 2 selectors deep ([remember CSS scoping][2]), keeping global scopes to 2 - 3 selectors deep will limit the opportunity for global styles to accidentally override your widgets.

This also includes avoiding the use of the **!important** declaration in global styles which basically honey badgers selector specificity.

In other words, this is a bad idea:

```css
html body #first-row .col-md-4 .panel {
 /* Yep, your widget just got overridden */
}
```

## 3. Keep global styles to a minimum

In fact, while we're at it, just plain keep your global styles to a minimum. The power in Service Portal is in the widgets so you should keep it there, including styles.

Service Portal is based on Bootstrap JS, variables are available to manipulate many of Bootstrap's defaults, and layout is already provided... there are very few Global edits that need to be made. Here are the few examples of when you should use global styles:

* Overriding Bootstrap defaults where variables aren't provided
* Using CSS Includes to add required external CSS libraries (PrismJS for Code Highlighting for example)
* Providing custom layouts using Flexbox or other approach (requires disabling Bootstrap layout classes)

But in any of these cases, there should be a very narrowly defined class selector you can use which is unlikely to be used by a widget or can be easily overridden.

```css
/* Unlikely to be used */

#leftNavigationPanel {
  display: flex;
}

/* Easy to override */

.wrapper {
  display: flex;
}
```

## 4. Explicitly define vital CSS classes for widgets

As widget developers, we can not always trust the theme to respect our authoritah. Some selectors may seem innocuous to a theme developer but can be quite harmful to widgets. For example:

```css
.panel-heading {
  padding: 10px 2em;
}
```

The above CSS doesn't look so bad. Maybe the theme is designed to give a little more whitespace all around, nothing wrong with that. Unless of course your widget was expecting to have that additional width to work with, then it might be a problem.

In these cases where you widget only works within the defined parameters, don't trust the theme to honor your styles. Go ahead and explicitly define the required styles right there in your widget CSS. Heck, in widgets go ahead and throw around the **!important** declaration if your are really concerned. Service Portal CSS scopes will keep your declaration isolated to only your widget.

## 5. Avoid hardcoding colors in Widgets

One potential issue is text and background colors. Base colors are often defined in Bootstrap and at the theme level in the global scope. In order to make truly flexible widgets, they should support changing according to the selected theme colors.

One way to style the colors in your widget is to hard code the value in hex or rgb within the Widget CSS. Avoid the temptation to do this. Instead leverage SCSS variables as in the following example:

```scss
/* Widget CSS - SCSS */
$specialColor: #FFF !default;

.panel span {
  color: $specialColor;
}
```

Notice the variable specialColor is declared with the **!default** keyword. This tells the SCSS preprocessor to **#FFF** as the default color only if the variable was not previously assigned... such as in the Portal SCSS field. By using variables in this way, you set sensible defaults in your Widget while allowing for simple overriding without having to raise the specificity of your selectors in your global CSS.

You can also use Widget Options, especially in cases where there are specific values you want to allow and others that you want to disallow. This approach is a little more complicated but can achieve the same results of protecting your Widget styles from your global ones.

## 6. Avoid using ID's

I used to like ID's a lot but the more I use AngularJS, the less I actually need them. In Service Portal there is almost no reason to use them.

In widgets, ID's are pointless because an ID is only supposed to appear once in your HTML document. Widgets, by design, can have multiple instances on any given page, so its difficult to ensure an ID will only appear once.

In global CSS, even just one ID can tip the specificity scales in the CSS and override widget styles. Following the other best practices, it is likewise best to keep ID's in the global CSS to a minimum.

The one exception to this that I can think of is dynamically applied ID's using ng-attr-id.

## Conclusion

When in doubt, if you are styling a widget, code like a lion, fear nothing and be as specific as you can. If you are styling the theme, code like a lamb, avoid anything which might influence the Widget code. Following these guidelines will help keep your widgets modular, reusable, and true to their design.

[1]: http://getbootstrap.com/components/
[2]: /blog/what-are-css-widget-scopes-in-service-portal
