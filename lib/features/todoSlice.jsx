"use client"

import { createSlice } from "@reduxjs/toolkit"
import { saveState } from "@/lib/localStorage"

const initialState = {
  todos: [],
  subTodos: [],
  searchTerm: "",
  filter: "all",
}

export const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    // Set all todos (used for loading from localStorage)
    setTodos: (state, action) => {
      state.todos = action.payload
    },

    // Main Todo actions
    addTodo: (state, action) => {
      state.todos.push(action.payload)
      saveState({ todos: state })
    },
    updateTodo: (state, action) => {
      const { id, changes } = action.payload
      const index = state.todos.findIndex((todo) => todo.id === id)
      if (index !== -1) {
        state.todos[index] = { ...state.todos[index], ...changes }
      }
      saveState({ todos: state })
    },
    toggleTodo: (state, action) => {
      const todo = state.todos.find((todo) => todo.id === action.payload)
      if (todo) {
        todo.isCompleted = !todo.isCompleted
      }
      saveState({ todos: state })
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload)
      // Also delete all sub-todos associated with this todo
      state.subTodos = state.subTodos.filter((subTodo) => subTodo.mainTodoId !== action.payload)
      saveState({ todos: state })
    },

    // Sub-Todo actions
    addSubTodo: (state, action) => {
      state.subTodos.push(action.payload)
      saveState({ todos: state })
    },
    updateSubTodo: (state, action) => {
      const { id, changes } = action.payload
      const index = state.subTodos.findIndex((subTodo) => subTodo.id === id)
      if (index !== -1) {
        state.subTodos[index] = { ...state.subTodos[index], ...changes }
      }
      saveState({ todos: state })
    },
    toggleSubTodo: (state, action) => {
      const subTodo = state.subTodos.find((subTodo) => subTodo.id === action.payload)
      if (subTodo) {
        subTodo.isCompleted = !subTodo.isCompleted
      }
      saveState({ todos: state })
    },
    deleteSubTodo: (state, action) => {
      state.subTodos = state.subTodos.filter((subTodo) => subTodo.id !== action.payload)
      saveState({ todos: state })
    },

    // Filter and search actions
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload
    },
    setFilter: (state, action) => {
      state.filter = action.payload
    },
  },
})

export const {
  setTodos,
  addTodo,
  updateTodo,
  toggleTodo,
  deleteTodo,
  addSubTodo,
  updateSubTodo,
  toggleSubTodo,
  deleteSubTodo,
  setSearchTerm,
  setFilter,
} = todoSlice.actions

export default todoSlice.reducer
