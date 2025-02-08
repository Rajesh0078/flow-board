import React from 'react'

const MembersFlow = ({ data }) => {
    return (
        <>
            {data.map((member, index) => (
                <div
                    key={index}
                    className={`h-8 w-8 rounded-full overflow-hidden border-2 border-white ${index !== 0 ? '-ml-3' : ''}`}
                >
                    <img src={member.image} alt="" className='h-full w-full object-cover' />
                </div>
            ))}
        </>
    )
}

export default MembersFlow