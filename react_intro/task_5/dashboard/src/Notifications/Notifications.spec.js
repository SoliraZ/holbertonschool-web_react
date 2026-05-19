import { render, screen, fireEvent } from '@testing-library/react'
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

  test('renders a button in the notifications', () => {
    expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument()
  })

  test('renders 3 notification list items', () => {
    const items = screen.getAllByRole('listitem')
    expect(items).toHaveLength(3)
  })

  test('logs to the console when the close button is clicked', () => {
    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {})

    fireEvent.click(screen.getByRole('button', { name: /close/i }))

    expect(logSpy).toHaveBeenCalledWith(
      expect.stringMatching(/close button has been clicked/i),
    )

    logSpy.mockRestore()
  })
})
