import { createSlice } from '@reduxjs/toolkit';
import dispatchToast from '~/handlers/toast';

const initialState = {
  places: [],
  pagination: {
    currentPage: null,
    totalPages: null
  },
  detail: null
};

export const places = createSlice({
  name: 'places',
  initialState,
  reducers: {
    getAllPlacesRequest: () => {
      // request place
    },
    getAllPlacesSuccess: (state, action) => {
      const { page, totalPages, results } = action.payload;
      state.places = results;
      state.pagination.currentPage = page;
      state.pagination.totalPages = totalPages;
    },
    getAllPlacesFail: (_, action) => {
      dispatchToast('error', action.payload);
    },
    addPlaceRequest: () => {
      // request add place
    },
    addPlaceSuccess: () => {
      dispatchToast('success', 'Added Place!');
    },
    addPlaceFail: (_, action) => {
      dispatchToast('error', action.payload);
    },
    deletePlaceRequest: () => {
      // request place
    },
    deletePlaceSuccess: (state, action) => {
      let updatePlaces = state.places.filter((place) => place.id !== action.payload);
      state.places = updatePlaces;
      dispatchToast('success', 'Deleted place!');
    },
    deletePlaceFail: (_, action) => {
      dispatchToast('error', action.payload);
    },
    getPlaceRequest: () => {
      // request get place
    },
    getPlaceSuccess: (state, action) => {
      state.detail = action.payload;
    },
    getPlaceFail: (_, action) => {
      state.detail = initialState.detail;
      dispatchToast('error', action.payload);
    },
    updatePlaceRequest: () => {
      // request update place
    },
    updatePlaceSuccess: () => {
      dispatchToast('success', 'Updated Place!');
    },
    updatePlaceFail: (_, action) => {
      dispatchToast('error', action.payload);
    },
    reGetAllPlacesRequest: () => {
      // re get places
    }
  }
});

export const {
  getAllPlacesRequest,
  getAllPlacesSuccess,
  getAllPlacesFail,
  deletePlaceRequest,
  deletePlaceSuccess,
  deletePlaceFail,
  addPlaceRequest,
  addPlaceSuccess,
  addPlaceFail,
  getPlaceRequest,
  getPlaceSuccess,
  getPlaceFail,
  updatePlaceRequest,
  updatePlaceSuccess,
  updatePlaceFail,
  reGetAllPlacesRequest
} = places.actions;

export default places.reducer;
