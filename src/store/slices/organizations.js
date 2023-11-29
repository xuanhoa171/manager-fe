import { createSlice } from '@reduxjs/toolkit';
import dispatchToast from '~/handlers/toast';

const initialState = {
  organizations: [],
  pagination: {
    currentPage: null,
    totalPages: null
  },
  detail: null
};

export const organizations = createSlice({
  name: 'organizations',
  initialState,
  reducers: {
    getAllOrganizationRequest: () => {
      // request organization
    },
    getAllOrganizationSuccess: (state, action) => {
      const { page, totalPages, results } = action.payload;
      state.organizations = results;
      state.pagination.currentPage = page;
      state.pagination.totalPages = totalPages;
    },
    getAllOrganizationFail: (_, action) => {
      dispatchToast('error', action.payload);
    },
    deleteOrganizationRequest: () => {
      // request organization
    },
    deleteOrganizationSuccess: (state, action) => {
      let updateOrganizations = state.organizations.filter((organization) => organization.id !== action.payload);
      state.organizations = updateOrganizations;
      dispatchToast('success', 'Deleted organization!');
    },
    deleteOrganizationFail: (_, action) => {
      dispatchToast('error', action.payload);
    },
    updateOrganizationRequest: () => {
      // request update organization
    },
    updateOrganizationSuccess: () => {
      dispatchToast('success', 'Updated Organization!');
    },
    updateOrganizationFail: (_, action) => {
      dispatchToast('error', action.payload);
    },
    getOrganizationRequest: () => {
      // request get organization
    },
    getOrganizationSuccess: (state, action) => {
      state.detail = action.payload;
    },
    getOrganizationFail: (_, action) => {
      state.detail = initialState.detail;
      dispatchToast('error', action.payload);
    },
    addOrganizationRequest: () => {
      // request add organization
    },
    addOrganizationSuccess: () => {
      dispatchToast('success', 'Added Organization!');
    },
    addOrganizationFail: (_, action) => {
      dispatchToast('error', action.payload);
    }
  }
});

export const {
  getAllOrganizationRequest,
  getAllOrganizationSuccess,
  getAllOrganizationFail,
  deleteOrganizationRequest,
  deleteOrganizationSuccess,
  deleteOrganizationFail,
  updateOrganizationRequest,
  updateOrganizationSuccess,
  updateOrganizationFail,
  getOrganizationRequest,
  getOrganizationSuccess,
  getOrganizationFail,
  addOrganizationRequest,
  addOrganizationSuccess,
  addOrganizationFail
} = organizations.actions;

export default organizations.reducer;
