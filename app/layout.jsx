export const metadata = {
  title: "Nested Todo App",
  description: "A complex nested todo application built with Next.js",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-100">{children}</body>
    </html>
  )
}
