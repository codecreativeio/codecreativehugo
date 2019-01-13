---
years: "2015"
date: 2015-06-01 16:00:00
author: tltoulson
aliases:
  - /servicenow/how-to-make-custom-pivot-tables
url: /blog/how-to-make-custom-pivot-tables
title: How To Make Custom Pivot Tables in ServiceNow (Video)
description: Well, it seems that pivot tables are just a little bit popular in community and while sometimes native pivot tables will suffice, there are times when custom is the only route to take. The technique covered in this video can be used to build nearly any pivot table imaginable!
---

<div class="videoWrapper">
  <iframe src="//www.youtube.com/embed/vugEPqdO8pE?wmode=opaque&amp;enablejsapi=1" height="480" width="854" scrolling="no" frameborder="0" allowfullscreen="">
  </iframe>
</div>

Well, it seems that pivot tables are just a little bit popular in community and while sometimes native pivot tables will suffice, there are times when custom is the only route to take. Sadly, these pivot table questions have all too often gone unanswered or answered with the dreaded "You can't do that out of box". Well no more. The technique covered in Code Creative Episode 3 can be used to build nearly any pivot table imaginable! Here is just a sample of the questions I could find that this might benefit:

<br>

"I was wondering how you active the 'grid' section to show the count and percentage in text below the bars?"

\- [david.hreben][1] ([How to Build Custom Charts and Reports][2])

<br>

"We can create "Pivot Table" using HighCharts API? I went through the HighCharts plotOptions. Didn't find anything there."

\- [ProbirDas][3]

<br>

"A requirement came up to create a report very similar to a pivot table, however, with multiple columns for the rows field."

\- [raulron][4] ([Pivot table with multiple "row" columns][5])

<br>

"Has anyone create report of Incident Category by Month in a Pivot Table format such as followed?"

\- [alex.ng@itapps.com][6] ([Pivot table - Incident Category by Month report][7])

<br>

"Has anyone created report for number of created incidents per hour in a Pivot Table using custom charts format such as followed?:"

\- [VAIGAI.KOTHANDARAMAN][8] ([Custom Chart Scripts][9])

<br>

"This works perfect for presenting the results, just what I need, except the pivot report totals the rows and columns, which I don't particularly care for, since the metrics might be amount of users and another mailbox space used, these two values don't really mean anything added up."

\- [williamsun][10] ([Can you remove the totals from the pivot table reports?][11])

<br>

"Does anyone know how to a pivot table report with more than one column within ServiceNow? (see example attached).

All of the records and information needed comes from the same source table."

\- [apriled][12] ([Advanced Reporting (Pivot Table) Question][13])

<br>

And here's the code:

```xml
<?xml version="1.0" encoding="utf-8" ?>  
<j:jelly trim="false" xmlns:j="jelly:core" xmlns:g="glide" xmlns:j2="null" xmlns:g2="null">  
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
        series.push(getSeries('Opened Currently', 0, openQuery, categories));  // Add Open Series  
        series.push(getSeries('Resolved Today', 1, resolvedQuery, categories)); // Add Resolved Series  
        series.push(getSeries('Closed Today', 1, closedQuery, categories)); // Add Closed Series  
    </g2:evaluate>  
  <style>  
        .my-table {  
            color: #485563;  
        }  


  caption.my-tables {  
            font-weight: bold;  
            font-size: 2em;  
            margin-bottom: .75em;  
        }  


        th.my-table-h {  
            text-align: center;  
            width: 10em;  
            padding-bottom: 1em;  
        }  


        td.my-table-td {  
            text-align: center;  
            font-size: 1.25em;  
            padding: .5em .5em;  
        }  


        td.my-table-td:hover {  
            font-size: 1.75em;  
        }  


        td.my-row-h {  
            font-weight: bold;  
            text-align:right;  
        }  


        tr.my-row {  
            border-radius: .5em;  
        }  


        tr.my-row:hover {  
            background-color: #f3f3f3;  
        }  
  </style>  
  <table class="wide my-table">  
    <caption class="my-tables">Incident Status Update</caption>  
    <tr>  
      <th></th>  
      <j2:forEach items="$[categories]" var="jvar_cat">  
        <th class="my-table-h">$[jvar_cat]</th>  
      </j2:forEach>  
    </tr>  
    <j2:forEach items="$[series]" var="jvar_series">  
      <tr class="my-row">  
        <g2:evaluate jelly="true">  
          var curSeriesName = jelly.jvar_series.name;  
          var curSeriesData = jelly.jvar_series.data;  
        </g2:evaluate>  
        <td class="my-table-td my-row-h">$[curSeriesName]</td>  
        <j2:forEach items="$[curSeriesData]" var="jvar_val">  
          <td class="my-table-td">$[jvar_val]</td>  
        </j2:forEach>  
      </tr>  
    </j2:forEach>  
  </table>  
</j:jelly>
```

[1]: https://community.servicenow.com/people/david.hreben
[2]: https://community.servicenow.com/blogs/CodeCreative/2015/05/04/episode-1--how-to-build-custom-charts-and-reports
[3]: https://community.servicenow.com/people/ProbirDas
[4]: https://community.servicenow.com/people/raulron
[5]: https://community.servicenow.com/message/722602#722602
[6]: https://community.servicenow.com/people/alex.ng@itapps.com
[7]: https://community.servicenow.com/message/746480#746480
[8]: https://community.servicenow.com/people/VAIGAI.KOTHANDARAMAN
[9]: https://community.servicenow.com/thread/182000
[10]: https://community.servicenow.com/people/williamsun
[11]: https://community.servicenow.com/message/716371#716371
[12]: https://community.servicenow.com/people/apriled
[13]: https://community.servicenow.com/message/728786#728786
