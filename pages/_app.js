import { useEffect } from 'react'
import { SessionProvider } from "next-auth/react"
const isServer = typeof window === 'undefined'
const WOW = !isServer ? require('wow.js') : null
import Layout from '@/layout/Layout'
import '@/styles/globals.css'
import { DataGet } from '@/context/DataContext';

export default function App({ Component, pageProps: { session, ...pageProps} }) {
  useEffect (() => {
    new WOW().init()
  }, [])
  return (
    <SessionProvider>
      <DataGet>
        <Layout >
          <Component {...pageProps} />
        </Layout>
      </DataGet>
    </SessionProvider>
    )
}
