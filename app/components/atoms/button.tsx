import { ComponentPropsWithoutRef } from "react";

type BaseButtonProps = ComponentPropsWithoutRef<"button">;

interface ButtonProps extends BaseButtonProps {
	variant: "primary" | "secondary";
	title: string;
}

export default function Button({ variant, title, ...props }: ButtonProps) {
	const defaultStyles = {
		primary: "bg-primary text-primary-content",
		secondary: "bg-transparent text-black border border-gray-300",
	}[variant];

	return (
		<button
			className={`px-5 py-1.5 rounded-md text-sm font-medium ${defaultStyles} disabled:opacity-50`}
			{...props}
		>
			<p>{title}</p>
		</button>
	);
}
