import { createSlice } from '@reduxjs/toolkit';
import dispatchToast from '~/handlers/toast';

const initialState = {
  accessToken: {
    token: '',
    expires: ''
  },
  refreshToken: {
    token: '',
    expires: ''
  },
  loginInfo: null,
  rememberMe: true
};

export const authentication = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    initApp: () => {
      //
    },
    changeRememberMe: (state, action) => {
      state.rememberMe = action.payload;
    },
    loginRequest: () => {
      console.log('auth slices');
      // request login
    },
    loginSuccess: (state, action) => {
      const { accessToken, refreshToken, loginInfo } = action.payload;
      console.log('accessToken, refreshToken, loginInfo', accessToken, refreshToken, loginInfo);
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.loginInfo = loginInfo;
      console.log('Slices');
      dispatchToast('success', 'Welcome back!');
    },
    loginFail: (_, action) => {
      dispatchToast('error', action.payload);
    },
    logoutRequest: () => {
      // request logout
    },
    logoutSuccess: (state) => {
      state.accessToken = initialState.accessToken;
      state.refreshToken = initialState.refreshToken;
      state.loginInfo = initialState.loginInfo;
      dispatchToast('success', 'Good bye!');
    },
    logoutFail: (_, action) => {
      dispatchToast('error', action.payload);
    },
    refreshTokenSuccess: (state, action) => {
      const { accessToken, refreshToken } = action.payload;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
    },
    refreshTokenFail: (state, action) => {
      state.accessToken = initialState.accessToken;
      state.refreshToken = initialState.refreshToken;
      state.loginInfo = initialState.loginInfo;
      dispatchToast('error', action.payload);
    }
  }
});

export const {
  initApp,
  changeRememberMe,
  loginRequest,
  loginSuccess,
  logoutRequest,
  logoutSuccess,
  loginFail,
  logoutFail,
  refreshTokenSuccess,
  refreshTokenFail
} = authentication.actions;

export default authentication.reducer;
