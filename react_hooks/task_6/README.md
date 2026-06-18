# React Hooks — Task 4

## Objective

Convert `App` from a class component to a **functional component** using React hooks for state management.

## Requirements covered

- `displayDrawer` state with `useState(true)`
- `user` state initialized from the context user object
- `notifications` state initialized from `notificationsList`
- `logIn`, `logOut`, `markNotificationAsRead`, `handleDisplayDrawer`, `handleHideDrawer` with `useCallback`
- Context value memoized with `useMemo`
- Keyboard logout listener removed

## Files

- `dashboard/src/App/App.jsx`
- `dashboard/src/App/App.spec.js`
