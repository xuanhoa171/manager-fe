import { createSlice } from '@reduxjs/toolkit';
import dispatchToast from '~/handlers/toast';

const initialState = {
  users: [],
  pagination: {
    currentPage: null,
    totalPages: null
  },
  detail: null
};

export const users = createSlice({
  name: 'users',
  initialState,
  reducers: {
    getAllUserRequest: () => {
      // request user
    },
    getAllUserSuccess: (state, action) => {
      const { page, totalPages, results } = action.payload;

      state.users = results;
      state.pagination.currentPage = page;
      state.pagination.totalPages = totalPages;
    },
    getAllUserFail: (_, action) => {
      dispatchToast('error', action.payload);
    },
    deleteUserRequest: () => {
      // request user
    },
    deleteUserSuccess: () => {
      dispatchToast('success', 'Deleted user!');
    },
    deleteFail: (_, action) => {
      dispatchToast('error', action.payload);
    },
    addUserRequest: () => {
      // request add user
    },
    addUserSuccess: () => {
      dispatchToast('success', 'Added User!');
    },
    addUserFail: (_, action) => {
      dispatchToast('error', action.payload);
    },
    getUserRequest: () => {
      // request update user
    },
    getUserSuccess: (state, action) => {
      state.detail = action.payload;
    },
    getUserFail: (_, action) => {
      state.detail = initialState.detail;
      dispatchToast('error', action.payload);
    },
    updateUserRequest: () => {
      // request update user
    },
    updateUserSuccess: () => {
      dispatchToast('success', 'Updated User!');
    },
    updateUserFail: (_, action) => {
      dispatchToast('error', action.payload);
    },
    updatePasswordRequest: () => {
      // request update user
    },
    updatePasswordSuccess: () => {
      dispatchToast('success', 'Updated password!');
    },
    updatePasswordFail: (_, action) => {
      dispatchToast('error', action.payload);
    },
    reGetAllUserRequest: () => {
      // request all user
    }
  }
});

export const {
  getAllUserRequest,
  getAllUserSuccess,
  getAllUserFail,
  deleteUserRequest,
  deleteUserSuccess,
  deleteFail,
  addUserRequest,
  addUserSuccess,
  addUserFail,
  getUserRequest,
  getUserSuccess,
  getUserFail,
  updateUserRequest,
  updateUserSuccess,
  updateUserFail,
  updatePasswordRequest,
  updatePasswordSuccess,
  updatePasswordFail,
  reGetAllUserRequest
} = users.actions;

export default users.reducer;
