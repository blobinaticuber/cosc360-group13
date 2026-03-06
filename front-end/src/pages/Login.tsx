import { Link } from "react-router-dom"
import Form from "../components/Form"
import server from "../util/server"
import "./Login.css"
import Button from "../components/Button"
import { faArrowRightToBracket, faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"
import validEmail from "../util/validEmail"
import TextInput from "../components/TextInput"
import Header from "../components/Header"

function Login() {
	const [emailErr, setEmailErr] = useState("")
	const [passwordErr, setPasswordErr] = useState("")

	return (<>
		<Header 
			currentPage="/login" 
			hideProfileMenu 
			hidePageTitle
		/>
		<main className="loginContainer">
			<Form
				method="POST"
				url={server.routes.login.url}
				validator={(data) => {
					let errorMarked = false

					setEmailErr("")
					setPasswordErr("")

					if (!data["email"]) {
						setEmailErr("This field is required.") 
						errorMarked = true
					}
					if (!data["password"]) {
						setPasswordErr("This field is required.") 
						errorMarked = true
					}
					if (!validEmail(data["email"])) {
						setEmailErr("Please enter a valid email.")
						errorMarked = true
					}

					return !errorMarked
				}}
				onResponse={async (res) => {
					// This is a placeholder which just logs the server 
					// response.
					const body = await (await res).json()
					console.log(body)
				}}
			>
				<h1>Log In</h1>

				<TextInput
					name="email"
					error={emailErr}
					icon={faEnvelope}
				/>
				<TextInput
					name="password"
					error={passwordErr}
					icon={faLock}
					type="password"
				/>

				<Button
					icon={faArrowRightToBracket}
					text="Log In"
				/>
				<p>
					Don't have an account?
					<br />
					Create one <Link to="/register">here</Link>.
				</p>
			</Form>
		</main>
	</>)
}

export default Login
