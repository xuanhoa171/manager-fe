import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeMenuOpen, setMenu, setFontFamily, setBorderRadius } from '~/store/slices/customization';

const useCustomizationStore = () => {
  const dispatch = useDispatch();

  const customizationState = useSelector((state) => state.customization);

  const dispatchMenuOpen = useCallback(
    (payload) => {
      dispatch(changeMenuOpen(payload));
    },
    [dispatch]
  );

  const dispatchSetMenu = useCallback(
    (payload) => {
      dispatch(setMenu(payload));
    },
    [dispatch]
  );

  const dispatchSetFontFamily = useCallback(
    (payload) => {
      dispatch(setFontFamily(payload));
    },
    [dispatch]
  );

  const dispatchSetBorderRadius = useCallback(
    (payload) => {
      dispatch(setBorderRadius(payload));
    },
    [dispatch]
  );

  return {
    customizationState,
    dispatchMenuOpen,
    dispatchSetMenu,
    dispatchSetFontFamily,
    dispatchSetBorderRadius
  };
};

export { useCustomizationStore };
