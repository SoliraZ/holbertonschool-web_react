import { render, screen } from '@testing-library/react'
import { renderHook, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Login from './Login.jsx'
import useLogin from '../../hooks/useLogin.jsx'

describe('Login', () => {
  beforeEach(() => {
    render(<Login />)
  })

  test('includes 2 labels, 2 inputs, and 1 button', () => {
    expect(document.querySelectorAll('label')).toHaveLength(2)
    expect(document.querySelectorAll('input')).toHaveLength(3)
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

  test('submit button is disabled by default', () => {
    expect(screen.getByRole('button', { name: /^ok$/i })).toBeDisabled()
  })

  test('submit button stays disabled for invalid email formats', async () => {
    const user = userEvent.setup()
    const submitButton = screen.getByRole('button', { name: /^ok$/i })
    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText(/password/i)

    await user.type(passwordInput, '12345678')

    const invalidEmails = [
      'invalid',
      'aaa@',
      'aaa@aaa',
      'aaa@.aaa.com',
      'test@example.c',
      '@aaa.com',
    ]

    for (const invalidEmail of invalidEmails) {
      await user.clear(emailInput)
      await user.type(emailInput, invalidEmail)
      expect(submitButton).toBeDisabled()
    }

    await user.clear(emailInput)
    await user.type(emailInput, 'test@example.com')
    expect(submitButton).toBeEnabled()
  })

  test('submit button is enabled only when email and password meet the required criteria', async () => {
    const user = userEvent.setup()
    const submitButton = screen.getByRole('button', { name: /^ok$/i })
    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText(/password/i)

    await user.type(emailInput, 'invalid')
    await user.type(passwordInput, 'short')
    expect(submitButton).toBeDisabled()

    await user.clear(emailInput)
    await user.clear(passwordInput)
    await user.type(emailInput, 'test@example.com')
    await user.type(passwordInput, '1234567')
    expect(submitButton).toBeDisabled()

    await user.type(passwordInput, '8')
    expect(submitButton).toBeEnabled()
  })
})

test('calls logIn with email and password when the form is submitted', async () => {
  const logIn = jest.fn()
  const user = userEvent.setup()
  render(<Login logIn={logIn} />)

  await user.type(screen.getByLabelText(/email/i), 'test@example.com')
  await user.type(screen.getByLabelText(/password/i), '12345678')
  await user.click(screen.getByRole('button', { name: /^ok$/i }))

  expect(logIn).toHaveBeenCalledWith('test@example.com', '12345678')
})

describe('useLogin hook', () => {
  test('initialises with empty values and submit disabled', () => {
    const onLogin = jest.fn()
    const { result } = renderHook(() => useLogin(onLogin))

    expect(result.current.email).toBe('')
    expect(result.current.password).toBe('')
    expect(result.current.enableSubmit).toBe(false)
  })

  test('enables submit only when email is valid and password >= 8 chars', () => {
    const onLogin = jest.fn()
    const { result } = renderHook(() => useLogin(onLogin))

    act(() => {
      result.current.handleChangeEmail({ target: { value: 'test@example.com' } })
    })
    expect(result.current.enableSubmit).toBe(false)

    act(() => {
      result.current.handleChangePassword({ target: { value: '1234567' } })
    })
    expect(result.current.enableSubmit).toBe(false)

    act(() => {
      result.current.handleChangePassword({ target: { value: '12345678' } })
    })
    expect(result.current.enableSubmit).toBe(true)
  })

  test('keeps submit disabled for invalid email formats', () => {
    const onLogin = jest.fn()
    const { result } = renderHook(() => useLogin(onLogin))

    act(() => {
      result.current.handleChangePassword({ target: { value: '12345678' } })
    })

    const invalidEmails = ['invalid', 'aaa@', 'aaa@aaa', '@aaa.com']
    for (const email of invalidEmails) {
      act(() => {
        result.current.handleChangeEmail({ target: { value: email } })
      })
      expect(result.current.enableSubmit).toBe(false)
    }
  })

  test('calls onLogin with email and password on submit', () => {
    const onLogin = jest.fn()
    const { result } = renderHook(() => useLogin(onLogin))

    act(() => {
      result.current.handleChangeEmail({ target: { value: 'test@example.com' } })
      result.current.handleChangePassword({ target: { value: '12345678' } })
    })

    act(() => {
      result.current.handleLoginSubmit({ preventDefault: () => {} })
    })

    expect(onLogin).toHaveBeenCalledWith('test@example.com', '12345678')
  })
})
