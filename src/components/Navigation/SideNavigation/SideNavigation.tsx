import React, {
  ReactElement,
  useState,
  useEffect,
  FunctionComponent,
} from 'react';
import classnames from 'classnames';
import isEmpty from 'lodash/isEmpty';

import {
  CurrentlyViewing,
  SideNavigationOption,
  SideNavigationSubOption,
} from 'types';
import ExpansionPanel from '../../ExpansionPanel/ExpansionPanel';
import './SideNavigation.scss';

type SideNavigationProps = {
  menuOptions: SideNavigationOption[];
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
  option?: string | undefined;
  subOption?: string | undefined;
};

const getSelection = (props: SideNavigationProps): SideNavigationSelection => {
  const { currentlyViewing, menuOptions, defaultSelected } = props;

  const preSelection = menuOptions.reduce(
    (accumulator, { path, label, subOptions }: SideNavigationOption) => {
      if (path && path === currentlyViewing.path) {
        return {
          option: label,
          subOption: undefined,
        };
      }

      if (subOptions && subOptions.length) {
        const match = subOptions.find(
          ({ path }) => path === currentlyViewing.path
        );

        if (match) {
          return {
            option: label,
            subOption: match.title,
          };
        }
      }

      return accumulator;
    },
    {}
  );

  return isEmpty(preSelection) ? defaultSelected : preSelection;
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
    getSelection(props)
  );

  useEffect(() => {
    const newSelection = getSelection(props);

    if (
      newSelection.option !== selection.option ||
      newSelection.subOption !== selection.subOption
    ) {
      const { option, subOption } = newSelection;

      handleUpdateSelection(option, subOption);
    }
  }, [currentlyViewing]);

  useEffect(() => {
    if (isTransitioning) {
      setTimeout(() => toggleIsTransitioning(false), 1125);
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
        `${baseClassName}__icon-background-selected`
      )[0] as HTMLElement;

      if (element) {
        const { top } = element.getBoundingClientRect();

        const headerElement = document.getElementsByClassName(
          `${baseClassName}__header`
        )[0] as HTMLElement;

        const offset = headerElement
          ? top - headerElement.offsetHeight - 1
          : top - 1;

        const iconTop = `${offset}px`;
        setIconBackgroundTop(iconTop);
      }
    }, 500);
  };

  const handleUpdateSelection = (
    newOption: string | undefined,
    newSubOption: string | undefined
  ): void => {
    setSelection({
      option: isCollapsed ? undefined : newOption,
      subOption: newSubOption,
    });
  };

  const handleToggleCollapse = (): void => {
    const selectedOption = menuOptions.find(({ label, subOptions }) => {
      if (subOptions) {
        return subOptions.find(({ title }) => title === selection.subOption);
      }

      return label;
    });

    toggleCollapsed(!isCollapsed);
    setSelection({
      ...selection,
      option:
        !isCollapsed || !selectedOption ? undefined : selectedOption.label,
    });

    if (onCollapse) {
      onCollapse(!isCollapsed);
    }
  };

  const handleSelectOption = (option: SideNavigationOption): void => {
    const { label } = option;

    if (!isCollapsed && selection.option === label) {
      setSelection({
        ...selection,
        option: undefined,
      });
    } else {
      const { label, path, title, subOptions } = option;

      const hasSubOptions = subOptions && subOptions.length;

      if (!hasSubOptions && onNavigate && path && title) {
        onNavigate({ path, title });
      }

      handleSetFloatingBackgroundOffset();
      setSelection({
        ...selection,
        option: label,
      });
    }
  };

  const handleFindSubOptionParent = (subOption: string): string | undefined => {
    const subOptionParent = menuOptions.find(({ subOptions }) => {
      const match =
        subOptions && subOptions.find(({ title }) => title === subOption);

      if (match) {
        return true;
      }

      return false;
    });

    return subOptionParent && subOptionParent.label;
  };

  const handleSelectSubOption = (subOption: SideNavigationSubOption): void => {
    const { title, path } = subOption;
    const subOptionParent = handleFindSubOptionParent(title);
    const currentSelectedSubOptionParent =
      selection.subOption && handleFindSubOptionParent(selection.subOption);

    if (subOptionParent !== currentSelectedSubOptionParent) {
      handleSetFloatingBackgroundOffset();
      toggleIsTransitioning(true);
    }

    if (onNavigate && subOptionParent) {
      onNavigate({ path, title });
    }

    setSelection({
      subOption: title,
      option: isCollapsed || !subOptionParent ? undefined : subOptionParent,
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

  // RENDER METHODS
  const renderMenuOptions = (
    option: SideNavigationOption,
    index: number
  ): ReactElement => {
    const { label, subOptions, icon } = option;
    const key = `${label}__${index}`;

    const isOptionSelected =
      subOptions &&
      subOptions.find(({ title }) => title === selection.subOption);

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
          <i className={optionIconClassNames}>{icon}</i>
          {label}
        </div>

        {subOptions && (
          <ExpansionPanel
            className={optionExpansionPanelClassNames}
            expanded={
              isCollapsed
                ? false
                : (isOptionSelected && true) || selection.option === label
            }
          >
            {renderSubOptions(subOptions)}
          </ExpansionPanel>
        )}
      </div>
    );
  };

  const renderSubOptions = (
    subOptions: SideNavigationSubOption[]
  ): ReactElement[] => {
    return subOptions.map((subOption, subIndex) => {
      const { title } = subOption;
      const key = `${title}__${subIndex}`;
      const isSelected = title === selection.subOption;
      const subOptionClassNames = classnames({
        [`${baseClassName}__sub-option`]: true,
        [`${baseClassName}__sub-option-${title}`]: true,
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
            {title}
          </div>
        </div>
      );
    });
  };

  const renderHoverSubOptions = (
    option: SideNavigationOption
  ): ReactElement | null => {
    const { subOptions } = option;

    const optionIndex =
      selection.option && Object.keys(menuOptions).indexOf(selection.option);

    if (option && optionIndex !== -1) {
      const isOptionSelected =
        subOptions &&
        subOptions.find(({ title }) => title === selection.subOption);
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
              setSelection({
                ...selection,
                option: undefined,
              });
            }
          }}
        >
          <div className={optionHoverTitleClassNames}>{selection.option}</div>
          {subOptions && renderSubOptions(subOptions)}
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
  const selectedOptionObject =
    selection.option &&
    menuOptions.find(({ label }) => label === selection.option);

  const renderedOptions = menuOptions.map((option, index) =>
    renderMenuOptions(option, index)
  );

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
        {renderedOptions}
      </div>

      {isCollapsed &&
        selection.option &&
        selectedOptionObject &&
        renderHoverSubOptions(selectedOptionObject)}

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
