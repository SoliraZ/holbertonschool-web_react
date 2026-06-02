import { cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import App from './App.jsx'

afterEach(() => {
  cleanup()
})

test('should call logOut when Ctrl+h is pressed', () => {
  const logOutSpy = jest.fn()
  const logOutAlertSpy = jest
    .spyOn(window, 'alert')
    .mockImplementation(() => {})
  render(<App isLoggedIn={true} logOut={logOutSpy} />)
  fireEvent.keyDown(document, { key: 'h', ctrlKey: true })
  expect(logOutSpy).toHaveBeenCalledTimes(1)
  logOutAlertSpy.mockRestore()
})

test('should call alert with Logging you out when Ctrl+h is pressed', () => {
  const logOutAlertSpy = jest
    .spyOn(window, 'alert')
    .mockImplementation(() => {})
  render(<App isLoggedIn={true} />)
  fireEvent.keyDown(document, { key: 'h', ctrlKey: true })
  expect(logOutAlertSpy).toHaveBeenCalledWith('Logging you out')
  logOutAlertSpy.mockRestore()
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
      within(wrap).getByText(/here is the list of notifications/i),
    ).toBeInTheDocument()
    expect(within(wrap).getAllByRole('listitem')).toHaveLength(3)
    expect(within(wrap).getByText(/new course available/i)).toBeInTheDocument()
    expect(within(wrap).getByText(/new resume available/i)).toBeInTheDocument()
    expect(within(wrap).getByText(/urgent requirement/i)).toBeInTheDocument()
  })
})
