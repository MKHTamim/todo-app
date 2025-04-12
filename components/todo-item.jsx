"use client"

import { useState } from "react"
import { useDispatch } from "react-redux"
import { Pencil, Trash, ChevronDown, ChevronUp, Plus } from "lucide-react"
import { toggleTodo, deleteTodo } from "@/lib/features/todoSlice"
import TodoForm from "./todo-form"
import SubTodoList from "./sub-todo-list"
import SubTodoForm from "./sub-todo-form"

export default function TodoItem({ todo }) {
  const [isEditing, setIsEditing] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [showAddSubTodo, setShowAddSubTodo] = useState(false)
  const dispatch = useDispatch()

  const handleToggle = () => {
    dispatch(toggleTodo(todo.id))
  }

  const handleDelete = () => {
    dispatch(deleteTodo(todo.id))
  }

  if (isEditing) {
    return <TodoForm todo={todo} onCancel={() => setIsEditing(false)} />
  }

  return (
    <li className="border rounded-lg p-4 bg-gray-50">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={todo.isCompleted}
            onChange={handleToggle}
            className="h-5 w-5 rounded border-gray-300"
          />
          <h3 className={`text-lg font-medium ${todo.isCompleted ? "line-through text-gray-400" : ""}`}>
            {todo.title}
          </h3>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 rounded hover:bg-gray-200"
            aria-label={isExpanded ? "Collapse" : "Expand"}
          >
            {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
          <button onClick={() => setIsEditing(true)} className="p-1 rounded hover:bg-gray-200" aria-label="Edit">
            <Pencil size={18} />
          </button>
          <button onClick={handleDelete} className="p-1 rounded hover:bg-gray-200 text-red-500" aria-label="Delete">
            <Trash size={18} />
          </button>
        </div>
      </div>

      {todo.description && (
        <p className={`mt-2 text-gray-600 ${todo.isCompleted ? "line-through text-gray-400" : ""}`}>
          {todo.description}
        </p>
      )}

      {isExpanded && (
        <div className="mt-4 pl-6 border-l-2 border-gray-200">
          <SubTodoList mainTodoId={todo.id} />

          {showAddSubTodo ? (
            <SubTodoForm mainTodoId={todo.id} onCancel={() => setShowAddSubTodo(false)} />
          ) : (
            <button
              onClick={() => setShowAddSubTodo(true)}
              className="flex items-center mt-2 text-sm text-gray-600 hover:text-gray-900"
            >
              <Plus size={16} className="mr-1" /> Add sub-task
            </button>
          )}
        </div>
      )}
    </li>
  )
}
