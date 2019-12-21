import * as React from 'react';
import { checkA11y } from '@storybook/addon-a11y';
import { storiesOf } from '@storybook/react';

import HeaderMenu from './HeaderMenu';

const currentlyViewing = {
  title: 'Notifications',
  path: '/notifications',
};

storiesOf('Navigation/Header Menu', module)
  .addDecorator(checkA11y)
  .add('Default', () => (
    <HeaderMenu
      currentlyViewing={currentlyViewing}
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
      onNavigate={() => {}}
      defaultTitle="Dashboard"
    />
  ))
  .add('With sub-options', () => (
    <HeaderMenu
      currentlyViewing={currentlyViewing}
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
      onNavigate={() => {}}
      defaultTitle="Dashboard"
    />
  ))
  .add('With an indicator', () => (
    <HeaderMenu
      currentlyViewing={currentlyViewing}
      menuOptions={{
        notifications: {
          icon: 'notifications',
          path: '/notifications',
          indicator: true,
          isActive: currentlyViewing.path === '/notifications',
        },
        search: {
          icon: 'search',
        },
      }}
      onNavigate={() => {}}
      defaultTitle="Dashboard"
    />
  ));
