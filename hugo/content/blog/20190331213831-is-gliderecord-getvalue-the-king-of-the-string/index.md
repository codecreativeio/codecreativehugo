---
years: "2019"
date: 2019-03-31 21:38:31
author: tltoulson
url: /blog/is-gliderecord-getvalue-the-king-of-the-string
title: "Is GlideRecord getValue the King of the String"
socialImg: images/social.png
description: Everyone knows when using GlideRecord, getValue is the best practice for returning a string value.  Or is it? In this post, I conduct an analysis to see if getValue is truly the King of the String.
---

## King of the String

This article will be long, so here's as quick a synopsis as I can muster. In order to determine if getValue is truly a best practice superior to other GlideRecord field string coercions, I collected and analyzed 278,738 data samples from ServiceNow records in the global scope of a Madrid Personal Developer Instance and compared the resulting types and values of 5 different methods:

- GlideRecord getValue (gr.getValue('field'))
- GlideElement getValue (gr.field.getValue())
- Plus-Quote-Quote (gr.field + '')
- String Constructor (String(gr.field))
- toString (gr.field.toString())

I evaluated the tested methods against 4 criteria I determined at the start with the assumption that these characteristics would need to be exist for a method of accessing the internal string value of a GlideRecord's field to be a best practice:

- Tested method returns a String in all scenarios
- Tested method returns the expected value in all scenarios
- Tested method has consistent readability in multiple scenarios (immediate field vs dot-walking)
- Tested method is stable and not at risk to future change

### Conclusion First

After thorough analysis, I am still unconvinced of getValue's supremacy and will likely stick with my long time preferred method of plus-quote-quote. Aside from null values and boolean fields, there weren't anything more than a few subtle, mostly subjective differences in the tested methods.

The important differences to note are the potential for getValue to return NULL values and its use of "0" and "1" in place of "true" and "false". Plus-quote-quote and String constructor yielded the expected empty string and "true" / "false" strings. The oddest of the bunch was toString but it was still perfectly usable.

The most important takeaway I can offer is this: know your return types and develop defensively. Follow that guideline, and any of the string coercion methods will work for you.

If you are interested, keep reading for further analysis and feel free to download the Get Value Analysis app to pull samples in your own instance to contribute to the conversation.

---

# Analysis

## Intro

I often hear it taught that when using GlideRecord, developers should use the getValue function. I've heard a number of explanations for why it is necessary but for me none of them ever stuck. Personally, I've always used JavaScript's implicit type coercion.

But very smart people that I trust kept insisting getValue was the best practice. So eventually, I did what any perfectly sane individual would do and ran an experiment to analyze the return values for getValue and it's alternatives across 17 tables and 52 ServiceNow field types in a Madrid Personal Developer Instance. In total, I captured 278,738 data samples for each of the 5 different tested methods. And of course I wrote an application for this so you can run the same tests against your own data sets and decide for yourself.

Perfectly. Sane. Individual.

## Reasons I Dismiss

Up front I want to address the most common reasons I hear for why we should all use getValue and why they don't hold water for me.

### Getters and Setters are Best Practice

In a language like Java, accessor and mutator methods like getValue and setValue are considered a part of life. Tools even offer to automatically generate them for you based on a class' internal properties. This, according to conventional wisdom, provides encapsulation of the private state of the class and also allows the class to evolve its behaviors without breaking its interface / contract.

There's just a few problems I have with this argument:

1. [Get and Set functions are not encapsulation][1]
2. GlideRecord is a database abstraction layer, not a domain model. As a record, it's public interface IS it's internal state.
3. JavaScript has a native language feature called getters and setters which can easily provide the same advantages
4. The Rhino JS engine used by ServiceNow exposes [Dynamic Properties][2] which provide the same advantages

In particular, I want to focus on #3 and #4. Both JavaScript's native language feature *getters and setters* and Rhino's *Dynamic Properties* allow you to use property-like syntax for assignment and accessing with the advantages of getter and setter methods.

Try running this in a background script:

```js
var gr = {
  _number: 'INC000070',
  get number() {
    gs.print('Sweet Christmas, an accessor method');
    return this.a;
  },
  set number(x) {
    gs.print('Sweet Christmas, a mutator method');
    this.a = x;
  }
};

gr.number = 'INC000080';
gr.number;
```  

Sweet Christmas, indeed. By the way, this same concept applies to using an assignment operator on a GlideElement property. Once upon a time the assignment below may have overwritten the GlideElement but it's not the case anymore. Try running this as a background script:

```js
var gr = new GlideRecord('incident');
gr.setLimit(1);
gr.query();
gr.next();

// Assigning to a string will change the GlideElement reference they say
gr.sys_created_on = '2019-04-01 00:00:00';

if (gr.sys_created_on.getValue) {
  gs.print("I guess I'm still a GlideElement");
  gs.print("My type is: " + typeof gr.sys_created_on);
}
else {
  gs.print("Well darn, I guess I changed");
}
```

There are still some pretty convincing arguments in favor of setters for certain field types but I won't be going into those here.

So overall, the getter / setter "best practice" argument leaves me unconvinced.

### Type Coercion is Essential

I don't actually disagree with type coercion being essential. Type coercion IS essential when working with GlideElement in loops especially. GlideElement is an object that passes by reference and that reference's value is changed with each iteration of the GlideRecord's while loop. This means we often encounter situations where we have to coerce to a primitive data type.

But getValue is not JavaScript type coercion, it's a method whose interface returns a string which as it turns out is a very important distinction. String coercion in JavaScript is performed implicitly (plus-quote-quote) or explicitly with the String constructor or toString functions.

This was an especially important distinction when once upon a time ServiceNow had many functions which would expose a Java string object instead of a JavaScript string primitive.

There are arguments out there that we should exclude certain approaches and I'm open to that idea but I need evidence and data. Which brings me to the next reason that I dismiss.

### Because Someone Said So

Sadly, most of the arguments that I've collected amount to little more than "because someone said so" which is occasionally made to seem more important by saying "because it's a best practice". First of all, I try to avoid the use of the phrase "best practice". Even when I do use the term it is very uncomfortable for me ([I'm sure there's a few rewrites needed on this one for example][3]). "Don't light yourself on fire" is a pretty darn good example of a best practice... unless, of course, you are a stunt person and your livelihood depends on it. The fact is, best practices will almost always be highly contextual, nuanced, and often subject to change.

An extension of this argument is the "because ServiceNow says it's a best practice". But behind the grandeur, mythos, and legend of ServiceNow is people. Great people to be sure, but people all the same. No one is immune to making mistakes.

For many years, I personally refused to follow the published customization best practice to inactivate the existing record and create a new custom record. My reasoning was simple. In doing so you went from one deviation from baseline to two. Also, the custom record is harder to detect than a collision with a customized record. Apparently, many developers realized the same thing and ServiceNow has changed their training to advise customizing records in place. Best practices change.

Furthermore, just because ServiceNow says it will be supported... doesn't mean it will be. CMS was neglected for a couple years before Service Portal came along. I still remember the battles with the iFrame resize script version in and version out. Then there was the time that GlideRecordSecure had major issues. And let's not even get into breaking changes between application versions. I feel like there's a "raise your hand if you've ever felt personally victimized by a breaking change in ServiceNow" moment here.

And if I'm coming across as overly critical of ServiceNow, I'm not trying to be. I just want us to have realistic expectations. They are only human.

That said, I do use a "does ServiceNow do it" benchmark which has served me well. If a pattern exists in ServiceNow's baseline code, then you can usually count on an upgrade path. It worked well for me pre-Calgary before Package calls were removed and it works well for me today.

So if I consider all of those reasons to be poor benchmarks, how do I intend to measure the effectiveness of the getValue function and its friends?

## Evaluation Criteria

Well, to determine if getValue is truly a best practice, I analyzed a combination of both objective and subjective criteria. As a best practice, I would expect it to achieve all criteria in a way that is superior to all other tested methods.

1. **Expected Type Returned:** The tested method should return the correct data type in all scenarios - a JavaScript string primitive

2. **Expected Value Returned:** The tested method should return the expected value in all scenarios

3. **Consistent Readability:** The script of the tested method should be consistent in multiple scenarios whether returning a value for a direct GlideElement or dot-walking to reduce confusion for beginners

4. **Long Term Stability:** The tested method's results should not be at risk to change due to future upgrades. Stable methods are generally either documented or common practice used in the codebase.

## Tested Type Coercion Methods

A total of 5 methods for type coercion were tested, analyzed, and compared against the evaluation criteria to determine if there is a clear best practice:

1. GlideRecord getValue (gr.getValue('fieldName'))
2. GlideElement getValue (gr.fieldName.getValue())
3. Plus-Quote-Quote (gr.fieldName + '')
4. String Constructor (String(gr.fieldName))
5. toString (gr.field.toString())

It was important to differentiate between the GlideRecord and GlideElement versions of the getValue functions. This is commonly overlooked in most of the conversations about the getValue function. Many developers I have spoken with or whose work I have read simply speak of getValue as though there is only one function which often results in confusion and lots of questions. In this analysis, I have made sure to evaluate them separately.

## Analysis of Alternatives

### GlideRecord getValue

Example:

```js
var gr = new GlideRecord('incident');
gr.setLimit(1);
gr.query();
gr.next();

// getValue
var val = gr.getValue('number');
gs.print(val);
```

**Criteria Results**

- Expected Type Returned: **Fail**
- Expected Value Returned: **Fail**
- Consistent Readability: **Fail**
- Long Term Stability: **Pass**

**Pros:**

- ServiceNow's documented method of retrieving a string value implies long term stability
- ServiceNow's most extensively used variation in their baseline scripts (Over 300 Script Includes contain some form of GlideRecord getValue call)

**Cons:**

- Can return a NULL value instead of a String
- Returns '0' or '1' for Boolean fields
- Can not be used with dot walking

The criteria results look bad but it's not the end of the world for GlideRecord getValue. It's still a fine tool for the job, it just didn't meet my expectations.

First of all, getValue can return a null value. In the grand scheme of things, this isn't a big deal. But it is really difficult for me to wrap my mind around this. The getValue function is supposed to return a string value of the underlying element in a field. What field element would have a complete absence of a string representation?

To break this down further, this means to do anything to the alleged string, you should technically perform a null check first or filter out nulls. If you don't, there are a myriad of problems with null in JS from null + '' == 'null'. That's a fun result. Oh and then there's TypeError if you try to perform a length check or indexOf check, commonly used string methods. Now normally I would advise defensive programming in the first place... but the API contract says it returns a string value! Empty string seems far more reasonable in every case I can think of.

Next up, we have the issue that Boolean fields return a string value '0' or '1'. In a script where the field type may not be known, which type check is more clear:

```js
if (something == '0') {
  // Um... WAT?
}

if (something == 'false') {
  // Well if I can't have a real boolean I guess this will work
}
```

Now admittedly, there may be a getBooleanValue with which I am unfamiliar. But if I want a string representation of the boolean value, doesn't 'true' and 'false' make a whole lot more sense?

Lastly, the GlideRecord's getValue function doesn't support any sort of dot-walking and has a different signature than the GlideElement getValue which results in a lot of confusion for inexperienced developers. For example, if we want to get the Assignment Group's Manager:

```js
var gr = new GlideRecord('incident');
gr.setLimit(1);
gr.query();
gr.next();

gs.print(gr.getValue('assignment_group')); // how the direct field script looks

gs.print(gr.getValue('assignment_group.manager')); // Doesnt work
gs.print(gr.assignment_group.getValue('manager')); // Doesn't work

gs.print(gr.assignment_group.manager.getValue()) // We have to resort to the GlideElement version for dot walking
gr.getElement('assignment_group.manager').getValue(); // Closest alternative? But still using GlideElement
```

In the above script, we can see that the GlideRecord getValue accepts a string parameter but it can not be a dot walked field. For dot walking, we are forced to resort to the GlideElement version of getValue which does not accept a string value.

To inexperienced developers this creates significant confusion and I have fielded many questions on this aspect alone. The functions look the same, but their signature... how they are used is very different. Combined with getElement accepting a dot walked parameter and good night... I'm done.

As for the statistics, both getValue functions returned the same values in all cases except Boolean and those dastardly null values. Sadly, this amounted to being consistent in only 57.28% of the samples and 42.31% of the field types.

But as I said earlier, experience shows that most developers have been able to navigate these issues easily enough or have simply not encountered them to begin with. That said, it's hard to accept this function a best practice when other options behave more consistently.

### GlideElement getValue

Example:

```js
var gr = new GlideRecord('incident');
gr.setLimit(1);
gr.query();
gr.next();

// getValue
var val = gr.number.getValue();
gs.print(val);
```

**Criteria Results**

- Expected Type Returned: **Fail**
- Expected Value Returned: **Fail**
- Consistent Readability: **Pass**
- Long Term Stability: **Fail**

**Pros:**

- Consistent script readability in all scenarios

**Cons:**

- Can return a NULL value instead of a String
- Returns '0' or '1' for Boolean fields
- Not documented
- Not available in Scoped Applications

The GlideElement getValue suffers the same type return issues as the GlideRecord version mentioned above. Accepting the practice of getValue, I actually prefer GlideElement's version of getValue. And since I prefer it, you know it's the wrong way to do it! GlideElement's getValue is not only not documented but it is not available in Scoped Applications either which is a bit of a red flag to me that ServiceNow may not want us to use it.

Bummer. This method had a chance to convert me.

### Plus-Quote-Quote

Example:

```js
var gr = new GlideRecord('incident');
gr.setLimit(1);
gr.query();
gr.next();

// Plus-Quote-Quote
var val = gr.number + '';
gs.print(val);
```

**Criteria Results**

- Expected Type Returned: **Pass**
- Expected Value Returned: **Pass**
- Consistent Readability: **Fail**
- Long Term Stability: **Pass**


**Pros:**

- Used in ~400+ Scripts in a Baseline Instance implies this method's use isn't going away any time soon
- Always returns a string
- Consistent script readability in all scenarios
- Returns the expected 'true' and 'false' string representations for booleans

**Cons:**

- Not ServiceNow's Documented method
- May not be explicit enough for inexperienced developers

This was the most unexpected part of the analysis. I assumed that if there were differences, they would fall in favor of getValue but that was not the case at all. Sure, this method is not documented by ServiceNow but it is extensively used by ServiceNow's developers. So unless ServiceNow imposes a major change, we can expect implicit type coercion to continue to work in future versions. That combined with the anecdotal evidence that I've been using this method myself since roughly 2011 gives me a fair amount of confidence in it.

The biggest plus though is that it always returns a string. Empty field? That's an empty string. This simplifies type checking and gives me exactly what I would have expected from the getValue API's. Simpler scripts without the risk of TypeErrors. Now that's an approach I can live with.

Controlling for the null and boolean values, Plus-Quote-Quote was consistent with getValue's results 100% of the time.

That said, the one major drawback I can see is that plus-quote-quote is by definition implicit string coercion. That key word *implicit* means inexperienced developers may not recognize the syntax. Obviously, that is a hazard I am willing to take. Some may disagree, but I failed this method for readability on account of the number of inexperienced programmers who have asked me what the *+ ''* is at the end of my lines of code.

### String constructor

Example:

```js
var gr = new GlideRecord('incident');
gr.setLimit(1);
gr.query();
gr.next();

// String Constructor
var val = String(gr.number);
gs.print(val);
```

**Criteria Results**

- Expected Type Returned: **Pass**
- Expected Value Returned: **Pass**
- Consistent Readability: **Pass**
- Long Term Stability: **Pass**

**Pros:**

- Always returns a string
- Consistent script readability in all scenarios
- Returns the expected 'true' and 'false' string representations for booleans

**Cons:**

- Not ServiceNow's Documented method
- Used in at least 50+ Scripts in a Baseline Instance implies this method may be replaceable but it has some staying power

This method was 100% consistent with the results of Plus-Quote-Quote samples. The main exception is that it is much less frequently used by ServiceNow. While that may imply a greater risk of replacement, String is a JavaScript native implementation. I don't expect many changes to this function but I could be wrong on that.

Additionally, this method is more explicit for newer developers. This one is a tough call but ultimately I chose to stick with Plus-Quote-Quote due to it's wider use.

### toString Function

Example:

```js
var gr = new GlideRecord('incident');
gr.setLimit(1);
gr.query();
gr.next();

// String Constructor
var val = gr.number.toString();
gs.print(val);
```

**Criteria Results**

- Expected Type Returned: **Fail**
- Expected Value Returned: **Fail**
- Consistent Readability: **Pass**
- Long Term Stability: **Pass**

**Pros:**

- Always returns a string
- Returns the expected 'true' and 'false' string representations for booleans
- Used in 350+ Scripts in a Baseline Instance implies this method may be replaceable
- Documented ServiceNow function

**Cons:**

- There is no explanation for the difference between this string representation and getValue's
- Can return a NULL value instead of a String

Lastly, we have the drunk uncle of the bunch. The toString makes absolutely no sense to me. In some cases on Wiki Text fields (possibly others?) it returns null like getValue. But it returns a proper 'true' and 'false' like plus-quote-quote and String constructor. Once upon a time using toString could result in pointing to the Java toString function which would yield odd results but I haven't tried it since Calgary when I stopped using it and those results didn't show up in my samples so I guess that has been worked out.

It is used by ServiceNow pretty extensively but it's hard to tell how exactly that function is being used since it can be used in many different scenarios.

Further more, there is no explanation as to why toString and getValue would yield different string results for the same field when they are both documented and maintained by ServiceNow.

I suppose if toString were the recommended best practice and used more extensively than getValue, then getValue would be the drunk uncle. But that's not how the chips fell for toString.

I want to love it. It so closely resembles GlideElement's getValue function. And yet, it scares the crap out of me. I may need to test this one further.

## Don't Take My Word For It

<a href="downloads/Get Value Analysis App 0_0_1.xml" download>Download the Get Value Analysis ServiceNow App</a>

So here's the thing, I'm not the great arbiter of truth for the ServiceNow platform. I'm just a random guy on the internet sharing what I learn. So don't take my word for it, run the analysis for yourself.

Install the update set for the Get Value Analysis App. Navigate to Get Value Analysis > Run Analysis and use the Service Portal page to collect samples from your own instance. Change up the Sample Sources (it doesn't support dot-walking right now). Improve the app. Contribute to the conversation.

Try it on London. Try it on Jakarta. Try it on Calgary if you got it.

If you find some interesting data points, let me know!

[1]: https://medium.com/@Jernfrost/to-hell-with-setters-and-getters-7814e7b2f949
[2]: https://developer.mozilla.org/en-US/docs/Mozilla/Projects/Rhino/Embedding_tutorial#dynamic
[3]: /blog/6-best-practices-for-service-portal-css/
