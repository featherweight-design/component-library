import React, { ReactChild, MouseEvent, KeyboardEvent, useState, useRef, useEffect } from 'react';
import classNames from 'classnames';

import './ExpansionPanel.scss';

type ExpansionPanelProps = {
  children: ReactChild | ReactChild[];
  isExpanded: boolean;
  className: string;
  title: string;
  type: 'light' | 'hidden' | 'nested';
  onClick: (event: MouseEvent | KeyboardEvent) => void;
};

const ExpansionPanel = ({ children, isExpanded, className, title, type, onClick }: ExpansionPanelProps) => {
  const [isOpen, toggleIsOpen] = useState(isExpanded);
  const expansionChildren = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen && isExpanded) {
      setTimeout(() => getExpansionChildrenHeight(), 300);
      handleToggleExpansion();
    } else if (isOpen && !isExpanded) {
      handleToggleExpansion();
    }

  }, [isExpanded])

  const getExpansionChildrenHeight = () =>
    expansionChildren.current && expansionChildren.current.clientHeight;

  const handleToggleExpansion = () =>
    toggleIsOpen(!isOpen);

  const containerClassNames = classNames({
    [className]: className,
    'expansion-panel': true,
    'expansion-panel-show': isOpen,
    'expansion-panel-hide': !isOpen,
    'expansion-panel-no-title': !title,
    [`expansion-panel-${type}`]: type,
  });

  const childWrapperClassName = classNames({
    'expansion-panel__child-wrapper': true,
    'expansion-panel__child-wrapper-show': isOpen,
    'expansion-panel__child-wrapper-hide': !isOpen,
    'expansion-panel__child-wrapper-primary': !type,
    [`expansion-panel__child-wrapper-${type}`]: type,
  });

  const buttonClassNames = classNames({
    'expansion-panel__button': true,
    'expansion-panel__button-show': isOpen,
    'expansion-panel__button-hide': !isOpen,
    [`expansion-panel__button-${type}`]: type,
  });

  const iconClassNames = classNames({
    'material-icons': true,
    'expansion-panel__icon': true,
    'expansion-panel__icon-show': isOpen,
    'expansion-panel__icon-hide': !isOpen,
    [`expansion-panel__icon-${type}`]: type,
  });

  return (
    <div className={containerClassNames}>
      {title && (
        <button
          className={buttonClassNames}
          tabIndex={0}
          onClick={onClick || handleToggleExpansion}
          onKeyDown={onClick || handleToggleExpansion}
        >
          <h4 className="expansion-panel__title">{title}</h4>
          <i className={iconClassNames}>
            {type === 'light' ? 'arrow_drop_down' : 'keyboard_arrow_down'}
          </i>
        </button>
      )}

      <div
        className={childWrapperClassName}
        ref={expansionChildren}
      >
        {children}
      </div>
    </div>
  );
}


ExpansionPanel.defaultProps = {
  children: null,
  isExpanded: false,
  className: null,
  title: null,
  type: null,
  onClick: null,
};

export default ExpansionPanel;
