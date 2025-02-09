import React, { useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { useStore } from "../store/store";
import TaskCard from "./TaskCard";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdDragIndicator } from "react-icons/md";
import { FaEdit, FaTrash } from "react-icons/fa";
import Modal from "./Modal";

const Column = ({ col, handlerProps, searchTag }) => {
    const { state: { tasks }, dispatch } = useStore();
    const myTasks = col.taskIds.map((id) => tasks.find((task) => task.id === id)).filter(Boolean);

    const [colDropDown, setColDropDown] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [formData, setFormData] = useState({
        title: col.title,
        color: col.color
    })

    const deleteColumn = () => {
        setColDropDown(false)
        dispatch({ type: "DELETE_COLUMN", payload: col.id })
    }

    const closeModal = () => {
        setShowModal(false)
    }

    const editColumn = (e) => {
        e.preventDefault();
        dispatch({
            type: "EDIT_COLUMN",
            payload: { id: col.id, title: formData.title, color: formData.color }
        });
        closeModal();
    };

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    return (
        <div className="rounded-[4px] w-[260px] overflow-hidden">
            <div className={`flex gap-1 items-center justify-between p-2 rounded-[4px] relative`} style={{
                backgroundColor: `${col.color}80`,
            }} {...handlerProps}>
                <div className="flex gap-1 items-center ">
                    <MdDragIndicator className="text-xl" />
                    <h1 className="text-[14px] font-semibold " >
                        {col.title}
                    </h1>
                    {
                        myTasks.length > 0 &&
                        <p className="text-sm ms-2 mmb-1 text-gray-600 font-semibold">{myTasks.length}</p>
                    }
                </div>
                <button onClick={() => setColDropDown(true)} className="h-5 w-6 text-end">
                    <BsThreeDotsVertical className="ms-2" />
                </button>
                {
                    colDropDown &&
                    <div className="absolute right-2 top-2 rounded-[4px] shadow bg-slate-50 px-4 py-2 min-w-[120px] text-[14px]">
                        <button className="flex items-center gap-2 hover:text-blue-600 w-full py-1" onClick={() => { setColDropDown(false); setShowModal(true) }}>
                            <FaEdit />
                            Edit
                        </button>
                        <button className="flex items-center gap-2 mt-1 hover:text-red-600 w-full py-1" onClick={deleteColumn}>
                            <FaTrash className="text-[14px]" />
                            Delete
                        </button>
                    </div>
                }
            </div>

            <Droppable
                droppableId={col.id}
                type="TASK"
                direction="vertical"
                isDropDisabled={false}
                isCombineEnabled={true}
                ignoreContainerClipping={false}
            >
                {(provided) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className="h-[calc(100dvh-216px)] overflow-y-auto flex flex-col gap-2 p-2"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', scrollBehavior: "smooth" }}
                    >
                        {myTasks.filter((task) => task.title.toLowerCase().includes(searchTag.toLowerCase())).map((task, index) => (
                            <Draggable key={task.id} index={index} draggableId={task.id}>
                                {(provided) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        className="bg-white rounded-[4px] shadow"
                                    >
                                        <TaskCard task={task} />
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
            {
                showModal &&
                <Modal>
                    <div className="min-w-[360px] bg-white rounded-[4px]">
                        <h1 className="text-[18px] font-semibold p-4 border-b">Edit Column</h1>
                        <form className="w-full p-4 flex flex-col gap-3" onSubmit={editColumn}>
                            <div className="flex flex-col gap-1">
                                <label htmlFor="col_name" className="text-gray-700 font-medium">Name</label>
                                <input id="col_name" name="title" type="text" onChange={handleChange} value={formData.title} className="w-full h-10 outline-none border rounded-[4px] border-gray-400 px-3" placeholder="Enter Column Name" />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label htmlFor="column_color" className="text-gray-700 font-medium">Color</label>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="color"
                                        id="column_color"
                                        name="color"
                                        value={formData.color}
                                        onChange={handleChange}
                                        className="w-12 h-10 rounded border border-gray-400 cursor-pointer"
                                    />
                                    <input
                                        type="text"
                                        name="color"
                                        value={formData.color}
                                        onChange={handleChange}
                                        className="w-full h-10 outline-none border rounded-[4px] border-gray-400 px-3"
                                        placeholder="Enter Hex Code"
                                    />
                                </div>
                            </div>

                            <div className="w-full flex gap-3 my-3">
                                <button type="button" className="w-full bg-red-200 p-2 rounded-[4px]" onClick={closeModal}>
                                    Cancel
                                </button>
                                <button type="submit" className="w-full bg-primary text-white p-2 rounded-[4px]" >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </Modal>
            }
        </div >
    );
};

export default Column;
