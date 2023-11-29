import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateTimesheetRequest } from '~/store/slices/timesheet';

const useTimesheetStore = () => {
  const dispatch = useDispatch();

  const timesheetState = useSelector((state) => state.timesheet);

  const dispatchUpdateTimeSheet = useCallback(
    (payload) => {
      console.log('hooks');
      dispatch(updateTimesheetRequest(payload));

      return true;
    },
    [dispatch]
  );

  return {
    timesheetState,
    dispatchUpdateTimeSheet
  };
};

export { useTimesheetStore };
