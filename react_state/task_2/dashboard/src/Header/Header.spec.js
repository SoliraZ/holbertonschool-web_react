import { render, screen } from '@testing-library/react'
import Header from './Header.jsx'

describe('Header', () => {
  beforeEach(() => {
    render(<Header />)
  })

  test('contains the Holberton logo', () => {
    expect(
      screen.getByRole('img', { name: /holberton logo/i }),
    ).toBeInTheDocument()
  })

  test('contains an h1 heading with the correct text', () => {
    expect(
      screen.getByRole('heading', { level: 1, name: /school dashboard/i }),
    ).toBeInTheDocument()
  })
})
