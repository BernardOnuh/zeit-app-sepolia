import React from 'react'
import Header from './Header'
import Footer from './Footer'
import AppLayout from './AppLayout'
import { useData } from '@/context/DataContext'

const Layout = ({children}) => {
  const { isOnApp } = useData()
  return (
    <>
        {isOnApp ? 
          <AppLayout /> :
          <Header />
        }
        {children}
        <Footer />
    </>
  )
}

export default Layout
