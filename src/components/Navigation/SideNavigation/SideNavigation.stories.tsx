import { useState } from 'react';
import { withA11y } from '@storybook/addon-a11y';

import { sideNavigationCopy } from 'shared/data/copyContent';
import fwdLogo from 'styles/assets/images/Logo-Mock-1-Square-Inverted.jpg';
import SideNavigation from './SideNavigation';

const {
  backTitle,
  icons,
  logoTitle,
  optionLabels,
  optionTitles,
  paths,
  subOptionLabels,
} = sideNavigationCopy;

const sideNavigationMenuOptions = [
  {
    label: optionLabels.user,
    icon: icons.user,
    subOptions: [
      {
        title: subOptionLabels.myInfo,
        path: paths.myInfo,
      },
      {
        title: subOptionLabels.notifications,
        path: paths.notifications,
      },
      {
        title: subOptionLabels.logout,
        path: paths.logout,
      },
    ],
  },
  {
    label: optionLabels.games,
    icon: icons.games,
    subOptions: [
      {
        title: subOptionLabels.allGames,
        path: paths.allGames,
      },
      {
        title: subOptionLabels.rpg,
        path: paths.rpg,
      },
      {
        title: subOptionLabels.racing,
        path: paths.racing,
      },
      {
        title: subOptionLabels.puzzle,
        path: paths.puzzle,
      },
    ],
  },
  {
    label: optionLabels.help,
    icon: icons.help,
    subOptions: [
      {
        title: subOptionLabels.contact,
        path: paths.contact,
      },
      {
        title: subOptionLabels.feedback,
        path: paths.feedback,
      },
    ],
  },
  {
    label: optionLabels.settings,
    icon: icons.settings,
    path: paths.settings,
    title: optionTitles.settings,
  },
];

const currentlyViewing = {
  path: paths.myInfo ,
  title: optionLabels.user,
  backPath: paths.home,
  backTitle,
};

const defaultSelected = {
  option: optionLabels.user,
  subOption: subOptionLabels.myInfo,
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
      logoAssetPath={fwdLogo}
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
    logoAssetPath={fwdLogo}
    logoTitle={logoTitle}
  />
);
