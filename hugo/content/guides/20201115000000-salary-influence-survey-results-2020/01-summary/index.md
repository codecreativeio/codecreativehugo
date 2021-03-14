---
date: 2021-03-14 14:40:00
author: tltoulson
url: /guides/servicenow-salary-influence-survey-2020/summary
title: Summary
socialImg: social.png
description: The summary of key findings in the survey results.
weight: 100
---

The 2020 ServiceNow Salary Influence Survey was an openly published survey that ran from  September 08, 2020 through October 05, 2020 with the purpose of improving the ServiceNow community's understanding of compensation in the industry. The analysis attempted to identify which features of an individual's profile most significantly influenced compensation as well as provide the more traditional compensation tables to assist members of the ServiceNow community in determining their worth. The survey analyzed over 1700 different variations in the features generated from the 182 questions / survey inputs in the attempt to identify causes of compensation variation. The following pages of the document describe detailed findings and descriptions of the data collection, processing, and analysis.

The source code for the tool used to perform the analysis can be found [here][2].

## Summary of Findings

When discussing compensation, there are a number of competing thoughts regarding what drives value, many of which have worked their way into common phrases. "Hard work pays off" speaks to the idea that those who earn more, work more. "Work smarter, not harder" contradicts this advice by speaking to the power of skill and intellect to create more value with less effort and time. "With great risk comes great reward" presents the case that those who earn more are those who take larger and more frequent risks. Others discuss the value of persuasion advocating for careful crafting of story to sell someone's value. Alternatively, discussions around the gender pay gap, racial pay gap, and outsourcing exploitation lend to the idea that for some there is a story which must first be overcome. So which view best describes what really influences compensation in the ServiceNow industry? 

Based on the data collected in this survey, most of the variance in compensation can be described by features over which individuals have limited control such as demographics. Some of the variance is attributable to merit and risk but it is not quite so straightforward. The following discussion will cover the key findings of the survey. 

Key Findings:

1. Compensation is complicated
2. Demographics drive compensation
3. Risk and hard work can pay off
4. The gender pay gap exists
5. The racial pay gap exists
6. More research is still needed

### Compensation is complicated

The first major finding is that predicting compensation is much more complicated than anticipated. The variance in compensation values is staggeringly high. For example, when looking at a traditional salary table, the Nelson Frank Salary Survey 2020 placed ServiceNow Developers in a range from $106,500 to $159,500. The Nelson Frank range was close to the interquartile range found by this survey which was Intl$ 96,509 to Intl$ 150,000 (dollars and international dollars are close to equivalent in this case, see [Purchasing Power Parity Adjustment][1] for details and conversions to other currencies). The overall range for US Based ServiceNow developers in this survey was much wider ranging from Intl$ 40,000 to Intl$ 270,000. In other words, the traditional salary table described only about 50% of the population found in this survey with the other 50% appearing either above or below the traditional range. It appears that most published salary tables mask much of the variance and complexity in compensation to draw attention to the high probability density regions in the compensation distribution. A sensible decision but one that ultimately makes compensation appear more predictable than it might in fact be.

Attempts at creating compensation prediction models was further complicated by the inability to reliably identify causes of variation beyond a handful of mostly demographic driven features. Knowing details about an individuals certifications, skills usage, product usage, and platform capabilities usage proved of little value in reducing error in the predictions. While these features may still impact the ability of an individual to obtain a position, differences in these features simply do not account for the differences in compensation amongst peers.

Ultimately, the best prediction models generated using the data from the survey could predict compensation within +/-30% of the actual value on average. At first glance, this may appear to make the models unusable but it is important to note that guessing compensation at random with no information is on average +/-276% of the actual value (thats two hundred and seventy-six percent, not a typo). Further more, most HR Departments that use salary banding will on the high end use bands that are +/-25% from the median value for a 50% range. In that perspective, the models are not highly accurate but they are certainly informative.

### Demographics Drive Compensation

Among the top 10 most important features in predicting an individual's compensation value, about half were demographic features or demographic related. Country of employment, years of experience (correlated to age), gender, ethnicity, and various local regions of employment all appeared within the top 10. The top 3 most important features that accounted for 88% of the prediction improvement were country of employment, years of experience, and the non-demographic percent of compensation that is fixed.

The overwhelming impact of demographic features is quite concerning as most of these features are not something easily influenced by an individual if they can be influenced at all. Yet the fact remains that who you are is much more predictive of your compensation in the ServiceNow industry than what you do. This is examined further in the top influencing features section and the demographics influence section.

### Risk and Hard Work Can Pay Off

As indicated previously, one of the top 3 influencing features is the percent of an individual's compensation that is fixed, at least in the United States anyway. US based workers with compensation structures less that are composed of at least 25% variable pay are significantly more likely to out earn their fixed compensation counterparts. There are multiple possible explanations according to the data. In some cases, variable pay appeared to be due to hourly compensation. In others, it appeared to be related to bonus structure. Regardless, this leaves a strong indication that putting in more work or taking more risk can in some cases pay off. 

However, the data also shows that many are putting in more work without having a compensation struture that rewards it. In these cases, hard work and risk does not influence compensation although, speculatively, there may be long term positive career implications.

### The Gender Pay Gap Exists

The data strongly indicates the existence of the gender pay gap with women earning on average 85 cents to 87 cents per international dollar compared to men. Additionally, women are severely underrepresented at only 18% of the industry population. The existence of the gender pay gap stood up to extensive scrutiny in both the exploratory and the final analysis with no indication that any covariant more adequately explains the influence. Further details can be found in the demographics influence section.

### The Racial Pay Gap Exists

The data also strongly indicates the existence of the racial pay gap with those identifying as Black, African or Caribbean being compensated 84 cents per international dollar compared to their peers. The data was inconclusive regarding other ethnicities in large part due to low representation within given comparable profiles. Similar to the gender pay gap analysis, the racial pay gap stood up to extensive scrutiny throughout the survey analysis with no indication that other covariants served as a better explanation of the variance. Further details can be found in the demographics influence section.

### More Research Is Still Needed

Despite the breadth of features analyzed, there are still significant limitations in the survey's ability to present a complete picture. Additional features such as employer related data, negotiation tactics, and compensation early in an individuals career were not included in the survey for the sake of survey length. Also, skill, product, and platform capability related questions focused on frequency of use but neglected quality of work or level of skill in those areas. Future surveys could build on the results found here by examining other feature sets which may provide a more clear picture and even possibly find features and models that better predict compensation value. Future research should at a minimum strongly consider the importance of country of employment, years of experience in a multitude of areas covered in this survey, percent of compensation that is fixed, gender, and ethnicity features identified in this reports findings.

[1]: /guides/servicenow-salary-influence-survey-2020/methods/#purchasing-power-parity-adjustment
[2]: https://github.com/tltoulson/salarySurveyAnalysisTool2020