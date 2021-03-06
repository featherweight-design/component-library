import { FC, useState, useEffect } from 'react';
import classnames from 'classnames';

import { AccordionProps } from 'types';
import Icon from 'components/Icon/Icon';

const Accordion: FC<AccordionProps> = ({
  expanded,
  title,
  className,
  contentClassName,
  children,
  maxHeight,
}: AccordionProps) => {
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
        'fd-accordion': true,
        'fd-accordion-with-title': title,
        [className as string]: className,
      })}
      style={{ maxHeight }}
    >
      {title && (
        <button
          type="button"
          className={classnames({
            'fd-accordion__button': true,
            'fd-accordion__button-hidden': !isExpanded,
          })}
          aria-controls="accordion-details-01"
          aria-expanded={isExpanded}
          onClick={handleToggleExpansion}
        >
          <Icon
            className={classnames({
              'fd-accordion__icon': true,
              'fd-accordion__icon-hidden': !isExpanded,
            })}
            icon="keyboard_arrow_down"
          />
          <span className="fd-accordion__title">{title}</span>
        </button>
      )}

      <div
        aria-hidden={isExpanded}
        className={classnames({
          'fd-accordion__content': true,
          'fd-accordion__content-closing': isClosing,
          'fd-accordion__content-hidden': !isExpanded && isHidden,
          [contentClassName as string]: contentClassName,
        })}
      >
        {children}
      </div>
    </div>
  );
};

Accordion.defaultProps = {
  expanded: false,
  maxHeight: 'unset',
};
export default Accordion;
