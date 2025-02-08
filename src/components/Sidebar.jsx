import React from 'react'

const Sidebar = () => {
    return (
        <aside className='min-w-[300px] hidden 2xl:inline bg-white shadow p-5'>
            <div className='flex items-center gap-4'>
                <div className='rounded-[4px] h-10 w-10 bg-gradient-to-bl to-primary from-blue-500 textwhite text-center flex'>
                    <p className='m-auto text-xl text-white font-semibold'>FB</p>
                </div>
                <p className='font-semibold text-xl text-[#0A0A0A] tracking-wide'>FLOW BOARD</p>
            </div>
        </aside>
    )
}

export default Sidebar