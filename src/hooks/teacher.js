import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  getAllTeacherRequest,
  deleteTeacherRequest,
  addTeacherRequest,
  getTeacherRequest,
  updateTeacherRequest
} from '~/store/slices/teacher';

const useTeacherStore = () => {
  const dispatch = useDispatch();

  const teachersState = useSelector((state) => state.teacher);

  const dispatchGetAllTeacher = useCallback(
    (payload) => {
      dispatch(getAllTeacherRequest(payload));

      return true;
    },
    [dispatch]
  );

  const dispatchDeleteTeacher = useCallback(
    (payload) => {
      dispatch(deleteTeacherRequest(payload));

      return true;
    },
    [dispatch]
  );

  const dispatchAddTeacher = useCallback(
    (payload) => {
      dispatch(addTeacherRequest(payload));

      return true;
    },
    [dispatch]
  );

  const dispatchGetTeacherById = useCallback(
    (payload) => {
      dispatch(getTeacherRequest(payload));

      return true;
    },
    [dispatch]
  );

  const dispatchUpdateTeacher = useCallback(
    (payload) => {
      dispatch(updateTeacherRequest(payload));

      return true;
    },
    [dispatch]
  );

  return {
    dispatchGetAllTeacher,
    dispatchDeleteTeacher,
    dispatchAddTeacher,
    dispatchGetTeacherById,
    dispatchUpdateTeacher,
    teachersState
  };
};

export { useTeacherStore };
