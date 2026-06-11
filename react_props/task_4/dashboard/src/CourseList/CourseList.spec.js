import { render, screen, within } from '@testing-library/react'
import CourseList from './CourseList.jsx'

const coursesList = [
  { id: 1, name: 'ES6', credit: '60' },
  { id: 2, name: 'Webpack', credit: '20' },
  { id: 3, name: 'React', credit: '40' },
]

describe('CourseList', () => {
  test('renders 1 row when it receives an empty array', () => {
    render(<CourseList />)

    const table = screen.getByRole('table')
    expect(table).toBeInTheDocument()
    expect(within(table).getAllByRole('row')).toHaveLength(1)
  })

  test('renders 5 rows when it receives an array of course objects', () => {
    render(<CourseList courses={coursesList} />)

    const table = screen.getByRole('table')
    expect(table).toBeInTheDocument()
    expect(within(table).getAllByRole('row')).toHaveLength(5)
  })
})
