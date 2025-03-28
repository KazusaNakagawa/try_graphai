import '@/styles/markdown.css'
import { ReactNode } from 'react'
import Providers from './providers'
import Header from '@/components/Header'

export const metadata = {
  // 何かメタデータがあれば...
}

export default function RootLayout({ children }: { readonly children: ReactNode }) {
  return (
    <html lang='ja'>
      <body>
        {/* Header added to align with MainContents style */}
        <Header />
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
