import { db } from "@/lib/db";
import ProductCard from "@/components/shop/product-card";

type ShopPageProps = {
  searchParams: Promise<{
    q?: string;
    category?: string;
  }>;
};

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const params = await searchParams;
  const q = params.q?.trim() ?? "";
  const category = params.category?.trim() ?? "";

  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  const products = await db.product.findMany({
    where: {
      isAvailable: true,
      ...(q
        ? {
            OR: [
              { name: { contains: q, mode: "insensitive" } },
              { nameSi: { contains: q, mode: "insensitive" } },
              { nameTa: { contains: q, mode: "insensitive" } },
            ],
          }
        : {}),
      ...(category
        ? {
            category: {
              slug: category,
            },
          }
        : {}),
    },
    include: {
      category: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Shop Plants</h1>
        <p className="mt-2 text-stone-600">
          Browse available indoor and outdoor plants.
        </p>
      </div>

      <form className="grid gap-4 rounded-xl border bg-white p-4 md:grid-cols-3">
        <input
          type="text"
          name="q"
          defaultValue={q}
          placeholder="Search plants..."
          className="rounded-md border px-3 py-2"
        />

        <select
          name="category"
          defaultValue={category}
          className="rounded-md border px-3 py-2"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.slug}>
              {cat.name}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="rounded-md bg-green-700 px-4 py-2 text-white"
        >
          Filter
        </button>
      </form>

      {products.length === 0 ? (
        <div className="rounded-xl border bg-white p-8 text-center text-stone-500">
          No products found.
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={{
                ...product,
                price: product.price.toString(),
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}