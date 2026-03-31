import type { BookDetailData } from "./ServerTypes"

const URL = import.meta.env.VITE_SERVER_BASE_URL as string

export type BookDetails = BookDetailData[number]

const server = {
	async searchBooks(
		title: string, page?: number
	): Promise<BookDetailData | null> {
		const query = new URLSearchParams({
			page: (page ?? 1).toString()
		})

		const res = await fetch(
			URL + "/search/book/" + title + "?" + query.toString()
		)

		switch (res.status) {
		case 200:
			const results = await res.json()
			return results as BookDetailData
		case 404:
			return null
		default:
			return null
		}
	},

	paths: {
		login: URL + "/user/session",
		register: URL + "/user"
	}
}

export default server
