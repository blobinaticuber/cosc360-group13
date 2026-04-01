import { useEffect, useState, type PropsWithChildren } from "react"
import "./Form.css"
import type { HTTPMethod } from "../../types"

type FormProps = PropsWithChildren<{
	/**
	 * A function used to determine whether or not the form should actually
	 * submit when the `submit` event is dispatched. When this function returns
	 * `true`, then the form will submit as normal. When this function returns
	 * `false`, the submission will be cancelled.
	 * 
	 * @param data Maps input `name`s to their `value`s. This is done in
	 * the same way that using the `FormData` constructor does. However, this
	 * map will omit any `File` inputs.
	 * @param files Maps the `name`s of any `File` inputs to the attached
	 * `File`.
	 */
	validator?: (
		data: Record<string, string>, 
		files: Record<string, File>
	) => boolean

	/**
	 * The HTTP method to use when forming the request.
	 */
	method: HTTPMethod

	/**
	 * The format in which the request body should be formed. Defaults to
	 * `"application/json"`.
	 * 
	 * @remarks 
	 * 
	 * - JSON formatting doesn't include file values in the same way that the
	 * normal form data format does. So, when this property is set to use JSON,
	 * all file inputs will be ignored.
	 * - When the request method is `"GET"`, the data will be put into the
	 * query string, not the request body, as is the normal behavior of a form.
	 */
	contentType?: "application/json" | "multipart/form-data"

	/**
	 * The URL to make a request to upon form submission.
	 */
	url: string

	/**
	 * A callback to handle the response after successfully submitting the 
	 * form.
	 */
	onResponse?: (res: Response) => void | Promise<void>

	/**
	 * Additional options that you can choose to set. These settings will be
	 * added to the `requestInit` object used to make the `fetch` call. You
	 * may need this to set things regarding credentials, CORS, etc.
	 */
	requestOptions?: RequestInit

	/**
	 * If you don't want the form to automatically send a request when it's
	 * submitted, you can instead specify this function. This function will
	 * execute when the user submits the form, and the normal request will
	 * not be sent. (Naturally, `onResponse` will also never be called)
	 * 
	 * This callback will be executed after `validator`. 
	 * 
	 * @param data Maps input `name`s to their `value`s. This is done in
	 * the same way that using the `FormData` constructor does. However, this
	 * map will omit any `File` inputs.
	 * @param files Maps the `name`s of any `File` inputs to the attached
	 * `File`.
	 */
	onSubmit?: (
		data: Record<string, string>, 
		files: Record<string, File>
	) => void | Promise<void>

	/**
	 * When the form is submitted and a request is sent, this function will
	 * be called with `loading == true`. When the response is recieved, it will
	 * be called again with `loading == false`. 
	 * 
	 * Note that the form's fieldset is already disabled automatically when the
	 * request is pending, so you don't have to disable any elements yourself
	 * during loading.
	 */
	onLoading?: (loading: boolean) => void
}>

/**
 * A component to use instead of `<form>`. This component should still enclose
 * various input elements, but will automatically handle some of the repetitive
 * logic that comes up when handling form submissions. 
 * 
 * You should ensure that you set the `validate` method to define validation
 * logic. If the form fires a `"submit"` event and the `validate` method
 * returns successfully, then a request will be sent (via `fetch`) with the
 * data from the form. The request is formed based on the other props:
 * - `method`,
 * - `url`,
 * - `contentType`, and
 * - `requestOptions` (if needed).
 * 
 * Once the request has been sent, the `onResponse` prop will be called with 
 * the response object.
 */
function Form({ 
	children, validator, url, contentType, onLoading,
	method, onResponse, requestOptions, onSubmit
}: FormProps) {
	// Set default values for the optional props.
	requestOptions ??= {}
	contentType ??= "application/json"

	const [ loading, setLoading ] = useState(false)

	useEffect(() => {
		if (onLoading) {
			onLoading(loading)
		}
	}, [ loading ])

	return (
		<form className="formComponent" noValidate onSubmit={async (e) => {
			e.preventDefault()

			const formData = new FormData(e.target)
			const data: Record<string, string> = {}
			const files: Record<string, File> = {}

			for (let [key, value] of formData) {
				if (typeof value === "string") {
					data[key] = value
				} else {
					files[key] = value
				}
			}

			if (validator && !validator(data, files)) {
				return
			}
			
			if (method === "GET") {
				const params = new URLSearchParams(data)
			
				setLoading(true)
				const res = await fetch(url + params.toString(), {
					method: "GET",
					credentials: "include",
					...requestOptions
				})
				setLoading(false)

				if (onResponse) {
					onResponse(res)
				}

				return
			}

			let body: string | FormData
			switch (contentType) {
			case "application/json":
				body = JSON.stringify(data)
				break
			case "multipart/form-data":
				body = formData
				break
			}

			if (onSubmit) {
				const maybePromise = onSubmit(data, files)
				if (maybePromise instanceof Promise) {
					setLoading(true)
					await maybePromise
					setLoading(false)
				}
				return
			}

			setLoading(true)
			const res = await fetch(url, {
				method,
				headers: {
					"Content-Type": contentType
				},
				body,
				credentials: "include",
				...requestOptions
			})
			setLoading(false)

			if (onResponse) {
				onResponse(res)
			}
		}}>
			<fieldset disabled={loading}>
				{children}
			</fieldset>
		</form>
	)
}

export default Form
