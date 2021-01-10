import React, { useState } from 'react';
import { withA11y } from '@storybook/addon-a11y';

import SideNavigation from './SideNavigation';

const sideNavigationMenuOptions = [
  {
    label: 'user',
    icon: 'person',
    subOptions: [
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
  {
    label: 'games',
    icon: 'games',
    subOptions: [
      {
        title: 'All Games',
        path: '/games/all',
      },
      {
        title: 'RPG',
        path: '/games/rpg',
      },
      {
        title: 'Racing',
        path: '/games/racing',
      },
      {
        title: 'Puzzle',
        path: '/games/puzzle',
      },
    ],
  },
  {
    label: 'help',
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
  {
    label: 'settings',
    icon: 'settings_applications',
    path: '/settings',
    title: 'Settings',
  },
];

const currentlyViewing = {
  path: '/user/my-info',
  title: 'user',
  backPath: '/',
  backTitle: 'Home',
};

const defaultSelected = {
  option: 'user',
  subOption: 'my info',
};

export default {
  title: 'Components/Navigation/SideNavigation',
  decorators: [withA11y],
};

export const Default = (): JSX.Element => (
  <SideNavigation
    currentlyViewing={currentlyViewing}
    menuOptions={sideNavigationMenuOptions}
    defaultSelected={defaultSelected}
  />
);

export const WithCollapseInitialState = (): JSX.Element => (
  <SideNavigation
    collapsed
    currentlyViewing={currentlyViewing}
    menuOptions={sideNavigationMenuOptions}
    defaultSelected={defaultSelected}
  />
);

export const WithDarkTheme = (): JSX.Element => (
  <SideNavigation
    goDark
    currentlyViewing={currentlyViewing}
    menuOptions={sideNavigationMenuOptions}
    defaultSelected={defaultSelected}
  />
);

export const WithLogo = (): JSX.Element => {
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
};

export const WithLogoAndTitle = (): JSX.Element => (
  <SideNavigation
    currentlyViewing={currentlyViewing}
    menuOptions={sideNavigationMenuOptions}
    defaultSelected={defaultSelected}
    logoAssetPath="https://developmentalfx.org/wp-content/uploads/2018/05/dfx-1.png"
    logoTitle="DevelopmentalFX"
  />
);
