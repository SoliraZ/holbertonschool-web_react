import { render, screen } from '@testing-library/react'
import App from './src/App.jsx'

describe('App login UI (checker appTest)', () => {
  test('validates email/password labels, login text, and OK button', () => {
    render(<App />)

    expect(screen.getAllByLabelText(/email|password/i)).toHaveLength(2)
    expect(
      screen.getByText(/login to access the full dashboard/i),
    ).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()

    const button = screen.getByRole('button', { name: /ok/i })
    expect(button).toBeInTheDocument()
    expect(button).not.toBeDisabled()
  })
})
