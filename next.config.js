const withPWA = require("next-pwa")({
    dest: 'public',
    disable: process.env.NODE_ENV !== "production",
});

/** @type {import('next').NextConfig} */
module.exports = withPWA({
    reactStrictMode: true,
    images: {
        remotePatterns: [{ protocol: 'https', hostname: 'cdn.sanity.io' }]
    },
    i18n: {
        locales: ['lt', 'en'],
        defaultLocale: 'lt',
    },
    async rewrites() {
        return [
            {
                source: '/darbai',
                destination: '/work',
            },
            {
                source: '/apie',
                destination: '/about',
            },
            {
                source: '/kontaktai',
                destination: '/contact',
            },
        ];
    },
    async redirects() {
        return [
            {
                source: '/',
                destination: '/darbai',
                permanent: true
            },
            {
                source: '/studio',
                destination: '/studio/desk',
                permanent: true
            }
        ];
    },

    webpack: (config) => {
        config.resolve.fallback = {
            ...config.resolve.fallback,
            fs: false,
        };

        config.module.rules.push({
                test: /\.svg$/,
                use: ['@svgr/webpack', 'url-loader'],
        })

        return config
    },
});
