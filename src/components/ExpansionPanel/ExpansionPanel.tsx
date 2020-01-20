import React, {
  ReactChild,
  FunctionComponent,
  useState,
  useEffect,
} from 'react';
import classnames from 'classnames';

type ExpansionPanelProps = {
  children: ReactChild | ReactChild[] | boolean;
  title?: string;
  expanded?: boolean;
  className?: string;
};
const ExpansionPanel: FunctionComponent<ExpansionPanelProps> = ({
  expanded,
  title,
  className,
  children,
}: ExpansionPanelProps) => {
  const [isExpanded, setIsExpanded] = useState(expanded);
  const [isClosing, setIsClosing] = useState(false);
  const [isHidden, setIsHidden] = useState(!expanded);

  useEffect(() => {
    if (expanded !== isExpanded) {
      handleToggleExpansion();
    }
  }, [expanded]);

  const handleToggleExpansion = (): void => {
    if (isExpanded) {
      setIsClosing(true);
      setTimeout(() => {
        setIsClosing(false);
        setIsHidden(true);
      }, 500);
    } else {
      setIsHidden(false);
    }
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      className={classnames({
        'fd-expansion-panel': true,
        'fd-expansion-panel-with-title': title,
        [className as string]: className,
      })}
    >
      {title && (
        <button
          className={classnames({
            'fd-expansion-panel__button': true,
            'fd-expansion-panel__button-hidden': !isExpanded,
          })}
          aria-controls="accordion-details-01"
          aria-expanded={isExpanded}
          onClick={handleToggleExpansion}
        >
          <i
            className={classnames({
              'material-icons': true,
              'fd-expansion-panel__icon': true,
              'fd-expansion-panel__icon-hidden': !isExpanded,
            })}
          >
            keyboard_arrow_down
          </i>
          ​<span className="fd-expansion-panel__title">{title}</span>
        </button>
      )}
      ​
      <div
        aria-hidden={isExpanded}
        className={classnames({
          'fd-expansion-panel__content': true,
          'fd-expansion-panel__content-closing': isClosing,
          'fd-expansion-panel__content-hidden': !isExpanded && isHidden,
        })}
      >
        {children}
      </div>
    </div>
  );
};
ExpansionPanel.defaultProps = {
  title: undefined,
  expanded: false,
  className: undefined,
};
export default ExpansionPanel;
