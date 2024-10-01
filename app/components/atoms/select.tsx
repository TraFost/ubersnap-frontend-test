import { ComponentPropsWithoutRef } from "react";

type BaseSelectProps = ComponentPropsWithoutRef<"select">;

interface SelectProps extends BaseSelectProps {
	options: { value: string; label: string }[];
	label: string;
}

export default function Select({ options, label, ...props }: SelectProps) {
	return (
		<label className="w-full">
			<div className="label">
				<span className="label-text">{label}</span>
			</div>

			<select className="select w-full bg-input" {...props}>
				<option value="initial" disabled>
					Pick one
				</option>
				{options.map((option) => (
					<option key={option.value} value={option.value}>
						{option.label}
					</option>
				))}
			</select>
		</label>
	);
}
