# Milestone 3: Prayer Notebook Backend API

**Course:** CST-391 - JavaScript Web Application Development  
**Student:** Night O.  
**Date:** February 2026  
**Institution:** Grand Canyon University

---

## Table of Contents
1. [Project Overview](#project-overview)
2. [Design Updates](#design-updates)
3. [REST API Documentation](#rest-api-documentation)
4. [Database Schema](#database-schema)
5. [Testing Results](#testing-results)
6. [Known Issues](#known-issues)
7. [Installation & Setup](#installation--setup)

---

## Project Overview

This milestone implements the backend REST API for the Prayer Notebook application. The API provides complete CRUD (Create, Read, Update, Delete) functionality for managing prayer requests and categories, following REST conventions and using a MySQL database for data persistence.

### Technologies Used
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web framework for building the API
- **TypeScript** - Type-safe JavaScript
- **MySQL** - Relational database
- **Postman** - API testing

---

## Design Updates

### Changes from Milestone 2

| Change Description | Reason | Status |
|-------------------|--------|--------|
| Removed user authentication endpoints | Authentication will be implemented in Milestone 4 with frontend | Planned for later |
| Added `isAnswered` boolean field | Simplified answered prayer tracking | ✅ Completed |
| Used snake_case in database, camelCase in API | Following SQL naming conventions while maintaining JavaScript standards | ✅ Completed |
| All endpoints require userId as parameter | Temporary solution until authentication is implemented | ✅ Completed |
| Simplified color field to hex string | Easier frontend integration | ✅ Completed |

### Known Issues / TO DO

| Issue | Priority | Notes |
|-------|----------|-------|
| No authentication system | High | Users must pass userId manually - not secure for production |
| No input validation library | Medium | Currently using basic validation - should add Joi or similar |
| No rate limiting | Low | Should add express-rate-limit for production |
| No logging middleware | Low | Should add Winston or Morgan for better logging |

---

## REST API Documentation

### Base URL
```
http://localhost:5000/api
```

---

### Prayer Endpoints

#### 1. Get All Prayers
```
GET /api/prayers?userId={userId}
```
**Response:** Array of prayer objects

**Example Response:**
```json
[
  {
    "id": 1,
    "categoryId": 1,
    "userId": 1,
    "title": "Prayer for Mom",
    "description": "Please pray for my mom's upcoming surgery",
    "isAnswered": 0,
    "dateCreated": "2026-02-12T20:00:00.000Z",
    "dateAnswered": null,
    "notes": "Surgery scheduled for next week"
  }
]
```

---

#### 2. Get Prayer by ID
```
GET /api/prayers/{id}?userId={userId}
```
**Response:** Single prayer object or 404 if not found

---

#### 3. Get Prayers by Category
```
GET /api/prayers/category/{categoryId}?userId={userId}
```
**Response:** Array of prayers in that category

---

#### 4. Get Answered Prayers
```
GET /api/prayers/answered?userId={userId}
```
**Response:** Array of answered prayers, sorted by date answered (newest first)

---

#### 5. Search Prayers
```
GET /api/prayers/search?userId={userId}&q={keyword}
```
**Response:** Array of prayers matching the keyword in title, description, or notes

**Example:** `/api/prayers/search?userId=1&q=healing`

---

#### 6. Create Prayer
```
POST /api/prayers
Content-Type: application/json
```

**Request Body:**
```json
{
  "categoryId": 1,
  "userId": 1,
  "title": "Prayer for healing",
  "description": "Pray for complete healing",
  "notes": "Optional notes"
}
```

**Response:**
```json
{
  "message": "Prayer created successfully",
  "insertId": 4
}
```

---

#### 7. Update Prayer
```
PUT /api/prayers/{id}
Content-Type: application/json
```

**Request Body:**
```json
{
  "userId": 1,
  "title": "Updated title",
  "description": "Updated description",
  "notes": "Updated notes",
  "categoryId": 2
}
```

**Response:**
```json
{
  "message": "Prayer updated successfully"
}
```

---

#### 8. Mark Prayer as Answered
```
PUT /api/prayers/{id}/answer
Content-Type: application/json
```

**Request Body:**
```json
{
  "userId": 1,
  "notes": "God answered this prayer!"
}
```

**Response:**
```json
{
  "message": "Prayer marked as answered successfully"
}
```

---

#### 9. Delete Prayer
```
DELETE /api/prayers/{id}?userId={userId}
```

**Response:**
```json
{
  "message": "Prayer deleted successfully"
}
```

---

### Category Endpoints

#### 10. Get All Categories
```
GET /api/categories?userId={userId}
```
**Response:** Array of category objects

**Example Response:**
```json
[
  {
    "id": 1,
    "userId": 1,
    "name": "Family",
    "color": "#3B82F6",
    "createdAt": "2026-02-12T20:00:00.000Z"
  }
]
```

---

#### 11. Get Category by ID
```
GET /api/categories/{id}?userId={userId}
```
**Response:** Single category object or 404 if not found

---

#### 12. Create Category
```
POST /api/categories
Content-Type: application/json
```

**Request Body:**
```json
{
  "userId": 1,
  "name": "Church",
  "color": "#8B5CF6"
}
```

**Response:**
```json
{
  "message": "Category created successfully",
  "insertId": 4
}
```

---

#### 13. Update Category
```
PUT /api/categories/{id}
Content-Type: application/json
```

**Request Body:**
```json
{
  "userId": 1,
  "name": "Updated Category Name",
  "color": "#EF4444"
}
```

**Response:**
```json
{
  "message": "Category updated successfully"
}
```

---

#### 14. Delete Category
```
DELETE /api/categories/{id}?userId={userId}
```

**Response:**
```json
{
  "message": "Category deleted successfully (including all prayers in it)"
}
```

**Note:** Deleting a category also deletes all prayers in that category (CASCADE).

---

## Database Schema

### Tables

**users**
```sql
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

**prayer_categories**
```sql
CREATE TABLE prayer_categories (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  name VARCHAR(50) NOT NULL,
  color VARCHAR(20) DEFAULT '#3B82F6',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

**prayers**
```sql
CREATE TABLE prayers (
  id INT PRIMARY KEY AUTO_INCREMENT,
  category_id INT NOT NULL,
  user_id INT NOT NULL,
  title VARCHAR(200) NOT NULL,
  description TEXT NOT NULL,
  is_answered BOOLEAN DEFAULT FALSE,
  date_created DATETIME DEFAULT CURRENT_TIMESTAMP,
  date_answered DATETIME NULL,
  notes TEXT,
  FOREIGN KEY (category_id) REFERENCES prayer_categories(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

---

## Testing Results

All 14 API endpoints were tested successfully using Postman:

### CRUD Operations Verified
- ✅ **Create** - POST endpoints successfully create records
- ✅ **Read** - GET endpoints retrieve correct data
- ✅ **Update** - PUT endpoints modify records correctly
- ✅ **Delete** - DELETE endpoints remove records

### Test Cases Passed
1. ✅ Get all prayers
2. ✅ Get prayer by ID
3. ✅ Get prayers by category
4. ✅ Get answered prayers
5. ✅ Search prayers by keyword
6. ✅ Create new prayer
7. ✅ Update existing prayer
8. ✅ Mark prayer as answered
9. ✅ Delete prayer
10. ✅ Get all categories
11. ✅ Get category by ID
12. ✅ Create new category
13. ✅ Update category
14. ✅ Delete category

### Database Verification
All database operations were verified in MySQL Workbench:
- ✅ CREATE operations insert new records
- ✅ UPDATE operations modify existing records
- ✅ DELETE operations remove records
- ✅ Foreign key constraints work correctly
- ✅ CASCADE deletes function properly

---

## Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- MySQL (v8 or higher)
- npm

### Installation Steps

1. **Clone the repository**
```bash
git clone https://github.com/Selinebowens/cst339.git
cd cst391/milestones/milestone3/prayer-notebook-api
```

2. **Install dependencies**
```bash
npm install
```

3. **Create MySQL database**
```sql
CREATE DATABASE prayer_notebook;
-- Run the SQL scripts from database schema section
```

4. **Create .env file**
```
PORT=5000
MY_SQL_DB_HOST=127.0.0.1
MY_SQL_DB_USER=root
MY_SQL_DB_PASSWORD=your_password_here
MY_SQL_DB_PORT=3306
MY_SQL_DB_DATABASE=prayer_notebook
MY_SQL_DB_CONNECTION_LIMIT=10
NODE_ENV=development
```

5. **Start the server**
```bash
npm run start
```

6. **Test the API**
- Open browser: `http://localhost:5000`
- Use Postman to test endpoints

---

## Project Structure
```
prayer-notebook-api/
├── src/
│   ├── prayers/
│   │   ├── prayers.model.ts
│   │   ├── prayers.queries.ts
│   │   ├── prayers.dao.ts
│   │   ├── prayers.controller.ts
│   │   └── prayers.routes.ts
│   ├── categories/
│   │   ├── categories.model.ts
│   │   ├── categories.queries.ts
│   │   ├── categories.dao.ts
│   │   ├── categories.controller.ts
│   │   └── categories.routes.ts
│   ├── services/
│   │   └── mysql.connector.ts
│   └── app.ts
├── .env
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```
