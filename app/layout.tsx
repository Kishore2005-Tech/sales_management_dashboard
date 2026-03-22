import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Sales Dashboard - Pipeline Analytics',
  description: 'A comprehensive sales dashboard for analyzing Pipedrive CRM data. Upload your CSV data and visualize deals, pipeline stages, and salesperson performance.',
  generator: 'v0.app',
  keywords: ['sales dashboard', 'CRM analytics', 'Pipedrive', 'pipeline management', 'sales analytics'],
  openGraph: {
    title: 'Sales Dashboard - Pipeline Analytics',
    description: 'A comprehensive sales dashboard for analyzing Pipedrive CRM data. Upload your CSV data and visualize deals, pipeline stages, and salesperson performance.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sales Dashboard - Pipeline Analytics',
    description: 'A comprehensive sales dashboard for analyzing Pipedrive CRM data.',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
