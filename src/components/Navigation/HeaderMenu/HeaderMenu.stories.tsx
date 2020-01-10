import React from 'react';
import { withA11Y } from '@storybook/addon-a11y';
import { storiesOf } from '@storybook/react';

import HeaderMenu from './HeaderMenu';

storiesOf('Navigation/Header Menu', module)
  .addDecorator(withA11Y)
  .add('Default', () => (
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
      defaultTitle="Dashboard"
    />
  ))
  .add('With sub-options', () => (
    <HeaderMenu
      currentlyViewing={{
        title: 'Permissions',
        path: '/permissions',
      }}
      menuOptions={{
        settings: {
          subTitle: 'Bob H.',
          icon: 'settings',
          subOptions: [
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
          ],
        },
      }}
      defaultTitle="Dashboard"
    />
  ))
  .add('With an indicator', () => (
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
      defaultTitle="Dashboard"
    />
  ))
  .add('Dark theme', () => (
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
          subOptions: [
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
          ],
        },
      }}
      defaultTitle="Dashboard"
    />
  ));
