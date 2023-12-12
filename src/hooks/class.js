import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getClassRequest, addClassRequest } from '~/store/slices/classes';

const useClassesStore = () => {
  const dispatch = useDispatch();

  const classesState = useSelector((state) => state.classes);

  //   const dispatchGetAllCourse = useCallback(
  //     (payload) => {
  //       dispatch(getAllCourseRequest(payload));

  //       return true;
  //     },
  //     [dispatch]
  //   );

  //   const dispatchDeleteCourse = useCallback(
  //     (payload) => {
  //       dispatch(deleteCourseRequest(payload));

  //       return true;
  //     },
  //     [dispatch]
  //   );

  const dispatchAddClass = useCallback(
    (payload) => {
      dispatch(addClassRequest(payload));

      return true;
    },
    [dispatch]
  );

  //   const dispatchGetCourseById = useCallback(
  //     (payload) => {
  //       dispatch(getCourseRequest(payload));

  //       return true;
  //     },
  //     [dispatch]
  //   );

  //   const dispatchUpdateCourse = useCallback(
  //     (payload) => {
  //       dispatch(updateCourseRequest(payload));

  //       return true;
  //     },
  //     [dispatch]
  //   );

  return {
    // dispatchGetAllCourse,
    // dispatchDeleteCourse,
    dispatchAddClass,
    classesState
    // dispatchGetCourseById,
    // dispatchUpdateCourse,
    // coursesState
  };
};

export { useClassesStore };
