// assets
import { IconDashboard } from '@tabler/icons';

// constant
const icons = { IconDashboard };

const dashboard = {
  id: 'dashboard',
  title: 'menu.dashboard',
  type: 'group',
  children: [
    {
      id: 'default',
      title: 'menu.dashboard',
      type: 'item',
      url: '/dashboard/default',
      icon: icons.IconDashboard,
      breadcrumbs: false
    }
  ]
};

export default dashboard;
