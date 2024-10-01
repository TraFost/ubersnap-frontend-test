import type { Metadata } from "next";
import localFont from "next/font/local";

import AppProvider from "./app-provider";
import "./globals.css";

const geistSans = localFont({
	src: "./fonts/GeistVF.woff",
	variable: "--font-geist-sans",
	weight: "100 900",
});
const geistMono = localFont({
	src: "./fonts/GeistMonoVF.woff",
	variable: "--font-geist-mono",
	weight: "100 900",
});

export const metadata: Metadata = {
	title: "Ubersnap - Rahman Nurudin",
	description:
		"A simple image editor built with OpenCV.js and React. Made by Rahman Nurudin for completion of Ubersnap's technical test.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<AppProvider />

				{children}
			</body>
		</html>
	);
}
