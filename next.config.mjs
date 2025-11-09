import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./src/i18n.ts')
function resolveApiBaseUrl() {
  const base =
    process.env.API_BASE_URL ??
    process.env.NEXT_PUBLIC_API_BASE_URL ??
    'http://localhost:3333'
  return base.endsWith('/') ? base.slice(0, -1) : base
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  // Redirects are handled by middleware (auth + i18n)
  async headers() {
    const headers = [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
    ]

    // Optional Content-Security-Policy. Define CSP string via env CSP_HEADER
    // Example: default-src 'self'; img-src 'self' https://cdn.example.com; connect-src 'self' https://api.example.com
    const csp = process.env.CSP_HEADER
    if (csp) {
      headers[0].headers.push({ key: 'Content-Security-Policy', value: csp })
    }

    return headers
  },
  // Rely on i18n middleware to handle default-locale routing from '/'.
  async rewrites() {
    // Avoid clashing with Next.js API routes and NextAuth at /api/*.
    // Use a dedicated prefix to proxy to the backend.
    const apiBaseUrl = resolveApiBaseUrl()
    return [
      {
        source: '/backend/:path*',
        destination: `${apiBaseUrl}/:path*`,
      },
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.grupomadretereza.com.br',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'cdn-icons-png.flaticon.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'img.myloview.com.br',
        port: '',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3333',
      },
      {
        protocol: 'https',
        hostname: 'sistema-madre-sim-back-madre.mvgvsw.easypanel.host',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'api.grupomadretereza.com.br',
        port: '',
      },
    ],
  },
}

export default withNextIntl(nextConfig)
