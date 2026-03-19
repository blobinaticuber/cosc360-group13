import type { Router } from "express"
import publicRouter from "./public.js"
import user from "./user/user.js"
import type { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi"
import userSpec from "./user/schema.js"

const routers: { path: string, router: Router, spec?: OpenAPIRegistry }[] = [
	{ path: "/public", router: publicRouter },
	{ path: "/user", router: user, spec: userSpec },
]

export default routers
