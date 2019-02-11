---
date: 2019-02-05 20:20:49
author: tltoulson
url: /guides/getting-started-on-servicenow/get-a-personal-developer-instance
title: "Exercise: Get a Personal Developer Instance"
socialImg: images/social.png
description:
weight: 300
published: false
---

**Objective:** Obtain and login to ServiceNow Personal Developer Instance

Obtaining ServiceNow Personal Developer Instance (PDI) is your first step to exploring the full potential of the platform and furthering your skills with it. Let's get started!

# Exercise

Follow the below instructions to complete the exercise:

1. In a web browser, navigate to https://developer.servicenow.com/

  - **Note:** Create an account if you do not already have one

2. Log in to your account

3. Using the navigation, go to **Manage > Instance**

4. On the My Instance page, click the **Request Instance** button

5. <span id="step-5"></span> Click a version to request an instance with that version [(Learn more about instance versions)][1]

6. <span id="step-6"></span> When your new instance is displayed, make note of the Username and Password provided [(Learn more about *Remaining Inactivity*)][3]

7. Click the instance URL link to open your Personal Developer Instance (Ex: *dev8675309.servicenow.com*)

8. <span id="step-8"></span> Login to your Personal Developer Instance with the Username and Password from Step 6 [(Did you forget your password?)][5]

9. From the Change Password prompt, change your admin password

**Congratulations! You now have your very own Personal Developer Instance!**

## Additional Notes

### Instance Versions

Since each customer owns their own instance of ServiceNow, customers have the flexibility of choosing when to upgrade their instance to the latest version of ServiceNow. Currently, ServiceNow releases a new version roughly once to twice a year and releases maintenance patches as needed.

Most often, when selecting a Personal Developer Instance version, you will want to select the most recent version. At the time of this writing, that would be **Madrid** for PDIs but **London** for general release. Don't worry if you pick the wrong version for your PDI, though, you can always upgrade your instance after obtaining it.

ServiceNow's current naming convention is to name releases in alphabetical order using the name of a world city.  For example, these are the releases and planned releases using this convention so far:

- Aspen (2011)
- Berlin (2012)
- Calgary (2013)
- Dublin (2013)
- Eureka (2014)
- Fuji (2015)
- Geneva (2015)
- Helsinki (2016)
- Istanbul (2017)
- Jakarta (2017)
- Kingston (2018)
- London (2018)
- Madrid (Planned for Q1 2019)
- New York (Planned for Q3 2019)
- Orlando (Planned for Q1 2020)
- Paris (Planned for Q3 2020)

[(Return to Step 5)][2]

### Remaining Inactivity

Sadly, your Personal Developer Instance is not made to last forever.  ServiceNow has taken two steps to ensure they can provide as many free instances for our use as possible.  First, instances will fall asleep (or hibernate) when inactive for a period of time.  When you attempt to access a hibernating instance, it will have to 'wake up' first which can take a few minutes.  The second step is to reclaim unused instances after a set inactive period indicated by Remaining Inactivity.  If your instance is reclaimed, all work in it is lost.  So make sure to visit your developer instance periodically to keep it active.

[(Return to Step 6)][4]

### Reset Instance Password

Use any application long enough and you are bound to forget your password and lock yourself out eventually. Fortunately, ServiceNow makes it easy to reset your password on your Personal Developer Instance. If you go back to the **My Instance** page from [Step 6][4], you can click the button named **Action** to get a list of options. From the dropdown, click **Reset admin password**.

Take a moment to familiarize yourself with some of the other options as well. Try them out, you can always release your instance and get a new one later.

**Warning:** You may have to wait 15 minutes to get a new instance and your preferred instance version may not be available.

[(Return to Step 8)][6]

[1]: #instance-versions
[2]: #step-5
[3]: #remaining-inactivity
[4]: #step-6
[5]: #reset-instance-password
[6]: #step-8
