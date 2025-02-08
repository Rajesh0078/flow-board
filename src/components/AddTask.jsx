import React, { useState } from 'react';
import { FaPlus, FaUpload } from 'react-icons/fa6';
import { RxCross2 } from 'react-icons/rx';
import { useStore } from '../store/store';
import { addMember } from '../utils/actions';
import MembersFlow from './MembersFlow';

const AddTask = ({ data, setOpenModal }) => {
    const { dispatch, state: { columns, tasks } } = useStore()
    const [formData, setFormData] = useState({
        title: data?.title || "",
        dueDate: data?.dueDate || "",
        assignee: data?.assignee || [],
        priority: data?.priority || "Medium",
        type: data?.type || "col-1",
        attachment: null,
        description: data?.description || "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, attachment: e.target.files[0] });
    };

    const createTask = (e) => {
        e.preventDefault();
        if (!formData.title || !formData.dueDate || !formData.assignee.length) {
            alert("Title, Due Date, and Assignee are required!");
            return;
        }
        if (data) {
            dispatch({ type: "EDIT_TASK", payload: { ...formData, id: data.id } });
        } else {
            const newTaskId = `task-${tasks.length + 1}`;
            dispatch({ type: "ADD_TASK", payload: { ...formData, id: newTaskId } });
            dispatch({ type: "ASSIGN_TASK_COLUMN", payload: { columnId: formData.type, taskId: newTaskId } });
        }
        setOpenModal(false);
    };


    const getNewMember = async () => {
        const member = await addMember()
        const user = member[0]
        const data = {
            name: `${user.name.first} ${user.name.last}`,
            email: user.email,
            gender: user.gender,
            image: user.picture.large
        }
        setFormData({ ...formData, assignee: [...formData.assignee, data] })
    }

    return (
        <div className='min-w-[520px] bg-white rounded-[4px] shadow select-none'>
            <div className='flex justify-between items-center p-3 border-b'>
                <h1 className="text-[20px] font-semibold ">
                    {data ? "Edit Task" : "Create Task"}
                </h1>
                <button onClick={() => setOpenModal(false)}><RxCross2 className='text-xl font-semibold' /></button>
            </div>
            <form className="w-full p-4 flex flex-col gap-3" onSubmit={createTask}>

                {/* Title */}
                <div className="flex flex-col gap-1 text-gray-600">
                    <label className=" font-medium">Task Title *</label>
                    <input
                        name="title"
                        type="text"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full h-10 outline-none border rounded-[4px] px-3"
                        placeholder="Enter Title"
                        required
                    />
                </div>
                <div className='flex w-full gap-4 text-gray-600'>
                    {
                        !data &&
                        <div className="flex flex-col gap-1 w-full text-gray-600">
                            <label className="text-gray-600 font-medium">Type *</label>
                            <select
                                name="type"
                                value={formData.type}
                                onChange={handleChange}
                                required
                                className="w-full h-10 outline-none border rounded-[4px] px-3 bg-white"
                            >
                                {columns.map((option, index) => (
                                    <option key={index} value={option.id}>{option.title}</option>
                                ))}
                            </select>
                        </div>
                    }
                    <div className="flex flex-col gap-1 text-gray-600 w-full">
                        <label className="font-medium">Due Date & Time *</label>
                        <input
                            name="dueDate"
                            type="datetime-local"
                            value={formData.dueDate}
                            onChange={handleChange}
                            className="w-full h-10 outline-none border rounded-[4px] px-3"
                            required
                        />
                    </div>
                </div>

                <div className='flex flex-row-reverse w-full gap-4 text-gray-600'>
                    <div className="flex flex-col gap-1 w-full">
                        <label className="font-medium">Assignee *</label>
                        <div className='h-full flex items-center justify-between gap-2'>
                            {
                                formData.assignee.length <= 4 ?
                                    <button
                                        type='button'
                                        className='h-10 w-10 flex items-center justify-center rounded-[4px] border'
                                        onClick={getNewMember}
                                    >
                                        <FaPlus />
                                    </button> : <p></p>
                            }
                            <div className="flex">
                                <MembersFlow data={formData.assignee} />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-1 w-full text-gray-600">
                        <label className="text-gray-600 font-medium">Priority *</label>
                        <select
                            name="priority"
                            value={formData.priority}
                            onChange={handleChange}
                            required
                            className="w-full h-10 outline-none border rounded-[4px] px-3 bg-white"
                        >
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                    </div>
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-gray-600 font-medium">Attachments</label>
                    <input
                        type="file"
                        id='attachments'
                        onChange={handleFileChange}
                        className=" hidden"
                    />
                    <label htmlFor='attachments' className='w-full text-sm border rounded-[4px] px-3 flex gap-1 text-gray-600 flex-col items-center justify-center p-4'>
                        <FaUpload />
                        <p>Add Attachments</p>
                    </label>
                </div>

                <div className="flex flex-col gap-1 text-gray-600">
                    <label className=" font-medium">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        cols={2}
                        className="w-ful outline-none border rounded-[4px] px-3"
                        placeholder="Enter task details..."
                    ></textarea>
                </div>

                <button
                    type="submit"
                    className="w-full h-10 bg-primary text-white font-medium rounded-[4px] hover:opacity-80 mt-2"
                >
                    {data ? "Update Task" : "Create Task"}
                </button>
            </form>
        </div>
    );
};

export default AddTask;
