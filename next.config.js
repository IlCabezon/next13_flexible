/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_ENDPOINT: process.env.API_ENDPOINT,
    API_KEY: process.env.API_KEY,
  },
};

module.exports = nextConfig;
