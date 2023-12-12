import { createSlice } from '@reduxjs/toolkit';
import dispatchToast from '~/handlers/toast';

const initialState = {
  course: [],
  pagination: {
    currentPage: null,
    totalPages: null
  },
  detail: null
};

export const course = createSlice({
  name: 'course',
  initialState,
  reducers: {
    getAllCourseRequest: () => {
      // request course
    },
    getAllCoursesuccess: (state, action) => {
      const { page, totalPages, results } = action.payload;

      state.course = results;
      state.pagination.currentPage = page;
      state.pagination.totalPages = totalPages;
    },
    getAllCourseFail: (_, action) => {
      dispatchToast('error', action.payload);
    },
    deleteCourseRequest: () => {
      // request course
    },
    deleteCoursesuccess: () => {
      dispatchToast('success', 'Deleted course!');
    },
    deleteCourseFail: (_, action) => {
      dispatchToast('error', action.payload);
    },
    addCourseRequest: () => {
      // request add course
    },
    addCoursesuccess: () => {
      dispatchToast('success', 'Added course!');
    },
    addCourseFail: (_, action) => {
      dispatchToast('error', action.payload);
    },
    getCourseRequest: () => {
      // request update course
    },
    getCoursesuccess: (state, action) => {
      state.detail = action.payload;
    },
    getCourseFail: (_, action) => {
      state.detail = initialState.detail;
      dispatchToast('error', action.payload);
    },
    updateCourseRequest: () => {
      // request update course
    },
    updateCoursesuccess: () => {
      dispatchToast('success', 'Updated course!');
    },
    updateCourseFail: (_, action) => {
      dispatchToast('error', action.payload);
    },
    reGetAllCourseRequest: () => {
      // request all course
    }
  }
});

export const {
  getAllCourseRequest,
  getAllCoursesuccess,
  getAllCourseFail,
  deleteCourseRequest,
  deleteCoursesuccess,
  deleteCourseFail,
  addCourseRequest,
  addCoursesuccess,
  addCourseFail,
  getCourseRequest,
  getCoursesuccess,
  getCourseFail,
  updateCourseRequest,
  updateCoursesuccess,
  updateCourseFail,
  reGetAllCourseRequest
} = course.actions;

export default course.reducer;
