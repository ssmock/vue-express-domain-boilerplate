This repo provides a simple base upon which to build domain/client/server 
applications for the web.

I started it on Windows 10 in WSL 2 using Node 15.14 and VSCode, so it
inherits some of the environment's quirks, like using http://172.22.53.52 
instead of localhost. (More on that below.)

It consists of four interrelated node packages.

## 1. Top-Level: `vue-express-boilerplate`

The [Vetur](https://vuejs.github.io/vetur/) extension seems to expect TypeScript
configuration at the project's root. While I could probably have just added a
tsconfig.json at that level and called it quits, I opted to define a package as
well. In the future, I hope to add some scripts to it.

## 2. Domain

This package is meant to contain domain logic and type definitions shared by 
both the client and server. The source files are simply referenced by relative
file path within `client` and `server`.

An obvious alternative would be to transpile `domain` separately, and then
reference it _as a package_. This approach offers no clear benefits, but it
has a couple of unappetizing drawbacks:

- The build and development processes would become more complex and brittle
- The consumers might end up referencing lots of source code they don't need

So why is there a Node package here at all? Two reasons:

1. We'll add `jest` here later
2. Webpack (used by `client`) requires an `eslint` config within the `domain`
folder

### Challenges

For some reason, the current Vue/Webpack setup required a separate `eslint`
config for these source files. There might be a config option that I could
adjust to get around the issue, but just creating a package and adding
linting was easy enough.

## 3. Client

I set this up using [Vue CLI](https://cli.vuejs.org/) with the TypeScript
plugin, selecting the preview version of Vue 3.

Already included are a few essentials:

* A `ClientError` type :: the earlier we have error handling patterns, the more
    likely we are to use them.
* A `RemoteResource` type :: this one goes hand-in-hand with errors. It's a 
    structure that's as simple as it is useful, and it's easy to consume.
* A `RemoteLock` component :: while we should still consider debouncing 
    triggers for long-running operations, preventing extra button clicks and
    user input is still a good idea.
* A `RemoteResourceDemo` :: shows how it fits together

### Challenges

#### Vetur and the Vue Language Server

It seems like Vetur wants `client` to be my "project root" in VSCode, but
conceding the domain/client/server structure would defeat the purpose of this
project. When Vetur and VLS aren't available, type inference fails in `.vue`
files -- another unacceptable conclusion.

There are probably a couple of ways to reconcile these problems. The most
straightforward way was to add another `tsconfig.json` at the _actual_ root.

(I've also gotten used to restarting VLS via the Command Pallet, but I've needed
to do so much less frequently.)

#### TypeScript Compilation

Creating a typed component in a `.vue` file requires a bit of extra diligence.
Specifically, I needed to:

- Provide an explicit type for the return value from `data()`
- Specify a return type on `computed` signatures

#### WSL!

This problem has occurred only sporadically: sometimes, when I start up an HTTP
with node on WSL, I can't access it at `localhost`. Instead, I need to use the
address shown when I run the command below, per 
[this issue comment](https://github.com/microsoft/WSL/issues/4636#issuecomment-723440350):

```
ip addr | grep -E "\b*inet.*global" | sed -E "s/inet(.*)\/.*/\1/"
```

## 4. Server

No snags here whatsoever, aside from the WSL problem noted above.

## Coding Conventions

### What is "domain?"

I am thoroughly convinced that we should keep logic related to the problem
domain free from I/O and side-effects. Doing so will make our applications
easier to test, fix, talk about, and extend.

This repo suggests that keeping domain logic in a separate folder (or package)
might be a good approach.

See also [onion architecture](https://www.codeguru.com/csharp/csharp/cs_misc/designtechniques/understanding-onion-architecture.html)

### Types and modules

I've likewise been inspired by type/module techniques for organizing code. The
idea is:

* Keep types lightweight -- records, enums, and tuples should be enough
* Prefer static operations when doing things with instances of your types
* Use generics judiciously

### Vue Component Definitions

Vue provides a few ways to define components with TypeScript. Preferring to
avoid object-oriented idioms, I chose to use `defineComponent`.
