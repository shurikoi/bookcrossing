import './globals.css'
import type { Metadata } from 'next'
import localFont from 'next/font/local'

const eUkraine = localFont({src: [
  {
    path: "../public/fonts/e-UkraineHead-Regular.otf",
    weight: "600"
  },
  {
    path: "../public/fonts/e-UkraineHead-Light.otf",
    weight: "400"
  },
  {
    path: "../public/fonts/e-Ukraine-Regular.otf",
    weight: "500"
  },
  {
    path: "../public/fonts/e-Ukraine-Light.otf",
    weight: "300"
  },
  {
    path: "../public/fonts/e-Ukraine-Thin.otf",
    weight: "200"
  },
]})

export const metadata: Metadata = {
  title: 'Bookcrossing',
  description: '',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={eUkraine.className}>{children}</body>
    </html>
  )
}
