import { render, screen } from '@testing-library/react'
import Footer from './Footer.jsx'

describe('Footer', () => {
  beforeEach(() => {
    render(<Footer />)
  })

  test('renders Copyright with current year and Holberton School when isIndex is true', () => {
    const year = new Date().getFullYear()
    expect(
      screen.getByText(
        new RegExp(`copyright\\s*${year}\\s*-\\s*holberton school`, 'i'),
      ),
    ).toBeInTheDocument()
  })
})
