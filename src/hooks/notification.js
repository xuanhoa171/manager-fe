import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addNotificationRequest } from '~/store/slices/notification';

const useNotificationStore = () => {
  const dispatch = useDispatch();

  const notificationState = useSelector((state) => state);

  const dispatchAddNofitication = useCallback(
    (payload) => {
      console.log('hooks');
      dispatch(addNotificationRequest(payload));

      return true;
    },
    [dispatch]
  );

  return {
    notificationState,
    dispatchAddNofitication
  };
};

export { useNotificationStore };
