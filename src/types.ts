import { ChangeEvent, ReactChild, ButtonHTMLAttributes } from 'react';

//* Accordion Types
export interface AccordionProps {
  children: ReactChild | ReactChild[];
  /**
   * Applied to parent container
   */
  className?: string;
  /**
   * Applied to content container
   */
  contentClassName?: string;
  /**
   * Developer control over expansion
   */
  expanded?: boolean;
  /**
   * Adjust height by given value; should be in CSS approved unit of measure (e.g. 'px', 'em', 'rem', etc.)
   */
  maxHeight?: string;
  /**
   * Content grouping label
   */
  title?: string;
}

//* ActionButton Types
export interface ActionButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClick: () => void;
  /**
   * Applied to the outer container of the button
   */
  className?: string;
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
  /**
   * Image to be used in place of an icon
   */
  image?: string;
  size?: ActionButtonSize;
  variant?: ActionButtonVariant;
}

export type ActionButtonSize =
  | 'x-small'
  | 'small'
  | 'medium'
  | 'large'
  | 'x-large';

export type ActionButtonVariant = 'primary' | 'secondary' | 'glass';

//* Button Types
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Value of the button
   */
  children: string | number | ReactChild | ReactChild[];
  onClick: () => void;
  id?: string;
  variant?: ButtonVariant;
  name?: string;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  /**
   * Determines border-radius of the Button
   */
  shape?: ButtonShape;
}

export type ButtonVariant =
  | 'default-destructive'
  | 'brand'
  | 'neutral'
  | 'outline'
  | 'destructive'
  | 'outline-destructive'
  | 'glass';

export type ButtonShape = 'round' | 'square' | undefined;

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
