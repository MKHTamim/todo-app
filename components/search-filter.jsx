"use client"

import { useDispatch, useSelector } from "react-redux"
import { setSearchTerm, setFilter } from "@/lib/features/todoSlice"
import { Search } from "lucide-react"

export default function SearchFilter() {
  const dispatch = useDispatch()
  const { searchTerm, filter } = useSelector((state) => state.todos)

  const handleSearchChange = (e) => {
    dispatch(setSearchTerm(e.target.value))
  }

  const handleFilterChange = (newFilter) => {
    dispatch(setFilter(newFilter))
  }

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b">
      <div className="relative flex-1">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search size={18} className="text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search todos..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
      </div>

      <div className="flex space-x-1">
        <button
          onClick={() => handleFilterChange("all")}
          className={`px-3 py-1.5 text-sm rounded-md ${
            filter === "all" ? "bg-primary text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          All
        </button>
        <button
          onClick={() => handleFilterChange("active")}
          className={`px-3 py-1.5 text-sm rounded-md ${
            filter === "active" ? "bg-primary text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Active
        </button>
        <button
          onClick={() => handleFilterChange("completed")}
          className={`px-3 py-1.5 text-sm rounded-md ${
            filter === "completed" ? "bg-primary text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Completed
        </button>
      </div>
    </div>
  )
}
