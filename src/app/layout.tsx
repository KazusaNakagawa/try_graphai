import '@/styles/markdown.css'
import { ReactNode } from 'react'
import Providers from './providers'

export const metadata = {
  // 何かメタデータがあれば...
}

export default function RootLayout({ children }: { readonly children: ReactNode }) {
  return (
    <html lang='ja'>
      <body>
        {/* ここではサーバーコンポーネントのまま */}
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
