import { createSlice } from '@reduxjs/toolkit';
import dispatchToast from '~/handlers/toast';

const initialState = {};

export const Notification = createSlice({
  name: 'Notification',
  initialState,
  reducers: {
    addNotificationRequest: () => {
      // dispatchToast('success', action.payload);
    },
    addNotificationSuccess: (_, action) => {
      dispatchToast('success', action.payload);
    },
    addNotificationFailt: (_, action) => {
      dispatchToast('error', action.payload);
    }
  }
});

export const { addNotificationSuccess, addNotificationFailt, addNotificationRequest } = Notification.actions;

export default Notification.reducer;
