import withPWAInit from "next-pwa";

const domain = process.env.NEXT_PUBLIC_DOMAIN || 'http://127.0.0.1:3000';

const withPWA = withPWAInit({
    dest: 'public',
    disable: process.env.NODE_ENV !== "production",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [{ hostname: 'cdn.sanity.io', protocol: 'https' }]
    },
    reactStrictMode: true,
    allowedDevOrigins: [
        new URL(domain).host,
        '127.0.0.1',
        'localhost',
    ],
    turbopack: {
        rules: {
            '*.svg': {
                loaders: ['@svgr/webpack'],
                as: '*.js',
            },
        },
    },
    async redirects() {
        return [
            {
                source: '/studio',
                destination: '/studio/desk',
                permanent: true,
            }
        ];
    },
};

export default withPWA(nextConfig);