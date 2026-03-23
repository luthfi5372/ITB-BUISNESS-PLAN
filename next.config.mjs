/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Memaksa Vercel mengabaikan error ESLint saat peluncuran
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Memaksa Vercel mengabaikan error TypeScript saat peluncuran
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
