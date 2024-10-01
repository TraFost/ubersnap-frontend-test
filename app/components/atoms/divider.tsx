import React, { memo } from "react";

interface DividerProps {
	title: string;
}

export default memo(function Divider({ title }: DividerProps) {
	return (
		<div className={`divider divider-neutral text-gray-500 text-xs`}>
			{title}
		</div>
	);
});
