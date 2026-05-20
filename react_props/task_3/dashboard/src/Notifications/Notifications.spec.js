import { render, screen, fireEvent } from '@testing-library/react'
import Notifications from './Notifications.jsx'
import { getLatestNotification } from '../utils/utils.js'

const notifications = [
  { id: 1, type: 'default', value: 'New course available' },
  { id: 2, type: 'urgent', value: 'New resume available' },
  {
    id: 3,
    type: 'urgent',
    value: getLatestNotification(),
    html: getLatestNotification(),
  },
]

describe('Notifications', () => {
  beforeEach(() => {
    render(<Notifications notifications={notifications} />)
  })

  test('renders the notifications title', () => {
    expect(
      screen.getByText(/here is the list of notifications/i),
    ).toBeInTheDocument()
  })

  test('renders a button in the notifications', () => {
    expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument()
  })

  test('renders 3 notification list items with the appropriate text', () => {
    const items = screen.getAllByRole('listitem')
    expect(items).toHaveLength(3)
    expect(screen.getByText(/new course available/i)).toBeInTheDocument()
    expect(screen.getByText(/new resume available/i)).toBeInTheDocument()
    expect(screen.getByText(/urgent requirement/i)).toBeInTheDocument()
    expect(screen.getByText(/complete by eod/i)).toBeInTheDocument()
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

describe('Notifications with empty notifications prop', () => {
  test('renders no list items when notifications prop is empty', () => {
    render(<Notifications notifications={[]} />)
    expect(screen.queryAllByRole('listitem')).toHaveLength(0)
  })
})
