import React, { useState } from "react";
import NextImage, {
	StaticImageData,
	ImageProps as OriginalImageProps,
} from "next/image";

import Loading from "./loading";

interface ImageProps extends Omit<OriginalImageProps, "alt"> {
	src: StaticImageData | string;
	width?: number;
	height?: number;
	withLoading?: boolean;
}

export default function Image({
	src,
	width,
	height,
	withLoading = false,
}: ImageProps) {
	const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false);

	const loading = withLoading && !isImageLoaded;

	return (
		<div className="flex items-center justify-center flex-col">
			{loading && <Loading />}

			<figure className="w-full h-full">
				<NextImage
					src={src}
					alt={`Image Of Mock`}
					width={width}
					height={height}
					onLoad={() => setIsImageLoaded(true)}
					className={`${loading ? "hidden" : "block"}`}
					priority
				/>
			</figure>
		</div>
	);
}
