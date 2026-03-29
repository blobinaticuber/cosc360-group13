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
docker compose up
```

The first time you run this, Docker will need to install the Mongo image, which might take a second. Once the database starts running, you should see a pile of useless data dumped on your screen. You can close this terminal window and the database will still stay running until you use the docker command to end it.

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

Integration tests for the API are run via PostMan. The test suite is public (access it [here](https://www.postman.com/chadglazier/workspace/booklend)). However, PostMan's browser interface doesn't let you run requests against localhost, so in order to run the tests you'll have to install the desktop app 👎.
