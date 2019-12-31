import React, {
  FunctionComponent,
  ReactElement,
  Fragment,
  SyntheticEvent,
  useState,
  useRef,
} from 'react';
import classNames from 'classnames';

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
    const titleClassNames = classNames({
      'header-menu__location-title': true,
      'header-menu__location-title-with-subtitle': subTitle,
    });

    return (
      <Fragment>
        <h2 className={titleClassNames}>{title || defaultTitle}</h2>
        {subTitle && (
          <h4 className="header-menu__location-sub-title">{subTitle}</h4>
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
        const subOptionClassNames = classNames({
          'header-menu__sub-option-link': true,
          [`header-menu__sub-option-link-${label
            .toLowerCase()
            .split(' ')
            .join('-')}`]: true,
          'header-menu__sub-option-link-selected': isSelected,
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
              <i className="material-icons header-menu__sub-option-icon">
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
              <i className="material-icons header-menu__sub-option-icon">
                {icon}
              </i>
              {label}
            </div>
          );
        }

        return null;
      });

  const renderMenuOptions = (): ReactElement => (
    <div className="header-menu__menu-icon-container">
      {Object.keys(menuOptions).map((option, index) => {
        const key = `${option}__${index}`;
        const { icon, subOptions, subTitle, indicator, isActive } = menuOptions[
          option
        ] as HeaderMenuOption;
        const menuOptionIconClassNames = classNames({
          'material-icons': true,
          'header-menu__menu-icon': true,
          [`header-menu__menu-icon-${option}`]: true,
          'header-menu__menu-icon-selected':
            selectedOption === option || isActive,
        });

        return (
          <Fragment key={key}>
            <div className="header-menu__icon-container">
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
              {indicator && (
                <div
                  className="header-menu__icon-indicator"
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
              {subOptions && selectedOption === option && (
                <div className="header-menu__sub-options" ref={subOptionsMenu}>
                  <div className="header-menu__sub-options-header">
                    <span className="header-menu__sub-options-title">
                      {option}
                    </span>
                    {subTitle && (
                      <span className="header-menu__sub-options-sub-title">
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
    <div className="header-menu">
      <div className="header-menu__left">
        <div className="header-menu__location-container">
          {currentlyViewing && renderCurrentlyViewingHeader(currentlyViewing)}
        </div>
      </div>

      <div className="header-menu__right">
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
