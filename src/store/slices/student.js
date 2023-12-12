import { createSlice } from '@reduxjs/toolkit';
import dispatchToast from '~/handlers/toast';

const initialState = {
  student: [],
  pagination: {
    currentPage: null,
    totalPages: null
  },
  detail: null
};

export const student = createSlice({
  name: 'student',
  initialState,
  reducers: {
    getAllStudentRequest: () => {
      // request Student
    },
    getAllstudentuccess: (state, action) => {
      const { page, totalPages, results } = action.payload;

      state.student = results;
      state.pagination.currentPage = page;
      state.pagination.totalPages = totalPages;
    },
    getAllStudentFail: (_, action) => {
      dispatchToast('error', action.payload);
    },
    deleteStudentRequest: () => {
      // request Student
    },
    deletestudentuccess: () => {
      dispatchToast('success', 'Deleted Student!');
    },
    deletestudentFail: (_, action) => {
      dispatchToast('error', action.payload);
    },
    addStudentRequest: () => {
      // request add Student
    },
    addstudentuccess: () => {
      dispatchToast('success', 'Added Student!');
    },
    addStudentFail: (_, action) => {
      dispatchToast('error', action.payload);
    },
    getStudentRequest: () => {
      // request update Student
    },
    getstudentuccess: (state, action) => {
      state.detail = action.payload;
    },
    getStudentFail: (_, action) => {
      state.detail = initialState.detail;
      dispatchToast('error', action.payload);
    },
    updateStudentRequest: () => {
      // request update Student
    },
    updatestudentuccess: () => {
      dispatchToast('success', 'Updated Student!');
    },
    updateStudentFail: (_, action) => {
      dispatchToast('error', action.payload);
    },
    reGetAllStudentRequest: () => {
      // request all Student
    }
  }
});

export const {
  getAllStudentRequest,
  getAllstudentuccess,
  getAllStudentFail,
  deleteStudentRequest,
  deletestudentuccess,
  deletestudentFail,
  addStudentRequest,
  addstudentuccess,
  addStudentFail,
  getStudentRequest,
  getstudentuccess,
  getStudentFail,
  updateStudentRequest,
  updatestudentuccess,
  updateStudentFail,
  reGetAllStudentRequest
} = student.actions;

export default student.reducer;
