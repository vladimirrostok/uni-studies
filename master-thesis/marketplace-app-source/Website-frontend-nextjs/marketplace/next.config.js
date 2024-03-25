const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");

module.exports = withPWA({
  env: {
    PASSWORD_PROTECT: process.env.ENVIRONMENT === "staging",
  },
  images: {
    domains: [
      "gateway.pinata.cloud",
      "marketplace-storage.fra1.digitaloceanspaces.com",
      "strapi-cms-akawx.ondigitalocean.app",
      "localhost",
    ],
  },
  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on `fs` module
    if (!isServer) config.resolve.fallback.fs = false;
    return config;
  },
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  pwa: {
    dest: "public",
    runtimeCaching,
  },
});
