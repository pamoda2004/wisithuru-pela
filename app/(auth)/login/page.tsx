import { signIn } from "@/auth";

export default function LoginPage() {
  return (
    <div className="mx-auto max-w-md rounded-2xl border bg-white p-6 shadow-sm">
      <h1 className="mb-6 text-2xl font-bold">Login</h1>

      <form
        action={async (formData) => {
          "use server";
          await signIn("credentials", {
            email: formData.get("email"),
            password: formData.get("password"),
            redirectTo: "/",
          });
        }}
        className="space-y-4"
      >
        <div>
          <label className="mb-1 block text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            required
            className="w-full rounded-md border px-3 py-2"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Password</label>
          <input
            type="password"
            name="password"
            required
            className="w-full rounded-md border px-3 py-2"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-md bg-green-700 px-4 py-2 text-white"
        >
          Login
        </button>
      </form>

      <div className="mt-4 rounded-md bg-stone-100 p-3 text-sm text-stone-700">
        Demo admin login:
        <br />
        <strong>Email:</strong> admin@wisithurpela.lk
        <br />
        <strong>Password:</strong> admin123
      </div>
    </div>
  );
}