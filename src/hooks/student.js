import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  // reGetAllStudentRequest,
  updateStudentRequest,
  getStudentRequest,
  addStudentRequest,
  deleteStudentRequest,
  getAllStudentRequest
} from '~/store/slices/student';

const useStudentStore = () => {
  const dispatch = useDispatch();

  const studentsState = useSelector((state) => state.student);

  const dispatchGetAllStudent = useCallback(
    (payload) => {
      dispatch(getAllStudentRequest(payload));

      return true;
    },
    [dispatch]
  );

  const dispatchDeleteStudent = useCallback(
    (payload) => {
      dispatch(deleteStudentRequest(payload));

      return true;
    },
    [dispatch]
  );

  const dispatchAddStudent = useCallback(
    (payload) => {
      dispatch(addStudentRequest(payload));

      return true;
    },
    [dispatch]
  );

  const dispatchGetStudentById = useCallback(
    (payload) => {
      dispatch(getStudentRequest(payload));

      return true;
    },
    [dispatch]
  );

  const dispatchUpdateStudent = useCallback(
    (payload) => {
      dispatch(updateStudentRequest(payload));

      return true;
    },
    [dispatch]
  );

  return {
    dispatchGetAllStudent,
    dispatchDeleteStudent,
    dispatchAddStudent,
    dispatchGetStudentById,
    dispatchUpdateStudent,
    studentsState
  };
};

export { useStudentStore };
