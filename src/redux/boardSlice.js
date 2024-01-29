import { createSlice } from "@reduxjs/toolkit";
import data from "../data.json";

const getTask = (status) => {
    switch (status.toLowerCase()) {
        case "todo":
            return { StatusName: "Todo", statusIndex: 0 };
        case "doing":
            return { StatusName: "Doing", statusIndex: 1 };
        case "done":
            return { StatusName: "Done", statusIndex: 2 };
        default:
            break;
    }
}

const boardSlice = createSlice({
    name: "boards",
    initialState: data.boards,
    reducers: {
        addBoard: (state, action) => {
            const { name, tasks } = action.payload;
            const isActive = state.length > 0 ? false : true;
            const board = {
                name,
                isActive,
                tasks,
            };
            state.push(board);
        },
        deleteBoard: (state) => {
            const board = state.find((board) => board.isActive);
            state.splice(state.indexOf(board), 1);
        },
        setBoardActive: (state, action) => {
            const activeIndex = action.payload;
            state.forEach((board, index) => {
                board.isActive = index === activeIndex;
            });
        },
        addTask: (state, action) => {
            const { boardIndex, title, status, subtasks } = action.payload;
            const task = { title, subtasks };
            if (state[boardIndex].tasks[0] === undefined) {
                state[boardIndex].tasks[0] = { Todo: [] };
                state[boardIndex].tasks[1] = { Doing: [] };
                state[boardIndex].tasks[2] = { Done: [] };
            }

            const { StatusName, statusIndex } = getTask(status);
            state[boardIndex].tasks[statusIndex][StatusName].push(task);
        },
        setSubtaskCompleted: (state, action) => {
            const { boardIndex, status, taskIndex, subtaskIndex } = action.payload;
            const { StatusName, statusIndex } = getTask(status);
            const subtask = state[boardIndex].tasks[statusIndex][StatusName][taskIndex].subtasks[subtaskIndex];
            subtask.isCompleted = !subtask.isCompleted;
        },
        moveTask: (state, action) => {
            const { boardIndex, fromStatus, toStatus, taskIndex } = action.payload;
            const { StatusName, statusIndex } = getTask(fromStatus);
            const { StatusName: StatusName2, statusIndex: statusIndex2 } = getTask(toStatus);
            
            const taskToMove = state[boardIndex].tasks[statusIndex][StatusName][taskIndex];
            state[boardIndex].tasks[statusIndex][StatusName].splice(taskIndex, 1);

            state[boardIndex].tasks[statusIndex2][StatusName2].push(taskToMove);
        },
        deleteTask: (state, action) => {
            const { boardIndex, status, taskIndex } = action.payload;
            const { StatusName, statusIndex } = getTask(status);

            state[boardIndex].tasks[statusIndex][StatusName].splice(taskIndex, 1);
        },
    },
});

export const {
    addBoard,
    deleteBoard,
    setBoardActive,
    addTask,
    setSubtaskCompleted,
    moveTask,
    deleteTask,
} = boardSlice.actions;
export default boardSlice.reducer;