import React from "react";

import { Button, Select } from "@/components/atoms";

const filterOptions = [
	{ value: "grayscale", label: "Grayscale" },
	{ value: "canny-edge", label: "Canny Edge" },
	{ value: "hue-rotate", label: "Hue Rotate" },
	{ value: "blur", label: "Blur" },
	{ value: "original", label: "Original" },
];

const aspectRatioOptions = [
	{ value: "1:1", label: "1:1" },
	{ value: "4:3", label: "4:3" },
	{ value: "16:9", label: "16:9" },
	{ value: "21:9", label: "21:9" },
];

interface ImageFilterProps {
	filter: string;
	aspectRatio: string;
	onFilterChange: (filter: string) => void;
	onAspectRatioChange: (aspectRatio: string) => void;
	onDownload: () => void;
	onCancel: () => void;
}

export default function ImageFilter({
	aspectRatio,
	filter,
	onAspectRatioChange,
	onFilterChange,
	onCancel,
	onDownload,
}: ImageFilterProps) {
	return (
		<div className="w-full">
			<div className="flex gap-4 items-center flex-col md:flex-row w-full">
				<Select
					value={filter}
					options={filterOptions}
					label="Choose Filter"
					onChange={(e) => onFilterChange(e.target.value)}
				/>
				<Select
					value={aspectRatio}
					options={aspectRatioOptions}
					label="Choose Aspect Ratio"
					onChange={(e) => onAspectRatioChange(e.target.value)}
				/>
			</div>

			<div className="flex justify-end mt-4 gap-3">
				<Button variant="secondary" title="Cancel" onClick={onCancel} />
				<Button variant="primary" title="Download" onClick={onDownload} />
			</div>
		</div>
	);
}
