import { render, screen, within } from '@testing-library/react'
import App from './App.jsx'

describe('App', () => {
  beforeEach(() => {
    render(<App />)
  })

  test('renders h1 with text School dashboard', () => {
    expect(
      screen.getByRole('heading', { name: /school dashboard/i }),
    ).toBeInTheDocument()
  })

  test('body and footer paragraphs match the dashboard copy', () => {
    const body = document.querySelector('.App-body')
    const footer = screen.getByRole('contentinfo')
    expect(
      within(body).getByText(/login to access the full dashboard/i),
    ).toBeInTheDocument()
    const year = new Date().getFullYear()
    expect(footer).toHaveTextContent(
      `Copyright ${year} - Holberton School`,
    )
  })

  test('renders the holberton logo image', () => {
    expect(
      screen.getByRole('img', { name: /holberton logo/i }),
    ).toBeInTheDocument()
  })
})
