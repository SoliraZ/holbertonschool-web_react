import { render, screen, within } from '@testing-library/react'
import App from './App.jsx'

describe('App', () => {
  test('renders h1 with text School Dashboard', () => {
    render(<App />)
    expect(
      screen.getByRole('heading', { name: /school dashboard/i }),
    ).toBeInTheDocument()
  })

  test('renders the holberton logo image', () => {
    render(<App />)
    expect(
      screen.getByRole('img', { name: /holberton logo/i }),
    ).toBeInTheDocument()
  })

  test('renders notifications inside root-notifications', () => {
    render(<App />)
    const wrap = document.querySelector('.root-notifications')
    expect(wrap).toBeInTheDocument()
    expect(
      within(wrap).getByText(/here is the list of notifications/i),
    ).toBeInTheDocument()
    expect(within(wrap).getAllByRole('listitem')).toHaveLength(3)
    expect(within(wrap).getByText(/new course available/i)).toBeInTheDocument()
    expect(within(wrap).getByText(/new resume available/i)).toBeInTheDocument()
    expect(within(wrap).getByText(/urgent requirement/i)).toBeInTheDocument()
  })

  test('renders footer copyright text', () => {
    render(<App />)
    const year = new Date().getFullYear()
    expect(
      screen.getByText(
        new RegExp(`copyright\\s*${year}\\s*-\\s*holberton school`, 'i'),
      ),
    ).toBeInTheDocument()
  })

  test('renders the Login form when isLoggedIn is false', () => {
    render(<App />)

    expect(
      screen.getByText(/login to access the full dashboard/i),
    ).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /^ok$/i })).toBeInTheDocument()
    expect(screen.queryByRole('table')).not.toBeInTheDocument()
  })

  test('renders the CourseList table when isLoggedIn is true', () => {
    render(<App isLoggedIn={true} />)

    const table = screen.getByRole('table')
    expect(table).toBeInTheDocument()
    expect(table).toHaveAttribute('id', 'CourseList')
    expect(within(table).getAllByRole('row')).toHaveLength(5)
    expect(
      screen.queryByText(/login to access the full dashboard/i),
    ).not.toBeInTheDocument()
  })
})
