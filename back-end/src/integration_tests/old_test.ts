// import { describe, test, expect } from "vitest"

// import type { 
// 	RegistrationDetails, UserCredentials 
// } from "routers/user/schema.js"

// import Method from "util/Method.js"
// import { UserDetailsSchema } from "routers/user/schema.js"
// import Status from "util/Status.js"
// import { ErrSchema } from "util/errSchema.js"

// const SERVER_URL = process.env.SERVER_URL!
// const AUTH_COOKIE = process.env.AUTH_COOKIE!

// describe("user router", { tags: [ "integration" ]}, () => {

// 	const testUsers: RegistrationDetails[] = [
// 		{
// 			name: "test_user_1",
// 			email: "test_user_1@domain.com",
// 			password: "test_user_1_password"
// 		},
// 		{
// 			name: "test_user_2",
// 			email: "test_user_2@domain.com",
// 			password: "test_user_2_password"
// 		},
// 		{
// 			name: "test_user_3",
// 			email: "test_user_3@domain.com",
// 			password: "test_user_3_password"
// 		},
// 		{
// 			name: "test_user_4",
// 			email: "test_user_4@domain.com",
// 			password: "test_user_4_password"
// 		},
// 	]

// 	const goodCredentials: UserCredentials = {
// 		email: testUsers[0].email,
// 		password: testUsers[0].password
// 	}

// 	const badPassword: UserCredentials = {
// 		email: testUsers[0].email,
// 		password: "alfsdmfkmas923j42n"
// 	}

// 	const badEmail: UserCredentials = {
// 		email: "skibidi@toilet.com",
// 		password: "alfsdmfkmas923j42n"
// 	}

// 	test("POST /user -> Expected Response", async () => {
// 		for (const user of testUsers) {
// 			const res = await fetch(SERVER_URL + "/user", {
// 				method: Method.Post,
// 				body: JSON.stringify(user satisfies RegistrationDetails),
// 				headers: [
// 					[ "Content-Type", "application/json" ]
// 				],
// 			})
// 			expect(res.status).toBe(Status.Created)
// 		}	
// 	})

// 	test("POST /user -> Conflict Response", async () => {
// 		for (const user of testUsers) {
// 			const res = await fetch(SERVER_URL + "/user", {
// 				method: Method.Post,
// 				body: JSON.stringify(user satisfies RegistrationDetails),
// 				headers: [
// 					[ "Content-Type", "application/json" ]
// 				],
// 			})
// 			expect(res.status).toBe(Status.Conflict)

// 			const body = ErrSchema.safeParse(await res.json())
// 			expect(body.success).toBe(true)
// 			expect(body.data?.type).toBe("conflict")
// 		}	
// 	})

// 	test("GET /user?name=<name> -> Expected Response", async () => {
// 		for (const user of testUsers) {
// 			const res = await fetch(SERVER_URL + "/user?name=" + 
// 				encodeURIComponent(user.name))
// 			expect(res.status).toBe(Status.OK)

// 			const body = UserDetailsSchema.safeParse(await res.json())
// 			expect(body.success).toBe(true)
// 		}
// 	})

// 	test("GET /user?name=<name> -> Not Found Response", async () => {
// 		const res = await fetch(SERVER_URL + "/user?name=skibidi")
// 		expect(res.status).toBe(Status.NotFound)
// 	})

// 	test("POST /user/session -> Not Found Response", async() => {
// 		const res = await fetch(SERVER_URL + "/user/session", {
// 			method: Method.Post,
// 			body: JSON.stringify(badEmail satisfies UserCredentials),
// 			headers: [
// 				[ "Content-Type", "application/json" ]
// 			],
// 		})
// 		expect(res.status).toBe(Status.NotFound)
// 	})

// 	test("POST /user/session -> Unauthorized Response", async() => {
// 		const res = await fetch(SERVER_URL + "/user/session", {
// 			method: Method.Post,
// 			body: JSON.stringify(badPassword satisfies UserCredentials),
// 			headers: [
// 				[ "Content-Type", "application/json" ]
// 			],
// 		})
// 		expect(res.status).toBe(Status.Unauthorized)
// 	})

// 	test("POST /user/session -> Expected Response", async () => {
// 		const res = await fetch(SERVER_URL + "/user/session", {
// 			method: Method.Post,
// 			body: JSON.stringify(goodCredentials satisfies UserCredentials),
// 			headers: [
// 				[ "Content-Type", "application/json" ]
// 			],
// 		})
// 		expect(res.status).toBe(Status.OK)
// 	})

// 	test("DELETE /user -> Expected Response", async () => {
// 		const res = await fetch(SERVER_URL + "/user", {
// 			method: Method.Delete,
// 			credentials: "include"
// 		})
// 		expect(res.status).toBe(Status.OK)
// 	})

// 	test("DELETE /user -> Unauthorized Response", async () => {
// 		const res = await fetch(SERVER_URL + "/user", {
// 			method: Method.Delete,
// 			credentials: "include"
// 		})
// 		expect(res.status).toBe(Status.Unauthorized)
// 	})

// 	test ("Cleanup", async () => {
// 		for (const user of testUsers.slice(1)) {
// 			const res1 = await fetch(SERVER_URL + "/user/session", {
// 				method: Method.Post,
// 				body: JSON.stringify({
// 					email: user.email,
// 					password: user.password
// 				} satisfies UserCredentials),
// 				headers: [
// 					[ "Content-Type", "application/json" ]
// 				]
// 			})
// 			expect(res1.status).toBe(Status.OK)

// 			const res2 = await fetch(SERVER_URL + "/user", {
// 				method: Method.Delete,
// 				credentials: "include"
// 			})
// 			expect(res2.status).toBe(Status.OK)
// 		}
// 	})
// })
