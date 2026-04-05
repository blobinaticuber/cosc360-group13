import type { Router } from "express"
import type { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi"
import publicRouter from "./public.js"
import user from "./user/user.js"
import userSpec from "./user/schema.js"
import listing from "./listing/listing.js"
import listingSpec from "./listing/schema.js"
import searchSpec from "./search/schema.js"
import search from "./search/search.js"
import report from "./report/report.js"
import reportSpec from "./report/schema.js"
import adminUser from "./admin/adminUser.js"
import adminUserSpec from "./admin/adminUserSchema.js"
import analyticsSpec from "./analytics/schema.js"
import analytics from "./analytics/analytics.js"

const routers: { path: string, router: Router, spec?: OpenAPIRegistry }[] = [
	{ path: "/public", router: publicRouter },
	{ path: "/user", router: user, spec: userSpec },
	{ path: "/listing", router: listing, spec: listingSpec },
	{ path: "/search", router: search, spec: searchSpec },
	{ path: "/report", router: report, spec: reportSpec },
	{ path: "/admin/user", router: adminUser, spec: adminUserSpec },
	{ path: "/analytics", router: analytics, spec: analyticsSpec}
]

export default routers
