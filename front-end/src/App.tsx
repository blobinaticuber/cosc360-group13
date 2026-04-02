import "./App.css"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { createContext, useEffect, useState, type Dispatch, type SetStateAction } from "react"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Account from "./pages/Account"
import Admin from "./pages/Admin"
import CreateListing from "./pages/CreateListing"
import Testing from "./pages/Testing"
import type { PersonalDetails } from "./server"
import server from "./server"

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

type UserContextType = [ 
	user: PersonalDetails | null, 
	setUser: Dispatch<SetStateAction<PersonalDetails | null>> | null
]
export const UserContext = createContext<UserContextType>([ null, null ])

function App() {
	const [user, setUser] = useState<PersonalDetails | null>(null)

	useEffect(() => {
		server.currentUser().then(([ user, _ ]) => setUser(user))
	}, [])

	return (
		<UserContext value={[user, setUser]}>
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
		</UserContext>
	);
}

export default App
