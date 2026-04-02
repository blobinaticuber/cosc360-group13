import Form from "../components/forms/Form"

export default function CreateListing() {
    return(
        <div>
            <h1>Create a Book Listing</h1>

            <Form
                method="POST"
                url="/api/submit"
                contentType="application/json"
                validator={(data) => {
                    if (!data.title || !data.author) {
                        alert("Title and author are required.")
                        return false
                    }

                    if (data.year && isNaN(Number(data.year))) {
                        alert("Year must be a number.")
                        return false
                    }

                    return true
                }}

                onResponse={async (resPromise) => {
                    const res = await resPromise

                    if (res.ok){
                        alert('Listing successfully created!')
                    }
                    else{
                        alert('Failed to submit listing.')
                    }
                }}
            >
                <div>
					<label>Title</label>
					<input type="text" name="title" />
				</div>

				<div>
					<label>Author</label>
					<input type="text" name="author" />
				</div>

				<div>
					<label>Year</label>
					<input type="text" name="year" />
				</div>

				<div>
					<label>Genre</label>
					<input type="text" name="genre" />
				</div>

				<div>
					<label>Description</label>
					<textarea name="description" />
				</div>

				<div>
					<label>Cover Image</label>
					<input type="file" name="cover" />
				</div>

				<button type="submit">Submit</button>
            </Form>
        </div>
    )
}