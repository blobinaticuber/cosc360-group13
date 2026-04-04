# Restful API for Booklend

This is the back-end Rest API for Booklend.

## Running the Development Server

To run the local development server, you need to start up two things:

1. the database, and
2. the Node server.

If you have everything installed, this can be done with with two commands

```sh
docker compose up --detach
npm run dev
```

However, if it's your first time running the app, you might need to follow the steps explained below.

### Running the Local Database

The [docker compose](docker-compose.yml) file can used to run a local instance of a Mongo database within a docker container. To start the database, first ensure that you have Docker installed:

```sh
docker version
```

If the command isn't recognized, then you need to install Docker (which you can do from [here](https://docs.docker.com/desktop/)). If you get some output but it says that the docker engine isn't running, you may need to open your Docker Desktop application to start it. Then try the command again.

If you have Docker working, then you can start the database from this directory by running

```sh
docker compose up --detach
```

The first time you run this, Docker will need to install the Mongo image, which might take a second. Once the database starts running, you can close this terminal window and the database will still stay running until you use the docker command to end it.

You can shut down the database with this command:

```sh
docker compose down
```

If you have any issues with the database and need to debug it, I would recommend installing MongoDB's GUI from
[here](https://www.mongodb.com/products/tools/compass).

### Running the Node Server

To run the Node server, you must first have Node installed. You can run this command to verify that you have it:

```sh
node --version
```

If the command isn't recognised, you can install Node from [here](https://nodejs.org/en/download).

If you have Node working, then you can install the dependencies for the server with this command:

```sh
npm install
```

You only need to run this once when the project's dependencies change, not every time you want to start the server.

You can start the local server with this command:

```sh
npm run dev
```

To stop the server, just use `Ctrl+C` or close the terminal window.

## Tests

Integration tests for the API will be implemented with [Bruno](https://www.usebruno.com/). You can install Bruno's CLI tool from NPM:

```sh
npm install -g @usebruno/cli
```

Alternatively, you can install their desktop GUI from [here](https://www.usebruno.com/downloads).

All Bruno tests can be found in [tests/](./tests/). If you have Bruno's CLI tool installed, you can run these tests with:

```
bru run --env-file .\environments\dev.bru
```

If you're on Windows/Powershell, you can instead just run `.\run_tests.ps1` (this script will also generate an HTML report).

## Code Structure

All code for the back-end API is in [src/](./src). Within this folder, there is an [index.ts](./src/index.ts). This file is where the server is configured and then run; it serves as the main entrypoint for the program.

The other folders inside of the source folder are listed and briefly described below:

- [database](./src/database/) contains the code used for setting up the initial database connection ([connect.ts](./src/database/connect.ts)) and defining all of the database schema ([db.ts](./src/database/db.ts)), which rely on the [Mongoose](https://www.mongodb.com/docs/drivers/node/current/integrations/mongoose/mongoose-get-started/) package. Mongoose handles communication with the underlying Mongo database. The `db` object exported from `db.ts` is used throughout the rest of the modules to make database calls.
- [util](./src/util/) contains a set of generally-useful functions used throughout the rest of the program. Similarly, [types](./src/types/) contain a few files that define types that don't fit neatly anywhere else.
- [middleware](./src/middleware/) defines our middleware functions, which I explain below.
- [routers](./src/routers/) contain the actual routers for the program.

### Routers

(*Routers for our app are defined in [routers/](./src/routers)*)

In Express, a *router* is like a mini express app. You can define endpoints for a router like so:

```ts
// In `routers/user.ts`...
import { Router } from "express"

const userRouter = Router()

userRouter.get("/", (req, res) => /* ... */ )

export default userRouter
```

The benefit of using a router instead of just registering every endpoint directly to the main `server` object is that you can isolate a set of endpoints on a router, export them as a single object, and then register them onto the main `server` with a path prefix. E.g.,

```ts
// In `index.ts`, where the main server is defined...
import express from "express"
import userRouter from "./routers/user.ts"

const server = express()

server.use("/user", userRouter)
```

Now, the `userRouter` will exclusively handle any requests to paths that begin with `/user`.

For each major function of the API, we define the endpoints on a separate router. For example, the endpoints related to users are all defined together in [user.ts](./src/routers/user/user.ts). All of the routers are grouped together in [routers/index.ts](./src/routers/index.ts), and are exported. These routes are imported by the main server file (as mentioned before, this is in [src/index.ts](./src/index.ts)) and then registered onto the main app. 

For most of the routers, there is also a "schema" defined. E.g., the schema for the user router is in [user/schema.ts](./src/routers/user/schema.ts). These files define the route in terms of the OpenAPI specification which we use to generate documentation in the [docs.ts](./src/routers/docs.ts) router. However, **the schema files do not at all affect the functionality of the server**, so you can ignore them.

### Middleware

(*Middleware functions for our app are defined in [middleware/](./src/middleware)*)

A *middleware* function is something that should be executed after a request is received from the client, but before the regular handler function. I.e., it's in the "middle" of the execution pipeline.

```
request received -> middleware 1 -> middleware 2 -> ... -> handler function
```

Middleware in Express is easy to include:

```ts
router.get(
	"/path",
	middlewareOne, // This will be run first,
	middlewareTwo, // this will be run second,
	(req, res) => {
	               // and this will be run last.
	}
)
```

Just like a handler function, a middleware function gets access to both the request and response objects. However, it also gets a third argument: the "next" function, which should be called when the middleware is done and ready to pass control to the next function in the pipeline.

```ts
function middlewareOne(req, res, next) {
	// Do something with `req` and/or `res`.
	// Then, pass control over.
	next()
}
```

It's possible for a middleware function to never call `next`, in which case the rest of the pipeline is never executed. For example, in our [`auth`](./src/middleware/auth.ts) middleware, we check that the user is authenticated, but if they aren't, then we send back a `401 Unauthorized` response and end the pipeline there.

```
request received -> auth --- (request is good) --> ... -> handler function
                     |
                     |------ (request is bad) ---> send 401
```

### Runtime Type Validation

A Rest API has to receive a lot of JSON data, and it's helpful to have a way of ensuring that an incoming request actually has the fields that we expect. For runtime type validation, we use the [Zod](https://zod.dev/) package. A Zod *schema* is defined like so:

```ts
const CredentialsSchema = z.object({
	username: z.string(),
	password: z.string(),
})
```

We can use such a schema to *parse* unknown objects:

```ts
const parseResult = CredentialsSchema.safeParse(unknownObject)

if (parseResult.success) {
	// The `unknownObject` matches the schema.
	const credentials = parseResult.data
} else {
	//The `unknownObject` does not match the schema.
}
```

In [middleware/body.ts](./src/middleware/body.ts), I've defined a middleware function that takes in a Zod schema and then ensures that the incoming request has a matching body. So whenever we have a request handler that requires a certain body, it's common for us to use the following pattern:

```ts
import body from "../middleware/body.ts"

const CredentialsSchema = z.object({
	username: z.string(),
	password: z.string(),
})

user.get(
	"/login", 
	body(CredentialsSchema), 
	(req, res) => {
		// `req.body` is guaranteed to match the credentials schema.
	}
)
```

