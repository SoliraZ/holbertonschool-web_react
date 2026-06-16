import '@testing-library/jest-dom'

jest.mock('axios', () => ({
  __esModule: true,
  default: {
    get: jest.fn(() =>
      Promise.resolve({
        data: [
          { id: 1, type: 'default', value: 'New course available' },
          { id: 2, type: 'urgent', value: 'New resume available' },
          {
            id: 3,
            type: 'urgent',
            html: '<strong>Urgent requirement</strong> - complete by EOD',
          },
        ],
      }),
    ),
  },
}))
