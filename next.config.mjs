/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        domains: [process.env.NEXT_PUBLIC_BACKEND_DOMEN],
    },
};

export default nextConfig;
