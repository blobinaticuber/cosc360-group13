/**
 * Enumerates the HTTP methods.
 */
enum Method {
	Get     = "GET",
	Head    = "HEAD",
	Post    = "POST",
	Put     = "PUT",
	Patch   = "PATCH", // RFC 5789
	Delete  = "DELETE",
	Connect = "CONNECT",
	Options = "OPTIONS",
	Trace   = "TRACE",
}

export default Method
