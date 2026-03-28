import { Router } from "express"
import routers from "./index.js"
import { OpenApiGeneratorV31 } from "@asteasolutions/zod-to-openapi"
import Status from "util/Status.js"
import type { OpenAPIDefinitions } from "@asteasolutions/zod-to-openapi/dist/openapi-registry.js"

//
// This file is where we expose the OpenAPI specification for the app, and
// where we render the documentation page based on that spec.
//

const docs = Router()

const specs: OpenAPIDefinitions[] = []
for (let router of routers) {
	if (router.spec) {
		specs.push(...router.spec.definitions)
	}
}

const generator = new OpenApiGeneratorV31(specs)
const spec = generator.generateDocument({
	openapi: "3.1.0",
	info: {
		title: "Booklend API",
		version: "0.0.1",
		description:
			`This Restful API is meant to serve as the back-end for the Booklend web app.\n\nThe code can be found in [a public GitHub repository](https://github.com/blobinaticuber/cosc360-group13/tree/main/back-end).`
	},
	servers: [
		{ url: process.env.SERVER_URL! }
	]
})

docs.get("/openapi.json", (_, res) => {
	res.status(Status.OK).json(spec)
})

docs.get("/docs", (_, res) => {
	res.send(`
    <html>
      <body>
        <elements-api 
			apiDescriptionUrl="/openapi.json" 
			layout="sidebar"
			router="memory"
			tryItCredentialsPolicy="include"
		/>
        <script src="https://unpkg.com/@stoplight/elements/web-components.min.js"></script>
        <link rel="stylesheet" href="https://unpkg.com/@stoplight/elements/styles.min.css" />
      </body>
    </html>
	`)
})

//
// Below, for the sake of convenience, we also include documentation for the
// Google Books API, which is used by the frontend. Google's regular
// documentation is kind of a pain to navigate. Fortunately, someone with
// way too much free time already painstakingly converted the Books API to
// OpenAPI format, which we can use to generate docs.
//

docs.get("/docs/google_books", async (_, res) => {
	const googleBooksSpec = 
		"https://api.apis.guru/v2/specs/googleapis.com/books/v1/openapi.json"
	res.send(`
    <html>
      <body>
        <elements-api 
			apiDescriptionUrl="${googleBooksSpec}" 
			layout="sidebar"
			router="memory"
			tryItCredentialsPolicy="include"
		/>
        <script src="https://unpkg.com/@stoplight/elements/web-components.min.js"></script>
        <link rel="stylesheet" href="https://unpkg.com/@stoplight/elements/styles.min.css" />
      </body>
    </html>
	`)
})

export default docs
