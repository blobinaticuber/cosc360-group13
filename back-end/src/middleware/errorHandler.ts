import type { ErrorRequestHandler } from "express-serve-static-core"
import err from "../util/err.js"

const errorHandler: ErrorRequestHandler = (error, _, res, next) => {
	console.error(error)

	if (res.headersSent) {
		return next(error)
	}

	err.server(res, "Unknown internal server error.")
}


export default errorHandler
