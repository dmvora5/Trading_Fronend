/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    SOCKET_URL: process.env.SOCKET_URL,
    API_URL: process.env.API_URL
  }
};

export default nextConfig;
