import { cleanup, fireEvent, render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import mockAxios from 'jest-mock-axios'

const markNotificationAsReadRefs = []

jest.mock('../components/Notifications/Notifications.jsx', () => {
  const Actual = jest.requireActual('../components/Notifications/Notifications.jsx').default

  return {
    __esModule: true,
    default: function NotificationsWithSpy(props) {
      markNotificationAsReadRefs.push(props.markNotificationAsRead)
      return <Actual {...props} />
    },
  }
})

import App from '../App.jsx'

const rawNotifications = [
  { id: 1, type: 'default', value: 'New course available' },
  { id: 2, type: 'urgent', value: 'New resume available' },
  {
    id: 3,
    type: 'urgent',
    value: 'Urgent requirement - complete by EOD',
  },
]

const coursesList = [
  { id: 1, name: 'ES6', credit: 60 },
  { id: 2, name: 'Webpack', credit: 20 },
  { id: 3, name: 'React', credit: 40 },
]

function resolveNotificationsRequest() {
  mockAxios.mockResponseFor({ url: '/notifications.json' }, { data: rawNotifications })
}

function resolveCoursesRequest() {
  mockAxios.mockResponseFor({ url: '/courses.json' }, { data: coursesList })
}

async function openNotificationsDrawer(user) {
  const panelOpen =
    screen.queryByText(/here is the list of notifications/i) ||
    screen.queryByText(/no new notification for now/i)

  if (!panelOpen) {
    await user.click(screen.getByText(/your notifications/i))
  }

  await waitFor(() => {
    expect(
      screen.getByText(/here is the list of notifications/i),
    ).toBeInTheDocument()
  })
}

beforeEach(() => {
  markNotificationAsReadRefs.length = 0
  mockAxios.reset()
})

afterEach(() => {
  cleanup()
  mockAxios.reset()
})

describe('App data fetching', () => {
  test('retrieves notifications data when the App component loads initially', async () => {
    const user = userEvent.setup()
    render(<App />)

    expect(mockAxios.get).toHaveBeenCalledWith('/notifications.json')
    resolveNotificationsRequest()

    await openNotificationsDrawer(user)

    expect(screen.getByText('New course available')).toBeInTheDocument()
  })

  test('retrieves courses data whenever the user logs in', async () => {
    const user = userEvent.setup()
    render(<App />)

    resolveNotificationsRequest()

    expect(mockAxios.get).not.toHaveBeenCalledWith('/courses.json')

    await user.type(screen.getByLabelText(/email/i), 'test@example.com')
    await user.type(screen.getByLabelText(/password/i), '12345678')
    await user.click(screen.getByRole('button', { name: /^ok$/i }))

    await waitFor(() => {
      expect(mockAxios.get).toHaveBeenCalledWith('/courses.json')
    })

    resolveCoursesRequest()

    await waitFor(() => {
      expect(screen.getByText('ES6')).toBeInTheDocument()
    })
  })
})

describe('App drawer handlers', () => {
  test('handleHideDrawer hides the notifications drawer', async () => {
    const user = userEvent.setup()
    render(<App />)
    resolveNotificationsRequest()

    await openNotificationsDrawer(user)

    await user.click(screen.getByLabelText(/close/i))

    expect(
      screen.queryByText(/here is the list of notifications/i),
    ).not.toBeInTheDocument()
  })

  test('handleDisplayDrawer shows the notifications drawer', async () => {
    const user = userEvent.setup()
    render(<App />)
    resolveNotificationsRequest()

    await openNotificationsDrawer(user)

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
    resolveNotificationsRequest()

    await waitFor(() => {
      expect(mockAxios.get).toHaveBeenCalledWith('/notifications.json')
    })

    expect(
      screen.getByText(/login to access the full dashboard/i),
    ).toBeInTheDocument()
    expect(document.getElementById('logoutSection')).not.toBeInTheDocument()
    expect(screen.queryByText('ES6')).not.toBeInTheDocument()
  })

  test('LOGIN action updates email, password, and isLoggedIn', async () => {
    const user = userEvent.setup()
    render(<App />)
    resolveNotificationsRequest()

    await waitFor(() => {
      expect(mockAxios.get).toHaveBeenCalledWith('/notifications.json')
    })

    await user.type(screen.getByLabelText(/email/i), 'test@example.com')
    await user.type(screen.getByLabelText(/password/i), '12345678')
    await user.click(screen.getByRole('button', { name: /^ok$/i }))

    resolveCoursesRequest()

    await waitFor(() => {
      expect(screen.getByText('ES6')).toBeInTheDocument()
    })

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

  test('LOGOUT action clears user state and hides course list', async () => {
    const user = userEvent.setup()
    render(<App />)
    resolveNotificationsRequest()

    await waitFor(() => {
      expect(mockAxios.get).toHaveBeenCalledWith('/notifications.json')
    })

    await user.type(screen.getByLabelText(/email/i), 'test@example.com')
    await user.type(screen.getByLabelText(/password/i), '12345678')
    await user.click(screen.getByRole('button', { name: /^ok$/i }))

    resolveCoursesRequest()

    await waitFor(() => {
      expect(screen.getByText('ES6')).toBeInTheDocument()
    })

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

  test('MARK_NOTIFICATION_READ removes the notification from the list', async () => {
    const user = userEvent.setup()
    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {})
    render(<App />)
    resolveNotificationsRequest()

    await openNotificationsDrawer(user)

    const items = screen.getAllByRole('listitem')
    fireEvent.click(items[0])

    expect(logSpy).toHaveBeenCalledWith('Notification 1 has been marked as read')
    expect(screen.queryByText('New course available')).not.toBeInTheDocument()

    logSpy.mockRestore()
  })

  test('notifications state is unchanged through login and logout', async () => {
    const user = userEvent.setup()
    render(<App />)
    resolveNotificationsRequest()

    await openNotificationsDrawer(user)
    expect(screen.getByText('New course available')).toBeInTheDocument()

    await user.type(screen.getByLabelText(/email/i), 'test@example.com')
    await user.type(screen.getByLabelText(/password/i), '12345678')
    await user.click(screen.getByRole('button', { name: /^ok$/i }))

    resolveCoursesRequest()

    await waitFor(() => {
      expect(screen.getByText('ES6')).toBeInTheDocument()
    })

    expect(screen.getByText('New course available')).toBeInTheDocument()

    await user.click(screen.getByRole('link', { name: /logout/i }))

    expect(screen.getByText('New course available')).toBeInTheDocument()
  })
})

describe('App callback stability', () => {
  test('markNotificationAsRead keeps the same function reference between re-renders', async () => {
    const { rerender } = render(<App />)
    resolveNotificationsRequest()

    await waitFor(() => {
      expect(mockAxios.get).toHaveBeenCalledWith('/notifications.json')
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
    resolveNotificationsRequest()

    await waitFor(() => {
      expect(mockAxios.get).toHaveBeenCalledWith('/notifications.json')
    })

    expect(
      screen.getByRole('heading', { name: /school dashboard/i }),
    ).toBeInTheDocument()
  })

  test('body and footer paragraphs match the dashboard copy', async () => {
    render(<App />)
    resolveNotificationsRequest()

    await waitFor(() => {
      expect(mockAxios.get).toHaveBeenCalledWith('/notifications.json')
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
    resolveNotificationsRequest()

    await waitFor(() => {
      expect(mockAxios.get).toHaveBeenCalledWith('/notifications.json')
    })

    expect(
      screen.getByRole('img', { name: /holberton logo/i }),
    ).toBeInTheDocument()
  })
})
