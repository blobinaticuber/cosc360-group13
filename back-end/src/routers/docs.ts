import { Router } from "express"
import userSpec from "./user/schema.js"
import { OpenApiGeneratorV31 } from "@asteasolutions/zod-to-openapi"
import Status from "util/Status.js"
import swaggerUi from "swagger-ui-express"

const docs = Router()

const generator = new OpenApiGeneratorV31(userSpec.definitions)
const spec = generator.generateDocument({
	openapi: "3.1.0",
	info: {
		title: "Booklend API",
		version: "0.0.1"
	}
})

docs.get("/openapi.json", (req, res) => {
	res.status(Status.OK).json(spec)
})

docs.use("/docs", swaggerUi.serve, swaggerUi.setup(spec))

export default docs
