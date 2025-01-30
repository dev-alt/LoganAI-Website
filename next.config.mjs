/** @type {import('next').NextConfig} */
const config = {
    reactStrictMode: true,
    webpack: (config) => {
        config.resolve.alias = {
            ...config.resolve.alias,
            '@': './src',
        };
        return config;
    },
};

export default config;
