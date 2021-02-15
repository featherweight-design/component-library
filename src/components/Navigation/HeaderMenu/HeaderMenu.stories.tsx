import { withA11y } from '@storybook/addon-a11y';

import { headerMenuCopy } from 'shared/data/copyContent';
import HeaderMenu from './HeaderMenu';

const {
  defaultSubTitle,
  defaultTitle,
  icons,
  subOptionLabels,
  userName,
} = headerMenuCopy;

const subOptions = [
  {
    icon: icons.userManagement,
    label: subOptionLabels.userManagement,
    path: '/user-management',
    hasAccess: true,
  },
  {
    icon: icons.permissions,
    label: subOptionLabels.permissions,
    path: '/permissions',
    hasAccess: true,
  },
  {
    icon: icons.support,
    label: subOptionLabels.support,
    path: '/support',
    hasAccess: true,
  },
  {
    icon: icons.info,
    label: subOptionLabels.info,
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
      title: defaultTitle,
      subTitle: defaultSubTitle,
      path: '/best-site',
    }}
    menuOptions={{
      settings: {
        icon: icons.settings,
        path: '/settings',
      },
      notifications: {
        icon: icons.notifications,
        path: '/notifications',
      },
      search: {
        icon: icons.search,
      },
    }}
  />
);

export const WithDarkTheme = (): JSX.Element => (
  <HeaderMenu
    goDark
    currentlyViewing={{
      title: subOptionLabels.permissions,
      path: '/permissions',
    }}
    menuOptions={{
      settings: {
        subTitle: userName,
        icon: icons.settings,
        subOptions,
      },
    }}
  />
);

export const WithIndicator = (): JSX.Element => (
  <HeaderMenu
    currentlyViewing={{
      title: subOptionLabels.notifications,
      path: '/notifications',
    }}
    menuOptions={{
      notifications: {
        icon: icons.notifications,
        path: '/notifications',
        indicator: true,
        isActive: true,
      },
      search: {
        icon: icons.search,
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
        subTitle: userName,
        icon: icons.settings,
        subOptions,
      },
    }}
  />
);

export const WithSubOptions = (): JSX.Element => (
  <HeaderMenu
    currentlyViewing={{
      title: defaultTitle,
      subTitle: defaultSubTitle,
      path: '/best-site',
    }}
    menuOptions={{
      menu: {
        subTitle: 'Bob H.',
        icon: icons.settings,
        subOptions,
      },
    }}
  />
);
