import { render, screen } from '@testing-library/react'
import CourseListRow from './CourseListRow.jsx'

describe('CourseListRow', () => {
  test('renders a header row with single cell spanning 2 columns', () => {
    const { container } = render(
      <table>
        <thead>
          <CourseListRow isHeader textFirstCell="Available courses" />
        </thead>
      </table>,
    )
    const th = container.querySelector('th')
    expect(th).toBeInTheDocument()
    expect(th).toHaveAttribute('colspan', '2')
    expect(th).toHaveTextContent('Available courses')
  })

  test('renders a header row with two cells', () => {
    render(
      <table>
        <thead>
          <CourseListRow isHeader textFirstCell="Course name" textSecondCell="Credit" />
        </thead>
      </table>,
    )
    expect(screen.getByText('Course name')).toBeInTheDocument()
    expect(screen.getByText('Credit')).toBeInTheDocument()
  })

  test('renders a data row with two cells', () => {
    render(
      <table>
        <tbody>
          <CourseListRow textFirstCell="ES6" textSecondCell={60} />
        </tbody>
      </table>,
    )
    expect(screen.getByText('ES6')).toBeInTheDocument()
    expect(screen.getByText('60')).toBeInTheDocument()
  })
})
