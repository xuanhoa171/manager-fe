import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllUserRequest, deleteUserRequest, addUserRequest, getUserRequest, updateUserRequest, updatePasswordRequest } from '~/store/slices/users';

const useUsersStore = () => {
  const dispatch = useDispatch();

  const usersState = useSelector((state) => state.users);

  const dispatchGetAllUsers = useCallback(
    (payload) => {
      dispatch(getAllUserRequest(payload));

      return true;
    },
    [dispatch]
  );

  const dispatchDeleteUser = useCallback(
    (payload) => {
      dispatch(deleteUserRequest(payload));

      return true;
    },
    [dispatch]
  );

  const dispatchAddUser = useCallback(
    (payload) => {
      dispatch(addUserRequest(payload));

      return true;
    },
    [dispatch]
  );

  const dispatchGetUserById = useCallback(
    (payload) => {
      dispatch(getUserRequest(payload));

      return true;
    },
    [dispatch]
  );

  const dispatchUpdateUser = useCallback(
    (payload) => {
      dispatch(updateUserRequest(payload));

      return true;
    },
    [dispatch]
  );

  const dispatchUpdatePassword = useCallback(
    (payload) => {
      dispatch(updatePasswordRequest(payload));

      return true;
    },
    [dispatch]
  );

  return {
    dispatchGetAllUsers,
    dispatchDeleteUser,
    dispatchAddUser,
    dispatchGetUserById,
    dispatchUpdateUser,
    dispatchUpdatePassword,
    usersState
  };
};

export { useUsersStore };
