import Header from "../components/layout/Header"
import guestUser from "../util/guestUser"
import "./Testing.css"
import CreateListingForm from "../components/create_listing/CreateListingForm"

function Testing() {
	return <>
		<Header currentPage="/test" user={guestUser()} />
		<main className="testingMain">
			<CreateListingForm />
		</main>
	</>
}

export default Testing
