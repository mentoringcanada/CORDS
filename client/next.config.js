/** @type {import('next').NextConfig} */

const { withSentryConfig } = require("@sentry/nextjs");

const moduleExports = {
	reactStrictMode: true,
};

const sentryWebpackPluginOptions = {
	authToken: process.env.NEXT_PUBLIC_SENTRY_AUTH_TOKEN,
	silent: true, // Suppresses all logs
};

module.exports = withSentryConfig(moduleExports, sentryWebpackPluginOptions);
