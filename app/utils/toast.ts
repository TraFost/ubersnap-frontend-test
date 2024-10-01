import { toast } from "sonner";

export const showToast = (
	message: string,
	type: "success" | "error" | "info"
): void => {
	toast[type](message, {
		position: "top-center",
	});
};
