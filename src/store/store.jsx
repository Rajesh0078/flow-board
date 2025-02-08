import { createContext, useContext, useReducer } from "react"

const StoreContext = createContext();

const getInitialState = () => {
    const savedColumns = localStorage.getItem("kanbanColumns");
    const savedTasks = localStorage.getItem("kanbanTasks");
    const cols = JSON.parse(savedColumns)
    const tasks = JSON.parse(savedTasks)
    return {
        columns: cols ? cols : [
            { id: 'col-1', title: "To Do", color: "#FF5733", taskIds: [] },
            { id: 'col-2', title: "In Progress", color: "#F39C12", taskIds: [] },
            { id: 'col-3', title: "Done", color: "#2ECC71", taskIds: [] }
        ],
        tasks: tasks ?? []
    }
}


const reducer = (state, action) => {
    switch (action.type) {
        case "MOVE_COLUMNS":
            return {
                ...state,
                columns: action.payload
            }
        case "ADD_COLUMN":
            return {
                ...state,
                columns: [...state.columns, action.payload]
            }
        case "EDIT_COLUMN":
            return {
                ...state,
                columns: state.columns.map(col =>
                    col.id === action.payload.id
                        ? { ...col, title: action.payload.title, color: action.payload.color }
                        : col
                )
            }
        case "DELETE_COLUMN":
            return {
                ...state,
                columns: state.columns.filter(col => col.id !== action.payload)
            }
        case "ASSIGN_TASK_COLUMN":
            return {
                ...state,
                columns: state.columns.map(col =>
                    col.id === action.payload.columnId
                        ? { ...col, taskIds: [...col.taskIds, action.payload.taskId] }
                        : col
                )
            };
        case "ADD_TASK":
            return {
                ...state,
                tasks: [...state.tasks, action.payload]
            };
        case "EDIT_TASK":
            return {
                ...state,
                tasks: state.tasks.map(task =>
                    task.id === action.payload.id ? { ...task, ...action.payload } : task
                ),
            };

        case "DELETE_TASK":
            return {
                ...state,
                tasks: state.tasks.filter(task => task.id !== action.payload),
                columns: state.columns.map(column => ({
                    ...column,
                    taskIds: column.taskIds.filter(taskId => taskId !== action.payload),
                })),
            };
        default:
            return state
    }
}

export const StoreProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, getInitialState())
    return <StoreContext.Provider value={{ state, dispatch }}>
        {children}
    </StoreContext.Provider>
}

export const useStore = () => useContext(StoreContext)