import { render, screen, fireEvent } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import CourseList from './CourseList';
import coursesReducer, { selectCourse, unSelectCourse } from '../../features/courses/coursesSlice';

const createStore = (courses = []) => {
  return configureStore({
    reducer: { courses: coursesReducer },
    preloadedState: { courses: { courses } },
  });
};

test('it should render the CourseList component with 5 rows', () => {
  const store = createStore([
    { id: 1, name: 'ES6', credit: 60, isSelected: false },
    { id: 2, name: 'Webpack', credit: 20, isSelected: false },
    { id: 3, name: 'React', credit: 40, isSelected: false },
  ]);

  render(
    <Provider store={store}>
      <CourseList />
    </Provider>
  );

  const rowElements = screen.getAllByRole('row');
  expect(rowElements).toHaveLength(5);
});

test('it should render the CourseList component with 1 row', () => {
  const store = createStore([]);

  render(
    <Provider store={store}>
      <CourseList />
    </Provider>
  );

  const rowElement = screen.getAllByRole('row');
  const rowText = screen.getByText(/No course available yet/i);

  expect(rowElement).toHaveLength(1);
  expect(rowText).toBeInTheDocument();
});

test('it should render checkboxes for each course row', () => {
  const store = createStore([
    { id: 1, name: 'ES6', credit: 60, isSelected: false },
    { id: 2, name: 'Webpack', credit: 20, isSelected: false },
  ]);

  render(
    <Provider store={store}>
      <CourseList />
    </Provider>
  );

  const checkboxes = screen.getAllByRole('checkbox');
  expect(checkboxes).toHaveLength(2);
  checkboxes.forEach((cb) => expect(cb).not.toBeChecked());
});

test('onChangeRow dispatches selectCourse when checkbox is checked', () => {
  const store = createStore([
    { id: 1, name: 'ES6', credit: 60, isSelected: false },
    { id: 2, name: 'Webpack', credit: 20, isSelected: false },
  ]);

  render(
    <Provider store={store}>
      <CourseList />
    </Provider>
  );

  const checkboxes = screen.getAllByRole('checkbox');
  fireEvent.click(checkboxes[0]);

  expect(store.getState().courses.courses.find((c) => c.id === 1).isSelected).toBe(true);
  expect(store.getState().courses.courses.find((c) => c.id === 2).isSelected).toBe(false);
});

test('onChangeRow dispatches unSelectCourse when checkbox is unchecked', () => {
  const store = createStore([
    { id: 1, name: 'ES6', credit: 60, isSelected: true },
    { id: 2, name: 'Webpack', credit: 20, isSelected: false },
  ]);

  render(
    <Provider store={store}>
      <CourseList />
    </Provider>
  );

  const checkboxes = screen.getAllByRole('checkbox');
  expect(checkboxes[0]).toBeChecked();

  fireEvent.click(checkboxes[0]);
  expect(store.getState().courses.courses.find((c) => c.id === 1).isSelected).toBe(false);
});
