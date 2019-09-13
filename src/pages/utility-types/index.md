---
title: Bonus Round - Utility Types
date: '2019-08-09T12:00:00.000Z'
author: Matti Petrelius
---

My last post was the final part of the TypeScript in the Back series but I just could not help myself not to write another TypeScript post! So I'm calling this one a bonus round and the topic is **Utility Types**. These types have been a mystery for me a long time until recently so I thought that might be the case for others as well.

A complete explanation of all the utility types would be one huge blog post and take me forever to write so instead I'm going to first list all of them and then give examples of the ones which are my favorite.

For a more complete reference about the utility types you can look into the official TypeScript [docs](https://www.typescriptlang.org/docs/handbook/utility-types.html).

![Utility Types](./utilities.jpg)

<a style="background-color:black;color:white;text-decoration:none;padding:4px 6px;font-family:-apple-system, BlinkMacSystemFont, &quot;San Francisco&quot;, &quot;Helvetica Neue&quot;, Helvetica, Ubuntu, Roboto, Noto, &quot;Segoe UI&quot;, Arial, sans-serif;font-size:12px;font-weight:bold;line-height:1.2;display:inline-block;border-radius:3px" href="https://unsplash.com/@pjswinburn?utm_medium=referral&amp;utm_campaign=photographer-credit&amp;utm_content=creditBadge" target="_blank" rel="noopener noreferrer" title="Download free do whatever you want high-resolution photos from Philip Swinburn"><span style="display:inline-block;padding:2px 3px"><svg xmlns="http://www.w3.org/2000/svg" style="height:12px;width:auto;position:relative;vertical-align:middle;top:-2px;fill:white" viewBox="0 0 32 32"><title>unsplash-logo</title><path d="M10 9V0h12v9H10zm12 5h10v18H0V14h10v9h12v-9z"></path></svg></span><span style="display:inline-block;padding:2px 3px">Philip Swinburn</span></a>

## The what and the why now?

In case you've never heard of utility types you might be confused about the topic or why you should care. First of all, here are the types:

- Partial&lt;T>
- Readonly&lt;T>
- Record&lt;K,T>
- Pick&lt;T,K>
- Omit&lt;T,K>
- Exclude&lt;T,U>
- Extract&lt;T,U>
- NonNullable&lt;T>
- ReturnType&lt;T>
- InstanceType&lt;T>
- Required&lt;T>
- ThisType&lt;T>

The main reason why I think utility types are so awesome is that often when dealing with JavaScript code and libraries there's a need to do complex typing. You want the power and flexibility of JavaScript and the safety of strong types and that requires an advanced type system.

Utility types are for **type transformations** in the same way that there are many utility functions in JavaScript for **data transformations** (e.g. map, filter, reduce, and even more in libraries like lodash and ramda). Utility types typically take in one or more types and output a new type.

## Partial&lt;T>

The first time I ran into the `Partial<T>` type was when using **classes** in TypeScript. I have a background of writing a lot of **C#** code and with C# to create a new instance of a class the most common way is to use something called an **object initializer**:

```c#
class Person {
  public int Id { get; set; }
  public string Name { get; set; }
  public string Country { get; set; }
}

var person = new Person {
  Id = 1,
  Name = "Matti Petrelius",
}
```

In TypeScript there's not a similar feature like an object initializer. You could use an **interface** instead of an class and simply construct an object like you would in JavaScript:

```typescript
interface Person {
  id: number
  name: string
  country: string
}

const person: Person = {
  id: 1,
  name: 'Matti Petrelius',
  country: 'Finland',
}
```

To be honest this is what I often do with TypeScript nowadays, but many prefer to use classes. Maybe you want to encapsulate data inside the object or inject dependencies and you like to use classes for that.

Also with an interface you still have to initialize all the properties, or you get a compiler error.

With a class you need to define a **constructor** that initializes all the properties of the object.

> 💡 The truth is a bit more complex as usual with TypeScript. You only need to initialize all properties if the **strictPropertyInitialization** compiler option is enabled. But like I've stated in previous blog posts (e.g. [I'd Like Some Types](./id-like-some-types)), you should really always have the strict mode enabled with TypeScript. It gives you so much more guarantees about your code being correct.

```typescript
class Person {
  id: number
  name: string
  country: string
  city: string
  age: number

  constructor(
    id: number,
    name: string,
    country: string,
    city: string,
    age: number
  ) {
    this.id = id
    this.name = name
    this.country = country
    this.city = city
    this.age = age
  }
}

const person = new Person(1, 'Matti Petrelius', 'Finland', 'Helsinki', 37)
```

Now this is already a bit more work. Even with our simple example it's apparent that the code gets more verbose. There's quite a lot of repetition: the properties, constructor parameters and setting property values. Adding new properties is clearly more cumbersome than in the C# example or with an interface.

One thing to also notice is that when using constructor parameters the order of the parameters counts and you always have to pass values for each of the properties even if you don't really need them. Sure you could make the parameters **optional** but the order would still matter and it would not be as flexible as an object initializer.

Finally we get to how you can use the `Partial<T>` utility type to make initializing the object a bit nicer:

```typescript
class Person {
  id: number = 0
  name: string = ''
  csountry: string = ''
  city: string = ''
  age: number = 0

  constructor(init: Partial<Person>) {
    Object.assign(this, init)
  }
}

const person = new Person({ id: 1, name: 'Matti Petrelius' })
```

This is a pretty nice improvement compared to the original. The constructor now takes a single parameter and is reduced to just a single call to the `Object.assign` function. Also the constructor can be called with any properties, just like you can with an object initializer.

There's something we had to do with the properties though. First we needed to add initializer to them. Since the properties may or may not be initialized in the constructor we have to make sure they wont be `undefined`.

## Let's go a bit type crazy

There's a couple of examples that use a bunch of the utility types to create types that do validation in compile time that are usually only possible in runtime.

### RequireAtLeastOne

Let's imagine we need a type that has some properties which are optional but then it also has properties of which at least one must have a value. There's a way to implement this with utility types:

```typescript
type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<
  T,
  Exclude<keyof T, Keys>
> &
  {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>
  }[Keys]
```

Let's break this down to parts. First there is the `Pick<T, K>` utility type. It's being used in a number of places in the type transformation. The first time it's used it defines a type that picks the properties `Exclude<keyof T, Keys>` from type `T`.

But wait! There's another utility function `Exclude<T, U>`. It creates a new type that has all the properties from `T` except the properties that are assignable to the properties in `U`.

Unfortunately it gets even more complicated. Instead of the `U` here being a simple type it is a type `Keys` which in turn is defined as `Keys extends keyof T = keyof T`. The extends says that `Keys` is a type that must inherit the type `keyof T = keyof T`. The `keyof` is an operator that returns a type of the permitted property names for type `T`. The `= keyof T` part is a default value for the type parameter. This means that by default if the second type parameter is not provided, it will have the value of `keyof T`.

Ok so let's go back a bit. We now know that by default the `Keys` type provided to `Exclude<T, U>` as the second type parameter `U` is the property names of the type `T`.

> TODO TEST ASSUMPTION: What this means is that by default all the properties will be exluded?
