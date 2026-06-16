import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './src/App.jsx'

describe('label focus (checker inputFocusTest)', () => {
  test('clicking email label focuses the email input', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByText(/email/i))
    expect(screen.getByLabelText(/email/i)).toHaveFocus()
  })

  test('clicking password label focuses the password input', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByText(/password/i))
    expect(screen.getByLabelText(/password/i)).toHaveFocus()
  })
})
