import React, { Component, ReactChild, MouseEvent, KeyboardEvent } from 'react';
import classNames from 'classnames';

import './ExpansionPanel.scss';

type ExpansionPanelProps = {
  children: ReactChild | ReactChild[];
  isExpanded: boolean;
  className: string;
  title: string;
  type: string;
  onClick: (event: MouseEvent | KeyboardEvent) => void;
};

type ExpansionPanelState = {
  isExpanded: boolean;
};

class ExpansionPanel extends Component<
  ExpansionPanelProps,
  ExpansionPanelState
> {
  state = {
    isExpanded: this.props.isExpanded,
  };

  ['expansionChildren']: HTMLElement | null;

  static defaultProps = {
    children: null,
    isExpanded: false,
    className: null,
    title: null,
    type: null,
    onClick: null,
  };

  componentDidUpdate(prevProps: ExpansionPanelProps) {
    const { isExpanded } = this.props;
    const { isExpanded: prevExpanded } = prevProps;

    if (!prevExpanded && isExpanded) {
      setTimeout(() => this.getExpansionChildrenHeight(), 300);
      this.handleToggleExpansion();
    } else if (prevExpanded && !isExpanded) {
      this.handleToggleExpansion();
    }
  }

  getExpansionChildrenHeight = () =>
    this.expansionChildren && this.expansionChildren.clientHeight;

  handleToggleExpansion = () => {
    this.setState(({ isExpanded }) => ({ isExpanded: !isExpanded }));
  };

  render() {
    const { className, title, children, type, onClick } = this.props;
    const { isExpanded } = this.state;

    const containerClassNames = classNames({
      [className]: className,
      'expansion-panel': true,
      'expansion-panel-show': isExpanded,
      'expansion-panel-hide': !isExpanded,
      'expansion-panel-no-title': !title,
      [`expansion-panel-${type}`]: type,
    });

    const childWrapperClassName = classNames({
      'expansion-panel__child-wrapper': true,
      'expansion-panel__child-wrapper-show': isExpanded,
      'expansion-panel__child-wrapper-hide': !isExpanded,
      'expansion-panel__child-wrapper-primary': !type,
      [`expansion-panel__child-wrapper-${type}`]: type,
    });

    const buttonClassNames = classNames({
      'expansion-panel__button': true,
      'expansion-panel__button-show': isExpanded,
      'expansion-panel__button-hide': !isExpanded,
      [`expansion-panel__button-${type}`]: type,
    });

    const iconClassNames = classNames({
      'material-icons': true,
      'expansion-panel__icon': true,
      'expansion-panel__icon-show': isExpanded,
      'expansion-panel__icon-hide': !isExpanded,
      [`expansion-panel__icon-${type}`]: type,
    });

    return (
      <div className={containerClassNames}>
        {title && (
          <button
            className={buttonClassNames}
            tabIndex={0}
            onClick={onClick || this.handleToggleExpansion}
            onKeyDown={onClick || this.handleToggleExpansion}
          >
            <h4 className="expansion-panel__title">{title}</h4>
            <i className={iconClassNames}>
              {type === 'light' ? 'arrow_drop_down' : 'keyboard_arrow_down'}
            </i>
          </button>
        )}

        <div
          className={childWrapperClassName}
          ref={element => {
            this.expansionChildren = element;
          }}
        >
          {children}
        </div>
      </div>
    );
  }
}

export default ExpansionPanel;
