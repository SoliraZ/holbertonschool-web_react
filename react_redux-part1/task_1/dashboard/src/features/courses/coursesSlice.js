import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  courses: [],
};

const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {},
});

export default coursesSlice.reducer;
