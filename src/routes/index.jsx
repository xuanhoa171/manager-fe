import { useRoutes } from 'react-router-dom';

// routes
import AuthenticationRoutes from './AuthenticationRoutes';
import DefaultRoutes from './DefaultRoutes';
import MainRoutes from './MainRoutes';

export default function Routes() {
  // Xử lý update routes dynamic theo trạng thái login
  return useRoutes([MainRoutes, AuthenticationRoutes, DefaultRoutes]);
}
