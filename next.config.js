/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "uploadthing.com",
      "lh3.googleusercontent.com",
      "avatars.githubusercontent.com",
      "images.unsplash.com",
      "icon-library.com",
    ],
  },
  experimental: {
    appDir: true,
  },
  env: {
    RAPID_API_KEY: "4c899a9c92mshd3501ee265975f8p18465cjsnaafcfb705204",
  },
};

module.exports = nextConfig;
