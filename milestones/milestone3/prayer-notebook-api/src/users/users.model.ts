/**
 * User Interface
 * Defines the structure of a user object
 * This is the users table in the MySQL database
 */
export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  createdAt: string;
}