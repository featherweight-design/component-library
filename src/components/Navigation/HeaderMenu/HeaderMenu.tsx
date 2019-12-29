import React, { Fragment, SyntheticEvent, useState, useRef } from 'react';
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
  onNavigate: (currentlyViewing: CurrentlyViewing) => void;
  defaultTitle: string;
};

const HeaderMenu = ({
  currentlyViewing,
  menuOptions,
  onNavigate,
  defaultTitle,
}: HeaderMenuProps) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const subOptionsMenu = useRef<HTMLDivElement>(null);

  // LOCAL STATE CHANGE/TOGGLE METHODS
  const handleSelectOption = (name: string, optionObject: HeaderMenuOption) => {
    const { subOptions, path } = optionObject;

    if (subOptions) {
      if (!selectedOption) {
        document.addEventListener(
          'click',
          (handleHeaderMenuOutsideClick as any) as EventListener,
          false
        );
      }

      setSelectedOption(name);
    } else if (path) {
      onNavigate({
        title: name,
        path,
      });
    }
  };

  const handleHeaderMenuOutsideClick = (event: SyntheticEvent) => {
    if (
      subOptionsMenu.current &&
      !subOptionsMenu.current.contains(event.currentTarget)
    ) {
      handleRemoveEventListener();
      setSelectedOption(null);
    }
  };

  const handleSelectSubOption = (title: string, path: string) => {
    if (title && path && onNavigate) {
      onNavigate({
        path,
        title,
      });
    }

    if (subOptionsMenu) {
      handleRemoveEventListener();
    }

    setSelectedOption(null);
  };

  const handleRemoveEventListener = () => {
    document.removeEventListener(
      'click',
      (handleHeaderMenuOutsideClick as any) as EventListener,
      false
    );
  };

  // RENDER METHODS
  const renderCurrentlyViewingHeader = ({
    title,
    subTitle,
  }: CurrentlyViewing) => {
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

  const renderMenuOptions = () => (
    <div className="header-menu__menu-icon-container">
      {Object.keys(menuOptions).map((option, index) => {
        const key = `${option}__${index}`;
        const { icon, subOptions, subTitle, indicator, isActive } = menuOptions[
          option
        ];
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
                onClick={() =>
                  !selectedOption &&
                  handleSelectOption(option, menuOptions[option])
                }
                onKeyDown={() =>
                  !selectedOption &&
                  handleSelectOption(option, menuOptions[option])
                }
              >
                {icon}
              </i>
              {indicator && (
                <div
                  className="header-menu__icon-indicator"
                  role="menuitem"
                  tabIndex={-1}
                  onClick={() =>
                    !selectedOption &&
                    handleSelectOption(option, menuOptions[option])
                  }
                  onKeyDown={() =>
                    !selectedOption &&
                    handleSelectOption(option, menuOptions[option])
                  }
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

  const renderSubOptions = (subOptions: HeaderMenuSubOption[]) =>
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
              onClick={() => {
                handleRemoveEventListener();
                setSelectedOption(null);
              }}
              onKeyDown={() => {
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
              onClick={() => !isSelected && handleSelectSubOption(label, path)}
              onKeyDown={() =>
                !isSelected && handleSelectSubOption(label, path)
              }
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
  menuOptions: null,
  onNavigate: null,
  defaultTitle: null,
};

export default HeaderMenu;
