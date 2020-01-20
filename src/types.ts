import { ChangeEvent } from 'react';

// FORM
export interface SelectOptionType {
  value: any /*eslint-disable-line @typescript-eslint/no-explicit-any*/;
  label: string;
}

export interface OtherOptionType {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

// NAVIGATION
export interface CurrentlyViewingTab {
  label: string;
  path: string;
  disabled: boolean;
}

export interface CurrentlyViewing {
  path: string;
  title: string;
  subTitle?: string;
  backPath?: string;
  backTitle?: string;
  tabs?: {
    currentTab: string;
    tabs: CurrentlyViewingTab[];
  };
}

export interface HeaderMenuOptions {
  [key: string]: HeaderMenuOption;
}

export interface HeaderMenuOption {
  icon: string;
  subTitle?: string;
  subOptions?: HeaderMenuSubOption[];
  path?: string;
  indicator?: number | boolean;
  isActive?: boolean;
}

export interface HeaderMenuSubOption {
  icon: string;
  label: string;
  hasAccess: boolean;
  path?: string;
  href?: string;
}

export interface SideNavigationOption {
  label: string;
  icon: string;
  path?: string;
  title?: string;
  subOptions?: SideNavigationSubOption[];
}

export interface SideNavigationSubOption {
  path: string;
  title: string;
}
