---
date: 2021-03-14 14:40:00
author: tltoulson
url: /guides/servicenow-salary-influence-survey-2020/methods
title: "Reference: Methods"
socialImg: social.png
description: This section of the Salary Survey analysis discusses the methods used in conducting, processing, and analyzing the survey results.
weight: 800
---

## Step 1: Survey Response Collection

This survey collected results via online submission using a self-hosted [LimeSurvey][3] server. The survey began on September 08, 2020 and remained open through October 05, 2020. The survey was openly published on LinkedIn and CodeCreative.io, specifically targeting members of the ServiceNow Community. A list of Survey Questions and summary of responses can be found [here][4]. The survey was a multi part form which would save after each part, allowing for some surveys to be submitted incomplete. In total, 524 partially complete surveys were submitted with 230 surveys sufficiently complete for use in the analysis. Most of the partially completed surveys either began the survey without submitting any information or completed only the first page of the survey before abandoning.

## Step 2: Response Processing

Response processing involved sanitizing user inputs and discarding incomplete or likely anomalous data as well as computing some inferred data. The following steps were executed in this process.

### Remove Submissions With Undisclosed Compensation

The first step involved removing all survey responses that did not disclose the individual's compensation. Without the compensation, the survey was unable to be used in any of the performed analysis. After this cleanup step, 232 usable survey responses remained.

### Sanitize Currencies

Next, some work had to be performed to sanitize the user submitted currencies. This involved converting all submitted currencies to their ISO 4217 Currency Code. For example, any currencies submitted as *Indian Rupees*, *inr*, or *rupee* would be substituted with *INR*. Additionally, there were a couple of other adjustments and inferences required:

- Discarded two surveys where the currency was not provided and could not be inferred based on geographic location 
- Converted all submissions in Lakh Rupees to INR
- Converted three hourly rate submissions to annual compensation by multiplying by user submitted estimated days worked per year and hours worked per year

### Standardize Free Text Responses

Some of the survey questions used free text response and needed to be standardized. The following adjustments were made to standardize these fields:

- Country responses such as *US*, *United States*, and *America* were standardized to *United States*
- One survey listed 11100 years of Total Experience which was changed to 11 years of experience in order to align with the user's 11 years of IT Experience
- Adjusted two surveys which listed percentages over 100% to be exactly 100% under the assumption that these survey responses were exaggerating

### Remove Employer Based Responses

A section of questions designed to understand the nature of the individual's employer was originally included in the survey. However, due to a misconfigured conditional expression on the survey, most respondents did not complete these questions. For this reason, these question responses were discarded from the analysis. These questions included attributes such as employer industry, size, revenue, etc.

### Discard Potentially Anomalous Data

Some sanity checking needed to be performed to ensure only valid data was included in the analysis and results. For example, above it was noted that one response submitted 11100 years of Total Experience. Similar adjustments to this include:

- Marked Sixteen Hours Worked This Year and Days Worked This Year responses as not provided because when plotted against the rest of the data set, the submitted values were far outside of the expected.
- Multiplied nine compensation responses by 12 as it appeared have been provided as a monthly compensation

To determine salaries that were provided in terms other than annual, the compensation values were plotted on a histogram with peer responses. When responses appeared outside the normal distribution, a subject matter expert was consulted in the region of the provided currency. The subject matter expert was given an arbitrary range of salaries which contained responses in question. The subject matter expert was then asked to infer the intent of the respondent based on their knowledge of compensation structures in their region. In each case, the subject matter experts responded that the value appeared to be a monthly compensation and the raw value was adjusted accordingly. This affected nine responses in the compensations of individuals using the following currencies: SEK, INR, UAH, and PLN.

### Infer Additional Features

Some features could be inferred from provided responses. For example, based on a respondent's country, the continent could also be inferred. Exploring both the raw data and various inferred elements could be helpful in identifying interactions between features so a number of inferred values and scores were calculated summarized below. A complete listing can be found in the analysis tool source code's config.js file. In total, approximately 400 different features were included in the analysis. As a summary the inferred and computed features include:

- Continent
- US Census Bureau Division
- US Census Bureau Region
- US BEA Region
- Counts of Certifications and Number of Certifications from various Certification Groups the respondent possesses
- Boolean features indicating whether or not a respondent has exactly zero, exactly one, or an exact combination of various certifications
- Skill Scores computed across various skill groupings such as Soft Skills, Management, Sales and Marketing, Architectural, and Development indicating a scored frequency of use
- Product Scores computed across both ServiceNow Applications (ITSM, CSM, ITBM, etc) and ServiceNow Capabilities (Service Portal, Virtual Agent, Performance Analytics, etc) indicating a scored frequency of use
- Statement scores indicating how positive or negative a respondents self-assessment is overall
- Satisfaction scores indicating how positive or negative a respondents sentiment is overall

### Purchasing Power Parity Adjustment

In order to enable comparisons across international currencies, all currency values were converted from the survey respondents local currency to International Dollars (Intl$ or GK$) using the [2019 Purchasing Power Parity index][1]. This index is published by the Eurostat-OECD as a method of equalizing and comparing the purchasing power of different currencies in their local markets. This adjustment makes it much easier to directly compare compensation amounts across international borders by converting local currency to the equivalent purchasing power of the US Dollar (USD). In this report, currency values of Intl$ indicate that the currency has been converted using the PPP index. The conversion rates used in this survey report are published below:

| Country                | Purchasing Power Parity (local currency / Intl$)          |
|------------------------|---------------------------------------------------------|
| Australia              | 1.44                                                    |
| Belgium                | 0.76                                                    |
| Brazil                 | 2.25                                                    |
| Bulgaria               | 0.69                                                    |
| Canada                 | 1.19                                                    |
| Costa Rica             | 1                                                       |
| Germany                | 0.74                                                    |
| India                  | 21.21                                                   |
| Italy                  | 0.67                                                    |
| Netherlands            | 0.78                                                    |
| Philippines            | 19.46                                                   |
| Poland                 | 1.75                                                    |
| Prefer not to disclose | 0.706 (Used generic Euro PPP value)                     |
| Spain                  | 0.63                                                    |
| Sweden                 | 8.75                                                    |
| Switzerland            | 1.148                                                   |
| Ukraine                | 7.09                                                    |
| United Kingdom         | 0.68                                                    |
| United States          | 1                                                       |

### GNI Dollars per Capita (Atlas) 2019

Another calculated measure to improve comparison across international borders is GNI Dollars per Capita. Respondents country of employment was mapped to their [Gross National Income per Capita using the Atlas method as of 2019][2]. This indicator provides a continuous variable for comparing different countries by their economic power. This specific indicator was selected during exploratory analysis as it provided the lowest variance of the international economic indicators. Below is the table of values used in this analysis:

| Country                | GNI Dollars per Capita (Atlas) |
|------------------------|--------------------------------|
| Australia              | 54910                          |
| Belgium                | 47350                          |
| Brazil                 | 9130                           |
| Bulgaria               | 9410                           |
| Canada                 | 46370                          |
| Costa Rica             | 11700                          |
| Germany                | 48520                          |
| India                  | 2130                           |
| Italy                  | 34460                          |
| Netherlands            | 53200                          |
| Philippines            | 3850                           |
| Poland                 | 15200                          |
| Prefer not to disclose | NaN                            |
| Spain                  | 30390                          |
| Sweden                 | 55840                          |
| Switzerland            | 85500                          |
| Ukraine                | 3370                           |
| United Kingdom         | 42370                          |
| United States          | 65760                          |

## Step 3: Top Influencing Features Analysis

The primary objective of this survey was to identify the features that have the most influence on an individual's compensation. To identify these features, this analysis used the CART Regression Tree algorithm with the ANOVA F Value as the Split Criteria. Although somewhat non-standard (Variance is often preferred for regression tree split criteria), ANOVA F Value provided a number of advantages. First, F Value measures two distinct properties that are useful in splitting data: similarity within a subgroup (within group variance) and distinction from other subgroups resulting from the split (between group variance). The result was more meaningful splits that had less overlap between subgroup compensation values. Additionally, F Value has a built in stop criteria in the form of F Critical. Since F Critical is a useful statistic for determining statistical significance, regression tree splitting could stop whenever the F Statistic dropped below the F Critical value for the best split. Overall, using ANOVA F Value as a split criteria created more informative splits and yielded predictive accuracy on par with the more traditional value of Variance.

Once the regression tree was built, the leaf nodes were populated with the median value of the subgroup. Median was preferred to mean or mode in this case since the compensation values were lognormally distributed as opposed to normally distributed. This is consistent with other research on salary distributions. In a lognormal distribution, simple arithmetic mean tends to over-estimate the central tendency due to the skewed nature of the distribution. For this reason, median was used as the predicted value on the leaf nodes.

Once the regression tree was constructed, feature importance was calculated using the process of Leave One Covariant Out (LOCO) method with the Mean Absolute Percent Error (MAPE) metric. The basic process here is to select a feature to calculate the importance, rebuild the regression tree without that feature, then calculate and compare the MAPE of each model to determine the feature importance. At this point, the features can be ranked from highest importance to lowest. Similar to the rationale for using median, MAPE was selected as the metric due to the lognormal nature of compensation. A raw deviation of Intl$ 10,000 between the predicted and actual value is of limited utility on its own. That deviation would be considered insignificant if the actual value was Intl$ 425,000 but would be quite significant if the actual compensation value was itself only Intl$ 10,000. In that way, MAPE is an effective measure of deviation for compensation for the same reason that a pay raise is compared in terms of the percent raise.

The key to keep in mind is that a feature's importance is measured by how much more prediction error is introduced when the feature is left out of the model. More error implies more importance.

### Generating Features From Responses

The survey responses data set contained both categorical and continuous (ordered numerical) response types. From these responses, different features could be extracted. To be as complete as possible, many feature variations were generated for each response type. 

A simple categorical response would produce multiple features including an n-nary feature split that split the dataset into one subset for each possible response as well as potential binary encodings which would generate two subsets, one with all results matching a condition and another with all results failing to match the condition.

An example of this is the respondent's gender. The gender feature would split a dataset into four subsets: respondents who were *Male*, *Female*, *Nonbinary*, and *Prefer not to disclose*. Another feature generated from the gender repsonse is *Is Male*. The effect of splitting on this feature would be to create two subsets: one for all male respondents and another for all other respondents (female, nonbinary, and those who prefered not to disclose). Likewise, binary encoding features could be generated for *Is Female*, *Is Nonbinary*, and *Prefers not to disclose*. More complex conditions could allow for alternative groupings as well. By testing multiple ways of splitting and grouping categorical data, hidden interactions could potentially be identified that may not be immediately obvious by simply analyzing the n-nary categorical split. For example, if the calculated ANOVA F Value for the *Is Male* feature was the highest (and therefore best feature to split the dataset) while the *Is Female* feature was ranked significantly lower, then this would indicate that the salaries of non-male identifying respondents were more similar to one another than to male identifying respondents in that particular dataset.

Similar to categorical responses, continuous responses (ordered numerical) generate multiple different features as well. Similar to categorical, one option is to create an n-nary categorical feature split which creates one subset for each possible response in the survey results. Another option is to generate a binary encoded split at each possible response value resulting in two subsets for each response, one subset for all responses where the response is less than or equal to the value and one subset for all responses greater than the value. Lastly, alternative binary encodings similar to categorical data are also possible.

An example of a continuous response is Years of Experience. If the survey responses included 1, 2, 3, 4, and 5 years of experience as responses then there are multiple features that can be generated from this single response. The first generated feature would treat the response as a categorical value, splitting the data into subsets of respondents with 1, 2, 3, 4, and 5 years of experience respectively. Similar to the categorical, binary encoded features could also be generated to group respondents into those with and without a specific number of years of experience. Lastly, because this is a continuous response, a set of binary encoded features are possible such as: *<= 1 year of experience* and * > 1 year of experience*. A feature of this sort can be generated at 1, 2, 3, 4, and 5 years of experience to generate each possible grouping.

The analysis tool created for this survey automates the generation of these features and allows rapid computing of the F Values at each decision tree split. The result is that this analysis was able to effectively compare over 1700 different possible ways of splitting and grouping the data at every level in the decision tree with significantly reduced manual effort.

### Creating the Regression Tree

Following is the process the analysis used for generating regression trees:

1. Start with all responses as the current dataset
2. Convert input responses in the current data set to response features
3. For each feature
    1. Split the current data set by the feature
    2. Calculate the ANOVA F Statistic for the split
    3. Lookup the ANOVA F Critical value for the split
    4. Count the number of responses in each subset of the split
    5. Calculate if all compensation values in each subset fall between 0.75 * subset median value and 1.25 * subset median value (representing a 50% Salary Window)
4. Find the feature with the largest ANOVA F Statistic that meets the following criteria
    - ANOVA F Statistic > ANOVA F Critical
    - Count in each subset is >= 4 OR Feature is based on Country of Employment
5. For each subset created by the feature selected in step 4
    1. Repeat steps 3 through 4 with the subset as the current dataset until one of the following conditions is met
        - No suitable feature is found in step 4
        - All compensation values within the subset are within the 50% Salary Window as calculated in step 3.5

### Calculate Prediction Model Mean Absolute Percent Error (MAPE)

The result of the above process is a decision tree model where the first node represents the whole dataset and each feature selection is a branch which results in two or more subset nodes culminating in the leaf nodes. Computing the median compensation value of all responses in a leaf node yields the predicted value for responses matching that leaf node's feature criteria. 

Next, the Mean Absolute Percent Error for the model needs to be calculated for use in comparing models and generating feature importance. In this survey, there was insufficient data for providing a separate validation data set, so the same data set was used for both generating the model and computing the MAPE. The process for computing MAPE for any given model is as follows:

1. Generate the prediction model
2. Convert input responses in the current data set to response features
3. For each response
    1. Calculate the predicted compensation value using the prediction model
    2. Calculate the absolute percent error for the prediciton using (ResponseValue - PredictedValue) / ResponseValue
4. Sum all absolute percent errors from Step 3
5. Calculate MAPE using TotalPercentError / NumberOfResponses

### Calculate Feature Importance

To calculate a feature's importance, as discussed above the Leave Out One Covariant method is used in this analysis. This approach is summarized in the following procedure:

1. Generate the optimum prediction model as specified above
2. Omit a feature or set of features related to a common question response
3. Generate a new prediction model without the feature omitted in step 2 (LOCO model)
4. Calculate the MAPE for the optimum model and the LOCO model
5. Calculate Feature Importance for the omitted feature via: (LocoMAPE - OptimumMAPE)
6. Repeat steps 2 through 5 for each Feature included in the optimum prediction model
7. Sort the features in descending order of Feature Importance

The highest Feature Importance values indicate the most significant features in the optimum prediction model. Note that when a Feature Importance is negative, although leaving the feature out reduced the error it is generally implied that the decrease in error occurred by random chance. Features with negative feature importance are therefore the least significant.

### Multiple Regression Prediction

It was discovered during exploratory analysis that leaf nodes can use multiple regression of continuous features instead of a single predicted value or a split. For example, one of the generated models split on Country of employment and then used a polynomial regression with years of experience as the x value to compute the predicted compensation. This generated significantly simpler models with only marginal increases in MAPE. The use of these models further demonstrated the importance of specific features. 

## Step 4: Targeted Feature Analysis

Once the Top Features were computed and understood, less significant features were analyzed using more traditional comparative analysis methods.

### Box and Whisker Plots

The box and whisker plots in this analysis are used to make comparative analysis between the distributions of population subgroups. The GNI Per Capita > 55840 criteria is used frequently in these plots as a convenient way to include countries that otherwise received an insufficient number of submissions to be included in their own comparison. The box and whisker is used instead of a histogram plot in order to balance anonymity with informative results. When relevant, the narrative attempts to inform when the histogram plots reveal noteworthy tendencies that are not reflected in the box and whisker.

### On Average Compensation

The analysis makes numerous statements regarding one group's compensation compared to another on average. These statements are made using either a percent or cents per international dollar to indicate by how much one group is compensated above or below another. These values are computed using the ratio of the median compensation of the subgroups. For example, in the gender comparison, the value range is computed by the following (in the case of gender, there are two values computed for the low GNI per Capita countries and the high GNI per Capita countries):

compensationRatio = femaleMedianCompensation / maleMedianCompensation

This is a common practice in salary research due to the lognormal distribution of typical salary datasets, including the ServiceNow Influence Salary Survey. In these distributions, the arithmetic mean tends to overestimate the central tendency of the group compared to the median, which is more robust to outliers.

### Peer Group Comparison

Similar to the on average statements, a number of peer group comparisons are made using column charts. In these cases, individuals in the survey are grouped according to their Country, Years of Experience, and (for US only) Percent Fixed Compensation. This grouping reflects the top influencing features decision tree model. The median compensation of each group is then calculated from the individual compensation values within each group. Next, individual compensation values are compared to the median value of the individual's group and labelled as *Below Median*, *At Median*, or *Above Median*. Finally, the column charts are generated by displaying the percent of the total population below, at, or above the respective median values compared to the same breakdowns for population subgroups such as gender, ethnicity, education, etc. 

In this way, generalizations can be made about what impact belonging to a specific feature subgroup has on the probability of an individual receiving at or below median compensation compared to highly similar peers. Mathematically, the impact is summarized by calculating the Euclidean distance as a similarity measure for each feature value bar and then calculating the sum weighted distance for the feature. The features are ranked according to this value at the end of the Top Influencing Features section. Comparing this metric reduces the ambiguity of the On Average Compensation comparison values which do not consider the top influencing features and can therefore be misleading due to possible covariance.

### Covariance Comparison

In some specific cases, comparisons are drawn between subgroups using metrics other than compensation. These charts are produced in order to make determinations about possible covariance between features. For example, a common argument to justify the gender pay gap is that female workers are prone to working fewer hours and requiring more time off than their male counterparts. The statistical argument made here is that gender and work effort are covariant and that the feature responsible for lower or higher compensation is not gender but instead is the covariant feature of work effort. In order to test various claims of covariance, some of the analysis leverages charts that compare potentially covariant features to assess the claim. 

[1]: https://data.oecd.org/conversion/purchasing-power-parities-ppp.htm
[2]: https://blogs.worldbank.org/opendata/new-country-classifications-income-level-2019-2020#:~:text=The%20classification%20of%20countries%20is,also%20influence%20GNI%20per%20capita.
[3]: https://www.limesurvey.org/
[4]: /guides/servicenow-salary-influence-survey-2020/survey-response-reports