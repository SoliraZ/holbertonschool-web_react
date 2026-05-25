import { fireEvent, render, screen, within } from '@testing-library/react'
import App from './App.jsx'

describe('App', () => {
  let logOutMock
  let alertMock

  beforeEach(() => {
    logOutMock = jest.fn()
    alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {})
  })

  afterEach(() => {
    alertMock.mockRestore()
  })

  test('calls logOut once when control and h keys are pressed', () => {
    render(<App logOut={logOutMock} />)
    fireEvent.keyDown(document, { key: 'h', ctrlKey: true })
    expect(logOutMock).toHaveBeenCalledTimes(1)
  })

  test('calls alert with Logging you out when control and h keys are pressed', () => {
    render(<App logOut={logOutMock} />)
    fireEvent.keyDown(document, { key: 'h', ctrlKey: true })
    expect(alertMock).toHaveBeenCalledWith('Logging you out')
  })

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
