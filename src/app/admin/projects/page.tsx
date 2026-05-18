import prisma from "@/lib/prisma";
import Link from "next/link";
import { revalidatePath } from "next/cache";

export default async function AdminProjects() {
  let projects: Array<{ id: string; title: string; slug: string; category: string | null }> = [];
  try {
    projects = await prisma.project.findMany({
    orderBy: { sortOrder: 'asc' }
  });
  } catch {
    console.warn("Database connection issue.");
  }

  async function deleteProject(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    if (id) {
      await prisma.project.delete({ where: { id } });
      revalidatePath("/admin/projects");
      revalidatePath("/");
      revalidatePath("/work");
    }
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Projects</h1>
        <Link href="/admin/projects/new" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
          Add Project
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200 text-sm">
              <th className="p-4 font-medium">Title</th>
              <th className="p-4 font-medium">Slug</th>
              <th className="p-4 font-medium">Category</th>
              <th className="p-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-4 text-center text-gray-500">No projects found. Create one above!</td>
              </tr>
            ) : projects.map(project => (
              <tr key={project.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="p-4 font-medium">{project.title}</td>
                <td className="p-4 text-gray-500">{project.slug}</td>
                <td className="p-4 text-gray-500">{project.category}</td>
                <td className="p-4 text-right space-x-2">
                  <Link href={`/admin/projects/${project.id}`} className="text-blue-600 hover:underline text-sm">Edit</Link>
                  <form action={deleteProject} className="inline-block" onSubmit={(e) => {
                    if (!confirm("Are you sure you want to delete this project?")) e.preventDefault();
                  }}>
                    <input type="hidden" name="id" value={project.id} />
                    <button type="submit" className="text-red-600 hover:underline text-sm">Delete</button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
