/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        domains: [process.env.NEXT_PUBLIC_BACKEND_DOMAIN],
    },
    webpack: (config) => {
        config.resolve.fallback = { fs: false };
    
        return config;
      },
};

export default nextConfig;
