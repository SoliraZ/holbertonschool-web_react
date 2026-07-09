import { render, screen } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import CourseList from './CourseList';
import coursesReducer from '../../features/courses/coursesSlice';

const createStore = (courses = []) => {
  return configureStore({
    reducer: { courses: coursesReducer },
    preloadedState: { courses: { courses } },
  });
};

test('it should render the CourseList component with 5 rows', () => {
  const store = createStore([
    { id: 1, name: 'ES6', credit: 60 },
    { id: 2, name: 'Webpack', credit: 20 },
    { id: 3, name: 'React', credit: 40 },
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
