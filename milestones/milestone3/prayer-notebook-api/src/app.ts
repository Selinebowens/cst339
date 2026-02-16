import dotenv from 'dotenv';
dotenv.config();

import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { initializeMySqlConnector } from './services/mysql.connector';
import prayersRouter from './prayers/prayers.routes';
import categoriesRouter from './categories/categories.routes';

// Create Express application
const app = express();

// Get port from environment variables (default to 5000)
const port = process.env.PORT || 5000;

// Initialize MySQL database connection
console.log('Initializing MySQL connection...');
initializeMySqlConnector();

/**
 * MIDDLEWARE SETUP
 * Middleware functions are executed in order for every request
 */

// 1. CORS - Allow requests from other domains (frontend will be on different port)
app.use(cors());
console.log('CORS middleware enabled');

// 2. JSON Parser - Parse JSON request bodies
app.use(express.json());
console.log('JSON body parser enabled');

// 3. URL-Encoded Parser - Parse form data
app.use(express.urlencoded({ extended: true }));
console.log('URL-encoded body parser enabled');

// 4. Helmet - Add security headers
app.use(helmet());
console.log('Helmet security middleware enabled');

/**
 * ROUTES
 */

/**
 * Root route - Welcome message
 * GET /
 */
app.get('/', (req: Request, res: Response) => {
  res.send('<h1>Welcome to Prayer Notebook API</h1><p>Use /api/prayers or /api/categories endpoints</p>');
});

/**
 * Health check route - Check if API is running
 * GET /health
 */
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ 
    status: 'OK', 
    message: 'Prayer Notebook API is running',
    timestamp: new Date().toISOString()
  });
});

/**
 * API Routes
 * All API routes are prefixed with /api
 */
app.use('/api', [prayersRouter, categoriesRouter]);

/**
 * 404 Handler - Catch all unmatched routes
 */
app.use((req: Request, res: Response) => {
  res.status(404).json({ 
    error: 'Route not found',
    path: req.path,
    method: req.method
  });
});

/**
 * Start the server
 */
app.listen(port, () => {
  console.log('========================================');
  console.log(`Prayer Notebook API`);
  console.log(`Server running at http://localhost:${port}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log('========================================');
  console.log('Available endpoints:');
  console.log('  GET  /');
  console.log('  GET  /health');
  console.log('  GET  /api/prayers');
  console.log('  GET  /api/prayers/:id');
  console.log('  GET  /api/prayers/category/:categoryId');
  console.log('  GET  /api/prayers/answered');
  console.log('  GET  /api/prayers/search');
  console.log('  POST /api/prayers');
  console.log('  PUT  /api/prayers/:id');
  console.log('  PUT  /api/prayers/:id/answer');
  console.log('  DELETE /api/prayers/:id');
  console.log('  GET  /api/categories');
  console.log('  GET  /api/categories/:id');
  console.log('  POST /api/categories');
  console.log('  PUT  /api/categories/:id');
  console.log('  DELETE /api/categories/:id');
  console.log('========================================');
});