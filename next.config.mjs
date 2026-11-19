/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    // Use the tested standalone checker without relocating its relative modules.
    // Temporary while the checker remains on the unmerged preview branch.
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
