import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";

export default async function AdminHomepage() {
  let content;
  try {
    content = await prisma.homepageContent.findFirst();
  } catch {
    console.warn("Database connection issue in admin.");
  }
  content = content || {
    heroEyebrow: "",
    heroHeadline: "",
    heroRotatingWords: "",
    heroSubheading: "",
    heroCtaText: "",
    heroCtaLink: "",
    heroVisualUrl: "",
    metaTitle: "",
    metaDescription: "",
  };

  async function saveHomepageContent(formData: FormData) {
    "use server";
    
    const data = {
      heroEyebrow: formData.get("heroEyebrow") as string,
      heroHeadline: formData.get("heroHeadline") as string,
      heroRotatingWords: formData.get("heroRotatingWords") as string,
      heroSubheading: formData.get("heroSubheading") as string,
      heroCtaText: formData.get("heroCtaText") as string,
      heroCtaLink: formData.get("heroCtaLink") as string,
      metaTitle: formData.get("metaTitle") as string,
      metaDescription: formData.get("metaDescription") as string,
    };

    const existing = await prisma.homepageContent.findFirst();
    
    if (existing) {
      await prisma.homepageContent.update({
        where: { id: existing.id },
        data,
      });
    } else {
      await prisma.homepageContent.create({ data });
    }

    revalidatePath("/");
    revalidatePath("/admin/homepage");
    redirect("/admin/homepage?success=true");
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Homepage Content</h1>
      </div>

      <form action={saveHomepageContent} className="space-y-6 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1">Hero Eyebrow (Small label)</label>
            <input name="heroEyebrow" defaultValue={content.heroEyebrow || "Creative Studio"} className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Hero Headline</label>
            <input name="heroHeadline" defaultValue={content.heroHeadline || "We craft digital"} className="w-full p-2 border rounded" />
          </div>
        </div>

        <div>
           <label className="block text-sm font-medium mb-1">Rotating Words (Comma separated)</label>
           <input name="heroRotatingWords" defaultValue={content.heroRotatingWords || "experiences, brands, futures"} className="w-full p-2 border rounded" />
        </div>

        <div>
           <label className="block text-sm font-medium mb-1">Subheading</label>
           <textarea name="heroSubheading" defaultValue={content.heroSubheading || "We partner with visionary companies to build digital products that matter."} className="w-full p-2 border rounded h-24" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1">CTA Text</label>
            <input name="heroCtaText" defaultValue={content.heroCtaText || "View our work"} className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">CTA Link</label>
            <input name="heroCtaLink" defaultValue={content.heroCtaLink || "/work"} className="w-full p-2 border rounded" />
          </div>
        </div>

        <div className="pt-6 border-t border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1">SEO Meta Title</label>
            <input name="metaTitle" defaultValue={content.metaTitle || "SilkByteX | Next-Gen Creative Studio"} className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">SEO Meta Description</label>
            <input name="metaDescription" defaultValue={content.metaDescription || "We are a digital product studio..."} className="w-full p-2 border rounded" />
          </div>
        </div>

        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">
          Save Changes
        </button>
      </form>
    </div>
  );
}
