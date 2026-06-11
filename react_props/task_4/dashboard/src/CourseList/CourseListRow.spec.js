import { render, screen, within } from '@testing-library/react'
import CourseListRow from './CourseListRow.jsx'

describe('CourseListRow', () => {
  test('when isHeader is false, renders two td elements within a tr element', () => {
    render(<CourseListRow />)

    const row = screen.getByRole('row')
    expect(row).toBeInTheDocument()
    expect(within(row).getAllByRole('cell')).toHaveLength(2)
  })

  test('when isHeader is true and textSecondCell is not null, renders 2 th cells', () => {
    render(
      <CourseListRow
        isHeader={true}
        textFirstCell="Course name"
        textSecondCell="Credit"
      />,
    )

    const row = screen.getByRole('row')
    expect(row).toBeInTheDocument()
    expect(within(row).getAllByRole('columnheader')).toHaveLength(2)
  })

  test('when isHeader is true and textSecondCell is null, renders one columnheader with colspan 2', () => {
    render(
      <CourseListRow
        isHeader={true}
        textFirstCell="Available courses"
        textSecondCell={null}
      />,
    )

    const row = screen.getByRole('row')
    expect(row).toBeInTheDocument()
    expect(within(row).getByRole('columnheader')).toHaveAttribute(
      'colspan',
      '2',
    )
  })
})
