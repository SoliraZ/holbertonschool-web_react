import { configureStore } from '@reduxjs/toolkit'
import notificationsReducer, {
  markNotificationAsRead,
  showDrawer,
  hideDrawer,
  fetchNotifications,
} from '../notifications/notificationsSlice.js'

const initialState = {
  notifications: [],
  displayDrawer: true,
}

const mockNotifications = [
  { id: 1, type: 'default', value: 'New course available' },
  { id: 2, type: 'urgent', value: 'New resume available' },
  { id: 3, type: 'urgent', value: 'Urgent requirement - complete by EOD' },
]

describe('notificationsSlice', () => {
  test('returns the correct initial state by default', () => {
    expect(notificationsReducer(undefined, { type: '@@INIT' })).toEqual(
      initialState,
    )
  })

  test('fetches notifications data correctly', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockNotifications),
      }),
    )

    const store = configureStore({
      reducer: { notifications: notificationsReducer },
    })

    await store.dispatch(fetchNotifications())
    const state = store.getState().notifications

    expect(state.notifications).toHaveLength(3)
    expect(state.notifications[0].value).toBe('New course available')
    expect(state.notifications[1].value).toBe('New resume available')
    expect(state.notifications[2].html).toBeDefined()

    global.fetch.mockRestore()
  })

  test('removes a notification when markNotificationAsRead is dispatched', () => {
    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {})

    const state = notificationsReducer(
      { notifications: mockNotifications, displayDrawer: true },
      markNotificationAsRead(1),
    )

    expect(state.notifications).toHaveLength(2)
    expect(state.notifications.find((n) => n.id === 1)).toBeUndefined()
    expect(logSpy).toHaveBeenCalledWith(
      'Notification 1 has been marked as read',
    )

    logSpy.mockRestore()
  })

  test('sets displayDrawer to false when hideDrawer is dispatched', () => {
    const state = notificationsReducer(undefined, hideDrawer())
    expect(state.displayDrawer).toBe(false)
  })

  test('sets displayDrawer to true when showDrawer is dispatched', () => {
    const hiddenState = { notifications: [], displayDrawer: false }
    const state = notificationsReducer(hiddenState, showDrawer())
    expect(state.displayDrawer).toBe(true)
  })
})
