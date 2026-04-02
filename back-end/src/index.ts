import cors from "cors"
import express from "express"

import cookieParser from "cookie-parser"
import errorHandler from "middleware/errorHandler.js"
import connect from "./database/connect.js"
import routers from "./routers/index.js"
import docs from "./routers/docs.js"
import startupMessage from "util/startupMessage.js"

const server = express()

async function main() {
	await connect();

	//
	// Register global middleware and settings.
	//

	server.use(cors({
		origin: process.env.CLIENT_URL!,
		credentials: true,
		exposedHeaders: [ "Set-Cookie" ]
	}))
	server.use(express.json())
	server.use(cookieParser())

	if (process.env.MODE == "development") {
		server.set("json spaces", 4)
	}

	//
	// Register the docs router.
	//

	server.use("/", docs)

	//
	// Register routers.
	//

	for (const { path, router } of routers) {
		server.use(path, router)
	}

	//
	// Register error handling middleware
	//

	server.use(errorHandler)

	//
	// Start the server.
	//

	if (process.env.PORT == undefined) {
		throw new Error(
			"\nThe `PORT` variable is undefined. Ensure that it's set in" +
				"\nthe `.env` file.",
		)
	}

	server.listen(process.env.PORT, () => console.log(startupMessage()));
}

main();

export default server;
