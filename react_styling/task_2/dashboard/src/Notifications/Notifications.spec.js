import { render, fireEvent, screen } from '@testing-library/react'
import Notifications from './Notifications.jsx'
import { getLatestNotification } from '../utils/utils.js'

const notificationsList = [
  { id: 1, type: 'default', value: 'New course available' },
  { id: 2, type: 'urgent', value: 'New resume available' },
  {
    id: 3,
    type: 'urgent',
    value: 'Urgent requirement - complete by EOD',
    html: getLatestNotification(),
  },
]

test('should render title', () => {
  render(<Notifications notifications={notificationsList} />)
  expect(screen.getByText(/here is the list of notifications/i)).toBeInTheDocument()
})

test('should render without crashing when no notifications prop is passed', () => {
  render(<Notifications />)
  expect(
    screen.getByText(/no new notification for now/i),
  ).toBeInTheDocument()
  expect(screen.queryByLabelText(/close/i)).not.toBeInTheDocument()
  expect(screen.queryAllByRole('listitem')).toHaveLength(0)
})

test('should render button in notifications', () => {
  render(<Notifications notifications={notificationsList} />)
  expect(screen.getByLabelText(/close/i)).toBeInTheDocument()
})

test('should render 3 notification items with appropriate texts and styles', () => {
  render(<Notifications notifications={notificationsList} />)
  const items = screen.getAllByRole('listitem')

  expect(items).toHaveLength(3)

  expect(items[0]).toHaveTextContent('New course available')
  expect(items[0]).toHaveAttribute('data-notification-type', 'default')
  expect(items[0]).toHaveStyle({ color: 'blue' })

  expect(items[1]).toHaveTextContent('New resume available')
  expect(items[1]).toHaveAttribute('data-notification-type', 'urgent')
  expect(items[1]).toHaveStyle({ color: 'red' })

  expect(items[2]).toHaveTextContent('Urgent requirement - complete by EOD')
  expect(items[2]).toHaveAttribute('data-notification-type', 'urgent')
  expect(items[2]).toHaveStyle({ color: 'red' })

  const strongElement = items[2].querySelector('strong')
  expect(strongElement).toBeInTheDocument()
  expect(strongElement).toHaveTextContent('Urgent requirement')
})

test('should log message when close button is clicked', () => {
  const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {})
  render(<Notifications notifications={notificationsList} />)
  fireEvent.click(screen.getByLabelText(/close/i))
  expect(logSpy).toHaveBeenCalledWith(
    expect.stringMatching(/close button has been clicked/i),
  )
  logSpy.mockRestore()
})

test('should call markAsRead and log notification id when a notification item is clicked', () => {
  const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {})
  render(<Notifications notifications={notificationsList} />)

  const items = screen.getAllByRole('listitem')
  fireEvent.click(items[1])

  expect(logSpy).toHaveBeenCalledWith('Notification 2 has been marked as read')
  logSpy.mockRestore()
})

test("doesn't re-render if notifications prop length remains the same", () => {
  const initialNotifications = [
    { id: 1, type: 'default', value: 'first notification' },
    { id: 2, type: 'urgent', value: 'second notification' },
  ]
  const sameLengthNotifications = [
    { id: 1, type: 'default', value: 'updated first notification' },
    { id: 2, type: 'urgent', value: 'updated second notification' },
  ]

  const { rerender } = render(
    <Notifications notifications={initialNotifications} />,
  )
  rerender(<Notifications notifications={sameLengthNotifications} />)

  expect(screen.getByText('first notification')).toBeInTheDocument()
  expect(screen.getByText('second notification')).toBeInTheDocument()
  expect(screen.queryByText('updated first notification')).not.toBeInTheDocument()
  expect(screen.queryByText('updated second notification')).not.toBeInTheDocument()
})

test('re-renders when notifications prop length changes', () => {
  const initialNotifications = [
    { id: 1, type: 'default', value: 'first notification' },
    { id: 2, type: 'urgent', value: 'second notification' },
  ]
  const longerNotifications = [
    { id: 1, type: 'default', value: 'first notification' },
    { id: 2, type: 'urgent', value: 'second notification' },
    { id: 3, type: 'default', value: 'third notification' },
  ]

  const { rerender } = render(
    <Notifications notifications={initialNotifications} />,
  )
  rerender(<Notifications notifications={longerNotifications} />)

  expect(screen.getByText('third notification')).toBeInTheDocument()
})
