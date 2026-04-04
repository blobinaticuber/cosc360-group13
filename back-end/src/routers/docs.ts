import { OpenApiGeneratorV31 } from "@asteasolutions/zod-to-openapi";
import type { OpenAPIDefinitions } from "@asteasolutions/zod-to-openapi/dist/openapi-registry.js";
import { Router } from "express";
import Status from "types/Status.js";
import routers from "./index.js";

//
// This file is where we expose the OpenAPI specification for the app, and
// where we render the documentation page based on that spec.
//

const docs = Router();

const specs: OpenAPIDefinitions[] = [];
for (let router of routers) {
	if (router.spec) {
		specs.push(...router.spec.definitions);
	}
}

const generator = new OpenApiGeneratorV31(specs);
const spec = generator.generateDocument({
	openapi: "3.1.0",
	info: {
		title: "Booklend API",
		version: "0.0.1",
		description:
			`This Restful API is meant to serve as the back-end for the Booklend web app.\n\nThe code can be found in [a public GitHub repository](https://github.com/blobinaticuber/cosc360-group13/tree/main/back-end).`,
	},
	servers: [
		{ url: process.env.SERVER_URL! },
	],
});

docs.get("/openapi.json", (_, res) => {
	res.status(Status.OK).json(spec);
});

docs.get("/docs", (_, res) => {
	res.send(`
	<!DOCTYPE html>
    <html>
	  <head>
	    <title>Booklend API</title>
		<link rel="apple-touch-icon" sizes="180x180" href="/public/icons/apple-touch-icon.png">
		<link rel="icon" type="image/png" sizes="32x32" href="/public/icons/favicon-32x32.png">
		<link rel="icon" type="image/png" sizes="16x16" href="/public/icons/favicon-16x16.png">
		<link rel="manifest" href="/public/icons/site.webmanifest">
	  </head>
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
	`);
});

export default docs;
