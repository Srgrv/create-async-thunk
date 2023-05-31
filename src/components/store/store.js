//packages
import { configureStore } from "@reduxjs/toolkit";

//reducers
import todoSlice from "./todoSlice/todoSlice";

export const store = configureStore({
  reducer: {
    todos: todoSlice,
  },
});

export default store;
