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
		required: true,
	},
	email: {
		type: String,
		unique: true,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	profilePicture: {
		type: String,
		default: () => {
			return process.env.SERVER_URL + "public/default_profile_picture.jpg"
		}
	},
})
const User = mongoose.model("User", UserSchema)

/**
 * Represents an administrative user in the database.
 */
export type Admin = User
const AdminSchema = new Schema<Admin>({
	name: {
		type: String,
		unique: true,
		required: true,
	},
	email: {
		type: String,
		unique: true,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	profilePicture: {
		type: String,
		default: () => {
			return process.env.SERVER_URL + "public/default_profile_picture.jpg"
		}
	},
})
const Admin = mongoose.model("Admin", AdminSchema)

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
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	image: {
		type: String,
		default: () => {
			return process.env.SERVER_URL + "public/default_listing_picture.png"
		}
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: "User",
		index: true,
		required: true,
	},
})
const Listing = mongoose.model("Listing", ListingSchema)

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
	createdAt: {
		type: Number,
		default: Date.now
	},	
	user: {
		type: Schema.Types.ObjectId,
		ref: "User",
		index: true,
		required: true
	}
})
const Session = mongoose.model("Session", SessionSchema)

/**
 * Represents an administrative user's session.
 */
export type AdminSession = Session
const AdminSessionSchema = new Schema<Session>({
	createdAt: {
		type: Number,
		default: Date.now
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: "Admin",
		index: true,
		required: true
	}
})
const AdminSession = mongoose.model("AdminSession", AdminSessionSchema)

//
// Export the namespace.
//

/**
 * Wraps the Mongoose models used for interacting with the database.
 */
const db = {
	/**
	 * The "User" model, which represents a (non-admin) user's information.
	 */
	User,
	/**
	 * The "Admin" model, which represents an administrative user's 
	 * information.
	 */
	Admin,
	/**
	 * Represents an admin user's session.
	 */
	AdminSession,
	/**
	 * Represents a (non-admin) user's session.
	 */
	Session,
	/**
	 * Represents a book listing, posted by a user.
	 */
	Listing,
}

export default db
