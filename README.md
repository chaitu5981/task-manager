# Task Manager

A full-stack task management application built with the MERN stack (MongoDB, Express, React, Node.js). This application allows users to create, read, update, and delete tasks with a clean and modern user interface.

## Features

- Create new tasks with title and description
- View all tasks in a list
- Update existing tasks (title, description, and status)
- Delete tasks
- Responsive design with TailwindCSS
- Modern UI with React Icons and Toast notifications

## Tech Stack

### Frontend

- **React 19** - UI library
- **Vite** - Build tool and dev server
- **TailwindCSS** - Utility-first CSS framework
- **Axios** - HTTP client
- **React Icons** - Icon library
- **React Toastify** - Toast notifications

### Backend

- **Node.js** - Runtime environment
- **Express 5** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

## Project Structure

```
task-manager/
├── backend/
│   ├── controllers/
│   │   └── task.controllers.js    # Task CRUD operations
│   ├── models/
│   │   └── task.model.js          # Task schema definition
│   ├── routes/
│   │   └── task.routes.js         # Task API routes
│   ├── dbConnect.js               # MongoDB connection
│   ├── server.js                  # Express server setup
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── AddOrUpdateTask.jsx  # Task form component
│   │   │   ├── TasksList.jsx        # Task list component
│   │   │   ├── Pagination.jsx       # Pagination component
│   │   │   └── Loader.jsx           # Loading component
│   │   ├── App.jsx                  # Main app component
│   │   ├── App.css                  # App styles
│   │   └── main.jsx                 # Entry point
│   ├── public/
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
└── README.md
```

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher)
- **npm** (package manager)
- **MongoDB** (MongoDB Atlas account)

## Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd task-manager
   ```

2. **Install backend dependencies**

   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

## Configuration

### Backend Environment Variables

Create a `.env` file in the `backend` directory:

```env
DB_URI=your_mongodb_connection_string
PORT=3000
```

## Running the Application

1. **Start the backend server**

   ```bash
   cd backend
   npm run dev
   ```

   The server will run on `http://localhost:3000`

2. **Start the frontend development server** (in a new terminal)
   ```bash
   cd frontend
   npm run dev
   ```
   The frontend will typically run on `http://localhost:5173` (Vite default port)

## API Endpoints

All task-related endpoints are prefixed with `/api/tasks`

| Method | Endpoint         | Description             |
| ------ | ---------------- | ----------------------- |
| POST   | `/api/tasks`     | Create a new task       |
| GET    | `/api/tasks`     | Get all tasks           |
| GET    | `/api/tasks/:id` | Get a single task by ID |
| PUT    | `/api/tasks/:id` | Update a task by ID     |
| DELETE | `/api/tasks/:id` | Delete a task by ID     |
