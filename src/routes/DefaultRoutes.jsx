import { Navigate } from 'react-router-dom';

const DefaultRoutes = {
  path: '*',
  element: <Navigate to="/" replace />
};

export default DefaultRoutes;
