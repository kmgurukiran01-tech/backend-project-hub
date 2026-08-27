# To-Do Backend Project

A simple REST API backend for managing to-do tasks using **Node.js, Express.js, and SQLite3**.

## Features

* Create a to-do
* Get all to-dos
* Get a single to-do
* Update a to-do
* Delete a to-do
* SQLite database storage
* REST API architecture
* Environment variables using `.env`

## Tech Stack

* Node.js
* Express.js
* SQLite3
* `sqlite` package
* dotenv
* JavaScript

## Project Structure

```text
To-do Backend Project/
│
├── database/
│   └── schema.sql
│
├── .env
├── server.js
├── package.json
├── package-lock.json
└── todo.db
```

## Installation

Clone the project and install dependencies:

```bash
npm install
```

## Environment Variables

Create a `.env` file:

```env
PORT=3000
```

## Run the Server

For normal execution:

```bash
node server.js
```

For development using nodemon:

```bash
npx nodemon server.js
```

The server will run at:

```text
http://localhost:3000
```

## API Endpoints

| Method | Endpoint      | Description       |
| ------ | ------------- | ----------------- |
| GET    | `/todos/`     | Get all todos     |
| GET    | `/todos/:id/` | Get a todo by ID  |
| POST   | `/todos/`     | Create a new todo |
| PUT    | `/todos/:id/` | Update a todo     |
| DELETE | `/todos/:id/` | Delete a todo     |

## Example POST Request

```json
{
  "todo": "Learn Express.js",
  "priority": "HIGH",
  "status": "TO DO"
}
```

## Database

The project uses SQLite3 for storing todo data.

The database schema is available in:

```text
database/schema.sql
```

## Learning Objectives

This project demonstrates:

* Node.js fundamentals
* Express.js routing
* REST API development
* CRUD operations
* SQLite database integration
* SQL queries
* Middleware
* Environment variables
* HTTP request and response handling

## Author

Gurukiran KM
