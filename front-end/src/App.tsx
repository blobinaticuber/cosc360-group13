import "./App.css"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Account from "./pages/Account"
import Admin from "./pages/Admin"
import CreateListing from "./pages/CreateListing"
import Testing from "./pages/Testing"

export type PagePath = 
	  "/" 
	| "/login" 
	| "/register" 
	| "/account"
	| "/admin"
	| "/test"
	| "/submit"


export const pageTitle: Record<PagePath, string> = {
	"/": "Home",
	"/submit": "Create Listing",
	"/login": "Log In",
	"/register": "Create an Account",
	"/account": "My Account",
	"/test": "Test",
	"/admin": "Admin Page"
}

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/submit" element={<CreateListing />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/account" element={<Account />} />
				<Route path="/test" element={<Testing />} />
				<Route path="/admin" element={<Admin />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App
