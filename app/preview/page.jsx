"use client"

import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { Provider } from "react-redux"
import { store } from "@/lib/store"
import TodoList from "@/components/todo-list"
import TodoForm from "@/components/todo-form"
import SearchFilter from "@/components/search-filter"
import { loadState } from "@/lib/localStorage"
import { setTodos, addTodo, addSubTodo } from "@/lib/features/todoSlice"

// Sample data for preview
const sampleTodos = [
  {
    id: "1",
    title: "Complete project documentation",
    description: "Write comprehensive documentation for the nested todo app",
    isCompleted: false,
  },
  {
    id: "2",
    title: "Fix UI bugs",
    description: "Address responsive design issues on mobile devices",
    isCompleted: true,
  },
  {
    id: "3",
    title: "Plan weekly meeting",
    description: "Prepare agenda and send invites to team members",
    isCompleted: false,
  },
]

const sampleSubTodos = [
  {
    id: "sub1",
    mainTodoId: "1",
    title: "Create architecture diagram",
    isCompleted: true,
  },
  {
    id: "sub2",
    mainTodoId: "1",
    title: "Write API documentation",
    isCompleted: false,
  },
  {
    id: "sub3",
    mainTodoId: "3",
    title: "Book conference room",
    isCompleted: true,
  },
  {
    id: "sub4",
    mainTodoId: "3",
    title: "Prepare presentation slides",
    isCompleted: false,
  },
]

function PreviewApp() {
  const dispatch = useDispatch()

  useEffect(() => {
    // First try to load from localStorage
    const savedState = loadState()

    if (savedState && savedState.todos && savedState.todos.todos.length > 0) {
      dispatch(setTodos(savedState.todos.todos))
    } else {
      // If no data in localStorage, load sample data
      sampleTodos.forEach((todo) => {
        dispatch(addTodo(todo))
      })

      sampleSubTodos.forEach((subTodo) => {
        dispatch(addSubTodo(subTodo))
      })
    }
  }, [dispatch])

  return (
    <main className="container mx-auto p-4 max-w-3xl">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <TodoForm />
        <SearchFilter />
        <TodoList />
      </div>
    </main>
  )
}

export default function PreviewPage() {
  return (
    <Provider store={store}>
      <PreviewApp />
    </Provider>
  )
}
