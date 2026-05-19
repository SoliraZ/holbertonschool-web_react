import { render, screen } from '@testing-library/react'
import Notifications from './Notifications.jsx'

describe('Notifications', () => {
  beforeEach(() => {
    render(<Notifications />)
  })

  test('renders the notifications title', () => {
    expect(
      screen.getByText(/here is the list of notifications/i),
    ).toBeInTheDocument()
  })
})
