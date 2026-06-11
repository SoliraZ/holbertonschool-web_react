import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Login from './Login.jsx'

describe('Login', () => {
  beforeEach(() => {
    render(<Login />)
  })

  test('includes 2 labels, 2 inputs, and 1 button', () => {
    expect(document.querySelectorAll('label')).toHaveLength(2)
    expect(document.querySelectorAll('input')).toHaveLength(2)
    expect(screen.getByRole('button', { name: /^ok$/i })).toBeInTheDocument()
  })

  test('focuses the related input when a label is clicked', async () => {
    const user = userEvent.setup()
    const emailInput = document.getElementById('email')
    const passwordInput = document.getElementById('password')

    await user.click(screen.getByText(/email/i))
    expect(emailInput).toHaveFocus()

    await user.click(screen.getByText(/password/i))
    expect(passwordInput).toHaveFocus()
  })
})
