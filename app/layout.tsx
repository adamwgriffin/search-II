import type { Metadata } from 'next'
import GoogleMapsProvider from '~/providers/GoogleMapsProvider'
import ReactQueryClientProvider from '~/providers/ReactQueryClientProvider'
import { ThemeProvider } from '~/providers/ThemeProvider'
import './globals.css'

export const metadata: Metadata = {
  title: 'Awsom',
  description: 'Awsome Homes for sale'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <GoogleMapsProvider>
            <ReactQueryClientProvider>{children}</ReactQueryClientProvider>
          </GoogleMapsProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
