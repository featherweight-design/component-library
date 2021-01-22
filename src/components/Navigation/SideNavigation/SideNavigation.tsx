import { ReactElement, useState, useEffect, FC, KeyboardEvent } from 'react';
import classnames from 'classnames';

import {
  CurrentlyViewing,
  SideNavigationOption,
  SideNavigationProps,
  SideNavigationSelection,
  SideNavigationSubOption,
} from 'types';

import { keyboardKeyEnum } from 'shared/enums';
import Accordion from '../../Accordion/Accordion';

const DEFAULT_SELECTED = {
  option: '',
  subOption: '',
};

const getSelection = (
  currentlyViewing: CurrentlyViewing,
  menuOptions: SideNavigationOption[],
  fallBack: SideNavigationSelection
): SideNavigationSelection => {
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
          subOption => subOption.path === currentlyViewing.path
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
    fallBack as SideNavigationSelection
  );

  return preSelection;
};

const getBaseClassName = (goDark: boolean | undefined): string =>
  goDark ? 'fd-side-navigation-dark' : 'fd-side-navigation';

const SideNavigation: FC<SideNavigationProps> = (
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
    defaultSelected = DEFAULT_SELECTED,
    goDark,
    className,
  } = props;

  const [baseClassName] = useState(getBaseClassName(goDark));
  const [isTransitioning, toggleIsTransitioning] = useState(false);
  const [openOption, setIsOpen] = useState('');
  const [iconBackgroundTop, setIconBackgroundTop] = useState('17px');
  const [collapsedOptionOffsets, setCollapsedOptionOffsets] = useState<
    number[]
  >([]);
  const [isCollapsed, toggleCollapsed] = useState(collapsed);
  const [selection, setSelection] = useState<SideNavigationSelection>(
    getSelection(currentlyViewing, menuOptions, defaultSelected)
  );

  useEffect(() => {
    const newSelection = getSelection(currentlyViewing, menuOptions, {
      option: undefined,
      subOption: undefined,
    });

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

        for (let i = 0; i < optionElements.length; i += 1) {
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
      option: newOption,
      subOption: newSubOption,
    });
  };

  const handleToggleCollapse = (): void => {
    setIsOpen('');
    toggleCollapsed(!isCollapsed);

    if (onCollapse) {
      onCollapse(!isCollapsed);
    }
  };

  const handleSelectOption = (option: SideNavigationOption): void => {
    const { label, path, title, subOptions } = option;

    if (!isCollapsed && openOption === label) {
      setIsOpen('');
    } else {
      const hasSubOptions = subOptions && subOptions.length;

      setIsOpen(label);

      if (!hasSubOptions) {
        toggleIsTransitioning(true);
        setSelection({
          option: label,
          subOption: undefined,
        });
      }

      if (onNavigate && path && title) {
        onNavigate({ path, title });
      }

      handleSetFloatingBackgroundOffset();
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

    if (subOptionParent) {
      setIsOpen('');
      setSelection({
        subOption: title,
        option: subOptionParent,
      });
    }
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

    const isOptionOpen = openOption === label;
    const isSelected = selection.option === label;

    const optionMenuClassNames = classnames({
      [`${baseClassName}__option-menu`]: true,
      [`${baseClassName}__option-menu-${option}`]: true,
      [`${baseClassName}__option-menu-selected`]: isSelected,
      [`${baseClassName}__option-menu-collapsed`]: isCollapsed,
    });

    const optionTitleClassNames = classnames({
      [`${baseClassName}__option-title`]: true,
      [`${baseClassName}__option-title-${option}`]: true,
      [`${baseClassName}__option-title-selected`]: isSelected,
      [`${baseClassName}__option-title-hidden`]: isCollapsed,
    });

    const optionIconClassNames = classnames({
      'material-icons': true,
      [`${baseClassName}__option-icon`]: true,
      [`${baseClassName}__option-icon-${option}`]: true,
      [`${baseClassName}__option-icon-selected`]: isSelected,
      [`${baseClassName}__option-icon-hidden`]: isCollapsed,
    });

    const optionAccordionClassNames = classnames({
      [`${baseClassName}__option-accordion`]: true,
      [`${baseClassName}__option-accordion-${option}`]: true,
    });

    return (
      <div
        key={key}
        className={optionMenuClassNames}
        onMouseEnter={(): void => {
          if (isCollapsed) {
            setIsOpen(label);
          }
        }}
      >
        <div
          role="listbox"
          tabIndex={0}
          className={optionTitleClassNames}
          onClick={(): void => {
            if (!isCollapsed && selection.option !== label) {
              handleSelectOption(option);
            } else if (isCollapsed && !subOptions) {
              handleSelectOption(option);
            }
          }}
          onKeyDown={(event: KeyboardEvent<HTMLDivElement>): void => {
            if (event.key === keyboardKeyEnum.Enter) {
              if (!isCollapsed && selection.option !== label) {
                handleSelectOption(option);
              } else if (isCollapsed && !subOptions) {
                handleSelectOption(option);
              }
            }
          }}
        >
          <div
            className={classnames({
              [`${baseClassName}__icon-background`]: true,
              [`${baseClassName}__icon-background-collapsed`]: isCollapsed,
              [`${baseClassName}__icon-background-selected`]: isSelected,
            })}
          />
          <i className={optionIconClassNames}>{icon}</i>
          {label}
        </div>

        {subOptions && (
          <Accordion
            className={optionAccordionClassNames}
            expanded={
              isCollapsed ? false : (isOptionOpen && true) || isSelected
            }
          >
            {renderSubOptions(subOptions)}
          </Accordion>
        )}
      </div>
    );
  };

  const renderSubOptions = (
    subOptions: SideNavigationSubOption[]
  ): ReactElement[] =>
    subOptions.map((subOption, subIndex) => {
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
          onKeyDown={(event: KeyboardEvent<HTMLDivElement>): void => {
            if (event.key === keyboardKeyEnum.Enter) {
              handleSelectSubOption(subOption);
            }
          }}
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

  const renderHoverSubOptions = (
    option: SideNavigationOption,
    optionIndex: number
  ): ReactElement | null => {
    const { label, subOptions } = option;

    if (option && optionIndex !== -1) {
      const isOptionOpen = openOption === label;
      const optionHoverTitleClassNames = classnames({
        [`${baseClassName}__option-hover-title`]: true,
        [`${baseClassName}__option-hover-title-selected`]: isOptionOpen,
      });

      return (
        <div
          className={`${baseClassName}__option-hover-menu`}
          style={{ top: collapsedOptionOffsets[optionIndex as number] }}
          onMouseLeave={(): void => {
            if (isCollapsed) {
              setIsOpen('');
            }
          }}
        >
          <div className={optionHoverTitleClassNames}>{label}</div>
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
    openOption && menuOptions.find(({ label }) => label === openOption);
  const optionIndex = menuOptions.map(({ label }) => label).indexOf(openOption);

  const renderedOptions = menuOptions.map((option, index) =>
    renderMenuOptions(option, index)
  );

  return (
    <nav
      className={classnames({
        [`${baseClassName}`]: true,
        [`${baseClassName}-collapsed`]: isCollapsed,
        [className as string]: className,
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
            onKeyDown={(event: KeyboardEvent<HTMLDivElement>): void => {
              if (event.key === keyboardKeyEnum.Enter && showBackButton) {
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
                      [`${baseClassName}__logo-image-large`]:
                        !logoTitle && !isCollapsed,
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
        openOption &&
        selectedOptionObject &&
        selectedOptionObject.subOptions &&
        renderHoverSubOptions(selectedOptionObject, optionIndex)}

      <div
        role="switch"
        tabIndex={0}
        aria-checked={isCollapsed}
        className={classnames({
          [`${baseClassName}__collapse-toggle`]: true,
          [`${baseClassName}__collapse-toggle-collapsed`]: isCollapsed,
        })}
        onClick={handleToggleCollapse}
        onKeyDown={(event: KeyboardEvent<HTMLDivElement>): void => {
          if (event.key === keyboardKeyEnum.Enter) {
            handleToggleCollapse();
          }
        }}
      >
        <i className={collapseIconClassNames}>arrow_back_ios</i>
        <span
          className={classnames({
            [`${baseClassName}__collapse-text`]: true,
            [`${baseClassName}__collapse-text-hidden`]: isCollapsed,
          })}
        >
          Collapse
        </span>
      </div>
    </nav>
  );
};

SideNavigation.defaultProps = {
  defaultSelected: DEFAULT_SELECTED,
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
