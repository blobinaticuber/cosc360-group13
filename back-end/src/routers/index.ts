import type { Router } from "express"
import ping from "./ping/index.js"
import publicRouter from "./public/index.js"
import user from "./user/user.js"

const routers: { path: string, router: Router }[] = [
	{ path: "/ping", router: ping },
	{ path: "/public", router: publicRouter },
	{ path: "/user", router: user }
]

export default routers
