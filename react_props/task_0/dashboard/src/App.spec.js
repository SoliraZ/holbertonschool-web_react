import { render, screen, within } from '@testing-library/react'
import App from './App/App.jsx'

describe('App', () => {
  beforeEach(() => {
    render(<App />)
  })

  test('renders h1 with text School Dashboard', () => {
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
        new RegExp(
          `copyright\\s*${year}\\s+holberton school main dashboard`,
          'i',
        ),
      ),
    ).toBeInTheDocument()
  })

  test('renders the holberton logo image', () => {
    expect(
      screen.getByRole('img', { name: /holberton logo/i }),
    ).toBeInTheDocument()
  })

  test('renders notifications inside root-notifications', () => {
    const wrap = document.querySelector('.root-notifications')
    expect(wrap).toBeInTheDocument()
    expect(
      within(wrap).getByText(/here is the list of notifications/i),
    ).toBeInTheDocument()
  })
})
