/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        domains: [process.env.NEXT_PUBLIC_BACKEND_DOMAIN || 'str', process.env.BACKEND_DOMEN || 'str', 'localhost'],
    },
};

export default nextConfig;
