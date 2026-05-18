import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { encrypt } from "@/lib/auth";

export default function LoginPage() {
  async function login(formData: FormData) {
    "use server";
    const email = formData.get("email");
    const password = formData.get("password");

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
      const session = await encrypt({ email, expires });

      (await cookies()).set("admin_session", session, {
        expires,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      });
      redirect("/admin");
    } else {
      redirect("/admin/login?error=Invalid credentials");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <form action={login} className="bg-gray-800 p-8 rounded-lg shadow-xl w-96 max-w-[90%] space-y-4">
        <h1 className="text-2xl font-bold mb-6">SilkByteX Admin</h1>
        <div>
          <label className="block text-sm mb-1">Email</label>
          <input name="email" type="email" required className="w-full p-2 rounded bg-gray-700 border-gray-600 focus:outline-none focus:border-blue-500" />
        </div>
        <div>
          <label className="block text-sm mb-1">Password</label>
          <input name="password" type="password" required className="w-full p-2 rounded bg-gray-700 border-gray-600 focus:outline-none focus:border-blue-500" />
        </div>
        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 p-2 rounded font-medium transition-colors">Login</button>
      </form>
    </div>
  );
}
