import { createSlice } from '@reduxjs/toolkit';
import dispatchToast from '~/handlers/toast';

const initialState = {
  teacher: [],
  pagination: {
    currentPage: null,
    totalPages: null
  },
  detail: null
};

export const teacher = createSlice({
  name: 'teacher',
  initialState,
  reducers: {
    getAllTeacherRequest: () => {
      // request teacher
    },
    getAllTeachersuccess: (state, action) => {
      const { page, totalPages, results } = action.payload;

      state.teacher = results;
      state.pagination.currentPage = page;
      state.pagination.totalPages = totalPages;
    },
    getAllTeacherFail: (_, action) => {
      dispatchToast('error', action.payload);
    },
    deleteTeacherRequest: () => {
      // request teacher
    },
    deleteTeachersuccess: () => {
      dispatchToast('success', 'Deleted teacher!');
    },
    deleteTeacherFail: (_, action) => {
      dispatchToast('error', action.payload);
    },
    addTeacherRequest: () => {
      // request add teacher
    },
    addTeachersuccess: () => {
      dispatchToast('success', 'Added teacher!');
    },
    addTeacherFail: (_, action) => {
      dispatchToast('error', action.payload);
    },
    getTeacherRequest: () => {
      // request update teacher
    },
    getTeachersuccess: (state, action) => {
      state.detail = action.payload;
    },
    getTeacherFail: (_, action) => {
      state.detail = initialState.detail;
      dispatchToast('error', action.payload);
    },
    updateTeacherRequest: () => {
      // request update teacher
    },
    updateTeachersuccess: () => {
      dispatchToast('success', 'Updated teacher!');
    },
    updateTeacherFail: (_, action) => {
      dispatchToast('error', action.payload);
    },
    reGetAllTeacherRequest: () => {
      // request all teacher
    }
  }
});

export const {
  getAllTeacherRequest,
  getAllTeachersuccess,
  getAllTeacherFail,
  deleteTeacherRequest,
  deleteTeachersuccess,
  deleteTeacherFail,
  addTeacherRequest,
  addTeachersuccess,
  addTeacherFail,
  getTeacherRequest,
  getTeachersuccess,
  getTeacherFail,
  updateTeacherRequest,
  updateTeachersuccess,
  updateTeacherFail,
  reGetAllTeacherRequest
} = teacher.actions;

export default teacher.reducer;
