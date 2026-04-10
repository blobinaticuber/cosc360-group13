# Booklend

To start the application, you must first set specific environment variables. In [.env.local.example](./.env.local.example), you will see two variables that you can replace:
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
