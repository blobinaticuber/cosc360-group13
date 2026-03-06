import { useEffect, useRef, type PropsWithChildren } from "react"

type ModalProps = PropsWithChildren<{
	/**
	 * This class name is passed down to the `div` which wraps the modal.
	 */
	className?: string

	/**
	 * In order for the modal to be rendered, this property must be set to
	 * `true`.
	 */
	show?: boolean

	/**
	 * This callback will be invoked if the user clicks somewhere on the page
	 * that isn't part of the modal.
	 */
	onClickAway?: (event: PointerEvent) => void
}>

/**
 * This is meant to be used as a container, except that it allows you to 
 * specify certain props that make it suitable for popup menus, modals, alerts,
 * etc.
 * 
 * You can style the modal by giving it a `className`, as you could any normal
 * element. In order to keep this element as general as possible, it has no
 * default styles.
 */
function Modal({ className, show, onClickAway, children }: ModalProps) {
	const modal = useRef<HTMLDivElement | null>(null)

	useEffect(() => {
		document.addEventListener("click", e => {
			if (modal.current == null) return
			if (!onClickAway) return

			// Below, we check whether the mouse click was outside the bounds
			// of the modal by (tediously) checking the x- and y-coordinates of
			// the mouse against the modal's bounds. It wouldn't be enough to
			// simply check `e.target != modal.current` because this condition
			// is `true` even when the item clicked is nested inside the 
			// modal. 

			const boundingRect = modal.current.getBoundingClientRect()

			const menuMinX = boundingRect.left
			const menuMaxX = boundingRect.right
			const menuMinY = boundingRect.top
			const menuMaxY = boundingRect.bottom

			const mouseX = e.clientX
			const mouseY = e.clientY

			if (
				mouseX > menuMaxX ||
				mouseX < menuMinX ||
				mouseY > menuMaxY ||
				mouseY < menuMinY
			) {
				onClickAway(e)
			}
		})
	}, [])

	if (!show) return <></>
	return (
		<div
			className={className ?? ""}
			ref={modal}
		>
			{children}
		</div>
	)
}

export default Modal
