import React from 'react'
import Header from './Header'
import Footer from './Footer'
import AppLayout from './AppLayout'

const Layout = ({children}) => {
  return (
    <>
        <Header />
        {/* <AppLayout /> */}
        {children}
        <Footer />
    </>
  )
}

export default Layout
