import { render, screen, fireEvent } from '@testing-library/react'
import Notifications from './Notifications.jsx'
import { getLatestNotification } from '../utils/utils.js'

const notificationsList = [
  { id: 1, type: 'default', value: 'New course available' },
  { id: 2, type: 'urgent', value: 'New resume available' },
  {
    id: 3,
    type: 'urgent',
    html: getLatestNotification(),
  },
]

describe('Notifications component', () => {
  test("Vérification de la présence du message 'Here is the list of notifications'", () => {
    render(<Notifications displayDrawer={true} />)
    const notifTitle = screen.getByText(/here is the list of notifications/i)
    expect(notifTitle).toBeInTheDocument()
  })

  test('Vérification de la présence du bouton close', () => {
    render(<Notifications displayDrawer={true} />)
    const closeButton = screen.getByRole('button')
    expect(closeButton).toBeInTheDocument()
  })

  test('Vérification de la présence des 3 li', () => {
    render(
      <Notifications notifications={notificationsList} displayDrawer={true} />,
    )
    const liElements = screen.getAllByRole('listitem')
    expect(liElements).toHaveLength(3)
  })

  test('renders 3 notification items with appropriate text and styles', () => {
    render(
      <Notifications notifications={notificationsList} displayDrawer={true} />,
    )
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
    render(<Notifications displayDrawer={true} />)
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {})
    const closeButton = screen.getByRole('button')
    fireEvent.click(closeButton)
    expect(consoleSpy).toHaveBeenCalledWith('Close button has been clicked')
    consoleSpy.mockRestore()
  })

  test('displays drawer content when displayDrawer is true and notifications is not empty', () => {
    render(
      <Notifications notifications={notificationsList} displayDrawer={true} />,
    )

    expect(screen.getByText(/your notifications/i)).toBeInTheDocument()
    expect(screen.getByRole('button')).toBeInTheDocument()
    expect(
      screen.getByText(/here is the list of notifications/i),
    ).toBeInTheDocument()

    const liElements = screen.getAllByRole('listitem')
    expect(liElements[0]).toHaveTextContent(/new course available/i)
    expect(liElements[1]).toHaveTextContent(/new resume available/i)
    expect(liElements[2]).toHaveTextContent(/urgent requirement - complete by EOD/i)
  })

  test('displays No new notification for now when displayDrawer is true and notifications is empty', () => {
    render(<Notifications displayDrawer={true} />)

    expect(screen.getByText(/your notifications/i)).toBeInTheDocument()
    expect(screen.getByRole('button')).toBeInTheDocument()
    expect(
      screen.getByText(/here is the list of notifications/i),
    ).toBeInTheDocument()
    expect(
      screen.getByText(/no new notification for now/i),
    ).toBeInTheDocument()
  })

  test('does not display drawer content when displayDrawer is false', () => {
    render(<Notifications displayDrawer={false} />)

    expect(screen.getByText(/your notifications/i)).toBeInTheDocument()
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
    expect(screen.queryByRole('listitem')).not.toBeInTheDocument()
    expect(
      screen.queryByText(/here is the list of notifications/i),
    ).not.toBeInTheDocument()
  })
})
