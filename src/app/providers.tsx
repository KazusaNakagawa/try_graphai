'use client'

import { ReactNode } from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

// グローバルテーマの設定例
const theme = createTheme({
  palette: {
    background: {
      default: '#fafafa',
    },
  },
  // 他のテーマ設定も必要に応じて追加
})

export default function Providers({ children }: { readonly children: ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}
