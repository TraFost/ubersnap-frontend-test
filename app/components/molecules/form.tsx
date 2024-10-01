import { ChangeEvent, FormEvent, useState } from "react";

import { Input } from "@/components/atoms";

interface FormProps {
	uploadImageByUrl: (event: FormEvent<HTMLFormElement>) => void;
	getImageUrl: (url: string) => void;
}

export default function Form({ uploadImageByUrl, getImageUrl }: FormProps) {
	const [imageUrl, setImageUrl] = useState<string>("");

	const handleImageUrlChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;

		setImageUrl(value);
		getImageUrl(value);
	};

	return (
		<form onSubmit={uploadImageByUrl}>
			<Input
				placeholder="Add file URL"
				type="text"
				value={imageUrl}
				onChange={handleImageUrlChange}
			/>
		</form>
	);
}
