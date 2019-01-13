---
years: "2017"
date: 2017-02-22 18:00:00
author: tltoulson
aliases:
  - /servicenow/3-ways-css-widget-scopes-affect-service-portal-css
url: /blog/3-ways-css-widget-scopes-affect-service-portal-css
title: 3 Ways CSS Widget Scopes Affect Service Portal CSS
socialImg: images/social.png
description: Previously, we looked at CSS Widget Scopes in Service Portal. This change in how CSS is applied in Service Portal has a few implications for developers that we need to keep in mind when developing widgets and themes. 
---

[Previously][1], we looked at CSS Widget Scopes in Service Portal. This change in how CSS is applied in Service Portal has a few implications for developers that we need to keep in mind when developing widgets and themes.

## 1. Widget styles are protected from other widget styles

This one should go without saying from the previous article but a widget's CSS will only affect widget instances of that type. Each widget has its own prefixed CSS identifier which appears to be the letter "v" followed by the sys_id of the widget record, in case you are wondering. That class identifier isolates the scopes of each widget from all other widgets. For example, the Simple List's CSS will only affect instances of the Simple List. It won't accidentally make changes in the Type Ahead Search Widget or the Knowledge Article Widget.

This is awesome because it makes widgets much more portable than previously achievable in CMS. I could share a widget right here on Code Creative, you could install it on your instance and for the most part trust that it will look the same in your instance as it does in mine.

## 2. Widget styles are (mostly) protected from global styles

CSS is applied in a cascading way where more [specific selectors][2] will override less specific ones. Because Service Portal adds an extra class prefix to all the CSS, you automatically add a point for class specificity. As an additional bonus, it seems the Service Portal adds the widget CSS after the global CSS stylesheets in the rendered html. That means if a global style and a widget style both have the same specificity then the widget style will override the global one.

So for a global CSS to override the styles defined in the widget, the styles would have to include an ID (which are sparse in the Service Portal to begin with) or more CSS classes in the selector (inline styles are the only higher and those can't be applied by a global stylesheet).

So a global style that looked like the following would override a widget style:

```scss
/* Widget Style */
.panel {
  position: relative;
}

/* Would be overridden by a Global Style */
.col-md-4 .v7b121bb00f543200437109ece1050e57 .panel {
  position: absolute;
}
```

But a global style like the following would not:

```scss
/* Widget Style */
.panel {
  position: relative;
}

/* Would NOT be overridden by a Global Style */
.col-md-4 .panel {
  position: absolute;
}
```

Bottom line: You really have to go out of your way to override widget styles... unless of course the widget style is not explicitly defined.

## 3. Global styles are protected from widget styles

This may not seem readily apparent at first, but the scope prefix added to the CSS selectors also prevents a widget's CSS from affecting anything outside the widget. For example, a widget's CSS can not affect the **html** or **body** elements. To understand this better, lets take a look at what the output of a simple **html** selector:

```scss
.v7b121bb00f543200437109ece1050e57 html {
  margin: 0;
  padding: 0;
}
```

For those savvy with CSS, you immediately see the shield in effect. The **html** element is not a child of any element with the alphabet soup class (v7b121bb00f543200437109ece1050e57). The top level **html** element will not be selected and the CSS will not be applied. The same is true for any element (html, body, rows, columns, etc) that is outside of the widget's scope.

Even nested SCSS and media queries will result in a prefix:

```scss
/* The following widget CSS */
@media screen and (min-width: 480px) {
  html {
    margin: 0;
    padding: 0;
  }
}

html {
  body {
    margin: 0;
    padding: 0;
  }
}

/* Results in the following output in the browser */

@media screen and (min-width: 480px) {
  .v7b121bb00f543200437109ece1050e57 html {
    margin: 0;
    padding: 0;
  }
}

.v7b121bb00f543200437109ece1050e57 html body {
  margin: 0;
  padding: 0;
}
```

So widgets seem to have no loophole for manipulating global styles.

## Conclusion

So as you can see, there are a number of barriers in place to isolate and protect the different scopes of styles in Service Portal. While it is still possible to leak styles from global scope to widget scope, care should be taken to protect widgets. This will improve the modularity of your widget code and your Service Portal code and help ensure the reusability of both.

[1]: /blog/ways-service-portal-changes-css-with-scopes
[2]: https://css-tricks.com/specifics-on-css-specificity/
