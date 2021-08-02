---
years: "2019"
date: 2019-01-22 14:16:59
author: tltoulson
url: /blog/react-component-in-service-portal
title: "React Component in Service Portal"
socialImg: images/social.png
description: So once again I am hearing rumors that React may be coming to Service Portal. But what if it's already possible to use React within Widgets.
---

So once again I am hearing rumors that React may be coming to Service Portal. I know many folks who were upset with the use of AngularJS in Service Portal and even with the general lack of modern frameworks built into ServiceNow. But what if the future was now (thanks to science)?

Well, today I spent some time at lunch exploring that possibility and it turns out React may have been able to work within Service Portal just fine all along.

## The Plan

I needed something simple to try so I grabbed the [ToDo][1] application component on the React homepage and some instructions from the [React docs][2].

The plan was simple, run the Todo app React component as a Widget in Service Portal.

## Step 1: Add React to the Portal

<figure>
  <img src="images/Add React to Theme.png" />
  <figcaption>
    Add React to Portal Theme
  </figcaption>
</figure>

First, I needed to include the React libraries in the Portal. This is easier than it sounds since Service Portal allows us to include external JS libraries on the Theme record.

Opening the Stock Theme allowed me to add two React JS Includes in the Related List:

- https://unpkg.com/react@16/umd/react.development.js
- https://unpkg.com/react-dom@16/umd/react-dom.development.js

## Step 2: Create a New Widget

<figure>
  <img src="images/React Widget Code.png" />
  <figcaption>
    Code for React Powered Widget
  </figcaption>
</figure>

Next, I created a New Widget using the Widget Editor UI that I aptly named React Test. In this case, I chose to create a test page called react_test to make experimenting a little easier.

I pasted the ToDo component script from the React homepage into the Client Script block. I had to remove the JSX checkbox since ServiceNow doesn't (publicly at least) support JSX parsing.

I made one little tweak in that I passed a title variable from the outer function (Angular Controller) to the React Component just to demonstrate that data can be passed.

I also added one line of CSS to show that the Widget CSS will apply to the React component.

Here are the resulting scripts:

**HTML Template**

```html
<div>
  <div id="todos-example"/>
</div>
```

**CSS - SCSS**

```css
label {
	display: block;
}
```

**Client Script**

```js
function() {
  /* widget controller */

	var c = this;

	c.title = "To do app";

  class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { items: [], text: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    return React.createElement(
      "div",
      null,
      React.createElement(
        "h3",
        null,
        c.title
      ),
      React.createElement(TodoList, { items: this.state.items }),
      React.createElement(
        "form",
        { onSubmit: this.handleSubmit },
        React.createElement(
          "label",
          { htmlFor: "new-todo" },
          "What needs to be done?"
        ),
        React.createElement("input", {
          id: "new-todo",
          onChange: this.handleChange,
          value: this.state.text
        }),
        React.createElement(
          "button",
          null,
          "Add #",
          this.state.items.length + 1
        )
      )
    );
  }

  handleChange(e) {
    this.setState({ text: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (!this.state.text.length) {
      return;
    }
    const newItem = {
      text: this.state.text,
      id: Date.now()
    };
    this.setState(state => ({
      items: state.items.concat(newItem),
      text: ''
    }));
  }
}

class TodoList extends React.Component {
  render() {
    return React.createElement(
      "ul",
      null,
      this.props.items.map(item => React.createElement(
        "li",
        { key: item.id },
        item.text
      ))
    );
  }
}

ReactDOM.render(React.createElement(TodoApp, null), document.getElementById('todos-example'));
}
```

## Test it Out

<figure>
  <img src="images/Test the React Widget.png" />
  <figcaption>
    React Widget Rendered in the Service Portal
  </figcaption>
</figure>

At that point I opened my react_test page and was able to confirm that the component works exactly the same as it does on the React Homepage.

## Next Steps

This was a pretty simple test and with React Widgets possibly coming to ServiceNow natively, it may not be worth exploring this too much further.

That said, for this to be truly useful we would ideally want to bind Widget data, options, and server objects from the Angular Scope to the React Component to really give this setup legs. I can easily see ServiceNow implementing an Angular directive under the hood to create these bindings and support React Component powered Widgets moving forward.

I'm betting similar can be done for other view libraries as well.

## Bonus

For those who would rather scrap the Service Portal lifting all together in favor of a React, Vue, or other library based toolchain on ServiceNow:

[Download the Update Set][3] which includes the Widget example and a Custom Processor example. I used the processor approach pre-Service Portal to create an AngularJS based toolchain.

[1]: https://reactjs.org/
[2]: https://reactjs.org/docs/add-react-to-a-website.html
[3]: downloads/react_widget_update_set.zip
