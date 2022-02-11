/** @type {import('next').NextConfig} */
const nextTranslate = require("next-translate");
const { withSentryConfig } = require("@sentry/nextjs");

const moduleExports = nextTranslate({
	reactStrictMode: false,
});

const sentryWebpackPluginOptions = {
	authToken: process.env.NEXT_PUBLIC_SENTRY_AUTH_TOKEN,
	silent: true, // Suppresses all logs
};
module.exports = withSentryConfig(moduleExports, sentryWebpackPluginOptions);
