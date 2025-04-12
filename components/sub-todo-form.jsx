"use client"

import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { addSubTodo, updateSubTodo } from "@/lib/features/todoSlice"
import { v4 as uuidv4 } from "uuid"

export default function SubTodoForm({ subTodo, mainTodoId, onCancel }) {
  const isEditing = !!subTodo
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: isEditing
      ? {
          title: subTodo.title,
        }
      : {
          title: "",
        },
  })

  const onSubmit = (data) => {
    if (isEditing) {
      dispatch(
        updateSubTodo({
          id: subTodo.id,
          changes: {
            title: data.title,
          },
        }),
      )
      onCancel()
    } else {
      dispatch(
        addSubTodo({
          id: uuidv4(),
          mainTodoId,
          title: data.title,
          isCompleted: false,
        }),
      )
      reset()
      onCancel()
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-2 mb-4">
      <div className="flex items-start space-x-2">
        <div className="flex-1">
          <input
            type="text"
            className={`w-full px-3 py-2 text-sm border rounded-md ${errors.title ? "border-red-500" : "border-gray-300"}`}
            placeholder="Add a sub-task"
            {...register("title", { required: "Title is required" })}
          />
          {errors.title && <p className="mt-1 text-xs text-red-500">{errors.title.message}</p>}
        </div>
        <div className="flex space-x-1">
          <button type="submit" className="px-3 py-2 bg-primary text-white text-sm rounded-md hover:bg-primary/90">
            {isEditing ? "Update" : "Add"}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-3 py-2 border border-gray-300 text-sm rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  )
}
