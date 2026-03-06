import type { PropsWithChildren } from "react"
import "./Form.css"
import type { HTTPMethod } from "../types"

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
	onResponse?: (res: Promise<Response>) => void | Promise<void>

	/**
	 * Additional options that you can choose to set. These settings will be
	 * added to the `requestInit` object used to make the `fetch` call. You
	 * may need this to set things regarding credentials, CORS, etc.
	 */
	requestOptions?: RequestInit
}>

/**
 * A component to use instead of `form`. This component should still enclose
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
	children, validator, url, contentType, 
	method, onResponse, requestOptions
}: FormProps) {
	// Set default values for the optional props.
	requestOptions ??= {}
	contentType ??= "application/json"

	return (
		<form className="formComponent" noValidate onSubmit={e => {
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
			
				const res = fetch(url + params.toString(), {
					method: "GET",
					...requestOptions
				})

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

			const res = fetch(url, {
				method,
				headers: {
					"Content-Type": contentType
				},
				body,
				...requestOptions
			})

			if (onResponse) {
				onResponse(res)
			}
		}}>
			{children}
		</form>
	)
}

export default Form
