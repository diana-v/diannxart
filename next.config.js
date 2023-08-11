/** @type {import('next').NextConfig} */
module.exports = {
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
}
