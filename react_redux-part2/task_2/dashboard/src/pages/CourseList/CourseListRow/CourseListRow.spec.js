import { render, screen, within, fireEvent } from '@testing-library/react';
import CourseListRow from './CourseListRow';

test('it should display 1 "th" element with colspan=2 when isHeader is true and textSecondCell is null', () => {
  render(
    <table>
      <tbody>
        <CourseListRow isHeader={true} textFirstCell="First" textSecondCell={null} />
      </tbody>
    </table>
  );

  const thElement = screen.getByRole('columnheader');
  expect(thElement).toHaveAttribute('colSpan', '2');
});

test('it should display 2 "th" elements when isHeader is true and textSecondCell is not null', () => {
  render(
    <table>
      <tbody>
        <CourseListRow isHeader={true} textFirstCell="First" textSecondCell="Second" />
      </tbody>
    </table>
  );

  const thElements = screen.getAllByRole('columnheader');
  expect(thElements).toHaveLength(2);
});

test('it should render 2 "td" elements inside a "tr" element when isHeader is false', () => {
  render(
    <table>
      <tbody>
        <CourseListRow isHeader={false} textFirstCell="Data1" textSecondCell="Data2" id={1} changeRow={() => {}} />
      </tbody>
    </table>
  );

  const trElement = screen.getByRole('row');
  const tdElements = within(trElement).getAllByRole('cell');

  expect(trElement).toBeInTheDocument();
  expect(tdElements).toHaveLength(2);
});

test('it should render a checkbox in a non-header row', () => {
  render(
    <table>
      <tbody>
        <CourseListRow isHeader={false} textFirstCell="ES6" textSecondCell="60" id={1} isSelected={false} changeRow={() => {}} />
      </tbody>
    </table>
  );

  const checkbox = screen.getByRole('checkbox');
  expect(checkbox).toBeInTheDocument();
  expect(checkbox).not.toBeChecked();
});

test('it should render a checked checkbox when isSelected is true', () => {
  render(
    <table>
      <tbody>
        <CourseListRow isHeader={false} textFirstCell="ES6" textSecondCell="60" id={1} isSelected={true} changeRow={() => {}} />
      </tbody>
    </table>
  );

  expect(screen.getByRole('checkbox')).toBeChecked();
});

test('it should call changeRow with the id and checked state when checkbox changes', () => {
  const changeRow = jest.fn();

  render(
    <table>
      <tbody>
        <CourseListRow isHeader={false} textFirstCell="ES6" textSecondCell="60" id={1} isSelected={false} changeRow={changeRow} />
      </tbody>
    </table>
  );

  fireEvent.click(screen.getByRole('checkbox'));
  expect(changeRow).toHaveBeenCalledWith(1, true);
});
