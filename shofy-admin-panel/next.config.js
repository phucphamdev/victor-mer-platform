/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  redirects:async()=> {
    return [
      {
        source:'/',
        destination:'/login',
        permanent:false
      }
    ]
  },
  images: {
    domains: ['i.ibb.co','res.cloudinary.com','lh3.googleusercontent.com'],
  },
}

module.exports = nextConfig
