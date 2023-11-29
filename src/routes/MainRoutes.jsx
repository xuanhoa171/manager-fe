import { lazy } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { useAuthenticationStore } from '~/hooks/authentication';

// project imports
import MainLayout from '~/layout/MainLayout';
import Loadable from '~/ui-component/Loadable';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('~/views/dashboard/Default')));

// sample page routing
const UserPage = Loadable(lazy(() => import('~/views/pages/users')));
const Shifts = Loadable(lazy(() => import('~/views/pages/shifts')));
const OrganizationPage = Loadable(lazy(() => import('~/views/pages/organization')));
const ForgotCheckoutReportPage = Loadable(lazy(() => import('~/views/pages/requestForm/ForgotCheckoutReport')));
const LeaveRequestPage = Loadable(lazy(() => import('~/views/pages/requestForm/LeaveRequest')));
const LateAttendanceRequestPage = Loadable(lazy(() => import('~/views/pages/requestForm/LateAttendanceRequest')));

function ProtectedRoute() {
  // Kiểm tra trạng thái đăng nhập ở đây
  const { authenticationState } = useAuthenticationStore(); // Thay checkLoginStatus bằng hàm kiểm tra trạng thái đăng nhập thực tế

  return authenticationState.loginInfo ? (
    <MainLayout>
      <Outlet />
    </MainLayout>
  ) : (
    <Navigate to="/login" replace />
  );
}

const MainRoutes = {
  path: '/',
  element: <ProtectedRoute />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    },
    {
      path: 'users',
      element: <UserPage />
    },
    {
      path: 'shifts',
      element: <Shifts />
    },
    {
      path: 'organization',
      element: <OrganizationPage />
    },
    {
      path: 'request-form',
      children: [
        {
          path: 'leave-request',
          element: <LeaveRequestPage />
        },
        {
          path: 'late-attendance-request',
          element: <LateAttendanceRequestPage />
        },
        {
          path: 'forgot-checkout-report',
          element: <ForgotCheckoutReportPage />
        }
      ]
    }
  ]
};

export default MainRoutes;
