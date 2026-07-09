import { render, screen } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import Footer from './Footer';
import authReducer, { login } from '../../features/auth/authSlice';

const createStore = (isLoggedIn = false, email = '') => {
  const store = configureStore({ reducer: { auth: authReducer } });
  if (isLoggedIn) {
    store.dispatch(login({ email, password: 'password123' }));
  }
  return store;
};

test('It should render footer with copyright text', () => {
  const store = createStore();

  render(
    <Provider store={store}>
      <Footer />
    </Provider>
  );

  const footerParagraph = screen.getByText(/copyright/i);

  expect(footerParagraph).toHaveTextContent(new RegExp(`copyright ${(new Date()).getFullYear()}`, 'i'));
  expect(footerParagraph).toHaveTextContent(/holberton school/i);
});

test('Contact us link is not displayed when user is logged out', () => {
  const store = createStore();

  render(
    <Provider store={store}>
      <Footer />
    </Provider>
  );

  const contactLink = screen.queryByText(/contact us/i);
  expect(contactLink).not.toBeInTheDocument();
});

test('Contact us link is displayed when user is logged in', () => {
  const store = createStore(true, 'test@test.com');

  render(
    <Provider store={store}>
      <Footer />
    </Provider>
  );

  const contactLink = screen.getByText(/contact us/i);
  expect(contactLink).toBeInTheDocument();
});
