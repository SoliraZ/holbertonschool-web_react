import { fireEvent, render, screen } from '@testing-library/react'
import Header from './Header.jsx'
import newContext from '../Context/context.js'

describe('Header', () => {
  test('contains the Holberton logo', () => {
    render(<Header />)
    expect(
      screen.getByRole('img', { name: /holberton logo/i }),
    ).toBeInTheDocument()
  })

  test('contains an h1 heading with the correct text', () => {
    render(<Header />)
    expect(
      screen.getByRole('heading', { level: 1, name: /school dashboard/i }),
    ).toBeInTheDocument()
  })

  test('does not render logoutSection when using the default context value', () => {
    render(<Header />)
    expect(document.getElementById('logoutSection')).not.toBeInTheDocument()
  })

  test('renders logoutSection when the user is logged in', () => {
    const contextValue = {
      user: {
        email: 'test@example.com',
        password: '12345678',
        isLoggedIn: true,
      },
      logOut: () => {},
    }

    render(
      <newContext.Provider value={contextValue}>
        <Header />
      </newContext.Provider>,
    )

    const logoutSection = document.getElementById('logoutSection')
    expect(logoutSection).toBeInTheDocument()
    expect(logoutSection).toHaveTextContent('Welcome test@example.com (logout)')
  })

  test('calls logOut when the logout link is clicked', () => {
    const logOut = jest.fn()
    const contextValue = {
      user: {
        email: 'test@example.com',
        password: '12345678',
        isLoggedIn: true,
      },
      logOut,
    }

    render(
      <newContext.Provider value={contextValue}>
        <Header />
      </newContext.Provider>,
    )

    fireEvent.click(screen.getByRole('link', { name: /logout/i }))
    expect(logOut).toHaveBeenCalledTimes(1)
  })
})
