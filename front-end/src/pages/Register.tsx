import { faArrowRightToBracket, faEnvelope, faLock, faUser } from "@fortawesome/free-solid-svg-icons"
import Button from "../components/Button"
import "./Register.css"
import { Link } from "react-router-dom"
import server from "@server"
import Form from "../components/Form"
import { useState } from "react"
import TextInput from "../components/TextInput"
import validEmail from "../util/validEmail"
import Header from "../components/Header"

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
				url={server.routes.register.url}
				validator={(data) => {
					let errorMarked = false

					setEmailErr("")
					setDisplayNameErr("")
					setPasswordErr("")
					setConfirmPasswordErr("")

					if (!data["email"]) {
						setEmailErr("Please enter an email.") 
						errorMarked = true
					}
					if (!data["displayName"]) {
						setDisplayNameErr("Please enter a display name.") 
						errorMarked = true
					}
					if (!data["password"]) {
						setPasswordErr("Please enter your password.") 
						errorMarked = true
					}
					if (!data["confirmPassword"]) {
						setConfirmPasswordErr("Please confirm your password.") 
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
					const body = await (await res).json()
					console.log(body)
				}}
			>
				<h1>Create an Account</h1>
			
				<TextInput
					name="email"
					error={emailErr}
					icon={faEnvelope}
					placeholder="example@email.com"
				/>
				<TextInput
					name="displayName"
					label="Display Name"
					error={displayNameErr}
					icon={faUser}
					placeholder="Username"
				/>
				<TextInput
					name="password"
					error={passwordErr}
					icon={faLock}
					type="password"
					placeholder="Password"
				/>
				<TextInput 
					name="confirmPassword"
					label="Confirm Password"
					error={confirmPasswordErr}
					type="password"
					placeholder="Confirm Password"
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
