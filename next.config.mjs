/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        domains: [process.env.NEXT_PUBLIC_BACKEND_DOMAIN],
    },
};

export default nextConfig;
