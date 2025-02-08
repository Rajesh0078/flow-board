import { createContext, useContext, useReducer } from "react"

const StoreContext = createContext();

const getInitialState = () => {
    const savedColumns = localStorage.getItem("kanbanColumns");
    const cols = JSON.parse(savedColumns)
    return {
        columns: cols ? cols : [
            { id: 'col-1', title: "To Do", color: "#FF5733", taskIds: ['task-1'] },
            { id: 'col-2', title: "In Progress", color: "#F39C12", taskIds: [] },
            { id: 'col-3', title: "Done", color: "#2ECC71", taskIds: ['task-2', 'task-3'] }
        ],
        tasks: [
            { id: 'task-1', content: "Content" },
            { id: 'task-2', content: "Content" },
            { id: 'task-3', content: "Content" },
        ]
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
        case "ADD_TASK":
            return {
                ...state,
                tasks: [...state.tasks, action.payload]
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