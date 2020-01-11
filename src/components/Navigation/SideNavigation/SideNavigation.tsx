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
  goDark?: boolean;
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

const getBaseClassName = (goDark: boolean | undefined): string =>
  goDark ? 'fd-side-navigation-dark' : 'fd-side-navigation';

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
    goDark,
  } = props;

  const [baseClassName] = useState(getBaseClassName(goDark));
  const [isTransitioning, toggleIsTransitioning] = useState(false);
  const [iconBackgroundTop, setIconBackgroundTop] = useState('17px');
  const [collapsedOptionOffsets, setCollapsedOptionOffsets] = useState<
    number[]
  >([]);
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

  useEffect(() => {
    if (isTransitioning) {
      setTimeout(() => toggleIsTransitioning(false), 1250);
    }
  }, [isTransitioning]);

  useEffect(() => {
    if (isCollapsed && !collapsedOptionOffsets.length) {
      setTimeout(() => {
        const optionElements = document.getElementsByClassName(
          `${baseClassName}__option-menu`
        );
        const headerElement = document.getElementsByClassName(
          `${baseClassName}__header`
        )[0] as HTMLElement;

        const addedOffset = headerElement ? headerElement.offsetHeight + 8 : 8;

        const optionOffsets = [];

        for (let i = 0; i < optionElements.length; i++) {
          optionOffsets.push(
            (optionElements[i] as HTMLElement).offsetTop + addedOffset
          );
        }

        setCollapsedOptionOffsets(optionOffsets);
      }, 500);
    }
  }, [isCollapsed, collapsedOptionOffsets]);

  // LOCAL STATE CHANGE/TOGGLE METHODS
  const handleSetFloatingBackgroundOffset = (): void => {
    setTimeout(() => {
      const element = document.getElementsByClassName(
        `${baseClassName}__option-title-selected`
      )[0] as HTMLElement;

      if (element) {
        const { offsetTop } = element;

        const iconTop = `${offsetTop + 9}px`;
        setIconBackgroundTop(iconTop);
      }
    }, 500);
  };

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
      handleSetFloatingBackgroundOffset();
      setSelection({
        ...selection,
        option,
      });
    }
  };

  const handleFindSubOptionParent = (subOption: string): string | undefined => {
    const subOptionParent = Object.keys(menuOptions).find(option => {
      const match = menuOptions[option].subOptions.find(
        sub => sub === subOption
      );

      if (match) {
        return option;
      }

      return false;
    });

    return subOptionParent;
  };

  const handleSelectSubOption = (subOption: string): void => {
    const subOptionParent = handleFindSubOptionParent(subOption);
    const currentSelectedSubOptionParent =
      selection.subOption && handleFindSubOptionParent(selection.subOption);

    if (subOptionParent !== currentSelectedSubOptionParent) {
      handleSetFloatingBackgroundOffset();
      toggleIsTransitioning(true);
    }

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
            [`${baseClassName}__option-menu`]: true,
            [`${baseClassName}__option-menu-${option}`]: true,
            [`${baseClassName}__option-menu-selected`]: isOptionSelected,
            [`${baseClassName}__option-menu-collapsed`]: isCollapsed,
          });

          const optionTitleClassNames = classnames({
            [`${baseClassName}__option-title`]: true,
            [`${baseClassName}__option-title-${option}`]: true,
            [`${baseClassName}__option-title-selected`]: isOptionSelected,
            [`${baseClassName}__option-title-hidden`]: isCollapsed,
          });

          const optionIconClassNames = classnames({
            'material-icons': true,
            [`${baseClassName}__option-icon`]: true,
            [`${baseClassName}__option-icon-${option}`]: true,
            [`${baseClassName}__option-icon-selected`]: isOptionSelected,
            [`${baseClassName}__option-icon-hidden`]: isCollapsed,
          });

          const optionExpansionPanelClassNames = classnames({
            [`${baseClassName}__option-expansion-panel`]: true,
            [`${baseClassName}__option-expansion-panel-${option}`]: true,
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
                <div
                  className={classnames({
                    [`${baseClassName}__icon-background`]: true,
                    [`${baseClassName}__icon-background-collapsed`]: isCollapsed,
                    [`${baseClassName}__icon-background-selected`]: isOptionSelected,
                  })}
                />
                <i className={optionIconClassNames}>{optionObject.icon}</i>
                {option}
              </div>

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
        [`${baseClassName}__sub-option`]: true,
        [`${baseClassName}__sub-option-${subOption}`]: true,
        [`${baseClassName}__sub-option-selected`]: isSelected,
        [`${baseClassName}__sub-option-hover`]: isCollapsed,
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
            className={classnames({
              [`${baseClassName}__sub-option-text`]: true,
              [`${baseClassName}__sub-option-text-selected`]: isSelected,
            })}
          >
            {subOption}
          </div>
        </div>
      );
    });
  };

  const renderHoverSubOptions = (): ReactElement | null => {
    const optionObject =
      selection.option &&
      (menuOptions[selection.option] as SideNavigationOption);

    const optionIndex =
      selection.option && Object.keys(menuOptions).indexOf(selection.option);

    if (optionObject && optionIndex !== -1) {
      const isOptionSelected = optionObject.subOptions.find(
        subOption => subOption === selection.subOption
      );
      const optionHoverTitleClassNames = classnames({
        [`${baseClassName}__option-hover-title`]: true,
        [`${baseClassName}__option-hover-title-selected`]: isOptionSelected,
      });

      return (
        <div
          className={`${baseClassName}__option-hover-menu`}
          style={{ top: collapsedOptionOffsets[optionIndex as number] }}
          onMouseLeave={(): void => {
            if (isCollapsed) {
              handleSelectOption(null);
            }
          }}
        >
          <div className={optionHoverTitleClassNames}>{selection.option}</div>
          {renderSubOptions(optionObject.subOptions)}
        </div>
      );
    }

    return null;
  };

  const logoWrapperClassNames = classnames({
    [`${baseClassName}__logo-wrapper`]: true,
    [`${baseClassName}__logo-wrapper-home`]: !showBackButton,
    [`${baseClassName}__logo-wrapper-away`]: showBackButton,
    [`${baseClassName}__logo-wrapper-collapsed-away`]:
      isCollapsed && showBackButton,
  });

  const backIconClassNames = classnames({
    'material-icons': true,
    [`${baseClassName}__logo-back`]: true,
    [`${baseClassName}__logo-back-hidden`]: !showBackButton,
    [`${baseClassName}__logo-back-collapsed-away`]:
      isCollapsed && showBackButton,
  });

  const collapseIconClassNames = classnames({
    'material-icons': true,
    [`${baseClassName}__collapse-icon`]: true,
    [`${baseClassName}__collapse-icon-collapsed`]: isCollapsed,
  });

  const hasHeader = logoAssetPath || logoTitle;

  return (
    <nav
      className={classnames({
        [`${baseClassName}`]: true,
        [`${baseClassName}-collapsed`]: isCollapsed,
      })}
    >
      {hasHeader && (
        <div
          className={classnames({
            [`${baseClassName}__header`]: true,
            [`${baseClassName}__header-image-only`]:
              logoAssetPath && !logoTitle,
          })}
        >
          <div
            role="link"
            tabIndex={0}
            className={classnames({
              [`${baseClassName}__logo-link`]: true,
              [`${baseClassName}__logo-link-image-only`]:
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
                      [`${baseClassName}__logo-image`]: true,
                      [`${baseClassName}__logo-image-large`]: !logoTitle,
                    })}
                    alt={logoTitle}
                    src={logoAssetPath}
                  />
                )}
                {logoTitle && (
                  <span
                    className={classnames({
                      [`${baseClassName}__logo-text`]: true,
                      [`${baseClassName}__logo-text-hidden`]: isCollapsed,
                    })}
                  >
                    {logoTitle}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      <div className={`${baseClassName}__menu`}>
        <div
          className={classnames({
            [`${baseClassName}__floating-icon-background`]: true,
            [`${baseClassName}__floating-icon-background-collapsed`]: isCollapsed,
            [`${baseClassName}__floating-icon-background-transitioning`]: isTransitioning,
          })}
          style={{ top: iconBackgroundTop }}
        />
        {renderMenuOptions()}
      </div>

      {isCollapsed && selection.option && renderHoverSubOptions()}

      <div
        role="switch"
        tabIndex={0}
        aria-checked={isCollapsed}
        className={classnames({
          [`${baseClassName}__collapse-toggle`]: true,
          [`${baseClassName}__collapse-toggle-collapsed`]: isCollapsed,
        })}
        onClick={handleToggleCollapse}
      >
        <i className={collapseIconClassNames}>arrow_back_ios</i>
        <span
          className={classnames({
            [`${baseClassName}__collapse-text`]: true,
            [`${baseClassName}__collapse-text-hidden`]: isCollapsed,
          })}
        >
          {'Collapse'}
        </span>
      </div>
    </nav>
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
  goDark: false,
};

export default SideNavigation;
