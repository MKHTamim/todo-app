"use client"

export const loadState = () => {
  try {
    if (typeof window === "undefined") return undefined

    const serializedState = localStorage.getItem("todoAppState")
    if (serializedState === null) {
      return undefined
    }
    return JSON.parse(serializedState)
  } catch (err) {
    console.error("Error loading state from localStorage:", err)
    return undefined
  }
}

export const saveState = (state) => {
  try {
    if (typeof window === "undefined") return

    const serializedState = JSON.stringify(state)
    localStorage.setItem("todoAppState", serializedState)
  } catch (err) {
    console.error("Error saving state to localStorage:", err)
  }
}
