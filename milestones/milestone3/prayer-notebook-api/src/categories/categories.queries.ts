/**
 * Category Queries
 * All SQL queries related to prayer categories
 * These use parameterized queries (?) to prevent SQL injection
 */
export const categoryQueries = {
  /**
   * Get all categories for a specific user
   * Parameters: [userId]
   */
  readCategories: `
    SELECT 
      id, user_id as userId, name, color, created_at as createdAt
    FROM prayer_notebook.prayer_categories
    WHERE user_id = ?
  `,

  /**
   * Get a specific category by its ID
   * Parameters: [categoryId, userId]
   */
  readCategoryById: `
    SELECT 
      id, user_id as userId, name, color, created_at as createdAt
    FROM prayer_notebook.prayer_categories
    WHERE id = ? AND user_id = ?
  `,

  /**
   * Create a new prayer category
   * Parameters: [userId, name, color]
   */
  createCategory: `
    INSERT INTO prayer_notebook.prayer_categories
    (user_id, name, color)
    VALUES (?, ?, ?)
  `,

  /**
   * Update an existing category
   * Parameters: [name, color, categoryId, userId]
   */
  updateCategory: `
    UPDATE prayer_notebook.prayer_categories
    SET name = ?, color = ?
    WHERE id = ? AND user_id = ?
  `,

  /**
   * Delete a category
   * Note: This will also delete all prayers in the category (CASCADE)
   * Parameters: [categoryId, userId]
   */
  deleteCategory: `
    DELETE FROM prayer_notebook.prayer_categories
    WHERE id = ? AND user_id = ?
  `
};