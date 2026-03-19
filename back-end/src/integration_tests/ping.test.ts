import { expect, test } from "vitest"
import Method from "../util/Method"
import Status from "../util/Status"
import { SERVER_URL } from "./globals"

test("`/ping` works", async () => {
	const res = await fetch(SERVER_URL + "/ping")
	expect(res.status).toBe(Status.OK)
})
