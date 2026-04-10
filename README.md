# Booklend

To start the application, you must first set specific environment variables in a new file called `.env.local`. In [.env.local.example](./.env.local.example), you will see two variables that you can replace:
- `ADMIN_KEY` can be anything; you can leave it as `admin` if you want, but make sure to remember it. It is necessary for registering administrative user accounts.
- `GOOGLE_BOOKS_KEY` must be a valid key for the Google Books API. You can create a personal one from the Google Cloud console. (Or, if you're a TA grading our project, you can check the attached documents for the key we used to save yourself the time.)

Once you have the environment set up, you can build and run the project with:

```sh
docker compose up --build -d
```

Then you can visit the following links:
- The regular front-end can be visited at [http://localhost:4000/](http://localhost:4000/).
- The administrator side of the front-end can be visited at [http://localhost:4000/admin](http://localhost:4000/admin).
- The documentation for the Rest API can be found at [http://localhost:4000/docs](http://localhost:4000/docs).

To shut down the server, use

```sh
docker compose down
```

## Running in Development Mode

In order to run integration tests and support automatic reloading, you need to start the server in development mode. this involves three steps (after the `.env.local` is set up):
1) Start the database.
```sh
# In `back-end/`:
docker compose -f="docker-compose.db.yaml" up -d
```
2) Start the development server.
```sh
# In `back-end/`:
npm install # only do this the first time
npm run dev
```
3) Start the development client.
```sh
# In `front-end/`:
npm install # only do this the first time
npm run dev
```

### Running Tests

The integration tests in `back-end/tests` can be run from that directory by executing the `.\run_tests.ps1` script. If you're not using PowerShell, you can view that file as an example for how to run the Bruno CLI (which you will need to install).

> NOTE: The tests will expect that the `ADMIN_KEY` is set to `admin`. 
