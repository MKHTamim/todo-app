"use client"

import { configureStore } from "@reduxjs/toolkit"
import todoReducer from "./features/todoSlice"

export const store = configureStore({
  reducer: {
    todos: todoReducer,
  },
  // Disable Redux DevTools in production
  devTools: process.env.NODE_ENV !== "production",
})
