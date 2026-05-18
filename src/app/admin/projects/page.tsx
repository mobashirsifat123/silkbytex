import prisma from "@/lib/prisma";
import Link from "next/link";
import { revalidatePath } from "next/cache";
import { fallbackWorkProjects } from "@/lib/work-projects";

type AdminProjectRow = {
  id: string;
  title: string;
  slug: string;
  category: string | null;
  projectStatus?: string | null;
  isDraft?: boolean;
  isFallback?: boolean;
};

export default async function AdminProjects() {
  let projects: AdminProjectRow[] = [];
  let databaseUnavailable = false;

  try {
    projects = await prisma.project.findMany({
      select: {
        id: true,
        title: true,
        slug: true,
        category: true,
        projectStatus: true,
        isDraft: true,
      },
      orderBy: { sortOrder: 'asc' }
    });
  } catch {
    databaseUnavailable = true;
    console.warn("Database connection issue.");
  }

  const existingSlugs = new Set(projects.map((project) => project.slug));
  const fallbackRows: AdminProjectRow[] = fallbackWorkProjects
    .filter((project) => !existingSlugs.has(project.slug))
    .map((project) => ({
      id: project.id,
      title: project.title,
      slug: project.slug,
      category: project.category,
      projectStatus: project.projectStatus,
      isDraft: project.isDraft,
      isFallback: true,
    }));
  const visibleProjects = [...projects, ...fallbackRows];

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

  async function seedDefaultProjects() {
    "use server";

    for (const project of fallbackWorkProjects) {
      await prisma.project.upsert({
        where: { slug: project.slug },
        update: {
          title: project.title,
          category: project.category,
          kicker: project.kicker,
          client: project.client,
          year: project.year,
          shortDescription: project.shortDescription,
          longDescription: project.longDescription,
          servicesUsed: project.servicesUsed,
          challenge: project.challenge,
          approach: project.approach,
          outcome: project.outcome,
          quoteText: project.quoteText,
          quoteAttribution: project.quoteAttribution,
          color: project.color,
          projectStatus: project.projectStatus,
          isFeatured: project.isFeatured,
          isDraft: project.isDraft,
          sortOrder: project.sortOrder,
        },
        create: {
          title: project.title,
          slug: project.slug,
          category: project.category,
          kicker: project.kicker,
          client: project.client,
          year: project.year,
          shortDescription: project.shortDescription,
          longDescription: project.longDescription,
          servicesUsed: project.servicesUsed,
          challenge: project.challenge,
          approach: project.approach,
          outcome: project.outcome,
          quoteText: project.quoteText,
          quoteAttribution: project.quoteAttribution,
          color: project.color,
          projectStatus: project.projectStatus,
          isFeatured: project.isFeatured,
          isDraft: project.isDraft,
          sortOrder: project.sortOrder,
        },
      });
    }

    revalidatePath("/admin/projects");
    revalidatePath("/");
    revalidatePath("/work");
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Projects</h1>
        <div className="flex items-center gap-3">
          <form action={seedDefaultProjects}>
            <button type="submit" className="bg-gray-900 text-white px-4 py-2 rounded hover:bg-black transition">
              Seed 8 Defaults
            </button>
          </form>
          <Link href="/admin/projects/new" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
            Add Project
          </Link>
        </div>
      </div>

      {(databaseUnavailable || fallbackRows.length > 0) && (
        <div className="mb-6 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
          {databaseUnavailable
            ? "Database is unreachable, so the editable CMS records cannot be loaded. The 8 current website projects are shown below as templates."
            : "Some current website projects are still fallback templates. Seed them or create editable copies to manage every detail from Supabase."}
        </div>
      )}

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200 text-sm">
              <th className="p-4 font-medium">Title</th>
              <th className="p-4 font-medium">Slug</th>
              <th className="p-4 font-medium">Category</th>
              <th className="p-4 font-medium">Status</th>
              <th className="p-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {visibleProjects.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-4 text-center text-gray-500">No projects found. Create one above!</td>
              </tr>
            ) : visibleProjects.map(project => (
              <tr key={project.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="p-4 font-medium">
                  {project.title}
                  {project.isFallback && (
                    <span className="ml-2 rounded-full bg-amber-100 px-2 py-1 text-xs font-medium text-amber-800">
                      Template
                    </span>
                  )}
                </td>
                <td className="p-4 text-gray-500">{project.slug}</td>
                <td className="p-4 text-gray-500">{project.category}</td>
                <td className="p-4 text-gray-500">
                  {project.isDraft ? "Draft" : project.projectStatus || "published"}
                </td>
                <td className="p-4 text-right space-x-2">
                  {project.isFallback ? (
                    <Link href={`/admin/projects/new?template=${project.slug}`} className="text-blue-600 hover:underline text-sm">
                      Create editable copy
                    </Link>
                  ) : (
                    <>
                      <Link href={`/admin/projects/${project.id}`} className="text-blue-600 hover:underline text-sm">Edit</Link>
                      <form action={deleteProject} className="inline-block">
                        <input type="hidden" name="id" value={project.id} />
                        <button type="submit" className="text-red-600 hover:underline text-sm">Delete</button>
                      </form>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
