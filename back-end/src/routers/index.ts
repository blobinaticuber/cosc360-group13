import type { Router } from "express"
import type { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi"
import publicRouter from "./public.js"
import user from "./user/user.js"
import userSpec from "./user/schema.js"
import listing from "./listing/listing.js"
import listingSpec from "./listing/schema.js"
import searchSpec from "./search/schema.js"
import search from "./search/search.js"

const routers: { path: string, router: Router, spec?: OpenAPIRegistry }[] = [
	{ path: "/public", router: publicRouter },
	{ path: "/user", router: user, spec: userSpec },
	{ path: "/listing", router: listing, spec: listingSpec },
	{ path: "/search", router: search, spec: searchSpec}
]

export default routers
