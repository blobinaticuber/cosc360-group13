# COSC 360 Lab 6

## Setup

Once you've cloned the project, move into the `front-end` directory and run:

```shell
npm install
```

This will install the dependencies for the project (you should see a `node_modules` folder appear). Next, you should be able to run the project:

```shell
npm run dev
```

This will start a development server and give you a link to view the webpage in your browser.

## To-Do

- Make the current user's information part of a "global" context (read about creating a context [here](https://react.dev/reference/react/useContext)).
- Create the home page,
- Create the admin dashboard,
- Create a public profile page (i.e., where you can view another user's profile).
- Create a "listing" card that displays information about the book being listed and who is listing it (probably want a link to their page or their contact info).
- ??

## Using the Back-End

(*See the back-end's [README](../back-end/README.md) for instructions on how to start up the development server.*)

In order to actually use the back-end, you'll want to use the `server` object exported from [src/server](./src/server/). This object wraps a number of methods that let you interact with the back-end without writing any `fetch` calls yourself. E.g.,

```ts
import server from "../server"
                                        // yes, this book exists
const [books, err] =  await server.searchBooks("harry pothead") 
```

Generally, results from server calls are an array of length 2 that follow the format

```
[ExpectedResponseData, ErrorMessage]
```

The `ExpectedResponseData` will be an object that contains the data we get from a successful call to the server. If the call was unsuccessful, then instead this value will be `null`, and the `ErrorMessage` will contain a string that describes the exact cause of the failure. The strings are explicitly typed, so you can write something like this:

```ts
const [books, err] = await server.searchBooks("harry pothead")

switch (err) {
case "no matches found":
	// ...
	return // note that we do an early return after handling each error
case "unknown error":
	// ...
	return
}
```

If you exhaust all possible errors, then the TypeScript LSP will correctly infer that the expected data is not `null` and contains the object you want, since the result data is only `null` if the error message is not (and vice versa). Alternatively, if you don't actually care about the specific type of error that occurred, you can just check if `err == null`.

```ts
const [books, err] = await server.searchBooks("harry pothead")

if (err != null) {
	// handle the error
	return
}

// No error; we can use `books`.
```

If the function doesn't have a normal return value, then just the error message is returned.

```ts
const err = server.logOut()
```

## Additional Notes

### Environment Variables

Vite, the bundler we are using, will automatically load environment variables that are prefixed with `VITE_` and are defined in files named `.env` and `.env.local`. The variables are accessible with `import.meta.env.VITE_...`.

E.g., if you put this line in `.env` or `.env.local`:

```conf
VITE_DOMAIN_NAME="www.website.com"
```

then in your JavaScript you can access the variable like so:

```ts
console.log(import.meta.env.VITE_DOMAIN_NAME) // "www.website.com"
```

You can set environment variables in either `.env` or `.env.local`. The difference between them is that `.env` **will be included in the public repo**, so you should not put any sensitive data (e.g., API keys) inside. Instead, secret data should be kept inside `.env.local`, which won't be included in the repo.

### Including Icons

You can search for FontAwesome icons on [their website](https://fontawesome.com/search) and then copy the name to import it from the `@fortawesome/...` package. You can usually just start writing something like `import { faCircle...` and then let the auto-complete from the LSP decide which package to import the icon  from (there's a few of them). These are just icon definitions though, to use them in your JSX you need to use the `FontAwesomeIcon` component. E.g.,

```tsx
// Import the icon definition:
import { faCircleUser } from "@fortawesome/free-solid-svg-icons"

// Import the icon component which will actually display the icon:
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"


function Component() {
	return (
		// Now include the icon inside your component.
		<FontAwesomeIcon icon={faCircleUser} />
	)
}
```

Icons included this way are treated as text, not as images. They can be used neatly in text elements, like `p` and `h1`. They will also be colored and sized based on the CSS text properties like `color` and `font-size`.

### Creating Notifications

We use the `react-toastify` package to make toast notifications. In order to make a notification appear, you just need to make a function call:

```tsx
import { toast } from "react-toastify"

toast("Message here")
```

You can configure the toast notification to have specific properties, such as how long it lasts before disappearing and what style it has. Refer to the [official documentation](https://fkhadra.github.io/react-toastify/introduction/) for details.
