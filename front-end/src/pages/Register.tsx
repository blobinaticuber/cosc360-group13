import { faArrowRightToBracket, faEnvelope, faLock, faSpinner, faUser } from "@fortawesome/free-solid-svg-icons"
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
	const [ emailErr, setEmailErr ] = useState("")
	const [ nameErr, setNameErr ] = useState("")
	const [ passwordErr, setPasswordErr ] = useState("")
	const [ confirmPasswordErr, setConfirmPasswordErr ] = useState("")
	const [ loading, setLoading ] = useState(false)

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
					setNameErr("")
					setPasswordErr("")
					setConfirmPasswordErr("")

					if (!data["email"]) {
						setEmailErr("This field is required.")
						errorMarked = true
					}
					if (!data["name"]) {
						setNameErr("This field is required.")
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
					
					if (res.ok) {
						// Registered !!
						return
					}
					
					// Handle errors
					switch (res.status) {
					case 409: // Conflict error
						const { conflicts } = await res.json()
						if ("name" in conflicts && conflicts.name) {
							setNameErr("This name is taken")
						}
						if ("email" in conflicts && conflicts.email) {
							setEmailErr("This email is already in use")
						}
						return
					default:  // Unknown error
						alert("Unexpected server error.")
					}
				}}
				onLoading={setLoading}
			>
				<h1>Create an Account</h1>

				<TextInput
					name="email"
					error={emailErr}
					icon={faEnvelope}
				/>
				<TextInput
					name="name"
					label="Display Name"
					error={nameErr}
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
					key="register"
					spinning={loading}
				/>
				<p>
					Already have an account? <Link to="/login">Log in</Link>.
				</p>
			</Form>
		</main>
	</>)
}

export default Register
