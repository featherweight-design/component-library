import React, {
  ReactElement,
  Fragment,
  useState,
  useEffect,
  FunctionComponent,
} from 'react';
import classnames from 'classnames';

import {
  CurrentlyViewing,
  SideNavigationOptions,
  SideNavigationOption,
} from 'types';
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

type SideNavigationSelection = {
  option?: string | null;
  subOption?: string | null;
};

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

const getSubOptions = (options: SideNavigationOptions): string[] =>
  Object.keys(options).reduce(
    (accumulator, option) => [...accumulator, ...options[option].subOptions],
    [] as string[]
  );

const getInitialSelection = (
  props: SideNavigationProps
): SideNavigationSelection => {
  const { collapsed, currentlyViewing, menuOptions, defaultSelected } = props;
  if (collapsed) {
    const selectedSubOption = currentlyViewing
      ? getPreSelection(Object.keys(menuOptions), currentlyViewing)
      : defaultSelected.option;

    return {
      option: undefined,
      subOption: selectedSubOption,
    };
  } else {
    const selectedOption = currentlyViewing
      ? getPreSelection(Object.keys(menuOptions), currentlyViewing)
      : defaultSelected.option;
    const selectedSubOption = currentlyViewing
      ? getPreSelection(getSubOptions(menuOptions), currentlyViewing)
      : defaultSelected.subOption;

    return {
      option: selectedOption,
      subOption: selectedSubOption,
    };
  }
};

const SideNavigation: FunctionComponent<SideNavigationProps> = (
  props: SideNavigationProps
) => {
  const {
    menuOptions,
    currentlyViewing,
    onGoBack,
    collapsed,
    onCollapse,
    showBackButton,
    onNavigate,
    logoAssetPath,
    logoTitle,
  } = props;

  const [isCollapsed, toggleCollapsed] = useState(collapsed);
  const [selection, setSelection] = useState<SideNavigationSelection>(
    getInitialSelection(props)
  );

  useEffect(() => {
    const newOption = getPreSelection(
      Object.keys(menuOptions),
      currentlyViewing
    );
    const newSubOption = getPreSelection(
      getSubOptions(menuOptions),
      currentlyViewing
    );

    if (
      newOption !== selection.option ||
      newSubOption !== selection.subOption
    ) {
      handleUpdateSelection(newOption, newSubOption);
    }
  }, [currentlyViewing]);

  // LOCAL STATE CHANGE/TOGGLE METHODS
  const handleUpdateSelection = (
    newOption: string | null,
    newSubOption: string | null
  ): void => {
    setSelection({
      option: isCollapsed ? null : newOption,
      subOption: newSubOption,
    });
  };

  const handleToggleCollapse = (): void => {
    const selectedOption = Object.keys(menuOptions).find(option =>
      menuOptions[option].subOptions.find(
        subOption => subOption === selection.subOption
      )
    );

    toggleCollapsed(!isCollapsed);
    setSelection({
      ...selection,
      option: !isCollapsed || !selectedOption ? null : selectedOption,
    });

    if (onCollapse) {
      onCollapse(!isCollapsed);
    }
  };

  const handleSelectOption = (option: string | null): void => {
    if (!isCollapsed && selection.option === option) {
      setSelection({
        ...selection,
        option: null,
      });
    } else {
      setSelection({
        ...selection,
        option,
      });
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

    setSelection({
      subOption,
      option: isCollapsed || !subOptionParent ? null : subOptionParent,
    });
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
            subOption => subOption === selection.subOption
          );

          const optionMenuClassNames = classnames({
            'side-navigation__option-menu': true,
            [`side-navigation__option-menu-${option}`]: true,
            'side-navigation__option-menu-selected': isOptionSelected,
            'side-navigation__option-menu-collapsed': isCollapsed,
          });

          const optionTitleClassNames = classnames({
            'side-navigation__option-title': true,
            [`side-navigation__option-title-${option}`]: true,
            'side-navigation__option-title-selected': isOptionSelected,
            'side-navigation__option-title-hidden': isCollapsed,
          });

          const optionIconClassNames = classnames({
            'material-icons': true,
            'side-navigation__option-icon': true,
            [`side-navigation__option-icon-${option}`]: true,
            'side-navigation__option-icon-selected': isOptionSelected,
            'side-navigation__option-icon-hidden': isCollapsed,
          });

          const optionHoverTitleClassNames = classnames({
            'side-navigation__option-hover-title': true,
            'side-navigation__option-hover-title-selected': isOptionSelected,
          });

          const optionExpansionPanelClassNames = classnames({
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
              >
                <i className={optionIconClassNames}>{optionObject.icon}</i>
                {option}
              </div>
              {isCollapsed && selection.option === option && (
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
                expanded={
                  isCollapsed
                    ? false
                    : (isOptionSelected && true) || selection.option === option
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
      const isSelected = subOption === selection.subOption;
      const subOptionClassNames = classnames({
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

  const logoWrapperClassNames = classnames({
    'side-navigation__logo-wrapper': true,
    'side-navigation__logo-wrapper-home': !showBackButton,
    'side-navigation__logo-wrapper-away': showBackButton,
    'side-navigation__logo-wrapper-collapsed-away':
      isCollapsed && showBackButton,
  });

  const backIconClassNames = classnames({
    'material-icons': true,
    'side-navigation__logo-back': true,
    'side-navigation__logo-back-hidden': !showBackButton,
    'side-navigation__logo-back-collapsed-away': isCollapsed && showBackButton,
  });

  const collapseIconClassNames = classnames({
    'material-icons': true,
    'side-navigation__collapse-icon': true,
    'side-navigation__collapse-icon-collapsed': isCollapsed,
  });

  const hasHeader = logoAssetPath || logoTitle;

  return (
    <div className={`side-navigation ${isCollapsed ? 'collapsed' : ''}`}>
      {hasHeader && (
        <div
          className={classnames({
            'side-navigation__header': true,
            'side-navigation__header-image-only': logoAssetPath && !logoTitle,
          })}
        >
          <div
            role="link"
            tabIndex={0}
            className={classnames({
              'side-navigation__logo-link': true,
              'side-navigation__logo-link-image-only':
                logoAssetPath && !logoTitle,
            })}
            onClick={(): void => {
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
                    className={classnames({
                      'side-navigation__logo-image': true,
                      'side-navigation__logo-image-large': !logoTitle,
                    })}
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
