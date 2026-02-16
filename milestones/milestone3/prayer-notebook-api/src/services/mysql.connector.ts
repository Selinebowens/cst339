import { createPool, Pool } from 'mysql';

// Variable to store the connection pool
let pool: Pool | null = null;

/**
 * Initialize the MySQL connection pool
 * This creates a pool of database connections that can be reused
 * instead of creating a new connection for every request
 */
export const initializeMySqlConnector = () => {
  try {
    // Create the connection pool with settings from .env file
    pool = createPool({
      connectionLimit: parseInt(process.env.MY_SQL_DB_CONNECTION_LIMIT || "10"), // Max number of connections
      host: process.env.MY_SQL_DB_HOST,           // Database server address (127.0.0.1)
      user: process.env.MY_SQL_DB_USER,           // Database username (root)
      password: process.env.MY_SQL_DB_PASSWORD,   // Database password
      database: process.env.MY_SQL_DB_DATABASE,   // Database name (prayer_notebook)
      port: parseInt(process.env.MY_SQL_DB_PORT || "3306"), // MySQL port (3306)
    });

    console.log('MySQL Adapter Pool generated successfully');

    // Test the connection to make sure it works
    pool.getConnection((err, connection) => {
      if (err) {
        // If connection fails, log error and throw exception
        console.error('Error connecting to MySQL database:', err);
        throw new Error('Failed to connect to database');
      }
      // Connection successful
      console.log('MySQL database connection established');
      // Release the connection back to the pool
      connection.release();
    });
  } catch (error) {
    // If anything goes wrong during initialization, log and throw error
    console.error('Failed to initialize MySQL connector:', error);
    throw error;
  }
};

/**
 * Execute SQL queries against the database
 * @param query - The SQL query string with ? placeholders
 * @param params - The values to replace the ? placeholders
 * @returns Promise with query results
 * 
 * Example: execute<Prayer[]>('SELECT * FROM prayers WHERE id = ?', [5])
 */
export const execute = <T>(query: string, params: string[] | Object): Promise<T> => {
  try {
    // If pool hasn't been initialized yet, initialize it now
    if (!pool) {
      initializeMySqlConnector();
    }

    // Return a Promise that will resolve with the query results
    return new Promise<T>((resolve, reject) => {
      // Execute the query using the connection pool
      pool!.query(query, params, (error, results) => {
        if (error) {
          // If query fails, reject the promise with the error
          reject(error);
        } else {
          // If query succeeds, resolve the promise with the results
          resolve(results);
        }
      });
    });
  } catch (error) {
    // Log any errors that occur during query execution
    console.error('Query execution error:', error);
    return Promise.reject(error);
  }
};