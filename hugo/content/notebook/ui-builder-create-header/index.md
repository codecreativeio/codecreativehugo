---
years: "2021"
date: 2021-07-14 09:38:00
lastMod: 2021-07-14 10:03:00
author: tltoulson
url: /notebook/ui-builder-create-header
title: "UI Builder: Create Header"
socialImg: images/social.png
description: "How to create a Header for a Portal Experience in ServiceNow UI Builder"
"notebook/tags": ["UI Builder"]
---

**Purpose:** How to create a Header for a Portal Experience in ServiceNow UI Builder. The Header is displayed at the top of every page in a Portal Experience.

1. Open Experience in UI Builder
2. Click "Menu" next to Experience name and logo
3. Click "Edit Experience Settings"
4. Click "Navigation and menus"
5. Under Header, click "Advanced header settings"
6. Fill out the form as follows:
   - **Page:** *Select the Portal Experience Name*
   - **Name:** chrome_header
   - **Type:** json
   - **Route:** *leave blank to apply to all routes*
   - **Description:** *Any description text*
   - **Value:** 
        ```json
        {
            "privatePage": {
                "searchEnabled": true,
                "userPrefsEnabled": true,
                "logoRoute": {
                    "type": "route",
                    "value": {
                        "route": "home",
                        "fields": {}
                    }
                },
                "globalTools": {
                    "collapsingMenuId": 0,
                    "primaryItems": [
                        {
                            "label": "UserMenu",
                            "icon": "user",
                            "type": "menu",
                            "primaryDisplay": "icon",
                            "value": {
                                "children": [
                                    {
                                        "condition": {
                                            "roles": [
                                                "admin"
                                            ]
                                        },
                                        "label": {
                                            "translatable": true,
                                            "message": "Configure"
                                        },
                                        "type": "navigation",
                                        "position": 200,
                                        "primaryDisplay": "none",
                                        "value": {
                                            "type": "external",
                                            "opensWindow": "true",
                                            "value": {
                                                "href": "/nav_to.do?uri=/sys_ux_app_config.do?sys_id=c5bbbde2c3121010f46b42583c40dd06"
                                            }
                                        }
                                    },
                                    {
                                        "label": {
                                            "translatable": true,
                                            "message": "Logout"
                                        },
                                        "position": 500,
                                        "type": "navigation",
                                        "value": {
                                            "type": "AUTH_ROUTE_BINDING",
                                            "binding": {
                                                "address": [
                                                    "logout"
                                                ],
                                                "params": {
                                                    "reload": true
                                                },
                                                "default": "/logout.do"
                                            }
                                        }
                                    }
                                ]
                            }
                        }
                    ],
                    "secondaryItems": []
                }
            },
            "publicPage": {
                "menuEnabled": true,
                "logoRoute": {
                    "type": "route",
                    "value": {
                        "route": "home",
                        "fields": {}
                    }
                }
            }
        }
        ```
7. Return to UI Builder browser tab by closing the current browser tab
8. Click "X" to close the Portal Settings modal
9. Click "Open" to test the page header

Special thanks to [Ninja Bytes][1]

[1]: https://www.ninjabytes.blog/uib_basic/add-header-and-logo/