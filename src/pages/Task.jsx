import React, { useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { FaFilter, FaPlus } from "react-icons/fa6";
import { useStore } from "../store/store";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import Column from "../components/Column";
import { getRandomColor } from "../utils/actions";

const Task = () => {
    const { state: { columns }, dispatch } = useStore();

    const onDragEnd = (result) => {
        if (!result.destination) return;

        const { source, destination, type } = result;

        if (type === "COLUMN") {
            const newColumns = [...columns];
            const [movedColumn] = newColumns.splice(source.index, 1);
            newColumns.splice(destination.index, 0, movedColumn);
            dispatch({ type: "MOVE_COLUMNS", payload: newColumns });
        }

        else if (type === "TASK") {
            const newColumns = [...columns];

            const sourceColumn = newColumns.find(col => col.id === source.droppableId);
            const destinationColumn = newColumns.find(col => col.id === destination.droppableId);

            if (!sourceColumn || !destinationColumn) return;

            const newSourceTaskIds = [...sourceColumn.taskIds];
            const [movedTask] = newSourceTaskIds.splice(source.index, 1);

            if (sourceColumn.id === destinationColumn.id) {
                newSourceTaskIds.splice(destination.index, 0, movedTask);
                sourceColumn.taskIds = newSourceTaskIds;
            } else {
                const newDestinationTaskIds = [...destinationColumn.taskIds];
                newDestinationTaskIds.splice(destination.index, 0, movedTask);

                sourceColumn.taskIds = newSourceTaskIds;
                destinationColumn.taskIds = newDestinationTaskIds;
            }

            dispatch({ type: "MOVE_COLUMNS", payload: newColumns });
        }
    };

    const addColumn = () => {
        const col = { id: `col-${columns.length + 1}`, title: `Column-${columns.length + 1}`, color: getRandomColor(), taskIds: [] }
        dispatch({ type: "ADD_COLUMN", payload: col })
    }



    useEffect(() => {
        localStorage.setItem("kanbanColumns", JSON.stringify(columns));
    }, [columns]);

    return (
        <div className="">
            <div className="h-10 p-5 bg-white shadow-sm rounded-[4px] my-5 flex justify-between items-center text-gray-500">
                <div className="flex items-center gap-1">
                    <FaSearch className="text-[14px] mt-[2px]" />
                    <input type="text" placeholder="search tasks...." className="outline-none px-2 hidden md:inline" />
                </div>
                <div className="flex items-center gap-4 text-[14px]">
                    <button className="flex items-center gap-2 font-semibold hover:text-primary" onClick={addColumn}>
                        <FaPlus className="text-[14px] mt-[2px]" />
                        Add Column
                    </button>
                    |
                    <button className="flex items-center gap-2 font-semibold hover:text-primary">
                        <FaFilter className="text-[14px] mt-[2px]" />
                        Filter
                    </button>
                </div>
            </div>

            <div>
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable
                        droppableId="columns"
                        direction="horizontal"
                        type="COLUMN"
                        isCombineEnabled={false}
                        isDropDisabled={false}
                        ignoreContainerClipping={false}
                        className=""
                    >
                        {(provided) => (
                            <div
                                className="flex gap-4 overflow-x-auto pb-2"
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                            >
                                {columns.map((column, index) => (
                                    <Draggable key={column.id} draggableId={column.id} index={index}>
                                        {(provided) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                className="bg-white p-1 rounded-[4px] shadow"
                                            >
                                                <Column col={column} handlerProps={provided.dragHandleProps} />
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </div>
        </div>
    );
};

export default Task;
