import {Montserrat} from 'next/font/google'
import './globals.scss'
import Head from 'next/head'
import Script from 'next/script'

import yandex_metrika from 'src/yandex_metrika'

const montserrat = Montserrat({
  weight: ['100', '200', '300', '400', '600', '700'],
  variable: '--montserrat-font',
  subsets: ['latin'],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <Head>
        <link rel="preload" href="style.css" as="style" />
      </Head>
      <body className={montserrat.className}>
        <Script id="yandex_metrika" strategy="afterInteractive">
          {yandex_metrika}
        </Script>
        {children}
      </body>
    </html>
  )
}
