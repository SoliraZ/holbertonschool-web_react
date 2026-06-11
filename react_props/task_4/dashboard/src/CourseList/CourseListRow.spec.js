import { render, screen, within } from '@testing-library/react'
import CourseListRow from './CourseListRow.jsx'

describe('CourseListRow', () => {
  test('when isHeader is true and textSecondCell is null, renders one columnheader with colspan 2', () => {
    render(
      <table>
        <thead>
          <CourseListRow
            isHeader={true}
            textFirstCell="Available courses"
            textSecondCell={null}
          />
        </thead>
      </table>,
    )
    const row = screen.getByRole('row')
    const header = within(row).getByRole('columnheader')

    expect(header).toHaveAttribute('colspan', '2')
    expect(header).toHaveTextContent('Available courses')
  })

  test('when isHeader is true and textSecondCell is not null, renders 2 th cells', () => {
    render(
      <table>
        <thead>
          <CourseListRow
            isHeader={true}
            textFirstCell="Course name"
            textSecondCell="Credit"
          />
        </thead>
      </table>,
    )
    const row = screen.getByRole('row')
    const headers = within(row).getAllByRole('columnheader')

    expect(headers).toHaveLength(2)
    expect(headers[0]).toHaveTextContent('Course name')
    expect(headers[1]).toHaveTextContent('Credit')
  })

  test('when isHeader is false, renders two td elements within a tr element', () => {
    render(
      <table>
        <tbody>
          <CourseListRow
            isHeader={false}
            textFirstCell="ES6"
            textSecondCell="60"
          />
        </tbody>
      </table>,
    )
    const row = screen.getByRole('row')
    const cells = within(row).getAllByRole('cell')

    expect(cells).toHaveLength(2)
    expect(cells[0]).toHaveTextContent('ES6')
    expect(cells[1]).toHaveTextContent('60')
  })
})
