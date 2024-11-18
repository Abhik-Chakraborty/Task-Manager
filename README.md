
# Task Management App

A full-stack Task Management application that allows users to create, view, update, and delete tasks. Tasks can be filtered based on their status (`All`, `Todo`, `In Progress`, `Completed`) and each task has details like Title, Description, Due Date, Created At, and Updated At. 

---

## Features

### Frontend
- **Add, Edit, and Delete Tasks**:
  - Users can create tasks with a title, description, and due date.
  - Tasks can be edited to update their details or status.
  - Users can delete tasks they no longer need.
  
- **Filter Tasks**:
  - Filter tasks based on their status: All, Todo, In Progress, Completed.
  - Active filter highlights to indicate the selected filter.

- **Task Details**:
  - Clicking on a task card redirects to a detailed page that displays:
    - Title
    - Description
    - Due Date
    - Created At
    - Updated At

### Backend
- **Task Persistence**:
  - Tasks are saved to a file (`tasks.json`) for persistence.

- **CRUD Operations**:
  - API endpoints for creating, reading, updating, and deleting tasks.
  
- **Filter and Search**:
  - Filter tasks by status.
  - Search for a task by its unique ID.

- **Automatic Timestamps**:
  - Each task has `createdOn` and `lastEditedOn` fields, which are automatically updated.

---

## Technologies Used

### Frontend
- **React**:
  - Functional components with hooks (`useState`, `useEffect`, and custom context).
  - Tailwind CSS for styling.

- **React Router**:
  - Handles navigation between the Task List and Task Details pages.

### Backend
- **Node.js**:
  - Backend logic using `express` for handling routes.

- **File System**:
  - `fs` module for reading/writing tasks to `tasks.json`.

- **Utility Functions**:
  - `fileUtils.js` for managing task file operations (e.g., loading, saving).
  - `taskUtils.js` for task-specific logic (e.g., validation, filtering).

---

## Project Setup

### Frontend Setup
1. Navigate to the `frontend` directory:
   ```
   cd frontend
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm start
   ```
4. The app will be available at [http://localhost:3000](http://localhost:3000).

### Backend Setup
1. Navigate to the `backend` directory:
   ```
   cd backend
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Start the server:
   ```
   node index.js
   ```
4. The backend will be running at [http://localhost:5000](http://localhost:5000).

---

## API Endpoints

### Base URL: `http://localhost:5000/tasks`

#### 1. Get All Tasks
- **Endpoint**: `GET /tasks`
- **Query Parameters**: `status` (optional, e.g., `todo`, `completed`, `in-progress`)
- **Response**:
  ```json
  [
    {
    "_id": "qedp1d8as",
    "title": "Study",
    "description": "DSA",
    "status": "todo",
    "dueDate": "2024-11-19T00:00:00.000Z",
    "createdOn": "2024-11-18T18:13:15.272Z",
    "lastEditedOn": "2024-11-18T18:13:15.272Z"
  }
  ]
  ```

#### 2. Get Task by ID
- **Endpoint**: `GET /tasks/:id`
- **Response**:
  ```json
  {
    "_id": "qedp1d8as",
    "title": "Study",
    "description": "DSA",
    "status": "todo",
    "dueDate": "2024-11-19T00:00:00.000Z",
    "createdOn": "2024-11-18T18:13:15.272Z",
    "lastEditedOn": "2024-11-18T18:13:15.272Z"
  }
  ```

#### 3. Create a Task
- **Endpoint**: `POST /tasks`
- **Request Body**:
  ```json
  {
    "title": "New Task",
    "description": "New Description",
    "status": "todo",
    "dueDate": "2024-11-20"
  }
  ```
- **Response**:
  ```json
  {
    "_id": "xyz123",
    "title": "New Task",
    "description": "New Description",
    "status": "todo",
    "dueDate": "2024-11-20T00:00:00.000Z",
    "createdOn": "2024-11-17T13:00:00.000Z",
    "lastEditedOn": "2024-11-17T13:00:00.000Z"
  }
  ```

#### 4. Update a Task
- **Endpoint**: `PUT /tasks/:id`
- **Request Body**:
  ```json
  {
    "title": "Updated Title",
    "description": "Updated Description",
    "dueDate": "2024-11-21"
  }
  ```
- **Response**:
  ```json
  {
    "_id": "xyz123",
    "title": "Updated Title",
    "description": "Updated Description",
    "status": "todo",
    "dueDate": "2024-11-21T00:00:00.000Z",
    "createdOn": "2024-11-17T13:00:00.000Z",
    "lastEditedOn": "2024-11-17T14:00:00.000Z"
  }
  ```

#### 5. Delete a Task
- **Endpoint**: `DELETE /tasks/:id`
- **Response**:
  ```json
  { "message": "Task deleted" }
  ```

---


---
