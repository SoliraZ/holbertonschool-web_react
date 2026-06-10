import { cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App.jsx'

afterEach(() => {
  cleanup()
})

test('should call logOut when Ctrl+h is pressed', async () => {
  const user = userEvent.setup()
  const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {})
  render(<App />)

  await user.type(screen.getByLabelText(/email/i), 'test@example.com')
  await user.type(screen.getByLabelText(/password/i), '12345678')
  await user.click(screen.getByRole('button', { name: /^ok$/i }))

  expect(screen.getByText('ES6')).toBeInTheDocument()

  fireEvent.keyDown(document, { key: 'h', ctrlKey: true })

  expect(alertSpy).toHaveBeenCalledWith('Logging you out')
  expect(
    screen.getByText(/login to access the full dashboard/i),
  ).toBeInTheDocument()

  alertSpy.mockRestore()
})

test('should call alert with Logging you out when Ctrl+h is pressed', () => {
  const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {})
  render(<App />)
  fireEvent.keyDown(document, { key: 'h', ctrlKey: true })
  expect(alertSpy).toHaveBeenCalledWith('Logging you out')
  alertSpy.mockRestore()
})

describe('App', () => {
  test('renders h1 with text School Dashboard', () => {
    render(<App />)
    expect(
      screen.getByRole('heading', { name: /school dashboard/i }),
    ).toBeInTheDocument()
  })

  test('body and footer paragraphs match the dashboard copy', () => {
    render(<App />)
    const body = document.querySelector('.App-body')
    const footer = document.querySelector('.App-footer')
    expect(
      within(body).getByText(/login to access the full dashboard/i),
    ).toBeInTheDocument()
    const year = new Date().getFullYear()
    expect(
      within(footer).getByText(
        new RegExp(`copyright\\s*${year}\\s*-\\s*holberton school`, 'i'),
      ),
    ).toBeInTheDocument()
  })

  test('renders the holberton logo image', () => {
    render(<App />)
    expect(
      screen.getByRole('img', { name: /holberton logo/i }),
    ).toBeInTheDocument()
  })

  test('renders notifications inside root-notifications', () => {
    render(<App />)
    const wrap = document.querySelector('.root-notifications')
    expect(wrap).toBeInTheDocument()
    expect(
      within(wrap).getByText(/your notifications/i),
    ).toBeInTheDocument()
  })

  test('displays News from the School title and paragraph by default', () => {
    render(<App />)
    expect(
      screen.getByRole('heading', { name: /news from the school/i }),
    ).toBeInTheDocument()
    expect(
      screen.getByText(/holberton school news goes here/i),
    ).toBeInTheDocument()
  })

  test('renders CourseList after successful login', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.type(screen.getByLabelText(/email/i), 'test@example.com')
    await user.type(screen.getByLabelText(/password/i), '12345678')
    await user.click(screen.getByRole('button', { name: /^ok$/i }))

    expect(screen.getByText('ES6')).toBeInTheDocument()
    expect(screen.getByText('Webpack')).toBeInTheDocument()
    expect(screen.getByText('React')).toBeInTheDocument()
    expect(
      screen.queryByText(/login to access the full dashboard/i),
    ).not.toBeInTheDocument()
  })
})
