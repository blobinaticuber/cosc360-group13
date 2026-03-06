import type { IconDefinition } from "@fortawesome/fontawesome-svg-core"
import "./TextInput.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

type TextInputProps = {
	/**
	 * The `type` attribute to set on the underlying `input` element. Defaults
	 * to `"text"`.
	 */
	type?: "email" | "text" | "password"

	/**
	 * The textual label to set for the element. If omitted, it will use the
	 * capitalized `name` prop.
	 */
	label?: string

	/**
	 * The `name` attribute of the underlying `input` element.
	 */
	name: string

	/**
	 * Displays an error message for this input. Keep this short or else it
	 * will look weird.
	 */
	error?: string

	/**
	 * Defines placeholder text for the input.
	 */
	placeholder?: string

	/**
	 * Specifies an icon to display next to the input.
	 */
	icon?: IconDefinition
}

/**
 * A styled component to stand in for `<input type="text">` elements (as well
 * as `type="email"` and `type="password"`). In addition to the `input` 
 * element, this component also includes a `label` element and a way to
 * neatly display error messages.
 */
function TextInput({
	type, label, name, error, placeholder, icon
}: TextInputProps) {
	type ??= "text"

	return (
		<div className="textInputField">
			<label htmlFor={name}>
				<span>
					{icon && <><FontAwesomeIcon icon={icon} />&nbsp;</>}
					{label || <span className="capitalized">{name}</span>}
				</span>
				{error && <span className="errorMessage">{error}</span>}
			</label>
			<input name={name} type={type} placeholder={placeholder} />
		</div>
	)
}

export default TextInput

