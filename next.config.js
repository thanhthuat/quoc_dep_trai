const withPlugins = require('next-compose-plugins');
const withCSS = require('@zeit/next-css');
const withBundleAnalyzer = require('@next/bundle-analyzer'); // # Analyze is done on build when env var is set // ANALYZE=true yarn build
const { withRasterImages, withPlayback, withFonts, withSVG } = require('@moxy/next-common-files');

const cssConfig = {
    webpack(config, options) {
        if (config.optimization.splitChunks) {
            if (!config.optimization.splitChunks.cacheGroups.shared) {
                config.optimization.splitChunks.cacheGroups.shared = {};
            }
            config.optimization.splitChunks.cacheGroups.shared.enforce = true;
        }
        return config;
    }
};
const bundleAnalyzerConfig = { enabled: process.env.ANALYZE === 'true' };
const nextConfig = {
    onDemandEntries: {
        // period (in ms) where the server will keep pages in the buffer
        maxInactiveAge: 24 * 60 * 60 * 1000,
        // number of pages that should be kept simultaneously without being disposed
        pagesBufferLength: 3,
    },
};

module.exports = withPlugins([
    withCSS(cssConfig),
    withRasterImages(),
    withPlayback(),
    withFonts(),
    withSVG(),
    withBundleAnalyzer(bundleAnalyzerConfig),
], nextConfig);