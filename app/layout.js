import './globals.css'
import { Tomorrow } from 'next/font/google'
import { ToasterProvider } from '@/providers/toast-provider'

const tomorrow = Tomorrow({ subsets: ['latin'], weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'] })

export const metadata = {
  title: 'Password Generator',
  description: 'Created using Next JS, Tailwind',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={tomorrow.className} >
        <ToasterProvider />
        {children}
      </body>
    </html>
  )
}
