import { configureStore } from '@reduxjs/toolkit';
import mockAxios from 'jest-mock-axios';
import coursesReducer, {
  fetchCourses,
  selectCourse,
  unSelectCourse,
} from '../courses/coursesSlice.js';
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

  test('fetches courses data correctly and adds isSelected: false to each course', async () => {
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
    state.courses.forEach((course) => {
      expect(course.isSelected).toBe(false);
    });
  });

  test('selectCourse sets isSelected to true for the matching course', async () => {
    const store = configureStore({
      reducer: { courses: coursesReducer },
    });

    const dispatchPromise = store.dispatch(fetchCourses());
    mockAxios.mockResponse({ data: { courses: mockCoursesData } });
    await dispatchPromise;

    store.dispatch(selectCourse(1));
    const state = store.getState().courses;

    expect(state.courses.find((c) => c.id === 1).isSelected).toBe(true);
    expect(state.courses.find((c) => c.id === 2).isSelected).toBe(false);
    expect(state.courses.find((c) => c.id === 3).isSelected).toBe(false);
  });

  test('unSelectCourse sets isSelected to false for the matching course', async () => {
    const store = configureStore({
      reducer: { courses: coursesReducer },
    });

    const dispatchPromise = store.dispatch(fetchCourses());
    mockAxios.mockResponse({ data: { courses: mockCoursesData } });
    await dispatchPromise;

    store.dispatch(selectCourse(2));
    expect(store.getState().courses.courses.find((c) => c.id === 2).isSelected).toBe(true);

    store.dispatch(unSelectCourse(2));
    expect(store.getState().courses.courses.find((c) => c.id === 2).isSelected).toBe(false);
  });

  test('resets courses to empty array when logout action is dispatched', async () => {
    const store = configureStore({
      reducer: { courses: coursesReducer },
    });

    const dispatchPromise = store.dispatch(fetchCourses());
    mockAxios.mockResponse({ data: { courses: mockCoursesData } });
    await dispatchPromise;

    expect(store.getState().courses.courses).toHaveLength(3);

    store.dispatch(logout());
    expect(store.getState().courses.courses).toEqual([]);
  });
});
