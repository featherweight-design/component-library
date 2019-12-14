import * as React from 'react';
import { checkA11y } from '@storybook/addon-a11y';
import { storiesOf } from '@storybook/react';

import SideNavigation from './SideNavigation';

const sideNavigationMenuOptions = {
  user: {
    icon: 'person',
    titleType: 'subOption option',
    subOptions: [
      'my info',
      'notifications',
      'logout'
    ],
  },
  settings: {
    icon: 'settings_applications',
    titleType: 'subOption',
    subOptions: ['preferences', 'help', 'feedback'],
  },
};

const currentlyViewing = {
  path: '/user/my info',
  title: 'user',
}

storiesOf('Navigation/Side Navigation', module)
  .addDecorator(checkA11y)
  .add('Default', () => (
    <SideNavigation
      currentlyViewing={currentlyViewing}
      menuOptions={sideNavigationMenuOptions}
      defaultSelected={{
        option: 'user',
        subOption: 'my info',
      }}
    />
  )).add('Collapsed by default', () => (
    <SideNavigation
      isCollapsed
      currentlyViewing={currentlyViewing}
      menuOptions={sideNavigationMenuOptions}
      defaultSelected={{
        option: 'user',
        subOption: 'my info',
      }}
    />
  ))