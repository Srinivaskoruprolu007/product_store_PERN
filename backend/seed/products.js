import dotenv from "dotenv";
import { sql } from "../config/db.js";

dotenv.config();

const sampleProducts = [
  {
    name: "Vintage Leather Wallet",
    price: 45.0,
    image: "https://placehold.co/600x400/8B4513/FFFFFF?text=Wallet",
  },
  {
    name: "Smart Watch Elite",
    price: 299.99,
    image: "https://placehold.co/600x400/3A6B35/FFFFFF?text=Smart+Watch",
  },
  {
    name: "Portable Bluetooth Speaker",
    price: 75.5,
    image: "https://placehold.co/600x400/1E90FF/FFFFFF?text=Speaker",
  },
  {
    name: "Ergonomic Office Chair",
    price: 350.0,
    image: "https://placehold.co/600x400/4CAF50/FFFFFF?text=Chair",
  },
  {
    name: "Organic Coffee Beans (500g)",
    price: 18.25,
    image: "https://placehold.co/600x400/964B00/FFFFFF?text=Coffee",
  },
  {
    name: "Noise-Cancelling Headphones",
    price: 199.0,
    image: "https://placehold.co/600x400/A020F0/FFFFFF?text=Headphones",
  },
  {
    name: "Stainless Steel Water Bottle",
    price: 22.0,
    image: "https://placehold.co/600x400/6A5ACD/FFFFFF?text=Bottle",
  },
  {
    name: "Artisanal Scented Candle",
    price: 15.75,
    image: "https://placehold.co/600x400/DDA0DD/FFFFFF?text=Candle",
  },
  {
    name: "Digital Drawing Tablet",
    price: 150.0,
    image: "https://placehold.co/600x400/FFD700/FFFFFF?text=Tablet",
  },
  {
    name: "Weighted Blanket (15lbs)",
    price: 89.99,
    image: "https://placehold.co/600x400/778899/FFFFFF?text=Blanket",
  },
];

async function seedPrducts() {
  try {
    console.log("Seeding products...");
    // Optional : Deleting existing products before seeding
    await sql`DELETE FROM products;`;
    console.log("Existed products deleted.");

    for (const product of sampleProducts) {
      await sql`INSERT INTO products(name, price, image) VALUES (${product.name}, ${product.price}, ${product.image});`;
    }

    console.log("Products seeded successfully.");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding products:", error);
    process.exit(1);
  }
}

seedPrducts();
