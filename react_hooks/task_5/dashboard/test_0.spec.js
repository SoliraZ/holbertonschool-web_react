import { render, screen, within } from '@testing-library/react'
import App from './src/App.jsx'

describe('App component (checker test_0)', () => {
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
    const footer = document.querySelector('.App-footer')
    expect(
      within(body).getByText(/login to access the full dashboard/i),
    ).toBeInTheDocument()
    const year = new Date().getFullYear()
    expect(
      within(footer).getByText(
        new RegExp(`copyright\\s*${year}\\s*-\\s*holberton school`, 'i'),
      ),
    ).toBeInTheDocument()
  })

  test('renders the holberton logo image', () => {
    expect(
      screen.getByRole('img', { name: /holberton logo/i }),
    ).toBeInTheDocument()
  })
})
