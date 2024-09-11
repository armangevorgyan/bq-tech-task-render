/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [{ hostname:'www.notion.so' }],
  },
};

export default nextConfig;
