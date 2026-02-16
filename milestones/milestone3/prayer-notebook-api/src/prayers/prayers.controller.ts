import { Request, Response } from 'express';
import * as PrayerDao from './prayers.dao';

/**
 * GET /api/prayers
 * Get all prayers for the authenticated user
 */
export const readPrayers = async (req: Request, res: Response) => {
  try {
    // Get userId from query parameters and convert to number
    const userId = parseInt(req.query.userId as string);

    // Validate that userId is a valid number
    if (isNaN(userId)) {
      return res.status(400).json({ error: 'Invalid userId parameter' });
    }

    // Call DAO to get all prayers for this user
    const prayers = await PrayerDao.readPrayers(userId);

    // Send prayers back to client with 200 OK status
    res.status(200).json(prayers);
  } catch (error) {
    // Log error and send 500 Internal Server Error
    console.error('[prayers.controller][readPrayers][Error]', error);
    res.status(500).json({ error: 'Failed to retrieve prayers' });
  }
};

/**
 * GET /api/prayers/:id
 * Get a specific prayer by ID
 */
export const readPrayerById = async (req: Request, res: Response) => {
  try {
    // Get prayerId from URL parameter and userId from query
    const prayerId = parseInt(req.params.id as string);
    const userId = parseInt(req.query.userId as string);

    // Validate both parameters
    if (isNaN(prayerId) || isNaN(userId)) {
      return res.status(400).json({ error: 'Invalid prayer ID or user ID' });
    }

    // Call DAO to get the specific prayer
    const prayers = await PrayerDao.readPrayerById(prayerId, userId);

    // Check if prayer was found
    if (prayers.length === 0) {
      return res.status(404).json({ error: 'Prayer not found' });
    }

    // Send the prayer (first item in array) with 200 OK
    res.status(200).json(prayers[0]);
  } catch (error) {
    console.error('[prayers.controller][readPrayerById][Error]', error);
    res.status(500).json({ error: 'Failed to retrieve prayer' });
  }
};

/**
 * GET /api/prayers/category/:categoryId
 * Get all prayers in a specific category
 */
export const readPrayersByCategory = async (req: Request, res: Response) => {
  try {
    // Get categoryId from URL and userId from query
    const categoryId = parseInt(req.params.categoryId as string);
    const userId = parseInt(req.query.userId as string);

    // Validate parameters
    if (isNaN(categoryId) || isNaN(userId)) {
      return res.status(400).json({ error: 'Invalid category ID or user ID' });
    }

    // Call DAO to get prayers in this category
    const prayers = await PrayerDao.readPrayersByCategory(categoryId, userId);

    // Send prayers with 200 OK (empty array if no prayers found)
    res.status(200).json(prayers);
  } catch (error) {
    console.error('[prayers.controller][readPrayersByCategory][Error]', error);
    res.status(500).json({ error: 'Failed to retrieve prayers by category' });
  }
};

/**
 * GET /api/prayers/answered
 * Get all answered prayers for a user
 */
export const readAnsweredPrayers = async (req: Request, res: Response) => {
  try {
    // Get userId from query
    const userId = parseInt(req.query.userId as string);

    // Validate userId
    if (isNaN(userId)) {
      return res.status(400).json({ error: 'Invalid userId parameter' });
    }

    // Call DAO to get answered prayers
    const prayers = await PrayerDao.readAnsweredPrayers(userId);

    // Send prayers with 200 OK
    res.status(200).json(prayers);
  } catch (error) {
    console.error('[prayers.controller][readAnsweredPrayers][Error]', error);
    res.status(500).json({ error: 'Failed to retrieve answered prayers' });
  }
};

/**
 * POST /api/prayers
 * Create a new prayer
 */
export const createPrayer = async (req: Request, res: Response) => {
  try {
    // Extract prayer data from request body
    const { categoryId, userId, title, description, notes } = req.body;

    // Validate required fields
    if (!categoryId || !userId || !title || !description) {
      return res.status(400).json({ 
        error: 'Missing required fields: categoryId, userId, title, description' 
      });
    }

    // Call DAO to create the prayer
    const result = await PrayerDao.createPrayer({
      categoryId,
      userId,
      title,
      description,
      notes
    });

    // Send success response with 201 Created status
    res.status(201).json({ 
      message: 'Prayer created successfully', 
      insertId: result.insertId 
    });
  } catch (error) {
    console.error('[prayers.controller][createPrayer][Error]', error);
    res.status(500).json({ error: 'Failed to create prayer' });
  }
};

/**
 * PUT /api/prayers/:id
 * Update an existing prayer
 */
export const updatePrayer = async (req: Request, res: Response) => {
  try {
    // Get prayer ID from URL
    const prayerId = parseInt(req.params.id as string);
    // Extract data from request body
    const { userId, title, description, notes, categoryId } = req.body;

    // Validate prayer ID
    if (isNaN(prayerId)) {
      return res.status(400).json({ error: 'Invalid prayer ID' });
    }

    // Validate required fields
    if (!userId || !title || !description || !categoryId) {
      return res.status(400).json({ 
        error: 'Missing required fields: userId, title, description, categoryId' 
      });
    }

    // Call DAO to update the prayer
    const result = await PrayerDao.updatePrayer({
      id: prayerId,
      userId,
      title,
      description,
      notes,
      categoryId
    });

    // Check if prayer was actually updated
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Prayer not found or not authorized' });
    }

    // Send success response
    res.status(200).json({ message: 'Prayer updated successfully' });
  } catch (error) {
    console.error('[prayers.controller][updatePrayer][Error]', error);
    res.status(500).json({ error: 'Failed to update prayer' });
  }
};

/**
 * PUT /api/prayers/:id/answer
 * Mark a prayer as answered
 */
export const markPrayerAnswered = async (req: Request, res: Response) => {
  try {
    // Get prayer ID from URL
    const prayerId = parseInt(req.params.id as string);
    // Extract userId and notes from request body
    const { userId, notes } = req.body;

    // Validate prayer ID and userId
    if (isNaN(prayerId) || !userId) {
      return res.status(400).json({ error: 'Invalid prayer ID or missing userId' });
    }

    // Call DAO to mark prayer as answered
    const result = await PrayerDao.markPrayerAnswered(prayerId, userId, notes);

    // Check if prayer was found and updated
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Prayer not found or not authorized' });
    }

    // Send success response
    res.status(200).json({ message: 'Prayer marked as answered successfully' });
  } catch (error) {
    console.error('[prayers.controller][markPrayerAnswered][Error]', error);
    res.status(500).json({ error: 'Failed to mark prayer as answered' });
  }
};

/**
 * DELETE /api/prayers/:id
 * Delete a prayer
 */
export const deletePrayer = async (req: Request, res: Response) => {
  try {
    // Get prayer ID from URL and userId from query
    const prayerId = parseInt(req.params.id as string);
    const userId = parseInt(req.query.userId as string);

    // Validate both parameters
    if (isNaN(prayerId) || isNaN(userId)) {
      return res.status(400).json({ error: 'Invalid prayer ID or user ID' });
    }

    // Call DAO to delete the prayer
    const result = await PrayerDao.deletePrayer(prayerId, userId);

    // Check if prayer was actually deleted
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Prayer not found or not authorized' });
    }

    // Send success response
    res.status(200).json({ message: 'Prayer deleted successfully' });
  } catch (error) {
    console.error('[prayers.controller][deletePrayer][Error]', error);
    res.status(500).json({ error: 'Failed to delete prayer' });
  }
};

/**
 * GET /api/prayers/search
 * Search prayers by keyword
 */
export const searchPrayers = async (req: Request, res: Response) => {
  try {
    // Get userId and search keyword from query
    const userId = parseInt(req.query.userId as string);
    const keyword = req.query.q as string;

    // Validate parameters
    if (isNaN(userId)) {
      return res.status(400).json({ error: 'Invalid userId parameter' });
    }

    if (!keyword) {
      return res.status(400).json({ error: 'Missing search keyword (q parameter)' });
    }

    // Call DAO to search prayers
    const prayers = await PrayerDao.searchPrayers(userId, keyword);

    // Send search results with 200 OK
    res.status(200).json(prayers);
  } catch (error) {
    console.error('[prayers.controller][searchPrayers][Error]', error);
    res.status(500).json({ error: 'Failed to search prayers' });
  }
};