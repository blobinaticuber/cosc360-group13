import { Router } from "express";
import Status from "util/Status.js"

const ping = Router();

ping.get("/", (_, res) => {
	res.status(Status.OK)
		.end();
});

export default ping;
