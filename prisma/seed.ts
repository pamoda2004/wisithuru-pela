import "dotenv/config";
import { PrismaClient, CareLevel, Role } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import bcrypt from "bcrypt";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const hashedPassword = await bcrypt.hash("admin123", 10);

  await prisma.user.upsert({
    where: { email: "admin@wisithurpela.lk" },
    update: {},
    create: {
      name: "Admin User",
      email: "admin@wisithurpela.lk",
      passwordHash: hashedPassword,
      role: Role.ADMIN,
      locale: "en",
      isVerified: true,
    },
  });

  const indoor = await prisma.category.upsert({
    where: { slug: "indoor-plants" },
    update: {},
    create: {
      name: "Indoor Plants",
      nameSi: "ගෘහස්ථ පැළ",
      nameTa: "உள் தாவரங்கள்",
      slug: "indoor-plants",
    },
  });

  const outdoor = await prisma.category.upsert({
    where: { slug: "outdoor-plants" },
    update: {},
    create: {
      name: "Outdoor Plants",
      nameSi: "බාහිර පැළ",
      nameTa: "வெளி தாவரங்கள்",
      slug: "outdoor-plants",
    },
  });

  const products = [
    {
      name: "Areca Palm",
      nameSi: "අරේකා පාම්",
      nameTa: "அரேகா பனை",
      slug: "areca-palm",
      description: "A beautiful indoor palm ideal for home decoration.",
      price: "2500.00",
      bulkPrice: "2200.00",
      minBulkQty: 5,
      stock: 20,
      sku: "WP-PLANT-001",
      careLevel: CareLevel.EASY,
      sunlight: "Partial shade",
      watering: "Water 2-3 times per week",
      isIndoor: true,
      isOutdoor: false,
      isFeatured: true,
      isAvailable: true,
      weight: 1.2,
      potSize: "8 inch",
      seasonalNote: "Best growth in Yala season",
      imageUrl:
        "https://images.unsplash.com/photo-1545241047-6083a3684587?q=80&w=1200&auto=format&fit=crop",
      categoryId: indoor.id,
    },
    {
      name: "Snake Plant",
      nameSi: "නැගිටි පැළය",
      nameTa: "பாம்பு தாவரம்",
      slug: "snake-plant",
      description: "Low-maintenance plant suitable for beginners.",
      price: "1800.00",
      bulkPrice: "1500.00",
      minBulkQty: 5,
      stock: 35,
      sku: "WP-PLANT-002",
      careLevel: CareLevel.EASY,
      sunlight: "Indirect sunlight",
      watering: "Water once a week",
      isIndoor: true,
      isOutdoor: false,
      isFeatured: true,
      isAvailable: true,
      weight: 0.8,
      potSize: "6 inch",
      seasonalNote: "Available all year",
      imageUrl:
        "https://images.unsplash.com/photo-1593691509543-c55fb32e5b7c?q=80&w=1200&auto=format&fit=crop",
      categoryId: indoor.id,
    },
    {
      name: "Hibiscus",
      nameSi: "වඩම්ඹා",
      nameTa: "செம்பருத்தி",
      slug: "hibiscus",
      description: "Colorful flowering plant perfect for gardens.",
      price: "1200.00",
      bulkPrice: "1000.00",
      minBulkQty: 10,
      stock: 50,
      sku: "WP-PLANT-003",
      careLevel: CareLevel.MODERATE,
      sunlight: "Full sun",
      watering: "Daily light watering",
      isIndoor: false,
      isOutdoor: true,
      isFeatured: false,
      isAvailable: true,
      weight: 1.5,
      potSize: "10 inch",
      seasonalNote: "Best flowering March-May",
      imageUrl:
        "https://images.unsplash.com/photo-1468327768560-75b778cbb551?q=80&w=1200&auto=format&fit=crop",
      categoryId: outdoor.id,
    },
  ];

  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {},
      create: product,
    });
  }

  console.log("Seed completed");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });