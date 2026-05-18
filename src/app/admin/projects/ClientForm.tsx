"use client";

export default function ClientForm({ children, action }: { children: React.ReactNode, action: (payload: FormData) => void }) {
  return (
    <form action={action} className="space-y-6 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      {children}
    </form>
  )
}
