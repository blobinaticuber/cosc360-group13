import express from "express"
import cors from "cors"

import routers from "./routers/index.js"
import connectToDB from "./models/connectToDB.js"

async function main() {

	await connectToDB()
	const server = express()

	//
	// Register global middleware.
	//

	server.use(cors())
	server.use(express.json())

	//
	// Register routers.
	//

	for (const { path,  router } of routers) {
		server.use(path, router)
	}

	//
	// Start the server.
	//

	if (process.env.PORT == undefined) {
		throw new Error(
			"\nThe `PORT` variable is undefined. Ensure that it's set in" +
			"\nthe `.env` file."
		)
	}
	
	server.listen(process.env.PORT, () => {
		console.log(`\n\tListening at http://localhost:${process.env.PORT}/\n`)
	})
}

main()
