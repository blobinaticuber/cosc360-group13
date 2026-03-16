import { expect, test } from "vitest"
import client from "./index.ts"

test("register new user", async () => {
	client.url = "http://localhost:3000/"

	const res = await client.register({
		name: "test_user_1",
		email: "test@domain.com",
		password: "pass123"
	})

	if (res.ok) {
		expect(res.data == null, "good response data is null")
	} else {
		expect("conflicts" in res.data, "bad response is a conflict error")
	}

	const badRes = await client.register({})

	expect(!res.ok, "malformed request body has an error")
	expect(
		("expected" in badRes.data) && ("received" in badRes.data),
		"response to a malformed request body has a good error"
	)
})
