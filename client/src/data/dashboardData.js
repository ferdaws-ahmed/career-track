import { Home, Briefcase, User, Settings } from 'lucide-react';

export const sidebarLinks = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: Home,
    path: '/dashboard',
  },
  {
    id: 'applications',
    label: 'Applications',
    icon: Briefcase,
    path: '/dashboard/applications',
  },
  {
    id: 'profile',
    label: 'Profile',
    icon: User,
    path: '/dashboard/profile',
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: Settings,
    path: '/dashboard/settings',
  },
];
