/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    disableStaticImages: true,
    domains: ["localhost"],
    domains: ["https://data.digimen.in"],
  },
};

module.exports = nextConfig;
