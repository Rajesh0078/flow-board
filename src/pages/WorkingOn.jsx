// import React from 'react';
// import Image from '../assets/under-construction.svg';

// const WorkingOn = () => {
//     return (
//         <div className="w-full h-[calc(100dvh-60px)] flex flex-col pt-20 items-center text-center px-4">
//             <div className="max-w-sm">
//                 <img src={Image} alt="Under Construction" className="w-full max-h-[300px] object-contain" />
//             </div>
//             <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mt-4">
//                 This page is under construction 🚧
//             </h2>
//             <p className="text-gray-500 dark:text-gray-400 mt-1">
//                 We're working hard to bring you something amazing. Stay tuned!
//             </p>
//         </div>
//     );
// };

// export default WorkingOn;


import React, { useState } from 'react';
import { FaHeart } from 'react-icons/fa';

const WorkingOn = () => {
    const [accepted, setAccepted] = useState(false);

    return (
        <div className="w-full h-[calc(100dvh-100px)] flex flex-col items-center justify-center text-center  dark:bg-gray-900 relative overflow-hidden">
            {/* Falling Hearts Effect */}
            {accepted && (
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                    {Array.from({ length: 20 }).map((_, i) => (
                        <FaHeart
                            key={i}
                            className="absolute text-red-500 text-3xl animate-fall"
                            style={{
                                left: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 2}s`,
                            }}
                        />
                    ))}
                </div>
            )}

            {!accepted ? (
                <>
                    {/* Initial Heart & Proposal Message */}
                    <FaHeart className="text-red-500 text-6xl animate-bounce" />
                    <h2 className="text-3xl md:text-4xl font-bold text-red-600 mt-4">
                        Satya, I Love You ❤️
                    </h2>
                    <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mt-2">
                        You are the best thing that ever happened to me. <br />
                        Will you be mine forever? 💍
                    </p>

                    {/* "Yes" Button */}
                    <button
                        onClick={() => setAccepted(true)}
                        className="mt-6 px-6 py-3 text-lg font-semibold text-white bg-red-500 rounded-full shadow-lg hover:bg-red-600 transition-all"
                    >
                        Say Yes 💕
                    </button>
                </>
            ) : (
                <>
                    {/* Surprise Message After Clicking "Yes" */}
                    <h2 className="text-4xl font-bold text-red-600 mt-4 animate-fadeIn">
                        Yayy! 🎉 You said Yes!
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300 mt-2 animate-fadeIn">
                        You just made my heart the happiest. ❤️ <br />
                        Now, let's make our love story even more magical! ✨
                    </p>
                </>
            )}
        </div>
    );
};

export default WorkingOn;
