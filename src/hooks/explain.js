import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  getAllExplainRequest,
  deleteExplainRequest,
  updateExplainRequest,
  getExplainRequest
  // updateTimesheet
} from '~/store/slices/explain';

const useExplainsStore = () => {
  const dispatch = useDispatch();

  const explainsState = useSelector((state) => state.explain);

  const dispatchGetAllExplains = useCallback(
    (payload) => {
      dispatch(getAllExplainRequest(payload));

      return true;
    },
    [dispatch]
  );

  // const dispatchUpdateTimeSheet = useCallback(
  //   (payload) => {
  //     dispatch(updateTimesheet(payload));

  //     return true;
  //   },
  //   [dispatch]
  // );

  const dispatchDeleteExplain = useCallback(
    (payload) => {
      dispatch(deleteExplainRequest(payload));

      return true;
    },
    [dispatch]
  );

  const dispatchUpdateExplain = useCallback(
    (payload) => {
      dispatch(updateExplainRequest(payload));

      return true;
    },
    [dispatch]
  );

  const dispatchGetExplain = useCallback(
    (payload) => {
      dispatch(getExplainRequest(payload));

      return true;
    },
    [dispatch]
  );

  return {
    explainsState,
    dispatchGetAllExplains,
    dispatchDeleteExplain,
    dispatchUpdateExplain,
    dispatchGetExplain
    // dispatchUpdateTimeSheet
  };
};

export { useExplainsStore };
