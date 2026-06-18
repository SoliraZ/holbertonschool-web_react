import { render, screen } from '@testing-library/react'
import BodySection from './BodySection.jsx'

describe('BodySection', () => {
  test('renders a heading with the title prop value', () => {
    render(<BodySection title="test title" />)
    expect(
      screen.getByRole('heading', { name: 'test title', level: 2 }),
    ).toBeInTheDocument()
  })

  test('renders any number of children passed to it', () => {
    render(
      <BodySection title="test">
        <p>child one</p>
        <p>child two</p>
      </BodySection>,
    )

    expect(screen.getByText('child one')).toBeInTheDocument()
    expect(screen.getByText('child two')).toBeInTheDocument()
  })
})
