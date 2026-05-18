import Link from 'next/link';
import Image from 'next/image';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-900">
      <nav className="w-64 bg-gray-900 text-white flex flex-col hidden md:flex">
        <div className="flex items-center gap-3 p-4 text-lg font-bold border-b border-gray-800">
          <Image
            src="/brand/silkbytex-logo.jpeg"
            alt=""
            width={40}
            height={40}
            className="h-10 w-10 rounded-full object-cover"
          />
          <span>SilkByteX CMS</span>
        </div>
        <div className="flex-1 p-4 space-y-2">
          <Link href="/admin" className="block p-2 rounded hover:bg-gray-800">Dashboard</Link>
          <Link href="/admin/projects" className="block p-2 rounded hover:bg-gray-800">Work / Articles</Link>
          <Link href="/admin/services" className="block p-2 rounded hover:bg-gray-800">Services</Link>
          <Link href="/admin/stories" className="block p-2 rounded hover:bg-gray-800">Stories</Link>
          <Link href="/admin/homepage" className="block p-2 rounded hover:bg-gray-800">Homepage Content</Link>
        </div>
        <div className="p-4 border-t border-gray-800 text-sm">
          <a href="/" target="_blank" className="text-gray-400 hover:text-white block mb-2">View Live Site</a>
          <form action="/api/admin/logout" method="POST">
             <button type="submit" className="text-red-400 hover:text-red-300">Logout</button>
          </form>
        </div>
      </nav>
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
