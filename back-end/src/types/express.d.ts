import type { Types, Document, DefaultSchemaOptions } from "mongoose"
import type auth from "../middleware/auth.ts"
import type { Session } from "../database/db.ts"

declare global {
	namespace Express {
		interface Request {
			/**
			 * The session of the authenticated user. In order for this to be
			 * set, you must use the {@link auth} middleware.
			 */
			session?: Document<unknown, {}, Session, {
				id: string;
			}, DefaultSchemaOptions> & Omit<Session & {
				_id: Types.ObjectId;
			} & {
				__v: number;
			}, "id"> & {
				id: string;
			}
		}
	}
}
