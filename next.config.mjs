/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'zerotwo.lol',
        port: '',
        pathname: '/**'
      }
    ]
  }
}

export default nextConfig
