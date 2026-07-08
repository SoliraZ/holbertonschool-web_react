import authReducer, { login, logout } from '../auth/authSlice';

const initialState = {
  user: {
    email: '',
    password: '',
    isLoggedIn: false,
  },
};

describe('authSlice', () => {
  test('returns the correct initial state by default', () => {
    expect(authReducer(undefined, { type: '@@INIT' })).toEqual(initialState);
  });

  test('login action updates email, password and sets isLoggedIn to true', () => {
    const action = login({ email: 'test@example.com', password: '12345678' });
    const state = authReducer(undefined, action);

    expect(state.user.email).toBe('test@example.com');
    expect(state.user.password).toBe('12345678');
    expect(state.user.isLoggedIn).toBe(true);
  });

  test('logout action resets email, password and sets isLoggedIn to false', () => {
    const loggedInState = {
      user: {
        email: 'test@example.com',
        password: '12345678',
        isLoggedIn: true,
      },
    };
    const state = authReducer(loggedInState, logout());

    expect(state.user.email).toBe('');
    expect(state.user.password).toBe('');
    expect(state.user.isLoggedIn).toBe(false);
  });
});
