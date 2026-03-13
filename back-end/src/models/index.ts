import mongoose, { Schema, Types } from "mongoose"

//
// This file contains the schema used for the database, and only those types.
//

/**
 * Represents a user in the database.
 */
export type User = {
	name: string
	email: string
	password: string
	profilePicture: string
}
const UserSchema = new Schema<User>({
	name: {
		type: String,
		unique: true,
	},
	email: {
		type: String,
		unique: true,
	},
	password: String,
	profilePicture: String,
})
const user = mongoose.model("User", UserSchema)

/**
 * Represents an administrative user in the database.
 */
export type Admin = User
const AdminSchema = new Schema<Admin>({
	name: String,
	email: String,
	password: String,
	profilePicture: String,
})
const admin = mongoose.model("Admin", AdminSchema)

/**
 * Represents a listing, posted by a user.
 */
export type Listing = {
	title: string
	description: string
	user: Types.ObjectId
	image: string
}
const ListingSchema = new Schema<Listing>({
	title: String,
	description: String,
	image: String,
	user: {
		type: Schema.Types.ObjectId,
		ref: "User",
		index: true,
	},
})
const listing = mongoose.model("Listing", ListingSchema)

/**
 * Represents a user session; i.e., it tracks that a user is logged in.
 */
export type Session = {
	user: Types.ObjectId
	/**
	 * Represents a timestamp, in milliseconds. Compare this with `Date.now()`.
	 */
	createdAt: number
}
const SessionSchema = new Schema<Session>({
	createdAt: Number,
	user: {
		type: Schema.Types.ObjectId,
		ref: "User",
		index: true
	}
})
const session = mongoose.model("Session", SessionSchema)

/**
 * Represents an administrative user's session.
 */
export type AdminSession = Session
const AdminSessionSchema = new Schema<Session>({
	createdAt: Number,
	user: {
		type: Schema.Types.ObjectId,
		ref: "Admin",
		index: true
	}
})
const adminSession = mongoose.model("AdminSession", AdminSessionSchema)

//
// Export the `db` object.
//

/**
 * Wraps the Mongoose models used for interacting with the database.
 */
const db = {
	/**
	 * The "User" model, which represents a (non-admin) user's information.
	 */
	user,
	/**
	 * The "Admin" model, which represents an administrative user's 
	 * information.
	 */
	admin,
	/**
	 * Represents an admin user's session.
	 */
	adminSession,
	/**
	 * Represents a (non-admin) user's session.
	 */
	session,
	/**
	 * Represents a book listing, posted by a user.
	 */
	listing
}

export default db
