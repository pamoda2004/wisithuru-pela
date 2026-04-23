import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function AdminPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  if (session.user.role !== "ADMIN" && session.user.role !== "SUPER_ADMIN") {
    return (
      <div className="rounded-xl border bg-white p-8">
        <h1 className="text-2xl font-bold">Access Denied</h1>
        <p className="mt-2 text-stone-600">
          You do not have permission to access the admin panel.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border bg-white p-8">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <p className="mt-2 text-stone-600">
        Phase 1 admin access is working successfully.
      </p>
    </div>
  );
}