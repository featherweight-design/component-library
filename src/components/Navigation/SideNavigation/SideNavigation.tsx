import React, { Component, Fragment } from 'react';
import isEqual from 'lodash/isEqual';
import classNames from 'classnames';

import { CurrentlyViewing, SideNavigationOptions } from '../../../types';
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
  isCollapsed?: boolean;
  onCollapse?: (isCollapsed: boolean) => void;
  showBackButton?: boolean;
  onNavigate?: (currentlyViewing: CurrentlyViewing) => void;
  logoAssetPath?: string;
  logoTitle?: string;
};

type SideNavigationState = {
  isCollapsed: boolean;
  selectedOption: string | null;
  selectedSubOption: string | null;
};

const getSubOptions = (options: SideNavigationOptions) =>
  Object.keys(options).reduce(
    (accumulator, option) => [...accumulator, ...options[option].subOptions],
    [] as string[]
  );

const getPreSelection = (
  options: string[],
  currentlyViewing = { path: '/' }
) => {
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

const getDefaultState = (props: SideNavigationProps) => {
  const { currentlyViewing, menuOptions, defaultSelected, isCollapsed } = props;

  if (isCollapsed) {
    return {
      isCollapsed,
      selectedOption: null,
      selectedSubOption: currentlyViewing
        ? getPreSelection(Object.keys(menuOptions), currentlyViewing)
        : defaultSelected.option,
    };
  }

  return {
    isCollapsed: isCollapsed || false,
    selectedSubOption: currentlyViewing
      ? getPreSelection(getSubOptions(menuOptions), currentlyViewing)
      : defaultSelected.subOption,
    selectedOption: currentlyViewing
      ? getPreSelection(Object.keys(menuOptions), currentlyViewing)
      : defaultSelected.option,
  };
};

class SideNavigation extends Component<
  SideNavigationProps,
  SideNavigationState
> {
  static defaultProps = {
    isCollapsed: false,
    onCollapse: null,
    currentlyViewing: null,
    showBackButton: false,
    onNavigate: null,
    logoAssetPath: null,
    logoTitle: null,
  };

  state = getDefaultState(this.props);

  componentDidUpdate(
    prevProps: SideNavigationProps,
    prevState: SideNavigationState
  ) {
    const { currentlyViewing: prevViewing } = prevProps;
    const { currentlyViewing, menuOptions } = this.props;

    if (!isEqual(prevViewing, currentlyViewing)) {
      const {
        selectedOption: prevOption,
        selectedSubOption: prevSubOption,
      } = prevState;

      const newOption = getPreSelection(
        Object.keys(menuOptions),
        currentlyViewing
      );
      const newSubOption = getPreSelection(
        getSubOptions(menuOptions),
        currentlyViewing
      );

      if (newOption !== prevOption || newSubOption !== prevSubOption) {
        this.handleUpdateSelection(newOption, newSubOption);
      }
    }
  }

  // LOCAL STATE CHANGE/TOGGLE METHODS
  handleUpdateSelection = (
    newOption: string | null,
    newSubOption: string | null
  ) => {
    const { isCollapsed } = this.state;

    this.setState({
      selectedOption: isCollapsed ? null : newOption,
      selectedSubOption: newSubOption,
    });
  };

  handleToggleCollapse = () => {
    const { menuOptions, onCollapse } = this.props;
    const { selectedSubOption, isCollapsed } = this.state;
    const selectedOption = Object.keys(menuOptions).find(option =>
      menuOptions[option].subOptions.find(
        subOption => subOption === selectedSubOption
      )
    );

    this.setState(
      prevState => ({
        isCollapsed: !prevState.isCollapsed,
        selectedOption:
          !prevState.isCollapsed || !selectedOption ? null : selectedOption,
      }),
      () => {
        if (onCollapse) {
          onCollapse(!isCollapsed);
        }
      }
    );
  };

  handleSelectOption = (option: string | null) => {
    const { isCollapsed, selectedOption } = this.state;

    let newViewing;

    if (!isCollapsed && selectedOption === option) {
      newViewing = null;
    } else {
      newViewing = option;
    }

    this.setState({ selectedOption: newViewing });
  };

  handleSelectSubOption = (subOption: string) => {
    const { isCollapsed } = this.state;
    const { onNavigate, menuOptions } = this.props;

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
        title: this.formatSelectedTitle(subOptionParent, subOption),
      });
    }

    this.setState({
      selectedSubOption: subOption,
      selectedOption: isCollapsed || !subOptionParent ? null : subOptionParent,
    });
  };

  handleGoBack = () => {
    const { onGoBack, currentlyViewing } = this.props;
    const { backPath, backTitle } = currentlyViewing;

    if (onGoBack && backPath && backTitle) {
      onGoBack({
        path: backPath,
        title: backTitle,
      });
    }
  };

  // FORMATTING METHODS
  formatSelectedTitle = (option: string, subOption: string) => {
    const { menuOptions } = this.props;
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
  renderMenuOptions = () => {
    const { isCollapsed, selectedSubOption, selectedOption } = this.state;
    const { menuOptions } = this.props;

    return (
      <Fragment>
        {Object.keys(menuOptions).map((option, index) => {
          const key = `${option}__${index}`;
          const isOptionSelected = menuOptions[option].subOptions.find(
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
              onMouseEnter={() => {
                if (isCollapsed) {
                  this.handleSelectOption(option);
                }
              }}
            >
              <div
                role="listbox"
                tabIndex={index}
                className={optionTitleClassNames}
                onClick={() => {
                  if (!isCollapsed && !isOptionSelected) {
                    this.handleSelectOption(option);
                  }
                }}
                onKeyDown={() => {
                  if (!isCollapsed && !isOptionSelected) {
                    this.handleSelectOption(option);
                  }
                }}
              >
                <i className={optionIconClassNames}>
                  {menuOptions[option].icon}
                </i>
                {option}
              </div>
              {isCollapsed && selectedOption === option && (
                <div
                  className="side-navigation__option-hover-menu"
                  onMouseLeave={() => {
                    if (isCollapsed) {
                      this.handleSelectOption(null);
                    }
                  }}
                >
                  <div className={optionHoverTitleClassNames}>{option}</div>
                  {this.renderSubOptions(menuOptions[option].subOptions)}
                </div>
              )}
              <ExpansionPanel
                className={optionExpansionPanelClassNames}
                type="hidden"
                isExpanded={
                  isCollapsed
                    ? false
                    : (isOptionSelected && true) || selectedOption === option
                }
              >
                {this.renderSubOptions(menuOptions[option].subOptions)}
              </ExpansionPanel>
            </div>
          );
        })}
      </Fragment>
    );
  };

  renderSubOptions = (subOptions: string[]) => {
    const { selectedSubOption, isCollapsed } = this.state;

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
          onClick={() => this.handleSelectSubOption(subOption)}
          onKeyDown={() => this.handleSelectSubOption(subOption)}
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

  render() {
    const { isCollapsed } = this.state;
    const { showBackButton, logoAssetPath, logoTitle, onGoBack } = this.props;

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
      'side-navigation__logo-back-collapsed-away':
        isCollapsed && showBackButton,
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
              onClick={() => showBackButton && this.handleGoBack()}
              onKeyDown={() => showBackButton && this.handleGoBack()}
            >
              <i className={backIconClassNames}>keyboard_arrow_left</i>

              {(logoAssetPath || logoTitle) && (
                <div className={logoWrapperClassNames}>
                  {logoAssetPath && (
                    <img
                      className="side-navigation__logo-image"
                      alt={logoTitle}
                      src={`${process.env.PUBLIC_URL}${logoAssetPath}`}
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

        <div className="side-navigation__menu">{this.renderMenuOptions()}</div>

        <div
          role="switch"
          tabIndex={0}
          aria-checked={isCollapsed}
          className={`side-navigation__collapse-toggle ${
            isCollapsed ? 'collapsed' : ''
          }`}
          onClick={this.handleToggleCollapse}
          onKeyDown={this.handleToggleCollapse}
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
  }
}

export default SideNavigation;
