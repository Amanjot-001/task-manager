import { createSlice } from "@reduxjs/toolkit";
import data from "../data.json";

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
            console.log(status)
            console.log(state[boardIndex].tasks[status])
            state[boardIndex].tasks[status].push(task);
        },
        setSubtaskCompleted: (state, action) => {
            const { boardIndex, status, taskIndex, subtaskIndex } = action.payload;
            const subtask = state[boardIndex].tasks[status][taskIndex].subtasks[subtaskIndex];
            subtask.isCompleted = !subtask.isCompleted;
        },
        deleteTask: (state, action) => {
            const { boardIndex, status, taskIndex } = action.payload;
            state[boardIndex].tasks[status].splice(taskIndex, 1);
        },
    },
});

export const {
    addBoard,
    deleteBoard,
    setBoardActive,
    addTask,
    setSubtaskCompleted,
    deleteTask,
} = boardSlice.actions;
export default boardSlice.reducer;