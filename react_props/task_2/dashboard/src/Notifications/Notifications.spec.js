import { render, screen, fireEvent } from '@testing-library/react'
import Notifications from './Notifications.jsx'
import { getLatestNotification } from '../utils/utils.js'

const notificationsList = [
  { id: 1, type: 'default', value: 'New course available' },
  { id: 2, type: 'urgent', value: 'New resume available' },
  {
    id: 3,
    type: 'urgent',
    value: getLatestNotification(),
    html: getLatestNotification(),
  },
]

describe('Notifications component', () => {
  test("Vérification de la présence du message 'Here is the list of notifications'", () => {
    render(<Notifications />)
    const notifTitle = screen.getByText(/here is the list of notifications/i)
    expect(notifTitle).toBeInTheDocument()
  })

  test('Vérification de la présence du bouton close', () => {
    render(<Notifications />)
    const closeButton = screen.getByRole('button')
    expect(closeButton).toBeInTheDocument()
  })

  test('Vérification de la présence des 3 li', () => {
    render(<Notifications notifications={notificationsList} />)
    const liElements = screen.getAllByRole('listitem')
    expect(liElements).toHaveLength(3)
  })

  test('renders 3 notification items with appropriate text and styles', () => {
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

  test("Vérification de l'eventHandler 'click' sur le bouton", () => {
    render(<Notifications />)
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {})
    const closeButton = screen.getByRole('button')
    fireEvent.click(closeButton)
    expect(consoleSpy).toHaveBeenCalledWith('Close button has been clicked')
    consoleSpy.mockRestore()
  })
})
