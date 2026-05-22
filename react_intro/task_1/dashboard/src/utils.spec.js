import { getCurrentYear, getFooterCopy } from './utils.js'

describe('utils', () => {
  test('getCurrentYear returns the current year', () => {
    expect(getCurrentYear()).toBe(new Date().getFullYear())
  })

  test('getFooterCopy returns Holberton School when isIndex is true', () => {
    expect(getFooterCopy(true)).toBe('Holberton School')
  })

  test('getFooterCopy returns main dashboard text when isIndex is false', () => {
    expect(getFooterCopy(false)).toBe('Holberton School main dashboard')
  })
})
