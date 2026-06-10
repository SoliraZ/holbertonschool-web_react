import React from 'react'
import { cleanup, render, screen } from '@testing-library/react'
import WithLogging from './WithLogging.jsx'

class MockApp extends React.Component {
  render() {
    return <h1>Hello from Mock App Component</h1>
  }
}

describe('WithLogging', () => {
  afterEach(() => {
    cleanup()
    jest.restoreAllMocks()
  })

  test('renders a heading with text Hello from Mock App Component', () => {
    const WrappedMockApp = WithLogging(MockApp)
    render(<WrappedMockApp />)
    expect(
      screen.getByRole('heading', { name: /hello from mock app component/i }),
    ).toBeInTheDocument()
  })

  test('logs mount and unmount messages with wrapped component name', () => {
    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {})
    const WrappedMockApp = WithLogging(MockApp)
    const { unmount } = render(<WrappedMockApp />)

    expect(logSpy).toHaveBeenCalledWith('Component MockApp is mounted')
    unmount()
    expect(logSpy).toHaveBeenCalledWith(
      'Component MockApp is going to unmount',
    )
  })
})
