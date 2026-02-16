// Import Router from Express
import { Router } from 'express';
// Import all category controller functions
import * as CategoriesController from './categories.controller';

// Create a new router instance
const router = Router();

/**
 * Category Routes
 * All routes start with /api/categories
 */

/**
 * GET /api/categories
 * Get all categories for a user
 * Query param: userId
 * 
 * POST /api/categories
 * Create a new category
 * Body: { userId, name, color }
 */
router
  .route('/categories')
  .get(CategoriesController.readCategories)
  .post(CategoriesController.createCategory);

/**
 * GET /api/categories/:id
 * Get a specific category by ID
 * URL param: id (category ID)
 * Query param: userId
 * 
 * PUT /api/categories/:id
 * Update a specific category
 * URL param: id (category ID)
 * Body: { userId, name, color }
 * 
 * DELETE /api/categories/:id
 * Delete a specific category (and all prayers in it)
 * URL param: id (category ID)
 * Query param: userId
 */
router
  .route('/categories/:id')
  .get(CategoriesController.readCategoryById)
  .put(CategoriesController.updateCategory)
  .delete(CategoriesController.deleteCategory);

// Export the router to be used in app.ts
export default router;
