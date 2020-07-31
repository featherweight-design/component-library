import React, { FC, useEffect, useState, ReactElement } from 'react';
import classnames from 'classnames';

import Accordion from 'components/Accordion/Accordion';
import { Button } from 'components/Buttons';
import { AlertProps } from 'types';
import Icon from 'components/Icon/Icon';

import './Alert.scss';

const FADE_IN_DELAY = 0;
const FADE_OUT_DELAY = 500;

const Alert: FC<AlertProps> = ({
  type = 'success',
  title,
  className,
  description,
  onClose,
  delay,
  details,
  detailsHeight,
}: AlertProps): ReactElement<AlertProps> => {
  const [isShown, toggleIsShown] = useState(false);
  const [areDetailsShown, toggleDetailsShown] = useState(false);
  const [timeouts, updateTimeouts] = useState<number[]>([]);

  const handleClose = () => {
    toggleDetailsShown(false);
    toggleIsShown(false);

    if (delay && onClose) {
      const timeoutHandle = window.setTimeout(() => onClose(), FADE_OUT_DELAY);
      updateTimeouts([...timeouts, timeoutHandle]);
    } else if (onClose) {
      onClose();
    }
  };

  useEffect(() => {
    if (delay) {
      const timeoutHandle = window.setTimeout(() => handleClose(), delay);
      updateTimeouts([...timeouts, timeoutHandle]);
    }

    const timeoutHandle = window.setTimeout(
      () => toggleIsShown(true),
      FADE_IN_DELAY
    );

    updateTimeouts([...timeouts, timeoutHandle]);

    return () => {
      timeouts.forEach(timeout => {
        window.clearTimeout(timeout);
      });
    };
  }, []);

  return (
    <>
      <div
        className={classnames({
          'uic-alert': true,
          [`uic-alert-${type}`]: isShown,
          'uic-alert-shown': isShown,
          [className as string]: className,
        })}
      >
        <div className="uic-alert__message">
          <Icon
            className={classnames({
              'uic-alert__icon': true,
              [`uic-alert__icon-${type}`]: true,
            })}
            icon={type}
            size="18px"
            title={`uic-alert ${title}`}
          />

          {title && <p className="uic-alert__title">{title}</p>}

          {title && description && `\u00A0`}

          {description && (
            <p className="uic-alert__description">{`\u00A0${description}`}</p>
          )}
        </div>

        <div className="uic-alert__controls">
          {details && (
            <Button
              className="uic-alert__button"
              onClick={() => toggleDetailsShown(!areDetailsShown)}
            >
              <Icon
                className={classnames({
                  'uic-alert__details-icon': true,
                  'uic-alert__details-icon-open': areDetailsShown,
                })}
                icon="chevronDown"
                size="18px"
                title="uic-alert__details-icon"
              />
            </Button>
          )}

          {!delay && onClose && (
            <Button className="uic-alert__button" onClick={handleClose}>
              <Icon
                className="uic-alert__close-icon"
                icon="close"
                size="18px"
                title="uic-alert__close-icon"
              />
            </Button>
          )}
        </div>
      </div>

      {details && (
        <Accordion
          className="uic-alert__details-container"
          contentClassName="uic-alert__details-content"
          expanded={areDetailsShown}
          maxHeight={detailsHeight}
        >
          {details}
        </Accordion>
      )}
    </>
  );
};

Alert.defaultProps = {
  type: 'success',
  description: undefined,
  onClose: undefined,
  delay: undefined,
};

export default Alert;
