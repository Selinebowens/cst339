# CST-391: Milestone 1
## JavaScript Web Application Development

**Application Name:** Prayer Notebook  
**Author:** Seline Bowens
**Date:** 2/3/2026  

---

## Prayer Notebook Application

Prayer Notebook is a web-based application designed to help Christians organize and track their prayer life. The application allows users to create, categorize, and manage prayer requests, making it easier to maintain a consistent and organized prayer routine. The application addresses the common challenge many believers face in keeping track of prayer requests from family, friends, church, and personal needs. By providing a digital notebook specifically for prayers, users can organize requests by category, add detailed notes, and mark prayers as answered to see God's faithfulness over time.
This project will demonstrate web development skills by implementing a RESTful API using Node.js and Express, a MySQL database for data persistence, and responsive front-end applications using both React and Angular frameworks.


---

## Functionality Requirements

### User Stories

1.	Users to be able to create a new prayer request, so that they can remember to pray for specific needs.

2.	Users to be able to organize their prayers into categories such as Family, Friends, Church, Health, and Work, so that they can keep their prayer life organized.

3.	Users to be able to view all their prayer requests in a list, so that they can see what they need to pray for.

4.	Users can view prayers within a specific category, so that they can focus on one area of prayer at a time.

5.	Users can edit an existing prayer request, so that they can add updates or corrections.

6.	Users can mark a prayer as answered, so that they can track God's faithfulness and see answered prayers.

7.	Users can add notes or updates to a prayer request, so that they can document how the situation is progressing.

8.	Users can delete a prayer request, so that they can remove prayers that are no longer relevant.

9.	Users can view all answered prayers, so that they can be encouraged by seeing how God has worked.

10.	Users can search for specific prayers by keyword, so that they can quickly find a particular request.

---

## Initial Database Design

### Entity Relationship Diagram

```mermaid
erDiagram
    users ||--o{ prayer_categories : "has many"
    users ||--o{ prayers : "has many"
    prayer_categories ||--o{ prayers : "contains"

    users {
        int id PK
        varchar name
        varchar email
        varchar password
        datetime created_at
    }

    prayer_categories {
        int id PK
        int user_id FK
        varchar name
        varchar color
        datetime created_at
    }

    prayers {
        int id PK
        int category_id FK
        int user_id FK
        varchar title
        text description
        boolean is_answered
        datetime date_created
        datetime date_answered
        text notes
    }
```

### Database Tables

**users**
- `id` (INT, Primary Key, Auto-increment)
- `name` (VARCHAR(100))
- `email` (VARCHAR(100), UNIQUE)
- `password` (VARCHAR(255))
- `created_at` (DATETIME)

**prayer_categories**
- `id` (INT, Primary Key, Auto-increment)
- `user_id` (INT, Foreign Key → users.id)
- `name` (VARCHAR(50))
- `color` (VARCHAR(20))
- `created_at` (DATETIME)

**prayers**
- `id` (INT, Primary Key, Auto-increment)
- `category_id` (INT, Foreign Key → prayer_categories.id)
- `user_id` (INT, Foreign Key → users.id)
- `title` (VARCHAR(200))
- `description` (TEXT)
- `is_answered` (BOOLEAN)
- `date_created` (DATETIME)
- `date_answered` (DATETIME, nullable)
- `notes` (TEXT)

---

## Initial UI Sitemap

### Application Navigation Flow

```mermaid
graph TD
    A[Login/Register Page] --> B[Dashboard/Home]
    B --> C[All Prayers View]
    B --> D[Categories Management]
    B --> E[Answered Prayers]
    B --> F[Search Prayers]
    
    C --> G[Create New Prayer]
    C --> H[View Prayer Details]
    H --> I[Edit Prayer]
    H --> J[Mark as Answered]
    H --> K[Add Notes]
    H --> L[Delete Prayer]
    
    D --> M[Create New Category]
    D --> N[View Category Prayers]
    D --> O[Edit Category]
    D --> P[Delete Category]
    
    E --> Q[Filter by Date Range]
    E --> R[View Answered Prayer Details]
    
    F --> S[Search Results]
    S --> H
```

---

## UI Wireframes

### 1. Login Page
User authentication page with email and password fields.

![Login Page Wireframe](./wireframes/1-login-page.png)

---

### 2. Dashboard/Home Page
Main landing page after login with statistics and recent prayers overview.

![Dashboard Wireframe](./wireframes/2-dashboard.png)

---

### 3. All Prayers List Page
Complete list of active prayer requests with filtering and sorting options.

![All Prayers List Wireframe](./wireframes/3-all-prayers-list.png)

---

### 4. Create/Edit Prayer Form
Form for adding new prayers or editing existing ones.

![Create/Edit Prayer Form Wireframe](./wireframes/4-create-edit-prayer.png)

---

### 5. Categories Management Page
View and manage prayer categories.

![Categories Management Wireframe](./wireframes/5-categories-management.png)

---

### 6. Answered Prayers Page
Historical view of answered prayers with date filtering.

![Answered Prayers Wireframe](./wireframes/6-answered-prayers.png)

---

### 7. Prayer Details View
Detailed view of a single prayer with all information and actions.

![Prayer Details Wireframe](./wireframes/7-prayer-details.png)

---

### 8. Search Results Page
Display search results based on keyword queries.

![Search Results Wireframe](./wireframes/8-search-results.png)

---

## UML Classes

### UML Class Diagram

```mermaid
classDiagram
    class User {
        -int id
        -string name
        -string email
        -string password
        -datetime createdAt
        +register() User
        +login() Token
        +getProfile() User
    }

    class PrayerCategory {
        -int id
        -int userId
        -string name
        -string color
        -datetime createdAt
        +create() PrayerCategory
        +update() PrayerCategory
        +delete() boolean
        +getPrayers() Prayer[]
    }

    class Prayer {
        -int id
        -int categoryId
        -int userId
        -string title
        -string description
        -boolean isAnswered
        -datetime dateCreated
        -datetime dateAnswered
        -string notes
        +create() Prayer
        +update() Prayer
        +delete() boolean
        +markAnswered() Prayer
        +addNote() Prayer
    }

    class AuthController {
        +register(req, res) void
        +login(req, res) void
        +getProfile(req, res) void
    }

    class CategoryController {
        +readCategories(req, res) void
        +readCategoryById(req, res) void
        +createCategory(req, res) void
        +updateCategory(req, res) void
        +deleteCategory(req, res) void
    }

    class PrayerController {
        +readPrayers(req, res) void
        +readPrayerById(req, res) void
        +readPrayersByCategory(req, res) void
        +readAnsweredPrayers(req, res) void
        +createPrayer(req, res) void
        +updatePrayer(req, res) void
        +markPrayerAnswered(req, res) void
        +deletePrayer(req, res) void
        +searchPrayers(req, res) void
    }

    class AuthDAO {
        +createUser(user) User
        +findUserByEmail(email) User
        +validatePassword(password, hash) boolean
    }

    class CategoryDAO {
        +readCategories(userId) PrayerCategory[]
        +readCategoryById(id) PrayerCategory
        +createCategory(category) PrayerCategory
        +updateCategory(category) PrayerCategory
        +deleteCategory(id) boolean
    }

    class PrayerDAO {
        +readPrayers(userId) Prayer[]
        +readPrayerById(id) Prayer
        +readPrayersByCategory(categoryId) Prayer[]
        +readAnsweredPrayers(userId) Prayer[]
        +createPrayer(prayer) Prayer
        +updatePrayer(prayer) Prayer
        +markAnswered(id) Prayer
        +deletePrayer(id) boolean
        +searchPrayers(userId, keyword) Prayer[]
    }

    User "1" --> "*" PrayerCategory : owns
    User "1" --> "*" Prayer : creates
    PrayerCategory "1" --> "*" Prayer : contains
    
    AuthController --> AuthDAO : uses
    CategoryController --> CategoryDAO : uses
    PrayerController --> PrayerDAO : uses
    
    AuthDAO --> User : manages
    CategoryDAO --> PrayerCategory : manages
    PrayerDAO --> Prayer : manages
```

---

## Risks

1. **Authentication Security**: Improper password storage or JWT token handling could lead to security vulnerabilities.  

2. **Database Performance**: Slow query performance with large amounts of prayer data.  

3. **Frontend Framework Complexity**: Building two different frontends (React + Angular) doubles development time.  

4. **Data Validation**: Invalid or malicious data could corrupt database or cause errors.  

5. **Time Management**: Underestimating time needed for backend, frontend, and testing.  

6. **Learning Curve**: Limited experience with React or Angular could slow development.  
