import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/user.model.js";
import Product from "./models/product.model.js";
import { redis } from "./lib/redis.js";

dotenv.config();

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@aura.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "Admin@123456";
const ADMIN_NAME = process.env.ADMIN_NAME || "Admin";

const seedProducts = [
  {
    name: "Fjallraven - Foldsack No. 1 Backpack",
    description:
      "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday items in the other zipped pockets.",
    price: 109.95,
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png",
    category: "bags",
    isFeatured: true,
  },
  {
    name: "Mens Casual Premium Slim Fit T-Shirts",
    description:
      "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, lightweight & soft fabric for breathable and comfortable wearing. A great fit for casual fashion wear.",
    price: 22.3,
    image: "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_t.png",
    category: "t-shirts",
    isFeatured: true,
  },
  {
    name: "Mens Cotton Jacket",
    description:
      "Great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, travelling or other outdoors.",
    price: 55.99,
    image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_t.png",
    category: "jackets",
    isFeatured: true,
  },
  {
    name: "Mens Casual Slim Fit",
    description:
      "The color could be slightly different between on the screen and in practice. Please note that body builds vary by person, therefore detailed size information should be reviewed.",
    price: 15.99,
    image: "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_t.png",
    category: "t-shirts",
    isFeatured: false,
  },
  {
    name: "BIYLACLESEN Women's 3-in-1 Snowboard Jacket Winter Coats",
    description:
      "3 in 1 detachable design provide more convenience, you can separate the coat and inner as needed, or wear it together. Suitable for different seasons and helps you adapt to different climates.",
    price: 56.99,
    image: "https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_t.png",
    category: "jackets",
    isFeatured: false,
  },
  {
    name: "Lock and Love Women's Removable Hooded Faux Leather Moto Biker Jacket",
    description:
      "100% polyurethane shell, faux leather material for style and comfort, 2 pockets of front, button detail on waist, detail stitching at sides. Hand wash only.",
    price: 29.95,
    image: "https://fakestoreapi.com/img/81XH0e8fefL._AC_UY879_t.png",
    category: "jackets",
    isFeatured: false,
  },
  {
    name: "Rain Jacket Women Windbreaker Striped Climbing Raincoats",
    description:
      "Lightweight perfect for trip or casual wear. Long sleeve with hooded, adjustable drawstring waist design. Button and zipper front closure raincoat, fully striped and lined.",
    price: 39.99,
    image: "https://fakestoreapi.com/img/71HblAHs5xL._AC_UY879_-2t.png",
    category: "jackets",
    isFeatured: true,
  },
  {
    name: "MBJ Women's Solid Short Sleeve Boat Neck V",
    description:
      "95% rayon, 5% spandex. Lightweight fabric with great stretch for comfort, ribbed on sleeves and neckline, double stitching on bottom hem.",
    price: 9.85,
    image: "https://fakestoreapi.com/img/71z3kpMAYsL._AC_UY879_t.png",
    category: "t-shirts",
    isFeatured: false,
  },
  {
    name: "Opna Women's Short Sleeve Moisture",
    description:
      "100% polyester, machine wash, lightweight, roomy and highly breathable with moisture wicking fabric which helps to keep moisture away. Soft lightweight fabric with comfortable V-neck collar.",
    price: 7.95,
    image: "https://fakestoreapi.com/img/51eg55uWmdL._AC_UX679_t.png",
    category: "t-shirts",
    isFeatured: false,
  },
  {
    name: "DANVOUY Womens T Shirt Casual Cotton Short",
    description:
      "95% cotton, 5% spandex. Casual, short sleeve, letter print, V-neck fashion tee. The fabric is soft and has some stretch. Occasion: casual/office/beach/school/home/street.",
    price: 12.99,
    image: "https://fakestoreapi.com/img/61pHAEJ4NML._AC_UX679_t.png",
    category: "t-shirts",
    isFeatured: true,
  },
];

const seedAdmin = async () => {
  const existing = await User.findOne({ email: ADMIN_EMAIL });

  if (existing) {
    existing.role = "admin";
    await existing.save();
    console.log(`Admin account updated: ${ADMIN_EMAIL}`);
  } else {
    await User.create({
      name: ADMIN_NAME,
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
      role: "admin",
    });
    console.log(`Admin account created: ${ADMIN_EMAIL}`);
  }
};

const seedProductsFn = async () => {
  let inserted = 0;

  for (const product of seedProducts) {
    const { name, ...data } = product;
    const existing = await Product.findOne({ name });

    if (existing) {
      await Product.findOneAndUpdate({ name }, { $set: data });
    } else {
      await Product.create(product);
      inserted++;
    }
  }

  console.log(`Seeded ${seedProducts.length} products (${inserted} new)`);
};

const refreshFeaturedCache = async () => {
  const featured = await Product.find({ isFeatured: true }).lean();
  await redis.set("featured_products", JSON.stringify(featured));
  console.log(`Cached ${featured.length} featured products`);
};

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");

    await seedAdmin();
    await seedProductsFn();
    await refreshFeaturedCache();

    console.log("Seeding complete");
  } catch (error) {
    console.error("Error during seeding:", error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    redis.quit();
  }
};

seed();
