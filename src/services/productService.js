const Product = require("../models/Product");
const Category = require("../models/Category");
const { generateProductCode } = require("../utils/generateProductCode");


async function createProduct(data) {
  const { name, description, price, discount, image, status, category } = data;

  const existingCategory = await Category.findById(category);
  if (!existingCategory) throw new Error("Invalid category ID");

  const productCode = await generateProductCode(name);

  const newProduct = await Product.create({
    name,
    description,
    price,
    discount,
    image,
    status,
    category,
    productCode,
  });

  return newProduct;
}

async function getProducts(filter) {
  const query = {};

  if (filter.category) query.category = filter.category;
  if (filter.name) query.name = { $regex: filter.name, $options: "i" };

  const products = await Product.find(query).populate("category");

  return products.map((product) => {
    const finalPrice =
      product.price - (product.price * (product.discount || 0)) / 100;
    return { ...product.toObject(), finalPrice };
  });
}

async function getProductById(id) {
  const product = await Product.findById(id).populate("category");
  if (!product) throw new Error("Product not found");
  return product;
}

async function updateProduct(id, updates) {
  const allowedUpdates = ["status", "description", "discount"];
  const updateData = {};

  for (const key of allowedUpdates) {
    if (updates[key] !== undefined) updateData[key] = updates[key];
  }

  const updatedProduct = await Product.findByIdAndUpdate(id, updateData, {
    new: true,
  });

  if (!updatedProduct) throw new Error("Product not found");

  return updatedProduct;
}

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
};
