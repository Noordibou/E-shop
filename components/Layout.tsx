import React from 'react'
import Footer from './Footer'
import Navbar from './Navbar'

interface LayoutProps {
    children: React.ReactNode
  }
  
  export default function Layout({ children }: LayoutProps) {
    return (
        <>
        <div className=" bg-darkColor mx-auto">
            <Navbar />
            <div className='pb-[320px]'>
            {children}
            </div>
            <Footer />
        </div>
        </>
    )
}

