import { fireEvent, render, screen } from '@testing-library/react'
import Header from './Header.jsx'

const loggedInUser = {
  email: 'test@example.com',
  password: '12345678',
  isLoggedIn: true,
}

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

  test('does not render logoutSection when user is not logged in', () => {
    render(<Header />)
    expect(document.getElementById('logoutSection')).not.toBeInTheDocument()
  })

  test('renders logoutSection when the user is logged in', () => {
    render(<Header user={loggedInUser} logOut={() => {}} />)

    const logoutSection = document.getElementById('logoutSection')
    expect(logoutSection).toBeInTheDocument()
    expect(logoutSection).toHaveTextContent('Welcome test@example.com (logout)')
  })

  test('calls logOut when the logout link is clicked', () => {
    const logOut = jest.fn()
    render(<Header user={loggedInUser} logOut={logOut} />)

    fireEvent.click(screen.getByRole('link', { name: /logout/i }))
    expect(logOut).toHaveBeenCalledTimes(1)
  })
})
