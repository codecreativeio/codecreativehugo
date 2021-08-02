---
years: "2018"
date: 2018-05-21 17:12:38
author: tltoulson
aliases:
  - /servicenow/making-service-portal-widgets-work-together
url: /blog/making-service-portal-widgets-work-together
title: Making Service Portal Widgets Work Together
socialImg: images/social.png
description: The following is a summary of the Making Service Portal Widgets Work Together session that I presented at Knowledge 18.
---

The following is a summary of the *Making Service Portal Widgets Work Together* session that I presented at Knowledge 18.

<iframe src="//www.slideshare.net/slideshow/embed_code/key/3a12fCgIYHcqHz" width="595" height="485" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" style="border:1px solid #CCC; border-width:1px; margin-bottom:5px; max-width: 100%;" allowfullscreen> </iframe>

## Problem

**(Slide 2) Widgets don't play well with others**

If you work with Service Portal widgets long enough, you will come across situations where you want to share data between multiple widgets. And inevitably, you will discover that sharing is not something that widgets are very good at.

**(Slide 3) Widgets are isolated by design**

Widgets are designed to be the workhorse of the Service Portal. By isolating their AngularJS scopes, Service Portal achieves the marvelous feat of binding the HTML template, CSS, Client Script, and Server Script into a single reusable component. And by placing all the power at the widget, Service Portal is able to simplify the rest of the AngularJS application. The app, controller, container, row, column, and rectangle scopes are all abstracted away from the developer's concern, allowing us to focus on the content instead of the layout.

**(Slide 4 and 5) But Sharing Data Suffers**

Unfortunately, this scope isolation results in the difficulty of sharing data between widgets. For example, shown on Slide 5 is the Ticket page which has 4 widgets that all query the same GlideRecord. That's 4 separate GlideRecord queries that are run to obtain the same exact data. Now, there is certainly a case to be made that ServiceNow likely caches these results to improve performance. But there is also a case to be made for not abusing caching and other platform features in place of good coding practices.

**(Slide 6) Repetitive Widgets vs Massive Widgets**

But without expanding our toolkit, we are often left with the decision between creating repetitive widgets such as those on the Ticket page or massive widgets that wrap all the behaviors of a page into a single scope. Repetitive widgets come with the drawback of duplicate code and the potential for performance issues. But massive widgets are just as risky since they become more difficult to maintain the larger they become and it is difficult for multiple people to work on the widget at the same time. Neither approach tends to scale particularly well.

So what other options do we have to resolve this Gordian knot?

## Solution 1: Embed Widgets to Compose Complex Behaviors

(Slide 8) One technique at our disposal is to use embedded widgets. The Data Table widget is an excellent example of composing complex behaviors via embedding. In total, the Data Table Widget requires some 300+ lines of client code and 150+ lines of server code to function across 7 different behaviors (export, new record, search, breadcrumb filter, sort, open record, and pagination). That's a lot to try and figure out by just reading the code but the Data Table widget is actually composed of multiple widgets. One in particular is the Breadcrumb widget.

The power of this solution is in the ability to split up really complex widgets into multiple components. This makes it easier to share responsibilities for maintaining the widget and to find the sections of code that pertain to each behavior.

(Slide 9) Let's take a look at a sample of what this could look like in your Widget scripts (not working code):

### Server Script

```js
var breadcrumbWidgetParams = {
   table: data.table,
   query: data.filter,
   enable_filter: data.enable_filter
};
data.filterBreadcrumbs = $sp.getWidget(
   'widget-filter-breadcrumbs',
   breadcrumbWidgetParams);
```

### HTML Template

```html
<div>
   <sp-widget widget="data.filterBreadcrumbs">
   </sp-widget>
</div>
```

Let's take a moment to point out a few things:

**(Slide 10) data.filterBreadcrumbs**

On the Server Script, we have access to the **data** object to which we add the filterBreadcrumbs object. Service Portal passes the entire **data** object client side and make it accessible to the Client Script and HTML Template. Keep in mind, it can only serialize JSON native data types (no GlideRecords). You can see my script accessing the Server's data.filterBreadcrumb in the HTML template.

**(Slide 11) $sp.getWidget**

The $sp.getWidget function allows us to dynamically create a Widget Instance in code. The function requires two parameters to properly build the Widget Instance object. The first is the Widget record's ID field (Slide 12). The second is an object of options that are used by the embedded widget (Slide 13). These options are accessed via c.options in the embedded Widget's Client Script and HTML Template.

**(Slide 14) sp-widget directive**

The sp-widget directive takes the Widget Instance we generated with $sp.getWidget and generates the proper HTML template embedded within the parent Widget. This is the part that actually displays the Breadcrumb widget in the Data Table.

(Slide 15) What we really want though is to be able to share data and that is the best part about embedded widgets. Because of AngularJS's prototypical inheritance, our embedded widget (Breadcrumb) has access to all the data and functions in the parent widget (Data Table).

This technically also applies to other parent scopes as well. The Data Table widget also accesses an object **page.title** in it's HTML Template (Slide 16). This object is nowhere to be found on either Data Table or Breadcrumb widgets. To find it, you have to walk up the prototype chain to the ng-app scope (Slide 17).

(Slide 18) But ultimately, this provides us with a very powerful way to share behaviors and data across multiple widgets by building them into an inheritance hierarchy. Of course this is also the solution's biggest drawback, your widgets become tightly coupled to one another. This can make it more difficult to recombine behaviors in different ways in the future (a requirement that happens more often than you might think).

## Solution 2: Structure Application Models with Angular Services

This solution is absolutely my favorite and the data sharing structure that I use most often in practice. Every custom application that I have built on Service Portal uses this architecture. Every. Single. One.

(Slide 20) From the AngularJS Developer Guide, "You can use services to organize and share code across your app." Cue the "Hallelujah" music, this is exactly what we are talking about. So how the heck do we use these things? Well there are 3 steps we have to take (Slide 21):

1. Create the Angular Provider on the Angular Provider table

2. Add it to the Widget record's Angular Provider Related List

3. Inject the dependency into the Client Script function


Let's take a look at a sample AngularJS Service (and my favorite way of structuring it):

### Angular Provider Service Script (incidentService)

```js
function($http) {
   var incidents = [];
   function reload() {
       $http.get('/api/now/table/incident')
           .then(function(res) { incidents = res.result; });
   }

   function get() {
       return incidents;
   }

   return {
       'reload': reload,
       'get': get
   };
}
```

**(Slide 23) $http - dependency injection**

Dependency injection is a major part of AngularJS Services. AngularJS automatically searches by name for Services that match the parameter names we pass into Client Scripts and Service functions. In this Service for example, we pass in the $http parameter which is an AngularJS Service that lets us execute HTTP calls in our script. AngularJS will automatically find the $http Service function and inject it into our Service function for us.

**(Slide 24) Shared Data Cache**

In order to share data, we have to store that shared data somewhere. In this case, we are storing a list of Incidents to share between widgets in a simple array. By writing to and reading from this array, we can share access to this internal variable through our Service.

**(Slide 25) Write Function**

Next we need a function that will allow Widgets using this Service to write data to our shared data cache. For this Service, I am only allowing the data to be written via a server side call via $http. By calling the relaod function, any widget with access to this Service can reload the data in the shared data cache with data from the server. We could also have written this function in way that the Widgets could write data directly to the cache (similar to a setValue function)

**(Slide 26) Read Function**

Now we need a function that will allow Widgets to read from the shared data cache. In this service, I am using a simple get function to return the entire incident array.

**(Slide 27) Public Service Interface**

Finally, we need to create the public interface object. Technically, all our functions and variables so far have been defined inside the Service function and are therefore only accessible within the function. By returning a public interface, we expose the desired functions to make them accessible within our Widgets.

### Widget Client Script

```js
function (incidentService) {
   var c = this;

   incidentService.reload();

   c.reload = function() {
       incidentService.reload();
   }

   c.getIncidents = function() {
       return incidentService.get();
   }
}
```

**(Slide 29) Dependency Inject the Service Function**

To use the Service above, we have to inject the Service by name (based on the name in the Angular Provider record). The name I assumed above was incidentService. We inject this Service the same way we injected $http and AngularJS figures out the rest!

**(Slide 30) Write to the Shared Data Cache**

You can see the incidentService.reload function being called in the Widget Client Script. This will trigger the $http call and load / write data into the shared cache.

**(Slide 31 and 32) Wrapping the Service in the Controller**

This step is purely optional. You could also expose the Service directly to the HTML Template. Personally, I like wrapping the Service functions in controller functions. It's a few extra steps but if you ever have to add additional behaviors into specific controller functions you will end up needing these steps anyway. In my opinion, this is the best way to ensure the Client Script remains the Controller and the glue between the Service Layer and the View Layer.

Take special note that I have wrapped incidentService.get in the c.getIncidents function.

### HTML Template

```html
<div ng-repeat=“inc in c.getIncidents()”>
   <!-- Incident Template Here -->
</div>
```

**(Slide 33) HTML Template and the Digest Loop**

Lastly, you can see the use of the c.getIncidents in the HTML Template. This is my favorite part about this design. Typically, when working with the $http service, you end up propagating the "then" chain throughout your Client Script in order to manage flow control during the async server calls. This forces you to return a thenable from your Service function and your code ends up looking like **incidentService.reload().then(function() {}).then(function() {}).** Ugh.

I hate it when async patterns leak into my synchronous code. This pattern lets me trap the async code in the reload function. The AngularJS digest loop is automatically triggered when $http gets its data. This means that all of our HTML Templates that call **incidentService.get()** will be immediately refreshed whenever **incidentService.reload()** is called! No "And Then" indeed!

If you didn't understand all that then suffice it to say... it just works.

## Solution 3: Use Angular Events as a Last Resort

This is the opinion that is most likely to land me in hot water but I'm going to say it anyway... I can't stand AngularJS Events. I have spent an inordinate amount of time troubleshooting widgets talking to each other via events. Before I defend my dislike any further, though, let's hear from the developer who wrote the AngularJS Event handling (Slide 35):

> Insanity Warning: scope depth-first traversal. Yes, this code is a bit crazy, but it works and we have tests to prove it - Line 1417, rootScope.js AngularJS Source Code

That's right. Insanity Warning. I highlight this mostly in jest because code comments like this make development way more entertaining. The implementation is absolutely solid and well executed but the need for an insanity warning does call special attention to the complexity of the implementation.

Usually when we think of events, we think of a central dispatch object that holds references from each event name to each of its handlers. But this isn't how AngularJS works. (Slide 36) In AngularJS, each scope from ng-app on down to your Widgets has its own event dispatcher and each scope has to be visited in a depth first traversal. Talk about inefficient!

Whereas a typical event implementation is a precision guided messaging system, in AngularJS it's more like a Will Ferrell message delivery... lots of screaming from the middle of the room.

Not only that but I will also point out that after careful evaluation, more recent versions of Angular (2, 4, and 5) have completely removed the event model in favor of dependency injected Services and nested scopes.

That said, AngularJS events do have their place. I typically recommend using them when exposing hooks for *other people's widgets*. For example, if a property changes you may not know who is using that property so it could be helpful to broadcast the update. When the purpose is unknown, the best solution can be to yell and see if anyone is listening.

That said, let's take a look at how we can go about using events (In most cases though, I wouldn't - Slide 37):

### Widget 1 Client Script

```js
function ($rootScope) {
   $rootScope.$broadcast(‘incident.changed’, {});
}
```

### Widget 2 Client Script

```js
function ($scope) {
   $scope.$on(‘incident.changed’,
       function(event, data) {
           // Do something!
       });
}
```

**(Slide 39) $rootScope Dependency Injection**

First step is to inject $rootScope into the Widget 1 Client Script function. This will allow us to broadcast events from this widget.

**(Slide 40 and 41) $rootScope.$broadcast**

From Widget 1, we call $rootScope.$broadcast to fire the event... thus triggering our Insantiy Warning code. The broadcast takes two parameters. The first is the name of the event to trigger. The second is a data object to share between Widgets.

**(Slide 42) $scope Dependency Injection**

In Widget 2, we want to inject $scope. This will allow us to listen for events on this scope.

**(Slide 43 and 44) $scope.$on**

Then we call $scope.$on to listen for an event. The $on function takes two parameters. The first is the event name that we defined in $broadcast. The second is a callback function that is called whenever the event is received.

**(Slide 45) Listener Callback**

The listener callback receives the shared data object in the second parameter. By leveraging this object in both $broadcast and the listener callback, the data is effectively shared between Widget 1 and Widget 2.

## Conclusion

So to recap, we can dramatically improve our widgets by sharing data using a few well established AngularJS techniques instead of creating highly repetitive or massively complex widgets:

1. Embed widgets to compose complex behaviors

2. Structure application models with Angular Services

3. Use Angular Events as a last resort


[1]: https://www.slideshare.net/TravisToulson/making-service-portal-widgets-work-together-97717590 "Making Service Portal Widgets Work Together"
[2]: https://www.slideshare.net/TravisToulson
