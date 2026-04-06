import type { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import type { Router } from "express";
import admin from "./admin/admin.js";
import analytics from "./analytics/analytics.js";
import analyticsSpec from "./analytics/schema.js";
import listing from "./listing/listing.js";
import listingSpec from "./listing/schema.js";
import publicRouter from "./public.js";
import report from "./report/report.js";
import reportSpec from "./report/schema.js";
import searchSpec from "./search/schema.js";
import search from "./search/search.js";
import testing from "./testing.js";
import userSpec from "./user/schema.js";
import user from "./user/user.js";
import adminSpec from "./admin/schema.js"

const routers: { path: string; router: Router; spec?: OpenAPIRegistry }[] = [
	{ path: "/public", router: publicRouter },
	{ path: "/user", router: user, spec: userSpec },
	{ path: "/listing", router: listing, spec: listingSpec },
	{ path: "/search", router: search, spec: searchSpec },
	{ path: "/report", router: report, spec: reportSpec },
	{ path: "/admin", router: admin, spec: adminSpec },
	{ path: "/analytics", router: analytics, spec: analyticsSpec },
];

if (process.env.MODE == "development") {
	routers.push({ path: "/testing", router: testing });
}

export default routers;
