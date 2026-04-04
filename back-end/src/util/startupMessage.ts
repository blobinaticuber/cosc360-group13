function startupMessage(): string {
	switch (process.env.MODE) {
	case "development":
		return `\u001b[2J
    \u001b[0;92mBooklend development server running\u001b[0m

    \u001b[3;90mURL\u001b[0m                      \u001b[0;96m${process.env.SERVER_URL}\u001b[0m
    \u001b[3;90mDocumentation\u001b[0m            \u001b[0;96m${process.env.SERVER_URL}/docs\u001b[0m
    \u001b[3;90mMost Recent Test Report\u001b[0m  \u001b[0;96m${process.env.SERVER_URL}/test\u001b[0m
	`
	case "production":
		return `
    \u001b[97mProduction server running\u001b[0m

    \u001b[3;90mURL\u001b[0m            \u001b[0;96m${process.env.SERVER_URL}\u001b[0m
    \u001b[3;90mDocumentation\u001b[0m  \u001b[0;96m${process.env.SERVER_URL}/docs\u001b[0m
	
	`
	default: 
		throw new Error(
			"`process.env.MODE` not set. Check the `.env` file."
		)		
	}
}

export default startupMessage;
