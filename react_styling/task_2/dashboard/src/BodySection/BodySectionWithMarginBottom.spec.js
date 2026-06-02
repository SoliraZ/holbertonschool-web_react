import { render } from '@testing-library/react'
import BodySectionWithMarginBottom from './BodySectionWithMarginBottom.jsx'

describe('BodySectionWithMarginBottom', () => {
  test('contains a div with class bodySectionWithMargin', () => {
    const { container } = render(
      <BodySectionWithMarginBottom title="test title">
        <p>child</p>
      </BodySectionWithMarginBottom>,
    )

    expect(container.querySelector('.bodySectionWithMargin')).toBeInTheDocument()
  })

  test('renders the BodySection component', () => {
    const { container } = render(
      <BodySectionWithMarginBottom title="test title">
        <p>child</p>
      </BodySectionWithMarginBottom>,
    )

    expect(container.querySelector('.bodySection')).toBeInTheDocument()
  })
})

