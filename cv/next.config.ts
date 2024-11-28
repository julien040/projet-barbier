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
        ];
    },
};

export default nextConfig;
