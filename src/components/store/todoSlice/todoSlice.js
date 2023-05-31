//packages
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getTask = createAsyncThunk(
  "todo/getTodos",
  async (_, { rejectWithValue }) => {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/todos?_limit=10`
    );
    return response.data;
  }
);

export const addTask = createAsyncThunk(
  "todo/addTask",
  async (title, { rejectWithValue, dispatch }) => {
    const todo = {
      title: title,
      userId: 1,
      completed: false,
      id: new Date().toISOString(),
    };

    const response = await axios.post(
      `https://jsonplaceholder.typicode.com/todos/`,
      {
        body: todo,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    );

    dispatch(addTodo(response.data.body));
  }
);

export const toogleTask = createAsyncThunk(
  "todo/toogleTask",
  async (id, { rejectWithValue, dispatch, getState }) => {
    const todo = getState().todos.list.find((todo) => todo.id === id);

    const response = await axios.patch(
      `https://jsonplaceholder.typicode.com/todos/${id}`,
      {
        body: {
          completed: !todo.completed,
        },
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    );

    console.log(response.data);

    dispatch(toggleTodo({ id }));
  }
);

export const deleteTask = createAsyncThunk(
  "todo/deleteTask",
  async (id, { rejectWithValue, dispatch }) => {
    const response = await axios.delete(
      `https://jsonplaceholder.typicode.com/todos/${id}`
    );
    dispatch(deleteTodo({ id }));
    console.log(response);
  }
);

export const todoSlice = createSlice({
  name: "todo",
  initialState: {
    list: [],
  },
  reducers: {
    addTodo(state, action) {
      state.list.push(action.payload);
    },
    deleteTodo(state, action) {
      state.list = state.list.filter((todo) => {
        return todo.id !== action.payload.id;
      });
    },
    toggleTodo(state, action) {
      const change = state.list.find((todo) => {
        return todo.id === action.payload.id;
      });
      change.completed = !change.completed;
    },
  },
  extraReducers: (build) => {
    build.addCase(getTask.fulfilled, (state, action) => {
      console.log("getTask - fulfilled");
      state.list = action.payload;
    });
    build.addCase(addTask.fulfilled, (state, action) => {
      console.log("addTask - fulfilled");
    });
    build.addCase(toogleTask.fulfilled, (state, action) => {
      console.log("toogleTask - fulfilled");
    });
    build.addCase(deleteTask.fulfilled, (state, action) => {
      console.log("deleteTask - fulfilled");
    });
  },
});

export const { addTodo, deleteTodo, toggleTodo } = todoSlice.actions;
export default todoSlice.reducer;

//Проблема в extraReducer - addTask, потому что сервер сам должен присвоивать id, а мы вручную добавили
//И поэтому как мы попытаемся изменить чекбокс новой добавленной задачи, мы сталкиваемся с проблемой того, что в URL прописывается new Date()
