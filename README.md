# MarcelltothNet
This is the source repository of my personal website / blog found at https://marcelltoth.net.

If you are interested in samples of my work, I recommend you to check out the [Articles microservice](./src/services/Article) for backend and the public facing [Web SPA](./src/clients/web-spa) for frontend.

## The story
A while ago I decided that I would like to have a central place where I can share stories about my coding journey.

Of course my first idea was to install a good ol' *Wordpress* and customize that one - like everyone else. 
But I'm the guy who enjoys wandering off the beaten path, so I thought *"Hey, I'm a web developer, why not build one for myself?"*. 
Of course it takes a lot of time, and it "does not make sense" in its traditional meaning, but I enjoy the process, and even the end result may be a bit better than I could've with Wordpress. 
(After all, a traditional web app will never match the responsiveness of a well-written SPA, and if you know me you know I'm all in for *SPEED*.)

## Lessons learned

First of all, you should know that this is not just "my blog".
It's also my favorite playground where I can experiment with the very latest technologies and techniques in a real environment, a chance that I don't usually get with for-profit projects.
I got to learn about *Microservices, Domain Driven Design, NoSQL, Docker, .NET and ASP.NET Core 3, Ocelot, Swagger, React Hooks, PWAs, the Cache API*, just to name a few.

I did not end up actually using all of them, but the experience was invaluable nevertheless.
There are multiple techniques/solutions that I started learning here and now I use in my commercial projects to greatly improve the product, my productivity or both.

Because of the above, the disclaimer is: 
**The architecture described here is way overkill for the size of this project and I would never ever recommend it.** 
Way overengineering a product isn't much better than underengineering it, always match the solution to the project requirements / outlook.
To me, this is a playground, so I kept developing (parts of) it as if it were a medium to large scale enterprise project.
(Other parts are intentionally neglected to save my resources. Enterprise projects are not developed by a team of 1 for a reason after all. :D)

## Architecture

The project follows a somewhat traditional *Microservices Architecture*.

### Microservices

#### Identity
* **Bounded context:** This service is an OpenID Connect provider that manages users in the system (aka *me and myself*) and issues tokens for the client applications to call the other services on their behalf.

* **Technology:** Custom *ASP.NET Core* web application using *IdentityServer v4*.

* **Completeness:** My goal was here to experiment with different *OpenID Connect* configurations, authentication modes. I am using in memory data and the default UI. (Currently I'm the only user, so an identity database would be kind of... overkill.)

#### Articles
* **Bounded context:** This API manages the core blogging domain. Knows and cares about *Article*s and *Tag*s.

* **Technology:** *ASP.NET Core* API using *DDD* and *CQRS*. 

* **Completeness:** Mostly complete and functional. Missing is logging, monitoring, sophisticated error handling, etc., and the test coverage could be improved.

#### Static files
* **Bounded context:** This API manages a static file storage, uploading and downloading of files. (Used mostly to embed images into articles.)

* **Technology:** Simple CRUD *ASP.NET Core* API.

* **Completeness:** In complete working order but "just as much as required", serves no demonstration purpose.

### API Gateways

The project follows a *BFF* pattern in regard of API gateways, which stands for *Backends For Frontends* here rather than Best Friends Forever. Sad. 

This means that I have an API gateway / aggregator for both clients, one for the _Web SPA_ frontend that you can see when visiting my site, one for the _Admin UI_ that only I can access.

#### Admin Gateway

This project uses the wonderful [Ocelot](https://github.com/ThreeMammals/Ocelot) library to perform basic mappings. 

#### SPA Gateway

While I was OK with basic mappings for the Admin UI, I wanted efficient, customized mapping logic for the public frontend to reduce roundtrips and latency as much as I can.

This is a custom written ASP.NET Core web API that uses the simple `HttpClient` to fetch data from the services, aggregate them and push them down to the frontend.
This allows me for example to query two endpoints in parallel, and return it as a single result step, rather than having React preform 2 network requests / 2 reduces / 2 updates.

### Client applications

As I said before, I have two clients, a simple admin where I can write articles and upload files, and one for you to read them.

Technology-wise the two are similar, but only **the public facing [Web SPA](./src/clients/web-spa) project is detailed. If you want to take a look at a representative sample of my frontend work, check out that one.**

The stack is based on: *CRA / Redux / TypeScript / SCSS Modules*.
