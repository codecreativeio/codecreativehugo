---
years: "2021"
date: 2021-07-14 09:38:00
lastMod: 2021-07-14 10:03:00
author: tltoulson
url: /notebook/ui-builder-change-font-family
title: "UI Builder: Change Font Family"
socialImg: images/social.png
description: "How to change the font family of text in a Portal Experience in ServiceNow UI Builder"
"notebook/tags": ["UI Builder"]
---

**Purpose:** How to change the font family of text in a Portal Experience in ServiceNow UI Builder. This procedure will allow the use of custom fonts in UI Builder Portal Experiences.

1. Open Experience's UI Theme record
2. In UX Theme Asset related list, click "New"
3. Complete the UX Theme Asset form as follows:
    - **Asset:** Create a new UX Theme Asset record as follows:
        - **Category:** Font
        - **Name:** *any text*
        - **Attachments:** Attach the font file (.ttf, .eof, .woff, etc) to the UX Theme Asset record
            - **Note:** Only a single .ttf file extension has been tested so far
    - **Asset Properties:** *leave blank*
4. Click "Submit"
5. In the UX Theme record's Theme field, change the JSON to add a font-family based CSS Custom Property whose value matches the UX Theme Asset record's Name field such as:
    ```json
        {
            "--now-font-family": "Julius Sans One"
        }
    ```
6. Click "Update"
7. Test the page to see the font changed