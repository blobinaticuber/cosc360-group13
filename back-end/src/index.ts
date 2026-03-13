import express from "express"
import cors from "cors"

import routers from "./routers/index.js"
import connectToDB from "./models/connectToDB.js"

async function main() {

	await connectToDB()
	const server = express()

	//
	// Register middleware.
	//

	server.use(cors())

	//
	// Register routers.
	//

	routers.forEach(router => server.use(router))

	//
	// Start the server.
	//

	if (process.env.PORT == undefined) {
		throw new Error(
			"The `PORT` variable is undefined. Ensure that it's set in the " +
			"`.env` file."
		)
	}
	
	server.listen(process.env.PORT, () => {
		console.log(`\n\tListening at http://localhost:${process.env.PORT}/\n`)
	})
}

main()
