# Restful API for Booklend

This is the back-end Rest API for Booklend.

## Running the Development Server

To run the local development server, you need to start up two things:

1. the database, and
2. the Node server.

You can start both of these with `docker compose`. If you're in the `back-end/` directory, just run:

```sh
docker compose up -d
docker compose logs -f server
```

This will start the production server by default. To start up the development server instead, use

```sh
docker compose -f="docker-compose.dev.yaml" up -d
docker compose -f="docker-compose.dev.yaml" logs -f server
```

To shut down the server, you can run the same command but with `down` instead of `up`:

```sh
docker compose down

# Or, if you were running the development server instead,
docker compose -f="docker-compose.dev.yaml" down
```

### Setting up the Environment

You will receive errors if either of the `ADMIN_KEY` or `GOOGLE_BOOKS_KEY` variables are not set in the current environment. To fix this, create a file named `.env.local` with those variables set.

```conf
ADMIN_KEY="Open, sesame!"
GOOGLE_BOOKS_KEY="some google books key"
```

In order for the API to work, the Google books key has to be an actual API key. You can create one (for free) from your personal [Google Cloud Console](https://console.cloud.google.com/); once youre there, you'll have to go through the steps of getting a key for the Google Books API. The `ADMIN_KEY` can be anything, it just defines the key needed to register a new administrator account.

### Viewing the Database

If you have any issues with the database and need to debug it, I would recommend installing MongoDB's GUI from
[here](https://www.mongodb.com/products/tools/compass). This will let you view the contents of the database directly so you can ensure that it matches up with the requests you've made.

### Installing Docker

You can check whether or not you have Docker installed with this command:

```sh
docker version
```

If this command isn't recognized, then you need to install Docker from [here](https://docs.docker.com/desktop/). If you get some output but it says that the docker engine isn't running, you may need to open your Docker Desktop application to start it. Then try the command again.

## Tests

Integration tests for the API are implemented with [Bruno](https://www.usebruno.com/). You can install Bruno's CLI tool from NPM:

```sh
npm install -g @usebruno/cli
```

Alternatively, you can install their desktop GUI from [here](https://www.usebruno.com/downloads).

All Bruno tests can be found in [tests/](./tests/). If you have Bruno's CLI tool installed and the server is running, you can run the full test suite with:

```
bru run --env-file .\environments\dev.bru
```

If you're on Windows/Powershell, you can instead run `.\run_tests.ps1` (this script will also generate an HTML report).

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

