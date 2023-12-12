import { createSlice } from '@reduxjs/toolkit';
import dispatchToast from '~/handlers/toast';

const initialState = {
  classes: [],
  pagination: {
    currentPage: null,
    totalPages: null
  },
  detail: null
};

export const classes = createSlice({
  name: 'classes',
  initialState,
  reducers: {
    getAllClassRequest: () => {
      // request Class
    },
    getAllClassSuccess: (state, action) => {
      const { page, totalPages, results } = action.payload;

      state.classes = results;
      state.pagination.currentPage = page;
      state.pagination.totalPages = totalPages;
    },
    getAllClassFail: (_, action) => {
      dispatchToast('error', action.payload);
    },
    deleteClassRequest: () => {
      // request course
    },
    deleteClassSuccess: () => {
      dispatchToast('success', 'Deleted class!');
    },
    deleteClassFail: (_, action) => {
      dispatchToast('error', action.payload);
    },
    addClassRequest: () => {
      // request add course
    },
    addClassSuccess: () => {
      dispatchToast('success', 'Added class!');
    },
    addClassFail: (_, action) => {
      dispatchToast('error', action.payload);
    },
    getClassRequest: () => {
      // request update course
    },
    getClassSuccess: (state, action) => {
      state.detail = action.payload;
    },
    getClassFail: (_, action) => {
      state.detail = initialState.detail;
      dispatchToast('error', action.payload);
    },
    updateClassRequest: () => {
      // request update course
    },
    updateClassSuccess: () => {
      dispatchToast('success', 'Updated class!');
    },
    updateClassFail: (_, action) => {
      dispatchToast('error', action.payload);
    },
    reGetAllClassRequest: () => {
      // request all course
    }
  }
});

export const {
  getAllClassRequest,
  getAllClassSuccess,
  getAllClassFail,
  addClassRequest,
  addClassSuccess,
  addClassFail,
  getClassRequest,
  getClassSuccess,
  getClassFail,
  deleteClassRequest,
  deleteClassSuccess,
  deleteClassFail,
  updateClassRequest,
  updateClassSuccess,
  updateClassFail,
  reGetAllClassRequest
} = classes.actions;

export default classes.reducer;
