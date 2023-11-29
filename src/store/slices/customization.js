import { createSlice } from '@reduxjs/toolkit';

import config from '~/config';

export const customization = createSlice({
  name: 'toast',
  initialState: {
    isOpen: [], // for active default menu
    defaultId: 'default',
    fontFamily: config.fontFamily,
    borderRadius: config.borderRadius,
    opened: true
  },
  reducers: {
    changeMenuOpen: (state, action) => {
      state.isOpen = [action.payload];
    },
    setMenu: (state, action) => {
      state.opened = action.payload;
    },
    setFontFamily: (state, action) => {
      state.fontFamily = action.payload;
    },
    setBorderRadius: (state, action) => {
      state.borderRadius = action.payload;
    }
  }
});

export const { changeMenuOpen, setMenu, setFontFamily, setBorderRadius } = customization.actions;

export default customization.reducer;
