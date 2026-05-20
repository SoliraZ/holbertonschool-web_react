import { render, screen, within } from '@testing-library/react'
import App from './src/App.jsx'

describe('test_0 App component', () => {
  test('renders h1 with School dashboard', () => {
    render(<App />)
    expect(
      screen.getByRole('heading', { level: 1, name: 'School dashboard' }),
    ).toBeInTheDocument()
  })

  test('renders login paragraph in App-body', () => {
    render(<App />)
    const body = document.querySelector('.App-body')
    expect(
      within(body).getByText('Login to access the full dashboard'),
    ).toBeInTheDocument()
  })

  test('renders footer with copyright Holberton School', () => {
    render(<App />)
    const footer = screen.getByRole('contentinfo')
    const year = new Date().getFullYear()
    expect(footer).toHaveTextContent(`Copyright ${year} - Holberton School`)
  })

  test('renders holberton logo', () => {
    render(<App />)
    expect(screen.getByAltText('holberton logo')).toBeInTheDocument()
  })
})
