import React, {
  FunctionComponent,
  ReactElement,
  Fragment,
  useState,
  useRef,
} from 'react';
import classnames from 'classnames';

import {
  CurrentlyViewing,
  HeaderMenuOptions,
  HeaderMenuOption,
  HeaderMenuSubOption,
} from '../../../types';

type HeaderMenuProps = {
  currentlyViewing: CurrentlyViewing;
  menuOptions: HeaderMenuOptions;
  defaultTitle: string;
  onNavigate?: (currentlyViewing: CurrentlyViewing) => void;
  goDark?: boolean;
  className?: string;
};

const getBaseClassName = (goDark: boolean | undefined): string =>
  goDark ? 'fd-header-menu-dark' : 'fd-header-menu';

const HeaderMenu: FunctionComponent<HeaderMenuProps> = ({
  currentlyViewing,
  menuOptions,
  onNavigate,
  defaultTitle,
  goDark,
  className,
}: HeaderMenuProps) => {
  const [baseClassName] = useState(getBaseClassName(goDark));
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const subOptionsMenu = useRef<HTMLDivElement>(null);

  const handleRemoveEventListener = (): void => {
    document.removeEventListener('click', handleHeaderMenuOutsideClick);
  };

  const handleHeaderMenuOutsideClick = (event: MouseEvent): void => {
    if (
      subOptionsMenu.current &&
      !subOptionsMenu.current.contains(event.currentTarget as Node)
    ) {
      handleRemoveEventListener();
      setSelectedOption(null);
    }
  };

  const handleSelectOption = (
    name: string,
    optionObject: HeaderMenuOption
  ): void => {
    const { subOptions, path } = optionObject;

    if (subOptions) {
      if (!selectedOption) {
        document.addEventListener('click', handleHeaderMenuOutsideClick);
      }

      setSelectedOption(name);
    } else if (path && onNavigate) {
      onNavigate({
        title: name,
        path,
      });
    }
  };

  const handleSelectSubOption = (title: string, path: string): void => {
    if (title && path && onNavigate) {
      onNavigate({
        path,
        title,
      });
    }
    if (subOptionsMenu) {
      handleRemoveEventListener();
    }
  };

  // RENDER METHODS
  const renderCurrentlyViewingHeader = ({
    title,
    subTitle,
  }: CurrentlyViewing): ReactElement => {
    const titleClassNames = classnames({
      [`${baseClassName}__location-title`]: true,
    });

    return (
      <Fragment>
        <h2 className={titleClassNames}>{title || defaultTitle}</h2>
        {subTitle && (
          <h4 className={`${baseClassName}__location-sub-title`}>{subTitle}</h4>
        )}
      </Fragment>
    );
  };

  const renderSubOptions = (
    subOptions: HeaderMenuSubOption[]
  ): (ReactElement | null)[] =>
    subOptions
      .filter(subOption => subOption.hasAccess)
      .map(({ label, icon, path, href }, index) => {
        const key = `${label}__${index}`;
        const isSelected = path === currentlyViewing.path;
        const subOptionClassNames = classnames({
          [`${baseClassName}__sub-option-link`]: true,
          [`${baseClassName}__sub-option-link-${label
            .toLowerCase()
            .split(' ')
            .join('-')}`]: true,
          [`${baseClassName}__sub-option-link-selected`]: isSelected,
        });

        if (href) {
          return (
            <a
              key={key}
              className={subOptionClassNames}
              href={href}
              onClick={(): void => {
                handleRemoveEventListener();
                setSelectedOption(null);
              }}
              onKeyDown={(): void => {
                handleRemoveEventListener();
                setSelectedOption(null);
              }}
            >
              <div
                className={classnames({
                  [`${baseClassName}__sub-option-icon-background`]: true,
                  [`${baseClassName}__sub-option-icon-background-selected`]: isSelected,
                })}
              />

              <i
                className={classnames({
                  'material-icons': true,
                  [`${baseClassName}__sub-option-icon`]: true,
                  [`${baseClassName}__sub-option-icon-selected`]: isSelected,
                })}
              >
                {icon}
              </i>
              {label}
            </a>
          );
        }

        if (path) {
          return (
            <div
              key={key}
              role="link"
              tabIndex={0}
              className={subOptionClassNames}
              onClick={(): void => {
                if (!isSelected) {
                  handleSelectSubOption(label, path);
                }
              }}
              onKeyDown={(): void => {
                if (!isSelected) {
                  handleSelectSubOption(label, path);
                }
              }}
            >
              <div
                className={classnames({
                  [`${baseClassName}__sub-option-icon-background`]: true,
                  [`${baseClassName}__sub-option-icon-background-selected`]: isSelected,
                })}
              />

              <i
                className={classnames({
                  'material-icons': true,
                  [`${baseClassName}__sub-option-icon`]: true,
                  [`${baseClassName}__sub-option-icon-selected`]: isSelected,
                })}
              >
                {icon}
              </i>
              {label}
            </div>
          );
        }

        return null;
      });

  const renderMenuOptions = (): ReactElement => (
    <div className={`${baseClassName}__menu-icon-container`}>
      {Object.keys(menuOptions).map((option, index) => {
        const key = `${option}__${index}`;
        const { icon, subOptions, subTitle, indicator, isActive } = menuOptions[
          option
        ] as HeaderMenuOption;

        const isSelected = selectedOption === option || isActive;

        const menuOptionIconClassNames = classnames({
          'material-icons': true,
          [`${baseClassName}__menu-icon`]: true,
          [`${baseClassName}__menu-icon-${option}`]: true,
          [`${baseClassName}__menu-icon-selected`]: isSelected,
        });

        return (
          <Fragment key={key}>
            <div className={`${baseClassName}__icon-container`}>
              <i
                className={menuOptionIconClassNames}
                role="menuitem"
                tabIndex={0}
                onClick={(): void => {
                  if (!selectedOption) {
                    handleSelectOption(option, menuOptions[option]);
                  }
                }}
                onKeyDown={(): void => {
                  if (!selectedOption) {
                    handleSelectOption(option, menuOptions[option]);
                  }
                }}
              >
                {icon}
              </i>

              <div
                className={classnames({
                  [`${baseClassName}__menu-icon-background`]: true,
                  [`${baseClassName}__menu-icon-background-selected`]: isSelected,
                })}
              />

              {indicator && (
                <div
                  className={`${baseClassName}__icon-indicator`}
                  role="menuitem"
                  tabIndex={-1}
                  onClick={(): void => {
                    if (!selectedOption) {
                      handleSelectOption(option, menuOptions[option]);
                    }
                  }}
                  onKeyDown={(): void => {
                    if (!selectedOption) {
                      handleSelectOption(option, menuOptions[option]);
                    }
                  }}
                >
                  {typeof indicator === 'number' && indicator}
                </div>
              )}
              {subOptions && (
                <div
                  className={classnames({
                    [`${baseClassName}__sub-options`]: true,
                    [`${baseClassName}__sub-options-shown`]:
                      selectedOption === option,
                  })}
                  ref={subOptionsMenu}
                >
                  <div className={`${baseClassName}__sub-options-header`}>
                    <span className={`${baseClassName}__sub-options-title`}>
                      {option}
                    </span>
                    {subTitle && (
                      <span
                        className={`${baseClassName}__sub-options-sub-title`}
                      >
                        {subTitle}
                      </span>
                    )}
                  </div>
                  {renderSubOptions(subOptions)}
                </div>
              )}
            </div>
          </Fragment>
        );
      })}
    </div>
  );

  return (
    <div
      className={classnames({
        [`${baseClassName}`]: true,
        [className as string]: className,
      })}
    >
      <div className={`${baseClassName}__left`}>
        <div className={`${baseClassName}__location-container`}>
          {currentlyViewing && renderCurrentlyViewingHeader(currentlyViewing)}
        </div>
      </div>

      <div className={`${baseClassName}__right`}>
        {menuOptions && renderMenuOptions()}
      </div>
    </div>
  );
};

HeaderMenu.defaultProps = {
  menuOptions: undefined,
  onNavigate: undefined,
  defaultTitle: undefined,
  goDark: false,
};

export default HeaderMenu;
