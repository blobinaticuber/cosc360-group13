import express from "express"
import cors from "cors"

import routers from "./routers/index.js"

const server = express()

server.use(cors())

routers.forEach(router => server.use(router))

server.listen(process.env.PORT, () => {
	console.log(`listening at http://localhost:${process.env.PORT}/`)
})
