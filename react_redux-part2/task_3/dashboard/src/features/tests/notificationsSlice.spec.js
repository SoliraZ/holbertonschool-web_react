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

const mockApiData = [
  {
    id: 'id-1',
    author: { name: { first: 'John', last: 'Doe' }, email: 'j@h.nz', picture: '', age: 25 },
    context: { guid: 'g1', isRead: false, type: 'default', value: 'New course available' },
  },
  {
    id: 'id-2',
    author: { name: { first: 'Jane', last: 'Doe' }, email: 'j2@h.nz', picture: '', age: 30 },
    context: { guid: 'g2', isRead: false, type: 'urgent', value: 'New resume available' },
  },
  {
    id: 'id-3',
    author: { name: { first: 'Jim', last: 'Doe' }, email: 'j3@h.nz', picture: '', age: 28 },
    context: { guid: 'g3', isRead: true, type: 'urgent', value: 'Already read notification' },
  },
];

describe('notificationsSlice', () => {
  test('returns the correct initial state by default', () => {
    expect(notificationsReducer(undefined, { type: '@@INIT' })).toEqual(initialState);
  });

  test('sets loading to true when fetchNotifications is pending', () => {
    const state = notificationsReducer(undefined, fetchNotifications.pending());
    expect(state.loading).toBe(true);
  });

  test('fetches and transforms only unread notifications when fulfilled', async () => {
    const store = configureStore({
      reducer: { notifications: notificationsReducer },
    });

    const dispatchPromise = store.dispatch(fetchNotifications());
    expect(store.getState().notifications.loading).toBe(true);

    mockAxios.mockResponse({ data: mockApiData });

    await dispatchPromise;
    const state = store.getState().notifications;

    expect(state.loading).toBe(false);
    expect(state.notifications).toHaveLength(2);
    expect(state.notifications[0]).toEqual({
      id: 'id-1',
      type: 'default',
      isRead: false,
      value: 'New course available',
    });
    expect(state.notifications[1]).toEqual({
      id: 'id-2',
      type: 'urgent',
      isRead: false,
      value: 'New resume available',
    });
    expect(state.notifications.find((n) => n.id === 'id-3')).toBeUndefined();
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

  test('removes a notification when markNotificationAsRead is dispatched', () => {
    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    const preloadedNotifications = [
      { id: 'id-1', type: 'default', isRead: false, value: 'New course available' },
      { id: 'id-2', type: 'urgent', isRead: false, value: 'New resume available' },
    ];

    const state = notificationsReducer(
      { notifications: preloadedNotifications, loading: false },
      markNotificationAsRead('id-1'),
    );

    expect(state.notifications).toHaveLength(1);
    expect(state.notifications.find((n) => n.id === 'id-1')).toBeUndefined();
    expect(logSpy).toHaveBeenCalledWith('Notification id-1 has been marked as read');

    logSpy.mockRestore();
  });
});
