import { configureStore } from '@reduxjs/toolkit';
import mockAxios from 'jest-mock-axios';
import coursesReducer, { fetchCourses } from '../courses/coursesSlice.js';
import { logout } from '../auth/authSlice.js';

afterEach(() => {
  mockAxios.reset();
});

const initialState = {
  courses: [],
};

const mockCoursesData = [
  { id: 1, name: 'ES6', credit: 60 },
  { id: 2, name: 'Webpack', credit: 20 },
  { id: 3, name: 'React', credit: 40 },
];

describe('coursesSlice', () => {
  test('returns the correct initial state by default', () => {
    expect(coursesReducer(undefined, { type: '@@INIT' })).toEqual(initialState);
  });

  test('fetches courses data correctly', async () => {
    const store = configureStore({
      reducer: { courses: coursesReducer },
    });

    const dispatchPromise = store.dispatch(fetchCourses());

    mockAxios.mockResponse({
      data: { courses: mockCoursesData },
    });

    await dispatchPromise;
    const state = store.getState().courses;

    expect(state.courses).toHaveLength(3);
    expect(state.courses[0].name).toBe('ES6');
    expect(state.courses[1].name).toBe('Webpack');
    expect(state.courses[2].name).toBe('React');
  });

  test('resets courses to empty array when logout action is dispatched', async () => {
    const store = configureStore({
      reducer: { courses: coursesReducer },
    });

    const dispatchPromise = store.dispatch(fetchCourses());

    mockAxios.mockResponse({
      data: { courses: mockCoursesData },
    });

    await dispatchPromise;
    expect(store.getState().courses.courses).toHaveLength(3);

    store.dispatch(logout());
    expect(store.getState().courses.courses).toEqual([]);
  });
});
