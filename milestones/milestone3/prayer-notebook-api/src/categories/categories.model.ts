/**
 * Category Interface
 * Defines the structure of a prayer category object
 * This is prayer_categories table in the MySQL database
 */
export interface Category {
  id: number;
  userId: number;
  name: string;
  color: string;
  createdAt: string;
}