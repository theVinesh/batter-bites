/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Don't use font optimization on static export (breaks on Pages)
  // next/font will still work for static export via CSS
};

module.exports = nextConfig;
