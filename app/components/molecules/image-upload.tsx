import { useState, ChangeEvent, DragEvent, useEffect } from "react";
import cv from "@techstark/opencv-js";

import { Image } from "@components/atoms";

import {
	applyHueRotateFilter,
	resizeImage,
	applyCannyEdgeFilter,
} from "@/utils/open-cv";
import { showToast } from "@/utils/toast";
import UploadIcons from "@assets/upload.png";

interface ImageUploadProps {
	onImageUpload: (image: File | null) => void;
	imageUrl?: string;
	filter?: string;
	aspectRatio?: string;
	isRemoved?: boolean;
}

export default function ImageUpload({
	onImageUpload,
	imageUrl,
	filter,
	aspectRatio,
	isRemoved,
}: ImageUploadProps) {
	const [srcMat, setSrcMat] = useState<cv.Mat | null>(null);
	const [previewUrl, setPreviewUrl] = useState<string | null>(null);
	const [isDragging, setIsDragging] = useState<boolean>(false);

	// Handles the image file upload
	const processFile = (file: File | null) => {
		if (file && file.size > 2097152) {
			showToast("Image size should be less than 2MB", "error");
			return;
		}

		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => loadImage(reader.result as string);
			reader.readAsDataURL(file);
		} else {
			setPreviewUrl(null);
		}
	};

	const loadImage = (imageSrc: string) => {
		const imgElement = new window.Image();
		imgElement.src = imageSrc;
		imgElement.onload = () => {
			const src = cv.imread(drawToCanvas(imgElement));
			setSrcMat(src);
			applyFilter(src);
		};
	};

	const drawToCanvas = (imgElement: HTMLImageElement) => {
		const canvas = document.createElement("canvas");
		canvas.width = imgElement.width;
		canvas.height = imgElement.height;
		const ctx = canvas.getContext("2d");
		ctx?.drawImage(imgElement, 0, 0);
		return canvas;
	};

	// Handles image file input change
	const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0] || null;
		processFile(file);
	};

	// Handles image drag-and-drop
	const handleDrop = (event: DragEvent<HTMLDivElement>) => {
		event.preventDefault();
		setIsDragging(false);
		const file = event.dataTransfer.files?.[0] || null;
		processFile(file);
	};

	// Applies the selected filter to the image
	const applyFilter = (src: cv.Mat) => {
		if (!src) return;

		const dst = new cv.Mat();
		switch (filter) {
			case "grayscale":
				cv.cvtColor(src, dst, cv.COLOR_RGBA2GRAY);
				break;
			case "hue-rotate":
				applyHueRotateFilter(src, dst);
				break;
			case "blur":
				cv.GaussianBlur(src, dst, new cv.Size(7, 7), 0);
				break;
			case "canny-edge":
				applyCannyEdgeFilter(src, dst);
				break;
			default:
				src.copyTo(dst);
				break;
		}

		const resizedImg = resizeImage(dst, aspectRatio);
		const canvas = document.createElement("canvas");

		cv.imshow(canvas, resizedImg);
		setPreviewUrl(canvas.toDataURL());

		canvas.toBlob((blob) => {
			if (blob) {
				onImageUpload(new File([blob], "image.png"));
			}
		});

		cleanUp(dst, resizedImg, canvas);
	};

	const cleanUp = (
		dst: cv.Mat,
		resizedImg: cv.Mat,
		canvas: HTMLCanvasElement
	) => {
		dst.delete();
		resizedImg.delete();
		canvas.remove();
	};

	useEffect(() => {
		if (imageUrl) {
			setPreviewUrl(imageUrl);
		}
	}, [imageUrl]);

	useEffect(() => {
		if (srcMat) {
			applyFilter(srcMat);
		}
	}, [filter, aspectRatio, srcMat]);

	useEffect(() => {
		if (isRemoved) {
			setPreviewUrl(null);
		}
	}, [isRemoved]);

	useEffect(() => {
		return () => {
			srcMat?.delete();
		};
	}, [srcMat]);

	return (
		<div
			className={`flex flex-col items-center gap-3 p-6 transition-colors ${
				isDragging ? "border-primary bg-gray-100" : "border-gray-300"
			} ${!previewUrl ? "border-2 border-dashed" : ""}`}
			onDrop={handleDrop}
			onDragOver={(event) => {
				event.preventDefault();
				setIsDragging(true);
			}}
			onDragLeave={() => setIsDragging(false)}
		>
			<label className="cursor-pointer">
				<input
					type="file"
					accept="image/*"
					onChange={handleImageChange}
					className="hidden"
				/>
				{previewUrl ? (
					<Image
						src={previewUrl}
						withLoading
						width={500}
						height={10}
						sizes="(max-width: 768px) 100vw,
                               (max-width: 1200px) 50vw,
                               33vw"
						style={{ height: "100%", width: "100%" }}
					/>
				) : (
					<div className="flex flex-col items-center space-y-1">
						<Image src={UploadIcons} width={100} height={100} />
						<p className="text-sm">
							{isDragging ? "Release to upload" : "Drop your image here, or"}{" "}
							<span className="text-primary font-medium">browse</span>
						</p>
						<p className="text-xs text-gray-400">
							Supports: PNG, JPG, JPEG, WEBP
						</p>
					</div>
				)}
			</label>
		</div>
	);
}
