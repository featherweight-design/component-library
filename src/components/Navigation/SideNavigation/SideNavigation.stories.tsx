import React, { useState } from 'react';
import { withA11Y } from '@storybook/addon-a11y';
import { storiesOf } from '@storybook/react';

import SideNavigation from './SideNavigation';

const sideNavigationMenuOptions = {
  user: {
    icon: 'person',
    subOption: [
      {
        title: 'My Info',
        path: '/user/my-info',
      },
      {
        title: 'Notifications',
        path: '/user/notifications',
      },
      {
        title: 'Logout',
        path: '/logout',
      },
    ],
  },
  help: {
    icon: 'help',
    subOptions: [
      {
        title: 'Contact Us',
        path: '/help/contact',
      },
      {
        title: 'Feedback',
        path: '/help/feedback',
      },
    ],
  },
  settings: {
    icon: 'settings_applications',
    path: '/settings',
    title: 'Settings',
  },
};

const currentlyViewing = {
  path: '/user/my info',
  title: 'user',
  backPath: '/',
  backTitle: 'Home',
};

const defaultSelected = {
  option: 'user',
  subOption: 'my info',
};

storiesOf('Navigation/Side Navigation', module)
  .addDecorator(withA11Y)
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
  .add('With logo', () => {
    const [showBackButton, toggleOnGoBack] = useState(true);

    return (
      <SideNavigation
        currentlyViewing={currentlyViewing}
        menuOptions={sideNavigationMenuOptions}
        defaultSelected={defaultSelected}
        logoAssetPath="https://developmentalfx.org/wp-content/uploads/2018/05/dfx-1.png"
        showBackButton={showBackButton}
        onGoBack={(): void => {
          toggleOnGoBack(false);
          setTimeout(() => toggleOnGoBack(true), 1000);
        }}
      />
    );
  })
  .add('With logo and title', () => (
    <SideNavigation
      currentlyViewing={currentlyViewing}
      menuOptions={sideNavigationMenuOptions}
      defaultSelected={defaultSelected}
      logoAssetPath="https://developmentalfx.org/wp-content/uploads/2018/05/dfx-1.png"
      logoTitle="DevelopmentalFX"
    />
  ))
  .add('Dark theme', () => (
    <SideNavigation
      goDark
      currentlyViewing={currentlyViewing}
      menuOptions={sideNavigationMenuOptions}
      defaultSelected={defaultSelected}
    />
  ));
