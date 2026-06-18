import { getCurrentYear, getFooterCopy } from './src/utils/utils.js'

describe('utils functions (checker)', () => {
  test('getCurrentYear returns the current year', () => {
    expect(getCurrentYear()).toBe(new Date().getFullYear())
  })

  test('getFooterCopy(true) returns Holberton School', () => {
    expect(getFooterCopy(true)).toBe('Holberton School')
  })

  test('getFooterCopy(false) returns Holberton School main dashboard', () => {
    expect(getFooterCopy(false)).toBe('Holberton School main dashboard')
  })
})
