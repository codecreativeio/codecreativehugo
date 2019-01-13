---
years: "2015"
date: 2015-05-18 16:00:00
author: tltoulson
aliases:
  - /servicenow/how-to-get-more-out-of-servicenow-pivot-tables
url: /blog/how-to-get-more-out-of-servicenow-pivot-tables
title: How to get more out of ServiceNow Pivot Tables (Video)
description: Sadly, High Charts does not offer a Pivot Table in ServiceNow. But there are two strategies that I have used for making Pivot Tables that have worked very well for me.  In this video, I cover the first of these strategies which allows you to minimize customization while getting more out of ServiceNow's native Pivot Table report.
---

<div class="videoWrapper">
  <iframe src="//www.youtube.com/embed/rzrhjR0NfCg?wmode=opaque&amp;enablejsapi=1" height="480" width="854" scrolling="no" frameborder="0" allowfullscreen="">
  </iframe>
</div>

So its time for the release of Code Creative Episode 2! I had a lot of fantastic followup questions from [How to Build Custom Charts and Reports][1] but the one that kept jumping out was "How do I do a Pivot Table?" In fact, this was a common question even before I released Episode 1 and your wish is my command. Sadly, though, High Charts does not offer a Pivot Table in ServiceNow. But there are two strategies that I have used for making Pivot Tables that have worked very well for me. In Episode 2, I cover the first of these strategies which allows you to minimize customization while getting more out of ServiceNow's native Pivot Table report. This method is so simple but surprisingly powerful.

And stay tuned for Episode 3 in which I will dig a little deeper into my bag of tricks and demonstrate a fully custom Pivot Table using a UI Page. Don't miss it! Put your questions in the comments and get it answered on Code Creative!

Original Question: [Custom Chart Scripts][2]

**Background Script:**

```js
var gr = new GlideRecord('incident');  
gr.query();  
while (gr.next()) {  
  gr.autoSysFields(false);  
  gr.setWorkflow(false);  
  var updatedDt = gr.sys_updated_on.getGlideObject(); // Get GlideDateTime object  
  gr.u_updated_date = updatedDt.getDate();  
  gr.u_updated_hour = (updatedDt + '').substr(11, 2) + ':00';  
  gr.update();  
}
```

**Business Rule:**

```js
function onBefore(current, previous) {  
  //This function will be automatically called when this rule is processed.  
  var updatedDt = current.sys_updated_on.getGlideObject(); // Get GlideDateTime object  
  current.u_updated_date = updatedDt.getDate();  
  current.u_updated_hour = (updatedDt + '').substr(11, 2) + ':00';  
}
```

[1]: /blog/how-to-build-custom-charts-and-reports
[2]: https://community.servicenow.com/message/777391#777391
