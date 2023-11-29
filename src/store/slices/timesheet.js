import { createSlice } from '@reduxjs/toolkit';
import dispatchToast from '~/handlers/toast';

const initialState = {};

export const Timesheet = createSlice({
  name: 'Timesheet',
  initialState,
  reducers: {
    updateTimesheetRequest: () => {
      // dispatchToast('success', action.payload);
    },
    updateTimesheetSuccess: (_, action) => {
      dispatchToast('success', action.payload);
    },
    updateTimesheetFailt: (_, action) => {
      dispatchToast('error', action.payload);
    }
  }
});

export const { updateTimesheetSuccess, updateTimesheetFailt, updateTimesheetRequest } = Timesheet.actions;

export default Timesheet.reducer;
