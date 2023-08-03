import './globals.css'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import ToasterContext from './context/ToasterContext'
import AuthContext from './context/AuthContext'
import ActiveStatus from './components/ActiveStatus'

const openSans = Poppins({ weight: ['500'], subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Red Messenger',
  description: 'a Messenger clone app made by Redhawc',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={openSans.className}>
        <AuthContext>
          <ToasterContext />
          <ActiveStatus />
          {children}
        </AuthContext>
      </body>
    </html>
  )
}
