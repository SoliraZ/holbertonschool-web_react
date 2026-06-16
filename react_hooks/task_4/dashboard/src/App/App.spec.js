import { cleanup, fireEvent, render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import axios from 'axios'

const markNotificationAsReadRefs = []

jest.mock('../Notifications/Notifications.jsx', () => {
  const Actual = jest.requireActual('../Notifications/Notifications.jsx').default

  return {
    __esModule: true,
    default: function NotificationsWithSpy(props) {
      markNotificationAsReadRefs.push(props.markNotificationAsRead)
      return <Actual {...props} />
    },
  }
})

import App from './App.jsx'

const notificationsList = [
  { id: 1, type: 'default', value: 'New course available' },
  { id: 2, type: 'urgent', value: 'New resume available' },
  {
    id: 3,
    type: 'urgent',
    html: '<strong>Urgent requirement</strong> - complete by EOD',
  },
]

beforeEach(() => {
  markNotificationAsReadRefs.length = 0
  axios.get.mockResolvedValue({ data: notificationsList })
})

afterEach(() => {
  cleanup()
  jest.clearAllMocks()
})

describe('App drawer handlers', () => {
  test('handleHideDrawer hides the notifications drawer', async () => {
    const user = userEvent.setup()
    render(<App />)

    await waitFor(() => {
      expect(
        screen.getByText(/here is the list of notifications/i),
      ).toBeInTheDocument()
    })

    await user.click(screen.getByLabelText(/close/i))

    expect(
      screen.queryByText(/here is the list of notifications/i),
    ).not.toBeInTheDocument()
  })

  test('handleDisplayDrawer shows the notifications drawer', async () => {
    const user = userEvent.setup()
    render(<App />)

    await waitFor(() => {
      expect(
        screen.getByText(/here is the list of notifications/i),
      ).toBeInTheDocument()
    })

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
  test('shows the login form when the user is not logged in', async () => {
    render(<App />)

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith('/notifications.json')
    })

    expect(
      screen.getByText(/login to access the full dashboard/i),
    ).toBeInTheDocument()
    expect(document.getElementById('logoutSection')).not.toBeInTheDocument()
    expect(screen.queryByText('ES6')).not.toBeInTheDocument()
  })

  test('logIn updates email, password, and isLoggedIn in user state', async () => {
    const user = userEvent.setup()
    render(<App />)

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith('/notifications.json')
    })

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

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith('/notifications.json')
    })

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

  test('clicking a notification removes it and logs the expected message', async () => {
    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {})
    render(<App />)

    await waitFor(() => {
      expect(screen.getByText('New course available')).toBeInTheDocument()
    })

    const items = screen.getAllByRole('listitem')
    fireEvent.click(items[0])

    expect(logSpy).toHaveBeenCalledWith('Notification 1 has been marked as read')
    expect(screen.queryByText('New course available')).not.toBeInTheDocument()

    logSpy.mockRestore()
  })
})

describe('App callback stability', () => {
  test('markNotificationAsRead keeps the same function reference between re-renders', async () => {
    const { rerender } = render(<App />)

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith('/notifications.json')
    })

    rerender(<App />)
    rerender(<App />)

    expect(markNotificationAsReadRefs.length).toBeGreaterThanOrEqual(2)
    expect(markNotificationAsReadRefs[0]).toBe(markNotificationAsReadRefs[1])
  })
})

describe('App', () => {
  test('renders h1 with text School Dashboard', async () => {
    render(<App />)

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith('/notifications.json')
    })

    expect(
      screen.getByRole('heading', { name: /school dashboard/i }),
    ).toBeInTheDocument()
  })

  test('body and footer paragraphs match the dashboard copy', async () => {
    render(<App />)

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith('/notifications.json')
    })

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

  test('renders the holberton logo image', async () => {
    render(<App />)

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith('/notifications.json')
    })

    expect(
      screen.getByRole('img', { name: /holberton logo/i }),
    ).toBeInTheDocument()
  })

  test('renders notifications inside root-notifications', async () => {
    render(<App />)

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith('/notifications.json')
    })

    const wrap = document.querySelector('.root-notifications')
    expect(wrap).toBeInTheDocument()
    expect(
      within(wrap).getByText(/your notifications/i),
    ).toBeInTheDocument()
  })

  test('displays News from the School title and paragraph by default', async () => {
    render(<App />)

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith('/notifications.json')
    })

    expect(
      screen.getByRole('heading', { name: /news from the school/i }),
    ).toBeInTheDocument()
    expect(
      screen.getByText(/holberton school news goes here/i),
    ).toBeInTheDocument()
  })
})
