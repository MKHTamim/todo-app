export const metadata = {
  title: "Todo App Preview",
  description: "Preview of the nested todo application",
}

export default function PreviewLayout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 py-12">
      <div className="container mx-auto px-4">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Nested Todo App</h1>
          <p className="text-gray-600">A powerful task management solution</p>
        </header>
        {children}
        <footer className="mt-12 text-center text-sm text-gray-500">
          <p>Built with Next.js, Redux Toolkit, and React Hook Form</p>
          <p className="mt-1">Data is persisted to localStorage</p>
        </footer>
      </div>
    </div>
  )
}
