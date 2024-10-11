/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://back-end-book-hive.onrender.com/:path*",
      },
    ];
  },
};

export default nextConfig;
