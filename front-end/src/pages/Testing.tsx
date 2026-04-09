import Header from "../components/layout/Header"
import "./Testing.css"
import CreateListingForm from "../components/create_listing/CreateListingForm"

function Testing() {
	return <>
		<Header currentPage="/test" />
		<main className="testingMain">
			<CreateListingForm />
		</main>
	</>
}

export default Testing
