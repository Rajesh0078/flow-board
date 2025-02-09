import React, { useState } from 'react';
import MembersFlow from './MembersFlow';
import { IoAttach } from "react-icons/io5";
import { FaClock, FaEdit, FaFlag, FaTrash } from "react-icons/fa";
import Modal from './Modal';
import AddTask from './AddTask';
import { useStore } from '../store/store';
import { getDueDateLabel } from '../utils/actions';

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
                <div className="relative flex items-center gap-1 text-gray-600 ">
                    <IoAttach className="text-2xl" />
                    <div className='flex group'>
                        <p className={`text-xs py-1 font-medium px-1 rounded ${getPriorityClass(task.priority)}`}>
                            <FaFlag className="text-[17px]" />
                        </p>
                        <span className="absolute left-0 bottom-full mb-1 hidden w-auto px-2 py-1 text-xs text-white bg-gray-800 rounded shadow-md group-hover:block">
                            {task.priority}
                        </span>
                    </div>
                    <div className='flex ms-2 items-center gap-1'>
                        <FaClock />
                        <p className='text-sm'>{getDueDateLabel(task.dueDate)}</p>
                    </div>
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
            return "text-red-600 ";
        case "Medium":
            return "text-yellow-600 ";
        case "Low":
            return "text-green-600";
        default:
            return "text-gray-600";
    }
};

export default TaskCard;
