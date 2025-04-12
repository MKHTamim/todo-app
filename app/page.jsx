"use client"

import Link from "next/link"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Provider } from "react-redux"
import { store } from "@/lib/store"
import TodoList from "@/components/todo-list"
import TodoForm from "@/components/todo-form"
import SearchFilter from "@/components/search-filter"
import { loadState } from "@/lib/localStorage"
import { setTodos } from "@/lib/features/todoSlice"

function TodoApp() {
  const dispatch = useDispatch()
  const { todos } = useSelector((state) => state.todos)

  useEffect(() => {
    const savedState = loadState()
    if (savedState && savedState.todos) {
      dispatch(setTodos(savedState.todos.todos))
    }
  }, [dispatch])

  return (
    <main className="container mx-auto p-4 max-w-3xl">
      <h1 className="text-3xl font-bold text-center mb-8">Nested Todo App</h1>
      <div className="bg-white rounded-lg shadow-lg p-6">
        <TodoForm />
        <SearchFilter />
        <TodoList todos={todos} />
      </div>
      <div className="mt-8 text-center">
        <Link
          href="/preview"
          className="inline-flex items-center justify-center px-4 py-2 bg-primary text-white rounded-md text-sm font-medium hover:bg-primary/90"
        >
          View Preview Version
        </Link>
      </div>
    </main>
  )
}

export default function Home() {
  return (
    <Provider store={store}>
      <TodoApp />
    </Provider>
  )
}
