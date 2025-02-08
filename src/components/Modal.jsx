import React from 'react'

const Modal = ({ children }) => {
    return (
        <div className='fixed w-full min-h-dvh bg-black/25 top-0 left-0 flex items-center justify-center'>
            {children}
        </div>
    )
}

export default Modal