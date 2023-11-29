import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPlaceRequest, deletePlaceRequest, getAllPlacesRequest, getPlaceRequest, updatePlaceRequest } from '~/store/slices/places';

const usePlacesStore = () => {
  const dispatch = useDispatch();

  const placesState = useSelector((state) => state.places);

  const dispatchGetAllPlaces = useCallback(
    (payload) => {
      dispatch(getAllPlacesRequest(payload));

      return true;
    },
    [dispatch]
  );

  const dispatchDeletePlace = useCallback(
    (payload) => {
      dispatch(deletePlaceRequest(payload));

      return true;
    },
    [dispatch]
  );

  const dispatchAddPlace = useCallback(
    (payload) => {
      dispatch(addPlaceRequest(payload));

      return true;
    },
    [dispatch]
  );

  const dispatchGetPlaceById = useCallback(
    (payload) => {
      dispatch(getPlaceRequest(payload));

      return true;
    },
    [dispatch]
  );

  const dispatchUpdatePlace = useCallback(
    (payload) => {
      dispatch(updatePlaceRequest(payload));

      return true;
    },
    [dispatch]
  );

  return {
    dispatchGetAllPlaces,
    dispatchDeletePlace,
    dispatchAddPlace,
    dispatchGetPlaceById,
    dispatchUpdatePlace,
    placesState
  };
};

export { usePlacesStore };
