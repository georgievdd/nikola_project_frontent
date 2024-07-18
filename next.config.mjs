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
    async redirects() {
        return [
            {
                source: '/:path*',
                has: [{ type: 'query', key: 'notFound', value: 'true' }],
                destination: '/not-found',
                permanent: false,
            }
        ]
    }
};

export default nextConfig;
