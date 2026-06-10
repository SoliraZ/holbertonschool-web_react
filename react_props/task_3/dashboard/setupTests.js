import '@testing-library/jest-dom'
import { cleanup, render } from '@testing-library/react'
import { createElement } from 'react'

beforeAll(() => {
  render(createElement('div', null, 'warmup'))
  cleanup()
})
