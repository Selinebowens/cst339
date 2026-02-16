import { execute } from '../services/mysql.connector';
import { Category } from './categories.model';
import { categoryQueries } from './categories.queries';
import { OkPacket } from 'mysql';

/**
 * Get all categories for a specific user
 * @param userId - The ID of the user whose categories to retrieve
 * @returns Promise containing array of Category objects
 */
export const readCategories = async (userId: number) => {
  // Execute query to get all categories belonging to this user
  return execute<Category[]>(categoryQueries.readCategories, [userId]);
};

/**
 * Get a specific category by its ID
 * @param categoryId - The ID of the category to retrieve
 * @param userId - The ID of the user (security check)
 * @returns Promise containing array with one Category object (or empty if not found)
 */
export const readCategoryById = async (categoryId: number, userId: number) => {
  // Execute query with both categoryId and userId
  // Returns array because that's how MySQL returns results
  return execute<Category[]>(categoryQueries.readCategoryById, [categoryId, userId]);
};

/**
 * Create a new prayer category
 * @param category - Object containing category data (userId, name, color)
 * @returns Promise containing OkPacket with insertId (the new category's ID)
 */
export const createCategory = async (category: {
  userId: number;
  name: string;
  color: string;
}) => {
  // Execute INSERT query to create new category
  // Parameters: userId, name, color
  return execute<OkPacket>(categoryQueries.createCategory, [
    category.userId,
    category.name,
    category.color
  ]);
};

/**
 * Update an existing category
 * @param category - Object containing updated category data
 * @returns Promise containing OkPacket with affectedRows (should be 1 if successful)
 */
export const updateCategory = async (category: {
  id: number;
  userId: number;
  name: string;
  color: string;
}) => {
  // Execute UPDATE query
  // Parameters: name, color, categoryId, userId
  return execute<OkPacket>(categoryQueries.updateCategory, [
    category.name,
    category.color,
    category.id,
    category.userId
  ]);
};

/**
 * Delete a category from the database
 * WARNING: This will also delete all prayers in this category (CASCADE)
 * @param categoryId - The ID of the category to delete
 * @param userId - The ID of the user (security check)
 * @returns Promise containing OkPacket with affectedRows (should be 1 if deleted)
 */
export const deleteCategory = async (categoryId: number, userId: number) => {
  // Execute DELETE query
  // Parameters: categoryId, userId
  return execute<OkPacket>(categoryQueries.deleteCategory, [categoryId, userId]);
};