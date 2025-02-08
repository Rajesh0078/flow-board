import React, { useState } from 'react';
import MembersFlow from './MembersFlow';
import { IoAttach } from "react-icons/io5";
import { FaEdit, FaTrash } from "react-icons/fa";
import Modal from './Modal';
import AddTask from './AddTask';
import { useStore } from '../store/store';

const TaskCard = ({ task }) => {
    const [showModal, setShowModal] = useState(false)
    const { dispatch } = useStore()
    return (
        <div className='w-full bg-[#F9F9F9] rounded-[4px] shadow'>

            <div className="flex justify-between items-center p-2">
                <p className='text-[14px] font-medium text-gray-700'>{task.title}</p>
                <div className="flex gap-3">
                    <button className="text-blue-500 hover:text-blue-700" onClick={() => setShowModal(true)}>
                        <FaEdit className='text-[16px]' />
                    </button>
                    <button className="text-red-500 hover:text-red-700" onClick={() => dispatch({ type: "DELETE_TASK", payload: task.id })}>
                        <FaTrash className='text-[16px]' />
                    </button>
                </div>
                {
                    showModal &&
                    <Modal>
                        <AddTask data={task} setOpenModal={setShowModal} />
                    </Modal>
                }
            </div>
            <p className='px-2 pb-2 text-xs text-gray-600'>{task.description}</p>


            <div className='w-full flex items-center justify-between border-t p-2'>
                <div className='flex items-center gap-1 text-gray-600'>
                    <IoAttach className='text-xl' />
                    <p className={`text-xs py-1 font-medium px-2 rounded ${getPriorityClass(task.priority)}`}>
                        {task.priority}
                    </p>
                </div>
                <div className='flex'>
                    <MembersFlow data={task.assignee} />
                </div>
            </div>
        </div>
    );
};

const getPriorityClass = (priority) => {
    switch (priority) {
        case "High":
            return "bg-red-100 text-red-600 border border-red-400";
        case "Medium":
            return "bg-yellow-100 text-yellow-600 border border-yellow-400";
        case "Low":
            return "bg-green-100 text-green-600 border border-green-400";
        default:
            return "bg-gray-100 text-gray-600 border border-gray-400";
    }
};

export default TaskCard;
