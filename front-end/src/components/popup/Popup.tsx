import "./Popup.css"
import Modal from "./Modal"
import type { PropsWithChildren } from "react"

type PopupProps = PropsWithChildren<{
	/**
	 * This indicates whether or not the popup should be shown.
	 */
	show: boolean

	/**
	 * This will be called when the user clicks away from the popup. In this
	 * function, you should include the logic that handles closing the popup.
	 */
	onClickAway?: () => void
}>

/**
 * This component should wrap any object(s) that you want to appear in a popup.
 * E.g., If you want to notify the user of something, you could do something
 * like this:
 * 
 * ```
 * function Component() {
 * 
 * 	const [ showPopup, setShowPopup ] = useState(false)
 * 
 * 	// ...
 * 
 * 	return <>
 * 		<Popup 
 * 			show={showPopup}
 * 			onClickAway={() => setShowPopup(false)}
 * 		>
 * 			<div className="alertContainer">
 * 				<h1>Alert</h1>
 * 				<p>You can put emojis in comments 🎿</p>
 * 			</div>
 * 		</Popup>
 * 	</>
 * }
 * ```
 * 
 * This component adds no styles or wrappers to the items displayed in a popup,
 * so it's recommended that you wrap them in a styled container (make sure you 
 * give it a background color).
 */
function Popup({ 
	children, show, onClickAway
}: PopupProps) {

	if (!show) return <></>

	return <div className="popupContainer">
		<Modal
			onClickAway={e => {
				if (onClickAway) {
					onClickAway()
					e.stopPropagation()
				}	
			}}
			show={show}
		>
			{children}
		</Modal>
	</div>
}

export default Popup
