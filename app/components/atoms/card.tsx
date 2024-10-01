import { ReactNode } from "react";

interface CardProps {
	children: ReactNode;
	title: string;
}

export default function Card({ children, title }: CardProps) {
	return (
		<div className="rounded-xl bg-white max-w-xl w-full shadow-lg p-5 mx-3 my-5 min-w-fit space-y-3">
			<span className="font-semibold">{title}</span>

			{children}
		</div>
	);
}
