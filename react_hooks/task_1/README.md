# React Hooks — Task 1

## Objective

Convert the `Login` class component into a **functional component** using React hooks.

## Requirements covered

- `enableSubmit` state with `useState(false)`
- `formData` state with `useState({ email: '', password: '' })`
- `handleChangeEmail` and `handleChangePassword` update `formData` and validation
- `handleLoginSubmit` prevents default and calls `logIn` with email and password
- `WithLogging` HOC wrapper preserved

## Files

- `dashboard/src/Login/Login.jsx`
- `dashboard/src/Login/Login.spec.js`
