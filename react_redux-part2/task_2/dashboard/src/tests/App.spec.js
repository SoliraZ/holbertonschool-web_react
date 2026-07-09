import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import App from '../App';
import mockAxios from 'jest-mock-axios';
import rootReducer from '../app/rootReducer';
import authReducer, { login } from '../features/auth/authSlice';
import notificationsReducer from '../features/notifications/notificationsSlice';
import coursesReducer from '../features/courses/coursesSlice';

afterEach(() => {
  mockAxios.reset();
});

const createStore = (preloadedState = {}) =>
  configureStore({ reducer: rootReducer, preloadedState });

const renderApp = (preloadedState = {}) => {
  const store = createStore(preloadedState);
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  return store;
};

const mockNotificationsResponse = {
  data: {
    notifications: [
      { id: 1, type: 'default', value: 'New course available' },
      { id: 2, type: 'urgent', value: 'New resume available' },
      { id: 3, type: 'urgent', html: { __html: '' } },
    ],
  },
};

const mockCoursesResponse = {
  data: {
    courses: [
      { id: 1, name: 'ES6', credit: 60 },
      { id: 2, name: 'Webpack', credit: 20 },
      { id: 3, name: 'React', credit: 40 },
    ],
  },
};

// --- App tests ---

test('renders Login component when isLoggedIn is false', async () => {
  renderApp();
  mockAxios.mockResponse(mockNotificationsResponse);

  await waitFor(() => {
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /log in to continue/i })).toBeInTheDocument();
  });
});

test('renders CourseList component when isLoggedIn is true', async () => {
  const store = createStore({
    auth: { user: { email: 'test@test.com', password: 'pass', isLoggedIn: true } },
    notifications: { notifications: [] },
    courses: { courses: [] },
  });
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  mockAxios.mockResponse(mockCoursesResponse);

  await waitFor(() => {
    expect(screen.getByRole('heading', { name: /course list/i })).toBeInTheDocument();
    expect(screen.queryByLabelText(/email/i)).not.toBeInTheDocument();
  });
});

test('fetches and displays notification items on mount', async () => {
  renderApp();
  mockAxios.mockResponse(mockNotificationsResponse);

  await waitFor(() => {
    expect(screen.getByText('New course available')).toBeInTheDocument();
    expect(screen.getByText('New resume available')).toBeInTheDocument();
  });
});

// --- Login tests ---

test('Login: renders email, password fields and a disabled submit button', async () => {
  renderApp();
  mockAxios.mockResponse(mockNotificationsResponse);

  await waitFor(() => {
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /ok/i })).toBeDisabled();
  });
});

test('Login: valid form submission sets isLoggedIn to true', async () => {
  const store = renderApp();
  mockAxios.mockResponse(mockNotificationsResponse);

  await waitFor(() => expect(screen.getByLabelText(/email/i)).toBeInTheDocument());

  fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
  fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
  fireEvent.click(screen.getByRole('button', { name: /ok/i }));

  mockAxios.mockResponse(mockCoursesResponse);

  await waitFor(() => {
    expect(store.getState().auth.user.isLoggedIn).toBe(true);
    expect(store.getState().auth.user.email).toBe('test@example.com');
  });
});

test('Login: invalid form submission (bad email or short password) keeps isLoggedIn false', async () => {
  const store = renderApp();
  mockAxios.mockResponse(mockNotificationsResponse);

  await waitFor(() => expect(screen.getByLabelText(/email/i)).toBeInTheDocument());

  fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'invalid-email' } });
  fireEvent.change(screen.getByLabelText(/password/i), { target: { value: '123' } });

  expect(screen.getByRole('button', { name: /ok/i })).toBeDisabled();
  expect(store.getState().auth.user.isLoggedIn).toBe(false);
});

// --- Footer tests ---

test('Footer: displays Copyright text with current year', async () => {
  renderApp();
  mockAxios.mockResponse(mockNotificationsResponse);

  await waitFor(() => {
    const copyrightEl = screen.getByText(
      new RegExp(`copyright ${new Date().getFullYear()}`, 'i')
    );
    expect(copyrightEl).toBeInTheDocument();
    expect(copyrightEl.textContent).toMatch(/holberton school/i);
  });
});

test('Footer: displays Contact us link when isLoggedIn is true', async () => {
  const store = createStore({
    auth: { user: { email: 'test@test.com', password: 'pass', isLoggedIn: true } },
    notifications: { notifications: [] },
    courses: { courses: [] },
  });
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  mockAxios.mockResponse(mockCoursesResponse);

  await waitFor(() => {
    expect(screen.getByText(/contact us/i)).toBeInTheDocument();
  });
});

test('Footer: does not display Contact us link when isLoggedIn is false', async () => {
  renderApp();
  mockAxios.mockResponse(mockNotificationsResponse);

  await waitFor(() => {
    expect(screen.queryByText(/contact us/i)).not.toBeInTheDocument();
  });
});

// --- Header tests ---

test('Header: displays logout link when isLoggedIn is true', async () => {
  const store = createStore({
    auth: { user: { email: 'test@test.com', password: 'pass', isLoggedIn: true } },
    notifications: { notifications: [] },
    courses: { courses: [] },
  });
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  mockAxios.mockResponse(mockCoursesResponse);

  await waitFor(() => {
    expect(screen.getByText(/logout/i)).toBeInTheDocument();
  });
});

test('Header: displays welcome message with email after login', async () => {
  const store = renderApp();
  mockAxios.mockResponse(mockNotificationsResponse);

  await waitFor(() => expect(screen.getByLabelText(/email/i)).toBeInTheDocument());

  fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
  fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
  fireEvent.click(screen.getByRole('button', { name: /ok/i }));

  mockAxios.mockResponse(mockCoursesResponse);

  await waitFor(() => {
    expect(screen.getByText('test@example.com')).toBeInTheDocument();
  });
});

test('Header: logout action sets isLoggedIn to false', async () => {
  const store = createStore({
    auth: { user: { email: 'test@test.com', password: 'pass', isLoggedIn: true } },
    notifications: { notifications: [] },
    courses: { courses: [] },
  });
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  mockAxios.mockResponse(mockCoursesResponse);

  await waitFor(() => expect(screen.getByText(/logout/i)).toBeInTheDocument());

  fireEvent.click(screen.getByText(/logout/i));

  expect(store.getState().auth.user.isLoggedIn).toBe(false);
});

// --- CourseList tests ---

test('CourseList: displays courses after fetchCourses is resolved', async () => {
  const store = createStore({
    auth: { user: { email: 'test@test.com', password: 'pass', isLoggedIn: true } },
    notifications: { notifications: [] },
    courses: { courses: [] },
  });
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  mockAxios.mockResponse(mockNotificationsResponse);
  mockAxios.mockResponse(mockCoursesResponse);

  await waitFor(() => {
    expect(screen.getByText('ES6')).toBeInTheDocument();
    expect(screen.getByText('Webpack')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
  });
});

test('CourseList: courses array is reset after logout', async () => {
  const store = createStore({
    auth: { user: { email: 'test@test.com', password: 'pass', isLoggedIn: true } },
    notifications: { notifications: [] },
    courses: {
      courses: [
        { id: 1, name: 'ES6', credit: 60 },
        { id: 2, name: 'Webpack', credit: 20 },
      ],
    },
  });
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  mockAxios.mockResponse(mockCoursesResponse);

  await waitFor(() => expect(screen.getByText(/logout/i)).toBeInTheDocument());

  fireEvent.click(screen.getByText(/logout/i));

  expect(store.getState().courses.courses).toEqual([]);
});

// --- Notifications tests ---

test('Notifications: displays notification items after fetchNotifications is resolved', async () => {
  renderApp();
  mockAxios.mockResponse(mockNotificationsResponse);

  await waitFor(() => {
    expect(screen.getByText('New course available')).toBeInTheDocument();
    expect(screen.getByText('New resume available')).toBeInTheDocument();
  });
});

test('Notifications: closing drawer removes visible class from drawer', async () => {
  const { container } = render(
    <Provider store={createStore()}>
      <App />
    </Provider>
  );
  mockAxios.mockResponse(mockNotificationsResponse);

  await waitFor(() => expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument());

  const drawer = container.querySelector('[class*="notificationItems"]');
  fireEvent.click(screen.getByText(/your notifications/i));
  expect(drawer.className).toMatch(/visible_/);

  fireEvent.click(screen.getByRole('button', { name: /close/i }));
  expect(drawer.className).not.toMatch(/visible_/);
});

test('Notifications: clicking Your notifications adds visible class to drawer', async () => {
  const { container } = render(
    <Provider store={createStore()}>
      <App />
    </Provider>
  );
  mockAxios.mockResponse(mockNotificationsResponse);

  await waitFor(() => expect(screen.getByText(/your notifications/i)).toBeInTheDocument());

  const drawer = container.querySelector('[class*="notificationItems"]');
  expect(drawer.className).not.toMatch(/visible_/);

  fireEvent.click(screen.getByText(/your notifications/i));
  expect(drawer.className).toMatch(/visible_/);
});

test('Notifications: marking a notification as read removes it from the list', async () => {
  const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  const store = renderApp();
  mockAxios.mockResponse(mockNotificationsResponse);

  await waitFor(() => {
    const items = screen.getAllByRole('listitem');
    expect(items.length).toBeGreaterThan(0);
  });

  const items = screen.getAllByRole('listitem');
  const initialCount = items.length;
  fireEvent.click(items[0]);

  expect(store.getState().notifications.notifications.length).toBe(initialCount - 1);
  consoleSpy.mockRestore();
});
