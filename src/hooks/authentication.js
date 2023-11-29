import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loginRequest, logoutSuccess, changeRememberMe, initApp } from '~/store/slices/authentication';

const useAuthenticationStore = () => {
  const dispatch = useDispatch();

  const authenticationState = useSelector((state) => state.authentication);

  const dispatchInitApp = useCallback(
    (payload) => {
      dispatch(initApp(payload));
    },
    [dispatch]
  );

  const dispatchLogin = useCallback(
    (payload) => {
      dispatch(loginRequest(payload));
      console.log("hooks")
      return true;
    },
    [dispatch]
  );

  const dispatchLogout = useCallback(() => {
    dispatch(logoutSuccess());

    return true;
  }, [dispatch]);

  const dispatchChangeRememberMe = useCallback(
    (payload) => {
      dispatch(changeRememberMe(payload));
    },
    [dispatch]
  );

  return {
    dispatchInitApp,
    authenticationState,
    dispatchLogin,
    dispatchLogout,
    dispatchChangeRememberMe
  };
};

export { useAuthenticationStore };
