import { render, screen } from '@testing-library/react'
import App from './App'

test('renders school dashboard title', () => {
  render(<App />)
  expect(screen.getByRole('heading', { name: /School dashboard/i })).toBeInTheDocument()
})

test('renders login message', () => {
  render(<App />)
  expect(
    screen.getByText(/Login to access the full dashboard/i),
  ).toBeInTheDocument()
})
