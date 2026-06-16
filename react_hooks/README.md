# React Hooks

This directory contains the **react_hooks** project for the Holberton Web React curriculum.

## Learning objectives

- Build React apps using **functional components**
- Replace class lifecycle patterns with **React hooks**
- Use **Context** with the appropriate hook (`useContext`)

## Project structure

- `task_0/`: Project tasks
  - `task_0/dashboard/`: React app used for the task

## Task 0

Modernize the `Header` component:

- Convert `Header` from a class component to a **functional component**
- Consume context using **`useContext`**
- Keep the **exact same JSX structure**
- When the user is logged in, display:
  - A welcome message
  - A logout link that calls `logOut`

## How to run (task_0)

```bash
cd task_0/dashboard
npm install
npm test
npm run lint
npm run dev
```

