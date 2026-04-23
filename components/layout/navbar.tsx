import Link from "next/link";
import { auth, signOut } from "@/auth";

export default async function Navbar() {
  const session = await auth();

  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-xl font-bold text-green-800">
          WISITHURU PELA
        </Link>

        <nav className="flex items-center gap-4 text-sm">
          <Link href="/">Home</Link>
          <Link href="/shop">Shop</Link>
          <Link href="/admin">Admin</Link>

          {session?.user ? (
            <form
              action={async () => {
                "use server";
                await signOut({ redirectTo: "/login" });
              }}
            >
              <button
                type="submit"
                className="rounded-md bg-red-600 px-3 py-2 text-white"
              >
                Logout
              </button>
            </form>
          ) : (
            <>
              <Link href="/login">Login</Link>
              <Link
                href="/register"
                className="rounded-md bg-green-700 px-3 py-2 text-white"
              >
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}