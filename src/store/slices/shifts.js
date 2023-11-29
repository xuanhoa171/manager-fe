import { createSlice } from '@reduxjs/toolkit';
import dispatchToast from '~/handlers/toast';

const initialState = {
  shifts: [],
  pagination: {
    currentPage: null,
    totalPages: null
  }
};

export const shifts = createSlice({
  name: 'shifts',
  initialState,
  reducers: {
    getAllShiftRequest: () => {
      // request user
    },
    getAllShiftSuccess: (state, action) => {
      const { page, totalPages, results } = action.payload;
      state.shifts = results;
      state.pagination.currentPage = page;
      state.pagination.totalPages = totalPages;
    },
    getAllShiftFail: (_, action) => {
      dispatchToast('error', action.payload);
    },
    // delete shift
    deleteShiftRequest: () => {
      // request user
    },
    deleteShiftSuccess: (state, action) => {
      console.log('deleteShiftSuccess', action);
      let updateShifts = state.shifts.filter((shift) => shift.id !== action.payload);
      state.shifts = updateShifts;
      dispatchToast('success', 'Deleted shift!');
    },
    deleteShiftFail: (_, action) => {
      dispatchToast('error', action.payload);
    },
    addShiftRequest: () => {
      // request add user
    },
    addShiftSuccess: () => {
      dispatchToast('success', 'Added Shift!');
    },
    addShiftFail: (_, action) => {
      dispatchToast('error', action.payload);
    }
  }
});

export const {
  getAllShiftRequest,
  getAllShiftSuccess,
  getAllShiftFail,
  deleteShiftRequest,
  deleteShiftSuccess,
  deleteShiftFail,
  addShiftRequest,
  addShiftSuccess,
  addShiftFail
} = shifts.actions;

export default shifts.reducer;
