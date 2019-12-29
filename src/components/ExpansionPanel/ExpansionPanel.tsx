import React, {
  ReactChild,
  MouseEvent,
  KeyboardEvent,
  useState,
  useRef,
  useEffect,
  FunctionComponent,
} from 'react';
import classNames from 'classnames';

import './ExpansionPanel.scss';

type ExpansionPanelProps = {
  children: ReactChild | ReactChild[];
  expanded?: boolean;
  type?: 'light' | 'hidden' | 'nested';
  className?: string;
  title?: string;
  onClick?: (event: MouseEvent | KeyboardEvent) => void;
};

const ExpansionPanel: FunctionComponent<ExpansionPanelProps> = ({
  children,
  expanded,
  className,
  title,
  type,
  onClick,
}: ExpansionPanelProps) => {
  const [isExpanded, toggleIsExpanded] = useState(expanded);
  const expansionChildren = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (expanded) {
      setTimeout(() => getExpansionChildrenHeight(), 300);
    }

    toggleIsExpanded(expanded);
  }, [expanded]);

  const getExpansionChildrenHeight = (): number | null =>
    expansionChildren.current && expansionChildren.current.clientHeight;

  const containerClassNames = classNames({
    [className as string]: className,
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
          onClick={onClick || ((): void => toggleIsExpanded(!isExpanded))}
          onKeyDown={onClick || ((): void => toggleIsExpanded(!isExpanded))}
        >
          <h4 className="expansion-panel__title">{title}</h4>
          <i className={iconClassNames}>
            {type === 'light' ? 'arrow_drop_down' : 'keyboard_arrow_down'}
          </i>
        </button>
      )}

      <div className={childWrapperClassName} ref={expansionChildren}>
        {children}
      </div>
    </div>
  );
};

ExpansionPanel.defaultProps = {
  children: undefined,
  expanded: false,
  className: undefined,
  title: undefined,
  type: undefined,
  onClick: undefined,
};

export default ExpansionPanel;
