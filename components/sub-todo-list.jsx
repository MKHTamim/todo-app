"use client"

import { useSelector } from "react-redux"
import SubTodoItem from "./sub-todo-item"

export default function SubTodoList({ mainTodoId }) {
  const { subTodos } = useSelector((state) => state.todos)

  const filteredSubTodos = subTodos.filter((subTodo) => subTodo.mainTodoId === mainTodoId)

  if (filteredSubTodos.length === 0) {
    return <div className="text-sm text-gray-500 py-2">No sub-tasks yet</div>
  }

  return (
    <ul className="space-y-2">
      {filteredSubTodos.map((subTodo) => (
        <SubTodoItem key={subTodo.id} subTodo={subTodo} />
      ))}
    </ul>
  )
}
