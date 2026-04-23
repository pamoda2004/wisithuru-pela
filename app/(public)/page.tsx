import { db } from "@/lib/db";
import { ProductCard } from "@/components/shop";
import Link from "next/link";

export default async function HomePage() {
  const featuredProducts = await db.product.findMany({
    where: {
      isFeatured: true,
      isAvailable: true,
    },
    include: {
      category: true,
    },
    take: 3,
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="space-y-12">
      <section className="rounded-2xl bg-green-900 px-6 py-12 text-white">
        <p className="mb-2 text-sm uppercase tracking-[0.2em] text-green-200">
          Home Grown Plants Platform
        </p>
        <h1 className="mb-4 text-4xl font-bold">Welcome to Wisithuru Pela</h1>
        <p className="max-w-2xl text-green-100">
          Sri Lankan home-grown plants for indoor and outdoor living.
        </p>
        <div className="mt-6">
          <Link
            href="/shop"
            className="rounded-md bg-white px-5 py-3 font-medium text-green-900"
          >
            Explore Plants
          </Link>
        </div>
      </section>

      <section>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Featured Plants</h2>
          <Link href="/shop" className="text-sm text-green-700 underline">
            View all
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={{
                id: product.id,
                name: product.name,
                slug: product.slug,
                price: product.price.toString(),
                stock: product.stock,
                imageUrl: product.imageUrl,
                category: product.category,
              }}
            />
          ))}
        </div>
      </section>
    </div>
  );
}