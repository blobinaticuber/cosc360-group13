//
// This file contains utility functions for running tests.
//

import type Method from "util/Method.js"

const SERVER_URL = "http://localhost:3000/"

/**
 * Sends a request to the server.
 */
export async function sendBody(
	path: string, 
	method: Method, 
	body?: any,
	params?: Record<string, string>
): Promise<Response> {

	const url = new URL(path, SERVER_URL)

	if (params) {
		for (const key of Object.keys(params)) {
			url.searchParams.set(key, params[key]!)
		}
	}

	if (body) {
		return fetch(
			url.href,
			{
				method,
				body: JSON.stringify(body),
				headers: {
					"Content-Type": "application/json",
				},
				credentials: "include",
			}
		)
	}

	return fetch(
		url.href,
		{
			method,
			credentials: "include",
		}
	)
}
