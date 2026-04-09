import { faArrowRightToBracket, faEnvelope, faLock, faUser } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Button from "../components/Button"
import Form from "../components/forms/Form"
import TextInput from "../components/forms/TextInput"
import server from "../server"
import validEmail from "../util/validEmail"
import { toast } from "react-toastify"
import "./AdminRegister.css"

function AdminRegister() {
	const navigate = useNavigate()
	const [ emailErr, setEmailErr ] = useState("")
	const [ nameErr, setNameErr ] = useState("")
	const [ passwordErr, setPasswordErr ] = useState("")
	const [ confirmPasswordErr, setConfirmPasswordErr ] = useState("")
	const [ adminKeyErr, setAdminKeyErr ] = useState("")
	const [ loading, setLoading ] = useState(false)

	return (<>
		<main className="adminRegisterContainer">
			<Form
				method="POST"
				url={server.paths.adminRegister}
				validator={(data) => {
					let errorMarked = false

					setEmailErr("")
					setNameErr("")
					setPasswordErr("")
					setConfirmPasswordErr("")
					setAdminKeyErr("")

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
					if (!data["adminKey"]) {
						setAdminKeyErr("Key is required.")
						errorMarked = true
					}

					return !errorMarked
				}}
				onResponse={async (res) => {
					
					if (res.ok) {
						toast.success("Account created", { autoClose: 2000 })
						navigate("/admin/login")
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
					case 401: // Invalid key error
						setAdminKeyErr("Incorrect admin key")
						return
					default:  // Unknown error
						alert("Unexpected server error.")
					}
				}}
				onLoading={setLoading}
			>
				<h1>Create Administrator Account</h1>

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
				<TextInput
					name="adminKey"
					label="Administrator Key"
					error={adminKeyErr}
					type="password"
				/>

				<Button
					icon={faArrowRightToBracket}
					text="Register"
					key="register"
					spinning={loading}
				/>
				<p>
					Already have an admin account? <Link to="/admin/login">Log in</Link>.
				</p>
			</Form>
		</main>
	</>)
}

export default AdminRegister
