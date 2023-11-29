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
    async redirects() {
        return [
            {
                source: '/',
                destination: '/work',
                permanent: true
            },
            {
                source: '/studio',
                destination: '/structure',
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
