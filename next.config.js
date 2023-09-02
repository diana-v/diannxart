const withPWA = require("next-pwa")({
    dest: "public",
    disable:
        process.env.NODE_ENV === "development"
});

/** @type {import('next').NextConfig} */
module.exports = withPWA({
    reactStrictMode: true,
    images: {
        domains: ['cdn.sanity.io']
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
