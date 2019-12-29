// FORM
export interface SelectOptionType {
  value: string;
  label: string;
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

export interface SideNavigationOptions {
  [key: string]: SideNavigationOption;
}

export interface SideNavigationOption {
  icon: string;
  subOptions: string[];
  titleType: 'option' | 'subOption' | 'option subOption' | 'subOption option';
}
