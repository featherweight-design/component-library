import { withA11y } from '@storybook/addon-a11y';

import HeaderMenu from './HeaderMenu';

const subOptions = [
  {
    icon: 'group',
    label: 'User Management',
    path: '/user-management',
    hasAccess: true,
  },
  {
    icon: 'account_tree',
    label: 'Permissions',
    path: '/permissions',
    hasAccess: true,
  },
  {
    icon: 'mail',
    label: 'Support',
    path: '/support',
    hasAccess: true,
  },
  {
    icon: 'info',
    label: 'Info',
    path: '/info',
    hasAccess: true,
  },
];

export default {
  title: 'Components/Navigation/HeaderMenu',
  decorators: [withA11y],
};

export const Default = (): JSX.Element => (
  <HeaderMenu
    currentlyViewing={{
      title: 'Best Site',
      subTitle: 'ever',
      path: '/best-site',
    }}
    menuOptions={{
      settings: {
        icon: 'settings',
        path: '/settings',
      },
      notifications: {
        icon: 'notifications',
        path: '/notifications',
      },
      search: {
        icon: 'search',
      },
    }}
  />
);

export const WithDarkTheme = (): JSX.Element => (
  <HeaderMenu
    goDark
    currentlyViewing={{
      title: 'Permissions',
      path: '/permissions',
    }}
    menuOptions={{
      settings: {
        subTitle: 'Bob H.',
        icon: 'settings',
        subOptions,
      },
    }}
  />
);

export const WithIndicator = (): JSX.Element => (
  <HeaderMenu
    currentlyViewing={{
      title: 'Notifications',
      path: '/notifications',
    }}
    menuOptions={{
      notifications: {
        icon: 'notifications',
        path: '/notifications',
        indicator: true,
        isActive: true,
      },
      search: {
        icon: 'search',
      },
    }}
  />
);

export const WithoutTitle = (): JSX.Element => (
  <HeaderMenu
    currentlyViewing={{
      path: '/support',
    }}
    menuOptions={{
      settings: {
        subTitle: 'Bob H.',
        icon: 'settings',
        subOptions,
      },
    }}
  />
);

export const WithSubOptions = (): JSX.Element => (
  <HeaderMenu
    currentlyViewing={{
      title: 'Permissions',
      path: '/permissions',
    }}
    menuOptions={{
      settings: {
        subTitle: 'Bob H.',
        icon: 'settings',
        subOptions,
      },
    }}
  />
);
