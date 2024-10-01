import cv from "@techstark/opencv-js";

export const applyHueRotateFilter = (src: cv.Mat, dst: cv.Mat) => {
	cv.cvtColor(src, dst, cv.COLOR_RGBA2RGB);
	cv.cvtColor(dst, dst, cv.COLOR_RGB2HSV);

	for (let i = 0; i < dst.rows; i++) {
		for (let j = 0; j < dst.cols; j++) {
			const pixel = dst.ucharPtr(i, j);
			pixel[0] = (pixel[0] + 90) % 180;
		}
	}

	cv.cvtColor(dst, dst, cv.COLOR_HSV2RGB);
};

export const resizeImage = (src: cv.Mat, aspectRatio?: string): cv.Mat => {
	if (!src || !aspectRatio) return src;

	const [widthRatio, heightRatio] = aspectRatio.split(":").map(Number);
	const originalHeight = src.rows;
	const originalWidth = src.cols;

	let newWidth = originalWidth;
	let newHeight = originalHeight;

	if (widthRatio && heightRatio) {
		const targetAspectRatio = widthRatio / heightRatio;

		if (originalWidth / originalHeight > targetAspectRatio) {
			newHeight = originalHeight;
			newWidth = Math.floor(originalHeight * targetAspectRatio);
		} else {
			newWidth = originalWidth;
			newHeight = Math.floor(originalWidth / targetAspectRatio);
		}
	}

	const dst = new cv.Mat();
	cv.resize(src, dst, new cv.Size(newWidth, newHeight));
	return dst;
};

export const applyCannyEdgeFilter = (src: cv.Mat, dst: cv.Mat) => {
	const gray = new cv.Mat();
	const edges = new cv.Mat();
	cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY);
	cv.Canny(gray, edges, 50, 150);

	cv.cvtColor(edges, dst, cv.COLOR_GRAY2RGBA);

	gray.delete();
	edges.delete();
};
