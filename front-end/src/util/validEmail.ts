/**
 * Returns `true` if and only if the provided string is a valid email.
 * 
 * This function uses the same input validation as an `<input type="email">`
 * element would.
 */
function validEmail(email: string): boolean {
	const emailInput = document.createElement("input")
	emailInput.type = "email"
	emailInput.value = email
	return emailInput.checkValidity()
}

export default validEmail
