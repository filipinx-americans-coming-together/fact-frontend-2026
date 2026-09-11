/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'drive.google.com',
                pathname: '/uc',
            },
            {
                protocol: 'https',
                hostname: 'i.ytimg.com',
            },
            {
                protocol: 'https',
                hostname: 'd8t8hw5atqxm3ugh.public.blob.vercel-storage.com',
            },
        ],
    },
};

export default nextConfig;