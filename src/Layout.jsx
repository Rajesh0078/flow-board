import React from 'react'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import { Outlet } from 'react-router-dom'

const Layout = () => {
    return (
        <main className='bg-slate-100 h-dvh flex w-full'>
            <Sidebar />
            <section className='p-5 w-full 2xl:w-[calc(100%-300px)] h-full'>
                <Header />
                <Outlet />
            </section>
        </main>
    )
}

export default Layout