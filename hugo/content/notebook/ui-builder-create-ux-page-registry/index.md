---
years: "2021"
date: 2021-07-14 09:38:00
lastMod: 2021-07-14 10:03:00
author: tltoulson
url: /notebook/ui-builder-create-ux-page-registry
title: "UI Builder: Create UX Page Registry"
socialImg: images/social.png
description: "How to create a UX Page Registry record in ServiceNow UI Builder"
"notebook/tags": ["UI Builder"]
---

**Purpose:** How to create a UX Page Registry record in ServiceNow UI Builder. The UX Page Registry record registers the URL, App Shell / page layout, and some other basic configs for a UI Builder Experience.

1. Open Instance to "Hello" Page
2. Click Open UI Builder
3. Click "+ Create experience in Platform" button
4. Verify UX Page Registry List View is now visible
5. Click List View "New" Button
6. Fill out the UX Page Registry Form as follows:
   - **Title:** *Any Text*
   - **App Shell UI:** Portal App Shell
   - **URL Path:** *Any Text*
   - **Active:** True / Checked
   - **Auth routes:** `{ "login": "login", "logout": "logout" }`
7. Click Submit