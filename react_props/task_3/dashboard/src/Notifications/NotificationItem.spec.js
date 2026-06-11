import { render, screen } from '@testing-library/react'
import NotificationItem from './NotificationItem.jsx'

describe('NotificationItem', () => {
  test('renders default notification with blue color and data-notification-type default', () => {
    render(
      <ul>
        <NotificationItem type="default" value="New course available" html={false} />
      </ul>,
    )
    const item = screen.getByRole('listitem')
    expect(item).toHaveAttribute('data-notification-type', 'default')
    expect(item).toHaveStyle({ color: 'blue' })
    expect(item).toHaveTextContent('New course available')
  })

  test('renders urgent notification with red color and data-notification-type urgent', () => {
    render(
      <ul>
        <NotificationItem type="urgent" value="New resume available" html={false} />
      </ul>,
    )
    const item = screen.getByRole('listitem')
    expect(item).toHaveAttribute('data-notification-type', 'urgent')
    expect(item).toHaveStyle({ color: 'red' })
    expect(item).toHaveTextContent('New resume available')
  })

  test('changes color when type prop changes from default to urgent', () => {
    const { rerender } = render(
      <ul>
        <NotificationItem type="default" value="New course available" html={false} />
      </ul>,
    )

    const item = screen.getByRole('listitem')
    expect(item).toHaveStyle({ color: 'blue' })

    rerender(
      <ul>
        <NotificationItem type="urgent" value="New course available" html={false} />
      </ul>,
    )

    expect(item).toHaveStyle({ color: 'red' })
    expect(item).toHaveAttribute('data-notification-type', 'urgent')
  })

  test('changes color when type prop changes from urgent to default', () => {
    const { rerender } = render(
      <ul>
        <NotificationItem type="urgent" value="New resume available" html={false} />
      </ul>,
    )

    const item = screen.getByRole('listitem')
    expect(item).toHaveStyle({ color: 'red' })

    rerender(
      <ul>
        <NotificationItem type="default" value="New resume available" html={false} />
      </ul>,
    )

    expect(item).toHaveStyle({ color: 'blue' })
    expect(item).toHaveAttribute('data-notification-type', 'default')
  })
})
