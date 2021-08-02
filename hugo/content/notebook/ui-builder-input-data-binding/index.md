---
years: "2021"
date: 2021-07-14 09:38:00
lastMod: 2021-07-14 10:03:00
author: tltoulson
url: /notebook/ui-builder-input-data-binding
title: "UI Builder: Input Data Binding"
socialImg: images/social.png
description: "How to bind Client State Parameters to an Input Component in ServiceNow UI Builder"
"notebook/tags": ["UI Builder"]
---

**Purpose:** How to bind Client State Parameters to an Input Component in ServiceNow UI Builder.

1. Open the UI Builder editor for an Experience
2. Select the Input Component or add a new Input to the page if one does not already exist
3. Click "Client State" icon in the lower left of the editor
4. Click "Add" to create a new Client State Parameter
5. Give it a name and select "String" for the type
6. Select the Input Component
7. In the Config tab, set "Value" to Data
8. Select "@State.{name} where {name} is the Client State Parameter created in step 4
9. Add Input Value Set Event handler to update the Client State Parameter