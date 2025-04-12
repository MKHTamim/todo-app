"use client"

import { useState } from "react"
import { useDispatch } from "react-redux"
import { Pencil, Trash } from "lucide-react"
import { toggleSubTodo, deleteSubTodo } from "@/lib/features/todoSlice"
import SubTodoForm from "./sub-todo-form"

export default function SubTodoItem({ subTodo }) {
  const [isEditing, setIsEditing] = useState(false)
  const dispatch = useDispatch()

  const handleToggle = () => {
    dispatch(toggleSubTodo(subTodo.id))
  }

  const handleDelete = () => {
    dispatch(deleteSubTodo(subTodo.id))
  }

  if (isEditing) {
    return <SubTodoForm subTodo={subTodo} mainTodoId={subTodo.mainTodoId} onCancel={() => setIsEditing(false)} />
  }

  return (
    <li className="flex items-center justify-between py-2">
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          checked={subTodo.isCompleted}
          onChange={handleToggle}
          className="h-4 w-4 rounded border-gray-300"
        />
        <span className={`${subTodo.isCompleted ? "line-through text-gray-400" : ""}`}>{subTodo.title}</span>
      </div>
      <div className="flex items-center space-x-1">
        <button onClick={() => setIsEditing(true)} className="p-1 rounded hover:bg-gray-200" aria-label="Edit">
          <Pencil size={16} />
        </button>
        <button onClick={handleDelete} className="p-1 rounded hover:bg-gray-200 text-red-500" aria-label="Delete">
          <Trash size={16} />
        </button>
      </div>
    </li>
  )
}
