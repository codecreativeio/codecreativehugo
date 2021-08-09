---
years: "2021"
date: 2021-07-14 09:38:00
lastMod: 2021-07-14 10:03:00
author: tltoulson
url: /notebook/ui-builder-add-logo-to-header
title: "UI Builder: Add Logo to Header"
socialImg: images/social.png
description: "How to add a logo to the header of a Portal Experience in ServiceNow UI Builder"
"notebook/tags": ["UI Builder"]
---

**Purpose:** How to add a logo to the header of a Portal Experience in ServiceNow UI Builder. The logo will appear at the top of a Portal Experience on every page.

1. Open Experience in UI Builder
2. Click "New"
3. Click "Edit Experience Settings"
4. Click "Branding and Theming"
5. Click "Advanced Settings"
6. In the related lists, open the Theme record
7. In the UX Theme Asset related list, click "New"
8. Complete the form as follows:
   - **Asset:** Create a new UX Theme Asset record as follows:
      - **Category:** Image
      - **Name:** *any text*
      - **Attachment:** *upload an image file to the attachment field*
   - **Asset Properties:** `{ "position": "header_logo" }`
9. Click Submit
10. Close current browser tab to return to UI Builder browser tab
11. Close portal settings
12. Click "Open" to test page

Special thanks to [Ninja Bytes][1]

[1]: https://www.ninjabytes.blog/uib_basic/add-header-and-logo/