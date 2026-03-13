import type { Router } from "express"
import ping from "./ping/index.js"

const routers: { path: string, router: Router }[] = [
	{ path: "/ping", router: ping },
]

export default routers
