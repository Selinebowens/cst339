import { execute } from '../services/mysql.connector';
import { Prayer } from './prayers.model';
import { prayerQueries } from './prayers.queries';
import { OkPacket } from 'mysql';

/**
 * Get all prayers for a specific user
 * @param userId - The ID of the user whose prayers to retrieve
 * @returns Promise containing array of Prayer objects
 */
export const readPrayers = async (userId: number) => {
  // Execute the SQL query with userId as parameter
  // Returns array of prayers
  return execute<Prayer[]>(prayerQueries.readPrayers, [userId]);
};

/**
 * Get a specific prayer by its ID
 * @param prayerId - The ID of the prayer to retrieve
 * @param userId - The ID of the user (for security - users can only see their own prayers)
 * @returns Promise containing array with one Prayer object (or empty if not found)
 */
export const readPrayerById = async (prayerId: number, userId: number) => {
  // Execute query with both prayerId and userId
  // Returns array because that's how MySQL returns single results
  return execute<Prayer[]>(prayerQueries.readPrayerById, [prayerId, userId]);
};

/**
 * Get all prayers in a specific category
 * @param categoryId - The ID of the category
 * @param userId - The ID of the user
 * @returns Promise containing array of Prayer objects in that category
 */
export const readPrayersByCategory = async (categoryId: number, userId: number) => {
  // Execute query to get all prayers with matching categoryId and userId
  return execute<Prayer[]>(prayerQueries.readPrayersByCategory, [categoryId, userId]);
};

/**
 * Get all answered prayers for a user
 * Results are ordered by date answered (most recent first)
 * @param userId - The ID of the user
 * @returns Promise containing array of answered Prayer objects
 */
export const readAnsweredPrayers = async (userId: number) => {
  // Execute query to get only prayers where is_answered = TRUE
  return execute<Prayer[]>(prayerQueries.readAnsweredPrayers, [userId]);
};

/**
 * Create a new prayer in the database
 * @param prayer - Object containing prayer data (categoryId, userId, title, description, notes)
 * @returns Promise containing OkPacket with insertId (the new prayer's ID)
 */
export const createPrayer = async (prayer: {
  categoryId: number;
  userId: number;
  title: string;
  description: string;
  notes?: string;
}) => {
  // Execute INSERT query
  // Parameters match the order in the SQL: categoryId, userId, title, description, notes
  return execute<OkPacket>(prayerQueries.createPrayer, [
    prayer.categoryId,
    prayer.userId,
    prayer.title,
    prayer.description,
    prayer.notes || null  // Use null if notes is undefined
  ]);
};

/**
 * Update an existing prayer
 * @param prayer - Object containing updated prayer data
 * @returns Promise containing OkPacket with affectedRows (should be 1 if successful)
 */
export const updatePrayer = async (prayer: {
  id: number;
  userId: number;
  title: string;
  description: string;
  notes?: string;
  categoryId: number;
}) => {
  // Execute UPDATE query
  // Parameters: title, description, notes, categoryId, prayerId, userId
  return execute<OkPacket>(prayerQueries.updatePrayer, [
    prayer.title,
    prayer.description,
    prayer.notes || null,
    prayer.categoryId,
    prayer.id,
    prayer.userId
  ]);
};

/**
 * Mark a prayer as answered
 * Sets is_answered to TRUE and records the current date/time
 * @param prayerId - The ID of the prayer to mark as answered
 * @param userId - The ID of the user (security check)
 * @param notes - Optional notes about how the prayer was answered
 * @returns Promise containing OkPacket with affectedRows
 */
export const markPrayerAnswered = async (prayerId: number, userId: number, notes?: string) => {
  // Execute UPDATE query to set is_answered = TRUE and date_answered = NOW()
  // Parameters: notes, prayerId, userId
  return execute<OkPacket>(prayerQueries.markPrayerAnswered, [
    notes || null,
    prayerId,
    userId
  ]);
};

/**
 * Delete a prayer from the database
 * @param prayerId - The ID of the prayer to delete
 * @param userId - The ID of the user (security check)
 * @returns Promise containing OkPacket with affectedRows (should be 1 if deleted)
 */
export const deletePrayer = async (prayerId: number, userId: number) => {
  // Execute DELETE query
  // Parameters: prayerId, userId
  return execute<OkPacket>(prayerQueries.deletePrayer, [prayerId, userId]);
};

/**
 * Search prayers by keyword
 * Searches in title, description, and notes fields
 * @param userId - The ID of the user
 * @param keyword - The search term
 * @returns Promise containing array of matching Prayer objects
 */
export const searchPrayers = async (userId: number, keyword: string) => {
  // Add % wildcards for LIKE search (matches anywhere in the text)
  const searchTerm = `%${keyword}%`;
  
  // Execute search query
  // Parameters: userId, searchTerm (3 times - one for each field: title, description, notes)
  return execute<Prayer[]>(prayerQueries.searchPrayers, [
    userId,
    searchTerm,
    searchTerm,
    searchTerm
  ]);
};