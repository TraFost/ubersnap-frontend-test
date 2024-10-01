import { useState, FormEvent, Fragment } from "react";

import { Card, Divider } from "@/components/atoms";
import { Form, ImageUpload, ImageFilter } from "@/components/molecules";

import { showToast } from "@/utils/toast";
import { sleep } from "@/utils/helper";

type Filter = {
	ratio: string;
	filter: string;
};

const initialFilter: Filter = {
	ratio: "initial",
	filter: "initial",
};

export default function Content() {
	const [imageUrl, setImageUrl] = useState<string>("");
	const [downloadUrl, setDownloadUrl] = useState<string>("");
	const [isImageUploaded, setIsImageUploaded] = useState<boolean>(false);
	const [isRemoved, setIsRemoved] = useState<boolean>(false);
	const [edit, setEdit] = useState<Filter>(initialFilter);

	const handleEdit = (key: keyof Filter, value: string) => {
		setEdit((prev) => ({ ...prev, [key]: value }));
	};

	const handleImageUpload = (image: File | null) => {
		const hasImage = !!image;
		setIsImageUploaded(hasImage);

		if (hasImage) {
			setDownloadUrl(URL.createObjectURL(image as Blob));
		}
	};

	const uploadImageByUrl = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (!imageUrl) {
			showToast("Please enter a valid URL", "error");
			return;
		}

		setIsImageUploaded(true);
	};

	const resetState = async () => {
		setImageUrl("");
		setDownloadUrl("");
		setIsImageUploaded(false);
		setEdit(initialFilter);
	};

	const downloadImage = () => {
		const link = document.createElement("a");
		link.href = downloadUrl;
		link.download = "edited-image.png";
		link.click();

		resetState();
	};

	const removeImage = async () => {
		setIsRemoved(true);
		resetState();

		await sleep(1000);

		setIsRemoved(false);
	};

	return (
		<Card title={isImageUploaded ? "Edit Photo" : "Upload Photo"}>
			<ImageUpload
				onImageUpload={handleImageUpload}
				aspectRatio={edit.ratio}
				imageUrl={isImageUploaded ? imageUrl : ""}
				filter={edit.filter}
				isRemoved={isRemoved}
			/>

			{!isImageUploaded && (
				<Fragment>
					<Divider title="or" />
					<Form uploadImageByUrl={uploadImageByUrl} getImageUrl={setImageUrl} />
				</Fragment>
			)}

			{isImageUploaded && (
				<ImageFilter
					aspectRatio={edit.ratio}
					filter={edit.filter}
					onFilterChange={(filter) => handleEdit("filter", filter)}
					onAspectRatioChange={(ratio) => handleEdit("ratio", ratio)}
					onDownload={downloadImage}
					onCancel={removeImage}
				/>
			)}
		</Card>
	);
}
