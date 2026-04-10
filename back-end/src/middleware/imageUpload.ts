import type { RequestHandler } from "express"
import multer from "multer"
import path from "path"

const uploadsStorage: multer.StorageEngine = multer.diskStorage({
	destination: (req, file, fn) => {
		fn(null, "public/uploads/")
	},
	filename: (req, file, fn) => {
		const name = Date.now() + path.extname(file.originalname)
		fn(null, name)
	}
})

const imgFilter: multer.Options["fileFilter"] = (req, file, fn) => {
	if (!file.mimetype.startsWith("image/")) {
		fn(new Error("Upload must be an image."))
		return
	}
	fn(null, true)
}

export const MAX_IMAGE_SIZE_MB = parseInt(process.env.MAX_UPLOAD_SIZE_MB!)

const multerImageParse = multer({ 
	storage: uploadsStorage, 
	fileFilter: imgFilter,
	limits: {
		fileSize: MAX_IMAGE_SIZE_MB * 1024 * 1024
	}
})

/**
 * Parses an image from the request and sets it on `req.file`.
 * 
 * @param key The key of the image file in the incoming form data.
 */
function imageUpload(key: string): RequestHandler {
	const handler: RequestHandler = (req, res, next) => {
		multerImageParse.single(key).call(null, req, res, next)
	}

	return handler
}

export default imageUpload
