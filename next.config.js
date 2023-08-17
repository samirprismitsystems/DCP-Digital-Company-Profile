/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    disableStaticImages: true,
    domains: ["localhost", "https://data.digimen.in"],
  },
};

module.exports = nextConfig;
