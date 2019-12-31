import React, {
  ReactElement,
  Fragment,
  useState,
  useEffect,
  FunctionComponent,
} from 'react';
import classNames from 'classnames';

import {
  CurrentlyViewing,
  SideNavigationOptions,
  SideNavigationOption,
} from '../../../types';
import ExpansionPanel from '../../ExpansionPanel/ExpansionPanel';
import './SideNavigation.scss';

type SideNavigationProps = {
  menuOptions: SideNavigationOptions;
  currentlyViewing: CurrentlyViewing;
  onGoBack?: (currentlyViewing: CurrentlyViewing) => void;
  defaultSelected: {
    option: string;
    subOption: string;
  };
  collapsed?: boolean;
  onCollapse?: (isCollapsed: boolean) => void;
  showBackButton?: boolean;
  onNavigate?: (currentlyViewing: CurrentlyViewing) => void;
  logoAssetPath?: string;
  logoTitle?: string;
};

const SideNavigation: FunctionComponent<SideNavigationProps> = ({
  menuOptions,
  currentlyViewing,
  onGoBack,
  defaultSelected,
  collapsed,
  onCollapse,
  showBackButton,
  onNavigate,
  logoAssetPath,
  logoTitle,
}: SideNavigationProps) => {
  const [isCollapsed, toggleCollapsed] = useState(collapsed);
  const [selectedOption, setOption] = useState<string | null>(null);
  const [selectedSubOption, setSubOption] = useState<string | null>(null);

  useEffect(() => {
    if (collapsed) {
      const selectedSubOption = currentlyViewing
        ? getPreSelection(Object.keys(menuOptions), currentlyViewing)
        : defaultSelected.option;

      setOption(null);
      setSubOption(selectedSubOption);
    } else {
      const selectedOption = currentlyViewing
        ? getPreSelection(Object.keys(menuOptions), currentlyViewing)
        : defaultSelected.option;
      const selectedSubOption = currentlyViewing
        ? getPreSelection(getSubOptions(menuOptions), currentlyViewing)
        : defaultSelected.subOption;

      setOption(selectedOption);
      setSubOption(selectedSubOption);
    }
  }, []);

  useEffect(() => {
    const newOption = getPreSelection(
      Object.keys(menuOptions),
      currentlyViewing
    );
    const newSubOption = getPreSelection(
      getSubOptions(menuOptions),
      currentlyViewing
    );

    if (newOption !== selectedOption || newSubOption !== selectedSubOption) {
      handleUpdateSelection(newOption, newSubOption);
    }
  }, [currentlyViewing]);

  const getSubOptions = (options: SideNavigationOptions): string[] =>
    Object.keys(options).reduce(
      (accumulator, option) => [...accumulator, ...options[option].subOptions],
      [] as string[]
    );

  const getPreSelection = (
    options: string[],
    currentlyViewing = { path: '/' }
  ): string | null => {
    const locationArray = currentlyViewing.path.split('/');
    const preSelection = locationArray.find(path => {
      const match = options.find((subOption: string) => subOption === path);

      if (match) {
        return match;
      }

      return false;
    });

    return preSelection || null;
  };

  // LOCAL STATE CHANGE/TOGGLE METHODS
  const handleUpdateSelection = (
    newOption: string | null,
    newSubOption: string | null
  ): void => {
    setOption(isCollapsed ? null : newOption);
    setSubOption(newSubOption);
  };

  const handleToggleCollapse = (): void => {
    const selectedOption = Object.keys(menuOptions).find(option =>
      menuOptions[option].subOptions.find(
        subOption => subOption === selectedSubOption
      )
    );

    toggleCollapsed(!isCollapsed);
    setOption(!isCollapsed || !selectedOption ? null : selectedOption);

    if (onCollapse) {
      onCollapse(!isCollapsed);
    }
  };

  const handleSelectOption = (option: string | null): void => {
    if (!isCollapsed && selectedOption === option) {
      setOption(null);
    } else {
      setOption(option);
    }
  };

  const handleSelectSubOption = (subOption: string): void => {
    const subOptionParent = Object.keys(menuOptions).find(option => {
      const match = menuOptions[option].subOptions.find(
        sub => sub === subOption
      );

      if (match) {
        return option;
      }

      return false;
    });

    if (onNavigate && subOptionParent) {
      onNavigate({
        path: `/${subOptionParent.toLowerCase()}/${subOption.toLowerCase()}`,
        title: formatSelectedTitle(subOptionParent, subOption),
      });
    }

    setOption(isCollapsed || !subOptionParent ? null : subOptionParent);
    setSubOption(subOption);
  };

  const handleGoBack = (): void => {
    const { backPath, backTitle } = currentlyViewing;

    if (onGoBack && backPath && backTitle) {
      onGoBack({
        path: backPath,
        title: backTitle,
      });
    }
  };

  // FORMATTING METHODS
  const formatSelectedTitle = (option: string, subOption: string): string => {
    const { titleType } = menuOptions[option];

    let title;

    switch (titleType) {
      case 'option':
        title = option;
        break;
      case 'subOption':
        title = subOption;
        break;
      case 'option subOption':
        title = `${option} ${subOption}`;
        break;
      case 'subOption option':
        title = `${subOption} ${option}`;
        break;
      default:
        title = option;
        break;
    }

    return title;
  };

  // RENDER METHODS
  const renderMenuOptions = (): ReactElement => {
    return (
      <Fragment>
        {Object.keys(menuOptions).map((option, index) => {
          const key = `${option}__${index}`;
          const optionObject = menuOptions[option] as SideNavigationOption;

          const isOptionSelected = optionObject.subOptions.find(
            subOption => subOption === selectedSubOption
          );

          const optionMenuClassNames = classNames({
            'side-navigation__option-menu': true,
            [`side-navigation__option-menu-${option}`]: true,
            'side-navigation__option-menu-selected': isOptionSelected,
            'side-navigation__option-menu-collapsed': isCollapsed,
          });

          const optionTitleClassNames = classNames({
            'side-navigation__option-title': true,
            [`side-navigation__option-title-${option}`]: true,
            'side-navigation__option-title-selected': isOptionSelected,
            'side-navigation__option-title-hidden': isCollapsed,
          });

          const optionIconClassNames = classNames({
            'material-icons': true,
            'side-navigation__option-icon': true,
            [`side-navigation__option-icon-${option}`]: true,
            'side-navigation__option-icon-selected': isOptionSelected,
            'side-navigation__option-icon-hidden': isCollapsed,
          });

          const optionHoverTitleClassNames = classNames({
            'side-navigation__option-hover-title': true,
            'side-navigation__option-hover-title-selected': isOptionSelected,
          });

          const optionExpansionPanelClassNames = classNames({
            'side-navigation__option-expansion-panel': true,
            [`side-navigation__option-expansion-panel-${option}`]: true,
          });

          return (
            <div
              key={key}
              className={optionMenuClassNames}
              onMouseEnter={(): void => {
                if (isCollapsed) {
                  handleSelectOption(option);
                }
              }}
            >
              <div
                role="listbox"
                tabIndex={index}
                className={optionTitleClassNames}
                onClick={(): void => {
                  if (!isCollapsed && !isOptionSelected) {
                    handleSelectOption(option);
                  }
                }}
                onKeyDown={(): void => {
                  if (!isCollapsed && !isOptionSelected) {
                    handleSelectOption(option);
                  }
                }}
              >
                <i className={optionIconClassNames}>{optionObject.icon}</i>
                {option}
              </div>
              {isCollapsed && selectedOption === option && (
                <div
                  className="side-navigation__option-hover-menu"
                  onMouseLeave={(): void => {
                    if (isCollapsed) {
                      handleSelectOption(null);
                    }
                  }}
                >
                  <div className={optionHoverTitleClassNames}>{option}</div>
                  {renderSubOptions(optionObject.subOptions)}
                </div>
              )}
              <ExpansionPanel
                className={optionExpansionPanelClassNames}
                type="hidden"
                expanded={
                  isCollapsed
                    ? false
                    : (isOptionSelected && true) || selectedOption === option
                }
              >
                {renderSubOptions(optionObject.subOptions)}
              </ExpansionPanel>
            </div>
          );
        })}
      </Fragment>
    );
  };

  const renderSubOptions = (subOptions: string[]): ReactElement[] => {
    return subOptions.map((subOption, subIndex) => {
      const key = `${subOption}__${subIndex}`;
      const isSelected = subOption === selectedSubOption;
      const subOptionClassNames = classNames({
        'side-navigation__sub-option': true,
        [`side-navigation__sub-option-${subOption}`]: true,
        'side-navigation__sub-option-selected': isSelected,
        'side-navigation__sub-option-hover': isCollapsed,
      });

      return (
        <div
          key={key}
          role="option"
          tabIndex={subIndex}
          aria-selected={isSelected}
          className={subOptionClassNames}
          onClick={(): void => handleSelectSubOption(subOption)}
          onKeyDown={(): void => handleSelectSubOption(subOption)}
        >
          <div
            className={`side-navigation__sub-option-text ${
              isSelected ? 'selected' : ''
            }`}
          >
            {subOption}
          </div>
        </div>
      );
    });
  };

  const logoWrapperClassNames = classNames({
    'side-navigation__logo-wrapper': true,
    'side-navigation__logo-wrapper-home': !showBackButton,
    'side-navigation__logo-wrapper-away': showBackButton,
    'side-navigation__logo-wrapper-collapsed-away':
      isCollapsed && showBackButton,
  });

  const backIconClassNames = classNames({
    'material-icons': true,
    'side-navigation__logo-back': true,
    'side-navigation__logo-back-hidden': !showBackButton,
    'side-navigation__logo-back-collapsed-away': isCollapsed && showBackButton,
  });

  const collapseIconClassNames = classNames({
    'material-icons': true,
    'side-navigation__collapse-icon': true,
    'side-navigation__collapse-icon-collapsed': isCollapsed,
  });

  const hasHeader = onGoBack || logoAssetPath || logoTitle;

  return (
    <div className={`side-navigation ${isCollapsed ? 'collapsed' : ''}`}>
      {hasHeader && (
        <div className="side-navigation__header">
          <div
            role="link"
            tabIndex={0}
            className="side-navigation__logo-link"
            onClick={(): void => {
              if (showBackButton) {
                handleGoBack();
              }
            }}
            onKeyDown={(): void => {
              if (showBackButton) {
                handleGoBack();
              }
            }}
          >
            <i className={backIconClassNames}>keyboard_arrow_left</i>

            {(logoAssetPath || logoTitle) && (
              <div className={logoWrapperClassNames}>
                {logoAssetPath && (
                  <img
                    className="side-navigation__logo-image"
                    alt={logoTitle}
                    src={logoAssetPath}
                  />
                )}
                {logoTitle && (
                  <span
                    className={`side-navigation__logo-text ${
                      isCollapsed ? 'hidden-text' : ''
                    }`}
                  >
                    {logoTitle}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      <div className="side-navigation__menu">{renderMenuOptions()}</div>

      <div
        role="switch"
        tabIndex={0}
        aria-checked={isCollapsed}
        className={`side-navigation__collapse-toggle ${
          isCollapsed ? 'collapsed' : ''
        }`}
        onClick={handleToggleCollapse}
        onKeyDown={handleToggleCollapse}
      >
        <i className={collapseIconClassNames}>arrow_back_ios</i>
        <span
          className={`side-navigation__collapse-text ${
            isCollapsed ? 'hidden-text' : ''
          }`}
        >
          {'Collapse'}
        </span>
      </div>
    </div>
  );
};

SideNavigation.defaultProps = {
  collapsed: false,
  onCollapse: undefined,
  currentlyViewing: undefined,
  showBackButton: false,
  onNavigate: undefined,
  logoAssetPath: undefined,
  logoTitle: undefined,
};

export default SideNavigation;
