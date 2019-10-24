---
title: Bonus Round - Utility Types
date: '2019-08-09T12:00:00.000Z'
author: Matti Petrelius
---

My previous post was the final part of the **TypeScript in the Back** series but I just could not help myself not to write another **TypeScript** post! So I'm calling this one a bonus round and the topic is **Utility Types**. These types have been a mystery for me a long time until recently so I thought that might be the case for others as well.

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

// TODO: Add these fuckers

```typescript
/**
 * Obtain the parameters of a function type in a tuple
 */
type Parameters<T extends (...args: any) => any> = T extends (
  ...args: infer P
) => any
  ? P
  : never

/**
 * Obtain the parameters of a constructor function type in a tuple
 */
type ConstructorParameters<
  T extends new (...args: any) => any
> = T extends new (...args: infer P) => any ? P : never
```

The main reason why I think utility types are so awesome is that often when dealing with JavaScript code and libraries there's a need to do complex typing. You want the power and flexibility of JavaScript and the safety of static types and that requires a really advanced type system.

Utility types are for **type transformations** in the same way that there are many utility functions in JavaScript for **data transformations** (e.g. map, filter, reduce). Utility types typically take one or more types as arguments and return a new type.

## Type Shenanigans

Hold on a moment! Before we jump into Utility Types there are some features of TypeScript you should be familiar with first.

### keyof

**Index Type Query** or `keyof` returns the permitted property names for a given type as a **union type**. The returned union type is a subtype of `string` because all the property names are strings. Here's an example:

```typescript
interface Person {
  name: string
  age: number
  location: string
}

type K1 = keyof Person // "name" | "age" | "location"
```

### type1 | type2 | type3

The keyof example resulted in an interesting looking type `"name" | "age" | "location"`. This is a **union type**. Union types are used constantly with utility types so it's best to get familiar with them. Also some of the utility types operate exclusively on union types. Union type simply means that the type can be any of the types separated with `|` character.

In the previous example type `K1` can be either `"name"`, `"age"` or `"location"` but not for example `"phoneNumber"`.

Another example of an union type would be for example:

```typescript
type T = number | string

const t1: T = 1
const t2: T = 'foo'
const t3: T = true // Type 'true' is not assignable to type 'T'.
```

Number `1` and string `foo` are valid values for type `T` but not `true` which is a `boolean`.

### T extends U ? X : Y

Conditional types are types that select one of two possible types based on a condition which is a type relationship test.

Here's a naive example of where you could use a conditional type:

```typescript
type TypeName<T> = T extends string
  ? 'string'
  : T extends number
  ? 'number'
  : 'error!'

type T0 = TypeName<string> // "string"
type T1 = TypeName<1> // "number"
```

There's one more thing about conditional types that you should understand. When dealing with union types and conditional types, the conditional type can also be a `distributive conditional type`. The definition is that if the type parameter is _naked_, meaning it's not wrapped in another type (like array for example), the conditional type is distributive.

What does it mean to be distributive though? Well distributive conditional types have one every important feature. That is that if the type parameter is a union type the condition is automatically distributed over the union during instantiation.

Our previous example with union type arguments:

```typescript
type T0 = TypeName<string | number> // "string" | "number"
```

### P in keyof T

**Mapped Types** are a way to create new types based on old types. Here is a fictious example:

```typescript
type Foo = { a: number; b: string }
type Flags = { [P in keyof T]: boolean } // { a: boolean, b: boolean }
```

Think of the `[P in K]: T` as the same kind of syntax as `for .. in`. All the properties `K` on the right side of `in` will be iterated over and the bound type variable on each turn is `P`. The resulting type is `T`. Things get a bit more complicated in actual utility types but this is the basic idea of mapped types.

When looking at how utility types are implemented, you will bump into `keyof T` a lot.

## Partial&lt;T>

This utility type can be used to create a type with any number of fields from the original type. Here's the implementation of the type:

```typescript
type Partial<T> = { [P in keyof T]?: T[P] }
```

Based on what we learned about `keyof` and mapped types we can read that this means that every property type from original type `T` will be mapped to a new property that is optional.

The first time I ran into the `Partial<T>` type was when using classes in TypeScript. I wanted to create an instance of a class in the same way it can be done with an **object initializer** in for example **C#**.

> 💡 In case you're not familiar with C# this is what the object initializer looks like:

```csharp
var person = new Person() {
  Id = 1,
  Name = "Matti"
};
```

In TypeScript there's not a similar feature like an object initializer. With a class you need to define a constructor that initializes all the properties of the object.

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

That's a lot of code just to initialize an object. We can keep the code more concise with the `Partial<T>` utility type.

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

Now the constructor takes a single parameter and has a single call to the `Object.assign` function. Also the object given as an argument can have any number of properties, just like you can with an object initializer. Still the type checker will make sure you can only use properties from the `Person` type.

> 💡 When creating an instance this way, we needed to add initializers to the properties. Since the properties may or may not be initialized in the constructor we have to make sure they wont be `undefined`.

## Required&lt;T>

This utility type takes a type as argument `T` and transforms all of it's properties to required. In essence it's the opposite of `Partial<T>`. Here is the implementation:

```typescript
type Required<T> = { [P in keyof T]-?: T[P] }
```

You might be wondering about the strange looking `-?` syntax but it simply means that the `?` will be removed from the property definition if it exists, effectively making the property non-optional aka required.

```typescript
interface Foo {
  a?: number
  b?: string
}

const foo: Foo = { a: 0 } // This is fine

type Bar = Required<Foo>

const bar: Bar = { a: 0 } // Error: property 'b' missing
```

One can imagine this being useful when a type is inferred from an object literal and some fields have been marked as nullable even though the intention is to have a type with all required properties.

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

The utility type `Readonly<T>` takes a type as a parameter and creates a new type with all the properties marked as `readonly`. Here's the implementation:

```typescript
type Readonly<T> = { readonly [P in keyof T]: T[P] }
```

As you can see this is another mapped type that adds a `readonly` modifier to all of the properties of `T`.

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
import React from 'react'

interface Props {
  foo: string
}

export class SomeComponent extends React.Component<Props> {
  someMethod() {
    this.props.foo = 'bar' // Cannot assign to 'foo' because it is a read-only property.
  }
}
```

## Record&lt;K,T>

This utility type creates a new type with given properties `K` all of the same type `T`. Here is the implementation:

```typescript
type Record<K extends keyof any, T> = { [P in K]: T }
```

One thing to note here is that `K` is `keyof any` which means that it can be given any property names instead of copying them from an existing type. In other words while all the other mapped types so far have been **homomorphic** the `Record<K, T>` is not.

Here is a simple example:

```typescript
type K = 'foo' | 'bar'
type T = Record<K, boolean> // { foo: boolean, bar: boolean }
```

You can also of course use the `keyof` operator to get the properties of a type and then create another type with `Record<K,T>` having the same properties but with different type.

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

This utility type is useful when you want to create a new type that has a subset of another type's properties. Here's the implementation:

```typescript
type Pick<T, K extends keyof T> = { [P in K]: T[P] }
```

Notice that `K` is a subtype of `keyof T` since it's using the `extends` keyword. This means that all properties must exist on type `T` but all properties are not required in `K`.

Often you need some properties from a type but not all of them for example fro a view model or data transfer object. In those cases the `Pick<T, K>` utility type can be useful.

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

This utility type creates a new type without the given properties. It is the opposite of `Pick<T, K>`. Here's the implementation:

```typescript
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>
```

Whoops, the implementation uses a utility type that we have not introduced yet. But don't worry we will get to `Exclude<T, U>` next. At this point, it is enough to know that it removes the given `K` properties from the `keyof T` properties of type `T` and returns the remaining properties. After that `Pick<T>` can be used to pick the remaining properties from type `T`. Quite a clever way of combining the utility types to make new utility types.

So you can use `Omit<T, K>` to create a new type that has a subset of type `T` properties, by providing as argument `K` the properties you don't want in the new type. Sometimes it's easier to define the properties to omit instead of all properties you want to pick.

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

## Exclude&lt;T,U>

This utility type is like `Omit<T, K>` but for union types. It returns a new type that consists of types in `T` that are not assignable to type `U`. Here's the implementation:

```typescript
type Exclude<T, U> = T extends U ? never : T
```

Do you still remember conditional types? Here we are introduced to one. Also we have a curious type called `never`. The implementation reads that if `T` is assignable to `U` return type `never` otherwise `T`. And since the conditional type is also an distributive conditional type, it is applied over union types, resulting in `never` when the type is not assignable to `U`. And because `string | never | number` results in `string | number` the `never` values are simply removed from the resulting union type.

Here's an example of how to use `Exclude<T, U>`:

```typescript
type T0 = Exclude<'a' | 'b' | 'c', 'a'> // "b" | "c"
type T1 = Exclude<'a' | 'b' | 'c', 'a' | 'b'> // "c"
type T2 = Exclude<string | number | (() => void), Function> // string | number
```

## Extract&lt;T,U>

This is the opposite of `Exclude<T,U>` and therefore also operates on union types. It creates a type with types from `T` that are assignable to `U`. Here's the implementation:

```typescript
type Extract<T, U> = T extends U ? T : never
```

It's excatly like `Exclude<T, U>` but the true and false expressions are flipped! So the types assignable to `U` will be kept and others removed. Here's an example:

```typescript
type T0 = Extract<'a' | 'b' | 'c', 'a' | 'f'> // "a"
type T1 = Extract<string | number | (() => void), Function> // () => void
```

## NonNullable&lt;T>

This type also operates on union types. It removes `null` and `undefined` types from the given type and return the resulting type.

Here is the implementation of the type:

```typescript
type NonNullable<T> = Exclude<T, undefined | null>
```

So in the essence the following type definitions are equal:

```typescript
type T0 = NonNullable<string | number | undefined> // string | number
type T1 = Exclude<string | number | undefined, undefined | null> // string | number
```

Where you would use this is probably in situations where you have an existing type that has nullable properties but you want to end up with a type without any properties that can have nulls in them.

## ReturnType&lt;T>

This is a type that takes a type parameter that needs to be a function and returns the return type of that function. For example:

```typescript
type T1 = ReturnType<(s: string) => number> // number
```

Here is the implementation for the type:

```typescript
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any
```

One situation where you might want to use this is when you have a function that returns an object created with an object literal and is therefore inferred by TypeScript. You could define the type mimicing the object literal but an easier way is to use `ReturnType<T>`:

```typescript
function results(num1, num2) {
  return {
    sum: num1 + num2,
    equals: num1 === num2,
    concat: `${num1}${num2}`,
  }
}

type Foo = ReturnType<typeof results> // { sum: number, equals: boolean, concat: string }
```

## InstanceType&lt;T>

This is a somewhat mindboggling one. It's not easy to come up with a real-life example of how you would use `InstanceType<T>` but I'll try. First of all, here is the implementation:

```typescript
type InstanceType<T extends new (...args: any) => any> = T extends new (
  ...args: any
) => infer R
  ? R
  : any
```

What it does is takes a constructor function type and returns its return type. A naive example would be the following:

```typescript
class A {
  b = 0
  c = ''
}

type T = InstanceType<typeof A> // A
```

But this does not really make sense since the resulting type is just `A` so this could have been much easier expressed with just `type T = A`.

But what if we want to declare a generic factory function. Like this:

```typescript
declare function create<T extends new () => any>(c: T): InstanceType<T>

class A {
  b: 0
}

const a = create(A) // A
```

Since `create<T>` is a generic function the return type is not explicitly known. The return type also cannot be simply `T` because it refers to the type itself but rather `InstanceType<T>` which means that the function returns an instance of type `T`.

## ThisType&lt;T>

Saved the best for last, or rather the most esoteric one. This type is an exception to the rule in that it does not return a transformed type like all the other ones. It is used to mark the contextual `this` type. Take a look at this example (it's directly from the TypeScript documentation. I just couldn't come up with my own example. Not really sure there are any other examples.):

> 💡 By the way, this utility type cannot be used unless you also enable the `noImplicitThis` compiler option.

```typescript
type ObjectDescriptor<D, M> = {
  data?: D
  methods?: M & ThisType<D & M> // Type of 'this' in methods is D & M
}

function makeObject<D, M>(desc: ObjectDescriptor<D, M>): D & M {
  let data: object = desc.data || {}
  let methods: object = desc.methods || {}
  return { ...data, ...methods } as D & M
}

let obj = makeObject({
  data: { x: 0, y: 0 },
  methods: {
    moveBy(dx: number, dy: number) {
      this.x += dx // Strongly typed this
      this.y += dy // Strongly typed this
    },
  },
})

obj.x = 10
obj.y = 20
obj.moveBy(5, 5)
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
