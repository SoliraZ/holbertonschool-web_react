import { render, screen, within } from '@testing-library/react'
import CourseList from './CourseList.jsx'

const coursesList = [
  { id: 1, name: 'ES6', credit: 60 },
  { id: 2, name: 'Webpack', credit: 20 },
  { id: 3, name: 'React', credit: 40 },
]

describe('CourseList', () => {
  test('renders 5 rows when it receives an array of course objects', () => {
    render(<CourseList courses={coursesList} />)

    const table = screen.getByRole('table')
    expect(table).toHaveAttribute('id', 'CourseList')
    expect(within(table).getAllByRole('row')).toHaveLength(5)
  })

  test('renders 1 row when it receives an empty array', () => {
    render(<CourseList courses={[]} />)

    const table = screen.getByRole('table')
    const rows = within(table).getAllByRole('row')

    expect(rows).toHaveLength(1)
    expect(
      within(rows[0]).getByRole('columnheader', {
        name: /no course available yet/i,
      }),
    ).toBeInTheDocument()
  })
})
