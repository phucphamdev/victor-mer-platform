/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Không cần hard-code env ở đây nữa
  // Tất cả biến NEXT_PUBLIC_* sẽ được load từ .env.local
}

module.exports = nextConfig
