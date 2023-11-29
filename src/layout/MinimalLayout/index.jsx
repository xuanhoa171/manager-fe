import { memo } from 'react';
import { Outlet } from 'react-router-dom';

// project imports
// import Customization from '../Customization';

const MinimalLayout = () => (
  <>
    <Outlet />
    {/* <Customization /> */}
  </>
);

export default memo(MinimalLayout);
