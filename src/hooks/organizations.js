import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  getAllOrganizationRequest,
  deleteOrganizationRequest,
  updateOrganizationRequest,
  getOrganizationRequest,
  addOrganizationRequest
} from '~/store/slices/organizations';

const useOrganizationsStore = () => {
  const dispatch = useDispatch();

  const organizationsState = useSelector((state) => state.organizations);

  const dispatchGetAllOrganizations = useCallback(
    (payload) => {
      dispatch(getAllOrganizationRequest(payload));

      return true;
    },
    [dispatch]
  );

  const dispatchAddOrganization = useCallback(
    (payload) => {
      dispatch(addOrganizationRequest(payload));

      return true;
    },
    [dispatch]
  );

  const dispatchDeleteOrganization = useCallback(
    (payload) => {
      dispatch(deleteOrganizationRequest(payload));

      return true;
    },
    [dispatch]
  );

  const dispatchUpdateOrganization = useCallback(
    (payload) => {
      dispatch(updateOrganizationRequest(payload));

      return true;
    },
    [dispatch]
  );

  const dispatchGetOrganization = useCallback(
    (payload) => {
      dispatch(getOrganizationRequest(payload));

      return true;
    },
    [dispatch]
  );

  return {
    dispatchGetAllOrganizations,
    dispatchDeleteOrganization,
    dispatchUpdateOrganization,
    dispatchGetOrganization,
    dispatchAddOrganization,
    organizationsState
  };
};

export { useOrganizationsStore };
