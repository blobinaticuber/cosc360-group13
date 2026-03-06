import type { HTTPMethod } from "../../types"

/**
 * Represents the name of an accepted route. These names are identifiers only,
 * they do not affect the endpoint in any way.
 */
type RouteName = "login" | "register"

/**
 * Contains information about an available route.
 */
type RouteInfo = {
	/**
	 * The URL for the route. E.g., if you're using `fetch`, you might use this
	 * as the URL for the request.
	 */
	url: string
	/**
	 * The HTTP methods that are expected for requests to the URL.
	 */
	methods: HTTPMethod[]
}

type Server = {
	/**
	 * Contains information about the available routes. Normally, when you want
	 * to interact with the server you would just call one of the available
	 * methods on the {@link Server} object. But if no method is appropriate,
	 * this object can be useful for finding an endpoint.
	 */
	routes: Record<RouteName, RouteInfo>
}

const baseUrl = import.meta.env.VITE_SERVER_BASE_URL

/**
 * This object includes a set of functions to interact with the back-end Rest
 * API. At the time of writing, this is just a placeholder.
 */
const server: Server = {
	routes: {
		login: {
			url: baseUrl + "/login",
			methods: [ "POST" ]
		},
		register: {
			url: baseUrl + "/register",
			methods: [ "POST" ]
		}
	}
}

export default server
