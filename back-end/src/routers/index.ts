import type { Router } from "express"
import ping from "./ping/index.js"
import publicRouter from "./public/index.js"

const routers: { path: string, router: Router }[] = [
	{ path: "/ping", router: ping },
	{ path: "/public", router: publicRouter }
]

export default routers
