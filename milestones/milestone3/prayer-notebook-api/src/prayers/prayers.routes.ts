import { Router } from 'express';
import * as PrayersController from './prayers.controller';

// Create a new router instance
const router = Router();

/**
 * Prayer Routes
 * All routes start with /api/prayers
 */

/**
 * GET /api/prayers
 * Get all prayers for a user
 * Query param: userId
 */
router
  .route('/prayers')
  .get(PrayersController.readPrayers);

/**
 * GET /api/prayers/answered
 * Get all answered prayers for a user
 * Query param: userId
 *  MUST come before /prayers/:id otherwise Express will think "answered" is an ID
 */
router
  .route('/prayers/answered')
  .get(PrayersController.readAnsweredPrayers);

/**
 * GET /api/prayers/search
 * Search prayers by keyword
 * Query params: userId, q (keyword). This route MUST come before /prayers/:id
 */
router
  .route('/prayers/search')
  .get(PrayersController.searchPrayers);

/**
 * GET /api/prayers/category/:categoryId
 * Get all prayers in a specific category
 * URL param: categoryId
 * Query param: userId
 */
router
  .route('/prayers/category/:categoryId')
  .get(PrayersController.readPrayersByCategory);

/**
 * GET /api/prayers/:id
 * Get a specific prayer by ID
 * URL param: id (prayer ID)
 * Query param: userId
 * 
 * PUT /api/prayers/:id
 * Update a specific prayer
 * URL param: id (prayer ID)
 * Body: { userId, title, description, notes, categoryId }
 * 
 * DELETE /api/prayers/:id
 * Delete a specific prayer
 * URL param: id (prayer ID)
 * Query param: userId
 */
router
  .route('/prayers/:id')
  .get(PrayersController.readPrayerById)
  .put(PrayersController.updatePrayer)
  .delete(PrayersController.deletePrayer);

/**
 * PUT /api/prayers/:id/answer
 * Mark a prayer as answered
 * URL param: id (prayer ID)
 * Body: { userId, notes }
 */
router
  .route('/prayers/:id/answer')
  .put(PrayersController.markPrayerAnswered);

/**
 * POST /api/prayers
 * Create a new prayer
 * Body: { categoryId, userId, title, description, notes }
 */
router
  .route('/prayers')
  .post(PrayersController.createPrayer);

// Export the router to be used in app.ts
export default router;