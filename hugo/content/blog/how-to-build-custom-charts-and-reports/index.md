---
years: "2015"
date: 2015-05-04 16:00:00
author: tltoulson
aliases:
  - /servicenow/how-to-build-custom-charts-and-reports
url: /blog/how-to-build-custom-charts-and-reports
title: How to Build Custom ServiceNow Charts and Reports (Video)
socialImg: images/social.png
description: This video demystifies a fairly advanced scripting technique that I have used to achieve some pretty amazing charts in the past in ServiceNow. Using a UI Page combined with ServiceNow's built in version of HighCharts produces some great results.
---

<div class="videoWrapper">
  <iframe src="//www.youtube.com/embed/fOQwpFkcTZs?wmode=opaque&amp;enablejsapi=1" height="480" width="640" scrolling="no" frameborder="0" allowfullscreen="">
  </iframe>
</div>

The ServiceNow Community can be a tough place to communicate without winding up with a wall of intimidating technical text. Add to that the gaps in technical knowledge and understanding as well as differences in jargon and we often end up with walls of text and frequent churn in the comments in order to arrive at a solution. Thankfully, the Community offers some great rich media features like videos! With that in mind, I am very excited to kick off the a new webcast series called Code Creative! With Code Creative, I will have the opportunity to answer questions by demonstrating techniques rather than just explaining them.

I have been kicking around the idea of starting a webcast series dedicated to answering Community questions for a while and found the perfect opportunity with a question from [vaigai.kothandaraman.][1] In Episode 1, Vaigai wants to know how to create custom reports when the native reporting engine is unable to provide the right look and feel and I demonstrate a technique using HighCharts and a UI Page to wield absolute control over the data and the final report. This video demystifies a fairly advanced scripting technique that I have used to achieve some pretty amazing charts in the past and by the end I am sure the community will come up with some even more amazing ones!

I hope you enjoy the video and I look forward to answering your questions in future episodes!

Original Question: [Custom Chart Scripts][2]

Additional Charting Resources:

- [Using UI Pages as Gauges - ServiceNow Wiki][3]
- [http://www.highcharts.com/][4]

Another Option for Custom Charts using the Legacy JFreeChart

- [Custom Chart Actions - ServiceNow Wiki][5]
- [Custom Chart Definitions - ServiceNow Wiki][6]
- [Custom Chart Rendering - ServiceNow Wiki][7]

Here is the UI Page used in the video:

```xml
<?xml version="1.0" encoding="utf-8" ?>  
<j:jelly trim="false" xmlns:j="jelly:core" xmlns:g="glide" xmlns:j2="null" xmlns:g2="null">  
    <script type="text/javascript" src="/scripts/GlideV2ChartingIncludes.jsx?v=10-19-2014_0741"></script>  
    <g2:evaluate>  
        var openQuery = 'stateIN1,2,3,4,5',  
            resolvedQuery = 'state=6^resolved_atONToday@javascript:gs.daysAgoStart(0)@javascript:gs.daysAgoEnd(0)',  
            closedQuery = 'state=7^closed_atONToday@javascript:gs.daysAgoStart(0)@javascript:gs.daysAgoEnd(0)',  
            allQuery = 'stateIN1,2,3,4,5^NQstate=6^resolved_atONToday@javascript:gs.daysAgoStart(0)@javascript:gs.daysAgoEnd(0)^NQstate=7^closed_atONToday@javascript:gs.daysAgoStart(0)@javascript:gs.daysAgoEnd(0)',  
            ga,  
            categories = [],  
            series = [];  


        // Setup Categories  
        var ga = new GlideAggregate('incident');  
        ga.addEncodedQuery(allQuery);  
        ga.addAggregate('COUNT');  
        ga.groupBy('location');  
        ga.orderBy('location');  
        ga.query();  
        while (ga.next()) {  
            categories.push(ga.location.getDisplayValue() + '' || '(empty)');  
        }  


        // Reusable function for building the 3 Series  
        function getSeries(name, index, query, categories) {  
            var ga = new GlideAggregate('incident'),  
                data = [],  
                i,  
                cat;  


            // Fill data with 0's  
            for (i = 0; i != categories.length; i++) {  
                data.push(0);  
            }  


            ga.addEncodedQuery(query);  
            ga.addAggregate('COUNT');  
            ga.groupBy('location');  
            ga.orderBy('location');  
            ga.query();  
            while (ga.next()) {  
                // Find category index  
                for (i = 0; i != categories.length; i++) {  
                    cat = ga.location.getDisplayValue() + '' || '(empty)';  
                    if (categories[i] == cat) {  
                        break;  
                    }  
                }  


                data[i] = ga.getAggregate('COUNT') * 1;  
            }  


            return { 'name': name, 'legendIndex': index, 'data': data };  
        }  


        // Add the 3 series to an array for output  
        series.push(getSeries('Open', 0, openQuery, categories));  // Add Open Series  
        series.push(getSeries('Resolved', 1, resolvedQuery, categories)); // Add Resolved Series  
        series.push(closedSeries = getSeries('Closed', 1, closedQuery, categories)); // Add Closed Series  


        // JSON encode the series and categories.  The JSON strings will be embedded with a JEXL expression into the client side code  
        series = new JSON().encode(series);  
        categories = new JSON().encode(categories);  
    </g2:evaluate>  
    <table class="wide"><tr><td align="center">  
        <div id="custom_report" class="highcharts-container" style="position: static; overflow: hidden; width: 650px; height: 450px; text-align: left; line-height: normal; z-index: 0; font-family: 'Lucida Grande', 'Lucida Sans Unicode', Verdana, Arial, Helvetica, sans-serif; font-size: 12px;"></div>  
    </td></tr></table>  
    <script type="text/javascript">  
            var chart1 = new Highcharts.Chart({  
                chart: {  
                    renderTo: 'custom_report',  
                    type: 'column'  
                },  
                title: {  
                    text: null  
                },  
                xAxis: {  
                    categories: $[categories],  
                    title: {  
                        text: null  
                    },  
                    labels: {  
                        rotation: -45  
                    }  
                },  
                yAxis: {  
                    min: 0,  
                    title: {  
                        text: null  
                    }  
                },  
                series: $[series]  
            });  
    </script>  
</j:jelly>
```

[1]: https://community.servicenow.com/people/VAIGAI.KOTHANDARAMAN
[2]: https://community.servicenow.com/thread/181930
[3]: https://community.servicenow.com/external-link.jspa?url=http%3A%2F%2Fwiki.servicenow.com%2Findex.php%3Ftitle%3DUsing_UI_Pages_as_Gauges%23gsc.tab%3D0
[4]: https://community.servicenow.com/external-link.jspa?url=http%3A%2F%2Fwww.highcharts.com%2F
[5]: https://community.servicenow.com/external-link.jspa?url=http%3A%2F%2Fwiki.servicenow.com%2Findex.php%3Ftitle%3DCustom_Charts_Plugin%23gsc.tab%3D0
[6]: https://community.servicenow.com/external-link.jspa?url=http%3A%2F%2Fwiki.servicenow.com%2Findex.php%3Ftitle%3DCustom_Chart_Definitions%23gsc.tab%3D0
[7]: https://community.servicenow.com/external-link.jspa?url=http%3A%2F%2Fwiki.servicenow.com%2Findex.php%3Ftitle%3DCustom_Chart_Rendering%23gsc.tab%3D0
