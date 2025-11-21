# Web-app-taskManager (Frontend)

This is a simple frontend project made using React.js, Vite, and Tailwind CSS.
It connects with the backend API and provides authentication and task management UI.

# Features
## User Features

- Register user

- Login user

- Logout user

- Store JWT in cookies (withCredentials)

- Protected routes

- Redirect after login

## Task Features

- Create Task

- Get All Tasks

- Update Task Status

- Delete Task

## Each task has:

- Title

- Description

- Status (Pending, In-Progress, Completed)

## Tech Used

- React.js

- Vite

- Tailwind CSS

- Axios

- React Router DOM

## How to Run

1. Clone the repo

2. Install dependencies

3. Run the app

```js
git clone https://github.com/nishitk7417/web-app-frontend.git
cd web-app-frontend
npm install
npm run dev
```
## API Setup

All backend calls are made using Axios inside:
```
src/api.js
```

Example:
```
const api = axios.create({
  baseURL: "http://localhost:8000/api/v1",
  withCredentials: true,
});
```

## Pages
### Register Page

- Allows user to create an account

- Sends name, email, password to backend

### Login Page

- Authenticates user

- Stores token in cookies

### Tasks Page

- Shows all tasks

- Add task

- Edit task status

- Delete task

## Summary

This frontend project provides a clean and simple UI for authentication and task management.
It is perfect for learning React + full-stack development.