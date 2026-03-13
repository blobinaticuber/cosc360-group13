import type { RequestHandler } from "express"
import type { ZodObject } from "zod"
import err from "util/err.js"
import Status from "util/Status.js"

/**
 * Returns a middleware function that ensures the request body matches a given
 * form. If the request body doesn't, then the middleware will send an
 * appropriate error response and will not invoke the next handler.
 * 
 * The validated body will be set on the request object as `req.body`.
 * 
 * @example
 * 
 * ```
 * const ListingSchema = z.object({
 *     // ...
 * })
 * type Listing = z.infer<typeof ListingSchema>
 * 
 * app.post("/listing", body(ListingSchema), (req, res) => {
 *     req.body // this will of the type `Listing`.
 * })
 * ```
 * 
 * @remarks
 * 
 * While the middleware guarantees that `req.body` will match the given schema,
 * there is no reasonable way to give this information to TypeScript. You can
 * use a type assertion, or annotate the body type with the `Request` generic's
 * parameters:
 * 
 * ```
 * app.post(
 *     "/listing", 
 *     body(ListingSchema), 
 *     (req: Request<{}, {}, Listing>, res) => {
 *         // this will of the type `Listing`.
 *     }
 * )
 * ```
 * 
 * @param expected The schema that the request body is expected to conform to.
 * @returns A middleware function that validates the request body.
 */
function body(expected: ZodObject): RequestHandler {

	const handler: RequestHandler = (req, res, next) => {

		const parsed = expected.safeParse(req.body)
		if (!parsed.success) {
			err(res, Status.BadRequest, { 
				expected, received: req.body
			})
			return
		}

		req.body = parsed.data
		next()
	}

	return handler
}


export default body
