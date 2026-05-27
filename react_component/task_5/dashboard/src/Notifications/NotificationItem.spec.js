import { fireEvent, render, screen } from '@testing-library/react'
import NotificationItem from './NotificationItem.jsx'

describe('NotificationItem component', () => {
  test('Vérification que le texte en data-notification-type: default soit bleu', () => {
    render(<NotificationItem type="default" value="New course available" />)
    const liElement = screen.getByRole('listitem')
    expect(liElement).toHaveAttribute('data-notification-type', 'default')
    expect(liElement).toHaveStyle({ color: 'blue' })
  })

  test('Vérification que le texte en data-notification-type: urgent soit rouge', () => {
    render(<NotificationItem type="urgent" value="New resume available" />)
    const liElement = screen.getByRole('listitem')
    expect(liElement).toHaveAttribute('data-notification-type', 'urgent')
    expect(liElement).toHaveStyle({ color: 'red' })
  })

  test('calls markAsRead when a notification item is clicked', () => {
    const markAsRead = jest.fn()
    render(
      <NotificationItem
        id={3}
        type="urgent"
        value="Urgent requirement - complete by EOD"
        markAsRead={markAsRead}
      />,
    )

    fireEvent.click(screen.getByRole('listitem'))
    expect(markAsRead).toHaveBeenCalledWith(3)
  })
})
