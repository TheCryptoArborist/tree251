/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    // Use the tested standalone checker without relocating its relative modules.
    // Keep the public short link stable while the checker assets live under /testing.
    return [
      {
        source: '/permit-checker',
        destination: '/testing/mobile-tree-checker.html',
        permanent: false
      }
    ];
  }
};

export default nextConfig;
