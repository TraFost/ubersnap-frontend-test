import type { Config } from "tailwindcss";
import daisyui from "daisyui";

const config: Config = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			backgroundColor: {
				input: "rgba(170, 188, 222, 0.3)",
			},
		},
	},
	plugins: [daisyui],
	daisyui: {
		themes: [
			{
				lofi: {
					primary: "#1F4690",
					"primary-content": "#FFFFFF",
					"primary-focus": "#003366",
					secondary: "#AAB6C1",
					success: "#16A249",
					error: "#EF4343",
					accent: "#667384",
					neutral: "#F5F7F9",
				},
			},
		],
	},
};
export default config;
