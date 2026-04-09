import { faArrowRightToBracket, faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"
import { Link } from "react-router-dom"
import Button from "../components/Button"
import Form from "../components/forms/Form"
import TextInput from "../components/forms/TextInput"
import server from "../server"
import validEmail from "../util/validEmail"
import { useNavigate } from "react-router-dom"
import "./AdminLogin.css"
import { toast } from "react-toastify"

function AdminLogin() {

	const navigate = useNavigate()

	const [emailErr, setEmailErr] = useState("")
	const [passwordErr, setPasswordErr] = useState("")

	return (<>
		<main className="adminLoginContainer">
			<Form
				method="POST"
				url={server.paths.adminLogin}
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
						toast.success("Logged in", { 
							autoClose: 2000,
							theme: "dark"
						})
						navigate("/admin")

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
				<h1>Administrator Login</h1>

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
					Create one <Link to="/admin/register">here</Link>.
				</p>
			</Form>
		</main>
	</>)
}

export default AdminLogin
