import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaPlus, FaChartBar } from "react-icons/fa6";
import { FaBars, FaBell, FaProjectDiagram, FaTasks } from "react-icons/fa";
import Modal from "./Modal";
import AddTask from "./AddTask";

const Header = () => {

    const [openModal, setOpenModal] = useState(false)

    return (
        <header className="w-full flex justify-between items-center h-10">
            <div className="h-full flex gap-4">
                <button className="h-full w-full 2xl:hidden">
                    <FaBars className="text-[20px]" />
                </button>
                <nav className="hidden md:flex bg-white rounded-[4px] h-full text-[16px] font-medium ">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `flex items-center px-5 gap-2 rounded-[4px] h-full transition-colors ${isActive ? "bg-primary text-white" : "text-gray-500"}`
                        }
                    >
                        <FaTasks className="mr-2" /> Tasks
                    </NavLink>

                    <NavLink
                        to="/projects"
                        className={({ isActive }) => `flex items-center px-5 gap-2 h-full transition-colors ${isActive ? "bg-primary text-white" : "text-gray-500"}`}
                    >
                        <FaProjectDiagram className="mr-2" /> Projects
                    </NavLink>

                    <NavLink
                        to="/reports"
                        className={({ isActive }) =>
                            `flex items-center px-5 h-full gap-2 rounded-[4px] transition-colors ${isActive ? "bg-primary text-white" : "text-gray-500"}`
                        }
                    >
                        <FaChartBar className="mr-2" /> Reports
                    </NavLink>
                </nav>
            </div>
            <div className="flex items-center gap-5 md:gap-8 h-full">
                <button className="text-gray-500 text-xl">
                    <FaBell />
                </button>
                <button className="h-full px-5 md:w-[180px] rounded-[4px] bg-primary text-white text-[16px] font-medium flex justify-center items-center gap-3 shadow-md hover:bg-primary-dark transition" onClick={() => setOpenModal(true)}>
                    <FaPlus /> Add Task
                </button>
            </div>
            {
                openModal &&
                <Modal>
                    <AddTask setOpenModal={setOpenModal} />
                </Modal>
            }
        </header>
    );
};

export default Header;
