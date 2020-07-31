import {
  ReactChild,
  MouseEvent,
  ChangeEvent,
  KeyboardEvent,
  MutableRefObject,
} from 'react';

//* DemoButton Types
export interface DemoButtonProps {
  onClick: () => void;
  value: string;
  disabled?: boolean;
  loading?: boolean;
  backgroundColor?: string;
}

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
   * Useful for Pendo tracking
   */
  dataId?: string;
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
  /**
   * Useful for Pendo tracking
   */
  dataId?: string;
  /**
   * Determines the design system to be used for the button's icon
   */
  designSystem?: IconDesignSystemType;
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

//* Alert Types
export interface AlertProps {
  /**
   * Applied to the `div` container
   */
  className?: string;
  /**
   * Time in milliseconds to auto-close; component will be omnipresent otherwise
   */
  delay?: number;
  description?: string;
  /**
   * Children shown through an `Accordion` component
   */
  details?: ReactChild | ReactChild[];
  /**
   * Passes to the `maxHeight` prop of the details `Accordion` component; should be in CSS approved unit of measure (e.g. 'px', 'em', 'rem', etc.)
   */
  detailsHeight?: string;
  /**
   * Will allow for closing of `Alert`; component will be omnipresent otherwise
   */
  onClose?: () => void;
  title?: string;
  /**
   * Defines `Alert` styling
   */
  type?: AlertType;
}

export type AlertType = 'error' | 'info' | 'success' | 'warning';

//* AutoSuggest Types
export interface AutoSuggestProps extends InputProps {
  /**
   * A method to be fired once the `searchThreshold` has been reached and after a brief 500ms delay in typing
   */
  onSearch: (searchValue: string) => void;
  onSelectResult: (result: Suggestion) => void;
  /**
   * An array of `Suggestion` objects (`{ label: string, value: string }`)
   */
  suggestions: Suggestion[];
  /**
   * Numerical value for the minimum length needed to fire the `onSearch` method
   */
  searchThreshold?: number;
  loading?: boolean;
}

export type Suggestion = {
  label: string;
  value: string;
};

//* Button Types
export interface ButtonProps {
  children: string | number | ReactChild | ReactChild[];
  /**
   * Applied to the native `button` element
   */
  className?: string;
  /**
   * Useful for Pendo tracking
   */
  dataId?: string;
  disabled?: boolean;
  id?: string;
  /**
   * Sets DOM focus to this element on render
   */
  initialFocus?: boolean;
  loading?: boolean;
  /**
   * Defines `Button` styling
   */
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  type?: ButtonType;
}

type ButtonType =
  | 'default'
  | 'default-destructive'
  | 'neutral'
  | 'brand'
  | 'outline-brand'
  | 'destructive'
  | 'outline-destructive';

//* CircleLoader Types
export interface CircleLoaderProps {
  /**
   * Applied to the `div` container
   */
  className?: string;
  /**
   * Default value of `currentColor` inherits `color` property from parent element
   */
  color?: string;
  /**
   * Adjusts size by given value; should be in CSS approved unit of measure (e.g. 'px', 'em', 'rem', etc.)
   */
  size?: string;
}

//* DeleteConfirmationDrawer Types
export interface DeleteConfirmationDrawerProps {
  isShown: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  /**
   * Custom hex value; text `color` prop will be black or white based on value passed
   */
  backgroundColor?: string;
  /**
   * Applied to the `div` container
   */
  className?: string;
  /**
   * Useful for Pendo tracking
   */
  dataId?: string;
  /**
   * Applied to the confirm `Button` control
   */
  loading?: boolean;
  /**
   * Pop-out origin location of the component
   */
  origin?: DeleteConfirmationOrigin;
}

export type DeleteConfirmationOrigin = 'top' | 'right' | 'bottom' | 'left';

//* Icon Types
export interface IconProps {
  icon: string;
  className?: string;
  color?: string;
  /**
   * Useful for Pendo tracking
   */
  dataId?: string;
  designSystem?: IconDesignSystemType;
  id?: string;
  onClick?: () => void;
  size?: string;
  title?: string;
}

type IconDesignSystemType = 'lightning' | 'material';

export interface IconArgsType {
  icon: string;
  className?: string;
  color?: string;
  designSystem?: IconDesignSystemType;
}

//* Input Types
export interface InputProps {
  name: string;
  value: string | number;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  /**
   * Hides the `<p>` element for the `errorMessage` prop when set to `false`
   */
  canHaveErrorMessage?: boolean;
  /**
   * Applied to the `div` container
   */
  className?: string;
  /**
   * Useful for Pendo tracking
   */
  dataId?: string;
  disabled?: boolean;
  errorMessage?: string;
  /**
   * Shows an `Icon` component at the right side of the `Input` (`{ icon: string, className?: string, color?: string, designSystem: 'lightning' | 'material' }`)
   */
  icon?: IconArgsType;
  id?: string;
  /**
   * Sets DOM focus to this element on render
   */
  initialFocus?: boolean;
  label?: string;
  loading?: boolean;
  max?: string;
  min?: string;
  onBlur?: (event: ChangeEvent) => void;
  onKeyDown?: (event: KeyboardEvent) => void;
  onKeyUp?: (event: KeyboardEvent) => void;
  placeholder?: string;
  required?: boolean;
  type?: string;
}

//* LoadingSpinner Types
export interface LoadingSpinnerProps {
  /**
   * Applied to the `div` container
   */
  className?: string;
  delayMilliseconds?: number;
  /**
   * Adjusts size by given value; should be in CSS approved unit of measure (e.g. 'px', 'em', 'rem', etc.)
   */
  size?: string;
  /**
   * Changes the thickness of each circle
   */
  type?: 'small' | 'medium' | 'large';
}

//* NavigationControls Types
export interface NavigationControlsProps {
  /**
   * The id attribute for the current element that the pointer should anchor on
   */
  anchorId: string;
  /**
   * An array of all tag ids the navigation pointer can target
   */
  anchorIdCollection: string[];
  /**
   * Action fired when moving back; passes previous tag id
   */
  onBack: (tagId: string) => void;
  /**
   * Action fired when moving next; passes next tag id
   */
  onNext: (tagId: string) => void;
  className?: string;
  disabled?: boolean;
  /**
   * Shows/hides the controls
   */
  isShown?: boolean;
  /**
   * Enables the completion button when passed; requires onComplete to be passed
   */
  isComplete?: boolean;
  /**
   * Language object for localization of copy content
   */
  language?: NavigationControlsLanguage;
  /**
   * An optional cancel method; the "Cancel" button will not render if this is not passed
   */
  onCancel?: () => void;
  /**
   * An optional complete method; the "Complete" button will not render if this is not passed
   */
  onComplete?: () => void;
  /**
   * An optional method fired when the logo is clicked; the logo will be present but disabled if this is not passed
   */
  onLogoClick?: () => void;
  /**
   * Props passed when rendering a ProgressBar as part of the NavigationControls
   */
  progress?: NavigationControlsProgress;
}

export interface NavigationControlsLanguage {
  back: string;
  begin: string;
  cancel: string;
  complete: string;
  next: string;
  of: string;
  percentageComplete: string;
  total: string;
}

export interface NavigationControlsProgress {
  itemsToComplete: ProgressItem[];
  color?: string;
  language?: ProgressBarLanguage;
  shouldShowCountComplete?: boolean;
  shouldShowPercentageComplete?: boolean;
}

export type NavigationControlsDeviceSize = 'tablet' | 'mobile' | 'small-mobile';

export interface AddOnResizeListenerArgs {
  deviceSize: NavigationControlsDeviceSize;
  updateDeviceSize: (deviceSize: NavigationControlsDeviceSize) => void;
}

//* NavigationPointer Types
export interface NavigationPointerProps {
  /**
   * The id attribute for the current element that the pointer should anchor on
   */
  anchorId: string;
  /**
   * An array of all tag ids the navigation pointer can target
   */
  anchorIdCollection: string[];
  /**
   * The component's containing element
   */
  boundingElement: HTMLElement;
  /**
   * The element that the component should run alongside of
   */
  targetElement: HTMLElement;
  /**
   * Action fired when moving back; passes previous tag id
   */
  onBack: (tagId: string) => void;
  /**
   * Action fired when moving next; passes next tag id
   */
  onNext: (tagId: string) => void;
  /**
   * Allows for the enabling/disabling of keyboard arrow controls for the component; event listeners are added to the boundingElement
   */
  areKeyboardControlsEnabled?: boolean;
  /**
   * Allows for the enabling/disabling of keyboard arrow control hints
   */
  areKeyboardHintsShown?: boolean;
  /**
   * Allows for the enabling/disabling of keyboard tab controls for the component; event listeners are added to the boundingElement
   */
  areTabControlsEnabled?: boolean;
  className?: string;
  disabled?: boolean;
  /**
   * Replaces the logo of the pointer with a "success" icon
   */
  isComplete?: boolean;
  /**
   * Shows/hides the pointer
   */
  isShown?: boolean;
  /**
   * Language object for localization of copy content
   */
  language?: NavigationPointerLanguage;
  /**
   * Determines which side of the target element that the pointer should appear on
   */
  location?: LocationEnum;
  /**
   * Determines the distance from the target element the pointer should sit in pixels
   */
  paddingFromTarget?: number;
  /**
   * Allows for the horizontal positioning to update if the scale of the document changes
   */
  scale?: number;
}

export type LocationEnum = 'right' | 'left';

export type PositionIndicatorEnum = 'above' | 'below' | false;

export interface NavigationPointerLanguage {
  back: string;
  begin: string;
  down: string;
  next: string;
  of: string;
  return: string;
  up: string;
}

export interface PositionStyles {
  top: string;
  right?: string;
  left?: string;
}

export interface HeightDifference {
  top: number;
  bottom: number;
}

export interface PointerStyles extends PositionStyles {
  width: number | string;
  height: number | string;
}

export interface GetPointerTopArgs {
  anchorId: string;
  boundingElement: HTMLElement;
  heightDifference: HeightDifference;
}

export interface GetPointerHorizontalArgs {
  boundingElement: HTMLElement;
  location: LocationEnum;
  paddingFromTarget: number;
  targetElement: HTMLElement;
}

export interface GetUpdateStylesArgs {
  anchorId: string;
  boundingElement: HTMLElement;
  location: LocationEnum;
  paddingFromTarget: number;
  pointerStyles: PointerStyles;
  targetElement: HTMLElement;
  heightDifference: HeightDifference;
}

export interface GetPositionIndicatorStylesArgs {
  boundingElement: HTMLElement;
  positionIndicator: PositionIndicatorEnum;
}

export interface AddArrowControlListenerArgs {
  boundingElement: HTMLElement;
  onLeftKeyDown: () => void;
  onRightKeyDown: () => void;
}

export interface AddReturnControlListenerArgs {
  onReturnDown: () => void;
}

export interface AddTabControlListenerArgs {
  boundingElement: HTMLElement;
  onShiftTabDown: () => void;
  onTabDown: () => void;
  isShiftDownRef: MutableRefObject<boolean>;
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
}

//* Select Types
export interface SelectProps {
  children: ReactChild | ReactChild[];
  name: string;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  value: string | string[];
  className?: string;
  /**
   * Useful for Pendo tracking
   */
  dataId?: string;
  disabled?: boolean;
  errorMessage?: string;
  id?: string;
  /**
   * Sets DOM focus to this element on render
   */
  initialFocus?: boolean;
  label?: string;
  loading?: boolean;
  multiple?: boolean;
  placeholder?: string;
  required?: boolean;
}

//* SideDrawer Types
export interface SideDrawerProps {
  children: ReactChild | ReactChild[];
  shown: boolean;
}

//* TextArea Types
export interface TextAreaProps {
  name: string;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  value: string;
  className?: string;
  /**
   * Useful for Pendo tracking
   */
  dataId?: string;
  disabled?: boolean;
  errorMessage?: string;
  id?: string;
  /**
   * Sets DOM focus to this element on render
   */
  initialFocus?: boolean;
  label?: string;
  max?: number;
  min?: number;
  maxLengthMessage?: string;
  minLengthMessage?: string;
  placeholder?: string;
  required?: boolean;
}
