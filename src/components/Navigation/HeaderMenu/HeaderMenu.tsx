import React, { Component, Fragment, MouseEvent } from 'react';
import classNames from 'classnames';

import {
  CurrentlyViewing,
  HeaderMenuOptions,
  HeaderMenuOption,
  HeaderMenuSubOption
} from '../../../types'
import './HeaderMenu.scss';

type HeaderMenuProps = {
  currentlyViewing: CurrentlyViewing;
  menuOptions: HeaderMenuOptions;
  onNavigate: (currentlyViewing: CurrentlyViewing) => void;
  defaultTitle: string;
}

type HeaderMenuState = {
  selectedOption: string | null;
}

class HeaderMenu extends Component<HeaderMenuProps, HeaderMenuState> {
  state = {
    selectedOption: null,
  };

  ['subOptionsMenu']: HTMLDivElement | null;

  static defaultProps = {
    menuOptions: null,
    onNavigate: null,
    defaultTitle: null,
  };

  // LOCAL STATE CHANGE/TOGGLE METHODS
  handleSelectOption = (name: string, optionObject: HeaderMenuOption) => {
    const { selectedOption } = this.state;
    const { onNavigate } = this.props;

    const { subOptions, path } = optionObject;

    if (subOptions) {
      if (!selectedOption) {
        document.addEventListener(
          'click',
          this.handleHeaderMenuOutsideClick as any as EventListener,
          false,
        );
      }

      this.setState({
        selectedOption: name,
      });
    } else if (path) {
      onNavigate({
        title: name,
        path,
      });
    }
  };

  handleHeaderMenuOutsideClick = (event: MouseEvent) => {
    if (this.subOptionsMenu && !this.subOptionsMenu.contains(event.currentTarget)) {
      this.handleRemoveEventListener();
      this.setState({ selectedOption: null });
    }
  };

  handleSelectSubOption = (title: string, path: string) => {
    const { onNavigate } = this.props;

    if (title && path && onNavigate) {
      onNavigate({
        path,
        title,
      });
    }

    if (this.subOptionsMenu) {
      this.handleRemoveEventListener();
    }

    this.setState({ selectedOption: null });
  };

  handleRemoveEventListener = () => {
    document.removeEventListener(
      'click',
      this.handleHeaderMenuOutsideClick as any as EventListener,
      false,
    );
  }

  // RENDER METHODS
  renderCurrentlyViewingHeader = ({ title, subTitle }: CurrentlyViewing) => {
    const { defaultTitle } = this.props;
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

  renderMenuOptions = () => {
    const { selectedOption } = this.state;
    const { menuOptions } = this.props;

    return (
      <div className="header-menu__menu-icon-container">
        {Object.keys(menuOptions).map((option, index) => {
          const key = `${option}__${index}`;
          const {
            icon,
            subOptions,
            subTitle,
            indicator,
            isActive,
          } = menuOptions[option];
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
                    !selectedOption
                    && this.handleSelectOption(option, menuOptions[option])
                  }
                  onKeyDown={() =>
                    !selectedOption
                    && this.handleSelectOption(option, menuOptions[option])
                  }
                >
                  {icon}
                </i>
                {indicator && (
                  <div
                    className="header-menu__icon-indicator"
                    role="menuitem"
                    tabIndex={index}
                    onClick={() =>
                      !selectedOption
                      && this.handleSelectOption(option, menuOptions[option])
                    }
                    onKeyDown={() =>
                      !selectedOption
                      && this.handleSelectOption(option, menuOptions[option])
                    }
                  >
                    {typeof (indicator) === 'number' && indicator}
                  </div>
                )}
                {subOptions && selectedOption === option && (
                  <div
                    className="header-menu__sub-options"
                    ref={(element) => {
                      this.subOptionsMenu = element;
                    }}
                  >
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
                    {this.renderSubOptions(subOptions)}
                  </div>
                )}
              </div>
            </Fragment>
          );
        })}
      </div>
    );
  };

  renderSubOptions = (subOptions: HeaderMenuSubOption[]) => {
    const { currentlyViewing } = this.props;

    return subOptions
      .filter(subOption => subOption.hasAccess)
      .map(({
        label, icon, path, href,
      }, index) => {
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
                this.handleRemoveEventListener();
                this.setState({ selectedOption: null });
              }}
              onKeyDown={() => {
                this.handleRemoveEventListener();
                this.setState({ selectedOption: null });
              }}
            >
              <i className="material-icons header-menu__sub-option-icon">{icon}</i>
              {label}
            </a>
          );
        }

        if (path) {
          return (
            <div
              key={key}
              role="link"
              tabIndex={index}
              className={subOptionClassNames}
              onClick={() =>
                !isSelected && this.handleSelectSubOption(label, path)
              }
              onKeyDown={() =>
                !isSelected && this.handleSelectSubOption(label, path)
              }
            >
              <i className="material-icons header-menu__sub-option-icon">{icon}</i>
              {label}
            </div>
          );
        }

        return null;
      });
  };

  render() {
    const { currentlyViewing, menuOptions } = this.props;

    return (
      <div className="header-menu">
        <div className="header-menu__left">
          <div className="header-menu__location-container">
            {currentlyViewing
              && this.renderCurrentlyViewingHeader(currentlyViewing)}
          </div>
        </div>

        <div className="header-menu__right">
          {menuOptions && this.renderMenuOptions()}
        </div>
      </div>
    );
  }
}

export default HeaderMenu;
