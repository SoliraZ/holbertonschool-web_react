import { render, screen } from '@testing-library/react'
import Footer from './Footer.jsx'
import newContext from '../Context/context.js'

describe('Footer', () => {
  test('renders Copyright with current year and Holberton School when isIndex is true', () => {
    render(<Footer />)
    const year = new Date().getFullYear()
    expect(
      screen.getByText(
        new RegExp(`copyright\\s*${year}\\s*-\\s*holberton school`, 'i'),
      ),
    ).toBeInTheDocument()
  })

  test('does not display the Contact us link when the user is logged out', () => {
    render(<Footer />)
    expect(
      screen.queryByRole('link', { name: /contact us/i }),
    ).not.toBeInTheDocument()
  })

  test('displays the Contact us link when the user is logged in', () => {
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
        <Footer />
      </newContext.Provider>,
    )

    expect(
      screen.getByRole('link', { name: /contact us/i }),
    ).toBeInTheDocument()
  })
})
