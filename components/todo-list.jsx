"use client"

import { useSelector } from "react-redux"
import TodoItem from "./todo-item"

export default function TodoList() {
  const { todos, searchTerm, filter } = useSelector((state) => state.todos)

  const filteredTodos = todos.filter((todo) => {
    // Apply search filter
    const matchesSearch = todo.title.toLowerCase().includes(searchTerm.toLowerCase())

    // Apply status filter
    const matchesFilter =
      filter === "all" || (filter === "active" && !todo.isCompleted) || (filter === "completed" && todo.isCompleted)

    return matchesSearch && matchesFilter
  })

  if (filteredTodos.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        {searchTerm ? "No todos match your search" : "No todos yet. Add one!"}
      </div>
    )
  }

  return (
    <ul className="space-y-4 mt-6">
      {filteredTodos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  )
}
