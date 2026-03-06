import "./App.css"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Account from "./pages/Account"

export type PagePath = "/" | "/login" | "/register" | "/account"

export const pageTitle: Record<PagePath, string> = {
	"/": "Home",
	"/login": "Log In",
	"/register": "Create an Account",
	"/account": "My Account"
}

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/account" element={<Account />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App
