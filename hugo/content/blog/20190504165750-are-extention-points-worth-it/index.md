---
years: "2019"
date: 2019-05-04 16:57:50
author: tltoulson
url: /blog/are-extension-points-worth-it
title: "Are Extension Points Worth It"
socialImg: images/social.png
description: Extension Points are a Scoped Application Developer tool launched in the London version of ServiceNow. In this article, we take a look at how it compares to previous ways of accomplishing similar tasks.
---

One of the features that most intrigued me in ServiceNow's London release was Extension Points. Unfortunately, I wasn't doing a whole lot of custom app development in London, so that intrigue was left on the bench. Recently, though, I've been doing a little more app development and starting exploring this new feature and finding myself at a cross-roads:

Do I switch to Extension Points or keep using my tried and true methods?

## What are Extension Points

Extension Points are a way for Scoped Application developers to introduce **hooks** into their code. These hooks allow other developers to introduce new logic into your application code without having to touch your code. Imagine for example you build a Risk Calculator Script Include. It's beautiful... perfect, you think until a customer comes along and asks if the Risk Calculator can factor in some criteria on a 3rd Party table. Without some form of hook, you would have to change your baseline code to include these 3rd Party tables. With hooks, however, you could allow your customer to inject some code into your Risk Calculator from the outside as long as it conforms to a specific interface.

Basically, any time you have modified a ServiceNow baseline Script Include or Business Rule... hooks like Extension Points were the solution you may not have known you wanted.

Let's take a look at Extension Points and two other tried and true approaches to achieve these types of hooks: Named Script Include Overrides and Property as a Script.

## Named Script Include Overrides

Script Includes are hardly anything new in ServiceNow but you may not have known that you can easily leverage them to create simple hooks in your application.

```js
var ScriptRunner = Class.create();
ScriptRunner.prototype = {
  initialize: function() {},

	process: function(input) {
    // Set variable to a specifically named Script Include
		var hook = global.CustomerHook;

    // If the Script Include exists, use it
		if (hook) {
			return new hook().process(input);
		}
    else {
      // Use Default behavior
    }
	},

  type: 'ScriptRunner'
};
```

The above Script Include will attempt to leverage a Script Include in the Global application scope called CustomerHook. If it exists (ie. if the customer creates it), the customer's behavior will be executed. Otherwise, the default application behavior will be executed. This is just a simple example. We also could have allowed the customer's hook to modify rather than replace our existing behavior.

This approach has been available to us since the dawn of Script Includes... in other words I don't know if there was a time we couldn't do this or something like it. Imagine how many configuration vs customization battles could have been solved if this override approach was more widely available in baseline scripts!

One major disadvantage of this approach, though is there is no way of knowing that the hook exists without reading the code or documentation to indicate it's availability.

**Key Features**
- Available in all versions as far as I am aware
- Executes a single script
- The customer must implement a Script Include of a specific name
- Does not explicitly define the hook's existence
- Is unclear about the hook's interface (input and output)
- Very fast since it is a simple Script Include execution

## Property as a Script

Another approach that I've used in the past (in fact, it's used in one of my Store apps right now) is the Property as a Script technique. This approach uses a System Property in conjunction with GlideScopedEvaluator to execute the System Property as a Script. The gist is that the System Property's value field is executable JavaScript.

```js
var PropertyRunner = Class.create();
PropertyRunner.prototype = {
  initialize: function() {},

	process: function(input) {
		var evaluator = new GlideScopedEvaluator();
		var hook = new GlideRecord('sys_properties');

    // If the System Property exists, execute it as a script
		if (hook.get('name', 'x_0505_scope_name.hook')) {
			return evaluator.evaluateScript(hook, 'value', { 'input': input });
		}
    else {
      // Execute default behavior
    }
	},

  type: 'PropertyRunner'
};
```

And the System Property value field would be something like:
```js
new global.CustomerHook().process(input);
```

In this case, the System Property is the hook instead of a pre-defined Script Include. This has some added flexibility as the customer can structure the Script Include however they desire. It also has the advantage of being explicitly defined, you can easily create a System Property page for your application that clearly indicates this as a hook. Interestingly, I picked up this trick from ServiceNow themselves who use it in the CMS and Service Portal login redirect scripts.

That said, there are a couple limitations that I have found. First, GlideScopedEvaluator can be picky about parameter passing. I have had issues getting it to accept JavaScript Object data types specifically. Also, it's performance is dog slow by comparison to the other two. More on that in a moment.

**Key Features**
- Available in Kingston and above (possibly earlier versions)
- Executes a single script
- Customer can define the hook script as long as it conforms to the interface
- Explicitly defines the hook's existence
- Is unclear about the hook's interface (output specifically)
- Worst approach for performance

## Extension Points

Lastly comes the new kid on the block, extension points. I have to say I was a bit skeptical at first but this approach really blew me away one I understood the terminology. There are three key pieces:

**Extension Point:** This record simply defines the hook / interface. In the record, you provide an **example** script that shows what the interface of the Script Include should expose. The application developer implements this record.

**Extension Point Implementation:** This record is a Script Include that implements the Extension Point's interface. The customer implements this record.

**Application Code:** The application code uses the GlideScriptedExtensionPoint API to execute **all** Extension Point Implementations associated with an Extension Point.

```js
var ExtensionRunner = Class.create();
ExtensionRunner.prototype = {
  initialize: function() {},

	process: function(input) {
		if (GlideScriptedExtensionPoint) {
			var hook = new GlideScriptedExtensionPoint().getExtensions('CustomerHook');
			if (hook[0]) {
				return hook[0].process(input);
			}
		}

    // Execute default behavior
	},

  type: 'ExtensionRunner'
};
```

First, notice that I check for the existence of GlideScriptedExtensionPoint. This should allow the script to work pre-London by skipping the Extension Point scripts (since this is a London and after feature). You'll also notice that I am only calling the first hook in an array. A customer can register multiple Extension Point Implementations against the same Extension Point unlike the previous two approaches.

Overall, I have to say that I absolutely **love** the way Extension Points are implemented. It's one of the greatest platform features I've seen introduced recently and it's performance is closer to the Script Include than to the Property based approach. I do have some concerns about that but more on that in a moment.

**Key Features**
- Available in London and above
- Executes a multiple registered scripts
- Customer can define the hook script as long as it conforms to the interface
- Explicitly defines the hook's existence
- Clearly defines the hook's interface and provides an example
- Relatively fast performance but slower than direct Script Include
- Customer's Global Script Include does not have to be available to all scopes

## Performance and Conclusions

Naturally, I ran each of these through some simplistic performance scenarios (scripts are below). I wanted to get a sense of how much was to much. I mean, Script Includes are used and abused all over the system without creating major performance impact. But that System Property GlideRecord call in the wrong place could add up, especially if you are looking to add hooks like WordPress (read: EVERYWHERE).

After running the performance test a few million times I have a fair amount of confidence in the specific scenario that I am running and I think some general principle is revealed. Keep in mind a couple things though,

1. This performance test is highly contextual and imperfect.
2. There are only a couple of total Extension Points in use compared to a high volume of Properties and Script Includes.
3. GlideRecord and Nested GlideRecords are the most common performance problem I encounter in the field. Only the System Property approach appears to be at risk of this.

### Performance Results

**Total Iterations:** 1,000,000 per Technique

**Execution Time for All Iterations**

- **Overall:** 910654ms (~15.18 minutes)
- **Script Include:** 9769ms (~1.07%)
- **Extension Point:** 37657ms (~4.14%)
- **System Property:** 863228ms (~72.83%)

**Execution Time per Iteration** - Fastest - Slowest (Average)

- **Overall:** 0ms - 181ms (0.91ms)
- **Script Include:** 0ms - 6ms (0.01ms)
- **Extension Point:** 0ms - 31ms (0.04ms)
- **System Property:** 0ms - 181ms (0.86ms)

I ran the tests in multiple ways, rearranged scripts, and tested against subtle variations but the results remained fairly consistent. Script Include was always the fastest, about 4 times faster than Extension Points, and about 80 times faster than the System Property approach.

Overall, I don't think any of these approaches will be breaking our instances any time soon though we may want to avoid the System Property approach in high volume transaction pipelines.

My greatest concern for Extension Points is that both Script Includes and System Properties are well established. The tables are chock full of records and so the performance is something we can reasonably trust. I don't know exactly how Extension Points are implemented under the hood and with only a few example records I will be very interested to see how it performs at a larger scale.

### Conclusion

At this point, I am fairly confident in saying that Extension Points are the future of my application development. I will likely replace the Script Include and System Property approaches in my toolkit with Extension Points. They are just too powerful to ignore. I can still see some edge cases where I **might** want to hold onto the Named Script Include approach.

But overall, I can't wait to deploy some apps with these Extension Point hooks. Coming soon to the ServiceNow Store near you...

## The Other Scripts

Here's the other scripts from the performance testing as promised:

### Extension Point Implementation

This is the Extension Point Implementation record which the customer would create. Real simple in this case... not trying to have the performance test take all day.

```js
var CustomerHook = Class.create();
CustomerHook.prototype = {
    initialize: function() {},

    process: function(/*String*/ input) {
        return input;
    },

    type: 'CustomerHook'
};
```

### PerfTester Script Include

This Script Include uses GlideStopWatch to handle the time calculations and track the performance of each iteration.

```js
var PerfTester = Class.create();
PerfTester.prototype = {
  initialize: function() {},

	run: function(fn, iterations, args) {
		var i;
		var count = 0;
		var totalTime = 0;
		var slowestTime = 0;
		var fastestTime = Infinity;
		var sw;
		var currentTime;

		for (i = 0; i < iterations; i++) {
			sw = new GlideStopWatch();
			fn.apply(null, args);
			currentTime = sw.time * 1;
			slowestTime = Math.max(slowestTime, currentTime);
			fastestTime = Math.min(fastestTime, currentTime);
			totalTime = totalTime + currentTime;
			count++;
		}

		var result = {
			'totalTime': totalTime,
			'avgTime': totalTime / count,
			'slowest': slowestTime,
			'fastest': fastestTime
		};

		gs.print(JSON.stringify(result));
		return result;
	},

  type: 'PerfTester'
};
```

### Background Script

And lastly the script to run in order to execute the test.

```js
var iterations = 100; // Start off small and work your way up

function runExtension() {
  var er = new x_0505_scope_name.ExtensionRunner();
  er.process('hello');
}

function runScript() {
  var er = new x_0505_scope_name.ScriptRunner();
  er.process('hello');
}

function runProperty() {
  var er = new x_0505_scope_name.PropertyRunner();
  er.process('hello');
}

var perf = new PerfTester();

gs.print('Extension:');
perf.run(runExtension, iterations);

gs.print('Script Include:');
perf.run(runScript, iterations);

gs.print('Property:');
perf.run(runProperty, iterations);
```
