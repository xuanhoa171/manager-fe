import { createSlice } from '@reduxjs/toolkit';
import dispatchToast from '~/handlers/toast';

const initialState = {
  explain: [],
  pagination: {
    currentPage: null,
    totalPages: null
  },
  detail: null
};

export const Explains = createSlice({
  name: 'Explains',
  initialState,
  reducers: {
    getAllExplainRequest: () => {
      // request Explain
    },
    getAllExplainSuccess: (state, action) => {
      const { page, totalPages, results } = action.payload;
      state.explain = results;
      state.pagination.currentPage = page;
      state.pagination.totalPages = totalPages;
    },
    getAllExplainFail: (_, action) => {
      dispatchToast('error', action.payload);
    },
    deleteExplainRequest: () => {
      // request Explain
    },
    deleteExplainSuccess: (state, action) => {
      let updateExplains = state.explain.filter((Explain) => Explain.id !== action.payload);
      state.explain = updateExplains;
      dispatchToast('success', 'Deleted Explain!');
    },
    deleteExplainFail: (_, action) => {
      dispatchToast('error', action.payload);
    },
    updateExplainRequest: () => {
      // request update Explain
    },
    updateExplainSuccess: () => {
      dispatchToast('success', 'Updated Explain!');
    },
    updateExplainFail: (_, action) => {
      dispatchToast('error', action.payload);
    },
    getExplainRequest: () => {
      // request get Explain
    },
    getExplainSuccess: (state, action) => {
      state.detail = action.payload;
    },
    getExplainFail: (_, action) => {
      state.detail = initialState.detail;
      dispatchToast('error', action.payload);
    },
    addExplainRequest: () => {
      // request add Explain
    },
    addExplainSuccess: () => {
      dispatchToast('success', 'Added Explain!');
    },
    addExplainFail: (_, action) => {
      dispatchToast('error', action.payload);
    }
    // updateTimesheet: () => {
    //   // dispatchToast('success', action.payload);
    // },
    // updateTimesheetSuccess: (_, action) => {
    //   dispatchToast('success', action.payload);
    // },
    // updateTimesheetFailt: (_, action) => {
    //   dispatchToast('error', action.payload);
    // }
  }
});

export const {
  getAllExplainRequest,
  getAllExplainSuccess,
  getAllExplainFail,
  deleteExplainRequest,
  deleteExplainSuccess,
  deleteExplainFail,
  updateExplainRequest,
  updateExplainSuccess,
  updateExplainFail,
  getExplainRequest,
  getExplainSuccess,
  getExplainFail,
  addExplainRequest,
  addExplainSuccess,
  addExplainFail
  // updateTimesheetSuccess,
  // updateTimesheetFailt,
  // updateTimesheet
} = Explains.actions;

export default Explains.reducer;
