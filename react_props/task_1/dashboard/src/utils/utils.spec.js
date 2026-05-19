import { getCurrentYear, getFooterCopy } from './utils.js'

describe('utils', () => {
  it('getCurrentYear returns a number', () => {
    expect(typeof getCurrentYear()).toBe('number')
  })

  it('getFooterCopy returns expected strings', () => {
    expect(getFooterCopy(true)).toBe('Holberton School')
    expect(getFooterCopy(false)).toBe('Holberton School main dashboard')
  })
})
