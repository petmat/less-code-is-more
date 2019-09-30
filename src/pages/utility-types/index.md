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

The first time I ran into the `Partial<T>` type was when using **classes** in TypeScript. I have a background of writing a lot of **C#** code and with C# to create a new instance of a class the most common way is to use something called an **object initializer**.

In TypeScript there's not a similar feature like an object initializer. With a class you need to define a **constructor** that initializes all the properties of the object.

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

That's a lot of code just to initialize an object. We can do better by using the `Partial<T>` utility type.

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

This is a pretty nice improvement compared to the original. The constructor now takes a single parameter and is reduced to just a single call to the `Object.assign` function. Also the constructor can be called with any number of properties, just like you can with an object initializer.

There's something we had to do with the properties though. First we needed to add initializer to them. Since the properties may or may not be initialized in the constructor we have to make sure they wont be `undefined`.

## Readonly&lt;T>

There's a `readonly` keyword in TypeScript that allows you to mark a property on a type to only allow reading the value and not reassigning it.

```typescript
type Foo = {
  readonly bar: string
}

const baz: Foo = {
  bar: 'qux',
}

baz.bar = 'quux' // Cannot assign to 'bar' because it is a read-only property.
```

The utility type `Readonly<T>` takes a type as a parameter and creates a type with all the properties marked as `readonly`.

```typescript
type ReadAndWriteFoo = {
  bar1: string
  bar2: string
}

type Foo = Readonly<ReadAndWriteFoo>

const baz: Foo = {
  bar1: 'qux1',
  bar2: 'qux2',
}

baz.bar1 = 'quux' // Cannot assign to 'bar1' because it is a read-only property.
```

The utility type `Readonly<T>` is useful if you want to make all properties readonly. Preventing reassignment is useful in functional programming paradigms. For example React uses `Readonly<T>` in it's type definitions to make props and state types readonly so that the type checker will throw an error if you try to assign a value to them.

```typescript
interface Props {
  readonly bar: number
}

interface State {
  readonly baz: number
}

export class Something extends React.Component<Props, State> {
  foo() {
    this.props.bar = 123 // ERROR: (props are immutable)
    this.state.baz = 456 // ERROR: (one should use this.setState)
  }
}
```

## Record&lt;K,T>

This utility type can be used to map the properties of a type to another type. For example you can use the `keyof` operator to get the properties of a type and then create another type with `Record<K,T>` having the same properties but with different type.

```typescript
type PropDefinition = {
  typeName: string
  description: string
}

type Foo = {
  bar: string
  baz: number
}

type FooDefinition = Record<keyof Foo, PropDefinition>

const fooDef: FooDefinition = {
  bar: { typeName: 'string', description: 'This is bar' },
  baz: { typeName: 'number', description: 'This is baz' },
}
```

## Pick&lt;T,K>

This utility type is useful when you want to create a new type that has a subset of another type's properties. Often you need some properties from a type but not all of them for example fro a view model or data transfer object. In those cases the `Pick<T, K>` utility type can be useful.

```typescript
type Foo = {
  bar: string
  baz: number
  qux: boolean
}

type NewFoo = Pick<Foo, 'bar' | 'baz'>

const newFoo: NewFoo = {
  bar: 'bar',
  baz: 'baz',
}
```

## Omit&lt;T,K>

`Omit<T, K>` is the opposite of `Pick<T, K>`. You can use it to create a new type that has a subset of another type's properties, but instead of providing the properties you want to keep you provide the properties you don't want in the new type. Sometimes it's easier to list the properties to exclude instead of all properties you want to include.

```typescript
type Foo = {
  bar: string
  baz: number
  qux: boolean
}

type NewFoo = Omit<Foo, 'qux'>

const newFoo: NewFoo = {
  bar: 'bar',
  baz: 'baz',
}
```

## Let's go a bit type crazy

Utility types are super powerful and a testament to the awesomeness of the type system in TypeScript. For more proof I will just add a couple of very complex but useful types here that I found on Stack Overflow. I won't go into detail about them but you can read about them in the Stack overflow thread: https://stackoverflow.com/a/49725198

```typescript
type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<
  T,
  Exclude<keyof T, Keys>
> &
  {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>
  }[Keys]

type RequireOnlyOne<T, Keys extends keyof T = keyof T> = Pick<
  T,
  Exclude<keyof T, Keys>
> &
  {
    [K in Keys]-?: Required<Pick<T, K>> &
      Partial<Record<Exclude<Keys, K>, undefined>>
  }[Keys]
```
