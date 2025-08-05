/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@mui/x-charts'],
  modularizeImports: {
    '@mui/x-charts': {
      transform: '@mui/x-charts/{{member}}',
    },
  },
}

module.exports = nextConfig