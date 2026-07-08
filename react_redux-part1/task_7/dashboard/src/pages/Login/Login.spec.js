import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import Login from './Login';
import authReducer from '../../features/auth/authSlice';

const createStore = () =>
  configureStore({ reducer: { auth: authReducer } });

const renderWithStore = () => {
  const store = createStore();
  render(
    <Provider store={store}>
      <Login />
    </Provider>
  );
  return store;
};

test('testing signin form elements', () => {
  const { container } = render(
    <Provider store={createStore()}>
      <Login />
    </Provider>
  );

  const inputElements = container.querySelectorAll('input[type="email"], input[type="text"], input[type="password"]');
  const emailLabelElement = screen.getByLabelText(/email/i);
  const passwordLabelElement = screen.getByLabelText(/password/i);
  const buttonElementText = screen.getByRole('button', { name: 'OK' });

  expect(inputElements.length).toBeGreaterThanOrEqual(2);
  expect(emailLabelElement).toBeInTheDocument();
  expect(passwordLabelElement).toBeInTheDocument();
  expect(buttonElementText).toBeInTheDocument();
});

test('it should check that the email input element will be focused whenever the associated label is clicked', async () => {
  renderWithStore();

  const emailInput = screen.getByLabelText('Email');
  const emailLabel = screen.getByText('Email');

  userEvent.click(emailLabel);

  await waitFor(() => {
    expect(emailInput).toHaveFocus();
  });
});

test('it should check that the password input element will be focused whenever the associated label is clicked', async () => {
  renderWithStore();

  const passwordLabel = screen.getByText('Password');
  const passwordInput = screen.getByLabelText('Password');

  userEvent.click(passwordLabel);

  await waitFor(() => {
    expect(passwordInput).toHaveFocus();
  });
});

test('submit button is disabled by default', () => {
  renderWithStore();
  const submitButton = screen.getByText('OK');
  expect(submitButton).toBeDisabled();
});

test('submit button is enabled only with a valid email and password of at least 8 characters', () => {
  renderWithStore();

  const emailInput = screen.getByLabelText('Email');
  const passwordInput = screen.getByLabelText('Password');
  const submitButton = screen.getByText('OK');

  expect(submitButton).toBeDisabled();

  fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
  fireEvent.change(passwordInput, { target: { value: '123' } });
  expect(submitButton).toBeDisabled();

  fireEvent.change(emailInput, { target: { value: 'test.com' } });
  fireEvent.change(passwordInput, { target: { value: '12345678' } });
  expect(submitButton).toBeDisabled();

  fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
  fireEvent.change(passwordInput, { target: { value: '12345678' } });
  expect(submitButton).not.toBeDisabled();
});

test('should dispatch login action to the Redux store on form submission', () => {
  const store = renderWithStore();

  const emailInput = screen.getByLabelText(/email/i);
  const passwordInput = screen.getByLabelText(/password/i);

  fireEvent.change(emailInput, { target: { value: 'test@test.com' } });
  fireEvent.change(passwordInput, { target: { value: 'password123' } });

  const submitButton = screen.getByRole('button', { name: /ok/i });
  fireEvent.click(submitButton);

  const { auth } = store.getState();
  expect(auth.user.email).toBe('test@test.com');
  expect(auth.user.password).toBe('password123');
  expect(auth.user.isLoggedIn).toBe(true);
});
