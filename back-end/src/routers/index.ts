import type { Router } from "express"
import publicRouter from "./public.js"
import user from "./user/user.js"
import docs from "./docs.js"

const routers: { path: string, router: Router }[] = [
	{ path: "/public", router: publicRouter },
	{ path: "/user", router: user },
	{ path: "/", router: docs}
]

export default routers
