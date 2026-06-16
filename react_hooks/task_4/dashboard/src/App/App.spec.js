import { cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App.jsx'

afterEach(() => {
  cleanup()
})

describe('App drawer handlers', () => {
  test('handleHideDrawer hides the notifications drawer', async () => {
    const user = userEvent.setup()
    render(<App />)

    expect(
      screen.getByText(/here is the list of notifications/i),
    ).toBeInTheDocument()

    await user.click(screen.getByLabelText(/close/i))

    expect(
      screen.queryByText(/here is the list of notifications/i),
    ).not.toBeInTheDocument()
  })

  test('handleDisplayDrawer shows the notifications drawer', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByLabelText(/close/i))
    expect(
      screen.queryByText(/here is the list of notifications/i),
    ).not.toBeInTheDocument()

    await user.click(screen.getByText(/your notifications/i))
    expect(
      screen.getByText(/here is the list of notifications/i),
    ).toBeInTheDocument()
  })
})

describe('App login and logout state', () => {
  test('shows the login form when the user is not logged in', () => {
    render(<App />)

    expect(
      screen.getByText(/login to access the full dashboard/i),
    ).toBeInTheDocument()
    expect(document.getElementById('logoutSection')).not.toBeInTheDocument()
    expect(screen.queryByText('ES6')).not.toBeInTheDocument()
  })

  test('logIn updates email, password, and isLoggedIn in user state', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.type(screen.getByLabelText(/email/i), 'test@example.com')
    await user.type(screen.getByLabelText(/password/i), '12345678')
    await user.click(screen.getByRole('button', { name: /^ok$/i }))

    expect(screen.getByText('ES6')).toBeInTheDocument()
    expect(screen.getByText('Webpack')).toBeInTheDocument()
    expect(screen.getByText('React')).toBeInTheDocument()
    expect(
      screen.queryByText(/login to access the full dashboard/i),
    ).not.toBeInTheDocument()

    const logoutSection = document.getElementById('logoutSection')
    expect(logoutSection).toBeInTheDocument()
    expect(logoutSection).toHaveTextContent('Welcome test@example.com (logout)')
    expect(
      screen.getByRole('link', { name: /contact us/i }),
    ).toBeInTheDocument()
  })

  test('logOut clears email and password and sets isLoggedIn to false', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.type(screen.getByLabelText(/email/i), 'test@example.com')
    await user.type(screen.getByLabelText(/password/i), '12345678')
    await user.click(screen.getByRole('button', { name: /^ok$/i }))

    await user.click(screen.getByRole('link', { name: /logout/i }))

    expect(
      screen.getByText(/login to access the full dashboard/i),
    ).toBeInTheDocument()
    expect(document.getElementById('logoutSection')).not.toBeInTheDocument()
    expect(screen.queryByText('ES6')).not.toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toHaveValue('')
    expect(screen.getByLabelText(/password/i)).toHaveValue('')
    expect(
      screen.queryByRole('link', { name: /contact us/i }),
    ).not.toBeInTheDocument()
  })

  test('clicking a notification removes it and logs the expected message', () => {
    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {})
    render(<App />)

    expect(screen.getByText('New course available')).toBeInTheDocument()

    const items = screen.getAllByRole('listitem')
    fireEvent.click(items[0])

    expect(logSpy).toHaveBeenCalledWith('Notification 1 has been marked as read')
    expect(screen.queryByText('New course available')).not.toBeInTheDocument()

    logSpy.mockRestore()
  })
})

describe('App', () => {
  test('renders h1 with text School Dashboard', () => {
    render(<App />)
    expect(
      screen.getByRole('heading', { name: /school dashboard/i }),
    ).toBeInTheDocument()
  })

  test('body and footer paragraphs match the dashboard copy', () => {
    render(<App />)
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
    render(<App />)
    expect(
      screen.getByRole('img', { name: /holberton logo/i }),
    ).toBeInTheDocument()
  })

  test('renders notifications inside root-notifications', () => {
    render(<App />)
    const wrap = document.querySelector('.root-notifications')
    expect(wrap).toBeInTheDocument()
    expect(
      within(wrap).getByText(/your notifications/i),
    ).toBeInTheDocument()
  })

  test('displays News from the School title and paragraph by default', () => {
    render(<App />)
    expect(
      screen.getByRole('heading', { name: /news from the school/i }),
    ).toBeInTheDocument()
    expect(
      screen.getByText(/holberton school news goes here/i),
    ).toBeInTheDocument()
  })
})
