/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
    domains: [
      'avatars.githubusercontent.com',
      'builds.contra.com',
      'lh3.googleusercontent.com',
      'drive.google.com',
    ],
  },
};

module.exports = nextConfig;
