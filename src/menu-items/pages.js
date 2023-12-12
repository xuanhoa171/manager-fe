// assets
import {
  IconBuildingCommunity,
  IconClock,
  IconFileDescription,
  IconKey,
  IconUser,
  IconSchool,
  IconBrandRedhat,
  IconCertificate,
  IconLayersIntersect
} from '@tabler/icons';

// constant
const icons = {
  IconKey,
  IconUser,
  IconClock,
  IconBuildingCommunity,
  IconFileDescription,
  IconSchool,
  IconBrandRedhat,
  IconCertificate,
  IconLayersIntersect
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
    {
      id: 'student',
      title: 'menu.shifts',
      type: 'item',
      url: '/students',
      icon: icons.IconSchool
    },
    {
      id: 'teacher',
      title: 'menu.teacher',
      type: 'item',
      url: '/teacher',
      icon: icons.IconBrandRedhat
    },
    {
      id: 'course',
      title: 'menu.course',
      type: 'item',
      url: '/course',
      icon: icons.IconCertificate
    },
    {
      id: 'class',
      title: 'menu.class',
      type: 'item',
      url: '/class',
      icon: icons.IconLayersIntersect
    }
    // {
    //   id: 'organization',
    //   title: 'menu.organization',
    //   type: 'item',
    //   url: '/organization',
    //   icon: icons.IconBuildingCommunity
    // },
    // {
    //   id: 'request-form',
    //   title: 'menu.requestForm',
    //   type: 'collapse',
    //   icon: icons.IconFileDescription,

    //   children: [
    //     {
    //       id: 'leave-request',
    //       title: 'menu.submenu.requestForm.leaveRequest',
    //       type: 'item',
    //       url: '/request-form/leave-request'
    //     },
    //     {
    //       id: 'late-attendance-request',
    //       title: 'menu.submenu.requestForm.lateAttendanceRequest',
    //       type: 'item',
    //       url: '/request-form/late-attendance-request'
    //     },
    //     {
    //       id: 'forgot-checkout-report',
    //       title: 'menu.submenu.requestForm.forgotCheckoutReport',
    //       type: 'item',
    //       url: '/request-form/forgot-checkout-report'
    //     }
    //   ]
    // }
  ]
};

export default pages;
