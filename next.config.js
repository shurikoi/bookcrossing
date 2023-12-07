/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        minimumCacheTTL: 60,
        remotePatterns: [
            {
                protocol: "http",
                hostname: "**",
            },
        ],
    },
}

module.exports = nextConfig
