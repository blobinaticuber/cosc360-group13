import { Router } from "express"

const ping = Router()

ping.get("/", (_, res) => {
	res.writeHead(200)
		.end()
})

export default ping
