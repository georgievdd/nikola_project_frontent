/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        domains: [process.env.BACKEND_DOMEN],
    },
};

export default nextConfig;
