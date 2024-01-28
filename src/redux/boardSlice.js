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
            // console.log(state[boardIndex].tasks[0]);
            if(state[boardIndex].tasks[0] === undefined) {
                state[boardIndex].tasks[0] = { Todo: [] };
                state[boardIndex].tasks[1] = { Doing: [] };
                state[boardIndex].tasks[2] = { Done: [] };
            }
            switch (status) {
                case "todo":
                    state[boardIndex].tasks[0].Todo.push(task);
                    break;
                case "doing":
                    state[boardIndex].tasks[1].Doing.push(task);
                    break;
                case "done":
                    state[boardIndex].tasks[2].Done.push(task);
                    break;
                default:
                    break;
            }
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