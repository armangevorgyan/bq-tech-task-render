/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, max-age=300', // Adjust according to your needs
          },
        ],
      },
    ]
  },
};

export default nextConfig;
