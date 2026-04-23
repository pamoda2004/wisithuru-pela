import "./globals.css";
import type { Metadata } from "next";
import Navbar from "@/components/shop/layout/navbar";

export const metadata: Metadata = {
  title: "Wisithuru Pela",
  description: "Home Grown Plants Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-stone-50 text-stone-900">
        <Navbar />
        <main className="mx-auto max-w-7xl px-4 py-8">{children}</main>
      </body>
    </html>
  );
}
