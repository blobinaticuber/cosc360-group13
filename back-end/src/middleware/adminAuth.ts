import db from "../database/db.js";
import type { RequestHandler } from "express";
import Status from "../types/Status.js";

const maxLifeMs = Number.parseInt(process.env.AUTH_COOKIE_MAX_DAYS!) *
	24 * 60 * 60 * 1000;

/**
 * Ensures that the request is made by an administrative user.
 */
const adminAuth: RequestHandler = async (req, res, next) => {
	const sessionId = req.cookies[process.env.AUTH_COOKIE!];

	if (typeof sessionId != "string") {
		res.status(Status.Unauthorized).end();
		return;
	}

	const session = await db.AdminSession.findById(sessionId).exec();

	if (session == null) {
		res.status(Status.Unauthorized).end();
		return;
	}

	// If the session exists, but is expired.
	if (Date.now() - session.createdAt > maxLifeMs) {
		session.deleteOne().exec();
		res.status(Status.Unauthorized).end();
		return;
	}

	// Refresh the session.
	// session.createdAt = Date.now();
	// session.save();

	// Attach the user ID to the request.
	req.session = session;

	next();
};

export default adminAuth;
