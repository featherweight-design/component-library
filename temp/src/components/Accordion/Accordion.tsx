import React, { FC, useState, useEffect } from 'react';
import classnames from 'classnames';

import { AccordionProps } from 'types';
import Icon from 'components/Icon/Icon';
import './Accordion.scss';

const Accordion: FC<AccordionProps> = ({
  expanded,
  title,
  className,
  contentClassName,
  children,
  maxHeight,
  dataId,
}: AccordionProps) => {
  const [isExpanded, setIsExpanded] = useState(expanded);
  const [isClosing, setIsClosing] = useState(false);
  const [isHidden, setIsHidden] = useState(!expanded);

  useEffect(() => {
    if (expanded !== isExpanded) {
      handleToggleAccordion();
    }
  }, [expanded]);

  const handleToggleAccordion = () => {
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
        'uic-accordion': true,
        'uic-accordion-with-title': title,
        [className as string]: className,
      })}
      style={{ maxHeight }}
    >
      {title && (
        <button
          data-id={dataId}
          className={classnames({
            'uic-accordion__button': true,
            'uic-accordion__button-hidden': !isExpanded,
          })}
          aria-controls="accordion-details-01"
          aria-expanded={isExpanded}
          onClick={handleToggleAccordion}
        >
          <Icon
            className={classnames({
              'uic-accordion__icon': true,
              'uic-accordion__icon-hidden': !isExpanded,
            })}
            icon="chevronDown"
            title="uic-accordion-icon"
            size="0.875rem"
          />

          <span className="uic-accordion__title">{title}</span>
        </button>
      )}

      <div
        aria-hidden={isExpanded}
        className={classnames({
          'uic-accordion__content': true,
          'uic-accordion__content-closing': isClosing,
          'uic-accordion__content-hidden': !isExpanded && isHidden,
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
