import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  notifications: [],
  displayDrawer: true,
};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {},
});

export default notificationsSlice.reducer;
