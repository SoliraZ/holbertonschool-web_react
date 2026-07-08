import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getLatestNotification } from '../../utils/utils.js';

const API_BASE_URL = 'http://localhost:5173';

const ENDPOINTS = {
  notifications: `${API_BASE_URL}/notifications.json`,
};

export const fetchNotifications = createAsyncThunk(
  'notifications/fetchNotifications',
  async () => {
    const response = await axios.get(ENDPOINTS.notifications);
    const notifications = response.data.notifications;
    return notifications.map((notification) =>
      notification.id === 3
        ? { ...notification, html: { __html: getLatestNotification() } }
        : notification,
    );
  },
);

const initialState = {
  notifications: [],
  displayDrawer: true,
};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    markNotificationAsRead: (state, action) => {
      console.log('Notification ' + action.payload + ' has been marked as read');
      state.notifications = state.notifications.filter(
        (n) => n.id !== action.payload,
      );
    },
    showDrawer: (state) => {
      state.displayDrawer = true;
    },
    hideDrawer: (state) => {
      state.displayDrawer = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchNotifications.fulfilled, (state, action) => {
      state.notifications = action.payload;
    });
  },
});

export const { markNotificationAsRead, showDrawer, hideDrawer } =
  notificationsSlice.actions;
export default notificationsSlice.reducer;
