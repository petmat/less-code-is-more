---
title: Serverless TypeScript
date: '2019-07-10T12:00:00.000Z'
author: Matti Petrelius
---

I like Serverless and TypeScript and Serverless is the best thing that has happened to the backend and TypeScript is the best thing that has happened to Node.js.

![Serverless TypeScript](./clouds.jpg)

<a style="background-color:black;color:white;text-decoration:none;padding:4px 6px;font-family:-apple-system, BlinkMacSystemFont, &quot;San Francisco&quot;, &quot;Helvetica Neue&quot;, Helvetica, Ubuntu, Roboto, Noto, &quot;Segoe UI&quot;, Arial, sans-serif;font-size:12px;font-weight:bold;line-height:1.2;display:inline-block;border-radius:3px" href="https://unsplash.com/@alexmachado?utm_medium=referral&amp;utm_campaign=photographer-credit&amp;utm_content=creditBadge" target="_blank" rel="noopener noreferrer" title="Download free do whatever you want high-resolution photos from Alex Machado"><span style="display:inline-block;padding:2px 3px"><svg xmlns="http://www.w3.org/2000/svg" style="height:12px;width:auto;position:relative;vertical-align:middle;top:-2px;fill:white" viewBox="0 0 32 32"><title>unsplash-logo</title><path d="M10 9V0h12v9H10zm12 5h10v18H0V14h10v9h12v-9z"></path></svg></span><span style="display:inline-block;padding:2px 3px">Alex Machado</span></a>

Serverless has become extremely popular amongst the so-called cloud native technologies. With the promise of only paying for what you use and automatic scaling it sets the bar to a new high. You don't have to worry about the infrastructure, just worry about your code.

At the same time JavaScript or more precisely Node.js has become one of the most popular languages for writing serverless applications. There are probably a lot of reasons for it, but my guess would be that the popularity of JavaScript in serverless is due to the combination of both having a concentration on fast time-to-market and serverless and JavaScript both being particularly popular in the frontend development.

This post is a part of a larger **TypeScript in the Back** series. **TypeScript** is taking the web and **JavaScript** development world by storm and it has some interesting implications on how we do things.

This is the fourth and final part of the series.

[Part 1: I'd Like Some Type in My Script Instead of Java, Please!](../id-like-some-types/)  
[Part 2: Bringing the Types Back to the Back](../bringing-the-types-back)  
[Part 3: Types Are Not Tests and Tests Are Not Types](../types-are-not-tests)  
Part 4: Serverless TypeScript

## Bring the Types Back to Serverless

JavaScript is a lot like serverless in the way that it tries to make writing software as frictionless as possible. Everything seems real easy from the start. But often the trick is not how fast you can write new code, than how easily you can modify old code.

So maintainability and readability of the code becomes a real concern. With serverless and JavaScript you can move real fast and create new things. It would be nice though if you could somehow balance moving fast and still making sure things work correctly and the code is easily maintainable.

Luckily there is a solution. Just like with regular JavaScript code, you can also use TypeScript instead of JavaScript. And just like in regular Node.js, TypeScript can provide you with some real benefits.

## TypeScript with FaaS offerings

![Clouds](./clouds.png)

FaaS or **Functions as a Service** is the compute part of serverless. You can run your code (functions) in the cloud without having to know what VM or hardware the code is actually run on. Basically, you don't have to worry about the underlying infrastructure at all, just the code you write and it's dependencies.

Each of the three big cloud providers have their own FaaS offering. AWS has Lambda, Azure has Azure Functions and Google has Cloud Functions. They all have the same basic idea and developing for them is pretty close to each other. All of them support JavaScript (Node.js) as a language choice as well as a varied range of other languages.

But how about TypeScript? That's a whole another story.

Azure Functions has a very well documented support for TypeScript. They recently released new templates for writing TypeScript functions which makes it really easy to get started.

AWS Lambda does not have official documentation about how to use TypeScript, but you can easily find _unofficial_ posts about how to set up your TypeScript configuration. And for those who use the Serverless Framework with AWS Lambda, there is a TypeScript plugin available, that minimizes the configuration needed.

## TypeScript in the Back Series

This was the fourth and the final part of my blog post series about TypeScript. I hope you have enjoyed the series! One thing is sure, this will not be my last blog post about TypeScript though!

[Part 1: I'd Like Some Type in My Script Instead of Java, Please!](../id-like-some-types/)  
[Part 2: Bringing the Types Back to the Back](../bringing-the-types-back)  
[Part 3: Types Are Not Tests and Tests Are Not Types](../types-are-not-tests)  
Part 4: Serverless TypeScript
