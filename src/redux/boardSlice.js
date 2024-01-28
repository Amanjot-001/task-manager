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
            if (state[boardIndex].tasks[0] === undefined) {
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
            let subtask;
            switch (status.toLowerCase()) {
                case "todo":
                    subtask = state[boardIndex].tasks[0].Todo[taskIndex].subtasks[subtaskIndex];
                    break;
                case "doing":
                    subtask = state[boardIndex].tasks[1].Doing[taskIndex].subtasks[subtaskIndex];
                    break;
                case "done":
                    subtask = state[boardIndex].tasks[2].Done[taskIndex].subtasks[subtaskIndex];
                    break;
                default:
                    break;
            }
            subtask.isCompleted = !subtask.isCompleted;
        },
        moveTask: (state, action) => {
            const { boardIndex, fromStatus, toStatus, taskIndex } = action.payload;
            let temp, temp2;
            switch (fromStatus.toLowerCase()) {
                case "todo":
                    temp = state[boardIndex].tasks[0].Todo
                    break;
                case "doing":
                    temp = state[boardIndex].tasks[1].Doing
                    break;
                case "done":
                    temp = state[boardIndex].tasks[2].Done
                    break;
                default:
                    break;
            }
            switch (toStatus.toLowerCase()) {
                case "todo":
                    temp2 = state[boardIndex].tasks[0].Todo
                    break;
                case "doing":
                    temp2 = state[boardIndex].tasks[1].Doing
                    break;
                case "done":
                    temp2 = state[boardIndex].tasks[2].Done
                    break;
                default:
                    break;
            }
            const taskToMove = temp[taskIndex];
            temp.splice(taskIndex, 1);

            temp2.push(taskToMove);
        },
        deleteTask: (state, action) => {
            const { boardIndex, status, taskIndex } = action.payload;
            switch (status.toLowerCase()) {
                case "todo":
                    state[boardIndex].tasks[0].Todo.splice(taskIndex, 1);
                    break;
                case "doing":
                    state[boardIndex].tasks[1].Doing.splice(taskIndex, 1);
                    break;
                case "done":
                    state[boardIndex].tasks[2].Done.splice(taskIndex, 1);
                    break;
                default:
                    break;
            }
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