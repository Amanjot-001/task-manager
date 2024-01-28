import { configureStore } from "@reduxjs/toolkit";
import boardReducer from "./boardSlice";

const appStore = configureStore({
    reducer: {
        boards: boardReducer,
    },
});

export default appStore;