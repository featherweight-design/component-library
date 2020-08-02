import { ChangeEvent, ReactChild } from 'react';

//* ActionButton Types
export interface ActionButtonProps {
  onClick: () => void;
  /**
   * Applied to the outer container of the button
   */
  className?: string;
  /**
   * Useful for Pendo tracking
   */
  dataId?: string;
  disabled?: boolean;
  /**
   * Text to appear beneath the button
   */
  label?: string;
  loading?: boolean;
  /**
   * Icon to be rendered inside of the action button
   */
  icon?: string;
  id?: string;
  image?: string;
  size?: ActionButtonSize;
  type?: ActionButtonType;
}

export type ActionButtonSize =
  | 'x-small'
  | 'small'
  | 'medium'
  | 'large'
  | 'x-large';

export type ActionButtonType = 'primary' | 'secondary';

//* HeaderMenu Types
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

//* Icon Types
export interface IconProps {
  icon: string;
  className?: string;
  color?: string;
  dataId?: string;
  id?: string;
  onClick?: () => void;
  size?: string;
}

export interface IconArgsType {
  icon: string;
  className?: string;
  color?: string;
}

//* Navigation Types
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

//* ProgressBar Types
export interface ProgressBarProps {
  itemsToComplete: ProgressItem[];
  className?: string;
  color?: string;
  isRounded?: boolean;
  language?: ProgressBarLanguage;
  shouldShowCompleteIcon?: boolean;
  shouldShowCountComplete?: boolean;
  shouldShowPercentageComplete?: boolean;
  size?: ProgressBarSizes;
}

export interface ProgressItem {
  isComplete: boolean;
}

export interface ProgressBarLanguage {
  complete: string;
  of: string;
}

export type ProgressBarSizes =
  | 'x-small'
  | 'small'
  | 'medium'
  | 'large'
  | 'x-large';

//* Reveal Types
export interface RevealProps {
  children: ReactChild | ReactChild[];
  isShown: boolean;
  /**
   * Applied to the `div` container
   */
  className?: string;
  /**
   * Padding applied to the parent container to cover bleeding children styles such as box-shadow
   */
  padding?: string;
}

//* Select Types
export interface SelectProps {
  onSelect: (option: SelectOptionType) => void;
  selected?: SelectOptionType;
  options?: SelectOptionType[];
  id?: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  multiple?: boolean;
  className?: string;
  errorMessage?: string;
}

export interface SelectOptionType {
  value: any /*eslint-disable-line @typescript-eslint/no-explicit-any*/;
  label: string;
}

export interface OtherOptionType {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

//* SideNavigation Types
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
