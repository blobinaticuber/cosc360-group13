import cors from "cors";
import express from "express";

import cookieParser from "cookie-parser";
import errorHandler from "middleware/errorHandler.js";
import connect from "./database/connect.js";
import routers from "./routers/index.js";

export const server = express();

async function main() {
	await connect();

	//
	// Register global middleware.
	//

	server.use(cors({
		credentials: true,
	}));
	server.use(express.json());
	server.use(cookieParser());

	//
	// Register routers.
	//

	for (const { path, router } of routers) {
		server.use(path, router);
	}

	//
	// Register error handling middleware
	//

	server.use(errorHandler);

	//
	// Start the server.
	//

	if (process.env.PORT == undefined) {
		throw new Error(
			"\nThe `PORT` variable is undefined. Ensure that it's set in" +
				"\nthe `.env` file.",
		);
	}

	server.listen(Number.parseInt(process.env.PORT), "127.0.0.1", 512, () => {
		console.log(`\n\tListening at http://127.0.0.1:${process.env.PORT}/\n`);
	});
}

main();
