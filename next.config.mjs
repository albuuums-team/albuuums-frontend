/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "albuuums.opolo.su",
        port: "",
      },
    ],
  },
};

export default nextConfig;
