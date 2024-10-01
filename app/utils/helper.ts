import { showToast } from "./toast";

export const sleep = (ms: number) =>
	new Promise((resolve) => setTimeout(resolve, ms));

export const fetchExternalImage = async (imageSrc: string) => {
	try {
		const response = await fetch(imageSrc);
		const blob = await response.blob();
		const reader = new FileReader();
		reader.readAsDataURL(blob);
		return reader;
	} catch (error) {
		showToast("Failed to load external image", "error");
	}
};
