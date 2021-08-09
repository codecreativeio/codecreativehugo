---
years: "2021"
date: 2021-07-14 09:38:00
lastMod: 2021-07-14 10:03:00
author: tltoulson
url: /notebook/ui-builder-create-footer
title: "UI Builder: Create Footer"
socialImg: images/social.png
description: "How to create a Footer for a Portal Experience in ServiceNow UI Builder"
"notebook/tags": ["UI Builder"]
---

**Purpose:** How to create a Footer for a Portal Experience in ServiceNow UI Builder. The Footer is displayed at the bottom of every page in a Portal Experience.

1. Open Experience in UI Builder
2. Click "menu"
3. Click "Edit Experience Settings"
4. Click "Navigation and Menus"
5. Click "Advanced Footer Settings"
6. Complete the form as follows:
   - **Page:** *select the current Experience name*
   - **Name:** chrome_footer
   - **Type:** json
   - **Route:** *leave blank to apply to all routes*
   - **Description:** *any text*
   - **Value:**
     ```json
        {
            "public_page":{
            "enable_footer_topbar":true,
            "footer_topbar_options":{
                "enable_logo":true
            },
            "enable_footer_bar":true,
            "footer_bar_options":{
                "enable_links":true,
                "enable_copyright_text":true,
                "copyright_text":"© 2020 Company Inc. All rights reserved."
            }
            }
        }
     ```
     
     Special thanks to [Ninja Bytes][1]

     [1]: https://www.ninjabytes.blog/uib_basic/add-footer/