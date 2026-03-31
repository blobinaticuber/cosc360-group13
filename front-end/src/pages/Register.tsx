import { faArrowRightToBracket, faEnvelope, faLock, faUser } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"
import { Link } from "react-router-dom"
import Button from "../components/Button"
import Form from "../components/forms/Form"
import TextInput from "../components/forms/TextInput"
import Header from "../components/layout/Header"
import server from "../server"
import validEmail from "../util/validEmail"
import "./Register.css"

function Register() {
	const [emailErr, setEmailErr] = useState("")
	const [displayNameErr, setDisplayNameErr] = useState("")
	const [passwordErr, setPasswordErr] = useState("")
	const [confirmPasswordErr, setConfirmPasswordErr] = useState("")

	return (<>
		<Header
			currentPage="/register"
			hideProfileMenu
			hidePageTitle
		/>
		<main className="registerContainer">
			<Form
				method="POST"
				url={server.paths.register}
				validator={(data) => {
					let errorMarked = false

					setEmailErr("")
					setDisplayNameErr("")
					setPasswordErr("")
					setConfirmPasswordErr("")

					if (!data["email"]) {
						setEmailErr("This field is required.")
						errorMarked = true
					}
					if (!data["displayName"]) {
						setDisplayNameErr("This field is required.")
						errorMarked = true
					}
					if (!data["password"]) {
						setPasswordErr("This field is required.")
						errorMarked = true
					}
					if (!data["confirmPassword"]) {
						setConfirmPasswordErr("This field is required.")
						errorMarked = true
					}
					if (data["confirmPassword"] != data["password"]) {
						setConfirmPasswordErr("Passwords must match.")
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
					const body = await res.json()
					console.log(body)
				}}
			>
				<h1>Create an Account</h1>

				<TextInput
					name="email"
					error={emailErr}
					icon={faEnvelope}
				/>
				<TextInput
					name="displayName"
					label="Display Name"
					error={displayNameErr}
					icon={faUser}
				/>
				<TextInput
					name="password"
					error={passwordErr}
					icon={faLock}
					type="password"
				/>
				<TextInput
					name="confirmPassword"
					label="Confirm Password"
					error={confirmPasswordErr}
					type="password"
				/>

				<Button
					icon={faArrowRightToBracket}
					text="Register"
				/>
				<p>
					Already have an account? <Link to="/login">Log in</Link>.
				</p>
			</Form>
		</main>
	</>)
}

export default Register
