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
        title: 'Lalapalooza',
        subTitle: 'Get Wild',
        path: '/lalapalooza',
      }}
      menuOptions={{
        settings: {
          subTitle: 'Bob H.',
          icon: 'settings',
          subOptions: [
            {
              icon: 'notifications',
              label: 'Notification Preferences',
              path: '/notifications/preferences',
              hasAccess: true,
            },
            {
              icon: 'account_tree',
              label: 'Override Management',
              path: '/override-management/id',
              hasAccess: true,
            },
            {
              icon: 'mail',
              label: 'Feature Request',
              path: '/feature-request',
              hasAccess: true,
            },
            {
              icon: 'info',
              label: 'Support',
              path: '/support',
              hasAccess: true,
            },
            {
              icon: 'person',
              label: 'Profile',
              path: `/profile/:userId`,
              hasAccess: true,
            },
            {
              icon: 'group',
              label: 'Administration',
              path: '/administration',
              hasAccess: true,
            },
            {
              icon: 'network_check',
              label: 'Subscriptions',
              path: '/subscriptions',
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
  ));
