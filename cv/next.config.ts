import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    reactStrictMode: true,
    async rewrites() {
        return [
            {
                destination: "http://localhost:3001/v1/uploadVideo",
                source: "/api/upload",
            },
            {
                destination: "http://localhost:3001/storage/:path*",
                source: "/video/:path*",
            },
        ];
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
};

export default nextConfig;
