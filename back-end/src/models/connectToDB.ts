import mongoose from "mongoose"

/**
 * An error thrown because something went wrong when attempting to connect to
 * the database.
 */
class DatabaseConnectionError extends Error {}

/**
 * Sets up the MongoDB connection. This function will raise an error if the
 * connection couldn't be made.
 * 
 * @throws `DatabaseConnectionError`
 */
async function connectToDB() {

	const databaseURI = process.env.DB_URI

	if (databaseURI == undefined) {
		throw new DatabaseConnectionError(
			"The database URI couldn't be found. Make sure that the " +
			"environment variable `DB_URI` is set in the `.env` file." 
		)
	}

	try {
		await mongoose.connect(databaseURI)
	} catch (e: any) {
		throw new DatabaseConnectionError(
			"Error connecting to MongoDB. Make sure that the database " +
			"is running and the `DB_URI` is correct."
		)
	}
}

export default connectToDB
