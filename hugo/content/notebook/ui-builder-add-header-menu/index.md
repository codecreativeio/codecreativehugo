---
years: "2021"
date: 2021-07-14 09:38:00
lastMod: 2021-07-14 10:03:00
author: tltoulson
url: /notebook/ui-builder-add-header-menu
title: "UI Builder: Add Header Menu"
socialImg: images/social.png
description: "How to add a header menu to a Portal Experience in ServiceNow UI Builder"
"notebook/tags": ["UI Builder"]
---

**Purpose:** How to add a header menu to a Portal Experience in ServiceNow UI Builder. The header menu is displayed at the top of every page in a Portal Experience.

1. Open Experience in UI Builder
2. Click "Menu"
3. Click "Edit Experience Settings"
4. Click "Navigation and Menus"
5. Click "Advanced Footer Settings"
   - **Note:** Currently the Advanced Navigation Menu Settings link is broken
6. Complete UX Page Property form as follows:
   - **Page:** *current Portal Experience name*
   - **Name:** chrome_menu
   - **Route:** *leave blank*
   - **Description:** *any text*
   - **Value:**
    ```json
        [
            {
                "value": {
                "label": {
                    "translatable": true,
                    "message": "Knowedge"
                }
                },
                "children": {
                "action": {
                    "label": {
                    "translatable": true,
                    "message": "Report an issue"
                    },
                    "type": "route",
                    "rightIcon": "chevron-right-fill",
                    "value": {
                    "route": "catalog",
                    "fields": {
                        "sysId": "3f1dd0320a0a0b99000a53f7604a2ef9"
                    }
                    }
                },
                "items": [
                    {
                    "value": {
                        "label": {
                        "translatable": true,
                        "message": "Categories"
                        }
                    },
                    "children": {
                        "action": {
                        "label": {
                            "translatable": true,
                            "message": "Browse All"
                        },
                        "type": "route",
                        "rightIcon": "chevron-right-fill",
                        "value": {
                            "route": "article",
                            "fields": {
                            "sysId": "3020c9b1474321009db4b5b08b9a712d"
                            }
                        }
                        },
                        "items": [
                        {
                            "value": {
                            "label": {
                                "translatable": true,
                                "message": "IT"
                            },
                            "type": "route",
                            "value": {
                                "route": "article",
                                "fields": {
                                "sysId": "3020c9b1474321009db4b5b08b9a712d"
                                }
                            }
                            }
                        },
                        {
                            "value": {
                            "label": {
                                "translatable": true,
                                "message": "Benefits"
                            },
                            "type": "route",
                            "value": {
                                "route": "article",
                                "fields": {
                                "sysId": "3020c9b1474321009db4b5b08b9a712d"
                                }
                            }
                            }
                        }
                        ]
                    }
                    }
                ]
                }
            }
        ]
    ```
7. Click Submit
8. Close the current browser tab to return to the UI Builder browser tab
9. Close portal settings
10. Click "Open" to test page

Special thanks to [ServiceNow Ninjas][1]

[1]: https://servicenowninjas.blog/uib_basic/add-simple-navigation-menu-and-actions/