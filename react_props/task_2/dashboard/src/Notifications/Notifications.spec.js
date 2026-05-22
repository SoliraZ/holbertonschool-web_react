import { render, screen, fireEvent } from '@testing-library/react'
import Notifications from './Notifications.jsx'
import { getLatestNotification } from '../utils/utils.js'

const notificationsList = [
  { id: 1, type: 'default', value: 'New course available' },
  { id: 2, type: 'urgent', value: 'New resume available' },
  { id: 3, type: 'urgent', html: getLatestNotification() },
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

  test('Vérification du texte des 3 li', () => {
    render(<Notifications notifications={notificationsList} />)
    const liElements = screen.getAllByRole('listitem')
    expect(liElements[0]).toHaveTextContent(/new course available/i)
    expect(liElements[1]).toHaveTextContent(/new resume available/i)
    expect(liElements[2]).toHaveTextContent(
      /urgent requirement - complete by eod/i,
    )
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
