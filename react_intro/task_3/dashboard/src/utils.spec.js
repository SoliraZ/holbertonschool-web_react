import {
  getCurrentYear,
  getFooterCopy,
  getLatestNotification,
} from './utils.js'

describe('utils', () => {
  test('getCurrentYear returns the current year', () => {
    const expectedYear = new Date().getFullYear()
    expect(getCurrentYear()).toBe(expectedYear)
  })

  test('getFooterCopy returns the correct string when the argument is true or false', () => {
    expect(getFooterCopy(true)).toBe('Holberton School')
    expect(getFooterCopy(false)).toBe('Holberton School main dashboard')
  })

  test('getLatestNotification returns the correct string', () => {
    expect(getLatestNotification()).toBe(
      '<strong>Urgent requirement</strong> - complete by EOD',
    )
  })
})
