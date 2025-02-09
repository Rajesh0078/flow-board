import React from 'react'
import { AiOutlineAppstore, AiOutlineMessage, AiOutlineProject, AiOutlineSetting } from 'react-icons/ai'
import { Link } from 'react-router-dom'

const Sidebar = () => {
    return (
        <aside className='min-w-[300px] h-screen hidden 2xl:flex flex-col bg-white shadow '>
            <Link to={'/'} className='flex items-center gap-4 border-b shadow-sm px-5 h-20'>
                <div className='rounded-[4px] h-10 w-10 bg-gradient-to-br p-[6px] to-primary from-blue-500 textwhite text-center flex'>
                    <div className='h-full aspect-square bg-white rounded-full p-[6px]'>
                        <p className='h-full aspect-square bg-primary rounded-full'></p>
                    </div>
                </div>
                <p className='font-semibold text-xl text-[#0A0A0A] tracking-wide'>FLOW BOARD</p>
            </Link>
            <nav className='flex flex-col gap-2 px-5 py-4 text-gray-700 font-medium'>
                <Link to={'/'} className='flex items-center gap-3 py-2 px-3 rounded-md hover:bg-gray-100'>
                    <AiOutlineAppstore size={20} /> Tasks
                </Link>
                <Link to={'/projects'} className='flex items-center gap-3 py-2 px-3 rounded-md hover:bg-gray-100'>
                    <AiOutlineProject size={20} /> Projects
                </Link>
                <Link to={'/chat'} className='flex items-center gap-3 py-2 px-3 rounded-md hover:bg-gray-100'>
                    <AiOutlineMessage size={20} /> Chat
                </Link>
                <Link to={'/settings'} className='flex items-center gap-3 py-2 px-3 rounded-md hover:bg-gray-100'>
                    <AiOutlineSetting size={20} /> Settings
                </Link>
            </nav>
            <div className='mt-auto px-5 py-4 border-t'>
                <div className='flex items-center gap-3'>
                    <div className='h-10 w-10 bg-gray-300 rounded-full'></div>
                    <div className='text-sm'>
                        <p className='font-semibold text-gray-800'>John Doe</p>
                        <p className='text-xs text-gray-500'>john.doe@email.com</p>
                    </div>
                </div>
            </div>
        </aside>
    )
}

export default Sidebar