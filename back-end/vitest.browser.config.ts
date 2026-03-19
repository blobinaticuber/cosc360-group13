import { defineConfig } from "vitest/config"
import { playwright } from "@vitest/browser-playwright"

export default defineConfig({
	test: {
		browser: {
			enabled: true,
			provider: playwright(),
			instances: [
				{ browser: "firefox" },
			],
			screenshotFailures: false,
			headless: true,
		},
		tags: [
			{
				name: "integration",
				description:
					"Test executed on a browser client to query the API.",
			},
		],
	},
})
