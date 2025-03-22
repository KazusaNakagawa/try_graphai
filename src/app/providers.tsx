'use client'

import { ReactNode } from 'react'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: 'gray.51',
      },
    },
  },
})

export default function Providers({ children }: { readonly children: ReactNode }) {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>
}
