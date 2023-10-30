/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        minimumCacheTTL: 3600,
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**",
            },
        ],
    },
}

module.exports = nextConfig
