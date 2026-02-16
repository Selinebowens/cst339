import { Request, Response } from 'express';
import * as CategoryDao from './categories.dao';

/**
 * GET /api/categories
 * Get all categories for the authenticated user
 * 
 * Query Parameters:
 *   - userId (required): The ID of the user
 * 
 * Response: Array of Category objects
 */
export const readCategories = async (req: Request, res: Response) => {
  try {
    // Get userId from query parameters and convert to number
    const userId = parseInt(req.query.userId as string);

    // Validate that userId is a valid number
    if (isNaN(userId)) {
      return res.status(400).json({ error: 'Invalid userId parameter' });
    }

    // Call DAO to get all categories for this user
    const categories = await CategoryDao.readCategories(userId);

    // Send categories back to client with 200 OK status
    res.status(200).json(categories);
  } catch (error) {
    // Log error and send 500 Internal Server Error
    console.error('[categories.controller][readCategories][Error]', error);
    res.status(500).json({ error: 'Failed to retrieve categories' });
  }
};

/**
 * GET /api/categories/:id
 * Get a specific category by ID
 */
export const readCategoryById = async (req: Request, res: Response) => {
  try {
    // Get categoryId from URL parameter and userId from query
    const categoryId = parseInt(req.params.id as string);
    const userId = parseInt(req.query.userId as string);

    // Validate both parameters
    if (isNaN(categoryId) || isNaN(userId)) {
      return res.status(400).json({ error: 'Invalid category ID or user ID' });
    }

    // Call DAO to get the specific category
    const categories = await CategoryDao.readCategoryById(categoryId, userId);

    // Check if category was found
    if (categories.length === 0) {
      return res.status(404).json({ error: 'Category not found' });
    }

    // Send the category (first item in array) with 200 OK
    res.status(200).json(categories[0]);
  } catch (error) {
    console.error('[categories.controller][readCategoryById][Error]', error);
    res.status(500).json({ error: 'Failed to retrieve category' });
  }
};

/**
 * POST /api/categories
 * Create a new prayer category
 */
export const createCategory = async (req: Request, res: Response) => {
  try {
    // Extract category data from request body
    const { userId, name, color } = req.body;

    // Validate required fields
    if (!userId || !name) {
      return res.status(400).json({ 
        error: 'Missing required fields: userId, name' 
      });
    }

    // Call DAO to create the category
    // Use provided color or default to blue if not provided
    const result = await CategoryDao.createCategory({
      userId,
      name,
      color: color || '#3B82F6'  // Default blue color
    });

    // Send success response with 201 Created status
    res.status(201).json({ 
      message: 'Category created successfully', 
      insertId: result.insertId 
    });
  } catch (error) {
    console.error('[categories.controller][createCategory][Error]', error);
    res.status(500).json({ error: 'Failed to create category' });
  }
};

/**
 * PUT /api/categories/:id
 * Update an existing category
 */
export const updateCategory = async (req: Request, res: Response) => {
  try {
    // Get category ID from URL
    const categoryId = parseInt(req.params.id as string);
    // Extract data from request body
    const { userId, name, color } = req.body;

    // Validate category ID
    if (isNaN(categoryId)) {
      return res.status(400).json({ error: 'Invalid category ID' });
    }

    // Validate required fields
    if (!userId || !name || !color) {
      return res.status(400).json({ 
        error: 'Missing required fields: userId, name, color' 
      });
    }

    // Call DAO to update the category
    const result = await CategoryDao.updateCategory({
      id: categoryId,
      userId,
      name,
      color
    });

    // Check if category was actually updated
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Category not found or not authorized' });
    }

    // Send success response
    res.status(200).json({ message: 'Category updated successfully' });
  } catch (error) {
    console.error('[categories.controller][updateCategory][Error]', error);
    res.status(500).json({ error: 'Failed to update category' });
  }
};

/**
 * DELETE /api/categories/:id
 * Delete a category (and all prayers in it due to CASCADE)
 */
export const deleteCategory = async (req: Request, res: Response) => {
  try {
    // Get category ID from URL and userId from query
    const categoryId = parseInt(req.params.id as string);
    const userId = parseInt(req.query.userId as string);

    // Validate both parameters
    if (isNaN(categoryId) || isNaN(userId)) {
      return res.status(400).json({ error: 'Invalid category ID or user ID' });
    }

    // Call DAO to delete the category
    const result = await CategoryDao.deleteCategory(categoryId, userId);

    // Check if category was actually deleted
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Category not found or not authorized' });
    }

    // Send success response
    // Note: This also deletes all prayers in the category (CASCADE)
    res.status(200).json({ 
      message: 'Category deleted successfully (including all prayers in it)' 
    });
  } catch (error) {
    console.error('[categories.controller][deleteCategory][Error]', error);
    res.status(500).json({ error: 'Failed to delete category' });
  }
};