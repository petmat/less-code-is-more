---
title: Debugging Node.js
date: '2019-11-21T12:00:00.000Z'
author: Matti Petrelius
hashtags: nodejs
---

When I was starting my career as a developer, I was under the impression that
most of what developers do is write code. However it quickly dawned on me that a
major part of being a developer is **debugging** the code. Instead of figuring
out how to write code you spend most of your time thinking about why it does not
work.

![Debugging](./title.jpg)

<a style="background-color:black;color:white;text-decoration:none;padding:4px 6px;font-family:-apple-system, BlinkMacSystemFont, &quot;San Francisco&quot;, &quot;Helvetica Neue&quot;, Helvetica, Ubuntu, Roboto, Noto, &quot;Segoe UI&quot;, Arial, sans-serif;font-size:12px;font-weight:bold;line-height:1.2;display:inline-block;border-radius:3px" href="https://unsplash.com/@hirmin?utm_medium=referral&amp;utm_campaign=photographer-credit&amp;utm_content=creditBadge" target="_blank" rel="noopener noreferrer" title="Download free do whatever you want high-resolution photos from Max Kleinen"><span style="display:inline-block;padding:2px 3px"><svg xmlns="http://www.w3.org/2000/svg" style="height:12px;width:auto;position:relative;vertical-align:middle;top:-2px;fill:white" viewBox="0 0 32 32"><title>unsplash-logo</title><path d="M10 9V0h12v9H10zm12 5h10v18H0V14h10v9h12v-9z"></path></svg></span><span style="display:inline-block;padding:2px 3px">Max
Kleinen</span></a>

The process of trying to discover why code is not working is called debugging.
The etymology of the name debugging dates back to when computers were very
different with circuit boards and relays. The first **bug** was a moth blocking
a relay. So debugging was the actual process of removing the insect from the
circuit board.

Because debugging is such an integral part of an developers job, it is important
to familiarize yourself with the tools that you can use to debug your software.
Also debugging effectively requires a certain state of mind and methods. Being
good at debugging is something that every developer should learn and it is a
universal skill that can be applied to any programming language and platform.

## How to debug in Node.js?

I have a background in developing **C#** which is a **statically typed**
compiled language just like for example **Java**. These kind of languages
usually have debugging built-in and have **IDEs** (integrated development
environments) that support debugging out of the box.

**JavaScript** and **Node.js** are different since they don't even usually have
a specific IDE to develop with. Frontend developers utilize browser development
tools to debug and inspect code, but when writing Node.js there is not a single
correct way to debug your code. There are actually many ways debugging can be
done and choosing the right one depends on what you use case is.

This is an important point to understand: **There is not a single best practice
to debugging. It depends on what you want to accomplish.**

Depending on the complexity of the issue you are debugging you might need to
either just print out a value from the application or to stop to inspect the
state of the application in more detail. You might also want to debug the
performance and resource utilization of your app instead of going through the
code. These are all possible to do in Node.js and there are some very powerful
tools at your disposal.

## What's my value?

Without a doubt, the debugging tool that all the JavaScript and Node.js
developers are most familiar with is the **console.log** function. Console.log
is great because it allows you to print out anything you want at a specific
point of executing your app. It even handles printing objects
and arrays in a reasonable way most of the time.

Experienced debuggers might belittle console.log since it is such a simple tool compared to _"real debugging tools"_. But console.log and it's friends are actually really nifty and useful tools for all developers. Here are some examples you might or might not know of:

### Show me a table

Some data in an app is in the form of a **table**. A good example of this is a **database query**. You can always just print the value with with console.log:

```javascript
console.log(animals)
```

```
[
  { animal: 'Horse', name: 'Henry', age: 43 },
  { animal: 'Dog', name: 'Fred', age: 13 },
  { animal: 'Cat', name: 'Frodo', age: 18 },
]
```

But with `console.table` you can make it even more easy to read:

```javascript
console.table(animals)
```

```
┌─────────┬─────────┬─────────┬─────┐
│ (index) │ animal  │  name   │ age │
├─────────┼─────────┼─────────┼─────┤
│    0    │ 'Horse' │ 'Henry' │ 43  │
│    1    │  'Dog'  │ 'Fred'  │ 13  │
│    2    │  'Cat'  │ 'Frodo' │ 18  │
└─────────┴─────────┴─────────┴─────┘
```

### Deeply nested objects

If you do a lot of console.logging with **Node.js** you are bound to run in to occasional `[Object]` in your printout. This is because Node.js has a limit to how deeply nested properties of an object it will output. For example the following:

```javascript
var deep = {
  foo: {
    bar: {
      baz: {
        baaz: 'jee',
      },
    },
  },
}

console.log(deep)
```

Will output:

```
{ foo: { bar: { baz: [Object] } } }
```

So what can you do to output the whole object? The most obvious way is to serialize the object as JSON:

```javascript
console.log(JSON.stringify(deep))
```

```
{"foo":{"bar":{"baz":{"baaz":"jee"}}}}
```

But there is another solution to use `console.dir`:

```javascript
console.dir(deep, { depth: null })
```

```
{
  foo: { bar: { baz: { baaz: 'jee' } } }
}
```

### Let's count all the things

Sometimes you want to get the count of how many times a certain thing occurs in code. It can be an operation that is called inside a loop or a recursive function. One way would be to create and mutate a temporary variable. But you don't actually need to even do that if you use `console.count`. Here's an example how to use it to count how many levels deep a recursive function goes (using the `deep` object from previous example):

```javascript
function recursive(obj) {
  console.count('LEVEL')
  for (const key in obj) {
    if (typeof obj === 'object') {
      console.log(key)
      recursive(obj[key])
    }
  }
}

recursive(deep)
```

```
LEVEL: 1
foo
LEVEL: 2
bar
LEVEL: 3
baz
LEVEL: 4
baaz
LEVEL: 5
```

## You call this debugging? 😤

Simply console logging a bunch of values and hoping to find out why your app is not doing what it's supposed to can be a slow and tedious job. There are times when `console.log` is the right tool for the job, but every now and then you run into an issue that makes you hoping there was a even better way to see what's going on inside your app.

Luckily such a thing exist and it is using an actual **debugging client**. Debugging clients typically have features like stepping through code, adding breakpoints, viewing current values and adding watches. With JavaScript you can use debugging clients like Visual Studio Code and Chrome Developer Tools.

### Gentlemen, start your debuggers!

In frontend development you can simply start the debugging client by opening the developer tools of your favorite web browser. I personally prefer using Chrome but other browsers have decent debugging clients as well. The hotkey to open developer tools is usually `F12` and by selecting the right tab (**Sources** in Chrome) you can start adding breakpoints and watches.

With Node.js you have to first tell the process to listen for a debugging client on a specific port and then attach the client to it. By default debugging is not enabled but you can enable it with the `inspect` option.

```bash
node --inspect .
```

The default port Node.js listens to for debugging client is `9229`. You can also set a different port if you want.

```bash
node --inspect=9228 .
```

### Debug Node.js: Chrome Dev Tools

To use Chrome Developer tools as a debugging client for a Node.js process you should first open the broser and navigate to the URL `chrome://inspect`.

![Inspect with Chrome](./chrome-inspect.png)

On this page you can also find the **Open dedicated DevTools for Node** link. It opens up in a separate window.

![Inspect Node.js with Chrome](./chrome-inspect-node.png)

The debugging client automatically connects to the default port 9229 if there is a Node.js listening to it. You can also add your own port numbers.

So now you're ready to do all the basic debugging. Add breakpoints, check values and add watches.

### Debug Node.js: Visual Studio Code

Visual Studio Code is a **code editor** that transcends the capabilities that we normally associate with code editors. It also has a powerful debugging client that can be used to debug a plethora of platforms and languages.

The fastest way to debug a Node.js app is to open a JavaScript file and hit `F5`. If there is no **debug configuration** set, VS Code will attempt to run the file that is open and attach the debugger to it. For small apps this is fine but for a real life Node.js app you need to add a **launch configuration**.

#### Debug mode: launch

You can add a launch configuration by going to the **debug view** and clicking on the **Configure or fix launch.json** button <i style="width: 30px;height: 24px;background-image: url('/cog-icon.png');background-size: 30px 24px;display: inline-block;vertical-align: text-bottom;"></i>. Make sure you have the file you want to run open, eg. app.js, so the configuration knows which file to launch. It will generate the following `launch.json` file:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Launch Program",
      "skipFiles": ["<node_internals>/**"],
      "program": "${workspaceFolder}/app.js"
    }
  ]
}
```

The `launch.json` file contains the launch configurations for your **workspace**. The properties we are using in our configuration are:

| Property    | Description                                                                                                                                                                                                                                  |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `type`      | The type of our launch configuration is `node`. Visual Studio was clever enough to determine our app is a Node.js app.                                                                                                                       |
| `request`   | Our debug mode is `launch`. Other available debug mode would be `attach`. Launch means that when we start to debug, we also start the app. Attach will attach to a process that is already running. Well go through the `attach` mode later. |
| `name`      | Our launch configuration is named `Launch Program`. This is the name used in the configuration dropdown. If you have multiple launch configurations you should probably name them descriptively                                              |
| `skipFiles` | A list of glob patterns for the debugger to skip when stepping through code. Without this you might end up debugging Node.js or downloaded packages. With the value `<node_internals>/**` all the Node.js internal code is skipped.          |
| `program`   | The file to call when starting debugging. In our app it's `${workspaceFolder}/app.js`. `{workspaceFolder}` is a predefined variable pointing to the root of the workspace.                                                                   |

Now you can still start debugging by hitting `F5` but in the debug view you can also choose starting debug with a specific launch configuration. For now we have just one, but let's next add a new one.

#### Debug mode: attach

Often it is more likely that you already have a Node.js process running on your local machine and listening to the inspect port. In that case you don't want to start another process but to **attach** the debugging client to that process.

You can add a new launch configuration by going to the debug view and opening the **configuration dropdown**. In the dropdown there is an option `Add configuration...`. After clicking on the option choose `Node.js: Attach` as the type of the launch configuration. The following launch configuration is then created:

```json
{
  "type": "node",
  "request": "attach",
  "name": "Attach",
  "port": 9229,
  "skipFiles": [
    "<node_internals>/**"
  ]
},
```

This configuration differs from the one before by `request` being `attach` instead of `launch`. Also instead of `program` it has a property `port` which is the number of the port the process listens to for debugging clients. Just like the default port for Node.js inspect option, the default here is also `9229`.

You can now select the `Attach` configuration from the dropdown and start the debugger. It will attach to the Node.js process as long as it is already started and running.

## API for an API for an API

Applications these days rarely consist of a single piece of executable code. It's much more likely that an app has many APIs which communicate either with each other or a client app.

If you are developing an API you will most likely want to also test it at some point. Luckily these days testing an API is simple and there are many options for how to do it.

### Good old cURL

The simplest way to test an API is to use **cURL**. Let's say you have an api at https://lesscodeismore.dev. All you need to do to call it is:

```bash
curl https://lesscodeismore.dev
```

This will do a **GET** method API call. If you want to use a different method, e.g. **POST**, you can do:

```bash
curl -X POST https://lesscodeismore.dev/
```

Or to send **JSON** data with POST:

```bash
curl -d '{ "id": 123, "name": "Matti" }' -H "Content-Type: application/json" -X POST https://lesscodeismore.dev
```

cURL is a good old tool that just works. You can also use it with APIs that require authentication. The nice thing about it is that it is just an terminal command and all the calls can be scripted easily. But if you do a lot of API calls you might start to want something a little bit more powerful and easier to use.

### Visual Studio Code REST Client

This is one of my favorite Visual Studio Code extensions. You can get it from here https://marketplace.visualstudio.com/items?itemName=humao.rest-client

**REST Client** has a bunch of features but I mainly use it for simply calling REST APIs. You start by creating an HTTP file. You can either save the file with `.http` or `.rest` extension or use the keyboard shortcut `CMD + K, M` to select the language mode as `HTTP`. Then input the following and and **Send Request** link should appear above it.

```http
https://lesscodeismore.dev
```

Sending JSON data with POST is done following the HTTP standard (RFC 2616):

```http
POST https://lesscodeismore.dev
content-type: application/json

{
  "id": 123,
  "name": "Matti"
}
```

You can have multiple HTTP calls in one file but you must separate them with comments starting with `###`.

```http
### GET
GET https://lesscodeismore.dev

### POST
POST https://lesscodeismore.dev
```

REST Client is nice because the API calls can be just a file in the version control with other code. If you're already using Visual Studio Code for writing code then it's convenient to be able to use the same tool for API calls as well.

### Go G-U-I! GUI!

I personally prefer using terminal and code editor over **GUI tools** but there are a couple of good GUI REST client tools that I've come across worth mentioning.

#### The Postman cometh!

Probably the most famous and popular GUI tool for testing APIs is [Postman](https://www.getpostman.com/). Originally a Chrome Browser app, it has grown into a powerful tool with a ton of features. Some might say it's grown even a bit **too** much. However this was a tool I used a lot before I fell in love with the Visual Studio Code REST Client.

#### Insomnia

The name of the app reminds me of a 90s techno song, but apparently it's also a quite nice REST client. The download page reveals the pun in the name: "[Download Insomnia](https://insomnia.rest/)
_So you can finally GET some REST_ 😴"

Compared to Postman Insomnia keeps it simple. It doesn't feel like it has every feature crammed into it. So it appeals to devs who like more minimalistic apps. I might give it a try if I find myself fancying a more graphical interface for my API calling needs.

### REST? I use GraphQL! 😠

I've only talked about REST clients so far, but **GraphQL** is also becoming more and more popular for APIs. Luckily all of the clients I've mentioned also support GraphQL. I haven't done much comparison but at least Insomnia seems to have a nice interface for exploring GraphQL queries.

## What about performance?

Debugging is not just for finding bugs. You can also debug the performance of your app to find bottlenecks and optimize it. The most simple way is to measure 