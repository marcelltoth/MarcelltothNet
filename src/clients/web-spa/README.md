# Web SPA
This project contains the code for the public-facing part of my blog app. 

## Base stack
The project is built on TypeScript / React / Redux.
This is the frontend stack I've been working with full time for years now, and I love it, so it was an obvious choice.

Of course I want to make every hobby-project a learning opportunity. I used this project to learn about new patterns, 
ever "better" ways to architect & structure a React app, and experimented with new React features and libraries.

### Why CRA?
I have quite a bit of experience configuring Webpack and its plugins, and **I prefer custom configurations for non-trivial projects**.
However, I think **CRA gives you a pretty decent environment out of the box** (especially since v2).
And going by the *"if it ain't broke don't fix it"* principle, I don't think the (great) effort of setting up a custom Webpack configuration is worth it unless you start to bump into CRA's limits.

### Why TypeScript?
This might just be my C# background, but I have embraced the principle of trying to convert what would be runtime errors into compile-time errors as much as possible.
I think it greatly helps you avoid bugs, especially in larger projects.

I'm not a *type everything, whatever it takes* kind of guy, however.
There are places where it's just not worth the effort of trying to completely write types for everything. In those cases I'm happy to go "plain" JavaScript (as you can see at some places).

## Architecture
The outer structure is default CRA setup. The interesting part of the application is inside the [src](./src) folder.

### [@types](./src/@types)
@types contains typings I wrote for external libraries that came without a *.d.ts* file. I will contribute those back to *DefinitelyTyped* when I'll have some spare time.

### [store](./src/@store)

store contains Redux architecture. I like to structure those into 4 folders (3 on non-TS projects):
- *state* that holds the usually type-only files that define the shape of the state.
- **... TO BE CONTINUED ...**
