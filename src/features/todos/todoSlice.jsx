import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  todos: [],
  error: "",
};

const api = axios.create({
  baseURL: "http://localhost:5000",
});

export const getAsyncTodos = createAsyncThunk(
  "todos/getAsyncTodos",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("http://localhost:5000/todos");
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const addAsyncTodos = createAsyncThunk(
  "todo/addAsyncTodos",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/todos", {
        id: payload.id,
        title: payload.title,
        completed: payload.completed,
      });
      console.log(data);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteAsyncTodos = createAsyncThunk(
  "todo/deleteAsyncTodos",
  async (payload, { rejectWithValue }) => {
    try {
      await api.delete(`/todos/${payload.id}`);
      // console.log(data);
      return { id: payload.id };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const toggleAsyncTodos = createAsyncThunk(
  "todo/toggleAsyncTodos",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await api.put(`/todos/${payload.id}`, {
        completed: payload.completed,
        title: payload.title,
      });
      console.log(data);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const newTodo = {
        id: Date.now(),
        title: action.payload.title,
        completed: false,
      };
      state.todos.push(newTodo);
    },
    toggleTodo: (state, action) => {
      const selectedTodo = state.todos.find(
        (s) => s.id === Number(action.payload.id)
      );
      selectedTodo.completed = !selectedTodo.completed;
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter(
        (s) => s.id !== Number(action.payload.id)
      );
    },
  },
  extraReducers: {
    [getAsyncTodos.pending]: (state, action) => {
      state.loading = true;
      state.todos = [];
      state.error = "";
    },
    [getAsyncTodos.fulfilled]: (state, action) => {
      state.loading = false;
      state.todos = action.payload;
      state.error = "";
    },
    [getAsyncTodos.rejected]: (state, action) => {
      state.loading = false;
      state.todos = [];
      state.error = action.payload;
    },
    [addAsyncTodos.pending]: (state, action) => {
      state.loading = true;
    },
    [addAsyncTodos.fulfilled]: (state, action) => {
      state.loading = false;
      state.todos.push(action.payload);
      state.error = "";
    },
    [addAsyncTodos.rejected]: (state, action) => {
      state.loading = false;
      state.todos = [];
      state.error = action.payload;
    },
    [deleteAsyncTodos.fulfilled]: (state, action) => {
      state.loading = false;
      state.todos = state.todos.filter(
        (todo) => todo.id !== Number(action.payload.id)
      );
      state.error = "";
    },
    [toggleAsyncTodos.fulfilled]: (state, action) => {
      state.loading = false;
      const selectedTodo = state.todos.find(
        (todo) => todo.id === Number(action.payload.id)
      );
      selectedTodo.completed = action.payload.completed;

      state.error = "";
    },
  },
});

export const { addTodo, deleteTodo, toggleTodo } = todoSlice.actions;
export default todoSlice.reducer;
