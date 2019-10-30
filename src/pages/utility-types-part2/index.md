---
title: Bonus Round - Utility Types - Part 2
date: '2019-10-31T12:00:00.000Z'
author: Matti Petrelius
---

This post is the second part of a two part series about **Utility Types** in **TypeScript**. The first part can be found [here](../utility-types-part1).

**Utility Types** have been a mystery for me a long time until recently so I thought that might be the case for others as well and maybe I should write about them. The main reason why I think utility types are so awesome is that often when dealing with JavaScript code and libraries there's a need to do complex typing.

![Utility Types](./title.jpg)

<a style="background-color:black;color:white;text-decoration:none;padding:4px 6px;font-family:-apple-system, BlinkMacSystemFont, &quot;San Francisco&quot;, &quot;Helvetica Neue&quot;, Helvetica, Ubuntu, Roboto, Noto, &quot;Segoe UI&quot;, Arial, sans-serif;font-size:12px;font-weight:bold;line-height:1.2;display:inline-block;border-radius:3px" href="https://unsplash.com/@neonbrand?utm_medium=referral&amp;utm_campaign=photographer-credit&amp;utm_content=creditBadge" target="_blank" rel="noopener noreferrer" title="Download free do whatever you want high-resolution photos from NeONBRAND"><span style="display:inline-block;padding:2px 3px"><svg xmlns="http://www.w3.org/2000/svg" style="height:12px;width:auto;position:relative;vertical-align:middle;top:-2px;fill:white" viewBox="0 0 32 32"><title>unsplash-logo</title><path d="M10 9V0h12v9H10zm12 5h10v18H0V14h10v9h12v-9z"></path></svg></span><span style="display:inline-block;padding:2px 3px">NeONBRAND</span></a>

## Let's pick up where we left off

The [first part](../utility-types-part1) was about these six utility types:

- Partial&lt;T>
- Required&lt;T>
- Readonly&lt;T>
- Record&lt;K,T>
- Pick&lt;T,K>
- Omit&lt;T,K>

In addition to the types we also learned some features of TypeScript that make implementing types like these possible in the first place.

**In this part** we are going to cover the eight remaining utility functions:

- Exclude&lt;T,U>
- Extract&lt;T,U>
- NonNullable&lt;T>
- ReturnType&lt;T>
- InstanceType&lt;T>
- ThisType&lt;T>
- Parameters&lt;T>
- ConstructorParameters&lt;T>

## More magical typing goodness

Before we get going we should learn a couple more features in TypeScript that will help us understand the following utility types and their implementation.

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

## Parameters&lt;T>

```typescript
/**
 * Obtain the parameters of a function type in a tuple
 */
type Parameters<T extends (...args: any) => any> = T extends (
  ...args: infer P
) => any
  ? P
  : never
```

## ConstructorParameters&lt;T>

```typescript
/**
 * Obtain the parameters of a constructor function type in a tuple
 */
type ConstructorParameters<
  T extends new (...args: any) => any
> = T extends new (...args: infer P) => any ? P : never
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
