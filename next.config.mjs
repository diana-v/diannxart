import withPWAInit from "next-pwa";

const withPWA = withPWAInit({
    dest: 'public',
    disable: process.env.NODE_ENV !== "production",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [{ hostname: 'cdn.sanity.io', protocol: 'https' }],
        minimumCacheTTL: 60 * 60 * 24,
    },
    reactStrictMode: true,
    allowedDevOrigins: ['127.0.0.1', 'localhost'],
    turbopack: {
        rules: {
            '*.svg': {
                loaders: ['@svgr/webpack'],
                as: '*.js',
            },
        },
    },
    experimental: {
        staleTimes: {
            dynamic: 30,
            static: 300
        }
    },
    async redirects() {
        return [
            {
                source: '/',
                destination: '/lt/work',
                permanent: true,
            },
            {
                source: '/lt',
                destination: '/lt/work',
                permanent: true,
            },
            {
                source: '/en',
                destination: '/en/work',
                permanent: true,
            },
            {
                source: '/studio',
                destination: '/studio/desk',
                permanent: true,
            }
        ];
    },
};

export default withPWA(nextConfig);