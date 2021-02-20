import { ChangeEvent, ReactChild } from 'react';

type Children = ReactChild | ReactChild[];

//* Accordion Types
export interface AccordionProps {
  children: Children;
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
export interface ActionButtonProps {
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
  /**
   * Determines border-radius of the Button
   */
  shape?: ButtonShape;
  type?: ButtonType;
  children?: Children;
}

export type ActionButtonShape = 'round' | 'rounded-square' | 'square';

export type ActionButtonSize =
  | 'x-small' // 36px
  | 'small' // 42px
  | 'medium' // 28px
  | 'large' // 54px
  | 'x-large'; // 60px

export type ActionButtonVariant = 'primary' | 'secondary' | 'glass';

//* Button Types
export interface ButtonProps {
  /**
   * Value of the button
   */
  children: string | number | Children;
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
  type?: ButtonType;
  /**
   * Style overrides for backgroundColor, borderColor, and color
   */
  style?: ButtonStyles;
}

export type ButtonType = 'submit' | 'reset' | 'button';

export type ButtonShape = 'round' | 'rounded-square' | 'square';

export interface ButtonStyles {
  backgroundColor?: string;
  borderColor?: string;
  color?: string;
}

export type ButtonVariant =
  | 'default-destructive'
  | 'brand'
  | 'neutral'
  | 'outline'
  | 'destructive'
  | 'outline-destructive'
  | 'glass';

//* Checkbox Types
export interface CheckboxProps {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  options: CheckboxOption[];
  label?: string;
  other?: OtherOptionType;
  className?: string;
  errorMessage?: string;
}

export interface CheckboxOption {
  checked: boolean;
  label: string;
  disabled?: boolean;
}

//* CircleLoader Types
export interface CircleLoaderProps {
  size?: string | number;
  color?: string;
  className?: string;
}

//* HeaderMenu Types
export interface HeaderMenuProps {
  currentlyViewing: CurrentlyViewing;
  menuOptions: HeaderMenuOptions;
  defaultTitle?: string;
  onNavigate?: (currentlyViewing: CurrentlyViewing) => void;
  goDark?: boolean;
  className?: string;
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

//* Icon Types
export interface IconProps {
  icon: string;
  className?: string;
  color?: string;
  id?: string;
}

export interface IconArgsType {
  icon: string;
  className?: string;
}

//* Input Types
export interface InputProps {
  name: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  label: string;
  id?: string;
  type?: string;
  placeholder?: string;
  min?: string;
  max?: string;
  disabled?: boolean;
  className?: string;
  errorMessage?: string;
}

//* Navigation Types
export interface CurrentlyViewingTab {
  label: string;
  path: string;
  disabled: boolean;
}

export interface CurrentlyViewing {
  path: string;
  title?: string;
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

//* Radio Types
export interface RadioProps {
  options: string[];
  selected: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  other?: OtherOptionType;
  disabled?: boolean;
  className?: string;
  errorMessage?: string;
}

//* Reveal Types
export interface RevealProps {
  children: Children;
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
  value: any /* eslint-disable-line @typescript-eslint/no-explicit-any */;
  label: string;
}

export interface OtherOptionType {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

//* SideNavigation Types
export interface SideNavigationProps {
  menuOptions: SideNavigationOption[];
  currentlyViewing: CurrentlyViewing;
  onGoBack?: (currentlyViewing: CurrentlyViewing) => void;
  defaultSelected?: {
    option: string;
    subOption: string;
  };
  collapsed?: boolean;
  onCollapse?: (isCollapsed: boolean) => void;
  showBackButton?: boolean;
  onNavigate?: (currentlyViewing: CurrentlyViewing) => void;
  logo?: SideNavigationLogo;
  goDark?: boolean;
  className?: string;
}

export interface SideNavigationLogo {
  src?: string;
  alt?: string;
  title?: string;
}

export interface SideNavigationSelection {
  option?: string;
  subOption?: string;
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

//* TextArea types

export interface TextAreaProps {
  name: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  id?: string;
  label?: string;
  placeholder?: string;
  min?: number;
  max?: number;
  disabled?: boolean;
  className?: string;
  errorMessage?: string;
}
