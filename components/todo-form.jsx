"use client"

import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { addTodo, updateTodo } from "@/lib/features/todoSlice"
import { v4 as uuidv4 } from "uuid"

export default function TodoForm({ todo, onCancel }) {
  const isEditing = !!todo
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: isEditing
      ? {
          title: todo.title,
          description: todo.description,
        }
      : {
          title: "",
          description: "",
        },
  })

  const onSubmit = (data) => {
    if (isEditing) {
      dispatch(
        updateTodo({
          id: todo.id,
          changes: {
            title: data.title,
            description: data.description,
          },
        }),
      )
      onCancel()
    } else {
      dispatch(
        addTodo({
          id: uuidv4(),
          title: data.title,
          description: data.description,
          isCompleted: false,
        }),
      )
      reset()
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mb-6">
      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
          Title
        </label>
        <input
          id="title"
          type="text"
          className={`w-full px-3 py-2 border rounded-md ${errors.title ? "border-red-500" : "border-gray-300"}`}
          placeholder="What needs to be done?"
          {...register("title", { required: "Title is required" })}
        />
        {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Description (optional)
        </label>
        <textarea
          id="description"
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          rows="3"
          placeholder="Add details..."
          {...register("description")}
        />
      </div>

      <div className="flex justify-end space-x-2">
        {isEditing && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="px-4 py-2 bg-primary text-white rounded-md text-sm font-medium hover:bg-primary/90"
        >
          {isEditing ? "Update" : "Add"} Todo
        </button>
      </div>
    </form>
  )
}
