import { render, screen } from '@testing-library/react'
import CourseList from './CourseList.jsx'

const courses = [
  { id: 1, name: 'ES6', credit: 60 },
  { id: 2, name: 'Webpack', credit: 20 },
  { id: 3, name: 'React', credit: 40 },
]

describe('CourseList', () => {
  test('renders "No course available yet" when courses is empty', () => {
    render(<CourseList />)
    expect(screen.getByText(/no course available yet/i)).toBeInTheDocument()
  })

  test('renders "Available courses" header when courses are provided', () => {
    render(<CourseList courses={courses} />)
    expect(screen.getByText(/available courses/i)).toBeInTheDocument()
  })

  test('renders all course names', () => {
    render(<CourseList courses={courses} />)
    expect(screen.getByText('ES6')).toBeInTheDocument()
    expect(screen.getByText('Webpack')).toBeInTheDocument()
    expect(screen.getByText('React')).toBeInTheDocument()
  })
})
