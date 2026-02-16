/**
 * Prayer Queries
 * All SQL queries related to prayers
 * These use parameterized queries (?) to prevent SQL injection
 */
export const prayerQueries = {
  /**
   * Get all prayers for a specific user
   * Parameters: [userId]
   */
  readPrayers: `
    SELECT 
      id, category_id as categoryId, user_id as userId,
      title, description, is_answered as isAnswered,
      date_created as dateCreated, date_answered as dateAnswered, notes
    FROM prayer_notebook.prayers
    WHERE user_id = ?
  `,

  /**
   * Get a specific prayer by its ID
   * Parameters: [prayerId, userId]
   */
  readPrayerById: `
    SELECT 
      id, category_id as categoryId, user_id as userId,
      title, description, is_answered as isAnswered,
      date_created as dateCreated, date_answered as dateAnswered, notes
    FROM prayer_notebook.prayers
    WHERE id = ? AND user_id = ?
  `,

  /**
   * Get all prayers in a specific category
   * Parameters: [categoryId, userId]
   */
  readPrayersByCategory: `
    SELECT 
      id, category_id as categoryId, user_id as userId,
      title, description, is_answered as isAnswered,
      date_created as dateCreated, date_answered as dateAnswered, notes
    FROM prayer_notebook.prayers
    WHERE category_id = ? AND user_id = ?
  `,

  /**
   * Get all answered prayers for a user
   * Ordered by most recently answered first
   * Parameters: [userId]
   */
  readAnsweredPrayers: `
    SELECT 
      id, category_id as categoryId, user_id as userId,
      title, description, is_answered as isAnswered,
      date_created as dateCreated, date_answered as dateAnswered, notes
    FROM prayer_notebook.prayers
    WHERE user_id = ? AND is_answered = TRUE
    ORDER BY date_answered DESC
  `,

  /**
   * Create a new prayer
   * Parameters: [categoryId, userId, title, description, notes]
   */
  createPrayer: `
    INSERT INTO prayer_notebook.prayers
    (category_id, user_id, title, description, notes)
    VALUES (?, ?, ?, ?, ?)
  `,

  /**
   * Update an existing prayer
   * Parameters: [title, description, notes, categoryId, prayerId, userId]
   */
  updatePrayer: `
    UPDATE prayer_notebook.prayers
    SET title = ?, description = ?, notes = ?, category_id = ?
    WHERE id = ? AND user_id = ?
  `,

  /**
   * Mark a prayer as answered
   * Sets is_answered to true and records the date
   * Parameters: [notes, prayerId, userId]
   */
  markPrayerAnswered: `
    UPDATE prayer_notebook.prayers
    SET is_answered = TRUE, date_answered = NOW(), notes = ?
    WHERE id = ? AND user_id = ?
  `,

  /**
   * Delete a prayer
   * Parameters: [prayerId, userId]
   */
  deletePrayer: `
    DELETE FROM prayer_notebook.prayers
    WHERE id = ? AND user_id = ?
  `,

  /**
   * Search prayers by keyword
   * Searches in title, description, and notes
   * Parameters: [userId, keyword, keyword, keyword]
   * Note: keyword appears 3 times because we search 3 fields
   */
  searchPrayers: `
    SELECT 
      id, category_id as categoryId, user_id as userId,
      title, description, is_answered as isAnswered,
      date_created as dateCreated, date_answered as dateAnswered, notes
    FROM prayer_notebook.prayers
    WHERE user_id = ? AND (title LIKE ? OR description LIKE ? OR notes LIKE ?)
  `
};