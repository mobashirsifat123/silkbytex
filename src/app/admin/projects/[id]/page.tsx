import { revalidatePath } from "next/cache";
import { redirect, notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function EditProject({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = await prisma.project.findUnique({
    where: { id }
  });

  if (!project) {
    notFound();
  }

  async function updateProject(formData: FormData) {
    "use server";
    
    await prisma.project.update({
      where: { id },
      data: {
        title: formData.get("title") as string,
        slug: formData.get("slug") as string,
        category: formData.get("category") as string,
        kicker: formData.get("kicker") as string,
        client: formData.get("client") as string,
        year: formData.get("year") as string,
        shortDescription: formData.get("shortDescription") as string,
        longDescription: formData.get("longDescription") as string,
        servicesUsed: formData.get("servicesUsed") as string,
        challenge: formData.get("challenge") as string,
        approach: formData.get("approach") as string,
        outcome: formData.get("outcome") as string,
        quoteText: formData.get("quoteText") as string,
        quoteAttribution: formData.get("quoteAttribution") as string,
        color: formData.get("color") as string,
        isFeatured: formData.get("isFeatured") === "on",
        sortOrder: parseInt((formData.get("sortOrder") as string) || "0"),
      }
    });

    revalidatePath("/admin/projects");
    revalidatePath("/");
    revalidatePath("/work");
    revalidatePath(`/work/${project?.slug}`);
    redirect("/admin/projects");
  }

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/admin/projects" className="text-gray-500 hover:text-black">&larr; Back</Link>
        <h1 className="text-3xl font-bold">Edit Project (Work)</h1>
      </div>

      <form action={updateProject} className="space-y-6 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        
        <h2 className="text-xl font-semibold border-b pb-2">Basic Info</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1">Title *</label>
            <input name="title" defaultValue={project.title} required className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Slug *</label>
            <input name="slug" defaultValue={project.slug} required className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <input name="category" defaultValue={project.category || ""} className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Kicker</label>
            <input name="kicker" defaultValue={project.kicker || ""} className="w-full p-2 border rounded" />
          </div>
        </div>

        <h2 className="text-xl font-semibold border-b pb-2 mt-8">Metadata</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1">Client</label>
            <input name="client" defaultValue={project.client || ""} className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Year</label>
            <input name="year" defaultValue={project.year || ""} className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Hero Color (Hex)</label>
            <input name="color" defaultValue={project.color || "#000000"} className="w-full p-2 border rounded" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Services Used (comma separated)</label>
          <input name="servicesUsed" defaultValue={project.servicesUsed || ""} className="w-full p-2 border rounded" />
        </div>

        <h2 className="text-xl font-semibold border-b pb-2 mt-8">Content</h2>
        <div>
           <label className="block text-sm font-medium mb-1">Short Description (Card Summary)</label>
           <textarea name="shortDescription" defaultValue={project.shortDescription || ""} className="w-full p-2 border rounded h-20" />
        </div>
        <div>
           <label className="block text-sm font-medium mb-1">Long Description (Intro Paragraph)</label>
           <textarea name="longDescription" defaultValue={project.longDescription || ""} className="w-full p-2 border rounded h-24" />
        </div>

        <h2 className="text-xl font-semibold border-b pb-2 mt-8">Case Study Sections</h2>
        <div>
           <label className="block text-sm font-medium mb-1">The Challenge</label>
           <textarea name="challenge" defaultValue={project.challenge || ""} className="w-full p-2 border rounded h-24" />
        </div>
        <div>
           <label className="block text-sm font-medium mb-1">The Approach</label>
           <textarea name="approach" defaultValue={project.approach || ""} className="w-full p-2 border rounded h-24" />
        </div>
        <div>
           <label className="block text-sm font-medium mb-1">The Outcome</label>
           <textarea name="outcome" defaultValue={project.outcome || ""} className="w-full p-2 border rounded h-24" />
        </div>

        <h2 className="text-xl font-semibold border-b pb-2 mt-8">Quote</h2>
        <div className="grid grid-cols-1 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1">Quote Text</label>
            <textarea name="quoteText" defaultValue={project.quoteText || ""} className="w-full p-2 border rounded h-20" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Quote Attribution</label>
            <input name="quoteAttribution" defaultValue={project.quoteAttribution || ""} className="w-full p-2 border rounded" />
          </div>
        </div>

        <h2 className="text-xl font-semibold border-b pb-2 mt-8">Visibility</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="flex items-center gap-2">
            <input type="checkbox" name="isFeatured" id="isFeatured" defaultChecked={project.isFeatured} className="w-4 h-4" />
            <label htmlFor="isFeatured" className="text-sm font-medium">Feature on Homepage</label>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Sort Order (lower is first)</label>
            <input name="sortOrder" type="number" defaultValue={project.sortOrder} className="w-full p-2 border rounded" />
          </div>
        </div>

        <div className="pt-4 flex justify-between items-center">
          <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
