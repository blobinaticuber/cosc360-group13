import { useState } from "react"
import Button from "../Button"
import "./ProfilePictureUploader.css"
import server from "../../server"
import { faUpload } from "@fortawesome/free-solid-svg-icons"
import { toast } from "react-toastify"

type ProfilePictureUploadProps = {
	className?: string
	onNewProfilePicture?: (newUrl: string) => void
}

function ProfilePictureUpload({ 
	className, onNewProfilePicture 
}: ProfilePictureUploadProps) {
	const [ newProfilePicture, setNewProfilePicture ] = 
		useState<File | null>(null)
	const [ uploading, setUploading ] = useState(false)

	return <div 
		className={"profilePictureUpload " + (className ? className : "")}
	>
		<label 
			className="fileSelectButton"
		>
			Select a new profile picture
			<input
				className="profilePictureInput" 
				type="file" 
				accept="image/*" 
				onChange={e => {
					setNewProfilePicture(e.target.files?.[0] ?? null)
				}} 
			/>
		</label>
		{newProfilePicture && <div className="uploadRow">
			<span className="fileName">
				{newProfilePicture.name}
			</span>
			<Button 
				className="uploadButton"
				text={"Upload"}
				icon={faUpload}
				spinning={uploading}
				onClick={async () => {
					if (newProfilePicture == null) {
						return
					}

					setUploading(true)
					const [newUrl, err] = await server
						.uploadProfilePicture(newProfilePicture)
					setUploading(false)
					
					switch (err) {
					case "file too large":
						toast.error("File too large")
						return
					case "unknown error":
						toast.error("An error occurred, please try again")
						return
					}

					toast.success("File uploaded")
					setNewProfilePicture(null)

					if (onNewProfilePicture) {
						onNewProfilePicture(newUrl)
					}
				}}
			/>
		</div>}						
	</div>
}

export default ProfilePictureUpload
