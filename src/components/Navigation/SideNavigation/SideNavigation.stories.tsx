import * as React from 'react';
import { checkA11y } from '@storybook/addon-a11y';
import { storiesOf } from '@storybook/react';

import SideNavigation from './SideNavigation';

const sideNavigationMenuOptions = {
  user: {
    icon: 'person',
    titleType: 'subOption option',
    subOptions: ['my info', 'notifications', 'logout'],
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
};

const defaultSelected = {
  option: 'user',
  subOption: 'my info',
};

storiesOf('Navigation/Side Navigation', module)
  .addDecorator(checkA11y)
  .add('Default', () => (
    <SideNavigation
      currentlyViewing={currentlyViewing}
      menuOptions={sideNavigationMenuOptions}
      defaultSelected={defaultSelected}
    />
  ))
  .add('Collapsed by default', () => (
    <SideNavigation
      collapsed
      currentlyViewing={currentlyViewing}
      menuOptions={sideNavigationMenuOptions}
      defaultSelected={defaultSelected}
    />
  ))
  .add('With logo', () => (
    <SideNavigation
      currentlyViewing={currentlyViewing}
      menuOptions={sideNavigationMenuOptions}
      defaultSelected={defaultSelected}
      logoAssetPath="https://developmentalfx.org/wp-content/uploads/2018/05/dfx-1.png"
      showBackButton
    />
  ))
  .add('With logo and title', () => (
    <SideNavigation
      currentlyViewing={currentlyViewing}
      menuOptions={sideNavigationMenuOptions}
      defaultSelected={defaultSelected}
      logoAssetPath="https://developmentalfx.org/wp-content/uploads/2018/05/dfx-1.png"
      logoTitle="DevelopmentalFX"
    />
  ));
