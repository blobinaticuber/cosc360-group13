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
	name: String,
	email: String,
	password: String,
	profilePicture: String,
})
export const user = mongoose.model("User", UserSchema)

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
export const admin = mongoose.model("Admin", AdminSchema)

/**
 * Represents a listing, posted by a user.
 */
export type Listing = {
	title: string
	description: string
	author: Types.ObjectId
	image: string
}
const ListingSchema = new Schema<Listing>({
	title: String,
	description: String,
	image: String,
	author: {
		type: Types.ObjectId,
		ref: "User",
		index: true,
	},
})
export const listing = mongoose.model("Listing", ListingSchema)

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
		type: Types.ObjectId,
		ref: "User",
		index: true
	}
})
export const session = mongoose.model("Session", SessionSchema)

/**
 * Represents an administrative user's session.
 */
export type AdminSession = Session
const AdminSessionSchema = new Schema<Session>({
	createdAt: Number,
	user: {
		type: Types.ObjectId,
		ref: "Admin",
		index: true
	}
})
export const adminSession = mongoose.model("AdminSession", AdminSessionSchema)
