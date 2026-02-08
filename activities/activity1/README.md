# Activity 1 - MusicAPI with Node.js and MySQL

**Course:** CST-391 - JavaScript Web Application Development  
**Student:** Seline Bowens
**Date:** February 7, 2026  

---

## Introduction

Activity 1 focuses on building a complete RESTful backend API using modern JavaScript technologies. The MusicAPI project demonstrates the implementation of a full-stack backend application that manages a music database containing albums, tracks, and artists. This activity introduces the fundamentals of server-side development, database integration, and REST API design following Model-View-Controller architecture.

The project showcases how to build a production, ready API that handles Create, Read, Update, and Delete (CRUD) operations, connects to a MySQL database using connection pooling, implements proper error handling, and follows REST conventions for endpoint design. Through this activity, I gained hands-on experience with Node.js runtime, Express framework, TypeScript for type safety, and MySQL for data persistence.

---

## Technologies Used

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white)
![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)

---

## Video Demonstration

### What the Videos Cover

The demonstration includes testing API endpoints using Postman, showing how each endpoint handles different HTTP methods  such as GET, POST, PUT, DELETE, etc., and returns appropriate responses. The video then drills down into a specific endpoint to explain the three-layer architecture in detail:

1. **Router Layer** - How Express routes incoming requests to the correct controller
2. **Controller Layer** - How controllers validate input, orchestrate business logic, and format responses
3. **DAO Layer** - How Data Access Objects execute SQL queries and interact with the MySQL database

This detailed explanation demonstrates the separation of concerns in the MVC pattern and shows how data flows through the application from an HTTP request to database operations and back to the client response.

### Links
####  Video Links ####

*Part 1*
[https://www.loom.com/share/1977c0b4a7d14a7596aa9e43d6bd80fc](https://www.loom.com/share/1977c0b4a7d14a7596aa9e43d6bd80fc)

*Part 1 cont* [https://www.loom.com/share/90c66364ddb9430cb197f99aa3da3dea](https://www.loom.com/share/90c66364ddb9430cb197f99aa3da3dea)

*Part 2 cont*
[https://www.loom.com/share/af9886a5dac54232990f443b8ec83e96](https://www.loom.com/share/af9886a5dac54232990f443b8ec83e96)

#### Activity 1 Repository Link ####

[https://github.com/Selinebowens/cst339/commit/e3d6327aa95528c035565f9413dbdd53bb901950](https://github.com/Selinebowens/cst339/commit/e3d6327aa95528c035565f9413dbdd53bb901950)

---

## The API Endpoints

The MusicAPI implements REST endpoints following industry conventions:

### Albums Endpoints
1. `GET /albums` - Retrieve all albums with their tracks
2. `GET /albums?albumId=X` - Retrieve a specific album by ID
3. `GET /albums/:artist` - Retrieve all albums by a specific artist
4. `GET /albums/search/artist/:search` - Search albums by partial artist name
5. `GET /albums/search/description/:search` - Search albums by description keywords
6. `POST /albums` - Create a new album with tracks
7. `PUT /albums` - Update an existing album and its tracks
8. `GET /artists` - Retrieve all distinct artists from the database
9. `DELETE /albums/:albumId` - Delete an album by ID

---

## Conclusion

Activity 1 teaches how to build a complete backend API from scratch using Node.js and Express. It demonstrates how to set up a Node.js project with TypeScript, configure environment variables using dotenv, and structure an application following the MVC architecture pattern by separating models, controllers, and data access objects into distinct layers.

I learned how to implement Express middleware including custom logger middleware that generates unique request IDs and tracks processing time, built-in middleware for parsing JSON and URL-encoded request bodies, CORS middleware for handling cross-origin requests, and Helmet middleware for adding security headers. I learned the importance of middleware order and how each middleware function processes requests before passing them to the next handler.

I learned how to use TypeScript interfaces to define data structures, enforce type safety throughout the application, and catch errors at compile time rather than runtime. I learned how to configure the TypeScript compiler through tsconfig.json and use ts-node for executing TypeScript files directly during development.

Testing API endpoints using Postman, including sending requests with different HTTP methods, passing data in request bodies as JSON, using path and query parameters, and inspecting response status codes and data was also demonstrated.



