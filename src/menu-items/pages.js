// assets
import { IconBuildingCommunity, IconClock, IconFileDescription, IconKey, IconUser } from '@tabler/icons';

// constant
const icons = {
  IconKey,
  IconUser,
  IconClock,
  IconBuildingCommunity,
  IconFileDescription
};

const pages = {
  id: 'pages',
  title: 'Pages',
  type: 'group',
  children: [
    {
      id: 'users',
      title: 'menu.users',
      type: 'item',
      url: '/users',
      icon: icons.IconUser
    },
    // {
    //   id: 'shifts',
    //   title: 'menu.shifts',
    //   type: 'item',
    //   url: '/shifts',
    //   icon: icons.IconClock
    // },
    {
      id: 'organization',
      title: 'menu.organization',
      type: 'item',
      url: '/organization',
      icon: icons.IconBuildingCommunity
    },
    {
      id: 'request-form',
      title: 'menu.requestForm',
      type: 'collapse',
      icon: icons.IconFileDescription,

      children: [
        {
          id: 'leave-request',
          title: 'menu.submenu.requestForm.leaveRequest',
          type: 'item',
          url: '/request-form/leave-request'
        },
        {
          id: 'late-attendance-request',
          title: 'menu.submenu.requestForm.lateAttendanceRequest',
          type: 'item',
          url: '/request-form/late-attendance-request'
        },
        {
          id: 'forgot-checkout-report',
          title: 'menu.submenu.requestForm.forgotCheckoutReport',
          type: 'item',
          url: '/request-form/forgot-checkout-report'
        }
      ]
    }
  ]
};

export default pages;
