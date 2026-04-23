"use client";

type ProductCardProps = {
  product: {
    id: string;
    name: string;
    slug: string;
    price: string | number;
    stock: number;
    imageUrl: string | null;
    category?: {
      name: string;
    } | null;
  };
};

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
      <div className="aspect-[4/3] bg-stone-100">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-stone-500">
            No image
          </div>
        )}
      </div>

      <div className="space-y-2 p-4">
        <p className="text-xs uppercase tracking-wide text-stone-500">
          {product.category?.name ?? "Uncategorized"}
        </p>

        <h3 className="text-lg font-semibold">{product.name}</h3>

        <p className="text-sm text-stone-600">Stock: {product.stock}</p>

        <p className="text-base font-bold text-green-800">
          Rs. {Number(product.price).toFixed(2)}
        </p>

        <button className="w-full rounded-md bg-green-700 px-4 py-2 text-white">
          View Product
        </button>
      </div>
    </div>
  );
}
