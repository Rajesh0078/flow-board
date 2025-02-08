import React from 'react';
import Image from '../assets/under-construction.svg';

const WorkingOn = () => {
    return (
        <div className="w-full h-[calc(100dvh-60px)] flex flex-col pt-20 items-center text-center px-4">
            <div className="max-w-sm">
                <img src={Image} alt="Under Construction" className="w-full max-h-[300px] object-contain" />
            </div>
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mt-4">
                This page is under construction 🚧
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
                We're working hard to bring you something amazing. Stay tuned!
            </p>
        </div>
    );
};

export default WorkingOn;
