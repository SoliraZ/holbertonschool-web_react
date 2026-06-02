import { fireEvent, render, screen } from '@testing-library/react'
import NotificationItem from './NotificationItem.jsx'

describe('NotificationItem component', () => {
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
