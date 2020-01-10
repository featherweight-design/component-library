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
import './HeaderMenu.scss';

type HeaderMenuProps = {
  currentlyViewing: CurrentlyViewing;
  menuOptions: HeaderMenuOptions;
  onNavigate?: (currentlyViewing: CurrentlyViewing) => void;
  defaultTitle: string;
};

const HeaderMenu: FunctionComponent<HeaderMenuProps> = ({
  currentlyViewing,
  menuOptions,
  onNavigate,
  defaultTitle,
}: HeaderMenuProps) => {
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
      'fd-header-menu__location-title': true,
    });

    return (
      <Fragment>
        <h2 className={titleClassNames}>{title || defaultTitle}</h2>
        {subTitle && (
          <h4 className="fd-header-menu__location-sub-title">{subTitle}</h4>
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
          'fd-header-menu__sub-option-link': true,
          [`fd-header-menu__sub-option-link-${label
            .toLowerCase()
            .split(' ')
            .join('-')}`]: true,
          'fd-header-menu__sub-option-link-selected': isSelected,
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
                  'fd-header-menu__sub-option-icon-background': true,
                  'fd-header-menu__sub-option-icon-background-selected': isSelected,
                })}
              />

              <i
                className={classnames({
                  'material-icons': true,
                  'fd-header-menu__sub-option-icon': true,
                  'fd-header-menu__sub-option-icon-selected': isSelected,
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
                  'fd-header-menu__sub-option-icon-background': true,
                  'fd-header-menu__sub-option-icon-background-selected': isSelected,
                })}
              />

              <i
                className={classnames({
                  'material-icons': true,
                  'fd-header-menu__sub-option-icon': true,
                  'fd-header-menu__sub-option-icon-selected': isSelected,
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
    <div className="fd-header-menu__menu-icon-container">
      {Object.keys(menuOptions).map((option, index) => {
        const key = `${option}__${index}`;
        const { icon, subOptions, subTitle, indicator, isActive } = menuOptions[
          option
        ] as HeaderMenuOption;

        const isSelected = selectedOption === option || isActive;

        const menuOptionIconClassNames = classnames({
          'material-icons': true,
          'fd-header-menu__menu-icon': true,
          [`fd-header-menu__menu-icon-${option}`]: true,
          'fd-header-menu__menu-icon-selected': isSelected,
        });

        return (
          <Fragment key={key}>
            <div className="fd-header-menu__icon-container">
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
                  'fd-header-menu__menu-icon-background': true,
                  'fd-header-menu__menu-icon-background-selected': isSelected,
                })}
              />

              {indicator && (
                <div
                  className="fd-header-menu__icon-indicator"
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
                    'fd-header-menu__sub-options': true,
                    'fd-header-menu__sub-options-shown':
                      selectedOption === option,
                  })}
                  ref={subOptionsMenu}
                >
                  <div className="fd-header-menu__sub-options-header">
                    <span className="fd-header-menu__sub-options-title">
                      {option}
                    </span>
                    {subTitle && (
                      <span className="fd-header-menu__sub-options-sub-title">
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
    <div className="fd-header-menu">
      <div className="fd-header-menu__left">
        <div className="fd-header-menu__location-container">
          {currentlyViewing && renderCurrentlyViewingHeader(currentlyViewing)}
        </div>
      </div>

      <div className="fd-header-menu__right">
        {menuOptions && renderMenuOptions()}
      </div>
    </div>
  );
};

HeaderMenu.defaultProps = {
  menuOptions: undefined,
  onNavigate: undefined,
  defaultTitle: undefined,
};

export default HeaderMenu;
