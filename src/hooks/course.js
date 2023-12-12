import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllCourseRequest, addCourseRequest, deleteCourseRequest, getCourseRequest, updateCourseRequest } from '~/store/slices/course';

const useCourseStore = () => {
  const dispatch = useDispatch();

  const coursesState = useSelector((state) => state.course);

  const dispatchGetAllCourse = useCallback(
    (payload) => {
      dispatch(getAllCourseRequest(payload));

      return true;
    },
    [dispatch]
  );

  const dispatchDeleteCourse = useCallback(
    (payload) => {
      dispatch(deleteCourseRequest(payload));

      return true;
    },
    [dispatch]
  );

  const dispatchAddCourse = useCallback(
    (payload) => {
      dispatch(addCourseRequest(payload));

      return true;
    },
    [dispatch]
  );

  const dispatchGetCourseById = useCallback(
    (payload) => {
      dispatch(getCourseRequest(payload));

      return true;
    },
    [dispatch]
  );

  const dispatchUpdateCourse = useCallback(
    (payload) => {
      dispatch(updateCourseRequest(payload));

      return true;
    },
    [dispatch]
  );

  return {
    dispatchGetAllCourse,
    dispatchDeleteCourse,
    dispatchAddCourse,
    dispatchGetCourseById,
    dispatchUpdateCourse,
    coursesState
  };
};

export { useCourseStore };
