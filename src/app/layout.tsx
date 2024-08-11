import {Montserrat} from 'next/font/google'
import './globals.scss'
import Head from 'next/head'

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
      <body className={montserrat.className}>{children}</body>
    </html>
  )
}
