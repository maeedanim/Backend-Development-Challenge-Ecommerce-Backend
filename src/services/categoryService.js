
const Category = require("../models/Category");

async function createCategory(data) {
  const { name, description } = data;

  const existingCategory = await Category.findOne({ name });
  if (existingCategory) throw new Error("Category already exists");

  const newCategory = await Category.create({ name, description });
  return newCategory;
}

async function getAllCategories() {
  const categories = await Category.find();
  return categories;
}

async function updateCategory(id, updates) {
  const allowedUpdates = ["name", "description"];
  const updateData = {};

  for (const key of allowedUpdates) {
    if (updates[key] !== undefined) updateData[key] = updates[key];
  }

  const updatedCategory = await Category.findByIdAndUpdate(id, updateData, {
    new: true,
  });

  if (!updatedCategory) throw new Error("Category not found");

  return updatedCategory;
}

async function deleteCategory(id) {
  const deletedCategory = await Category.findByIdAndDelete(id);
  if (!deletedCategory) throw new Error("Category not found");
  return deletedCategory;
}

module.exports = {
  createCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
};
