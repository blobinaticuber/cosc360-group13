import type { Response } from "express";
import type { ZodObject } from "zod";
import Status from "../types/Status.js";
import type { ErrConflict, ErrInvalidBody, ErrServer } from "./errSchema.js";

//
// Below, we define a set of functions to send well-formed error responses.
//

const err = {
	server(res: Response, message?: string): void {
		res.status(Status.InternalServerError)
			.json(
				{
					type: "server",
					message: message ?? "Unknown internal server error.",
				} satisfies ErrServer,
			);
	},

	invalidBody(res: Response, expected: ZodObject, received: any) {
		res.status(Status.BadRequest).json(
			{
				type: "invalid body",
				expected: expected.toJSONSchema(),
				received,
			} satisfies ErrInvalidBody,
		);
	},

	conflict(res: Response, conflicts: Record<string, boolean>) {
		res.status(Status.Conflict).json(
			{
				type: "conflict",
				conflicts,
			} satisfies ErrConflict,
		);
	},

	notFound(res: Response) {
		res.status(Status.NotFound).end();
	},
};

export default err;
