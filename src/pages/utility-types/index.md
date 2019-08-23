---
title: Bonus Round - Utility Types
date: '2019-08-09T12:00:00.000Z'
author: Matti Petrelius
---

My last post was the final part of the TypeScript in the Back series but I just could not help myself not to write another TypeScript post! So I'm calling this one a bonus round and the topic is **Utility Types**. These types have been a mystery for me a long time until recently so I thought that might be the case for others as well. Hopefully after reading this post you will understand more about utility types and where you should use them.

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

The TypeSript documentation has a [page about Utility Types](https://www.typescriptlang.org/docs/handbook/utility-types.html) but it's a bit concise. It doesn't really explain why utility types are so useful.

The main reason why I think utility types are so awesome is that when dealing with JavaScript code and libraries there's often a need for complex typings. You want the power and flexibility of JavaScript and the safety of strong types and that requires an advanced type system.

> TODO: Here the best example of using utility types with JavaScript style code/libraries (complex typing)

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

  constructor(id: number, name: string, country: string) {
    this.id = id
    this.name = name
    this.country = country
  }
}

const person = new Person(1, 'Matti Petrelius', 'Finland')
```

Now this is already a bit more work. Even with our simple example it's apparent that the code gets more verbose. There's quite a lot of repetition: the properties, constructor parameters and setting property values. Adding new properties is clearly more cumbersome than in the C# example or with an interface.

One thing to also notice is that when using constructor parameters the order of the parameters counts and you always have to pass values for each of the properties even if you don't really need them. Sure you could make the parameters **optional** but the order would still matter and it would not be as flexible as an object initializer.

Finally we get to how you can use the `Partial<T>` utility type to make initializing the object a bit nicer:

```typescript
class Person {
  id: number = 0
  name: string = ''
  country: string = ''

  constructor(init: Partial<Person>) {
    Object.assign(this, init)
  }
}

const person = new Person({
  id: 1,
  name: 'Matti Petrelius',
})
```

This might not seem like an huge improvement but it has some clear benefits. The constructor now takes a single parameter and is reduced to just a single call to the `Object.assign` function. Also the constructor can be called with any properties, just like you can with an object initializer.

There's something we had to do with the properties though. First we needed to add initializer to them. Since the properties may or may not be initialized in the constructor we have to make sure they wont be `undefined`.

That was maybe a bit lengthy explanation, but hopefully it was useful and gives you one example where the `Partial<T>` type is useful.
