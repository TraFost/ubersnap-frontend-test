/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "**",
			},
		],
	},
	webpack: (config) => {
		config.resolve.fallback = {
			...config.resolve.fallback,
			child_process: false,
			crypto: false,
			fs: false,
			http2: false,
			buffer: false,
			process: false,
			stream: false,
			tls: false,
			path: false,
		};
		return config;
	},
};

export default nextConfig;
