import { faArrowRightToBracket, faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"
import { Link } from "react-router-dom"
import Button from "../components/Button"
import Form from "../components/forms/Form"
import TextInput from "../components/forms/TextInput"
import Header from "../components/layout/Header"
import server from "../server"
import validEmail from "../util/validEmail"
import "./Login.css"

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
				url={server.paths.login}
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

					if (res.ok) {
						// Logged in!
						return
					}

					// Handle errors
					switch (res.status) {
					case 404: // Bad email
						setEmailErr("Unrecognized email")
						return
					case 401: // Good email; bad password
						setPasswordErr("Incorrect password")
						return
					default:  // Unknown error
						alert("Unexpected server error.")
					}
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
