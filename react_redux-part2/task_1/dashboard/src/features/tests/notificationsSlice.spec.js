import { configureStore } from '@reduxjs/toolkit';
import mockAxios from 'jest-mock-axios';
import notificationsReducer, {
  markNotificationAsRead,
  fetchNotifications,
} from '../notifications/notificationsSlice.js';

afterEach(() => {
  mockAxios.reset();
});

const initialState = {
  notifications: [],
  loading: false,
};

const mockNotificationsData = [
  { id: 1, type: 'default', value: 'New course available' },
  { id: 2, type: 'urgent', value: 'New resume available' },
  { id: 3, type: 'urgent', html: { __html: '' } },
];

describe('notificationsSlice', () => {
  test('returns the correct initial state by default', () => {
    expect(notificationsReducer(undefined, { type: '@@INIT' })).toEqual(
      initialState,
    );
  });

  test('sets loading to true when fetchNotifications is pending', () => {
    const state = notificationsReducer(undefined, fetchNotifications.pending());
    expect(state.loading).toBe(true);
  });

  test('sets loading to false and populates notifications when fetchNotifications is fulfilled', async () => {
    const store = configureStore({
      reducer: { notifications: notificationsReducer },
    });

    const dispatchPromise = store.dispatch(fetchNotifications());

    expect(store.getState().notifications.loading).toBe(true);

    mockAxios.mockResponse({
      data: { notifications: mockNotificationsData },
    });

    await dispatchPromise;
    const state = store.getState().notifications;

    expect(state.loading).toBe(false);
    expect(state.notifications).toHaveLength(3);
    expect(state.notifications[0].value).toBe('New course available');
    expect(state.notifications[1].value).toBe('New resume available');
    expect(state.notifications[2].html.__html).toContain('Urgent requirement');
  });

  test('sets loading to false when fetchNotifications is rejected', async () => {
    const store = configureStore({
      reducer: { notifications: notificationsReducer },
    });

    const dispatchPromise = store.dispatch(fetchNotifications());

    expect(store.getState().notifications.loading).toBe(true);

    mockAxios.mockError(new Error('Network error'));

    await dispatchPromise;
    expect(store.getState().notifications.loading).toBe(false);
  });

  test('fetches notifications data correctly', async () => {
    const store = configureStore({
      reducer: { notifications: notificationsReducer },
    });

    const dispatchPromise = store.dispatch(fetchNotifications());

    mockAxios.mockResponse({
      data: { notifications: mockNotificationsData },
    });

    await dispatchPromise;
    const state = store.getState().notifications;

    expect(state.notifications).toHaveLength(3);
    expect(state.notifications[0].value).toBe('New course available');
    expect(state.notifications[1].value).toBe('New resume available');
    expect(state.notifications[2].html.__html).toContain('Urgent requirement');
  });

  test('removes a notification correctly when markNotificationAsRead is dispatched', () => {
    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    const preloadedNotifications = [
      { id: 1, type: 'default', value: 'New course available' },
      { id: 2, type: 'urgent', value: 'New resume available' },
      { id: 3, type: 'urgent', html: { __html: '' } },
    ];

    const state = notificationsReducer(
      { notifications: preloadedNotifications, loading: false },
      markNotificationAsRead(1),
    );

    expect(state.notifications).toHaveLength(2);
    expect(state.notifications.find((n) => n.id === 1)).toBeUndefined();
    expect(logSpy).toHaveBeenCalledWith(
      'Notification 1 has been marked as read',
    );

    logSpy.mockRestore();
  });
});
