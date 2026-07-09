import { getFilteredNotifications } from '../selectors/notificationsSelector.js';

const unreadNotifications = [
  { id: 'u1', type: 'urgent', isRead: false, value: 'Urgent notification 1' },
  { id: 'u2', type: 'urgent', isRead: false, value: 'Urgent notification 2' },
  { id: 'd1', type: 'default', isRead: false, value: 'Default notification 1' },
  { id: 'd2', type: 'default', isRead: false, value: 'Default notification 2' },
];

const buildState = (notifications = unreadNotifications) => ({
  notifications: { notifications, loading: false },
});

describe('getFilteredNotifications selector', () => {
  test('returns all unread notifications when filter is "all"', () => {
    const state = buildState();
    const result = getFilteredNotifications(state, 'all');

    expect(result).toHaveLength(4);
    expect(result).toEqual(unreadNotifications);
  });

  test('returns only urgent notifications when filter is "urgent"', () => {
    const state = buildState();
    const result = getFilteredNotifications(state, 'urgent');

    expect(result).toHaveLength(2);
    result.forEach((n) => expect(n.type).toBe('urgent'));
  });

  test('returns only default notifications when filter is "default"', () => {
    const state = buildState();
    const result = getFilteredNotifications(state, 'default');

    expect(result).toHaveLength(2);
    result.forEach((n) => expect(n.type).toBe('default'));
  });

  test('returns empty array when no notifications match the filter', () => {
    const state = buildState([
      { id: 'u1', type: 'urgent', isRead: false, value: 'Urgent notification' },
    ]);
    const result = getFilteredNotifications(state, 'default');

    expect(result).toHaveLength(0);
    expect(result).toEqual([]);
  });

  test('returns empty array when notifications list is empty', () => {
    const state = buildState([]);
    expect(getFilteredNotifications(state, 'all')).toEqual([]);
    expect(getFilteredNotifications(state, 'urgent')).toEqual([]);
    expect(getFilteredNotifications(state, 'default')).toEqual([]);
  });

  test('is memoized: returns the same reference when inputs do not change', () => {
    const state = buildState();
    const result1 = getFilteredNotifications(state, 'all');
    const result2 = getFilteredNotifications(state, 'all');

    expect(result1).toBe(result2);
  });

  test('recomputes when filter changes', () => {
    const state = buildState();
    const allResult = getFilteredNotifications(state, 'all');
    const urgentResult = getFilteredNotifications(state, 'urgent');

    expect(allResult).toHaveLength(4);
    expect(urgentResult).toHaveLength(2);
    expect(allResult).not.toBe(urgentResult);
  });
});
