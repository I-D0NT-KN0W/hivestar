/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
          "uploadthing.com",
          "utfs.io",
          "images.ecency.com"
        ]
      },
      images: {
        remotePatterns: [
        {
           protocol: "https",
           hostname: "**",
         },
        ],
     },
    };

export default nextConfig;