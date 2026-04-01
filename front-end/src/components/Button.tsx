import "./Button.css"
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core"
import { faSpinner } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

type ButtonProps = {
	/**
	 * The `Button` component has built-in styles, but if you want to include 
	 * additional ones you can set this property, which will be passed down
	 * to the underlying `button` element.
	 */
	className?: string

	/**
	 * Will be invoked when the user clicks on the button.
	 */
	onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void

	/**
	 * Optionally, this can be used to help determine the style of the button. 
	 * - "normal" is the default style.
	 * - "subtle" is a more subtle style, suitable for buttons that are less
	 * important or likely to be used.
	 * - "important" is a loud style, suitable for buttons that represent
	 * important actions such as deletions.
	 */
	style?: "normal" | "subtle" | "important"

	/**
	 * You can specify an icon (as imported from `@fortawesome/*`) to use for
	 * this button. It will be prefixed to the text.
	 */
	icon?: IconDefinition

	/**
	 * Sets the text for the button.
	 */
	text?: string

	/**
	 * If this is set to `true`, then the button's icon will be replaced with
	 * a spinner and the button will be disabled. 
	 */
	spinning?: boolean

	/**
	 * Set this to `true` to disable the button.
	 */
	disable?: boolean
}

function Button({ 
	className, onClick, style, icon, text, spinning, disable
}: ButtonProps) {
	style ??= "normal"

	return (
		<button
			disabled={spinning || disable}
			className={
				"buttonComponent" + 
				" " + (className ?? "") +
				" " + style
			}
			onClick={e => {
				e.stopPropagation()
				if (onClick) onClick(e)
			}}
		>
			{icon ?
				(spinning ?
					<>
					<FontAwesomeIcon icon={faSpinner} className="spinning" key="spinner" /> {text}</>
					:
					<>
					<FontAwesomeIcon icon={icon} key="icon" /> {text}
					</>
				)
				:
				text
			}
		</button>
	)
}

export default Button
