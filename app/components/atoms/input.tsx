import { ComponentPropsWithoutRef } from "react";

type BaseInputProps = ComponentPropsWithoutRef<"input">;

interface InputProps extends BaseInputProps {
	placeholder: string;
}

export default function Input({ placeholder, ...props }: InputProps) {
	return (
		<div className="space-y-1">
			<span className="text-sm">Import from URL</span>
			<label className="input flex items-center gap-2 bg-input">
				<input className="grow" placeholder={placeholder} {...props} />
				<span className="text-sm font-medium text-primary cursor-pointer">
					Upload
				</span>
			</label>
		</div>
	);
}
