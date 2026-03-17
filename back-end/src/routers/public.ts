import express, { Router } from "express"

//
// This is a special router that uses Express' middleware for serving static
// files from a given directory. I.e., registering this router will mean that
// all files in `public` are publicly accessible.
//

const publicRouter = Router()

publicRouter.use(express.static("public", {
	fallthrough: false
}))

export default publicRouter
